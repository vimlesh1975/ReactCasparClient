  // ── SW120 / Ceremony ID ──
  else if (normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const titleVal = (customData.title || 'VICTORY CEREMONY').toUpperCase();
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
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
            ${flagUrl ? `<img class="m-flag" src="${flagUrl}" />` : ''}
            <div class="m-name">${nameVal}</div>
          </div></div>
          <div class="m-sub"><div class="m-sub-text">${medalVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW122 / Medals List ──
  else if (normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
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
          \${medals.map(m => {
            const f = getFlagBase64(m.noc);
            const mClass = (m.medal || '').toLowerCase().includes('gold') ? 'gold' : (m.medal || '').toLowerCase().includes('silver') ? 'silver' : 'bronze';
            const flagTag = f ? '<img class="ml-flag" src="' + f + '" />' : '';
            return '<div class="ml-row"><div class="ml-row-content">' +
              '<div class="ml-row-medal ' + mClass + '"></div>' +
              '<div>' + m.noc + '</div>' +
              flagTag +
              '<div>' + m.name + '</div>' +
            '</div></div>';
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
            \${hasDelta ? '<div class="c-delta"><div class="c-delta-t">' + deltaVal + '</div></div>' : ''}
          </div>
          \${hasStandings ? rows.map(r => '<div class="c-row"><div class="c-row-t">' + r + '</div></div>').join('') : ''}
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
