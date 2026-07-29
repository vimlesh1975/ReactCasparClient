import sys
import codecs

fabric_code = '''
  // ── SW120 / Ceremony ID ──
  else if (normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const titleVal = (customData.title || 'VICTORY CEREMONY').toUpperCase();
    const eventVal = (customData.event || "MEN\\'S MARATHON 10KM").toUpperCase();
    const startX = 280, startY = 880;

    const mainBar = new fabric.Rect({ left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, id: 'rect1' });
    const subBar = new fabric.Rect({ left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1, id: 'rect2' });
    
    const titleText = new fabric.Textbox(titleVal, { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660, id: 'text1' });
    const eventText = new fabric.Textbox(eventVal, { left: startX + 20, top: startY + 49, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620, id: 'text2' });
    
    objects.push(mainBar, titleText, subBar, eventText);
  }

  // ── SW121 / Medal ID ──
  else if (normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const nameVal = (customData.name || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    const medalVal = (customData.medal || 'GOLD MEDALLIST').toUpperCase();
    const startX = 280, startY = 940;

    const mainBar = new fabric.Rect({ left: startX, top: startY, width: 540, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, id: 'rect1' });
    const subBar = new fabric.Rect({ left: startX, top: startY + 45, width: 220, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1, id: 'rect2' });
    
    const nocText = new fabric.Textbox(nocCode, { left: startX + 16, top: startY + 9, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 50, id: 'text1' });
    const nameText = new fabric.Textbox(nameVal, { left: startX + 138, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 382, id: 'text2' });
    const medalText = new fabric.Textbox(medalVal, { left: startX + 10, top: startY + 49, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 200, textAlign: 'center', id: 'text3' });
    
    objects.push(mainBar, nocText, nameText, subBar, medalText);
  }

  // ── SW122 / Medals List ──
  else if (normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const eventVal = (customData.event || "MEN\\'S MARATHON 10KM").toUpperCase();
    const medals = customData.medals || [
      { noc: 'NED', name: 'M. VAN DER WEIJDEN', medal: 'GOLD' },
      { noc: 'GBR', name: 'DAVID DAVIES', medal: 'SILVER' },
      { noc: 'GER', name: 'THOMAS LURZ', medal: 'BRONZE' }
    ];
    let startY = 700; const startX = 280;

    const headerBar = new fabric.Rect({ left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, id: 'h1' });
    const subBar = new fabric.Rect({ left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1, id: 'h2' });
    const titleText = new fabric.Textbox('VICTORY CEREMONY', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660, id: 'ht1' });
    const eventText = new fabric.Textbox("MEDALLISTS - " + eventVal, { left: startX + 20, top: startY + 49, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620, id: 'ht2' });
    objects.push(headerBar, subBar, titleText, eventText);

    startY += 80;
    medals.forEach((m, i) => {
      const rowBar = new fabric.Rect({ left: startX, top: startY, width: 700, height: 40, fill: altRowColor, skewX: -12, stroke: borderHighlight, strokeWidth: 1, id: 'r'+i });
      const noc = new fabric.Textbox(m.noc, { left: startX + 60, top: startY + 10, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 50, id: 'rn'+i });
      const name = new fabric.Textbox(m.name, { left: startX + 180, top: startY + 10, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 400, id: 'rnm'+i });
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

    const mainBar = new fabric.Rect({ left: startX, top: startY, width: 700, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, id: 'rect1' });
    const subBar = new fabric.Rect({ left: startX, top: startY + 45, width: 660, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1, id: 'rect2' });
    
    const nameText = new fabric.Textbox(nameVal, { left: startX + 20, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660, id: 'text1' });
    const subText = new fabric.Textbox(roleVal + ' - ' + titleVal, { left: startX + 20, top: startY + 49, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 620, id: 'text2' });
    
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

    const clockBar = new fabric.Rect({ left: startX, top: startY, width: 180, height: 42, fill: '#000000', skewX: -12, rx: 5, ry: 5, stroke: '#ffffff', strokeWidth: 2, id: 'cb' });
    const clockText = new fabric.Textbox(clockVal, { left: startX + 10, top: startY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 160, textAlign: 'center', id: 'ct' });
    objects.push(clockBar, clockText);

    if (hasDelta) {
      const deltaBar = new fabric.Rect({ left: startX + 190, top: startY, width: 120, height: 42, fill: '#00192e', skewX: -12, stroke: borderHighlight, strokeWidth: 1.5, id: 'db' });
      const deltaT = new fabric.Textbox(deltaVal, { left: startX + 195, top: startY + 10, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffcc00', width: 110, textAlign: 'center', id: 'dt' });
      objects.push(deltaBar, deltaT);
    }

    if (hasStandings) {
      let curY = startY + 50;
      const rows = isFinish ? ['NED 1 M.VAN DER WEIJDEN', 'GBR 2 DAVID DAVIES'] : ['LEADER NED M.VAN DER WEIJDEN', 'CHASE GBR DAVID DAVIES'];
      rows.forEach((r, i) => {
        const rowBar = new fabric.Rect({ left: startX, top: curY, width: 500, height: 35, fill: gradientStart, skewX: -12, stroke: borderHighlight, strokeWidth: 1.5, id: 'sr'+i });
        const rowT = new fabric.Textbox(r, { left: startX + 20, top: curY + 8, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 460, id: 'srt'+i });
        objects.push(rowBar, rowT);
        curY += 40;
      });
    }
  }

  // ── SW131 / Location ──
  else if (normId.includes('SW131') || normId.includes('LOCATION')) {
    const locVal = (customData.location || 'HYDE PARK').toUpperCase();
    const startX = 280, startY = 940;
    const mainBar = new fabric.Rect({ left: startX, top: startY, width: 400, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, id: 'rect1' });
    const locText = new fabric.Textbox(locVal, { left: startX + 20, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 360, textAlign: 'center', id: 'text1' });
    objects.push(mainBar, locText);
  }
'''

html_code = '''
  // ── SW120 / Ceremony ID ──
  else if (normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const titleVal = (customData.title || 'VICTORY CEREMONY').toUpperCase();
    const eventVal = (customData.event || "MEN\\'S MARATHON 10KM").toUpperCase();
    const posX = customData.posX || '280px', posY = customData.posY || '880px';
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .cer-container { position: absolute; left: ${posX}; top: ${posY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .cer-bar { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .cer-title { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; }
        .cer-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; }
        .cer-sub-text { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="cer-container">
          <div class="cer-bar"><div class="cer-title">${titleVal}</div></div>
          <div class="cer-sub"><div class="cer-sub-text">${eventVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW121 / Medal ID ──
  else if (normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const nameVal = (customData.name || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    const medalVal = (customData.medal || 'GOLD MEDALLIST').toUpperCase();
    const posX = customData.posX || '280px', posY = customData.posY || '940px';
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .m-container { position: absolute; left: ${posX}; top: ${posY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .m-bar { width: 540px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; }
        .m-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; width: 100%; }
        .m-noc { font-size: 18px; font-weight: 900; font-style: italic; }
        .m-flag { width: 60px; height: 20px; object-fit: cover; border: 1px solid rgba(255,255,255,0.6); }
        .m-name { font-size: 20px; font-weight: 900; font-style: italic; }
        .m-sub { width: 220px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .m-sub-text { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="m-container">
          <div class="m-bar"><div class="m-content">
            <div class="m-noc">${nocCode}</div>
            ${flagUrl ? \`<img class="m-flag" src="\${flagUrl}" />\` : ''}
            <div class="m-name">${nameVal}</div>
          </div></div>
          <div class="m-sub"><div class="m-sub-text">${medalVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW122 / Medals List ──
  else if (normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const eventVal = (customData.event || "MEN\\'S MARATHON 10KM").toUpperCase();
    const medals = customData.medals || [
      { noc: 'NED', name: 'M. VAN DER WEIJDEN', medal: 'GOLD' },
      { noc: 'GBR', name: 'DAVID DAVIES', medal: 'SILVER' },
      { noc: 'GER', name: 'THOMAS LURZ', medal: 'BRONZE' }
    ];
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .ml-container { position: absolute; left: 280px; top: 700px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .ml-header { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .ml-title { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; }
        .ml-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; margin-bottom: 15px; }
        .ml-sub-text { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }
        .ml-row { width: 700px; height: 40px; background: ${altRowColor}; transform: skewX(-12deg); border: 1px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; margin-top: 2px; color: #fff; }
        .ml-row-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; width: 100%; font-size: 18px; font-weight: 900; font-style: italic; }
        .ml-row-medal { width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.3); }
        .gold { background: radial-gradient(circle, #fceabb 0%, #f8b500 100%); }
        .silver { background: radial-gradient(circle, #e0e0e0 0%, #9e9e9e 100%); }
        .bronze { background: radial-gradient(circle, #f5d3b3 0%, #cc8855 100%); }
        .ml-flag { width: 60px; height: 20px; object-fit: cover; border: 1px solid rgba(255,255,255,0.6); }
      </style></head><body>
        <div class="ml-container">
          <div class="ml-header"><div class="ml-title">VICTORY CEREMONY</div></div>
          <div class="ml-sub"><div class="ml-sub-text">MEDALLISTS - ${eventVal}</div></div>
          ${medals.map(m => {
            const f = getFlagBase64(m.noc);
            const mClass = (m.medal || '').toLowerCase().includes('gold') ? 'gold' : (m.medal || '').toLowerCase().includes('silver') ? 'silver' : 'bronze';
            return \`<div class="ml-row"><div class="ml-row-content">
              <div class="ml-row-medal \${mClass}"></div>
              <div>\${m.noc}</div>
              \${f ? \\\`<img class="ml-flag" src="\${f}" />\\\` : ''}
              <div>\${m.name}</div>
            </div></div>\`;
          }).join('')}
        </div>
      </body></html>
    `;
  }

  // ── SW123 / Medal Presenter ID & SW124 / Flower Presenter ID ──
  else if (normId.includes('SW123') || normId.includes('SW124') || normId.includes('PRESENTER')) {
    const isFlower = normId.includes('SW124') || normId.includes('FLOWER');
    const roleVal = (customData.role || (isFlower ? 'FLOWERS PRESENTED BY' : 'MEDALS PRESENTED BY')).toUpperCase();
    const nameVal = (customData.name || 'JACQUES ROGGE').toUpperCase();
    const titleVal = (customData.title || 'IOC PRESIDENT').toUpperCase();
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .p-container { position: absolute; left: 280px; top: 940px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .p-bar { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .p-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
        .p-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; }
        .p-sub-text { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="p-container">
          <div class="p-bar"><div class="p-title">${nameVal}</div></div>
          <div class="p-sub"><div class="p-sub-text">${roleVal} - ${titleVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW125 to SW130 / Race Clocks ──
  else if (normId.match(/SW125|SW126|SW128|SW129|SW130|CLOCK/)) {
    const isFinish = normId.includes('SW130') || normId.includes('FINISH');
    const hasDelta = normId.includes('SW126') || normId.includes('DELTA');
    const hasStandings = normId.includes('SW129') || normId.includes('SW130');
    const clockVal = customData.clock || '1:45:23';
    const deltaVal = customData.delta || '+0:12';
    const startY = hasStandings ? '840px' : '940px';
    const rows = isFinish ? ['NED 1 M.VAN DER WEIJDEN', 'GBR 2 DAVID DAVIES'] : ['LEADER NED M.VAN DER WEIJDEN', 'CHASE GBR DAVID DAVIES'];

    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .c-container { position: absolute; left: 280px; top: ${startY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); display: flex; flex-direction: column; gap: 8px; }
        .c-top { display: flex; gap: 10px; }
        .c-main { width: 180px; height: 42px; background: #000; color: #fff; transform: skewX(-12deg); border: 2px solid #fff; border-radius: 5px; display: flex; align-items: center; justify-content: center; }
        .c-main-t { transform: skewX(12deg); font-size: 24px; font-weight: 900; font-style: italic; }
        .c-delta { width: 120px; height: 42px; background: #00192e; color: #ffcc00; transform: skewX(-12deg); border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; justify-content: center; }
        .c-delta-t { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
        .c-row { width: 500px; height: 35px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; margin-top: -4px; }
        .c-row-t { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; }
      </style></head><body>
        <div class="c-container">
          <div class="c-top">
            <div class="c-main"><div class="c-main-t">${clockVal}</div></div>
            ${hasDelta ? \`<div class="c-delta"><div class="c-delta-t">\${deltaVal}</div></div>\` : ''}
          </div>
          ${hasStandings ? rows.map(r => \`<div class="c-row"><div class="c-row-t">\${r}</div></div>\`).join('') : ''}
        </div>
      </body></html>
    `;
  }

  // ── SW131 / Location ──
  else if (normId.includes('SW131') || normId.includes('LOCATION')) {
    const locVal = (customData.location || 'HYDE PARK').toUpperCase();
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .l-container { position: absolute; left: 280px; top: 940px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .l-bar { width: 400px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; justify-content: center; }
        .l-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
      </style></head><body>
        <div class="l-container">
          <div class="l-bar"><div class="l-title">${locVal}</div></div>
        </div>
      </body></html>
    `;
  }
'''

with codecs.open('c:/Users/vimlesh/Documents/vimlesh/ReactCasparClient/client/src/games2/sports2/swimming2.js', 'r', 'utf-8') as f:
    lines = f.readlines()

def insert_before(lines, marker, content):
    for i, line in enumerate(lines):
        if marker in line:
            return lines[:i] + [content] + lines[i:]
    return lines

lines = insert_before(lines, '  return objects;', fabric_code)
lines = insert_before(lines, '  return `<div>Unknown Swimming Template</div>`;', html_code)

with codecs.open('c:/Users/vimlesh/Documents/vimlesh/ReactCasparClient/client/src/games2/sports2/swimming2.js', 'w', 'utf-8') as f:
    f.writelines(lines)
