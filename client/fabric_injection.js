  // ── SW120 / Ceremony ID ──
  else if (normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const titleVal = (customData.title || 'VICTORY CEREMONY').toUpperCase();
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
    const startX = 280, startY = 880;

    const mainBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5 }));
    const subBar = new fabric.Rect(createProps('rect', { left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1 }));
    
    const titleText = new fabric.Textbox(titleVal, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const eventText = new fabric.Textbox(eventVal, createProps('textbox', { left: startX + 20, top: startY + 49, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620 }));
    
    objects.push(mainBar, titleText, subBar, eventText);
  }

  // ── SW121 / Medal ID ──
  else if (normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const nameVal = (customData.name || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    const medalVal = (customData.medal || 'GOLD MEDALLIST').toUpperCase();
    const startX = 280, startY = 940;

    const mainBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 540, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5 }));
    const subBar = new fabric.Rect(createProps('rect', { left: startX, top: startY + 45, width: 220, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1 }));
    
    const nocText = new fabric.Textbox(nocCode, createProps('textbox', { left: startX + 16, top: startY + 9, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 50 }));
    const nameText = new fabric.Textbox(nameVal, createProps('textbox', { left: startX + 138, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 382 }));
    const medalText = new fabric.Textbox(medalVal, createProps('textbox', { left: startX + 10, top: startY + 49, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 200, textAlign: 'center' }));
    
    objects.push(mainBar, nocText, nameText, subBar, medalText);
  }

  // ── SW122 / Medals List ──
  else if (normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
    const medals = customData.medals || [
      { noc: 'NED', name: 'M. VAN DER WEIJDEN', medal: 'GOLD' },
      { noc: 'GBR', name: 'DAVID DAVIES', medal: 'SILVER' },
      { noc: 'GER', name: 'THOMAS LURZ', medal: 'BRONZE' }
    ];
    let startY = 700; const startX = 280;

    const headerBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5 }));
    const subBar = new fabric.Rect(createProps('rect', { left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1 }));
    const titleText = new fabric.Textbox('VICTORY CEREMONY', createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const eventText = new fabric.Textbox("MEDALLISTS - " + eventVal, createProps('textbox', { left: startX + 20, top: startY + 49, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620 }));
    objects.push(headerBar, subBar, titleText, eventText);

    startY += 80;
    medals.forEach((m, i) => {
      const rowBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 700, height: 40, fill: altRowColor, skewX: -12, stroke: borderHighlight, strokeWidth: 1 }));
      const noc = new fabric.Textbox(m.noc, createProps('textbox', { left: startX + 60, top: startY + 10, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 50 }));
      const name = new fabric.Textbox(m.name, createProps('textbox', { left: startX + 180, top: startY + 10, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      objects.push(rowBar, noc, name);
      startY += 42;
    });
  }

  // ── SW123 / Medal Presenter ID & SW124 / Flower Presenter ID ──
  else if (normId.includes('SW123') || normId.includes('SW124') || normId.includes('PRESENTER')) {
    const isFlower = normId.includes('SW124') || normId.includes('FLOWER');
    const roleVal = (customData.role || (isFlower ? 'FLOWERS PRESENTED BY' : 'MEDALS PRESENTED BY')).toUpperCase();
    const nameVal = (customData.name || 'JACQUES ROGGE').toUpperCase();
    const titleVal = (customData.title || 'IOC PRESIDENT').toUpperCase();
    const startX = 280, startY = 940;

    const mainBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5 }));
    const subBar = new fabric.Rect(createProps('rect', { left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1 }));
    
    const nameText = new fabric.Textbox(nameVal, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const subText = new fabric.Textbox(roleVal + ' - ' + titleVal, createProps('textbox', { left: startX + 20, top: startY + 49, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620 }));
    
    objects.push(mainBar, nameText, subBar, subText);
  }

  // ── SW125 to SW130 / Race Clocks ──
  else if (normId.match(/SW125|SW126|SW128|SW129|SW130|CLOCK/)) {
    const isFinish = normId.includes('SW130') || normId.includes('FINISH');
    const hasDelta = normId.includes('SW126') || normId.includes('DELTA');
    const hasStandings = normId.includes('SW129') || normId.includes('SW130');
    
    const clockVal = customData.clock || '1:45:23';
    const deltaVal = customData.delta || '+0:12';
    const startX = 280, startY = hasStandings ? 840 : 940;

    const clockBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 180, height: 42, fill: '#000000', skewX: -12, rx: 5, ry: 5, stroke: '#ffffff', strokeWidth: 2 }));
    const clockText = new fabric.Textbox(clockVal, createProps('textbox', { left: startX + 10, top: startY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 160, textAlign: 'center' }));
    objects.push(clockBar, clockText);

    if (hasDelta) {
      const deltaBar = new fabric.Rect(createProps('rect', { left: startX + 190, top: startY, width: 120, height: 42, fill: '#00192e', skewX: -12, stroke: borderHighlight, strokeWidth: 1.5 }));
      const deltaT = new fabric.Textbox(deltaVal, createProps('textbox', { left: startX + 195, top: startY + 10, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffcc00', width: 110, textAlign: 'center' }));
      objects.push(deltaBar, deltaT);
    }

    if (hasStandings) {
      let curY = startY + 50;
      const rows = isFinish ? ['NED 1 M.VAN DER WEIJDEN', 'GBR 2 DAVID DAVIES'] : ['LEADER NED M.VAN DER WEIJDEN', 'CHASE GBR DAVID DAVIES'];
      rows.forEach((r, i) => {
        const rowBar = new fabric.Rect(createProps('rect', { left: startX, top: curY, width: 500, height: 35, fill: gradientStart, skewX: -12, stroke: borderHighlight, strokeWidth: 1.5 }));
        const rowT = new fabric.Textbox(r, createProps('textbox', { left: startX + 20, top: curY + 8, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 460 }));
        objects.push(rowBar, rowT);
        curY += 40;
      });
    }
  }

  // ── SW131 / Location ──
  else if (normId.includes('SW131') || normId.includes('LOCATION')) {
    const locVal = (customData.location || 'HYDE PARK').toUpperCase();
    const startX = 280, startY = 940;
    const mainBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: 400, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5 }));
    const locText = new fabric.Textbox(locVal, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 360, textAlign: 'center' }));
    objects.push(mainBar, locText);
  }
