# PHALUAY MOTOR — Firebase Authentication setup

เว็บชุดนี้เป็นระบบ Login จริงด้วย Firebase Authentication ไม่ใช่รหัสผ่านที่ฝังไว้ใน JavaScript

## สิ่งที่ทำได้

- สมัครสมาชิกด้วย Email/Gmail + Password
- Login with Google
- Login / สมัครด้วยเบอร์โทร + SMS OTP
- Forgot password ผ่านอีเมล
- Email verification
- Session จริงของ Firebase: ถ้ายังไม่ Login จะเข้า `index.html`, `detail.html`, `account.html`, `admin.html` ไม่ได้
- My Account / Logout
- เก็บ customer profile ขั้นพื้นฐานใน Cloud Firestore
- Admin Dashboard สำหรับ list / disable / enable / delete users ผ่าน Cloud Functions + Admin SDK

## 1) สร้าง Firebase project

1. เข้า Firebase Console: https://console.firebase.google.com/
2. Create project เช่น `phaluaymotor-web`
3. Project settings > Your apps > Add app > Web (`</>`)
4. ตั้งชื่อ app เช่น `PHALUAY MOTOR Website`
5. Firebase จะแสดง `firebaseConfig`
6. เปิดไฟล์ `firebase-config.js` แล้วแทนค่า `PASTE_...` ทั้งหมดด้วยค่าจริง

ตัวอย่างโครง (อย่าใช้ค่าตัวอย่างนี้):

```js
window.PHALUAY_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "phaluaymotor-web.firebaseapp.com",
  projectId: "phaluaymotor-web",
  storageBucket: "phaluaymotor-web.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

> Firebase Web config / API key ไม่ใช่ service-account secret. ความปลอดภัยต้องบังคับด้วย Authentication, Security Rules และสิทธิ์ฝั่ง Server. ห้ามใส่ service-account JSON ลง GitHub เด็ดขาด

## 2) เปิด Sign-in providers

Firebase Console > Authentication > Sign-in method

เปิด:

- Email/Password
- Google
- Phone

สำหรับ Google ให้เลือก support email แล้ว Save

## 3) Phone OTP สำหรับเบอร์ลาว

Firebase Console > Authentication > Settings > SMS region policy

- อนุญาต Laos / LA
- ตั้ง policy ให้ตรงประเทศที่ต้องการให้สมัคร

จากนั้น Authentication > Settings > Authorized domains

เพิ่มโดเมนที่ใช้จริง เช่น:

- `phaluaymotor-svg.github.io`
- โดเมนจริงของ PHALUAY MOTOR ถ้ามี

Phone Authentication ใช้ reCAPTCHA ป้องกัน abuse และ SMS มีค่าใช้จ่ายตาม Firebase/Google Cloud pricing. สำหรับ production ควรตั้ง billing budget / alert.

## 4) สร้าง Firestore

Firebase Console > Firestore Database > Create database

จากโฟลเดอร์โปรเจกต์ ใช้ Firebase CLI deploy rules:

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules
```

กฎใน `firestore.rules` ให้ลูกค้าอ่าน/แก้เฉพาะ profile ของตัวเอง และ Admin อ่านทั้งหมดได้

## 5) GitHub Pages

คุณยังสามารถ Host หน้าเว็บบน GitHub Pages ได้เหมือนเดิม

อัปโหลดไฟล์ทั้งหมดที่ root ของ repo โดยเฉพาะ:

- `index.html`
- `detail.html`
- `login.html`
- `register.html`
- `account.html`
- `admin.html`
- `firebase-config.js`
- `firebase-init.js`
- `auth.js`
- `auth-guard.js`
- `styles.css`
- `assets/...`

GitHub > Settings > Pages:

- Source: Deploy from a branch
- Branch: main
- Folder: /(root)

เมื่อเว็บออนไลน์แล้ว ต้องเพิ่ม hostname ของ GitHub Pages ใน Firebase Authorized domains

## 6) Admin Dashboard (จัดการบัญชีลูกค้า)

Admin API ไม่ควรเรียกด้วย secret จาก browser ดังนั้นเว็บใช้ Cloud Functions + Firebase Admin SDK ใน `functions/`

### Deploy functions

Cloud Functions production ต้องใช้ Firebase Blaze plan

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### ตั้งบัญชีคุณเป็น Admin ครั้งแรก

ใช้เครื่องที่เชื่อถือได้ / Google Cloud Shell เท่านั้น อย่ารัน script นี้ในหน้าเว็บ

```bash
cd functions
npm install
gcloud auth application-default login
node make-admin.js YOUR_ADMIN_EMAIL@gmail.com
```

จากนั้น Logout/Login ใหม่เพื่อให้ token ได้ claim `admin=true`

เปิด:

`admin.html`

Admin Dashboard สามารถ:

- ดูบัญชีลูกค้า
- ดู email / phone / status
- disable / enable user
- delete user

## 7) Test ก่อนเปิดใช้จริง

ทดสอบอย่างน้อย:

1. สมัครด้วย Gmail + Password
2. Logout แล้ว Login ใหม่
3. Forgot password และเปิดอีเมล reset
4. Google Login
5. Phone OTP `+85620...`
6. เปิด `index.html` แบบ incognito ต้องถูกส่งไป Login
7. เปิด `detail.html?id=...` แบบยังไม่ Login ต้องถูกส่งไป Login
8. Account page
9. Admin page ด้วย account ที่มี `admin=true`

## Security notes

- อย่าเก็บรหัสผ่านลูกค้าเอง เว็บไม่เห็น password ของผู้ใช้; Firebase Authentication เป็นผู้จัดการ credentials
- อย่าใส่ service account key, private key, Gmail password หรือ Firebase Admin credential ใน GitHub
- เปิด App Check เพิ่มได้ภายหลังเพื่อลด abuse
- ตั้ง billing alerts โดยเฉพาะ Phone OTP / Cloud Functions
- หากต้องเก็บข้อมูลส่วนบุคคลเพิ่ม เช่น ที่อยู่/เอกสาร/การเงิน ควรมี privacy policy และ rules ที่เข้มขึ้น
