(() => {
  const cars = window.PHALUAY_CARS || [];
  const $ = s => document.querySelector(s);
  const p = new URLSearchParams(location.search);
  const id = p.get('id');
  const car = cars.find(c => c.id === id) || cars[0];
  if (!car) {
    document.body.innerHTML = '<div style="padding:40px;font-family:sans-serif">ไม่พบข้อมูลรถ <a href="index.html">กลับหน้าแรก</a></div>';
    return;
  }

  const value = v => (v && String(v).trim()) ? v : '—';
  const waText = `สวัสดี PHALUAY MOTOR\nสนใจรถ: ${car.brand} ${car.model}\nปี: ${car.year}\nราคาในเว็บ: ${car.price}\nต้องการสอบถามรายละเอียด/รุ่นย่อย/การจองครับ`;
  const wa = 'https://wa.me/8562092224844?text=' + encodeURIComponent(waText);

  document.title = `${car.brand} ${car.model} Specs | PHALUAY MOTOR`;
  $('#modelKicker').textContent = `${car.brand.toUpperCase()} • ${car.energy} • ${car.year}`;
  $('#modelTitle').textContent = car.model;
  $('#modelSubtitle').textContent = car.description || `${car.brand} ${car.model}`;
  $('#modelPrice').textContent = car.price;
  $('#modelImage').src = car.image;
  $('#modelImage').alt = `${car.brand} ${car.model}`;
  $('#overviewTitle').textContent = `${car.brand} ${car.model}`;
  $('#overviewText').textContent = car.description || 'สอบถามข้อมูลรุ่นย่อยกับ PHALUAY MOTOR';
  $('#relatedTitle').textContent = `รุ่นอื่นจาก ${car.brand}`;
  ['#waModel','#sideWhatsApp','#floatingModelWA','#topWhatsApp'].forEach(s => { const el=$(s); if(el) el.href=wa; });

  const hero = [
    ['ระยะทาง', value(car.range)],
    ['กำลัง', value(car.power)],
    ['แบตเตอรี่', value(car.battery)],
    ['ขับเคลื่อน', value(car.drive)]
  ];
  $('#heroSpecStrip').innerHTML = hero.map(([a,b]) => `<div><span>${a}</span><strong>${b}</strong></div>`).join('');

  const overview = [
    ['⚡','ระยะทาง',value(car.range)],
    ['🔋','แบตเตอรี่',value(car.battery)],
    ['🏁','กำลังมอเตอร์',value(car.power)],
    ['↻','แรงบิด',value(car.torque)],
    ['🚀','0–100 km/h',value(car.zeroTo100)],
    ['◉','ความเร็วสูงสุด',value(car.topSpeed)],
    ['⇄','ระบบขับเคลื่อน',value(car.drive)],
    ['♙','จำนวนที่นั่ง',value(car.seats)]
  ];
  $('#specOverview').innerHTML = overview.map(([i,a,b]) => `<article class="spec-overview-card"><div class="spec-icon">${i}</div><span>${a}</span><strong>${b}</strong></article>`).join('');

  const perf = [
    ['แบรนด์', car.brand], ['รุ่น', car.model], ['ปีที่แสดงในเว็บ', car.year], ['ประเภทรถ', car.body], ['ระบบพลังงาน', car.energy],
    ['ราคา', car.price], ['ระยะทาง', car.range], ['มาตรฐานระยะทาง', car.rangeCycle], ['แบตเตอรี่', car.battery],
    ['กำลังมอเตอร์ / ระบบ', car.power], ['แรงบิด', car.torque], ['แรงม้า', car.horsepower], ['0–100 km/h', car.zeroTo100],
    ['ความเร็วสูงสุด', car.topSpeed], ['ระบบขับเคลื่อน', car.drive], ['ที่นั่ง', car.seats]
  ];
  $('#performanceSpecs').innerHTML = perf.map(([a,b]) => `<tr><td>${a}</td><td>${value(b)}</td></tr>`).join('');

  const dimensions = [
    ['ขนาดตัวรถ (ยาว × กว้าง × สูง)', car.dimensions],
    ['ฐานล้อ', car.wheelbase],
    ['ระยะใต้ท้องรถ', car.groundClearance],
    ['พื้นที่เก็บสัมภาระ', car.cargo],
    ['อัตราสิ้นเปลืองไฟ', car.consumption],
    ['ชาร์จ AC', car.chargeAC],
    ['ชาร์จ DC / Fast Charge', car.chargeDC]
  ].filter(([,b]) => b && String(b).trim());
  if (dimensions.length) {
    $('#dimensionSpecs').innerHTML = dimensions.map(([a,b]) => `<tr><td>${a}</td><td>${value(b)}</td></tr>`).join('');
  } else {
    $('#dimensionsSection').style.display = 'none';
  }

  const related = cars.filter(c => c.brand === car.brand && c.id !== car.id).slice(0,3);
  const fallback = cars.filter(c => c.id !== car.id && !related.includes(c)).slice(0,3-related.length);
  $('#relatedGrid').innerHTML = [...related,...fallback].map(c => `<a class="related-card" href="detail.html?id=${encodeURIComponent(c.id)}"><img src="${c.image}" alt="${c.brand} ${c.model}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'"><div class="related-copy"><small>${c.brand} • ${c.energy}</small><h3>${c.model}</h3><strong>${c.price}</strong></div></a>`).join('');
})();
