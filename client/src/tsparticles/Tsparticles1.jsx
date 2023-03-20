
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
    }, []);
    const test = (layerNumber) => {
        endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Tsparticles1"`);
    }
    return (<div onMouseOver={() => setLoaded(true)}>
        {loaded ? <div >
            <button onClick={() => test(templateLayers.Tsparticles1)}>Test</button>
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