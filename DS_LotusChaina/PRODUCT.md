# Lotus Pavilion Product Definition

## Register

brand

## Platform

web

## Users

ผู้ชมหลักคือผู้ที่สนใจสวนบัว ศิลปะจีน ธรรมชาติ และประสบการณ์ดิจิทัลที่สงบแต่มีรายละเอียด ผู้ใช้อาจเข้าชมผ่านมือถือระหว่างเดินทางหรือผ่านจอขนาดใหญ่เพื่อสำรวจภาพและเรื่องราวอย่างเต็มรูปแบบ

เว็บไซต์ต้องรองรับภาษาไทยและอังกฤษ โดยรักษาหน้าที่และสถานะเดิมเมื่อเปลี่ยนภาษา

## Product Purpose

Lotus Pavilion เป็นเว็บไซต์เชิงประสบการณ์ที่พาผู้ชมสำรวจสระบัว ศาลาจีน ฤดูกาล ภาพถ่าย และเรื่องราวผ่านภาพเต็มพื้นที่ การเลื่อนหน้า และปฏิสัมพันธ์ที่มีจุดประสงค์

ความสำเร็จคือผู้ใช้เข้าใจโครงเรื่องของสวน สามารถเปิดรายละเอียดจากทุก CTA ได้ ใช้งานได้ทุกขนาดจอ และไม่พบปุ่มที่ไม่มีปลายทางหรือไม่มี feedback

ชื่อ `DS_LotusChaina` ใช้เฉพาะเป็นชื่อโฟลเดอร์ภายใน ห้ามแสดงใน Logo, Navigation, Metadata, เนื้อหา หรือข้อความที่ผู้ใช้มองเห็น

## Positioning

การสำรวจสวนบัวจีนที่ผสานธรรมชาติ ศิลปะ และปฏิสัมพันธ์ร่วมสมัย โดยแต่ละหน้ามีรูปแบบการสำรวจเฉพาะตัวแต่ยังอยู่ในโลกภาพเดียวกัน

## Conversion & proof

- Primary CTA: `Explore the Garden` / `สำรวจสวนบัว`
- Secondary CTA: `Plan Your Visit` / `วางแผนการเยี่ยมชม`
- ข้อความที่ควรจดจำ: `Where the lotus meets still water.` / `เมื่อดอกบัวพบกับผืนน้ำอันสงบ`
- Belief ladder:
  1. สวนมีบรรยากาศและเรื่องราวเฉพาะตัว
  2. ดอกบัว ใบบัว น้ำ และศาลาเชื่อมโยงกันเป็นระบบนิเวศเดียว
  3. ผู้ชมสามารถสำรวจเรื่องราวในระดับที่ลึกขึ้นได้
  4. การเยี่ยมชมจริงสามารถวางแผนได้อย่างชัดเจน
- Proof on hand: ภาพ Concept ที่อนุมัติแล้วใน `design-references/`

## Brand Personality

สงบ ละเอียด และมีชีวิต

น้ำเสียงต้องสุขุม เป็นกวีเท่าที่จำเป็น และให้ข้อมูลโดยไม่โอ้อวด ความหรูเกิดจากคุณภาพภาพ จังหวะพื้นที่ว่าง และการเคลื่อนไหว ไม่ใช่การใช้ทองหรือของตกแต่งจำนวนมาก

## Anti-references

- ห้ามเป็นเว็บไซต์ธีมจีนแดง–ทองแบบสำเร็จรูป
- ห้ามทำทุกหน้าเป็น Hero ตามด้วย Section และ Card grid รูปแบบเดียวกัน
- ห้ามใช้ Cream editorial layout เป็นโครงหลักของทุกหน้า
- ห้ามใช้ Glassmorphism, Gradient text, Neon หรือ Card ที่มีมุมโค้งขนาดใหญ่
- ห้ามใช้ Animation แบบ fade-and-rise ซ้ำทุก Section
- ห้ามให้เสียงเล่นอัตโนมัติ
- ห้ามแสดงปุ่มหรือลิงก์ที่กดแล้วไม่มีผลตอบสนอง

## Design Principles

1. **One garden, different journeys.** แต่ละหน้าต้องมีวิธีสำรวจเฉพาะตัว แต่ใช้สี ตัวอักษร และบรรยากาศร่วมกัน
2. **Lotus first.** ดอกบัว ใบบัว น้ำ ราก และการผลิบานเป็นภาษาเชิงภาพหลัก
3. **Motion with meaning.** Animation ต้องอธิบายการเติบโต ทิศทาง ความลึก หรือการเปลี่ยนสถานะ
4. **Every control answers.** ทุกปุ่มต้องเปิดหน้า เปลี่ยนสถานะ หรือให้ feedback ที่ชัดเจน
5. **Responsive by composition.** การจัดองค์ประกอบต้องออกแบบใหม่ตามพื้นที่ ไม่ใช่เพียงย่อ Desktop

## Accessibility & Inclusion

- รองรับ Keyboard navigation และ Focus indicator ที่มองเห็นชัด
- รองรับ `prefers-reduced-motion`
- ปุ่มและพื้นที่สัมผัสขั้นต่ำ `44 × 44px`
- Dialog, Drawer และ Lightbox ต้องปิดด้วย `Esc` และคืน focus ไปยังจุดเดิม
- รูปภาพต้องมี Alt text ทั้งไทยและอังกฤษ
- Audio เริ่มเล่นเมื่อผู้ใช้สั่งเท่านั้น พร้อม Play, Pause, Mute และ Volume
- ข้อความปกติต้องมี contrast อย่างน้อย `4.5:1`
- ภาษาเอกสารต้องกำหนดด้วย `lang="th"` หรือ `lang="en"`

## Objective

สร้างเว็บไซต์สองภาษาที่ถ่ายทอดคอนเซ็ปต์ Lotus Pavilion จากภาพอ้างอิงให้เป็นระบบหน้าและปฏิสัมพันธ์ที่ใช้งานได้จริงบนมือถือ Tablet และ Desktop

## Workflow

1. ผู้ใช้เข้าหน้า Home และเลือกภาษา
2. ผู้ใช้เปิด Garden, Pavilion, Seasons, Gallery, Journal หรือ Visit ผ่าน Navigation และ CTA
3. ทุกหน้าให้ประสบการณ์เฉพาะเรื่องและเชื่อมไปยังเรื่องถัดไป
4. Search ค้นหา Pages, Journal และ Gallery แบบทันที
5. Visit ให้เลือกวัน เวลา และจำนวนผู้เข้าชมก่อนยืนยันคำขอ
6. ระบบ Coming-soon ให้ feedback สำหรับฟังก์ชันที่ยังไม่เชื่อม Backend

## Dependencies

- Next.js และ React
- TypeScript
- ระบบจัดการข้อความไทยและอังกฤษ
- ภาพและเสียงที่มีสิทธิ์ใช้งานชัดเจน
- Animation runtime เพิ่มเติมเฉพาะเมื่อ CSS และ Web Animations API ไม่เพียงพอ

## Configuration

- Public brand name: `Lotus Pavilion`
- Internal project directory: `DS_LotusChaina`
- Supported locales: `th`, `en`
- Default locale: `th`
- Audio autoplay: disabled
- Reduced motion: supported
- Visit mode: request/planning only, no payment

## Usage Example

ผู้ใช้เปิด `/th/` กด `สำรวจสวนบัว` ไปยัง `/th/garden` เลือกจุด `ใต้ผิวน้ำ` เพื่อเปิดรายละเอียดรากบัว จากนั้นไปยัง `/th/pavilion` และจบด้วยการเปิด `/th/visit` เพื่อเลือกช่วงเวลาเยี่ยมชม

## Limitations

- ยังไม่มีข้อมูลจริงของสถานที่ เวลาเปิด พิกัด ช่องทางติดต่อ และ Social URLs
- เนื้อหาพฤกษศาสตร์ต้องผ่านการตรวจสอบก่อนเผยแพร่
- Save, Share, Subscribe และ Map integration เริ่มจาก Coming-soon feedback
- ภาพ Concept ใช้เป็นแนวทางเท่านั้น ไม่ใช้เป็นภาพหน้าเว็บทั้งภาพ
- ประสิทธิภาพ Animation ต้องตรวจสอบบนอุปกรณ์จริงก่อนเผยแพร่
