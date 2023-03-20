
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { endpoint, templateLayers } from '../common'




const Tsparticles1 = () => {
    const [loaded, setLoaded] = useState(false);

    // const left = 200;
    // const top = 100;
    const width = 800;
    const height = 300;
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
        window.tsParticles = container._engine;
    }, []);
    const test = (layerNumber) => {
        endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Tsparticles1"`);
    }

    const test2 = (layerNumber) => {
        const aa = ` tsParticles.load("particles-canvas", 

        {
        "particles": {
          "number": {
            "value": 10,
            "density": {
              "enable": false,
              "value_area": 2
            }
          },
          "color": {
            "value": "#023a46"
          },
          "shape": {
            "type": "polygon",
            "stroke": {
              "width": 5,
              "color": "#d41d1d"
            },
            "polygon": {
              "nb_sides": 6
            },
            "image": {
              "src": "img/github.svg",
              "width": 40,
              "height": 20
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 20,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "size_min": 200,
              "sync": true
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#000000",
            "opacity": 1,
            "width": 10
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 40
            },
            "remove": {
              "particles_nb": 20
            }
          }
        },
        "retina_detect": true
      }
        
        );`
        const bb = aa.replaceAll('"', '\\"');
        endpoint(`call 1-${layerNumber} "
        ${bb}
        "`);
    }
    return (<div onMouseOver={() => setLoaded(true)}>
        {loaded ? <div >
            <button onClick={() => test(templateLayers.Tsparticles1)}>Test</button>
            <button onClick={() => test2(templateLayers.Tsparticles1)}>Test</button>
        </div> : ''}

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
                fpsLimit: 60,
                background: {
                    color: "0000ff",
                    opacity: 0.0
                },
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push"
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse"
                        },
                        resize: false
                    },
                    modes: {
                        push: {
                            quantity: 4
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        }
                    }
                },
                particles: {
                    color: {
                        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1
                    },
                    collisions: {
                        enable: true
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce"
                        },
                        random: false,
                        speed: 4,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800
                        },
                        value: 200
                    },
                    opacity: {
                        value: 1
                    },
                    shape: {
                        type: "polygon",
                        stroke: {
                            width: 5,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 4
                        },
                    },
                    size: {
                        value: { min: 5, max: 25 }
                    }
                },
                detectRetina: true
            }}
        />
    </div>);
};
export default Tsparticles1