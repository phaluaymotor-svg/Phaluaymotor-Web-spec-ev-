# PHALUAY MOTOR — EV Website + Real Firebase Authentication

เวอร์ชันนี้รวมเว็บ PHALUAY MOTOR โทนแดง-ดำ, รถ 360°, สเป็ก, 3 ภาษา และระบบสมาชิกจริงด้วย Firebase Authentication

เริ่มจากอ่าน `SETUP_FIREBASE.md`

Auth pages:
- `login.html`
- `register.html`
- `account.html`
- `admin.html`

Firebase files:
- `firebase-config.js` — ใส่ Web config ของโปรเจกต์คุณ
- `firebase-init.js`
- `auth.js`
- `auth-guard.js`
- `firestore.rules`
- `functions/` — Admin customer-management backend

ฝ่ายขาย: 92224844


## 2026 Modern UI update
- Red/black premium UI refreshed for desktop and mobile
- Noto Sans Lao for Lao, Noto Sans Thai for Thai, Inter for English
- Expanded technical specifications: powertrain, dimensions, battery/charging, chassis, core safety, ADAS, smart cabin and comfort
- Unknown trim-specific values remain marked as `ยืนยันตามรุ่นย่อย` instead of being guessed
- Existing Firebase Authentication, GitHub Pages deployment, 360 viewer, compare and 3-language system remain enabled


## Modern Detail UI + Interactive 360
- หน้า Detail เรียงใหม่: Overview → 360 → Performance → Battery/Charging → Dimensions → Chassis → ADAS/Safety → Interior.
- มี Quick Navigation แบบ Sticky
- 360 Viewer รองรับ Drag/Touch, Auto Rotate, Slider, Zoom, Reset และ Keyboard
- ใส่ภาพ 360 จริงผ่าน `views360.js` และโฟลเดอร์ `assets/360/<car-id>/`
- ถ้ายังไม่มีชุดภาพรอบคัน ระบบใช้ Interactive Preview และไม่อ้างว่าเป็น 360 จริง


## Service Center + Smart Compare
- Service Center now includes 6 illustrated service cards: Battery Health Check, Battery Module & BMS, Battery Cooling, EV Maintenance, Body & Paint, Transport/Roadside.
- Service links preselect the Service intent in the contact form.
- Compare table now shows vehicle photos.
- Clearly superior comparable values are highlighted green with a BEST badge.
- Range is only ranked when the selected vehicles use the same energy type and same range test cycle.
- Price is only ranked when exact (not placeholder x,xxx / estimated / inquiry) prices are available.
- Dimensions and other non-unambiguously-better values are shown without ranking.
