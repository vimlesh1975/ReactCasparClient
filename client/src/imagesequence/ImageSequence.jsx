import React, { useState, useEffect } from 'react';
import { endpoint, executeScript } from '../common';
import Mixer from '../Mixer';
// const frameRate = 40;
const ImageSequence = ({ layer }) => {
  const [base64Images, setBase64Images] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameRate, setFrameRate] = useState(60);
  const [preview, setPreview] = useState(false);
  const [imgSequenceLayer, setImgSequenceLayer] = useState(layer);

  const handleFolderSelect = (event) => {
    const files = Array.from(event.target.files);
    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64Promises)
      .then((base64Array) => {
        setBase64Images(base64Array);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  useEffect(() => {
    if (base64Images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % base64Images.length);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [base64Images, frameRate]);

  const stop = layerNumber => {
    endpoint(`stop ${window.chNumber}-${layerNumber}`);
    executeScript(`
    if(window.intervalimgseq){clearInterval(intervalimgseq)};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
  }
  const play = (layerNumber) => {
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
    const script = `
    window.imgseq = document.createElement('img');
    imgseq.style.position = 'absolute';
    imgseq.setAttribute('id', 'divid_' + '${layerNumber}');
    imgseq.style.zIndex = ${layerNumber};
    document.body.appendChild(imgseq);
    document.body.style.overflow = 'hidden';
    const base64Images = ${JSON.stringify(base64Images).replace(/"/g, "'")};
    let i = 0;
    window.intervalimgseq=setInterval(() => {
      imgseq.src = base64Images[i];
      i++;
      if (i >= base64Images.length) {
        i = 0;
      }
    }, ${1000 / frameRate});
  `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
    ${script}
    "`);

    executeScript(`
    if(window.intervalimgseq){clearInterval(intervalimgseq)};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
    executeScript(script);

  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 10 }}>
          <div>
            <input
              type="file"
              webkitdirectory="true"
              multiple
              onChange={handleFolderSelect}
            />
          </div>
          <div>
            <label>Frame Rate: </label> <input style={{ width: 50 }} type='number' value={frameRate} onChange={e => setFrameRate(e.target.value)} />
          </div>
          <div>
            <label>Layer : </label> <input style={{ width: 50 }} type='number' value={imgSequenceLayer} onChange={e => setImgSequenceLayer(e.target.value)} />
          </div>
          <div>
            <button onClick={() => setPreview(val => !val)}>{preview ? 'Stop Preview' : 'Preview'}</button>
            <button style={{ backgroundColor: 'darkgreen', color: 'white' }} onClick={() => play(imgSequenceLayer)}>Play to Caspar</button>
            <button style={{ backgroundColor: 'darkred', color: 'white' }} onClick={() => stop(imgSequenceLayer)}>Stop to Caspar</button>
            <Mixer layer={imgSequenceLayer} setLayer={setImgSequenceLayer} layerVisisble={false} />

          </div>
        </div>
        <div>
          <div>
            {preview && base64Images.length > 0 ? (
              <img
                src={base64Images[currentIndex]}
                alt={`fgfdg ${currentIndex}`}
                style={{ width: 200, height: 200, border: '1px solid red' }}
              />
            ) : (
              ''
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageSequence;