import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
// import { Physics } from "@react-three/cannon";
// import { useSelector } from 'react-redux'
import { endpoint } from './common'
import { useRef } from 'react';
import { useState, useCallback } from 'react';
import * as THREE from 'three'
// import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { v4 as uuidv4 } from 'uuid';
// import { Vector3 } from 'three';

const Threejs = () => {
    const [boxes, setBoxes] = useState([])
    const [spheres, setSpheres] = useState([])

    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();
    // const canvas = useSelector(state => state.canvasReducer.canvas);
    // const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const showToCasparcg = () => {
        endpoint(`play 1-5 [html] "http://localhost:10000/ReactCasparClient/threejs2"`);

    }

    const resetCamera1 = () => {
        // console.log(camera1.position)
        camera1.position.set(0, 3.061616997868383e-16, 5)
    }

    const resetCamera2 = () => {
        // console.log(camera1.position)
        camera2.position.set(0, 3.061616997868383e-16, 5)
    }

    const updatetoCaspar1 = () => {
        endpoint(`call 1-5 "
        importScenefromData(${JSON.stringify(scene1.toJSON()).replaceAll('"', '\\"')})
        "`);
        endpoint(`call 1-5 "
        camera1.position.set(${camera1.position.x}, ${camera1.position.y}, ${camera1.position.z})
        "`);
    }
    const updatetoCaspar2 = () => {
        endpoint(`call 1-5 "
        importScenefromData(${JSON.stringify(scene2.toJSON()).replaceAll('"', '\\"')})
        "`);

        endpoint(`call 1-5 "
        camera1.position.set(${camera2.position.x}, ${camera2.position.y}, ${camera2.position.z})
        "`);
    }

    const resetCameraToCasparc = () => {
        // console.log(camera1.position)
        endpoint(`call 1-5 "
        camera1.position.set(0, 3.061616997868383e-16, 5)
        "`);
    }

    function importScenefromfile(inp) {
        console.log(inp);
        var reader = new FileReader();
        reader.onload = e => {
            var loader = new THREE.ObjectLoader();
            loader.load(e.target.result,
                json => {
                    setScene2(json);
                }
            );
        }
        reader.readAsDataURL(inp);
    }

    // const importScenefromData = (inp) => {
    //     // var inp = scene2.toJSON();
    //     var loader = new THREE.ObjectLoader();
    //     loader.parse(inp,
    //         json => {
    //             setScene1(json);
    //         }
    //     );
    // }


    const refkkk = useRef();
    function Spheres() {
        const ref = useRef()
        // const handleClick = 
        return (
            <>
                <mesh ref={ref} >
                    {spheres.map((key, i) => (
                        <Spawned key={key} position={[i, 0, 0]}
                        />
                    ))}
                </mesh>
            </>
        )
    }
    // function Box() {
    //     const ref = useRef();
    //     useFrame(() => {
    //         // ref.current.rotation.y += 0.010;
    //         // ref.current.rotation.x += 0.010;
    //     });
    //     return (
    //         <mesh
    //             ref={ref}
    //             position={[0, 2, 0]}
    //         >
    //             <boxGeometry attach="geometry" />
    //             <meshNormalMaterial attach="material" />
    //         </mesh>
    //     );
    // }
    function Spawned(props) {
        return (
            <mesh {...props}>
                <sphereGeometry attach="geometry" args={[0.5, 16, 16]} />
                <meshStandardMaterial attach="material" color="hotpink" transparent />
            </mesh>
        )
    }

    // function showSvgtoCasparcg() {
    //     var rendererSVG = new SVGRenderer();
    //     rendererSVG.setSize(window.innerWidth, window.innerHeight);
    //     // rendererSVG.setClearColor('red', 0.50);
    //     rendererSVG.render(scene1, camera1);
    //     var XMLS = new XMLSerializer();
    //     var svgfile = XMLS.serializeToString(rendererSVG.domElement);
    //     var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    //     svgfile = preface + svgfile.replace(`style="background-color: rgb(254, 254, 254);"`, "");

    //     endpoint(`play ${window.chNumber}-${96} [HTML] xyz.html`);
    //     endpoint(`call ${window.chNumber}-${96} "
    //     var bb = document.createElement('div');
    //     bb.style.perspective='1920px';
    //     bb.style.transformStyle='preserve-3d';
    //     document.body.appendChild(bb);
    //         var aa = document.createElement('div');
    //         aa.style.position='absolute';
    //         aa.innerHTML='${(svgfile).replaceAll('"', '\\"')}';
    //         bb.appendChild(aa);
    //         document.body.style.margin='0';
    //         document.body.style.padding='0';
    //         aa.style.zoom=(${1920 * 100}/1920)+'%';
    //         document.body.style.overflow='hidden';
    //         "`)
    // }


    return (<div >
        <div >
            <div style={{ border: '1px solid red' }}>
                Casparc Control
                <button onClick={showToCasparcg}>Initialise casparcg</button>
                <button onClick={resetCameraToCasparc}>caaspar camera Reset</button>
            </div>

            <button onClick={useCallback(e => setSpheres(items => [...items, uuidv4()]), [])}>Add Sphere</button>
            <button onClick={useCallback(e => setBoxes(items => [...items, uuidv4()]), [])}>Add Box</button>
            {/* <button onClick={showSvgtoCasparcg}> Show SVG to casparcg</button> */}
            <br /> <button onClick={updatetoCaspar1}>Update to Caspar</button>
            <button onClick={resetCamera1}>Reset Camera</button>
        </div>
        <div ref={refkkk} style={{ width: 800, height: 450, }}>
            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    // console.log(camera.position);
                    // console.log(camera.rotation);

                    // console.log(scene);
                    setScene1(scene);
                    setCamera1(camera);
                }}
            >
                <OrbitControls />
                {/* <Stars /> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                {/* <Physics> */}
                {boxes.map((key, i) => {
                    return (
                        <mesh key={key}
                            // position={[Math.floor(Math.random() * 5), 2, 2]}
                            position={[i - 3, 2, 0]}
                        >
                            <boxGeometry attach="geometry" args={[0.8, 1.5, 1.3]} />
                            <meshNormalMaterial attach="material" />
                        </mesh>
                    )
                })}
                <Spheres position={[0, 0, 0]} />
                {/* </Physics> */}

            </Canvas>
            scene file <input id="importjson" type='file' className='input-file' accept='.json' onChange={e => importScenefromfile(e.target.files[0])} />
            <button onClick={updatetoCaspar2}>Update to Caspar</button>
            <button onClick={resetCamera2}>Reset Camera</button>

            <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                setCamera2(camera);
            }}
            >
                <OrbitControls />
                {scene2 && <primitive object={scene2} />}
            </Canvas>
        </div>
    </div >
    )
}


export default Threejs;