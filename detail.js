(() => {
  const cars = window.PHALUAY_CARS || [];
  const I = window.PM_I18N || {lang:'th',t:x=>x,carDescription:c=>c.description||''};
  const $ = s => document.querySelector(s);
  const p = new URLSearchParams(location.search);
  const car = cars.find(c => c.id === p.get('id')) || cars[0];
  if (!car) { document.body.innerHTML = '<div style="padding:40px;font-family:sans-serif">Vehicle not found. <a href="index.html">Home</a></div>'; return; }

  const val = v => (v && String(v).trim()) ? I.t(String(v)) : '—';
  const row = (a,b) => `<tr><td>${I.t(a)}</td><td>${val(b)}</td></tr>`;
  const waText = () => {
    if(I.lang==='lo') return `ສະບາຍດີ PHALUAY MOTOR\nສົນໃຈລົດ: ${car.brand} ${car.model}\nປີ: ${car.year}\nລາຄາໃນເວັບ: ${car.price}\nຕ້ອງການສອບຖາມຮຸ່ນຍ່ອຍ / ສີ / ການຈອງ`;
    if(I.lang==='en') return `Hello PHALUAY MOTOR\nVehicle: ${car.brand} ${car.model}\nYear: ${car.year}\nWebsite price: ${car.price}\nI would like trim, color and booking information.`;
    return `สวัสดี PHALUAY MOTOR\nสนใจรถ: ${car.brand} ${car.model}\nปี: ${car.year}\nราคาในเว็บ: ${car.price}\nต้องการสอบถามรุ่นย่อย / สี / การจองครับ`;
  };
  const waUrl = () => 'https://wa.me/8562092224844?text=' + encodeURIComponent(waText());

  function setRows(sel, rows){ $(sel).innerHTML = rows.map(([a,b])=>row(a,b)).join(''); }
  function render(){
    document.title = `${car.brand} ${car.model} | PHALUAY MOTOR`;
    $('#modelKicker').textContent = `${car.brand.toUpperCase()} • ${car.energy} • ${car.year}`;
    $('#modelTitle').textContent = car.model;
    $('#modelSubtitle').textContent = I.carDescription(car);
    $('#modelPrice').textContent = val(car.price);
    $('#fallbackModel').textContent = `${car.brand} ${car.model}`;
    $('#overviewTitle').textContent = `${car.brand} ${car.model}`;
    $('#overviewText').textContent = I.carDescription(car);
    $('#relatedTitle').textContent = I.lang==='lo' ? `ຮຸ່ນອື່ນຈາກ ${car.brand}` : I.lang==='en' ? `More models from ${car.brand}` : `รุ่นอื่นจาก ${car.brand}`;
    ['#waModel','#sideWhatsApp','#floatingModelWA','#topWhatsApp'].forEach(s => { const el=$(s); if(el) el.href=waUrl(); });

    const hero = [['ระยะทาง',car.range],['กำลัง',car.power],['แบตเตอรี่',car.battery],['ขับเคลื่อน',car.drive]];
    $('#heroSpecStrip').innerHTML = hero.map(([a,b])=>`<div><span>${I.t(a)}</span><strong>${val(b)}</strong></div>`).join('');
    const overview = [['⚡','ระยะทาง',car.range],['🔋','แบตเตอรี่',car.battery],['🏁','กำลังมอเตอร์',car.power],['↻','แรงบิด',car.torque],['🚀','0–100 km/h',car.zeroTo100],['◉','ความเร็วสูงสุด',car.topSpeed],['⇄','ระบบขับเคลื่อน',car.drive],['♙','จำนวนที่นั่ง',car.seats]];
    $('#specOverview').innerHTML = overview.map(([i,a,b])=>`<article class="spec-overview-card"><div class="spec-icon">${i}</div><span>${I.t(a)}</span><strong>${val(b)}</strong></article>`).join('');

    setRows('#performanceSpecs', [
      ['แบรนด์',car.brand],['รุ่น',car.model],['ปีที่แสดงในเว็บ',car.year],['ประเภทรถ',car.body],['ระบบพลังงาน',car.energy],['สถานะ',car.status],['ราคา',car.price],['ระยะทาง',car.range],['มาตรฐานระยะทาง',car.rangeCycle],['กำลังมอเตอร์ / ระบบ',car.power],['แรงบิด',car.torque],['แรงม้า',car.horsepower],['0–100 km/h',car.zeroTo100],['ความเร็วสูงสุด',car.topSpeed],['ระบบขับเคลื่อน',car.drive],['จำนวนที่นั่ง',car.seats]
    ]);
    setRows('#dimensionSpecs', [
      ['ขนาดตัวรถ (ยาว × กว้าง × สูง)',car.dimensions],['ความยาว',car.length],['ความกว้าง',car.width],['ความสูง',car.height],['ฐานล้อ',car.wheelbase],['ระยะใต้ท้องรถ',car.groundClearance],['พื้นที่เก็บสัมภาระ',car.cargo],['น้ำหนักรถ',car.curbWeight],['จำนวนประตู',car.doors]
    ]);
    setRows('#chargingSpecs', [
      ['แบตเตอรี่',car.battery],['ประเภทแบตเตอรี่',car.batteryType],['ประเภทมอเตอร์',car.motorType],['อัตราสิ้นเปลืองไฟ',car.consumption],['ชาร์จ AC',car.chargeAC],['ชาร์จ DC / Fast Charge',car.chargeDC],['หัวชาร์จ',car.chargePort],['จ่ายไฟภายนอก V2L',car.v2l]
    ]);
    setRows('#chassisSpecs', [
      ['ช่วงล่างหน้า',car.frontSuspension],['ช่วงล่างหลัง',car.rearSuspension],['เบรกหน้า',car.frontBrakes],['เบรกหลัง',car.rearBrakes],['ยาง / ล้อ',car.tires]
    ]);
    setRows('#adasSpecs', [
      ['ระดับระบบช่วยขับ',car.adasLevel],['กล้อง 360°',car.camera360],['เรดาร์จอดรถ',car.parkingSensors],['ACC ครูซคอนโทรลแปรผัน',car.acc],['AEB เบรกฉุกเฉินอัตโนมัติ',car.aeb],['LKA ช่วยควบคุมรถในเลน',car.lka],['Lane Centering',car.lcc],['BSD เตือนมุมอับสายตา',car.bsd],['Rear Cross Traffic Alert',car.rcta],['Traffic Sign Recognition',car.trafficSign],['Auto Parking',car.autoPark],['LiDAR',car.lidar],['ถุงลมนิรภัย',car.airbags]
    ]);
    const adasCards = [
      ['ACC',car.acc,'Adaptive Cruise'],['AEB',car.aeb,'Emergency Brake'],['LKA',car.lka,'Lane Keeping'],['BSD',car.bsd,'Blind Spot'],['360°',car.camera360,'Around View'],['LiDAR',car.lidar,'Sensor']
    ];
    $('#adasGrid').innerHTML = adasCards.map(([code,status,sub])=>`<article><b>${code}</b><span>${sub}</span><strong>${val(status)}</strong></article>`).join('');
    setRows('#cabinSpecs', [['หน้าจอ / Infotainment',car.screen],['ระบบเสียง',car.audio],['เชื่อมต่อโทรศัพท์',car.phoneConnectivity],['OTA Update',car.ota],['Keyless / Digital Key',car.keyless],['ไฟอัจฉริยะ',car.smartLights]]);

    const sc=$('#sourceCard');
    const sourceName=car.specSource || (car.sourceNote ? 'PHALUAY / reference source' : '');
    const sourceUrl=car.specSourceUrl || car.sourceUrl;
    const sourceNote=car.sourceNote || '';
    if(sourceName || sourceUrl || sourceNote){
      sc.hidden=false; sc.innerHTML=`<strong>${I.lang==='lo'?'ແຫຼ່ງຂໍ້ມູນ':I.lang==='en'?'Specification sources':'แหล่งข้อมูลสเป็ก'}</strong>${sourceName?`<div>${sourceName}</div>`:''}${sourceNote?`<small>${sourceNote}</small>`:''}${sourceUrl?`<a href="${sourceUrl}" target="_blank" rel="noopener">${I.lang==='lo'?'ເປີດແຫຼ່ງອ້າງອີງ ↗':I.lang==='en'?'Open source ↗':'เปิดแหล่งอ้างอิง ↗'}</a>`:''}`;
    } else sc.hidden=true;

    const related = cars.filter(c=>c.brand===car.brand && c.id!==car.id).slice(0,3);
    const fallback = cars.filter(c=>c.id!==car.id && !related.includes(c)).slice(0,3-related.length);
    $('#relatedGrid').innerHTML = [...related,...fallback].map(c=>`<a class="related-card" href="detail.html?id=${encodeURIComponent(c.id)}"><div class="vehicle-fallback"><b>${c.brand}</b><strong>${c.model}</strong><span>PHALUAY MOTOR</span></div><img src="${c.image}" alt="${c.brand} ${c.model}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'"><div class="related-copy"><small>${c.brand} • ${c.energy}</small><h3>${c.model}</h3><strong>${val(c.price)}</strong></div></a>`).join('');
  }

  /* Main vehicle image */
  const img=$('#modelImage'); img.src=car.image; img.alt=`${car.brand} ${car.model}`; img.onerror=()=>{img.style.display='none';$('#modelImageFallback').style.display='grid'};

  /* True 360-sequence engine. With no multi-angle sequence it clearly shows preview mode rather than faking 360 data. */
  const spinImg=$('#spinImage'), spinRange=$('#spinRange'), spinStage=$('#spinStage'), spinStatus=$('#spinStatus'), spinCounter=$('#spinCounter');
  const frames=(car.views360||[]).filter(Boolean); let frame=0, dragging=false, lastX=0, acc=0;
  function spinFrame(i){
    if(frames.length>=2){ frame=(i+frames.length)%frames.length; spinImg.src=frames[frame]; spinRange.max=frames.length-1; spinRange.value=frame; spinCounter.textContent=`${Math.round(frame/(frames.length-1)*360)}°`; }
    else { spinImg.src=car.image; spinCounter.textContent='360°'; }
  }
  if(frames.length>=8){ spinStatus.textContent=I.t('ลากซ้าย–ขวาเพื่อหมุนรถ'); spinRange.disabled=false; }
  else { spinStatus.innerHTML=`<b>${I.t('ชุดภาพ 360° ของรุ่นนี้กำลังรอเพิ่ม')}</b><span>${I.lang==='lo'?'ລະບົບຮອງຮັບ 24–72 ຮູບຕໍ່ຮຸ່ນ; ຕອນນີ້ສະແດງຮູບຫຼັກ':I.lang==='en'?'The viewer supports 24–72 frames per model; the main photo is shown until a real 360 set is added.':'ระบบรองรับ 24–72 ภาพต่อรุ่น; ตอนนี้แสดงภาพหลักจนกว่าจะเพิ่มชุดภาพ 360 จริง'}</span>`; spinRange.disabled=true; }
  spinFrame(0);
  spinRange.addEventListener('input',()=>spinFrame(Number(spinRange.value)));
  spinStage.addEventListener('pointerdown',e=>{ if(frames.length<8)return; dragging=true;lastX=e.clientX;spinStage.setPointerCapture(e.pointerId); });
  spinStage.addEventListener('pointermove',e=>{ if(!dragging)return;acc += e.clientX-lastX;lastX=e.clientX;if(Math.abs(acc)>=8){spinFrame(frame + (acc<0?1:-1));acc=0;} });
  spinStage.addEventListener('pointerup',()=>dragging=false); spinStage.addEventListener('pointercancel',()=>dragging=false);

  render();
  window.addEventListener('pm:languagechange',()=>{render(); if(frames.length<8){ spinStatus.innerHTML=`<b>${I.t('ชุดภาพ 360° ของรุ่นนี้กำลังรอเพิ่ม')}</b><span>${I.lang==='lo'?'ລະບົບຮອງຮັບ 24–72 ຮູບຕໍ່ຮຸ່ນ; ຕອນນີ້ສະແດງຮູບຫຼັກ':I.lang==='en'?'The viewer supports 24–72 frames per model; the main photo is shown until a real 360 set is added.':'ระบบรองรับ 24–72 ภาพต่อรุ่น; ตอนนี้แสดงภาพหลักจนกว่าจะเพิ่มชุดภาพ 360 จริง'}</span>`; } });

  const progress=$('#detailScrollProgress');
  addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`},{passive:true});
})();
