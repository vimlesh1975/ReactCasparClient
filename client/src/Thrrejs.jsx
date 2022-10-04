import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls } from "@react-three/drei";
// import Text from './Text'
// import * as THREE from 'three'
import { Text as Troikatext } from 'troika-three-text'
import React, { useMemo } from 'react'
import boldUrl from 'three/examples/fonts/helvetiker_bold.typeface.json'
import { Text3D } from '@react-three/drei'

import { endpoint } from './common'
import { useRef, Suspense, useEffect, useCallback, useState } from 'react';
// import * as THREE from 'three'

// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFExporter } from './GLTFExporter.js';
// import GLTFExporter from 'three-gltf-exporter';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { v4 as uuidv4 } from 'uuid';

const transformMode = ["scale", "rotate", "translate"];

const Threejs = () => {
    const [boxes, setBoxes] = useState([]);
    const [spheres, setSpheres] = useState([]);
    const [texts, setTexts] = useState([]);

    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();

    const refkkk = useRef();
    const transform = useRef();
    const orbit = useRef();

    const addTroikatext = () => {
        // Create:
        const myText = new Troikatext()
        scene1.add(myText)

        // Set properties to configure:
        myText.text = 'Hello world!'
        myText.fontSize = 2
        myText.position.z = 0
        myText.color = 0x9966FF

        // Update the rendering:
        myText.sync()
    }

    const showToCasparcg = () => {
        endpoint(`play 1-5 [html] "http://localhost:10000/ReactCasparClient/threejs2"`);
    }
    const resetCamera1 = () => {
        camera1.position.set(0, 3.061616997868383e-16, 5)
    }

    const resetCamera2 = () => {
        camera2.position.set(0, 3.061616997868383e-16, 5)
    }

    const updatetoCaspar1 = () => {
        var exporter = new GLTFExporter();
        exporter.parse(scene1, gltf => {
            const inp = JSON.stringify(gltf);
            const loader = new GLTFLoader();
            loader.parse(inp, "", gltf2 => {
                endpoint(`call 1-5 "
                importScenefromData(${JSON.stringify(gltf2.scene.toJSON()).replaceAll('"', '\\"')});
                camera1.position.set(${camera1.position.x}, ${camera1.position.y}, ${camera1.position.z});
                "`);
            });
        },
            error => {
                console.log('An error happened');
            },
            {}
        )
    }
    const updatetoCaspar2 = () => {
        endpoint(`call 1-5 "
        importScenefromData(${JSON.stringify(scene2.toJSON()).replaceAll('"', '\\"')});
        camera1.position.set(${camera2.position.x}, ${camera2.position.y}, ${camera2.position.z});
        "`);
    }

    const resetCameraToCasparc = () => {
        endpoint(`call 1-5 "
        camera1.position.set(0, 3.061616997868383e-16, 5)
        "`);
    }

    function importScenefromfilegltf(inp) {
        var reader = new FileReader();
        reader.onload = e => {
            const loader = new GLTFLoader();
            loader.load(e.target.result, function (gltf) {
                setScene2(gltf.scene);
            });
        }
        reader.readAsDataURL(inp);
    }

    // function importScenefromdatagltf(inp) {
    //     const loader = new GLTFLoader();
    //     loader.parse(inp, function (gltf) {
    //         setScene1(gltf.scene);
    //     });
    // }

    function Spheres() {
        const ref = useRef()
        return (
            <>
                <mesh ref={ref} >
                    {spheres.map((key, i) => (
                        <TransformControls ref={transform} key={key} >
                            {/* <Spawned key={key} position={[i, 0, 0]}
                            /> */}
                            <mesh key={key} position={[i, 0, 0]}>
                                <sphereGeometry attach="geometry" args={[0.5, 16, 16]} />
                                <meshStandardMaterial attach="material" color="hotpink" transparent />
                            </mesh>
                        </TransformControls>
                    ))}
                </mesh>
            </>
        )
    }


    useEffect(() => {
        if (boxes.length === 1) { orbit.current.enabled = false }
        if (transform.current) {
            const controls = transform.current;
            const callback = event => {
                (orbit.current.enabled = !event.value);
                console.log(event.value)
            }
            controls.addEventListener("dragging-changed", callback)

            return () => {
                controls.removeEventListener("dragging-changed", callback)
            }
        }
    })

    function Text({ children, vAlign = 'center', hAlign = 'center', size = 0.1, color = '#ff0000', ...props }) {
        const config = useMemo(
            () => ({ size: 1, height: 0.001, curveSegments: 1, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelOffset: 0, bevelSegments: 2 }),
            []
        )
        const mesh = useRef()
        // useLayoutEffect(() => {
        //     const size = new THREE.Vector3()
        //     mesh.current.geometry.computeBoundingBox()
        //     mesh.current.geometry.boundingBox.getSize(size)
        //     mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
        //     mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
        // }, [children])
        return (
            <group {...props} scale={[1, 1, 1]}>
                <Text3D ref={mesh} font={boldUrl} {...config}>
                    {children}
                    <meshStandardMaterial />
                </Text3D>
            </group>
        )
    }


    function Jumbo() {
        const ref = useRef()
        useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
        return (
            <group ref={ref}>
                <Text hAlign="right" position={[-5, -1, 0]} children={f0} />
            </group>
        )
    }

    // async function drawingFileSaveAsjson() {
    //     const element = document.createElement("a");
    //     var aa = JSON.stringify(scene1.toJSON());
    //     const file = new Blob([aa], { type: 'text/plain' });
    //     element.href = URL.createObjectURL(file);
    //     var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    //     const options = {
    //         suggestedName: ss,
    //         types: [{
    //             description: 'json file',
    //             accept: { 'application/json': ['.json'] },
    //         }],
    //     };
    //     const aa1 = await window.showSaveFilePicker(options);
    //     const writable = await aa1.createWritable();
    //     await writable.write(file);
    //     await writable.close();

    // }
    async function drawingFileSaveAsgltf() {
        const exporter = new GLTFExporter();
        exporter.parse(
            scene1,
            gltf => {
                downloadJSON(gltf);
            },
            function (error) {
                console.log('An error happened');
            },
            {}
        );
    }

    async function downloadJSON(gltf) {
        const element = document.createElement("a");
        var aa = JSON.stringify(gltf);
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        const options = {
            suggestedName: ss,
            types: [{
                description: 'gltf file',
                accept: { 'application/json': ['.gltf'] },
            }],
        };
        const aa1 = await window.showSaveFilePicker(options);
        const writable = await aa1.createWritable();
        await writable.write(file);
        await writable.close();
    }
    const [f0, setF0] = useState('vimlesh')
    return (<div >
        <div >
            <div style={{ border: '1px solid red' }}>
                Casparc Control
                <button onClick={() => window.open("/ReactCasparClient/threejs")}> Opebn Full Window</button>
                <button onClick={showToCasparcg}>Initialise casparcg</button>
                <button onClick={resetCameraToCasparc}>caspar camera Reset</button>

            </div>

            <button onClick={useCallback(e => setSpheres(items => [...items, uuidv4()]), [])}>Add Sphere</button>
            <button onClick={useCallback(e => setBoxes(items => [...items, uuidv4()]), [])}>Add Box</button>
            <button onClick={useCallback(e => setTexts(items => [...items, uuidv4()]), [])}>Add Drei text3d</button>
            <button onClick={addTroikatext}>Add addTroikatext</button>

            <input type='text' value={f0} onChange={e => setF0(e.target.value)} />


            {transformMode.map((val, i) =>
                <span key={i}>  <input defaultChecked={(val === 'translate') ? true : false} onClick={e => transform.current.setMode(e.target.value)} type="radio" id={val} value={val} name="transformMode" /><label htmlFor={val}>{val}</label></span>
            )}

            <br /> <button onClick={updatetoCaspar1}>Update to Caspar</button>
            <button onClick={resetCamera1}>Reset Camera</button>
            <button onClick={drawingFileSaveAsgltf}>Scene FileSave As gltf</button>

        </div>
        <div ref={refkkk} style={{ width: 800, height: 450, backgroundColor: 'grey' }} onClick={() => {
            transform.current && (transform.current.visible = true);
            console.log('clocked')
        }}>

            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    setScene1(scene);
                    setCamera1(camera);
                }}
            >
                <OrbitControls ref={orbit} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Suspense fallback={null}>
                    {boxes.map((key, i) => {
                        return (
                            <TransformControls ref={transform} key={key} >
                                <mesh
                                    position={[0, -3, 0]}
                                >
                                    <boxGeometry attach="geometry" args={[9, 0.5, 0.1]} />
                                    <meshStandardMaterial attach="material" />

                                </mesh>
                                {/* <Html><h1>Vimlesh</h1></Html> */}

                            </TransformControls>
                        )
                    })}
                    {texts.map((key, i) =>
                        <Jumbo key={i} />
                    )}
                    <Spheres position={[0, 0, 0]} />
                </Suspense>

            </Canvas>
            gltf file <input id="importjson" type='file' className='input-file' accept='.gltf' onChange={e => importScenefromfilegltf(e.target.files[0])} />
            <button onClick={async () => {
                const exporter = new GLTFExporter();
                exporter.parse(scene1, gltf => {
                    const inp = JSON.stringify(gltf);
                    const loader = new GLTFLoader();
                    loader.parse(inp, "", gltf2 => {
                        setScene2(gltf2.scene);
                    });
                },
                    error => {
                        console.log('An error happened');
                    },
                    {}
                );
            }
            }>load above as gltf</button>
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