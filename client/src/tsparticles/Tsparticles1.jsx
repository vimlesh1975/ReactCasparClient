import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { endpoint, templateLayers } from '../common'

const Tsparticles1 = () => {
  const [opacity, setOpacity] = useState(0.3);
  const [size, setSize] = useState(20);
  const [number, setNumber] = useState(20);
  const [speed, setSpeed] = useState(6);
  const [polygoneSides, setPolygoneSides] = useState(6);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [shape, setShape] = useState('polygon');
  const [strokeColor, setStrokeColor] = useState('#ff00ff');


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
    await console.log(container);
    window.tsParticles = container._engine;
  }, []);
  const initialise = (layerNumber) => {
    endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Tsparticles2"`);
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
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
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
          "src": "img/github.svg",
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
        "enable": false,
        "distance": 150,
        "color": "#000000",
        "opacity": 1,
        "width": 10
      },
      "move": {
        "enable": true,
        "speed": parseInt(speed),
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
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
  }
  const styles = {
    border: '1px solid black',
    padding: '5px',
  };

  return (<div>
    <div >
      <table style={styles}>

        <tbody>
          <tr style={styles}><td style={styles}>Shape</td>  <td style={styles}>  <select value={shape} onChange={e => setShape(e.target.value)}>
            <option value="circle">Circle</option>
            <option value="star">Star</option>
            <option value="polygon">Polygon</option>
          </select></td> </tr>
          <tr style={styles}><td style={styles}>Speed</td>  <td style={styles}><input className='inputRange' onChange={e => setSpeed(e.target.value)} type="range" min={0} max={100} step={1} value={speed} /> {speed}</td> </tr>
          <tr style={styles}><td style={styles}>Opacity</td>  <td style={styles}><input className='inputRange' onChange={e => setOpacity(e.target.value)} type="range" min={0} max={1} step={0.1} value={opacity} /> {opacity}</td> </tr>
          <tr style={styles}><td style={styles}>Size</td><td style={styles}><input className='inputRange' onChange={e => setSize(e.target.value)} type="range" min={0} max={200} step={1} value={size} /> {size}</td></tr>
          <tr style={styles}><td style={styles}>Number</td>  <td style={styles}> <input className='inputRange' onChange={e => setNumber(e.target.value)} type="range" min={0} max={200} step={1} value={number} /> {number}  </td></tr>
          <tr style={styles}><td style={styles}>Sides</td><td style={styles}> <input className='inputRange' onChange={e => setPolygoneSides(e.target.value)} type="range" min={0} max={30} step={1} value={polygoneSides} /> {polygoneSides} </td></tr>
          <tr style={styles}><td style={styles}>Stroke</td><td style={styles}>  <input className='inputRange' onChange={e => setStrokeWidth(e.target.value)} type="range" min={0} max={200} step={1} value={strokeWidth} /> {strokeWidth}</td></tr>
          <tr style={styles}><td style={styles}>Stroke Color</td><td style={styles}>  <input onChange={e => setStrokeColor(e.target.value)} type="color" value={strokeColor} /></td></tr>

          {/* <tr style={styles}><td style={styles}></td><td style={styles}></td></tr>
        <tr style={styles}><td style={styles}></td><td style={styles}></td></tr> */}

        </tbody>

      </table>

      <button onClick={() => initialise(templateLayers.Tsparticles1)}>Initialise</button>
      <button onClick={() => update(templateLayers.Tsparticles1)}>Update</button>
    </div>

    <Particles
      id="tsparticles"
      width={width}
      height={height}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 0
        },
        ...options,
      }
      }
    />
  </div>);
};
export default Tsparticles1