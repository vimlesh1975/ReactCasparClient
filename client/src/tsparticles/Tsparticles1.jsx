import { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { endpoint, templateLayers, executeScript, colors } from '../common'
import { useSelector } from 'react-redux'
import * as fabric from 'fabric';

const Tsparticles1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const [opacity, setOpacity] = useState(1);
  const [size, setSize] = useState(20);
  const [number, setNumber] = useState(20);
  const [speed, setSpeed] = useState(6);
  const [polygoneSides, setPolygoneSides] = useState(6);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [shape, setShape] = useState('polygon');
  const [strokeColor, setStrokeColor] = useState('#ff00ff');
  const [file, setFile] = useState('/ReactCasparClient/img/pine-wood-500x500.jpg');
  const [link, setLink] = useState(false);

  const width = 850;
  const height = 600;
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);

  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await container
    // await console.log(container);
    // window.tsParticles = container._engine;
  }, []);

  const initialise = (layerNumber) => {
    endpoint(`play 1-${layerNumber} [html] "https://localhost:10000/ReactCasparClient/Tsparticles2"`);
    // endpoint(`call 1-${layerNumber} "document.getElementById('tsparticles')?.remove()"`);

  }

  const options = {
    "particles": {
      "number": {
        "value": parseInt(number),
        "density": {
          "enable": false,
          "value_area": 400
        }
      },
      "color": {
        value: colors
      },
      "shape": {
        "type": shape,
        "stroke": {
          "width": parseInt(strokeWidth),
          "color": strokeColor.toString()
        },
        "polygon": {
          "nb_sides": parseInt(polygoneSides)
        },
        "image": {
          "src": file,
          "width": 40,
          "height": 20
        }
      },
      "opacity": {
        "value": parseFloat(opacity),
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": parseInt(size),
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0,
          "sync": true
        }
      },
      "line_linked": {
        "enable": link,
        "distance": 150,
        "opacity": parseFloat(opacity),
        "width": parseInt(strokeWidth),
        "color": strokeColor.toString()
      },
      "move": {
        "enable": true,
        "speed": parseInt(speed),
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
      }
    },
    "retina_detect": true
  };

  const update = (layerNumber) => {
    const aa = ` tsParticles.load("tsparticles", 
      ${JSON.stringify(options)}
        );`
    const bb = aa.replaceAll('"', '\\"');
    endpoint(`call 1-${layerNumber} "
        ${bb}
        "`);
    const script = `
        ${aa}
        `
    executeScript(`
        ${script}
        `);
  }

  const update2 = (layerNumber) => {
    canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(canvas.getObjects(), {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();

    const aa = ` tsParticles.load("tsparticles", 
    ${JSON.stringify({
      ...options, fullScreen: {
        enable: false,
        zIndex: 0,
      },
    })}
      );
      var myDiv = document.getElementById('tsparticles');
      myDiv.style.cssText = 'position:absolute;z-index:${-layerNumber}; left: ${sel.getBoundingRect().left - 25}px;top: ${sel.getBoundingRect().top - 25}300px;width: ${sel.getBoundingRect().width + 50}px;height: ${sel.getBoundingRect().height + 50}px;';
      `
    const bb = aa.replaceAll('"', '\\"');
    endpoint(`call 1-${layerNumber} "
      ${bb}
      "`);
    const script = `
      ${aa}
      `
    executeScript(`
      ${script}
      `);

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }


  const stop = (layerNumber) => {
    endpoint(`call 1-${layerNumber} "document.getElementById('tsparticles')?.remove()"`);
    executeScript(`document.getElementById('tsparticles')?.remove()`);

  }
  const styles = {
    border: '1px solid black',
    padding: '5px',
  };

  const setfileforTsparticle = () => {
    var fInput = document.createElement("input");
    fInput.setAttribute("type", "file");
    fInput.setAttribute("accept", "image/*");
    fInput.setAttribute("multiple", false);

    fInput.click();
    fInput.onchange = (e) => {
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
          setFile(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  }
  useEffect(() => {

    return () => {
      // second
    }
    // eslint-disable-next-line
  }, [])


  return (<div>
    <div style={{ display: 'flex' }}>
      <div >
        <table style={styles}>
          <tbody>
            <tr style={styles}><td style={styles}>Shape</td><td style={styles}><select value={shape} onChange={e => setShape(e.target.value)}>
              <option value="circle">Circle</option>
              <option value="star">Star</option>
              <option value="polygon">Polygon</option>
              <option value="image">Image</option>
            </select></td></tr>
            <tr style={styles}><td style={styles}>Speed</td><td style={styles}><input className='inputRange' onChange={e => setSpeed(e.target.value)} type="range" min={0} max={100} step={1} value={speed} />{speed}</td></tr>
            {(shape === 'image') && <tr style={styles}><td style={styles}>Image</td><td onClick={setfileforTsparticle} style={styles}>  <img src={file} alt="particle_image" style={{ width: 60, height: 20 }} /></td></tr>}
            <tr style={styles}><td style={styles}>Opacity</td><td style={styles}><input className='inputRange' onChange={e => setOpacity(e.target.value)} type="range" min={0} max={1} step={0.1} value={opacity} />{opacity}</td></tr>
            <tr style={styles}><td style={styles}>Size</td><td style={styles}><input className='inputRange' onChange={e => setSize(e.target.value)} type="range" min={0} max={200} step={1} value={size} /> {size}</td></tr>
            <tr style={styles}><td style={styles}>Number</td><td style={styles}><input className='inputRange' onChange={e => setNumber(e.target.value)} type="range" min={0} max={200} step={1} value={number} />{number}</td></tr>
            <tr style={styles}><td style={styles}>Sides</td><td style={styles}><input className='inputRange' onChange={e => setPolygoneSides(e.target.value)} type="range" min={0} max={30} step={1} value={polygoneSides} />{polygoneSides}</td></tr>
            <tr style={styles}><td style={styles}>Stroke</td><td style={styles}><input className='inputRange' onChange={e => setStrokeWidth(e.target.value)} type="range" min={0} max={200} step={1} value={strokeWidth} />{strokeWidth}</td></tr>
            <tr style={styles}><td style={styles}>Stroke Color</td><td style={styles}><input onChange={e => setStrokeColor(e.target.value)} type="color" value={strokeColor} /></td></tr>
            <tr style={styles}><td style={styles}>Link</td><td onClick={() => setLink(val => !val)} style={styles}><input type="checkbox" checked={link} onChange={() => { }} /></td></tr>
          </tbody>
        </table>
        <button onClick={() => initialise(templateLayers.Tsparticles1)}>Initialise (only once)</button>
        <button onClick={() => update(templateLayers.Tsparticles1)}>Update Fullscreen</button>
        <button onClick={() => stop(templateLayers.Tsparticles1)}>Stop</button>
      </div>
      <div style={{ border: '1px solid red', width: 500 }}>
        {/* <div>left1: {left1}</div>
        <div>top1: {top1}</div>
        <div>width1: {width1}</div>
        <div>height1: {height1}</div> */}
        <button onClick={() => update2(templateLayers.Tsparticles1)}>Update as per Canvas Content Position and Size</button>

      </div>
    </div>
    {/* <div style={{ backgroundColor: 'red', width: width1, height: height1 }}></div> */}

    <Particles
      id="tsparticles"
      width={width}
      height={height}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        ...options,
      }
      }
    />
  </div>);
};
export default Tsparticles1