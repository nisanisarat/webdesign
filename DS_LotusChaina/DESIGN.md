---
name: Lotus Pavilion
description: An immersive bilingual journey through lotus, water, seasons, and a Chinese pavilion.
colors:
  jade-ink: "oklch(0.425 0.042 175.1)"
  deep-ink-green: "oklch(0.345 0.033 177.4)"
  lotus-water: "oklch(0.658 0.040 179.0)"
  mist-water: "oklch(0.834 0.024 183.6)"
  lotus-blush: "oklch(0.707 0.071 16.7)"
  soft-lotus: "oklch(0.850 0.038 26.1)"
  antique-gold: "oklch(0.689 0.078 82.7)"
  rice-paper: "oklch(0.932 0.020 87.5)"
  ivory-mist: "oklch(0.960 0.012 96.4)"
  ink-text: "oklch(0.285 0.011 167.8)"
typography:
  display:
    fontFamily: "Noto Serif Thai, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Noto Sans Thai, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  control: "4px"
  panel: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "clamp(72px, 10vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.jade-ink}"
    textColor: "{colors.ivory-mist}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "13px 23px"
---

# Design System: Lotus Pavilion

## Overview

**Creative North Star: "The Living Pond Atlas"**

Lotus Pavilion ต้องให้ความรู้สึกเหมือนเข้าสู่สวนที่มีชีวิต ไม่ใช่กำลังอ่านเว็บไซต์สำเร็จรูป ภาพเต็มพื้นที่ ใบบัวหลายระยะ น้ำ หมอก แสง และจังหวะ Scroll ทำหน้าที่เป็นโครงสร้าง ไม่ใช่ของตกแต่ง

แต่ละหน้ามีโลกการสำรวจต่างกัน: Home เป็นการเดินทางผ่านสวน, Garden เป็นแผนที่ระบบนิเวศ, Pavilion เป็นการสำรวจสถาปัตยกรรม, Seasons เป็นวงล้อเวลา, Gallery เป็นนิทรรศการบนผิวน้ำ, Visit เป็นม้วนแผนการเดินทาง และ Journal เป็นสายน้ำของเรื่องเล่า

Responsive ต้องเปลี่ยน Composition ตามพื้นที่ Mobile ใช้ลำดับแนวตั้ง Bottom sheet และ Scroll snap ส่วน Desktop ใช้ Parallax, Side drawer และ Full-bleed scene ทุกความสามารถต้องมี Reduced-motion และ Keyboard alternative

**Key Characteristics:**

- Botanical imagery เป็นโครงสร้างหลัก
- Deep jade เป็นพื้นที่แบรนด์ ส่วน Ivory เป็นช่วงพักสายตา
- เส้น Antique Gold ใช้นำทางและสื่อการเคลื่อนไหว
- Layout ไม่สมมาตรแต่มีลำดับสายตาชัด
- การเคลื่อนไหวสงบ ช้า และมีเหตุผล

## Colors

ชุดสีใช้ Ink green และ Water เป็นมวลหลัก Pink lotus เป็นจุดโฟกัส และ Gold เป็นเส้นนำทาง สีทั้งหมดใน Frontmatter เป็นค่า Canonical

### Primary

- **Jade Ink:** พื้นที่แบรนด์ ปุ่มหลัก และ Navigation บนพื้นสว่าง
- **Deep Ink Green:** ฉากกลางคืน พื้นที่ใต้น้ำ Lightbox และ Search overlay

### Secondary

- **Lotus Water:** พื้นที่น้ำ ฉากรอง และสถานะที่ไม่ต้องการความเด่นสูง
- **Mist Water:** พื้นรองที่ต้องการความโปร่งและความสงบ

### Tertiary

- **Lotus Blush:** จุดโฟกัส ดอกบัว และสถานะที่เกี่ยวกับการผลิบาน
- **Soft Lotus:** Hover tint และพื้นรองของรายละเอียดดอกไม้
- **Antique Gold:** เส้นทาง Progress, Focus accent และกรอบควบคุม ใช้ไม่เกินประมาณ 10% ของหนึ่งหน้าจอ

### Neutral

- **Rice Paper:** Surface สำหรับข้อความและแบบฟอร์ม
- **Ivory Mist:** Background สว่างและข้อความบน Jade
- **Ink Text:** ข้อความหลักบนพื้นสว่าง

คู่ข้อความที่ตรวจเบื้องต้นผ่านเกณฑ์ ได้แก่ Ink Text บน Ivory Mist, Ink Text บน Rice Paper และ Ivory Mist บน Jade Ink หรือ Deep Ink Green

**The Precious Gold Rule.** Gold ใช้เฉพาะสิ่งที่นำทางหรือเปลี่ยนสถานะ ห้ามใช้เคลือบพื้นที่ขนาดใหญ่

**The Living Contrast Rule.** ข้อความใช้ Ink หรือ Ivory ที่มี contrast ชัด ห้ามใช้สีเทาจางบนพื้นสี

## Typography

**Display Font:** Noto Serif Thai พร้อม Georgia และ Serif fallback

**Body Font:** Noto Sans Thai พร้อม System UI และ Sans-serif fallback

**Character:** Display ให้ความรู้สึกสงบและมีรากทางวัฒนธรรม ขณะที่ Body อ่านง่ายทั้งไทยและอังกฤษโดยไม่เลียนแบบลายพู่กัน

### Hierarchy

- **Display** (500, `clamp(2.75rem, 7vw, 6rem)`, 0.98): Hero และชื่อโลกหลักเท่านั้น
- **Headline** (500, `clamp(2rem, 4vw, 4rem)`, 1.08): ชื่อ Section สำคัญ
- **Title** (500, `clamp(1.35rem, 2vw, 2rem)`, 1.25): Drawer, Article และ Detail title
- **Body** (400, `clamp(1rem, 1.2vw, 1.125rem)`, 1.7): เนื้อหาความยาวไม่เกิน `70ch`
- **Label** (600, `0.8125rem`, `0.04em`): Navigation, Button และข้อมูลสั้น หลีกเลี่ยง All caps ในภาษาไทย

**The Quiet Headline Rule.** หัวเรื่องใหญ่สุดไม่เกิน `6rem` และ Letter spacing ไม่ต่ำกว่า `-0.04em`

**The Real Language Rule.** ภาษาไทยและอังกฤษต้องได้รับการจัดบรรทัดแยกกัน ห้ามใช้ขนาดเดียวแล้วปล่อยให้ข้อความล้น

## Elevation

ระบบใช้ Tonal layering, Focus depth และการซ้อนภาพเป็นหลัก ไม่ใช้เงากว้างบน Card ทุกใบ Surface สว่างแยกจากฉากด้วยความต่างของสีหรือเส้นบาง ส่วน Drawer, Dialog และภาพที่กำลังถูกลากจึงใช้เงาได้เมื่อจำเป็น

### Shadow Vocabulary

- **Interactive lift** (`0 4px 8px rgb(37 44 41 / 0.16)`): ใช้ระหว่าง Hover หรือ Drag เท่านั้น
- **Modal depth** (`0 8px 24px rgb(18 26 23 / 0.28)`): ใช้กับ Dialog และ Drawer ที่ลอยเหนือฉาก

**The Flat-at-Rest Rule.** พื้นผิวปกติต้องแบน เงาปรากฏเมื่อสถานะเปลี่ยนหรือมีชั้นลอยเท่านั้น

## Components

### Buttons

- **Shape:** มุมโค้งน้อยและสุขุม (`4px`)
- **Primary:** Jade Ink บนพื้นสว่าง หรือ Antique Gold outline บน Deep Ink Green
- **Hover:** สีเข้มขึ้นเล็กน้อยและเลื่อนขึ้นไม่เกิน `2px`
- **Active:** ย่อลงเล็กน้อยภายใน `100–150ms`
- **Focus:** เส้น Focus สองชั้นที่มองเห็นได้บนพื้นสว่างและมืด
- **Coming soon:** ยังคงกดได้และเปิดข้อความสถานะ ห้ามใช้ลิงก์ว่าง

### Chips

- ใช้กับ Filter และ Season เท่านั้น
- Selected state ใช้ Jade Ink fill หรือ Antique Gold indicator
- Mobile ต้องเลื่อนแนวนอนได้และมี Scroll snap

### Cards / Containers

- หลีกเลี่ยง Card grid ซ้ำกัน
- ใช้ Container เมื่อข้อมูลต้องมีขอบเขตจริง เช่น Visit summary หรือ Search group
- มุมสูงสุด `12px`; ห้ามใช้เงากว้างร่วมกับ Border เพื่อการตกแต่ง

### Inputs / Fields

- พื้น Rice Paper หรือ Ivory Mist พร้อมเส้น Ink โปร่ง
- Focus เปลี่ยนเส้นเป็น Jade Ink และเพิ่ม Focus ring
- Error ต้องมีข้อความ ไม่พึ่งสีเพียงอย่างเดียว
- Touch target และ Calendar cell ขั้นต่ำ `44px`

### Navigation

- Desktop ใช้ Header โปร่งหรือ Deep Ink ตามฉาก พร้อม Active indicator สี Antique Gold
- Mobile ใช้ Full-screen menu ที่รองรับ Focus trap และ `Esc`
- Language switcher แสดง `TH | EN` และรักษา Route, Query และ Hash เดิม
- Sticky navigation ต้องลดพื้นที่เมื่อ Scroll แต่ห้ามบังหัวข้อปลายทาง

### Signature Components

- **Living Pond Marker:** Ripple hotspot ที่เปิด Drawer หรือ Bottom sheet
- **Season Dial:** วงล้อเลือกฤดูกาลที่มีปุ่มสำรองและ Keyboard control
- **Reflection Gallery:** Horizontal drag บน Desktop และ Contact sheet บน Mobile
- **Visit Journey:** Wizard สามขั้นพร้อม Review และ Confirm
- **Ambient Audio:** Play, Pause, Mute และ Volume โดยไม่ Autoplay

Motion ใช้ Ease-out quart, quint หรือ expo เท่านั้น Feedback อยู่ในช่วง `100–300ms`, Layout transition `300–500ms` และ Hero choreography `500–800ms` ห้ามใช้ Bounce หรือ Elastic

## Do's and Don'ts

### Do:

- **Do** ใช้ภาพดอกบัว ใบบัว น้ำ และศาลาเป็นโครงสร้างของหน้า
- **Do** ออกแบบแต่ละ Detail page ให้มี Interaction เฉพาะเรื่อง
- **Do** ทดสอบตั้งแต่ `320px` ถึงจอขนาดใหญ่ ทั้ง Touch, Mouse และ Keyboard
- **Do** มี Reduced-motion alternative สำหรับทุก Animation
- **Do** ให้ทุกปุ่มเปิดหน้า เปลี่ยนสถานะ หรือแสดง Feedback
- **Do** แยกข้อความไทยและอังกฤษออกจาก Component logic

### Don't:

- **Don't** แสดงชื่อ `DS_LotusChaina` ต่อผู้ใช้
- **Don't** ใช้เว็บไซต์จีนแดง–ทองแบบสำเร็จรูป
- **Don't** ทำทุกหน้าเป็น Hero ตามด้วย Section และ Card grid รูปแบบเดียวกัน
- **Don't** ใช้ Cream editorial layout เป็นโครงหลักของทุกหน้า
- **Don't** ใช้ Glassmorphism, Gradient text, Neon หรือ Card ที่มีมุมเกิน `16px`
- **Don't** ใช้ Animation แบบ fade-and-rise ซ้ำทุก Section
- **Don't** เล่นเสียงอัตโนมัติ
- **Don't** ใช้ Side-stripe border หนากว่า `1px` เป็น Accent
- **Don't** ปล่อยข้อความหรือหัวเรื่องล้น Container บน Tablet และ Mobile
