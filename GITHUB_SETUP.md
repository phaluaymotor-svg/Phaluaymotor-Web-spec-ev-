# PHALUAY MOTOR — GitHub Pages + Firebase

เว็บชุดนี้พร้อมสำหรับ GitHub Pages

## โครงสร้าง
อัปโหลดไฟล์ทั้งหมดไว้ที่ root ของ repository:
- index.html
- detail.html
- login.html
- register.html
- account.html
- admin.html
- firebase-config.js
- styles.css / js / assets
- .nojekyll

## ตั้งค่า GitHub Pages
1. Repository > Settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: /(root)
5. Save

เว็บจะได้ URL ประมาณ:
https://USERNAME.github.io/REPOSITORY/

## ตั้งค่า Firebase
Firebase Console > Project settings > Your apps > Web app
คัดลอก firebaseConfig ไปใส่ใน firebase-config.js

Authentication > Sign-in method:
- Email/Password: Enable
- Google: Enable
- Phone: Enable

Authentication > Settings > Authorized domains:
เพิ่ม
- USERNAME.github.io

หมายเหตุ:
- firebaseConfig ฝั่งเว็บสามารถอยู่ใน GitHub ได้
- ห้ามอัปโหลด Service Account JSON, private key, Admin SDK secret หรือ Gmail password
- Admin user management ต้องรันผ่าน Firebase Cloud Functions / Admin SDK ไม่ใช่บน GitHub Pages
- Phone OTP ใช้ Firebase เป็น backend; GitHub Pages เป็นเพียง frontend
