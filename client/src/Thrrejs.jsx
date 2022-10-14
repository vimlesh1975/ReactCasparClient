import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from 'three'
import React, { useEffect } from 'react'
import boldUrl from 'three/examples/fonts/helvetiker_bold.typeface.json'
import { Text3D } from '@react-three/drei'
import { endpoint } from './common'
import { useRef, Suspense, useState } from 'react';


import { GLTFExporter } from './GLTFExporter.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const transformMode = ["scale", "rotate", "translate"];

var intersects;

const Threejs = () => {


    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();
    const [raycaster1, setRaycaster1] = useState(new THREE.Raycaster())

    // const [gl1, setGl1] = useState()

    const refkkk = useRef();
    const transform = useRef();

    const [orbitcontrolenable, setorbitcontrolenable] = useState(false)
    const [pickableObjects, setPickableObjects] = useState([])

    // const ExampleBox = () => {
    //     return (
    //         <mesh ref={refexamplebox} >
    //             <boxGeometry args={[7, 4, 5]} />
    //             {/* <planeGeometry args={[15, 8, 5]} /> */}
    //             <meshBasicMaterial transparent={true} map={useLoader(THREE.TextureLoader, texture1)} />
    //         </mesh>
    //     )
    // }

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
        DeselectAll();
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
    const [f0, setF0] = useState('Vimlesh Kumar')

    const loadfabricjstoCasparcg = (canvas) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        try {
            canvas.getElement().toBlob(blob => {
                var a = new FileReader();
                a.onload = function (e) {
                    const geometry = new THREE.BoxGeometry(7, 4, 5);
                    const material = new THREE.MeshBasicMaterial({ transparent: true, map: new THREE.TextureLoader().load(e.target.result) });
                    const sphere = new THREE.Mesh(geometry, material);
                    const dd = scene1.children[2]
                    scene1.add(sphere);
                    dd.attach(sphere);
                    setPickableObjects([...pickableObjects, sphere])
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
        const geometry = new THREE.BoxGeometry(11, 1, 0.3);
        const material = new THREE.MeshStandardMaterial({ color: 'maroon', transparent: true });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, -3, 0);
        const dd = scene1.children[2]
        scene1.add(sphere);
        dd.attach(sphere);
        setPickableObjects([...pickableObjects, sphere])
    }

    const addDreiText = () => {
        const geometry = scene1.children[3].children[0].geometry;
        const material = new THREE.MeshStandardMaterial({ color: 'white' });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(-5, -3.2, 0.2);
        sphere.scale.set(0.8, 0.6, 1);

        const dd = scene1.children[2]
        scene1.add(sphere);
        dd.attach(sphere);
        setPickableObjects([...pickableObjects, sphere])
    }

    const copySelected = () => {
        if (intersects[0]) {
            var aa = intersects[0].object.clone();
            aa.position.set(2, 2, 2); // or any other coordinates
            scene1.add(aa);
            setPickableObjects([...pickableObjects, aa]);
        }
    }

    const deleteSelected = () => {
        if (intersects[0]) {
            scene1.children[2].detach()
            scene1.remove(intersects[0].object);
            const updatedpickableObjects = [...pickableObjects]
            updatedpickableObjects.filter((val) => {
                return (val !== intersects[0].object)
            })
            setPickableObjects(updatedpickableObjects);
        }
    }
    const deleteAll = () => {
        setPickableObjects([]);
        pickableObjects.forEach((object) => {
            scene1.remove(object);
        })
    }

    const DeselectAll = () => {
        scene1.children[2].detach()
    }


    function onDocumentMouseMove(event) {
        intersects = raycaster1.intersectObjects(pickableObjects, false)
        if (intersects.length > 0) {
            scene1.children[2].attach(intersects[0].object);
        }
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentMouseMove, false);
        return () => {
            document.removeEventListener('click', onDocumentMouseMove);
        }
        // eslint-disable-next-line
    }, [pickableObjects])







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
            <button onClick={() => addDreiText()}>Add Text</button>
            <button onClick={() => deleteSelected()}>Delete</button>
            <button onClick={() => deleteAll()}>Delete All</button>
            <button onClick={() => copySelected()}>copy</button>
            <button onClick={() => DeselectAll()}>DeSelect All</button>

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
                    // setGl1(gl);
                }}
            >
                <OrbitControls enabled={orbitcontrolenable} />
                <TransformControls ref={transform} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Suspense fallback={null}>
                    <group visible={false}>
                        <Text3D font={boldUrl} position={[-5, -1, 0]} name='hh' >
                            {f0}
                            <meshStandardMaterial />
                        </Text3D>
                    </group>

                    {/* < ExampleBox /> */}
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