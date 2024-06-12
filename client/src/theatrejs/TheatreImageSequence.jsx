import React, { useState, useRef } from 'react';
import { shadowOptions, endpoint, executeScript } from '../common';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';

const ImageSequence = ({ layer, sheet, generateTheatreID }) => {
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const [base64Images, setBase64Images] = useState([]);
  const [imageObjects, setImageObjects] = useState([]);
  const [frameRate, setFrameRate] = useState(30);
  const [preview, setPreview] = useState(false);
  const [imgSequenceLayer, setImgSequenceLayer] = useState(layer);

  const [isScrubbing, setIsScrubbing] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationInterval = useRef(null);

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
        loadPNGSequence(base64Array)
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };
  const playAnimation = (startFrame) => {
    let j = startFrame;
    clearInterval(animationInterval.current);
    animationInterval.current = setInterval(() => {
      if (!isScrubbing) {
        showFrame(j);
        j = (j + 1) % (base64Images.length - 1);
        setCurrentFrame(j);
      }
    }, 1000 / frameRate); // Adjust the frame rate as needed
  };
  const loadPNGSequence = async (aa) => {
    const loadedImages = [];
    for (let i = 0; i <= aa.length; i++) {
      await new Promise((resolve) => {
        fabric.Image.fromURL(aa[i], (image) => {
          image.set({ opacity: 0 });
          loadedImages.push(image);
          resolve(image);
        });
      });
    }
    setImageObjects(loadedImages);
  };


  const stop = layerNumber => {
    endpoint(`stop ${window.chNumber}-${layerNumber}`);
    executeScript(`
    if(window.intervalimgseq_${layerNumber}){clearInterval(intervalimgseq_${layerNumber})};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
  }
  const play = (layerNumber) => {
    // endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
    const script = `
   __TheatreJS_StudioBundle._studio.core.onChange(sheet.sequence.pointer.position, (position) => {
    const aa5=window.canvas.getObjects().find((element=>element.id==='id_166'));
            aa5.getObjects().forEach((image, index) => {
                image.set({ opacity: index === parseInt((position) * 30) ? 1 : 0 });
            });
            window.canvas.requestRenderAll();
        });
  `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
    ${script}
    "`);

    executeScript(`
    if(window.intervalimgseq_${layerNumber}){clearInterval(intervalimgseq_${layerNumber})};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
    executeScript(script);

  }
  const addToCanvas = (id = 'id_' + layer) => {
    const imageGroup = new fabric.Group(imageObjects, {
      shadow: shadowOptions,
      id: id,
      class: "class_" + fabric.Object.__uid,
      fill: "#ffffff",
      objectCaching: false,
      stroke: "#000000",
      strokeWidth: 0,
    });

    canvas.add(imageGroup).setActiveObject(imageGroup);;
    canvas.requestRenderAll();

    generateTheatreID('id_' + layer)

    // const id_1 = sheet.object('imageGroup', { left: 0, top: 0 });
    // id_1.onValuesChange((val) => {
    //   imageGroup.set({ left: val.left, top: val.top });

    //   imageGroup.getObjects().forEach((image, index) => {
    //     image.set({ opacity: index === parseInt((sheet.sequence.position) * 30) ? 1 : 0 });
    //   });

    //   canvas.requestRenderAll();
    // })

    // arrObject.push(id_1);

  };

  const showFrame = (frameIndex) => {
    if (canvas.getObjects().some(image => image.id === `id_${layer}`)) {
      const group = canvas.getObjects().find(object => object.id === `id_${layer}`)
      group.getObjects().forEach((image, index) => {
        image.set({ opacity: index === frameIndex ? 1 : 0 });
      });
      canvas.requestRenderAll();
    }
  };

  const handleScrubberChange = (event) => {
    clearInterval(animationInterval.current);
    setIsScrubbing(true);
    const frameIndex = parseInt(event.target.value, 10);
    showFrame(frameIndex);
    setCurrentFrame(frameIndex);
    sheet.sequence.position = frameIndex / frameRate
  };

  const handleScrubberRelease = (event) => {
    setIsScrubbing(false);
    const frameIndex = parseInt(event.target.value, 10);
    showFrame(frameIndex);
    setCurrentFrame(frameIndex);
  };
  const handlePlayButtonClick = () => {
    playAnimation(currentFrame);
  };

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
            <button onClick={() => addToCanvas()}>Add to canvas</button>
            <div>
              <input
                type="range"
                id="scrubber"
                min="0"
                max={base64Images.length - 2}
                value={currentFrame}
                step="1"
                onInput={handleScrubberChange}
                onChange={handleScrubberRelease}
              />{currentFrame}
              <button id="playButton" onClick={handlePlayButtonClick}>
                Play Animation
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            {preview && base64Images.length > 0 ? (
              <img
                src={base64Images[currentFrame]}
                alt={`fgfdg ${currentFrame}`}
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
