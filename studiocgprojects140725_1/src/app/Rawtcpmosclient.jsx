'use client'

import React, { useState } from 'react';

export default function Rawtcpmosclient() {
  const [output, setOutput] = useState('');
  const [roID, setroID] = useState('RO001');
  const [storyID, setstoryID] = useState('HOTEL_FIRE');
  const [itemID, setItemID] = useState('ITEM001');
  const [rowmosmessage, setRowmosmessage] = useState(`<mos>
  <ncsID>DDNRCS</ncsID>
  <mosID>WTVISION.STUDIO.MOS</mosID>
  <roElementAction operation="INSERT">
    <roID>RO001</roID>
    <element_target>
      <storyID/>
    </element_target>
    <element_source>
      <story>
        <storyID>202507031007311</storyID>
        <storySlug>slug</storySlug>
        <item>
          <itemID>hhh</itemID>
          <objID>DD_TESTING,08bbb87d-c40e-409f-be92-06d538327548</objID>
          <mosID>SAMVAD</mosID>
          <itemType>GraphicPage</itemType>
          <Thumbnail>iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wD/AP+</Thumbnail>
        
          <metadata>
            <graphicID>DD_TESTING,08bbb87d-c40e-409f-be92-06d538327548</graphicID>
            <categoryColor>Green</categoryColor>
            <tags>
              <tag tN="tHeaderA" tT="2">मौसम ने ली करवट</tag>
              <tag tN="tHeaderB" tT="2">मौसम के कारण देश मे बाढ़ की स्तिथि</tag>
              <tag tN="vWindows" tT="Float">6</tag>
              <tag tN="tTextA01" tT="2">मौसम ने ली करवट 01</tag>
              <tag tN="tTextB01" tT="2">मौसम ने ली करवट 11</tag>
            </tags>
   <color>Green</color>
  <outputChannel>Channel 1</outputChannel>
          <autoUpdate>true</autoUpdate>
          </metadata>
        </item>
      </story>
    </element_source>
  </roElementAction>
</mos>
`);



  const call = async (endpoint, body = {}) => {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      let text;
      try {
        const json = await res.json();
        text = JSON.stringify(json, null, 2);
      } catch {
        text = await res.text();
      }

      setOutput(prev => prev + `✅ ${endpoint}\n` + text + '\n\n');
    } catch (err) {
      setOutput(prev => prev + '❌ Error: ' + err.message + '\n');
    }
  };

  return (
    <div>
      <div >
        <button onClick={() => call('/api/tcp/connect')}>🔌 Connect</button>
      </div>

      <div >
        <label>
          RO ID:{' '}
          <input
            type="text"
            value={roID}
            onChange={e => setroID(e.target.value)}
            style={{ marginRight: '1rem' }}
          />
        </label>
        <button onClick={() => call('/api/tcp/roCreate', { roID })}>
          📤roCreate
        </button>
        <button onClick={() => call('/api/tcp/roDelete', { roID })}>
          roDelete
        </button>
      </div>


      <div >
        <label>
          storyID:{' '}
          <input
            type="text"
            value={storyID}
            onChange={e => setstoryID(e.target.value)}
            style={{ marginRight: '1rem' }}
          />
        </label>

        <button onClick={() => call('/api/tcp/roStoryInsert', { roID, storyID })}>
          roStoryInsert
        </button>
      </div>

      <div>
        <label>
          itemID:{' '}
          <input
            type="text"
            value={itemID}
            onChange={e => setItemID(e.target.value)}

          />
        </label>

        <button onClick={() => call('/api/tcp/roItemInsert', { roID, storyID, itemID })}>
          roItemInsert
        </button>
      </div>


      <div>

        <button onClick={() => call('/api/tcp/all', { roID, storyID, itemID })}>
          All
        </button>
        <button onClick={() => call('/api/tcp/deleteall', { roID, storyID, itemID })}>
          Delete All
        </button>
        <button onClick={() => call('/api/tcp/row', { rowmosmessage })}>
          send row mos message
        </button>

      </div>

      <div >
        <textarea value={rowmosmessage} onChange={e => setRowmosmessage(e.target.value)} style={{ width: 600, height: 700 }} />
        <button onClick={() => setOutput('')}>🧹 Clear Output</button>

        <h3>Output</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
