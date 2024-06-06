import React, { useState, useEffect } from 'react';
import { endpoint, executeScript } from '../common';
const frameRate = 10;
const ImageSequenceViewer = () => {
  const [base64Images, setBase64Images] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    }, frameRate);

    return () => clearInterval(interval);
  }, [base64Images]);

  setInterval(() => {

  }, frameRate);

  const play = (layerNumber) => {
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
    const script = `
    window.aaHorizontal1 = document.createElement('img');
    aaHorizontal1.style.position = 'absolute';
    aaHorizontal1.setAttribute('id', 'divid_' + '${layerNumber}');
    aaHorizontal1.style.zIndex = ${layerNumber};
    document.body.appendChild(aaHorizontal1);
    document.body.style.overflow = 'hidden';
    const base64Images = ${JSON.stringify(base64Images).replace(/"/g, "'")};
    let i = 0;
    setInterval(() => {
      aaHorizontal1.src = base64Images[i];
      i++;
      if (i >= base64Images.length) {
        i = 0;
      }
    }, ${frameRate});
  `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
    ${script}
    "`);

    executeScript(`
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
    executeScript(script);

  }

  return (
    <div className="App">
      <input
        type="file"
        webkitdirectory="true"
        multiple
        onChange={handleFolderSelect}
      />

      <button onClick={() => play(2)}>Play</button>
      {base64Images.length > 0 ? (
        <img
          src={base64Images[currentIndex]}
          alt={`fgfdg ${currentIndex}`}
        />
      ) : (
        <div>No images to display</div>
      )}
    </div>
  );
};

export default ImageSequenceViewer;
