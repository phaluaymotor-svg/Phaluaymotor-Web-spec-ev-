# PHALUAY MOTOR — EV Specs & Compare

เว็บ Static พร้อมใช้บน GitHub Pages หรือ AWS Amplify

## ฟังก์ชัน
- ค้นหาและกรองรถตามแบรนด์/ประเภท
- รูปรถจริงจากแหล่งภาพออนไลน์ พร้อม fallback หากโหลดไม่ได้
- ดูสเป็กแบบ Modal
- เปรียบเทียบสูงสุด 3 รุ่น
- ขอราคา/จองรถ/ทดลองขับ
- โทร, SMS และ WhatsApp ไปฝ่ายขาย 92224844
- Responsive สำหรับมือถือ

## แก้ข้อมูลรถ
เปิดไฟล์ `cars.js` แล้วแก้ข้อมูลใน `window.PHALUAY_CARS` เช่น `price`, `range`, `battery`, `power`, `image` และ `note` จากนั้น commit/push ขึ้น GitHub อีกครั้ง

## GitHub Pages
1. สร้าง repository ใหม่
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ไว้ที่ root
3. Settings → Pages → Deploy from a branch
4. เลือก `main` และ `/ (root)`

## AWS Amplify
เชื่อม repository กับ AWS Amplify Hosting แล้วใช้ไฟล์ `amplify.yml` ที่แนบไว้ได้ทันที
