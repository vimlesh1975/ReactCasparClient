import { Canvas, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from 'three'

import React, { useEffect } from 'react'
import boldUrl from 'three/examples/fonts/helvetiker_bold.typeface.json'
import { Text3D, Text } from '@react-three/drei'
import fonts from "./fonts";
import { endpoint } from './common'
import { useRef, Suspense, useState } from 'react';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';		// to step 11

import { GLTFExporter } from './GLTFExporter.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const transformMode = ["scale", "rotate", "translate"];

const Threejs = () => {


    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();
    const [raycaster1, setRaycaster1] = useState(new THREE.Raycaster())
    const [gl1, setGl1] = useState()

    const refkkk = useRef();
    const transform = useRef();
    const refexamplebox = useRef();
    const [texture1, settexture1] = useState(window.location.origin + "/ReactCasparClient/hh.png");

    const [orbitcontrolenable, setorbitcontrolenable] = useState(false)
    const [pickableObjects, setPickableObjects] = useState([])


    function Text2() {
        return (
            <>
                <textMesh
                    position-z={-280}
                    fontSize={22}
                    color="#99ccff"
                    maxWidth={300}
                    lineHeight={1}
                    letterSpacing={0}
                    textAlign="justify"
                    materialType="MeshPhongMaterial"
                    text={'text'}
                    font={fonts["Raleway"]}
                    anchorX="center"
                    anchorY="middle"
                >
                    <shaderMaterial
                        attach="material"
                    />
                </textMesh>
            </>
        );
    }

    const ExampleBox = () => {
        return (
            <mesh ref={refexamplebox} >
                <boxGeometry args={[7, 4, 5]} />
                {/* <planeGeometry args={[15, 8, 5]} /> */}
                <meshBasicMaterial transparent={true} map={useLoader(THREE.TextureLoader, texture1)} />
            </mesh>
        )
    }

    const addTroikatext = () => {
        // // Create:
        // const myText = new Troikatext()
        // scene1.add(myText)

        // // Set properties to configure:
        // myText.text = 'Hello world!'
        // myText.fontSize = 2
        // myText.position.z = 0
        // myText.color = 'yellow'
        // // myText.font = boldUrl

        // // Update the rendering:
        // myText.sync()

    }

    const showToCasparcg = () => {
        endpoint(`play 1-97 [html] "http://localhost:10000/ReactCasparClient/threejs2"`);
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
                endpoint(`call 1-97 "
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
        endpoint(`call 1-97 "
        importScenefromData(${JSON.stringify(scene2.toJSON()).replaceAll('"', '\\"')});
        camera1.position.set(${camera2.position.x}, ${camera2.position.y}, ${camera2.position.z});
        "`);
    }

    const resetCameraToCasparc = () => {
        endpoint(`call 1-97 "
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




    function Jumbo() {
        return (
            <Text3D font={boldUrl} position={[-5, -1, 0]} >
                {f0}
                <meshStandardMaterial />
            </Text3D>
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

    const loadfabricjstoCasparcg = (canvas) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        try {
            canvas.getElement().toBlob(blob => {
                var a = new FileReader();
                a.onload = function (e) {
                    settexture1(e.target.result);
                }
                a.readAsDataURL(blob);
            })
        } catch (error) {
            console.log(error)
        }
        // }
    }

    const addSphere = () => {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: 'hotpink', transparent: true });
        const sphere = new THREE.Mesh(geometry, material);
        const dd = scene1.children[2]
        scene1.add(sphere);
        dd.attach(sphere);
        setPickableObjects([...pickableObjects, sphere])
    }

    const addBox = () => {
        const geometry = new THREE.BoxGeometry(9, 0.5, 0.1);
        const material = new THREE.MeshStandardMaterial({ color: 'hotpink', transparent: true });
        const sphere = new THREE.Mesh(geometry, material);
        const dd = scene1.children[2]
        scene1.add(sphere);
        dd.attach(sphere);
        setPickableObjects([...pickableObjects, sphere])
    }

    const addDreiText = () => {
        const aa = `
        <Text3D font={boldUrl} position={[-5, -1, 0]} >
            {f0}
            <meshStandardMaterial />
        </Text3D>`
        // scene1.add(aa)
        console.log(gl1);
        gl1.domElement.innerHTML = aa;
        // gl1.domElement.children.add(aa);
        gl1.render(scene1, camera1);

    }



    // function gg() {
    //     document.addEventListener('mousemove', onDocumentMouseMove, false)
    //     function onDocumentMouseMove(event) {
    //         raycaster1.setFromCamera(
    //             {
    //                 x: (event.clientX / 800) * 2 - 1,
    //                 y: -(event.clientY / 640) * 2 + 1
    //             },
    //             camera1
    //         )
    //         var intersects = raycaster1.intersectObjects(pickableObjects, false)
    //         if (intersects.length > 0) {
    //             console.log(intersects[0].object);
    //             scene1.children[2].attach(intersects[0].object);
    //         }
    //     }
    // }

    function onDocumentMouseMove(event) {
        var intersects = raycaster1.intersectObjects(pickableObjects, false)
        if (intersects.length > 0) {
            scene1.children[2].attach(intersects[0].object);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('mousemove', onDocumentMouseMove, false)
        }, 3000);
    }, [scene1])


    return (<div >
        <div >
            <div style={{ border: '1px solid red' }}>
                Casparc Control
                <button onClick={() => window.open("/ReactCasparClient/threejs")}> Opebn Full Window</button>
                <button onClick={showToCasparcg}>Initialise casparcg</button>
                <button onClick={resetCameraToCasparc}>caspar camera Reset</button>

            </div>

            <button onClick={() => addSphere()}>Add Sphere</button>
            <button onClick={() => addBox()}>Add Box</button>
            <button onClick={() => addDreiText()}>Add Drei text3d</button>
            <button onClick={addTroikatext}>Add addTroikatext</button>

            <input type='text' value={f0} onChange={e => setF0(e.target.value)} />


            {transformMode.map((val, i) =>
                <span key={i}>  <input defaultChecked={(val === 'translate') ? true : false} onClick={e => transform.current.setMode(e.target.value)} type="radio" id={val} value={val} name="transformMode" /><label htmlFor={val}>{val}</label></span>
            )}

            <br /> <button onClick={updatetoCaspar1}>Update to Caspar</button>
            <button onClick={resetCamera1}>Reset Camera</button>
            <button onClick={() => loadfabricjstoCasparcg(window.editor.canvas)}>Load fabricjs to Casparcg</button>

            <button onClick={drawingFileSaveAsgltf}>Scene FileSave As gltf</button>
            <label htmlFor='hhh'> orbitcontrolenable: <input id='hhh' type={'checkbox'} checked={orbitcontrolenable} onChange={() => setorbitcontrolenable(!orbitcontrolenable)} /></label>

        </div>
        <div ref={refkkk} style={{ width: 800, height: 450, backgroundColor: 'grey' }} onClick={() => {
            transform.current && (transform.current.visible = true);
        }}>



            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    setScene1(scene);
                    setCamera1(camera);
                    setRaycaster1(raycaster);
                    setGl1(gl);

                }}
            >
                <OrbitControls enabled={orbitcontrolenable} />
                <TransformControls ref={transform} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Suspense fallback={null}>

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