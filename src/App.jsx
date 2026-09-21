import React, { useState, useEffect, useRef } from 'react';

// --- CUSTOM HOOKS FOR SCROLLYTELLING ---

// Hook to track if an element is in view (Intersection Observer)
const useIntersection = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);

  return [ref, isIntersecting];
};

// Hook to track precise scroll progress [0 to 1] within a container
// Optimized with requestAnimationFrame for smooth 60fps binding
const useScrollProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let lastProgress = -1;
    
    const calculateProgress = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Skip updates if element is completely out of view
      if (rect.top > windowHeight) {
        if (lastProgress !== 0) { setProgress(0); lastProgress = 0; }
        return;
      }
      if (rect.bottom < 0) {
        if (lastProgress !== 1) { setProgress(1); lastProgress = 1; }
        return;
      }
      
      const totalDistance = rect.height - windowHeight;
      if (totalDistance <= 0) return;

      const scrolled = -rect.top; 
      let p = scrolled / totalDistance;
      p = Math.max(0, Math.min(1, p)); 
      
      // Throttle state updates to significant changes (0.5% increments)
      if (Math.abs(p - lastProgress) > 0.005 || p === 0 || p === 1) {
        setProgress(p);
        lastProgress = p;
      }
    };

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return [ref, progress];
};

// --- REUSABLE UI COMPONENTS ---

// Fade & Slide up reveal for standard text content
const FadeReveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useIntersection({ threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Chinese Vintage Seal Stamp
const RedSeal = ({ text, className = '' }) => (
  <div className={`relative flex items-center justify-center w-12 h-12 border-[2px] border-[#9B514B] text-[#9B514B] p-1 opacity-80 mix-blend-multiply hover:rotate-3 transition-transform duration-500 cursor-default ${className}`}>
    <div className="w-full h-full border border-[#9B514B] flex flex-wrap content-center justify-center pt-[2px]">
      {text.split('').map((char, i) => (
        <span key={i} className="text-[14px] leading-none font-black block w-1/2 text-center" style={{ fontFamily: '"Noto Serif TC", serif' }}>
          {char}
        </span>
      ))}
    </div>
  </div>
);

// Custom Cursor Component to avoid re-rendering the whole app
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

export default function TeaStorytelling() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+TC:wght@300;400;600&family=Inter:wght@300;400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EBD7] text-[#302E28] overflow-x-hidden selection:bg-[#60745C] selection:text-[#F3EBD7] relative" style={{ fontFamily: '"Inter", sans-serif' }}>
      
      {/* Global CSS overrides and utility classes */}
      <style>{`
        .font-serif-en { font-family: 'Cormorant Garamond', serif; }
        .font-serif-tc { font-family: 'Noto Serif TC', serif; }
        .vertical-rl { writing-mode: vertical-rl; text-orientation: mixed; }
        
        /* Subtle paper grain texture */
        .paper-texture {
          position: fixed;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08' mix-blend-mode='multiply'/%3E%3C/svg%3E");
        }
        
        /* Custom Cursor */
        body { cursor: none; }
        .custom-cursor {
          position: fixed;
          top: 0; left: 0;
          width: 20px; height: 20px;
          border: 1px solid rgba(48, 46, 40, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, background-color 0.3s;
          mix-blend-mode: difference;
        }
        a:hover ~ .custom-cursor, button:hover ~ .custom-cursor {
          width: 40px; height: 40px;
          background-color: rgba(255,255,255,0.1);
        }

        /* SVG Line drawing animation class */
        .draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* Persistent Elements */}
      <div className="paper-texture"></div>
      <CustomCursor />

      <div className="fixed top-6 right-8 z-40 mix-blend-multiply opacity-60 hidden md:block">
        <div className="font-serif-tc vertical-rl text-sm tracking-[0.3em]">茶 · 山 · 人</div>
      </div>

      <main className="max-w-[1400px] mx-auto w-full">
        <HeroSection />
        <SectionMountain />
        <SectionTeaPlant />
        <SectionProcess />
        <SectionTeapot />
        <SectionDataStory />
        <SectionClosing />
      </main>

    </div>
  );
}

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Ink Wash Mountain */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${isLoaded ? 'opacity-30' : 'opacity-0'} mix-blend-multiply flex items-center justify-center`}>
        <svg viewBox="0 0 1000 600" className="w-[120vw] min-w-[1000px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" preserveAspectRatio="xMidYMid slice">
          {/* Distant mountains */}
          <path d="M0,400 Q150,250 300,350 T600,200 T1000,350 L1000,600 L0,600 Z" fill="#594B39" opacity="0.2" />
          <path d="M-100,450 Q200,300 400,400 T800,250 T1100,450 L1100,600 L-100,600 Z" fill="#3C3932" opacity="0.3" />
          {/* Main peak */}
          <path d="M200,600 L400,200 L450,250 L500,150 L650,400 L800,600 Z" fill="#302E28" opacity="0.4" />
          <path d="M400,200 L420,250 L350,350 Z" fill="#F3EBD7" opacity="0.5" /> {/* Highlight */}
        </svg>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4">
        <div className={`transition-all duration-[1500ms] delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <RedSeal text="源起" className="mx-auto mb-8 w-16 h-16 rotate-[-4deg]" />
        </div>
        
        <div className="overflow-hidden mb-6">
          <h1 className={`font-serif-en text-6xl md:text-8xl tracking-tight text-[#302E28] transition-transform duration-[1200ms] delay-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}>
            The Origin of Tea
          </h1>
        </div>

        <div className={`transition-opacity duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-serif-tc text-2xl md:text-3xl tracking-[0.5em] mb-4 text-[#594B39]">茶·山·人</p>
          <p className="uppercase tracking-[0.2em] text-xs font-light text-[#66847A]">A Journey From Mountain to Cup</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-1000 delay-[1500ms] ${isLoaded ? 'opacity-60' : 'opacity-0'}`}>
        <span className="text-[10px] uppercase tracking-widest mb-4 font-serif-en italic">Scroll</span>
        <div className="w-[1px] h-16 bg-current overflow-hidden">
          <div className="w-full h-full bg-[#F3EBD7] animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

function SectionMountain() {
  const [containerRef, progress] = useScrollProgress();

  // Map scroll progress to visual states
  const mtnScale = 1 + progress * 0.15;
  const opacityText = progress > 0.15 && progress < 0.85 ? 1 : 0;
  const markerOpacity = progress > 0.4 ? 1 : 0;
  
  return (
    <section ref={containerRef} className="h-[250vh] relative w-full border-t border-[#3C3932]/10 mt-32">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-4 md:p-12">
        
        {/* Main Artwork Area */}
        <div className="relative w-full max-w-6xl h-full md:h-[80vh] flex flex-col md:flex-row items-center justify-center">
          
          {/* Left Text / Editorial */}
          <div 
            className="absolute left-4 md:left-12 top-1/4 max-w-xs z-20 transition-opacity duration-700"
            style={{ opacity: opacityText, transform: `translateY(${(1-progress) * 50}px)` }}
          >
            <h3 className="font-serif-en italic text-3xl mb-4 text-[#60745C]">High Altitude</h3>
            <div className="w-12 h-[1px] bg-[#9B514B] mb-6"></div>
            <p className="text-sm leading-relaxed text-[#594B39]">
              The finest teas are born in the mists. High elevation slows the leaf's growth, concentrating complex amino acids and volatile oils. The mountain breathes life into the brew.
            </p>
            <div className="mt-8 flex items-start gap-4">
              <div className="font-serif-tc vertical-rl text-xl text-[#3C3932] opacity-80">雲霧出好茶</div>
              <p className="text-[10px] uppercase tracking-wider text-[#66847A] pt-1">"Clouds and mist yield good tea."</p>
            </div>
          </div>

          {/* Central Mountain Graphic */}
          <div className="relative w-full md:w-[60%] h-[60vh] md:h-full flex items-center justify-center pointer-events-none mix-blend-multiply">
             <div 
                className="w-full h-full relative transition-transform duration-100 ease-linear origin-bottom"
                style={{ transform: `scale(${mtnScale}) translateY(${progress * 5}%)` }}
             >
                {/* SVG Mountain Illustration (Simulating ink topographic style) */}
                <svg viewBox="0 0 500 500" className="w-full h-full object-contain drop-shadow-sm">
                  <defs>
                    <filter id="ink-blur" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComponentTransfer><feFuncA type="linear" slope="0.8"/></feComponentTransfer>
                    </filter>
                  </defs>
                  {/* Topographic lines / ridges */}
                  <path d="M100,400 Q150,300 250,150 T400,350" fill="none" stroke="#594B39" strokeWidth="1" opacity="0.4"/>
                  <path d="M80,420 Q180,280 230,130 T430,370" fill="none" stroke="#594B39" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M50,450 Q200,320 270,180 T470,400" fill="none" stroke="#302E28" strokeWidth="2" opacity="0.8"/>
                  <path d="M250,150 L270,180 L290,160 Z" fill="#302E28" opacity="0.7"/>
                  
                  {/* Ink washes */}
                  <path d="M150,400 Q250,200 350,400 Z" fill="#66847A" opacity="0.1" filter="url(#ink-blur)"/>
                  <path d="M200,450 Q280,250 400,450 Z" fill="#60745C" opacity="0.15" filter="url(#ink-blur)"/>
                  
                  {/* Map Markers revealing on scroll */}
                  <g style={{ opacity: markerOpacity, transition: 'opacity 0.8s ease' }}>
                    <circle cx="270" cy="180" r="4" fill="#9B514B"/>
                    <circle cx="270" cy="180" r="12" fill="none" stroke="#9B514B" strokeWidth="0.5" className="animate-ping" style={{ animationDuration: '3s' }}/>
                    <line x1="270" y1="180" x2="330" y2="120" stroke="#9B514B" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="335" y="115" fontSize="12" fill="#9B514B" fontFamily="Noto Serif TC" className="font-light">Wuyi Shan (武夷山)</text>
                    <text x="335" y="130" fontSize="8" fill="#594B39" fontFamily="Inter">Elevation: 2,158m</text>
                  </g>
                </svg>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function SectionTeaPlant() {
  const [ref, isVisible] = useIntersection({ threshold: 0.3 });
  
  return (
    <section className="min-h-screen py-32 px-4 md:px-12 max-w-6xl mx-auto border-t border-[#3C3932]/10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-[#3C3932] opacity-20"></div>
      
      <div className="text-center mb-24">
        <FadeReveal>
          <h2 className="font-serif-en text-4xl text-[#302E28]">Camellia Sinensis</h2>
          <p className="uppercase tracking-[0.2em] text-xs text-[#9B514B] mt-2">The Mother Plant</p>
        </FadeReveal>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8">
        
        {/* Left Stats/Annotations */}
        <div className="w-full md:w-1/3 space-y-12">
          <FadeReveal delay={200}>
            <div className="border-l border-[#60745C] pl-4">
              <h4 className="font-serif-en text-xl mb-1 text-[#60745C]">Soil Composition</h4>
              <p className="text-sm text-[#594B39]">Requires acidic soil (pH 4.5–5.5), rich in minerals, ensuring optimal root development and nutrient uptake.</p>
            </div>
          </FadeReveal>
          <FadeReveal delay={400}>
            <div className="border-l border-[#9B514B] pl-4">
              <h4 className="font-serif-en text-xl mb-1 text-[#9B514B]">The First Flush</h4>
              <p className="text-sm text-[#594B39]">The spring harvest yields the most delicate, nutrient-dense buds, highly prized in traditional tea making.</p>
            </div>
          </FadeReveal>
        </div>

        {/* Center Plant Illustration */}
        <div ref={ref} className="w-full md:w-1/3 flex justify-center relative min-h-[400px]">
          <svg viewBox="0 0 300 400" className="w-full max-w-[300px] drop-shadow-sm mix-blend-multiply">
             {/* Stems drawn on view */}
             <path d="M150,380 Q140,250 160,150 T150,50" fill="none" stroke="#3C3932" strokeWidth="3" className={isVisible ? 'draw-line' : 'opacity-0'} style={{ animationDuration: '1.5s' }}/>
             <path d="M155,280 Q100,220 80,180" fill="none" stroke="#3C3932" strokeWidth="2" className={isVisible ? 'draw-line' : 'opacity-0'} style={{ animationDelay: '0.5s' }}/>
             <path d="M158,200 Q200,160 220,120" fill="none" stroke="#3C3932" strokeWidth="1.5" className={isVisible ? 'draw-line' : 'opacity-0'} style={{ animationDelay: '0.8s' }}/>
             
             {/* Leaves appearing */}
             <g className={`transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <path d="M150,50 Q130,40 150,20 Q170,40 150,50 Z" fill="#60745C" opacity="0.8"/>
                <path d="M80,180 Q60,190 70,160 Q90,150 80,180 Z" fill="#66847A" opacity="0.7"/>
                <path d="M220,120 Q240,110 230,140 Q210,150 220,120 Z" fill="#60745C" opacity="0.9"/>
                
                {/* Vintage decorative elements around plant */}
                <circle cx="150" cy="50" r="40" fill="none" stroke="#9B514B" strokeWidth="0.5" strokeDasharray="4,4" className="animate-[spin_20s_linear_infinite]" opacity="0.4"/>
             </g>
          </svg>
        </div>

        {/* Right Info List */}
        <div className="w-full md:w-1/3">
           <FadeReveal delay={600} className="bg-[#EFE4CA] border border-[#3C3932]/20 p-6 md:p-8 shadow-[4px_4px_0_rgba(48,46,40,0.1)]">
             <div className="flex items-center justify-between mb-4 border-b border-[#3C3932]/10 pb-2">
               <span className="font-serif-tc font-bold text-lg text-[#302E28]">綠茶</span>
               <span className="text-xs uppercase tracking-widest text-[#66847A]">Green</span>
             </div>
             <div className="flex items-center justify-between mb-4 border-b border-[#3C3932]/10 pb-2">
               <span className="font-serif-tc font-bold text-lg text-[#594B39]">烏龍</span>
               <span className="text-xs uppercase tracking-widest text-[#9B514B]">Oolong</span>
             </div>
             <div className="flex items-center justify-between mb-4 border-b border-[#3C3932]/10 pb-2">
               <span className="font-serif-tc font-bold text-lg text-[#3C3932]">紅茶</span>
               <span className="text-xs uppercase tracking-widest text-[#594B39]">Black</span>
             </div>
             <p className="text-[11px] leading-relaxed text-[#594B39] mt-6 italic font-serif-en">
               All derived from a single species. The magic lies entirely within the oxidation process and the master's hand.
             </p>
           </FadeReveal>
        </div>
      </div>
    </section>
  );
}

function SectionProcess() {
  const steps = [
    { title: "Picking", tc: "採摘", desc: "Harvesting tender buds and leaves." },
    { title: "Withering", tc: "萎凋", desc: "Leaves are spread to lose moisture, becoming pliable." },
    { title: "Rolling", tc: "揉捻", desc: "Breaking cell walls to release essential oils." },
    { title: "Oxidation", tc: "發酵", desc: "Enzymes interact with oxygen, darkening the leaf." },
    { title: "Drying", tc: "乾燥", desc: "Applying heat to halt oxidation and seal the flavor." }
  ];

  const [ref, progress] = useScrollProgress();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#E8DDC5]/30">
      <div className="text-center mb-16">
         <h2 className="font-serif-en text-4xl text-[#302E28]">The Master's Hand</h2>
         <div className="w-8 h-[2px] bg-[#3C3932] mx-auto mt-6"></div>
      </div>

      <div className="max-w-3xl mx-auto relative px-4">
        {/* Central connecting ink line */}
        <div 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#3C3932]/20 md:-translate-x-1/2"
          style={{ 
            background: `linear-gradient(to bottom, #3C3932 ${progress * 100}%, transparent ${progress * 100}%)`
          }}
        />

        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} pl-12 md:pl-0`}>
               {/* Center Node */}
               <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#EFE4CA] border-2 border-[#60745C] md:-translate-x-1/2 z-10 flex items-center justify-center">
                 <div className="w-1 h-1 bg-[#302E28] rounded-full"></div>
               </div>
               
               {/* Content */}
               <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                 <FadeReveal delay={idx * 100}>
                   <div className="flex flex-col gap-2">
                     <span className="font-serif-tc text-3xl text-[#3C3932]/20 absolute -top-4 -z-10 select-none">{step.tc}</span>
                     <h3 className="font-serif-en text-2xl text-[#302E28]">{step.title}</h3>
                     <p className="text-sm text-[#594B39] font-light">{step.desc}</p>
                   </div>
                 </FadeReveal>
               </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionTeapot() {
  const [containerRef, progress] = useScrollProgress();

  // Animations mapped to scroll progress within this sticky section
  const matSlide = Math.min(0, -100 + progress * 200); // Slide up from -100px
  const teapotX = Math.max(0, 100 - progress * 150);   // Slide left from 100px
  const teapotOpacity = progress > 0.1 ? Math.min(1, (progress - 0.1) * 3) : 0;
  const cupOpacity = progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0;
  
  return (
    <section ref={containerRef} className="h-[250vh] relative w-full border-y border-[#3C3932]/10">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F3EBD7]">
        
        {/* Background text / elements */}
        <div className="absolute top-1/4 left-8 md:left-24 z-0 opacity-20 hidden md:block">
           <div className="font-serif-tc vertical-rl text-6xl tracking-widest text-[#302E28]">一葉知秋</div>
        </div>

        <div className="relative w-full max-w-5xl h-[60vh] flex items-end justify-center pb-12 z-10 px-4">
          
          {/* Bamboo Mat Base */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] h-48 bg-[#D2B48C] transform perspective-[800px] rotateX-[70deg] rounded-sm shadow-[0_20px_50px_rgba(48,46,40,0.15)] border-y border-[#8B4513]/30 overflow-hidden z-0 transition-transform ease-out"
            style={{ 
              transform: `translate(-50%, ${matSlide}px) perspective(800px) rotateX(70deg)`,
              backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 4px, rgba(90, 75, 57, 0.1) 4px, rgba(90, 75, 57, 0.1) 5px)'
            }}
          ></div>

          {/* The Setup Container */}
          <div className="relative z-10 flex items-end justify-center w-full max-w-3xl">
            
            {/* The Cup (Left Center) */}
            <div 
              className="relative w-24 h-16 md:w-32 md:h-20 mr-4 md:mr-12 mb-6 transition-all duration-700 ease-out z-20"
              style={{ opacity: cupOpacity }}
            >
              {/* Steam SVG Animation */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-16 h-32 overflow-visible">
                <svg viewBox="0 0 50 100" className="w-full h-full opacity-60">
                   <path 
                     d="M25,100 Q15,75 25,50 T25,0" 
                     fill="none" stroke="#F3EBD7" strokeWidth="2" strokeLinecap="round"
                     className="animate-[steam_4s_ease-in-out_infinite]"
                   />
                   <path 
                     d="M35,90 Q45,65 35,40 T30,10" 
                     fill="none" stroke="#F3EBD7" strokeWidth="1.5" strokeLinecap="round"
                     className="animate-[steam_5s_ease-in-out_infinite_1s]"
                   />
                </svg>
              </div>
              
              {/* Cup Body SVG */}
              <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xl">
                 <ellipse cx="60" cy="15" rx="55" ry="12" fill="#4B6058" />
                 {/* Tea Liquid inside */}
                 <ellipse cx="60" cy="15" rx="45" ry="8" fill="#B8860B" opacity="0.8" />
                 {/* Cup exterior */}
                 <path d="M5,15 C5,50 20,75 60,75 C100,75 115,50 115,15 Z" fill="#66847A" />
                 <path d="M5,15 C5,50 20,75 60,75 C100,75 115,50 115,15 Z" fill="url(#cup-shade)" opacity="0.4" />
                 {/* Base */}
                 <rect x="45" y="75" width="30" height="5" fill="#302E28" rx="2"/>
                 <defs>
                   <linearGradient id="cup-shade" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="#302E28" stopOpacity="0.8"/>
                     <stop offset="50%" stopColor="transparent"/>
                     <stop offset="100%" stopColor="#302E28" stopOpacity="0.3"/>
                   </linearGradient>
                 </defs>
              </svg>
            </div>

            {/* The Teapot (Right) */}
            <div 
              className="relative w-48 h-36 md:w-64 md:h-48 z-10"
              style={{ transform: `translateX(${teapotX}px)`, opacity: teapotOpacity, transition: 'transform 0.1s ease-out' }}
            >
              <svg viewBox="0 0 250 180" className="w-full h-full drop-shadow-2xl">
                 {/* Teapot Body */}
                 <path d="M70,80 C70,20 190,20 190,80 C210,160 50,160 70,80 Z" fill="#60745C" />
                 {/* Ribbed texture / shading */}
                 <path d="M90,40 Q130,160 110,150" fill="none" stroke="#4B6058" strokeWidth="2" opacity="0.5"/>
                 <path d="M120,35 Q130,170 140,155" fill="none" stroke="#4B6058" strokeWidth="2" opacity="0.5"/>
                 <path d="M150,40 Q130,160 170,145" fill="none" stroke="#4B6058" strokeWidth="2" opacity="0.5"/>
                 {/* Gradient Overlay */}
                 <path d="M70,80 C70,20 190,20 190,80 C210,160 50,160 70,80 Z" fill="url(#pot-shade)" opacity="0.6"/>
                 
                 {/* Lid */}
                 <path d="M100,35 C100,10 160,10 160,35 Z" fill="#66847A" stroke="#302E28" strokeWidth="1"/>
                 <circle cx="130" cy="15" r="8" fill="#302E28" />

                 {/* Handle */}
                 <path d="M185,50 C240,50 250,120 185,130" fill="none" stroke="#302E28" strokeWidth="12" strokeLinecap="round"/>
                 <path d="M185,50 C240,50 250,120 185,130" fill="none" stroke="#60745C" strokeWidth="8" strokeLinecap="round"/>

                 {/* Spout */}
                 <path d="M75,60 C40,70 20,40 20,40 C20,40 30,90 70,110 Z" fill="#60745C" stroke="#302E28" strokeWidth="1"/>
                 <path d="M75,60 C40,70 20,40 20,40 C20,40 30,90 70,110 Z" fill="#302E28" opacity="0.3"/>

                 <defs>
                   <radialGradient id="pot-shade" cx="30%" cy="30%" r="70%">
                     <stop offset="0%" stopColor="#F3EBD7" stopOpacity="0.4"/>
                     <stop offset="100%" stopColor="#302E28" stopOpacity="0.7"/>
                   </radialGradient>
                 </defs>
              </svg>
            </div>
          </div>
          
        </div>

        {/* Descriptive Text appearing over scene */}
        <div 
          className="absolute bottom-16 md:bottom-24 max-w-lg text-center z-30 transition-opacity duration-1000 bg-[#F3EBD7]/80 backdrop-blur-sm p-6 border border-[#3C3932]/10"
          style={{ opacity: progress > 0.5 ? 1 : 0, transform: `translateY(${progress > 0.5 ? 0 : 20}px)` }}
        >
          <h3 className="font-serif-en text-2xl mb-2 text-[#302E28]">The Ritual of Brewing</h3>
          <p className="text-sm text-[#594B39]">
            The vessel absorbs the memory of every steep. Water, temperature, and time dance together to extract the soul of the mountain trapped within the withered leaf.
          </p>
        </div>

      </div>
      <style>{`
        @keyframes steam {
          0% { stroke-dasharray: 0 100; opacity: 0; transform: translateY(10px) scale(0.8); }
          50% { opacity: 0.8; }
          100% { stroke-dasharray: 100 0; opacity: 0; transform: translateY(-30px) scale(1.2); }
        }
      `}</style>
    </section>
  );
}

function SectionDataStory() {
  const [containerRef, progress] = useScrollProgress();
  
  // Data points mapping to visually fit the SVG box (0-1000 width, 0-400 height)
  // Replicating a vintage line graph
  
  return (
    <section ref={containerRef} className="h-[200vh] relative w-full bg-[#EFE4CA]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 md:px-12 pt-20">
        
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12 md:mb-20">
            <h2 className="font-serif-en text-4xl text-[#302E28] mb-4">Global Trade Evolution</h2>
            <p className="text-sm text-[#594B39] max-w-xl">
              From the ancient Silk Road to modern commodity markets, the demand for Camellia Sinensis has shaped economies and cultures across centuries.
            </p>
          </div>

          {/* Chart Container */}
          <div className="relative w-full h-[300px] md:h-[400px] border-b-2 border-l-2 border-[#3C3932] p-4 flex items-end">
            
            {/* Y Axis Labels */}
            <div className="absolute left-[-40px] top-0 h-full flex flex-col justify-between text-[10px] md:text-xs text-[#594B39] pb-4 font-mono">
              <span>80k</span>
              <span>60k</span>
              <span>40k</span>
              <span>20k</span>
              <span>0</span>
            </div>

            {/* SVG Graph Drawing */}
            <div className="relative w-full h-full overflow-hidden mix-blend-multiply">
               <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                 {/* Grid */}
                 <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300" stroke="#3C3932" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3"/>
                 
                 {/* Data Area Base - Green */}
                 <path d="M0,400 L0,350 L200,320 L400,250 L600,280 L800,150 L900,80 L1000,120 L1000,400 Z" fill="rgba(102, 132, 122, 0.15)" />
                 
                 {/* Animated Line - Controlled by Scroll Progress */}
                 {/* Total path length is roughly 1200 */}
                 <path 
                    d="M0,350 L200,320 L400,250 L600,280 L800,150 L900,80 L1000,120" 
                    fill="none" 
                    stroke="#66847A" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1200,
                      strokeDashoffset: Math.max(0, 1200 - (progress * 2) * 1200) // Multiplier makes it draw faster
                    }}
                 />

                 {/* Second Data Area/Line - Red */}
                 <path d="M0,400 L0,380 L300,360 L500,300 L700,330 L900,250 L1000,280 L1000,400 Z" fill="rgba(155, 81, 75, 0.1)" />
                 <path 
                    d="M0,380 L300,360 L500,300 L700,330 L900,250 L1000,280" 
                    fill="none" 
                    stroke="#9B514B" 
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    style={{
                      strokeDasharray: '4 4',
                      // Hack to animate dashed line by clipping width via a rect mask
                      clipPath: `inset(0 ${100 - Math.min(100, progress * 200)}% 0 0)` 
                    }}
                 />

                 {/* Key Data Points - pop in based on progress */}
                 <g style={{ opacity: progress > 0.4 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                    <circle cx="400" cy="250" r="6" fill="#F3EBD7" stroke="#66847A" strokeWidth="2"/>
                    <text x="390" y="235" fontSize="14" fill="#3C3932" fontFamily="Inter">1850s</text>
                 </g>
                 <g style={{ opacity: progress > 0.8 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                    <circle cx="900" cy="80" r="8" fill="#9B514B" stroke="#F3EBD7" strokeWidth="2"/>
                    {/* Annotation Box like reference */}
                    <rect x="830" y="30" width="70" height="30" fill="#EFE4CA" stroke="#3C3932" strokeWidth="0.5" rx="2"/>
                    <text x="865" y="50" fontSize="14" fontWeight="bold" fill="#9B514B" fontFamily="Inter" textAnchor="middle">446%</text>
                    <line x1="865" y1="60" x2="885" y2="75" stroke="#3C3932" strokeWidth="1"/>
                 </g>
               </svg>
            </div>
            
            {/* X Axis Labels */}
            <div className="absolute bottom-[-30px] left-0 w-full flex justify-between text-[10px] md:text-xs text-[#594B39] px-2 font-mono">
              <span>1700</span>
              <span>1800</span>
              <span>1900</span>
              <span>2000</span>
              <span>2024</span>
            </div>
          </div>
          
          {/* Legend / Stats Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-[#3C3932]/20 pt-6">
            <FadeReveal delay={100}>
              <div className="text-[#60745C] font-bold mb-1">Global Harvest</div>
              <div className="text-[#302E28] font-serif-en text-lg">6.4 Million Tons</div>
            </FadeReveal>
            <FadeReveal delay={200}>
              <div className="text-[#9B514B] font-bold mb-1">Top Exporter</div>
              <div className="text-[#302E28] font-serif-en text-lg">China (2.9M)</div>
            </FadeReveal>
            <FadeReveal delay={300}>
              <div className="text-[#594B39] font-bold mb-1">Highest Consumer</div>
              <div className="text-[#302E28] font-serif-en text-lg">Turkey (Per capita)</div>
            </FadeReveal>
            <FadeReveal delay={400}>
              <RedSeal text="品鑑" className="w-10 h-10 ml-auto border-[1px]" />
            </FadeReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

function SectionClosing() {
  const [ref, isVisible] = useIntersection({ threshold: 0.5 });

  return (
    <footer className="h-screen relative flex items-center justify-center bg-[#E8DDC5] overflow-hidden">
      <div ref={ref} className="text-center z-10 px-4">
        
        <div className={`transition-all duration-1000 ease-out mb-12 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           {/* Simple abstract leaf/cup mark */}
           <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto stroke-[#302E28] fill-none" strokeWidth="1.5">
             <path d="M20,40 C20,70 50,90 50,90 C50,90 80,70 80,40 C80,20 50,20 50,20 C50,20 20,20 20,40 Z"/>
             <path d="M50,20 Q50,0 70,10" className="opacity-50"/>
           </svg>
        </div>
        
        <h2 className={`font-serif-en text-3xl md:text-5xl text-[#302E28] mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Every cup begins with a mountain.
        </h2>
        
        <p className={`font-serif-tc text-2xl tracking-[0.4em] text-[#66847A] mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          一葉知山水
        </p>

        <button className={`px-8 py-3 border border-[#3C3932] text-sm uppercase tracking-widest hover:bg-[#3C3932] hover:text-[#F3EBD7] transition-colors duration-300 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Discover the Collection
        </button>
      </div>

      {/* Very faint background elements to match vintage style */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 border border-[#302E28] opacity-5 rounded-full mix-blend-multiply"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 border border-[#302E28] opacity-10 rotate-45 mix-blend-multiply"></div>
      
    </footer>
  );
}