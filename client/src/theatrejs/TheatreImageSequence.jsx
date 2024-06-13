import React, { useState, useRef } from 'react';
import { shadowOptions } from '../common';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';

const TheatreImageSequence = ({ layer, sheet, generateTheatreID, fps }) => {
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const [base64Images, setBase64Images] = useState([]);
  const [imageObjects, setImageObjects] = useState([]);
  const [preview, setPreview] = useState(false);

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
    }, 1000 / fps); // Adjust the frame rate as needed
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



  const addToCanvas = () => {
    const aa5 = canvas.getObjects().find((element => element.id === 'imgSeqGroup1'));
    if (!aa5) {
      const imageGroup = new fabric.Group(imageObjects, {
        shadow: shadowOptions,
        id: 'imgSeqGroup1',
        class: "class_" + fabric.Object.__uid,
        fill: "#ffffff",
        objectCaching: false,
        stroke: "#000000",
        strokeWidth: 0,
      });
      canvas.add(imageGroup).setActiveObject(imageGroup);;
      canvas.requestRenderAll();
      generateTheatreID('imgSeqGroup1')
    }
  };

  const showFrame = (frameIndex) => {
    const group = canvas.getObjects().find(object => object.id === `id_${layer}`);
    if (group) {
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
    sheet.sequence.position = frameIndex / fps
  };

  const handleScrubberRelease = (event) => {
    setIsScrubbing(false);
    const frameIndex = parseInt(event.target.value, 10);
    showFrame(frameIndex);
    setCurrentFrame(frameIndex);
  };
  const handlePlayButtonClick = () => {
    playAnimation(currentFrame);
    // sheet.sequence.play();
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
            <button onClick={() => setPreview(val => !val)}>{preview ? 'Stop Preview' : 'Preview'}</button>
            <button onClick={() => addToCanvas()}>Add to canvas</button>
            <div>
              <input
                type="range"
                id="scrubber"
                min="0"
                max={base64Images.length - 1}
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

export default TheatreImageSequence;
