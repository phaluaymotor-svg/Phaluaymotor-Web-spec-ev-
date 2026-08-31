(() => {
  const dict = {
    'HOME':{lo:'ໜ້າຫຼັກ',th:'หน้าหลัก',en:'HOME'}, 'INVENTORY':{lo:'ລົດທັງໝົດ',th:'รถทั้งหมด',en:'INVENTORY'}, 'COMPARE':{lo:'ປຽບທຽບ',th:'เปรียบเทียบ',en:'COMPARE'},
    'FINANCING':{lo:'ການຜ່ອນຊຳລະ',th:'ผ่อนชำระ',en:'FINANCING'}, 'SPECIALS':{lo:'ໂປຣໂມຊັນ',th:'โปรโมชั่น',en:'SPECIALS'}, 'SERVICE & EV':{lo:'ບໍລິການ EV',th:'บริการ EV',en:'SERVICE & EV'}, 'ABOUT US':{lo:'ກ່ຽວກັບເຮົາ',th:'เกี่ยวกับเรา',en:'ABOUT US'}, 'CONTACT':{lo:'ຕິດຕໍ່',th:'ติดต่อ',en:'CONTACT'},
    'BOOK / INQUIRE':{lo:'ຈອງ / ສອບຖາມ',th:'จอง / สอบถาม',en:'BOOK / INQUIRE'}, 'SEARCH':{lo:'ຄົ້ນຫາ',th:'ค้นหา',en:'SEARCH'},
    'QUALITY EV. PREMIUM EXPERIENCE.':{lo:'EV ຄຸນນະພາບ • ປະສົບການລະດັບພຣີມຽມ',th:'EV คุณภาพ • ประสบการณ์ระดับพรีเมียม',en:'QUALITY EV. PREMIUM EXPERIENCE.'},
    'DRIVE ELECTRIC.':{lo:'ຂັບຂີ່ພະລັງງານໄຟຟ້າ',th:'ขับเคลื่อนด้วยไฟฟ้า',en:'DRIVE ELECTRIC.'}, 'DRIVE PHALUAY.':{lo:'ຂັບກັບ PHALUAY',th:'ขับไปกับ PHALUAY',en:'DRIVE PHALUAY.'},
    'BROWSE INVENTORY':{lo:'ເບິ່ງລົດທັງໝົດ',th:'ดูรถทั้งหมด',en:'BROWSE INVENTORY'}, 'BOOK / ASK NOW':{lo:'ຈອງ / ຖາມຕອນນີ້',th:'จอง / สอบถามตอนนี้',en:'BOOK / ASK NOW'},
    'FIND YOUR NEXT VEHICLE':{lo:'ຄົ້ນຫາລົດຄັນຕໍ່ໄປ',th:'ค้นหารถคันต่อไป',en:'FIND YOUR NEXT VEHICLE'}, 'ค้นหารถที่เหมาะกับคุณ':{lo:'ຄົ້ນຫາລົດທີ່ເໝາະກັບທ່ານ',th:'ค้นหารถที่เหมาะกับคุณ',en:'Find the vehicle that fits you'},
    'Make / แบรนด์':{lo:'ຍີ່ຫໍ້',th:'แบรนด์',en:'Make / Brand'}, 'Model / รุ่น':{lo:'ຮຸ່ນ',th:'รุ่น',en:'Model'}, 'Body Style / ตัวถัง':{lo:'ປະເພດຕົວຖັງ',th:'ประเภทรถ',en:'Body Style'}, 'Max Price / ราคาสูงสุด':{lo:'ລາຄາສູງສຸດ',th:'ราคาสูงสุด',en:'Max Price'},
    'ทุกแบรนด์':{lo:'ທຸກຍີ່ຫໍ້',th:'ทุกแบรนด์',en:'All brands'}, 'ทุกรุ่น':{lo:'ທຸກຮຸ່ນ',th:'ทุกรุ่น',en:'All models'}, 'ทุกประเภท':{lo:'ທຸກປະເພດ',th:'ทุกประเภท',en:'All body styles'}, 'ไม่จำกัด':{lo:'ບໍ່ຈຳກັດ',th:'ไม่จำกัด',en:'No limit'},
    'Advanced Search / ดูรถทั้งหมด ↓':{lo:'ຄົ້ນຫາຂັ້ນສູງ / ເບິ່ງລົດທັງໝົດ ↓',th:'ค้นหาขั้นสูง / ดูรถทั้งหมด ↓',en:'Advanced Search / View all vehicles ↓'},
    'SHOP OUR EV INVENTORY':{lo:'ເລືອກຊື້ EV ຂອງພວກເຮົາ',th:'เลือกรถ EV ของเรา',en:'SHOP OUR EV INVENTORY'}, 'VIEW ALL INVENTORY':{lo:'ເບິ່ງລົດທັງໝົດ',th:'ดูรถทั้งหมด',en:'VIEW ALL INVENTORY'},
    'เปรียบเทียบรถสูงสุด 3 รุ่น':{lo:'ປຽບທຽບລົດໄດ້ສູງສຸດ 3 ຮຸ່ນ',th:'เปรียบเทียบรถสูงสุด 3 รุ่น',en:'Compare up to 3 vehicles'}, 'ล้างทั้งหมด':{lo:'ລ້າງທັງໝົດ',th:'ล้างทั้งหมด',en:'Clear all'},
    'ข้อเสนอและบริการสำหรับลูกค้า EV':{lo:'ຂໍ້ສະເໜີ ແລະ ບໍລິການສຳລັບລູກຄ້າ EV',th:'ข้อเสนอและบริการสำหรับลูกค้า EV',en:'Offers and services for EV customers'},
    'จองรถ / ขอราคา':{lo:'ຈອງລົດ / ຂໍລາຄາ',th:'จองรถ / ขอราคา',en:'Book / Request a quote'}, 'นัดดูรถ / ทดลองขับ':{lo:'ນັດເບິ່ງລົດ / ທົດລອງຂັບ',th:'นัดดูรถ / ทดลองขับ',en:'View / Test drive'},
    'ดูแลครบหลังการขาย':{lo:'ບໍລິການຫຼັງການຂາຍຄົບວົງຈອນ',th:'ดูแลครบหลังการขาย',en:'Complete after-sales care'},
    'READY TO FIND':{lo:'ພ້ອມເລືອກ',th:'พร้อมค้นหา',en:'READY TO FIND'}, 'YOUR NEXT EV?':{lo:'EV ຄັນຕໍ່ໄປບໍ?',th:'EV คันต่อไปของคุณ?',en:'YOUR NEXT EV?'},
    'ชื่อ':{lo:'ຊື່',th:'ชื่อ',en:'Name'}, 'เบอร์โทร':{lo:'ເບີໂທ',th:'เบอร์โทร',en:'Phone'}, 'รุ่นที่สนใจ':{lo:'ຮຸ່ນທີ່ສົນໃຈ',th:'รุ่นที่สนใจ',en:'Vehicle of interest'}, 'ต้องการ':{lo:'ຕ້ອງການ',th:'ต้องการ',en:'Request type'}, 'รายละเอียดเพิ่มเติม':{lo:'ລາຍລະອຽດເພີ່ມ',th:'รายละเอียดเพิ่มเติม',en:'Additional details'}, 'ส่งข้อมูลถึงฝ่ายขาย':{lo:'ສົ່ງຂໍ້ມູນຫາຝ່າຍຂາຍ',th:'ส่งข้อมูลถึงฝ่ายขาย',en:'Send to sales'},
    'โทร 92224844':{lo:'ໂທ 92224844',th:'โทร 92224844',en:'Call 92224844'}, 'โทร':{lo:'ໂທ',th:'โทร',en:'Call'}, 'สอบถามข้อมูล':{lo:'ສອບຖາມຂໍ້ມູນ',th:'สอบถามข้อมูล',en:'Ask for information'}, 'ขอราคา':{lo:'ຂໍລາຄາ',th:'ขอราคา',en:'Request price'}, 'จองรถ':{lo:'ຈອງລົດ',th:'จองรถ',en:'Book vehicle'}, 'ปรึกษาไฟแนนซ์':{lo:'ປຶກສາການເງິນ',th:'ปรึกษาไฟแนนซ์',en:'Financing consultation'},
    'กลับไปรถทั้งหมด':{lo:'ກັບໄປລົດທັງໝົດ',th:'กลับไปรถทั้งหมด',en:'Back to inventory'}, 'จอง / ขอราคา':{lo:'ຈອງ / ຂໍລາຄາ',th:'จอง / ขอราคา',en:'Book / Quote'}, 'สอบถาม WhatsApp':{lo:'ສອບຖາມ WhatsApp',th:'สอบถาม WhatsApp',en:'Ask on WhatsApp'},
    'MODEL OVERVIEW':{lo:'ພາບລວມຮຸ່ນ',th:'ภาพรวมรุ่น',en:'MODEL OVERVIEW'}, 'รายละเอียดรถ':{lo:'ລາຍລະອຽດລົດ',th:'รายละเอียดรถ',en:'Vehicle details'}, 'สนใจรถรุ่นนี้?':{lo:'ສົນໃຈຮຸ່ນນີ້ບໍ?',th:'สนใจรถรุ่นนี้?',en:'Interested in this model?'},
    'สเป็กของรุ่นนี้':{lo:'ສະເປັກຂອງຮຸ່ນນີ້',th:'สเป็กของรุ่นนี้',en:'Specifications for this model'}, 'ขนาดและการใช้งาน':{lo:'ຂະໜາດ ແລະ ການໃຊ້ງານ',th:'ขนาดและการใช้งาน',en:'Dimensions & practicality'},
    'แบตเตอรี่และการชาร์จ':{lo:'ແບັດເຕີຣີ ແລະ ການຊາດ',th:'แบตเตอรี่และการชาร์จ',en:'Battery & charging'}, 'ช่วงล่างและล้อ':{lo:'ຊ່ວງລ່າງ ແລະ ລໍ້',th:'ช่วงล่างและล้อ',en:'Chassis & wheels'}, 'ระบบช่วยขับและความปลอดภัย':{lo:'ລະບົບຊ່ວຍຂັບ ແລະ ຄວາມປອດໄພ',th:'ระบบช่วยขับและความปลอดภัย',en:'ADAS & safety'}, 'เทคโนโลยีและห้องโดยสาร':{lo:'ເທັກໂນໂລຊີ ແລະ ຫ້ອງໂດຍສານ',th:'เทคโนโลยีและห้องโดยสาร',en:'Technology & cabin'},
    'ดูรถแบบ 360°':{lo:'ເບິ່ງລົດແບບ 360°',th:'ดูรถแบบ 360°',en:'360° Vehicle View'}, 'ลากซ้าย–ขวาเพื่อหมุนรถ':{lo:'ລາກຊ້າຍ–ຂວາເພື່ອໝຸນລົດ',th:'ลากซ้าย–ขวาเพื่อหมุนรถ',en:'Drag left–right to rotate'}, 'ชุดภาพ 360° ของรุ่นนี้กำลังรอเพิ่ม':{lo:'ຊຸດຮູບ 360° ຂອງຮຸ່ນນີ້ກຳລັງລໍຖ້າເພີ່ມ',th:'ชุดภาพ 360° ของรุ่นนี้กำลังรอเพิ่ม',en:'360° image set for this model is pending'},
    'ระยะทาง':{lo:'ໄລຍະທາງ',th:'ระยะทาง',en:'Range'}, 'กำลัง':{lo:'ກຳລັງ',th:'กำลัง',en:'Power'}, 'แบตเตอรี่':{lo:'ແບັດເຕີຣີ',th:'แบตเตอรี่',en:'Battery'}, 'ขับเคลื่อน':{lo:'ລະບົບຂັບເຄື່ອນ',th:'ขับเคลื่อน',en:'Drive'}, 'กำลังมอเตอร์':{lo:'ກຳລັງມໍເຕີ',th:'กำลังมอเตอร์',en:'Motor power'}, 'แรงบิด':{lo:'ແຮງບິດ',th:'แรงบิด',en:'Torque'}, 'แรงม้า':{lo:'ແຮງມ້າ',th:'แรงม้า',en:'Horsepower'}, 'ความเร็วสูงสุด':{lo:'ຄວາມໄວສູງສຸດ',th:'ความเร็วสูงสุด',en:'Top speed'}, 'ระบบขับเคลื่อน':{lo:'ລະບົບຂັບເຄື່ອນ',th:'ระบบขับเคลื่อน',en:'Drivetrain'}, 'จำนวนที่นั่ง':{lo:'ຈຳນວນບ່ອນນັ່ງ',th:'จำนวนที่นั่ง',en:'Seats'},
    'ราคา':{lo:'ລາຄາ',th:'ราคา',en:'Price'}, 'ประเภทรถ':{lo:'ປະເພດລົດ',th:'ประเภทรถ',en:'Body type'}, 'ระบบพลังงาน':{lo:'ລະບົບພະລັງງານ',th:'ระบบพลังงาน',en:'Energy type'}, 'สถานะ':{lo:'ສະຖານະ',th:'สถานะ',en:'Status'}, 'มาตรฐานระยะทาง':{lo:'ມາດຕະຖານໄລຍະທາງ',th:'มาตรฐานระยะทาง',en:'Range cycle'},
    'ขนาดตัวรถ (ยาว × กว้าง × สูง)':{lo:'ຂະໜາດຕົວລົດ (ຍາວ × ກວ້າງ × ສູງ)',th:'ขนาดตัวรถ (ยาว × กว้าง × สูง)',en:'Dimensions (L × W × H)'}, 'ความยาว':{lo:'ຄວາມຍາວ',th:'ความยาว',en:'Length'}, 'ความกว้าง':{lo:'ຄວາມກວ້າງ',th:'ความกว้าง',en:'Width'}, 'ความสูง':{lo:'ຄວາມສູງ',th:'ความสูง',en:'Height'}, 'ฐานล้อ':{lo:'ຖານລໍ້',th:'ฐานล้อ',en:'Wheelbase'}, 'ระยะใต้ท้องรถ':{lo:'ໄລຍະໃຕ້ທ້ອງລົດ',th:'ระยะใต้ท้องรถ',en:'Ground clearance'}, 'พื้นที่เก็บสัมภาระ':{lo:'ພື້ນທີ່ເກັບສຳພາລະ',th:'พื้นที่เก็บสัมภาระ',en:'Cargo space'}, 'น้ำหนักรถ':{lo:'ນ້ຳໜັກລົດ',th:'น้ำหนักรถ',en:'Curb weight'}, 'จำนวนประตู':{lo:'ຈຳນວນປະຕູ',th:'จำนวนประตู',en:'Doors'},
    'ประเภทมอเตอร์':{lo:'ປະເພດມໍເຕີ',th:'ประเภทมอเตอร์',en:'Motor type'}, 'ประเภทแบตเตอรี่':{lo:'ປະເພດແບັດເຕີຣີ',th:'ประเภทแบตเตอรี่',en:'Battery type'}, 'ชาร์จ AC':{lo:'ຊາດ AC',th:'ชาร์จ AC',en:'AC charging'}, 'ชาร์จ DC / Fast Charge':{lo:'ຊາດ DC / Fast Charge',th:'ชาร์จ DC / Fast Charge',en:'DC / Fast charging'}, 'หัวชาร์จ':{lo:'ຫົວຊາດ',th:'หัวชาร์จ',en:'Charge port'}, 'จ่ายไฟภายนอก V2L':{lo:'ຈ່າຍໄຟ V2L',th:'จ่ายไฟภายนอก V2L',en:'V2L'},
    'ช่วงล่างหน้า':{lo:'ຊ່ວງລ່າງໜ້າ',th:'ช่วงล่างหน้า',en:'Front suspension'}, 'ช่วงล่างหลัง':{lo:'ຊ່ວງລ່າງຫຼັງ',th:'ช่วงล่างหลัง',en:'Rear suspension'}, 'ยาง / ล้อ':{lo:'ຢາງ / ລໍ້',th:'ยาง / ล้อ',en:'Tyres / wheels'},
    'ระดับระบบช่วยขับ':{lo:'ລະດັບລະບົບຊ່ວຍຂັບ',th:'ระดับระบบช่วยขับ',en:'ADAS level'}, 'กล้อง 360°':{lo:'ກ້ອງ 360°',th:'กล้อง 360°',en:'360° camera'}, 'เรดาร์จอดรถ':{lo:'ເຣດາຈອດລົດ',th:'เรดาร์จอดรถ',en:'Parking sensors'}, 'ACC ครูซคอนโทรลแปรผัน':{lo:'ACC ຄວບຄຸມຄວາມໄວແບບປັບຕົວ',th:'ACC ครูซคอนโทรลแปรผัน',en:'Adaptive cruise control'}, 'AEB เบรกฉุกเฉินอัตโนมัติ':{lo:'AEB ເບຣກສຸກເສີນອັດຕະໂນມັດ',th:'AEB เบรกฉุกเฉินอัตโนมัติ',en:'AEB automatic emergency braking'}, 'LKA ช่วยควบคุมรถในเลน':{lo:'LKA ຊ່ວຍຮັກສາເລນ',th:'LKA ช่วยควบคุมรถในเลน',en:'Lane keeping assist'}, 'BSD เตือนมุมอับสายตา':{lo:'BSD ເຕືອນຈຸດອັບສາຍຕາ',th:'BSD เตือนมุมอับสายตา',en:'Blind spot detection'}, 'LiDAR':{lo:'LiDAR',th:'LiDAR',en:'LiDAR'},
    'ยืนยันตามรุ่นย่อย':{lo:'ຢືນຢັນຕາມຮຸ່ນຍ່ອຍ',th:'ยืนยันตามรุ่นย่อย',en:'Confirm by trim'}, 'สอบถามรุ่นย่อย':{lo:'ສອບຖາມຮຸ່ນຍ່ອຍ',th:'สอบถามรุ่นย่อย',en:'Ask about trim'}, 'สอบถามราคา':{lo:'ສອບຖາມລາຄາ',th:'สอบถามราคา',en:'Ask for price'}, 'สอบถามราคาปัจจุบัน':{lo:'ສອບຖາມລາຄາປັດຈຸບັນ',th:'สอบถามราคาปัจจุบัน',en:'Ask current price'}, 'สอบถาม':{lo:'ສອບຖາມ',th:'สอบถาม',en:'Ask sales'},
    'รุ่นอื่นที่น่าสนใจ':{lo:'ຮຸ່ນອື່ນທີ່ໜ້າສົນໃຈ',th:'รุ่นอื่นที่น่าสนใจ',en:'Other models you may like'}, 'ดูรถทั้งหมด →':{lo:'ເບິ່ງລົດທັງໝົດ →',th:'ดูรถทั้งหมด →',en:'View all vehicles →'},
    'QUICK LINKS':{lo:'ລິ້ງດ່ວນ',th:'ลิงก์ด่วน',en:'QUICK LINKS'}, 'CONTACT US':{lo:'ຕິດຕໍ່ເຮົາ',th:'ติดต่อเรา',en:'CONTACT US'}, 'IMPORTANT':{lo:'ຂໍ້ຄວນຮູ້',th:'ข้อมูลสำคัญ',en:'IMPORTANT'}
  };

  Object.assign(dict, {
    'Sales: Mon–Sat 09:00–18:00':{lo:'ຝ່າຍຂາຍ: ຈັນ–ເສົາ 09:00–18:00',th:'ฝ่ายขาย: จันทร์–เสาร์ 09:00–18:00',en:'Sales: Mon–Sat 09:00–18:00'},
    'เลือก EV และรถพลังงานใหม่จากคลังรุ่น PHALUAY MOTOR ดูสเป็กจริงแยกตามรุ่น เปรียบเทียบสูงสุด 3 คัน และติดต่อทีมขาย 92224844 ได้ในหน้าเดียว':{lo:'ເລືອກ EV ແລະລົດພະລັງງານໃໝ່ຈາກ PHALUAY MOTOR, ເບິ່ງສະເປັກແຍກຕາມຮຸ່ນ, ປຽບທຽບໄດ້ 3 ຄັນ ແລະຕິດຕໍ່ຝ່າຍຂາຍ 92224844 ໄດ້ໃນໜ້າດຽວ',th:'เลือก EV และรถพลังงานใหม่จาก PHALUAY MOTOR ดูสเป็กจริงแยกตามรุ่น เปรียบเทียบสูงสุด 3 คัน และติดต่อทีมขาย 92224844 ได้ในหน้าเดียว',en:'Browse EVs and new-energy vehicles from PHALUAY MOTOR, view model-specific specs, compare up to 3 vehicles, and contact sales at 92224844 from one page.'},
    '✓ EV & PHEV':{lo:'✓ EV & PHEV',th:'✓ EV & PHEV',en:'✓ EV & PHEV'}, '✓ Compare Specs':{lo:'✓ ປຽບທຽບສະເປັກ',th:'✓ เปรียบเทียบสเป็ก',en:'✓ Compare Specs'}, '✓ After-sales Support':{lo:'✓ ບໍລິການຫຼັງການຂາຍ',th:'✓ บริการหลังการขาย',en:'✓ After-sales Support'},
    'PHALUAY MOTOR INVENTORY':{lo:'ລາຍການລົດ PHALUAY MOTOR',th:'รถทั้งหมด PHALUAY MOTOR',en:'PHALUAY MOTOR INVENTORY'},
    'รถ EV / PHEV / EREV ที่ PHALUAY MOTOR เคยนำเสนอ ขาย รับสั่ง หรือมีข้อมูล พร้อมหน้าสเป็กเฉพาะรุ่นและปุ่มสอบถาม':{lo:'ລົດ EV / PHEV / EREV ທີ່ PHALUAY MOTOR ນຳສະເໜີ, ຈຳໜ່າຍ ຫຼື ຮັບສັ່ງ ພ້ອມໜ້າສະເປັກແຍກຕາມຮຸ່ນ',th:'รถ EV / PHEV / EREV ที่ PHALUAY MOTOR นำเสนอ ขาย หรือรับสั่ง พร้อมหน้าสเป็กเฉพาะรุ่น',en:'EV / PHEV / EREV models presented, sold or available to order through PHALUAY MOTOR, with model-specific specification pages.'},
    'QUALITY YOU CAN TRUST':{lo:'ຄຸນນະພາບທີ່ໄວ້ໃຈໄດ້',th:'คุณภาพที่ไว้ใจได้',en:'QUALITY YOU CAN TRUST'}, 'จัดข้อมูลสเป็กให้ดูง่ายก่อนตัดสินใจ':{lo:'ຈັດສະເປັກໃຫ້ເບິ່ງງ່າຍກ່ອນຕັດສິນໃຈ',th:'จัดข้อมูลสเป็กให้ดูง่ายก่อนตัดสินใจ',en:'Clear specifications to help you decide.'},
    'PRICE & VALUE':{lo:'ລາຄາ & ຄວາມຄຸ້ມຄ່າ',th:'ราคาและความคุ้มค่า',en:'PRICE & VALUE'}, 'เทียบราคา ระยะทาง และสมรรถนะได้เร็ว':{lo:'ປຽບທຽບລາຄາ ໄລຍະທາງ ແລະສະມັດຖະນະໄດ້ໄວ',th:'เทียบราคา ระยะทาง และสมรรถนะได้เร็ว',en:'Quickly compare price, range and performance.'},
    'ดูแลแบตเตอรี่ BMS และงานบำรุงรักษา EV':{lo:'ດູແລແບັດເຕີຣີ, BMS ແລະບຳລຸງຮັກສາ EV',th:'ดูแลแบตเตอรี่ BMS และงานบำรุงรักษา EV',en:'Battery, BMS and EV maintenance support.'}, 'ติดต่อฝ่ายขายโดยตรง 92224844':{lo:'ຕິດຕໍ່ຝ່າຍຂາຍໂດຍກົງ 92224844',th:'ติดต่อฝ่ายขายโดยตรง 92224844',en:'Contact sales directly: 92224844.'},
    'COMPARE VEHICLES':{lo:'ປຽບທຽບລົດ',th:'เปรียบเทียบรถ',en:'COMPARE VEHICLES'}, 'เลือกรุ่นที่สนใจแล้วดูราคา ระยะทาง แบตเตอรี่ กำลัง แรงบิด และข้อมูลหลักแบบเทียบกัน':{lo:'ເລືອກຮຸ່ນທີ່ສົນໃຈ ແລ້ວປຽບທຽບລາຄາ, ໄລຍະທາງ, ແບັດເຕີຣີ, ກຳລັງ ແລະແຮງບິດ',th:'เลือกรุ่นที่สนใจแล้วดูราคา ระยะทาง แบตเตอรี่ กำลัง แรงบิด และข้อมูลหลักแบบเทียบกัน',en:'Select models to compare price, range, battery, power, torque and other key data.'},
    'เลือกรุ่นที่สนใจและส่งข้อมูลให้ฝ่ายขายติดต่อกลับ':{lo:'ເລືອກຮຸ່ນ ແລະສົ່ງຂໍ້ມູນໃຫ້ຝ່າຍຂາຍຕິດຕໍ່ກັບ',th:'เลือกรุ่นที่สนใจและส่งข้อมูลให้ฝ่ายขายติดต่อกลับ',en:'Choose a model and send your details for a sales callback.'}, 'GET A QUOTE →':{lo:'ຂໍລາຄາ →',th:'ขอราคา →',en:'GET A QUOTE →'},
    'นัดหมายเวลาเข้าชมรถและรับคำแนะนำรุ่นที่เหมาะกับการใช้งาน':{lo:'ນັດເວລາເຂົ້າເບິ່ງລົດ ແລະຮັບຄຳແນະນຳຮຸ່ນທີ່ເໝາະກັບການໃຊ້ງານ',th:'นัดหมายเวลาเข้าชมรถและรับคำแนะนำรุ่นที่เหมาะกับการใช้งาน',en:'Schedule a showroom visit and get model recommendations for your needs.'}, 'BOOK A VISIT →':{lo:'ນັດເບິ່ງລົດ →',th:'นัดดูรถ →',en:'BOOK A VISIT →'},
    'ตรวจสุขภาพแบตเตอรี่ BMS ระบบหล่อเย็น งานสีและตัวถัง':{lo:'ກວດສຸຂະພາບແບັດເຕີຣີ, BMS, ລະບົບຫຼໍ່ເຢັນ, ສີ ແລະຕົວຖັງ',th:'ตรวจสุขภาพแบตเตอรี่ BMS ระบบหล่อเย็น งานสีและตัวถัง',en:'Battery health, BMS, cooling, body and paint services.'}, 'VIEW SERVICE →':{lo:'ເບິ່ງບໍລິການ →',th:'ดูบริการ →',en:'VIEW SERVICE →'},
    'แจ้งรุ่นรถ งบประมาณ และรูปแบบการชำระที่สนใจ เพื่อให้ฝ่ายขายช่วยแนะนำทางเลือก':{lo:'ແຈ້ງຮຸ່ນລົດ, ງົບປະມານ ແລະຮູບແບບການຊຳລະ ເພື່ອໃຫ້ຝ່າຍຂາຍແນະນຳທາງເລືອກ',th:'แจ้งรุ่นรถ งบประมาณ และรูปแบบการชำระที่สนใจ เพื่อให้ฝ่ายขายช่วยแนะนำทางเลือก',en:'Share the model, budget and payment preference so our sales team can suggest options.'}, 'ASK ABOUT FINANCING':{lo:'ສອບຖາມການຜ່ອນ',th:'สอบถามไฟแนนซ์',en:'ASK ABOUT FINANCING'},
    'นัดดูรถหรือทดลองขับรุ่นที่สนใจ แล้วให้ทีมขายประสานงานเวลาที่สะดวก':{lo:'ນັດເບິ່ງ ຫຼື ທົດລອງຂັບຮຸ່ນທີ່ສົນໃຈ ແລ້ວໃຫ້ທີມຂາຍປະສານເວລາທີ່ສະດວກ',th:'นัดดูรถหรือทดลองขับรุ่นที่สนใจ แล้วให้ทีมขายประสานงานเวลาที่สะดวก',en:'Book a viewing or test drive and let the sales team arrange a convenient time.'},
    'ตรวจสุขภาพแบตเตอรี่ โมดูล BMS และระบบระบายความร้อน':{lo:'ກວດສຸຂະພາບແບັດເຕີຣີ, ໂມດູນ BMS ແລະລະບົບລະບາຍຄວາມຮ້ອນ',th:'ตรวจสุขภาพแบตเตอรี่ โมดูล BMS และระบบระบายความร้อน',en:'Battery health, module, BMS and cooling-system inspection.'}, 'ตรวจเช็กและบำรุงรักษารถ EV / PHEV อย่างเป็นระบบ':{lo:'ກວດເຊັກ ແລະບຳລຸງຮັກສາ EV / PHEV ຢ່າງເປັນລະບົບ',th:'ตรวจเช็กและบำรุงรักษารถ EV / PHEV อย่างเป็นระบบ',en:'Structured EV / PHEV inspection and maintenance.'},
    'ประสานงานขนส่งรถและช่วยเหลือตามความต้องการของลูกค้า':{lo:'ປະສານງານຂົນສົ່ງລົດ ແລະຊ່ວຍເຫຼືອຕາມຄວາມຕ້ອງການ',th:'ประสานงานขนส่งรถและช่วยเหลือตามความต้องการของลูกค้า',en:'Vehicle transport coordination and customer support.'}, 'งานตัวถัง สี และเก็บรายละเอียดรถเพื่อความเรียบร้อย':{lo:'ວຽກຕົວຖັງ, ສີ ແລະການເກັບລາຍລະອຽດລົດ',th:'งานตัวถัง สี และเก็บรายละเอียดรถเพื่อความเรียบร้อย',en:'Body, paint and finishing work.'},
    'พื้นที่สำหรับเลือกซื้อ สั่งจอง และสอบถามรถไฟฟ้าหลากหลายรุ่น พร้อมบริการตรวจเช็ก ซ่อมบำรุงแบตเตอรี่ และดูแลหลังการขาย':{lo:'ສູນເລືອກຊື້, ສັ່ງຈອງ ແລະສອບຖາມລົດໄຟຟ້າຫຼາຍຮຸ່ນ ພ້ອມບໍລິການກວດເຊັກ, ສ້ອມແປງແບັດເຕີຣີ ແລະຫຼັງການຂາຍ',th:'พื้นที่สำหรับเลือกซื้อ สั่งจอง และสอบถามรถไฟฟ้าหลากหลายรุ่น พร้อมบริการตรวจเช็ก ซ่อมบำรุงแบตเตอรี่ และดูแลหลังการขาย',en:'A place to browse, order and enquire about many electric models, with inspection, battery service and after-sales support.'},
    'รุ่นในเว็บไซต์':{lo:'ຮຸ່ນໃນເວັບ',th:'รุ่นในเว็บไซต์',en:'Models on website'}, 'แบรนด์':{lo:'ຍີ່ຫໍ້',th:'แบรนด์',en:'Brands'}, 'รุ่นเทียบพร้อมกัน':{lo:'ຮຸ່ນທີ່ປຽບທຽບພ້ອມກັນ',th:'รุ่นเทียบพร้อมกัน',en:'Models compared at once'}, 'ฝ่ายขาย':{lo:'ຝ່າຍຂາຍ',th:'ฝ่ายขาย',en:'Sales'},
    'เลือก “สอบถามข้อมูล”, “ขอราคา”, “จองรถ”, “ทดลองขับ” หรือ “ปรึกษาไฟแนนซ์” แล้วระบบจะสร้างข้อความพร้อมส่งผ่าน WhatsApp':{lo:'ເລືອກ “ສອບຖາມ”, “ຂໍລາຄາ”, “ຈອງລົດ”, “ທົດລອງຂັບ” ຫຼື “ປຶກສາການເງິນ” ແລ້ວລະບົບຈະສ້າງຂໍ້ຄວາມສຳລັບ WhatsApp',th:'เลือก “สอบถามข้อมูล”, “ขอราคา”, “จองรถ”, “ทดลองขับ” หรือ “ปรึกษาไฟแนนซ์” แล้วระบบจะสร้างข้อความพร้อมส่งผ่าน WhatsApp',en:'Choose information, quote, booking, test drive or financing and the site will prepare a WhatsApp message.'},
    'ข้อมูลสเป็กและราคาอาจต่างตามรุ่นย่อย/ตลาด':{lo:'ສະເປັກ ແລະລາຄາອາດແຕກຕ່າງຕາມຮຸ່ນຍ່ອຍ/ຕະຫຼາດ',th:'ข้อมูลสเป็กและราคาอาจต่างตามรุ่นย่อย/ตลาด',en:'Specifications and prices may vary by trim/market.'}, 'กรุณายืนยันข้อมูลล่าสุดกับฝ่ายขายก่อนจอง':{lo:'ກະລຸນາຢືນຢັນຂໍ້ມູນລ່າສຸດກັບຝ່າຍຂາຍກ່ອນຈອງ',th:'กรุณายืนยันข้อมูลล่าสุดกับฝ่ายขายก่อนจอง',en:'Please confirm the latest data with sales before booking.'},
    'รถที่เลือกเปรียบเทียบ':{lo:'ລົດທີ່ເລືອກປຽບທຽບ',th:'รถที่เลือกเปรียบเทียบ',en:'Selected for comparison'}, 'ดูตารางเทียบ':{lo:'ເບິ່ງຕາຕະລາງປຽບທຽບ',th:'ดูตารางเทียบ',en:'View comparison'},
    'ติดต่อ PHALUAY MOTOR พร้อมระบุรุ่นรถ เพื่อสอบถามราคา รุ่นย่อย สีรถ และวันนัดดูรถ':{lo:'ຕິດຕໍ່ PHALUAY MOTOR ພ້ອມລະບຸຮຸ່ນ ເພື່ອສອບຖາມລາຄາ, ຮຸ່ນຍ່ອຍ, ສີ ແລະວັນນັດເບິ່ງລົດ',th:'ติดต่อ PHALUAY MOTOR พร้อมระบุรุ่นรถ เพื่อสอบถามราคา รุ่นย่อย สีรถ และวันนัดดูรถ',en:'Contact PHALUAY MOTOR with the model name to ask about price, trim, color and viewing date.'},
    'ข้อมูลแยกตามรุ่นรถจริง ถ้ารายการใดขึ้นอยู่กับรุ่นย่อย ระบบจะระบุให้ยืนยันกับฝ่ายขายแทนการเดาตัวเลข':{lo:'ຂໍ້ມູນແຍກຕາມຮຸ່ນຈິງ; ຖ້າລາຍການໃດຂຶ້ນກັບຮຸ່ນຍ່ອຍ ລະບົບຈະໃຫ້ຢືນຢັນກັບຝ່າຍຂາຍແທນການຄາດເດົາ',th:'ข้อมูลแยกตามรุ่นรถจริง ถ้ารายการใดขึ้นอยู่กับรุ่นย่อย ระบบจะระบุให้ยืนยันกับฝ่ายขายแทนการเดาตัวเลข',en:'Data is model-specific. Trim-dependent items are marked for sales confirmation instead of being guessed.'},
    'ฟังก์ชัน ADAS อาจต่างกันตามรุ่นย่อยและตลาดนำเข้า โปรดยืนยันรถคันจริงก่อนจอง':{lo:'ຟັງຊັນ ADAS ອາດແຕກຕ່າງຕາມຮຸ່ນຍ່ອຍ ແລະຕະຫຼາດ; ກະລຸນາຢືນຢັນລົດຄັນຈິງກ່ອນຈອງ',th:'ฟังก์ชัน ADAS อาจต่างกันตามรุ่นย่อยและตลาดนำเข้า โปรดยืนยันรถคันจริงก่อนจอง',en:'ADAS features can vary by trim and import market. Confirm the actual vehicle before booking.'},
    'ข้อมูลตามรุ่นจริง':{lo:'ຂໍ້ມູນຕາມຮຸ່ນຈິງ',th:'ข้อมูลตามรุ่นจริง',en:'Model-specific data'}, 'ค่าที่มีแหล่งยืนยันจะแสดงในระบบ ส่วนอุปกรณ์ที่แตกต่างตามรุ่นย่อย ปีผลิต หรือตลาด จะขึ้น “ยืนยันตามรุ่นย่อย”':{lo:'ຄ່າທີ່ມີແຫຼ່ງຢືນຢັນຈະສະແດງ; ອຸປະກອນທີ່ແຕກຕ່າງຕາມຮຸ່ນຍ່ອຍ/ປີ/ຕະຫຼາດ ຈະຂຶ້ນ “ຢືນຢັນຕາມຮຸ່ນຍ່ອຍ”',th:'ค่าที่มีแหล่งยืนยันจะแสดงในระบบ ส่วนอุปกรณ์ที่แตกต่างตามรุ่นย่อย ปีผลิต หรือตลาด จะขึ้น “ยืนยันตามรุ่นย่อย”',en:'Verified values are displayed; trim/year/market-dependent equipment is marked “Confirm by trim”.'},
    'สเป็กอาจต่างตามรุ่นย่อย/ปีผลิต/ตลาด':{lo:'ສະເປັກອາດແຕກຕ່າງຕາມຮຸ່ນຍ່ອຍ/ປີຜະລິດ/ຕະຫຼາດ',th:'สเป็กอาจต่างตามรุ่นย่อย/ปีผลิต/ตลาด',en:'Specifications may vary by trim/model year/market.'}, 'กรุณายืนยันรถคันจริงและรุ่นย่อยกับฝ่ายขายก่อนจอง':{lo:'ກະລຸນາຢືນຢັນລົດຄັນຈິງ ແລະຮຸ່ນຍ່ອຍກັບຝ່າຍຂາຍກ່ອນຈອງ',th:'กรุณายืนยันรถคันจริงและรุ่นย่อยกับฝ่ายขายก่อนจอง',en:'Confirm the actual vehicle and trim with sales before booking.'},
    'ALL VEHICLES':{lo:'ລົດທັງໝົດ',th:'รถทั้งหมด',en:'ALL VEHICLES'}, 'VIEW DETAILS →':{lo:'ເບິ່ງລາຍລະອຽດ →',th:'ดูรายละเอียด →',en:'VIEW DETAILS →'}, '+ COMPARE':{lo:'+ ປຽບທຽບ',th:'+ เปรียบเทียบ',en:'+ COMPARE'}, '✓ SELECTED':{lo:'✓ ເລືອກແລ້ວ',th:'✓ เลือกแล้ว',en:'✓ SELECTED'}, 'จอง / สอบถาม':{lo:'ຈອງ / ສອບຖາມ',th:'จอง / สอบถาม',en:'BOOK / INQUIRE'}, 'เลือกรุ่นรถ':{lo:'ເລືອກຮຸ່ນລົດ',th:'เลือกรุ่นรถ',en:'Choose a vehicle'},
    'ไม่พบรถตามเงื่อนไขที่ค้นหา':{lo:'ບໍ່ພົບລົດຕາມເງື່ອນໄຂ',th:'ไม่พบรถตามเงื่อนไขที่ค้นหา',en:'No vehicles match your filters.'}, 'ไม่พบรถตามตัวกรอง':{lo:'ບໍ່ພົບລົດຕາມຕົວກອງ',th:'ไม่พบรถตามตัวกรอง',en:'No vehicles match the filters.'}, 'เปรียบเทียบได้สูงสุด 3 รุ่น':{lo:'ປຽບທຽບໄດ້ສູງສຸດ 3 ຮຸ່ນ',th:'เปรียบเทียบได้สูงสุด 3 รุ่น',en:'You can compare up to 3 vehicles.'}
  });


  Object.assign(dict, {
    'ระบบขับเคลื่อนและชุดส่งกำลัง':{lo:'ລະບົບຂັບເຄື່ອນ ແລະ ຊຸດສົ່ງກຳລັງ',th:'ระบบขับเคลื่อนและชุดส่งกำลัง',en:'Powertrain & transmission'},
    'รวมข้อมูลมอเตอร์ เครื่องยนต์ในรุ่น PHEV/EREV และระบบส่งกำลัง':{lo:'ລວມຂໍ້ມູນມໍເຕີ, ເຄື່ອງຈັກໃນ PHEV/EREV ແລະລະບົບສົ່ງກຳລັງ',th:'รวมข้อมูลมอเตอร์ เครื่องยนต์ในรุ่น PHEV/EREV และระบบส่งกำลัง',en:'Motor, PHEV/EREV engine and transmission information.'},
    'ระบบความปลอดภัยพื้นฐาน':{lo:'ລະບົບຄວາມປອດໄພພື້ນຖານ',th:'ระบบความปลอดภัยพื้นฐาน',en:'Core safety systems'},
    'ความสะดวกสบายและอุปกรณ์ภายใน':{lo:'ຄວາມສະດວກສະບາຍ ແລະ ອຸປະກອນພາຍໃນ',th:'ความสะดวกสบายและอุปกรณ์ภายใน',en:'Comfort & interior equipment'},
    'จำนวนมอเตอร์':{lo:'ຈຳນວນມໍເຕີ',th:'จำนวนมอเตอร์',en:'Motor count'}, 'ตำแหน่งมอเตอร์':{lo:'ຕຳແໜ່ງມໍເຕີ',th:'ตำแหน่งมอเตอร์',en:'Motor position'}, 'ชุดเกียร์ / ระบบส่งกำลัง':{lo:'ຊຸດເກຍ / ລະບົບສົ່ງກຳລັງ',th:'ชุดเกียร์ / ระบบส่งกำลัง',en:'Transmission'},
    'เครื่องยนต์เบนซิน / Range Extender':{lo:'ເຄື່ອງຈັກນ້ຳມັນ / Range Extender',th:'เครื่องยนต์เบนซิน / Range Extender',en:'Engine / Range extender'}, 'ความจุเครื่องยนต์':{lo:'ຄວາມຈຸເຄື່ອງຈັກ',th:'ความจุเครื่องยนต์',en:'Engine displacement'}, 'กำลังเครื่องยนต์':{lo:'ກຳລັງເຄື່ອງຈັກ',th:'กำลังเครื่องยนต์',en:'Engine power'}, 'ความจุถังน้ำมัน':{lo:'ຄວາມຈຸຖັງນ້ຳມັນ',th:'ความจุถังน้ำมัน',en:'Fuel tank'}, 'ระยะทางไฟฟ้าล้วน':{lo:'ໄລຍະທາງໄຟຟ້າລ້ວນ',th:'ระยะทางไฟฟ้าล้วน',en:'Pure EV range'}, 'ระยะทางรวมระบบ':{lo:'ໄລຍະທາງລວມລະບົບ',th:'ระยะทางรวมระบบ',en:'Combined range'}, 'โหมดการขับขี่':{lo:'ໂໝດການຂັບຂີ່',th:'โหมดการขับขี่',en:'Drive modes'},
    'ช่วงล้อหน้า':{lo:'ຊ່ວງລໍ້ໜ້າ',th:'ช่วงล้อหน้า',en:'Front track'}, 'ช่วงล้อหลัง':{lo:'ຊ່ວງລໍ້ຫຼັງ',th:'ช่วงล้อหลัง',en:'Rear track'}, 'รัศมีวงเลี้ยว':{lo:'ລັດສະໝີວົງລ້ຽວ',th:'รัศมีวงเลี้ยว',en:'Turning radius'}, 'พื้นที่เก็บของด้านหน้า (Frunk)':{lo:'ພື້ນທີ່ເກັບຂອງດ້ານໜ້າ (Frunk)',th:'พื้นที่เก็บของด้านหน้า (Frunk)',en:'Front trunk (Frunk)'}, 'น้ำหนักรวมสูงสุด':{lo:'ນ້ຳໜັກລວມສູງສຸດ',th:'น้ำหนักรวมสูงสุด',en:'Gross vehicle weight'}, 'รูปแบบที่นั่ง':{lo:'ຮູບແບບບ່ອນນັ່ງ',th:'รูปแบบที่นั่ง',en:'Seating layout'},
    'ความจุแบตเตอรี่ที่ใช้งานได้':{lo:'ຄວາມຈຸແບັດເຕີຣີທີ່ໃຊ້ງານໄດ້',th:'ความจุแบตเตอรี่ที่ใช้งานได้',en:'Usable battery capacity'}, 'แรงดันแพลตฟอร์ม':{lo:'ແຮງດັນແພລດຟອມ',th:'แรงดันแพลตฟอร์ม',en:'Voltage platform'}, 'ระบบจัดการอุณหภูมิแบตเตอรี่':{lo:'ລະບົບຈັດການອຸນຫະພູມແບັດເຕີຣີ',th:'ระบบจัดการอุณหภูมิแบตเตอรี่',en:'Battery thermal management'}, 'กำลังชาร์จ DC สูงสุด':{lo:'ກຳລັງຊາດ DC ສູງສຸດ',th:'กำลังชาร์จ DC สูงสุด',en:'Max DC charging power'}, 'เวลา Fast Charge 10–80%':{lo:'ເວລາ Fast Charge 10–80%',th:'เวลา Fast Charge 10–80%',en:'10–80% fast-charge time'}, 'Regenerative Braking':{lo:'Regenerative Braking',th:'Regenerative Braking',en:'Regenerative braking'}, 'V2V / V2H':{lo:'V2V / V2H',th:'V2V / V2H',en:'V2V / V2H'},
    'พวงมาลัย':{lo:'ພວງມາໄລ',th:'พวงมาลัย',en:'Steering'}, 'ระบบปรับช่วงล่าง':{lo:'ລະບົບປັບຊ່ວງລ່າງ',th:'ระบบปรับช่วงล่าง',en:'Adaptive suspension'}, 'เบรกมือ':{lo:'ເບຣກມື',th:'เบรกมือ',en:'Parking brake'}, 'ขนาดล้อ':{lo:'ຂະໜາດລໍ້',th:'ขนาดล้อ',en:'Wheel size'}, 'ชุดซ่อมยาง / ยางอะไหล่':{lo:'ຊຸດສ້ອມຢາງ / ຢາງສຳຮອງ',th:'ชุดซ่อมยาง / ยางอะไหล่',en:'Tyre repair / spare wheel'},
    'ABS ระบบป้องกันล้อล็อก':{lo:'ABS ປ້ອງກັນລໍ້ລັອກ',th:'ABS ระบบป้องกันล้อล็อก',en:'ABS'}, 'EBD กระจายแรงเบรก':{lo:'EBD ກະຈາຍແຮງເບຣກ',th:'EBD กระจายแรงเบรก',en:'EBD'}, 'ESC / ESP ระบบควบคุมเสถียรภาพ':{lo:'ESC / ESP ຄວບຄຸມສະຖຽນລະພາບ',th:'ESC / ESP ระบบควบคุมเสถียรภาพ',en:'ESC / ESP'}, 'TCS ระบบป้องกันล้อหมุนฟรี':{lo:'TCS ປ້ອງກັນລໍ້ໝູນຟຣີ',th:'TCS ระบบป้องกันล้อหมุนฟรี',en:'Traction control'}, 'TPMS ตรวจแรงดันลมยาง':{lo:'TPMS ກວດແຮງດັນຢາງ',th:'TPMS ตรวจแรงดันลมยาง',en:'TPMS'}, 'HSA ช่วยออกตัวบนทางลาด':{lo:'HSA ຊ່ວຍອອກຕົວເທິງທາງຊັນ',th:'HSA ช่วยออกตัวบนทางลาด',en:'Hill-start assist'}, 'HDC ช่วยลงทางลาด':{lo:'HDC ຊ່ວຍລົງທາງຊັນ',th:'HDC ช่วยลงทางลาด',en:'Hill-descent control'}, 'Auto Hold':{lo:'Auto Hold',th:'Auto Hold',en:'Auto Hold'}, 'ISOFIX':{lo:'ISOFIX',th:'ISOFIX',en:'ISOFIX'}, 'ระบบตรวจจับผู้ขับขี่ / DMS':{lo:'ລະບົບກວດຜູ້ຂັບ / DMS',th:'ระบบตรวจจับผู้ขับขี่ / DMS',en:'Driver monitoring system'}, 'เตือนการชนด้านหน้า FCW':{lo:'ເຕືອນການຊົນດ້ານໜ້າ FCW',th:'เตือนการชนด้านหน้า FCW',en:'Forward collision warning'}, 'เตือนการชนด้านหลัง RCW':{lo:'ເຕືອນການຊົນດ້ານຫຼັງ RCW',th:'เตือนการชนด้านหลัง RCW',en:'Rear collision warning'}, 'เตือนเปิดประตู DOW':{lo:'ເຕືອນເປີດປະຕູ DOW',th:'เตือนเปิดประตู DOW',en:'Door opening warning'},
    'หน้าจอคนขับ':{lo:'ໜ້າຈໍຄົນຂັບ',th:'หน้าจอคนขับ',en:'Driver display'}, 'หน้าจอกลาง / Infotainment':{lo:'ໜ້າຈໍກາງ / Infotainment',th:'หน้าจอกลาง / Infotainment',en:'Center infotainment display'}, 'HUD / AR-HUD':{lo:'HUD / AR-HUD',th:'HUD / AR-HUD',en:'HUD / AR-HUD'}, 'จำนวนลำโพง':{lo:'ຈຳນວນລຳໂພງ',th:'จำนวนลำโพง',en:'Speakers'}, 'Apple CarPlay':{lo:'Apple CarPlay',th:'Apple CarPlay',en:'Apple CarPlay'}, 'Android Auto':{lo:'Android Auto',th:'Android Auto',en:'Android Auto'}, 'แอปควบคุมรถระยะไกล':{lo:'ແອັບຄວບຄຸມລົດລະຍະໄກ',th:'แอปควบคุมรถระยะไกล',en:'Remote vehicle app'},
    'วัสดุเบาะ':{lo:'ວັດສະດຸບ່ອນນັ່ງ',th:'วัสดุเบาะ',en:'Seat material'}, 'เบาะคนขับปรับไฟฟ้า':{lo:'ບ່ອນນັ່ງຄົນຂັບປັບໄຟຟ້າ',th:'เบาะคนขับปรับไฟฟ้า',en:'Power driver seat'}, 'เบาะผู้โดยสารหน้าปรับไฟฟ้า':{lo:'ບ່ອນນັ່ງຜູ້ໂດຍສານໜ້າປັບໄຟຟ້າ',th:'เบาะผู้โดยสารหน้าปรับไฟฟ้า',en:'Power front passenger seat'}, 'ระบบจำตำแหน่งเบาะ':{lo:'ລະບົບຈື່ຕຳແໜ່ງບ່ອນນັ່ງ',th:'ระบบจำตำแหน่งเบาะ',en:'Seat memory'}, 'เบาะอุ่น':{lo:'ບ່ອນນັ່ງອຸ່ນ',th:'เบาะอุ่น',en:'Heated seats'}, 'เบาะระบายอากาศ':{lo:'ບ່ອນນັ່ງລະບາຍອາກາດ',th:'เบาะระบายอากาศ',en:'Ventilated seats'}, 'เบาะนวด':{lo:'ບ່ອນນັ່ງນວດ',th:'เบาะนวด',en:'Massage seats'}, 'หลังคากระจก / Panoramic Roof':{lo:'ຫຼັງຄາແກ້ວ / Panoramic Roof',th:'หลังคากระจก / Panoramic Roof',en:'Panoramic roof'}, 'ระบบปรับอากาศ':{lo:'ລະບົບປັບອາກາດ',th:'ระบบปรับอากาศ',en:'Climate control'}, 'ช่องแอร์หลัง':{lo:'ຊ່ອງແອຫຼັງ',th:'ช่องแอร์หลัง',en:'Rear air vents'}, 'ไฟ Ambient Light':{lo:'ໄຟ Ambient Light',th:'ไฟ Ambient Light',en:'Ambient lighting'}, 'แท่นชาร์จโทรศัพท์ไร้สาย':{lo:'ແທ່ນຊາດໂທລະສັບໄຮ້ສາຍ',th:'แท่นชาร์จโทรศัพท์ไร้สาย',en:'Wireless phone charging'}, 'ประตูท้ายไฟฟ้า':{lo:'ປະຕູທ້າຍໄຟຟ້າ',th:'ประตูท้ายไฟฟ้า',en:'Power tailgate'}, 'กระจกมองข้างพับไฟฟ้า':{lo:'ກະຈົກຂ້າງພັບໄຟຟ້າ',th:'กระจกมองข้างพับไฟฟ้า',en:'Power-fold mirrors'},
    'มี / ระดับขึ้นอยู่กับรุ่นย่อย':{lo:'ມີ / ລະດັບຂຶ້ນກັບຮຸ່ນຍ່ອຍ',th:'มี / ระดับขึ้นอยู่กับรุ่นย่อย',en:'Available / level varies by trim'}
  });


  Object.assign(dict, {
    'ภาพรวม':{lo:'ພາບລວມ',th:'ภาพรวม',en:'Overview'},
    'สมรรถนะ':{lo:'ສະມັດຖະນະ',th:'สมรรถนะ',en:'Performance'},
    'ขนาดรถ':{lo:'ຂະໜາດລົດ',th:'ขนาดรถ',en:'Dimensions'},
    'ภายใน':{lo:'ພາຍໃນ',th:'ภายใน',en:'Interior'},
    'สมรรถนะและระบบขับเคลื่อน':{lo:'ສະມັດຖະນະ ແລະ ລະບົບຂັບເຄື່ອນ',th:'สมรรถนะและระบบขับเคลื่อน',en:'Performance & powertrain'},
    'แบตเตอรี่ การชาร์จ และขนาดรถ':{lo:'ແບັດເຕີຣີ ການຊາດ ແລະ ຂະໜາດລົດ',th:'แบตเตอรี่ การชาร์จ และขนาดรถ',en:'Battery, charging & dimensions'},
    'ช่วงล่าง ล้อ และระบบเบรก':{lo:'ຊ່ວງລ່າງ ລໍ້ ແລະ ລະບົບເບຣກ',th:'ช่วงล่าง ล้อ และระบบเบรก',en:'Chassis, wheels & brakes'},
    'เทคโนโลยีและความสะดวกสบาย':{lo:'ເທັກໂນໂລຊີ ແລະ ຄວາມສະດວກສະບາຍ',th:'เทคโนโลยีและความสะดวกสบาย',en:'Technology & comfort'},
    'เทคโนโลยีห้องโดยสาร':{lo:'ເທັກໂນໂລຊີຫ້ອງໂດຍສານ',th:'เทคโนโลยีห้องโดยสาร',en:'Cabin technology'},
    'ลากซ้าย–ขวาเพื่อหมุนรถ • ใช้ปุ่ม + / − เพื่อซูม • รองรับเมาส์และหน้าจอสัมผัส':{
      lo:'ລາກຊ້າຍ–ຂວາເພື່ອໝຸນ • ໃຊ້ + / − ເພື່ອ Zoom • ຮອງຮັບເມົາສ໌ ແລະ ໜ້າຈໍສຳຜັດ',
      th:'ลากซ้าย–ขวาเพื่อหมุนรถ • ใช้ปุ่ม + / − เพื่อซูม • รองรับเมาส์และหน้าจอสัมผัส',
      en:'Drag left–right to rotate • use + / − to zoom • works with mouse and touch'
    },
    '✓ สเป็กแยกตามรุ่น':{lo:'✓ ສະເປັກແຍກຕາມຮຸ່ນ',th:'✓ สเป็กแยกตามรุ่น',en:'✓ Model-specific specs'},
    '✓ เปรียบเทียบข้อมูลสำคัญ':{lo:'✓ ປຽບທຽບຂໍ້ມູນສຳຄັນ',th:'✓ เปรียบเทียบข้อมูลสำคัญ',en:'✓ Clear key data'},
    '✓ ยืนยันรุ่นย่อยก่อนจอง':{lo:'✓ ຢືນຢັນຮຸ່ນຍ່ອຍກ່ອນຈອງ',th:'✓ ยืนยันรุ่นย่อยก่อนจอง',en:'✓ Confirm trim before booking'}
  });


  Object.assign(dict, {
    'เปรียบเทียบสเป็กสูงสุด 3 รุ่น':{lo:'ປຽບທຽບສະເປັກສູງສຸດ 3 ຮຸ່ນ',th:'เปรียบเทียบสเป็กสูงสุด 3 รุ่น',en:'Compare specs for up to 3 vehicles'},
    'ดูรูปรถและสเป็กแบบเทียบกันชัด ๆ ค่าที่เหนือกว่าในตัวชี้วัดที่เปรียบเทียบได้จะไฮไลต์เป็นสีเขียว':{
      lo:'ເບິ່ງຮູບລົດ ແລະ ສະເປັກຄຽງກັນ ຄ່າທີ່ດີກວ່າໃນຕົວຊີ້ວັດທີ່ປຽບທຽບໄດ້ຈະເປັນສີຂຽວ',
      th:'ดูรูปรถและสเป็กแบบเทียบกันชัด ๆ ค่าที่เหนือกว่าในตัวชี้วัดที่เปรียบเทียบได้จะไฮไลต์เป็นสีเขียว',
      en:'Compare vehicle photos and specifications side by side. Clearly superior comparable values are highlighted in green.'
    },
    'สีเขียว = ค่าที่ดีกว่าอย่างชัดเจน เช่น ระยะทาง, กำลัง, แรงบิด, 0–100 และอุปกรณ์ช่วยขับ':{
      lo:'ສີຂຽວ = ຄ່າທີ່ດີກວ່າຢ່າງຊັດເຈນ ເຊັ່ນ ໄລຍະທາງ, ກຳລັງ, ແຮງບິດ, 0–100 ແລະ ADAS',
      th:'สีเขียว = ค่าที่ดีกว่าอย่างชัดเจน เช่น ระยะทาง, กำลัง, แรงบิด, 0–100 และอุปกรณ์ช่วยขับ',
      en:'Green = clearly better comparable values such as range, power, torque, 0–100 and driver-assistance features.'
    },
    'บริการ EV ครบตั้งแต่แบตเตอรี่ถึงตัวรถ':{lo:'ບໍລິການ EV ຄົບຈາກແບັດເຕີຣີເຖິງຕົວລົດ',th:'บริการ EV ครบตั้งแต่แบตเตอรี่ถึงตัวรถ',en:'Complete EV care from battery to body'},
    'ตรวจเช็ก วินิจฉัย ซ่อมบำรุง และดูแลหลังการขายโดยจัดข้อมูลบริการเป็นหมวดให้เลือกได้ง่าย':{
      lo:'ກວດເຊັກ, ວິນິດໄສ, ສ້ອມບຳລຸງ ແລະ ບໍລິການຫຼັງການຂາຍ ແບ່ງເປັນໝວດເລືອກງ່າຍ',
      th:'ตรวจเช็ก วินิจฉัย ซ่อมบำรุง และดูแลหลังการขายโดยจัดข้อมูลบริการเป็นหมวดให้เลือกได้ง่าย',
      en:'Diagnostics, maintenance, repairs and after-sales support organized into easy-to-understand service categories.'
    },
    'นัด Service / ตรวจแบตเตอรี่':{lo:'ນັດ Service / ກວດແບັດເຕີຣີ',th:'นัด Service / ตรวจแบตเตอรี่',en:'Book service / Battery check'},
    'แจ้งอาการ':{lo:'ແຈ້ງອາການ',th:'แจ้งอาการ',en:'Describe the issue'},
    'ตรวจวิเคราะห์':{lo:'ກວດວິນິດໄສ',th:'ตรวจวิเคราะห์',en:'Diagnosis'},
    'ยืนยันก่อนซ่อม':{lo:'ຢືນຢັນກ່ອນສ້ອມ',th:'ยืนยันก่อนซ่อม',en:'Approve before repair'},
    'ส่งมอบ / ติดตาม':{lo:'ສົ່ງມອບ / ຕິດຕາມ',th:'ส่งมอบ / ติดตาม',en:'Handover / Follow-up'}
  });

  const textOriginal = new WeakMap();
  const attrOriginal = new WeakMap();
  let applying = false;
  const state = { lang: localStorage.getItem('pmLang') || 'lo' };
  const normalize = s => String(s || '').replace(/\s+/g,' ').trim();
  function tr(original, lang=state.lang){
    const k=normalize(original);
    if(dict[k]?.[lang] != null) return dict[k][lang];
    let m;
    if((m=k.match(/^เลือกรถคันที่\s*(\d+)$/))) return lang==='lo'?`ເລືອກລົດຄັນທີ ${m[1]}`:lang==='en'?`Choose vehicle ${m[1]}`:`เลือกรถคันที่ ${m[1]}`;
    if((m=k.match(/^♙\s*(.+)\s*ที่นั่ง$/))) return lang==='lo'?`♙ ${m[1]} ບ່ອນນັ່ງ`:lang==='en'?`♙ ${m[1]} seats`:`♙ ${m[1]} ที่นั่ง`;
    if((m=k.match(/^แสดง\s*(\d+)\s*จาก\s*(\d+)\s*รุ่น.*ฐานข้อมูลรวม\s*(\d+)\s*รุ่น$/))) return lang==='lo'?`ສະແດງ ${m[1]} ຈາກ ${m[2]} ຮຸ່ນ • ຖານຂໍ້ມູນ ${m[3]} ຮຸ່ນ`:lang==='en'?`Showing ${m[1]} of ${m[2]} models • ${m[3]} total in database`:`แสดง ${m[1]} จาก ${m[2]} รุ่น • ฐานข้อมูลรวม ${m[3]} รุ่น`;
    if((m=k.match(/^ผลการค้นหา\s*(\d+)\s*รุ่น$/))) return lang==='lo'?`ຜົນຄົ້ນຫາ ${m[1]} ຮຸ່ນ`:lang==='en'?`${m[1]} search results`:`ผลการค้นหา ${m[1]} รุ่น`;
    return original;
  }
  function translateNode(node){
    if(node.nodeType===Node.TEXT_NODE){
      const raw = textOriginal.has(node) ? textOriginal.get(node) : node.nodeValue;
      if(!textOriginal.has(node)) textOriginal.set(node, raw);
      const lead=raw.match(/^\s*/)?.[0]||'', trail=raw.match(/\s*$/)?.[0]||''; const core=raw.trim(); if(!core)return;
      node.nodeValue = lead + tr(core) + trail;
      return;
    }
    if(node.nodeType!==Node.ELEMENT_NODE || ['SCRIPT','STYLE','CODE','PRE'].includes(node.tagName)) return;
    if(['INPUT','TEXTAREA'].includes(node.tagName) && node.hasAttribute('placeholder')){
      let obj=attrOriginal.get(node)||{}; if(!obj.placeholder)obj.placeholder=node.getAttribute('placeholder'); attrOriginal.set(node,obj); node.setAttribute('placeholder',tr(obj.placeholder));
    }
    [...node.childNodes].forEach(translateNode);
  }
  function translateAll(){ applying=true; document.documentElement.lang=state.lang==='lo'?'lo':state.lang; translateNode(document.body); document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===state.lang)); applying=false; window.dispatchEvent(new CustomEvent('pm:languagechange',{detail:{lang:state.lang}})); }
  function setLang(lang){ if(!['lo','th','en'].includes(lang))return; state.lang=lang; localStorage.setItem('pmLang',lang); translateAll(); }
  function carDescription(car, lang=state.lang){
    if(lang==='th') return car.description || `${car.brand} ${car.model}`;
    if(lang==='en') return `${car.brand} ${car.model} is a ${car.body || 'vehicle'} with ${car.energy || 'new-energy'} power. Listed range: ${car.range || 'confirm by trim'}, battery: ${car.battery || 'confirm by trim'}, and drivetrain: ${car.drive || 'confirm by trim'}. Final equipment and specifications depend on the exact trim and market.`;
    return `${car.brand} ${car.model} ເປັນລົດ ${car.body || ''} ລະບົບ ${car.energy || 'ພະລັງງານໃໝ່'} ມີໄລຍະທາງ ${car.range || 'ຢືນຢັນຕາມຮຸ່ນ'} ແບັດເຕີຣີ ${car.battery || 'ຢືນຢັນຕາມຮຸ່ນ'} ແລະລະບົບຂັບເຄື່ອນ ${car.drive || 'ຢືນຢັນຕາມຮຸ່ນ'}. ອຸປະກອນຈິງຂຶ້ນກັບຮຸ່ນຍ່ອຍ ແລະ ຕະຫຼາດ.`;
  }
  window.PM_I18N = { get lang(){return state.lang}, setLang, t:tr, carDescription, refresh:translateAll };
  document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]'); if(b) setLang(b.dataset.lang)});
  const mo=new MutationObserver(ms=>{ if(applying)return; applying=true; for(const m of ms) m.addedNodes.forEach(translateNode); applying=false; });
  const start=()=>{translateAll(); mo.observe(document.body,{childList:true,subtree:true});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start); else start();
})();
