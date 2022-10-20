import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from 'three'
import React, { useEffect } from 'react'
// import boldUrl from 'three/examples/fonts/helvetiker_bold.typeface.json'
// import { Text3D } from '@react-three/drei'
import { endpoint } from './common'
import { useRef, Suspense, useState } from 'react';
import * as STDLIB from 'three-stdlib'

import { GLTFExporter } from './GLTFExporter.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { JSONTree } from 'react-json-tree';
const transformMode = ["scale", "rotate", "translate"];

var intersects;

const Threejs = () => {


    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();
    const [raycaster1, setRaycaster1] = useState(new THREE.Raycaster())

    // const [gl1, setGl1] = useState()

    const transform = useRef();

    const [orbitcontrolenable, setorbitcontrolenable] = useState(false)
    const [pickableObjects, setPickableObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState();


    const showToCasparcg = () => {
        endpoint(`play 1-97 [html] "http://localhost:10000/ReactCasparClient/threejs2"`);
    }
    const resetCamera1 = () => {
        camera1.position.set(0, 3.061616997868383e-16, 5)
    }

    const resetCamera2 = () => {
        camera2.position.set(0, 3.061616997868383e-16, 5)
    }
    const addLight = () => {
        const light = new THREE.AmbientLight('white', 1);
        scene2.add(light);
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

    function applyTexture(inp) {

        if (selectedObject) {
            var reader = new FileReader();
            reader.onload = e => {
                var loader = new THREE.TextureLoader();
                loader.crossOrigin = "";
                loader.load(e.target.result, texture => {
                    const material = new THREE.MeshBasicMaterial({ map: texture, color: 'grey' });
                    selectedObject.material = material;
                    selectedObject.material.map.needsUpdate = true;
                }, () => { }, error => {
                    console.log(error)
                });
            }
            reader.readAsDataURL(inp);
        }
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
    const [f0, setF0] = useState('Vimlesh Kumar');

    // const [json, setJson] = useState({
    //     array: [1, 2, 3],
    //     bool: true,
    //     object: {
    //         foo: 'bar',
    //     }
    // })

    const regularWork = (sphere) => {
        const dd = scene1.children[2]
        scene1.add(sphere);
        // scene1.children.push(sphere);

        dd.attach(sphere);

        // const updatedScene = scene1;
        const updatedScene = scene1;
        setScene1(updatedScene);


        setPickableObjects([...pickableObjects, sphere]);
        setSelectedObject(sphere)
        // setJson({ ...json, aa: 'bb' })



    }

    const loadfabricjstoCasparcg = () => {
        const geometry = new THREE.BoxGeometry(7, 4, 5);
        // const geometry = new THREE.PlaneGeometry(15, 7.6);
        const material = new THREE.MeshBasicMaterial({ transparent: true, map: new THREE.TextureLoader().load(localStorage.getItem('RCC_currentcanvas')) });
        const sphere = new THREE.Mesh(geometry, material);
        regularWork(sphere);
    }

    const addSphere = () => {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: 'hotpink', transparent: true });
        const sphere = new THREE.Mesh(geometry, material);
        regularWork(sphere);
    }

    const addBox = () => {
        const geometry = new THREE.BoxGeometry(11, 1, 0.3);
        const material = new THREE.MeshStandardMaterial({ color: 'maroon' });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, -3, 0);
        regularWork(sphere);
    }

    const addDreiText = () => {
        var loader = new FontLoader();
        loader.load(window.location.origin + "/ReactCasparClient/helvetiker_regular.typeface.json", function (font) {
            var geometry = new STDLIB.TextGeometry(f0, {
                font: font,
                size: 1.2,
                height: .001,
                curveSegments: 10,
                bevelThickness: 0.1,
                bevelSize: 0.01,
                bevelEnabled: true,
            });

            const material = new THREE.MeshStandardMaterial({ color: 'white' });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(-5, -3.2, 0.25);
            sphere.scale.set(0.8, 0.6, 1);
            regularWork(sphere);

        })
    }


    const addDreiText2 = () => {
        const sphere = STDLIB.createText(f0, 1.5)
        regularWork(sphere);

    }


    const copySelected = () => {
        if (intersects[0]) {
            var aa = intersects[0].object.clone();
            aa.position.set(2, 2, 2); // or any other coordinates
            scene1.add(aa);
            setPickableObjects([...pickableObjects, aa]);
            setSelectedObject(aa);
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
            setSelectedObject(null);
        }
    }
    const deleteAll = () => {
        setPickableObjects([]);
        setSelectedObject(null);
        pickableObjects.forEach((object) => {
            scene1.remove(object);
        })
    }

    const DeselectAll = () => {
        scene1.children[2].detach();
        setSelectedObject(null);
    }
    const applyColor = (e) => {
        if (selectedObject) {
            selectedObject.material.color.set(new THREE.Color(e.target.value))
        }
    }
    const changetext = () => {
        if (selectedObject) {
            var loader = new FontLoader();
            loader.load("helvetiker_regular.typeface.json", function (font) {
                var textGeometry = new STDLIB.TextGeometry(f0, {
                    font: font,
                    size: 1.2,
                    height: .001,
                    curveSegments: 10,
                    bevelThickness: 0.1,
                    bevelSize: 0.01,
                    bevelEnabled: true
                });
                selectedObject.geometry = textGeometry;
            })

        }
    }

    function onDocumentMouseMove(event) {
        intersects = raycaster1.intersectObjects(pickableObjects, false)
        if (intersects.length > 0) {
            setSelectedObject(intersects[0].object);
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

            <button onClick={() => addSphere()}>Sphere</button>
            <button onClick={() => addBox()}>Box</button>
            <button onClick={() => addDreiText()}>3D Text</button>
            <button onClick={() => addDreiText2()}>2D Text</button>
            <button onClick={() => changetext()}>Change text</button>


            <button onClick={() => deleteSelected()}>Delete</button>
            <button onClick={() => deleteAll()}>Delete All</button>
            <button onClick={() => copySelected()}>copy</button>
            <button onClick={() => DeselectAll()}>DeSelect All</button>
            <input type='color' onChange={e => applyColor(e)} />

            <input size={10} type='text' value={f0} onChange={e => setF0(e.target.value)} />

            {transformMode.map((val, i) =>
                <span key={i}>  <input defaultChecked={(val === 'translate') ? true : false} onClick={e => transform.current.setMode(e.target.value)} type="radio" id={val} value={val} name="transformMode" /><label htmlFor={val}>{val}</label></span>
            )}
            Texture<input id="importjson" type='file' className='input-file' accept='.png,jpg,.bmp,.jpeg' onChange={e => applyTexture(e.target.files[0])} />


            <button onClick={updatetoCaspar1}>Update to Caspar</button>
            <button onClick={resetCamera1}>Reset Camera</button>
            <button onClick={() => loadfabricjstoCasparcg()}>Load fabricjs here</button>

            <button onClick={drawingFileSaveAsgltf}>Scene FileSave As gltf</button>
            <label htmlFor='hhh'> orbitcontrolenable: <input id='hhh' type={'checkbox'} checked={orbitcontrolenable} onChange={() => setorbitcontrolenable(!orbitcontrolenable)} /></label>
            <button onClick={() => console.log(scene1.children)}>console log</button>
            {/* <JSONTree data={scene1.children} />; */}

        </div>
        <div style={{ width: 880, height: 450, backgroundColor: 'grey' }} >
            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    setScene1(scene);
                    setCamera1(camera);
                    setRaycaster1(raycaster);
                    // setGl1(gl);
                    console.log('added')
                }}
            >
                <OrbitControls enabled={orbitcontrolenable} />
                <TransformControls ref={transform} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Suspense fallback={null}>
                    {/* <group visible={true}>
                        <primitive object={new THREE.GridHelper(10, 13, 'red', 'darkgrey')} />
                    </group>
                    <group visible={true}>
                        <primitive object={new THREE.AxesHelper(3)} />
                    </group> */}
                </Suspense>
            </Canvas>
        </div>

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
        <button onClick={addLight}>Add light</button>
        <button onClick={() => console.log(scene2)}>console log</button>
        <div style={{ width: 880, height: 300, backgroundColor: 'grey' }} >


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