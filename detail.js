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
    setRows('#powertrainSpecs', [
      ['จำนวนมอเตอร์',car.motorCount],['ประเภทมอเตอร์',car.motorType],['ตำแหน่งมอเตอร์',car.motorPlacement],['ชุดเกียร์ / ระบบส่งกำลัง',car.transmission],['เครื่องยนต์เบนซิน / Range Extender',car.engine],['ความจุเครื่องยนต์',car.engineDisplacement],['กำลังเครื่องยนต์',car.enginePower],['ความจุถังน้ำมัน',car.fuelTank],['ระยะทางไฟฟ้าล้วน',car.evOnlyRange],['ระยะทางรวมระบบ',car.combinedRange],['โหมดการขับขี่',car.driveModes]
    ]);
    setRows('#dimensionSpecs', [
      ['ขนาดตัวรถ (ยาว × กว้าง × สูง)',car.dimensions],['ความยาว',car.length],['ความกว้าง',car.width],['ความสูง',car.height],['ฐานล้อ',car.wheelbase],['ช่วงล้อหน้า',car.frontTrack],['ช่วงล้อหลัง',car.rearTrack],['ระยะใต้ท้องรถ',car.groundClearance],['รัศมีวงเลี้ยว',car.turningRadius],['พื้นที่เก็บสัมภาระ',car.cargo],['พื้นที่เก็บของด้านหน้า (Frunk)',car.frunk],['น้ำหนักรถ',car.curbWeight],['น้ำหนักรวมสูงสุด',car.grossWeight],['จำนวนประตู',car.doors],['รูปแบบที่นั่ง',car.seatingLayout]
    ]);
    setRows('#chargingSpecs', [
      ['แบตเตอรี่',car.battery],['ความจุแบตเตอรี่ที่ใช้งานได้',car.usableBattery],['ประเภทแบตเตอรี่',car.batteryType],['แรงดันแพลตฟอร์ม',car.voltagePlatform],['ระบบจัดการอุณหภูมิแบตเตอรี่',car.thermalManagement],['อัตราสิ้นเปลืองไฟ',car.consumption],['ชาร์จ AC',car.chargeAC],['ชาร์จ DC / Fast Charge',car.chargeDC],['กำลังชาร์จ DC สูงสุด',car.dcPeakPower],['เวลา Fast Charge 10–80%',car.fastChargeTime],['หัวชาร์จ',car.chargePort],['Regenerative Braking',car.regen],['จ่ายไฟภายนอก V2L',car.v2l],['V2V / V2H',car.v2x]
    ]);
    setRows('#chassisSpecs', [
      ['พวงมาลัย',car.steering],['ช่วงล่างหน้า',car.frontSuspension],['ช่วงล่างหลัง',car.rearSuspension],['ระบบปรับช่วงล่าง',car.adaptiveSuspension],['เบรกหน้า',car.frontBrakes],['เบรกหลัง',car.rearBrakes],['เบรกมือ',car.parkingBrake],['ยาง / ล้อ',car.tires],['ขนาดล้อ',car.wheelSize],['ชุดซ่อมยาง / ยางอะไหล่',car.spareTire]
    ]);
    setRows('#safetySpecs', [
      ['ABS ระบบป้องกันล้อล็อก',car.abs],['EBD กระจายแรงเบรก',car.ebd],['ESC / ESP ระบบควบคุมเสถียรภาพ',car.esc],['TCS ระบบป้องกันล้อหมุนฟรี',car.tcs],['TPMS ตรวจแรงดันลมยาง',car.tpms],['HSA ช่วยออกตัวบนทางลาด',car.hsa],['HDC ช่วยลงทางลาด',car.hdc],['Auto Hold',car.autoHold],['ISOFIX',car.isofix],['ระบบตรวจจับผู้ขับขี่ / DMS',car.dms],['เตือนการชนด้านหน้า FCW',car.fcw],['เตือนการชนด้านหลัง RCW',car.rcw],['เตือนเปิดประตู DOW',car.dow],['ถุงลมนิรภัย',car.airbags]
    ]);
    setRows('#adasSpecs', [
      ['ระดับระบบช่วยขับ',car.adasLevel],['กล้อง 360°',car.camera360],['เรดาร์จอดรถ',car.parkingSensors],['ACC ครูซคอนโทรลแปรผัน',car.acc],['AEB เบรกฉุกเฉินอัตโนมัติ',car.aeb],['LKA ช่วยควบคุมรถในเลน',car.lka],['Lane Centering',car.lcc],['BSD เตือนมุมอับสายตา',car.bsd],['Rear Cross Traffic Alert',car.rcta],['Traffic Sign Recognition',car.trafficSign],['Auto Parking',car.autoPark],['LiDAR',car.lidar],['ถุงลมนิรภัย',car.airbags]
    ]);
    const adasCards = [
      ['ACC',car.acc,'Adaptive Cruise'],['AEB',car.aeb,'Emergency Brake'],['LKA',car.lka,'Lane Keeping'],['BSD',car.bsd,'Blind Spot'],['360°',car.camera360,'Around View'],['LiDAR',car.lidar,'Sensor']
    ];
    $('#adasGrid').innerHTML = adasCards.map(([code,status,sub])=>`<article><b>${code}</b><span>${sub}</span><strong>${val(status)}</strong></article>`).join('');
    setRows('#cabinSpecs', [['หน้าจอคนขับ',car.instrumentScreen],['หน้าจอกลาง / Infotainment',car.screen],['HUD / AR-HUD',car.hud],['ระบบเสียง',car.audio],['จำนวนลำโพง',car.speakers],['เชื่อมต่อโทรศัพท์',car.phoneConnectivity],['Apple CarPlay',car.carplay],['Android Auto',car.androidAuto],['แอปควบคุมรถระยะไกล',car.remoteApp],['OTA Update',car.ota],['Keyless / Digital Key',car.keyless],['ไฟอัจฉริยะ',car.smartLights]]);
    setRows('#comfortSpecs', [
      ['วัสดุเบาะ',car.seatMaterial],['เบาะคนขับปรับไฟฟ้า',car.driverSeatPower],['เบาะผู้โดยสารหน้าปรับไฟฟ้า',car.passengerSeatPower],['ระบบจำตำแหน่งเบาะ',car.seatMemory],['เบาะอุ่น',car.seatHeating],['เบาะระบายอากาศ',car.seatVentilation],['เบาะนวด',car.seatMassage],['หลังคากระจก / Panoramic Roof',car.panoramicRoof],['ระบบปรับอากาศ',car.climateControl],['ช่องแอร์หลัง',car.rearAC],['ไฟ Ambient Light',car.ambientLight],['แท่นชาร์จโทรศัพท์ไร้สาย',car.wirelessCharging],['ประตูท้ายไฟฟ้า',car.powerTailgate],['กระจกมองข้างพับไฟฟ้า',car.powerMirrors]
    ]);

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

  /* Interactive 360 engine
     - True 360 when a 24–72 frame image set is configured.
     - If no multi-angle set exists, the main image remains draggable/zoomable as an interactive preview.
       We do NOT pretend a single photo is a true 360° set. */
  const spinImg = $('#spinImage');
  const spinRange = $('#spinRange');
  const spinStage = $('#spinStage');
  const spinStatus = $('#spinStatus');
  const spinCounter = $('#spinCounter');
  const modeBadge = $('#viewerModeBadge');
  const btnPrev = $('#spinPrev');
  const btnNext = $('#spinNext');
  const btnPlay = $('#spinPlay');
  const btnReset = $('#spinReset');
  const btnZoomIn = $('#spinZoomIn');
  const btnZoomOut = $('#spinZoomOut');

  function buildFrames(){
    if (Array.isArray(car.views360) && car.views360.length) return car.views360.filter(Boolean);
    const direct = window.PM_360_FRAMES?.[car.id];
    if (Array.isArray(direct) && direct.length) return direct.filter(Boolean);
    const cfg = window.PM_360_SETS?.[car.id];
    if (cfg && cfg.path && Number(cfg.count) >= 2) {
      const count = Math.max(2, Math.min(120, Number(cfg.count)));
      const pad = Math.max(1, Math.min(4, Number(cfg.pad) || 2));
      const ext = String(cfg.ext || 'webp').replace(/^\./,'');
      const start = Number.isFinite(Number(cfg.start)) ? Number(cfg.start) : 1;
      return Array.from({length:count}, (_,i) => `${cfg.path}/${String(start+i).padStart(pad,'0')}.${ext}`);
    }
    return [];
  }

  const frames = buildFrames();
  const true360 = frames.length >= 8;
  let frame = 0;
  let dragging = false;
  let pointerId = null;
  let lastX = 0, lastY = 0, dragAcc = 0;
  let previewX = 0, previewY = 0, previewYaw = 0;
  let zoom = 1;
  let autoTimer = null;

  const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
  const reducedMotion = matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function preloadAround(index){
    if(!true360) return;
    [-2,-1,1,2,3].forEach(offset=>{
      const i=(index+offset+frames.length)%frames.length;
      const im=new Image();
      im.src=frames[i];
    });
  }

  function applyPreviewTransform(){
    if(true360) {
      spinImg.style.transform = `scale(${zoom})`;
      return;
    }
    spinImg.style.transform = `translate3d(${previewX}px,${previewY}px,0) perspective(1100px) rotateY(${previewYaw}deg) scale(${zoom})`;
  }

  function setFrame(i, userAction=false){
    if(true360){
      frame = (i + frames.length) % frames.length;
      spinImg.src = frames[frame];
      spinRange.min = 0;
      spinRange.max = frames.length - 1;
      spinRange.value = frame;
      const degrees = Math.round((frame / frames.length) * 360) % 360;
      spinCounter.textContent = `${degrees}°`;
      preloadAround(frame);
    } else {
      const v = clamp(Number(i),0,100);
      spinRange.min = 0;
      spinRange.max = 100;
      spinRange.value = v;
      previewYaw = (v - 50) * 0.22;
      previewX = (v - 50) * 0.55;
      spinCounter.textContent = 'PREVIEW';
      applyPreviewTransform();
    }
    if(userAction && autoTimer) stopAuto();
  }

  function updateViewerCopy(){
    if(true360){
      modeBadge.textContent = I.lang==='lo' ? '360° ຈິງ' : I.lang==='en' ? 'TRUE 360°' : '360° จริง';
      modeBadge.classList.add('is-true360');
      spinStatus.innerHTML = `<b>${I.t('ลากซ้าย–ขวาเพื่อหมุนรถ')}</b><span>${I.lang==='lo'?'ສາມາດລາກ, ກົດລູກສອນ, Auto Rotate ແລະ Zoom ໄດ້':I.lang==='en'?'Drag, use the arrow buttons, auto-rotate, or zoom the vehicle.':'ลากรถ กดลูกศร เปิดหมุนอัตโนมัติ และซูมได้'}</span>`;
      $('#spinDragHint').textContent = I.lang==='lo' ? '↔ ລາກເພື່ອໝຸນ' : I.lang==='en' ? '↔ DRAG TO ROTATE' : '↔ ลากเพื่อหมุน';
      btnPlay.disabled = false;
    } else {
      modeBadge.textContent = I.lang==='lo' ? '360° READY' : I.lang==='en' ? '360° READY' : 'พร้อมใส่ 360°';
      modeBadge.classList.remove('is-true360');
      spinStatus.innerHTML = `<b>${I.lang==='lo'?'ພາບ Preview ຂະຍັບໄດ້':I.lang==='en'?'Interactive preview':'ภาพ Preview ขยับได้'}</b><span>${I.lang==='lo'?'ລາກແລະ Zoom ໄດ້. ເມື່ອໃສ່ຮູບຮອບຄັນ 24–72 ຮູບ ລະບົບຈະເປັນ 360° ຈິງທັນທີ':I.lang==='en'?'You can drag and zoom this preview. Add 24–72 real angle photos to activate true 360° rotation.':'ลากและซูมภาพนี้ได้ เมื่อเพิ่มภาพมุมจริงรอบคัน 24–72 ภาพ ระบบจะหมุน 360° จริงทันที'}</span>`;
      $('#spinDragHint').textContent = I.lang==='lo' ? '↔ ລາກຮູບໄດ້' : I.lang==='en' ? '↔ DRAG PREVIEW' : '↔ ลากภาพได้';
      btnPlay.disabled = true;
    }
  }

  function stopAuto(){
    if(autoTimer){ clearInterval(autoTimer); autoTimer=null; }
    btnPlay.textContent='▶';
    btnPlay.classList.remove('is-playing');
  }
  function startAuto(){
    if(!true360 || reducedMotion) return;
    stopAuto();
    btnPlay.textContent='Ⅱ';
    btnPlay.classList.add('is-playing');
    autoTimer=setInterval(()=>setFrame(frame+1),95);
  }
  function resetView(){
    stopAuto();
    zoom=1; previewX=0; previewY=0; previewYaw=0;
    if(true360) setFrame(0);
    else setFrame(50);
    applyPreviewTransform();
  }
  function setZoom(next){
    zoom=clamp(next,0.75,2.2);
    applyPreviewTransform();
  }

  spinImg.src = true360 ? frames[0] : car.image;
  spinImg.onerror = () => {
    if(true360){
      spinStatus.innerHTML = `<b>${I.lang==='en'?'360 image missing':'ไม่พบภาพ 360 บางมุม'}</b><span>${I.lang==='en'?'Check the file names and paths in views360.js.':'ตรวจชื่อไฟล์และ path ใน views360.js'}</span>`;
    }
  };
  updateViewerCopy();
  resetView();

  spinRange.addEventListener('input',()=>setFrame(Number(spinRange.value),true));
  btnPrev.addEventListener('click',()=> true360 ? setFrame(frame-1,true) : setFrame(Number(spinRange.value)-7,true));
  btnNext.addEventListener('click',()=> true360 ? setFrame(frame+1,true) : setFrame(Number(spinRange.value)+7,true));
  btnPlay.addEventListener('click',()=> autoTimer ? stopAuto() : startAuto());
  btnReset.addEventListener('click',resetView);
  btnZoomIn.addEventListener('click',()=>setZoom(zoom+0.12));
  btnZoomOut.addEventListener('click',()=>setZoom(zoom-0.12));

  spinStage.addEventListener('pointerdown',e=>{
    dragging=true; pointerId=e.pointerId; lastX=e.clientX; lastY=e.clientY; dragAcc=0;
    stopAuto();
    spinStage.classList.add('is-dragging');
    spinStage.setPointerCapture?.(e.pointerId);
  });
  spinStage.addEventListener('pointermove',e=>{
    if(!dragging || (pointerId!==null && e.pointerId!==pointerId)) return;
    const dx=e.clientX-lastX, dy=e.clientY-lastY;
    lastX=e.clientX; lastY=e.clientY;
    if(true360){
      dragAcc += dx;
      const threshold = 7;
      if(Math.abs(dragAcc)>=threshold){
        const steps=Math.max(1,Math.floor(Math.abs(dragAcc)/threshold));
        setFrame(frame + (dragAcc<0 ? steps : -steps));
        dragAcc=0;
      }
    } else {
      previewX=clamp(previewX+dx,-85,85);
      previewY=clamp(previewY+dy,-36,36);
      previewYaw=clamp(previewYaw+dx*0.045,-12,12);
      const sliderVal=clamp(50+(previewYaw/0.22),0,100);
      spinRange.value=sliderVal;
      applyPreviewTransform();
    }
  });
  const endDrag=e=>{
    dragging=false; pointerId=null;
    spinStage.classList.remove('is-dragging');
    try{ if(e?.pointerId!=null) spinStage.releasePointerCapture?.(e.pointerId); }catch(_){}
  };
  spinStage.addEventListener('pointerup',endDrag);
  spinStage.addEventListener('pointercancel',endDrag);

  spinStage.addEventListener('wheel',e=>{
    e.preventDefault();
    setZoom(zoom + (e.deltaY<0 ? 0.08 : -0.08));
  },{passive:false});

  spinStage.addEventListener('dblclick',resetView);
  spinStage.addEventListener('keydown',e=>{
    if(['ArrowLeft','ArrowRight','+','=','-','0',' '].includes(e.key)) e.preventDefault();
    if(e.key==='ArrowLeft') btnPrev.click();
    if(e.key==='ArrowRight') btnNext.click();
    if(e.key==='+' || e.key==='=') btnZoomIn.click();
    if(e.key==='-') btnZoomOut.click();
    if(e.key==='0') resetView();
    if(e.key===' ' && true360) btnPlay.click();
  });

  render();

  window.addEventListener('pm:languagechange',()=>{
    render();
    updateViewerCopy();
  });

  /* Highlight current section in the sticky quick navigation. */
  const sectionLinks=[...document.querySelectorAll('.detail-section-nav a')];
  const targets=sectionLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible) return;
      sectionLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${visible.target.id}`));
    },{rootMargin:'-18% 0px -65% 0px',threshold:[0,.15,.4]});
    targets.forEach(t=>io.observe(t));
  }

  /* Progressive detail reveal */
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('detail-visible');reveal.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll('.spec-section,.detail-section-title,.spec-overview-card,.related-card').forEach(el=>reveal.observe(el));
  }

  const progress=$('#detailScrollProgress');
  addEventListener('scroll',()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  },{passive:true});

  addEventListener('pagehide',stopAuto);
})();
