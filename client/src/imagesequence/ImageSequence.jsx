import React, { useState, useRef } from 'react';
import { shadowOptions, endpoint, executeScript } from '../common';
import Mixer from '../Mixer';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';

const ImageSequence = ({ layer }) => {
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const [base64Images, setBase64Images] = useState([]);
  const [imageObjects, setImageObjects] = useState([]);
  const [frameRate, setFrameRate] = useState(60);
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
    for (let i = 0; i < aa.length; i++) {
      await new Promise((resolve) => {
        fabric.FabricImage.fromURL(aa[i]).then(image => {
          image.set({ opacity: 0 });
          loadedImages.push(image);
          resolve(image);
        }).catch(err => {
          console.error(err);
          resolve(null);
        });
      });
    }
    setImageObjects(loadedImages.filter(Boolean));
  };


  const stop = layerNumber => {
    endpoint(`stop ${window.chNumber}-${layerNumber}`);
    executeScript(`
    if(window.intervalimgseq_${layerNumber}){clearInterval(intervalimgseq_${layerNumber})};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
  }
  const play = (layerNumber) => {
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
    const script = `
    var bb = document.createElement('div');
    bb.style.perspective='1920px';
    bb.style.transformStyle='preserve-3d';
    document.body.appendChild(bb);
    window.imgseq_${layerNumber} = document.createElement('img');
    imgseq_${layerNumber}.style.position = 'absolute';
    imgseq_${layerNumber}.setAttribute('id', 'divid_' + '${layerNumber}');
    imgseq_${layerNumber}.style.zIndex = ${layerNumber};
    bb.appendChild(imgseq_${layerNumber});
    document.body.style.overflow = 'hidden';
    const base64Images = ${JSON.stringify(base64Images).replace(/"/g, "'")};
    let i = 0;
    window.intervalimgseq_${layerNumber}=setInterval(() => {
      imgseq_${layerNumber}.src = base64Images[i];
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
    if(window.intervalimgseq_${layerNumber}){clearInterval(intervalimgseq_${layerNumber})};
    document.getElementById('divid_${layerNumber}')?.remove();
    `);
    executeScript(script);

  }
  const addToCanvas = (id = 'id_' + imgSequenceLayer) => {
    const groupId = 'imgSeqGroup_' + imgSequenceLayer;
    const aa5 = canvas.getObjects().find((element => element.id === groupId));
    if (!aa5) {
      const imageGroup = new fabric.Group(imageObjects, {
        shadow: shadowOptions,
        id: groupId,
        class: "class_" + groupId,
        fill: "#ffffff",
        objectCaching: false,
        stroke: "#000000",
        strokeWidth: 0,
      });

      canvas.add(imageGroup);
      canvas.setActiveObject(imageGroup);
      canvas.requestRenderAll();
    }
  };
  const showFrame = (frameIndex) => {
    const groupId = 'imgSeqGroup_' + imgSequenceLayer;
    if (canvas.getObjects().some(image => image.id === groupId)) {
      const group = canvas.getObjects().find(object => object.id === groupId)
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
  const loadSampleSequence = async (seqNumber = 1) => {
    const dir = seqNumber === 2 ? 'sample_image_sequence_2' : 'sample_image_sequence';
    const promises = [];
    for (let i = 1; i <= 25; i++) {
      const frameNum = String(i).padStart(4, '0');
      const url = `${process.env.PUBLIC_URL}/${dir}/frame_${frameNum}.png`;
      promises.push(
        fetch(url)
          .then(res => res.blob())
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }))
      );
    }
    try {
      const base64Array = await Promise.all(promises);
      setBase64Images(base64Array);
      loadPNGSequence(base64Array);
    } catch (err) {
      console.error('Error loading sample sequence:', err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 8, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="file"
              webkitdirectory="true"
              multiple
              onChange={handleFolderSelect}
            />
            <button type="button" onClick={() => loadSampleSequence(1)} style={{ backgroundColor: '#0284c7', color: 'white', cursor: 'pointer' }}>
              Load Sample 1 (Radar)
            </button>
            <button type="button" onClick={() => loadSampleSequence(2)} style={{ backgroundColor: '#d97706', color: 'white', cursor: 'pointer' }}>
              Load Sample 2 (Gold Orb)
            </button>
            <a href={`${process.env.PUBLIC_URL}/sample_image_sequence.zip`} download="sample_image_sequence_1.zip" style={{ textDecoration: 'none' }}>
              <button type="button" style={{ backgroundColor: '#475569', color: 'white', cursor: 'pointer' }}>
                Zip 1
              </button>
            </a>
            <a href={`${process.env.PUBLIC_URL}/sample_image_sequence_2.zip`} download="sample_image_sequence_2.zip" style={{ textDecoration: 'none' }}>
              <button type="button" style={{ backgroundColor: '#475569', color: 'white', cursor: 'pointer' }}>
                Zip 2
              </button>
            </a>
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
              />
              <button id="playButton" onClick={handlePlayButtonClick}>
                Play Animation
              </button>
            </div>
            <Mixer layer={imgSequenceLayer} setLayer={setImgSequenceLayer} layerVisisble={false} />
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
