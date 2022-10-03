import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls, Html } from "@react-three/drei";
import Text from './Text'
import SpriteText from 'three-spritetext';
// import loadFont from 'load-bmfont';
// import createGeometry from 'three-bmfont-text';
// import { Physics } from "@react-three/cannon";
// import { useSelector } from 'react-redux'
import { endpoint } from './common'
import { useRef, Suspense, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three'
// import { Controls, useControl } from "react-three-gui"

// import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { helvetiker } from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { v4 as uuidv4 } from 'uuid';
// import { Vector3 } from 'three';

const transformMode = ["scale", "rotate", "translate"];

const Threejs = () => {
    const [boxes, setBoxes] = useState([]);
    const [spheres, setSpheres] = useState([]);
    const [texts, setTexts] = useState([]);
    const [txtvalue, setTxtvalue] = useState('Hello ThreeJs');



    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();

    const refkkk = useRef();
    const transform = useRef();
    const orbit = useRef();

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
        transform.current.visible = false;
        const exporter = new GLTFExporter();

        // Parse the input and generate the glTF output
        exporter.parse(
            scene1,
            // called when the gltf has been generated
            function (gltf) {
                // downloadJSON(gltf);
                // importScenefromfilegltf
                // importScenefromData(${JSON.stringify(gltf).replaceAll('"', '\\"')})
                endpoint(`call 1-5 "
                importScenefromfilegltf(${JSON.stringify(gltf).replaceAll('"', '\\"')})
                "`);
                endpoint(`call 1-5 "
                camera1.position.set(${camera1.position.x}, ${camera1.position.y}, ${camera1.position.z})
                "`);

            },
            // called when there is an error in the generation
            function (error) {

                console.log('An error happened');
            },
            {}
        );


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
        endpoint(`call 1-5 "
        camera1.position.set(0, 3.061616997868383e-16, 5)
        "`);
    }

    // const addtextfromfont = () => {
    //     const loader = new FontLoader();
    //     loader.load('http://localhost:10000/reactCasparClient/fonts/helvetiker_regular.typeface.json', function (font) {

    //         const textGeometry = new TextGeometry('Hello VIMLESH ', {
    //             font: font,
    //             size: 80,
    //             height: 5,
    //             curveSegments: 12,
    //             bevelEnabled: true,
    //             bevelThickness: 10,
    //             bevelSize: 8,
    //             bevelOffset: 0,
    //             bevelSegments: 5
    //         });
    //         // create a cube and add to scene
    //         var cubeMaterial = new THREE.MeshNormalMaterial();
    //         // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //         var cube = new THREE.Mesh(textGeometry, cubeMaterial);
    //         cube.position.set(-50, -20, -120)

    //         scene1.add(cube);
    //     });

    // }

    // const addcss3drendrer = () => {

    //     const myText = new SpriteText('My text');
    //     myText.position.set(-50, -20, -120)
    //     scene1.add(myText);

    //     const map = new THREE.TextureLoader().load('http://localhost:10000/ReactCasparClient/img/pine-wood-500x500.jpg');
    //     const material = new THREE.SpriteMaterial({ map: map });

    //     const sprite = new THREE.Sprite(material);
    //     scene1.add(sprite);

    // }



    // function importScenefromfile(inp) {
    //     var reader = new FileReader();
    //     reader.onload = e => {
    //         var loader = new THREE.ObjectLoader();
    //         loader.load(e.target.result,
    //             json => {
    //                 setScene2(json);
    //             }
    //         );
    //     }
    //     reader.readAsDataURL(inp);
    // }

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

    function importScenefromdatagltf(inp) {
        const loader = new GLTFLoader();
        loader.parse(inp, function (gltf) {
            setScene1(gltf.scene);
        });
    }

    function Spheres() {
        const ref = useRef()
        // const handleClick = 
        return (
            <>

                <mesh ref={ref} >
                    {spheres.map((key, i) => (
                        <TransformControls ref={transform} key={key} >
                            <Spawned key={key} position={[i, 0, 0]}
                            />
                        </TransformControls>
                    ))}
                </mesh>

            </>
        )
    }

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

    // useEffect(() => {

    //     const controls = transform.current;
    //     //   controls.setMode(mode)
    //     const callback = event => (orbit.current.enabled = !event.value)
    //     controls.addEventListener("dragging-changed", callback)
    //     return () => controls.removeEventListener("dragging-changed", callback)

    // }, [scene1])

    // useEffect(() => {
    //     // orbit.current.enabled = false;
    //     return () => {
    //         // second
    //     }
    // }, [])


    useEffect(() => {
        if (boxes.length === 1) { orbit.current.enabled = false }
        if (transform.current) {
            const controls = transform.current;
            //   controls.setMode(mode)
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

    function Jumbo() {
        const ref = useRef()
        useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
        return (
            <group ref={ref}>
                <Text hAlign="right" position={[-5, -1, 0]} children="THREEJS" />
            </group>
        )
    }

    async function drawingFileSaveAsjson() {
        const element = document.createElement("a");
        var aa = JSON.stringify(scene1.toJSON());
        // canvasList.forEach(val => {
        //     aa += JSON.stringify({ pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename }) + '\r\n'
        // });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });


        const options = {
            suggestedName: ss,
            types: [{
                description: 'json file',
                accept: { 'application/json': ['.json'] },
            }],
        };
        const aa1 = await window.showSaveFilePicker(options);
        const writable = await aa1.createWritable();
        await writable.write(file);
        await writable.close();

    }
    async function drawingFileSaveAsgltf() {

        const exporter = new GLTFExporter();

        // Parse the input and generate the glTF output
        exporter.parse(
            scene1,
            // called when the gltf has been generated
            function (gltf) {
                downloadJSON(gltf);
            },
            // called when there is an error in the generation
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



    return (<div >
        <div >
            <div style={{ border: '1px solid red' }}>
                Casparc Control
                <button onClick={() => window.open("/ReactCasparClient/threejs")}> Opebn Full Window</button>
                <button onClick={showToCasparcg}>Initialise casparcg</button>
                <button onClick={resetCameraToCasparc}>caaspar camera Reset</button>
                <button onClick={() => {

                    endpoint(`call 1-5 "
                    addtextfromfont('${txtvalue}');
                      "`);

                }}>Add 3d text to caspar</button>

                <input type={'text'} value={txtvalue} onChange={e => setTxtvalue(e.target.value)} />
            </div>

            <button onClick={useCallback(e => setSpheres(items => [...items, uuidv4()]), [])}>Add Sphere</button>
            <button onClick={useCallback(e => setBoxes(items => [...items, uuidv4()]), [])}>Add Box</button>
            <button onClick={useCallback(e => setTexts(items => [...items, uuidv4()]), [])}>Add Drei text3d</button>
            {/* <button onClick={addtextfromfont}>Add Text from font</button> */}
            {/* <button onClick={addcss3drendrer}>Add css3drendrer</button> */}

            {transformMode.map((val, i) =>
                <span key={i}>  <input defaultChecked={(val === 'translate') ? true : false} onClick={e => transform.current.setMode(e.target.value)} type="radio" id={val} value={val} name="transformMode" /><label htmlFor={val}>{val}</label></span>
            )}

            {/* <button onClick={showSvgtoCasparcg}> Show SVG to casparcg</button> */}
            <br /> <button onClick={updatetoCaspar1}>Update to Caspar</button>
            <button onClick={resetCamera1}>Reset Camera</button>
            {/* <button onClick={drawingFileSaveAsjson}>Scene FileSave As json</button> */}
            <button onClick={drawingFileSaveAsgltf}>Scene FileSave As gltf</button>

        </div>
        <div ref={refkkk} style={{ width: 800, height: 450, backgroundColor: 'grey' }} onClick={() => {
            transform.current && (transform.current.visible = true);
            console.log('clocked')
            // orbit.current && (orbit.current.enabled = true);
        }}>

            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    // console.log(camera.position);
                    // console.log(camera.rotation);

                    // console.log(scene);
                    setScene1(scene);
                    setCamera1(camera);
                }}
            >
                {/* <Html>
                    <div style={{ fontSize: 50 }} >HTMLText</div>
                </Html> */}
                <OrbitControls ref={orbit} />
                {/* <Stars /> */}
                {/* <ambientLight intensity={0.5} /> */}
                <spotLight position={[10, 15, 10]} angle={10.5} />
                {/* <Physics> */}
                <Suspense fallback={null}>
                    {boxes.map((key, i) => {
                        return (
                            <TransformControls ref={transform} key={key} >
                                <mesh
                                    // position={[Math.floor(Math.random() * 5), 2, 2]}
                                    position={[0, -3, 0]}
                                >
                                    <boxGeometry attach="geometry" args={[9, 0.5, 0.1]} />
                                    <meshStandardMaterial attach="material" />

                                </mesh>
                            </TransformControls>
                        )
                    })}
                    {texts.map((key, i) =>
                        <Jumbo key={i} />
                    )}

                    <Spheres position={[0, 0, 0]} />
                    {/* <Effects /> */}


                </Suspense>

                {/* </Physics> */}
            </Canvas>
            {/* scene file <input id="importjson" type='file' className='input-file' accept='.json' onChange={e => importScenefromfile(e.target.files[0])} /> */}
            gltf file <input id="importjson" type='file' className='input-file' accept='.gltf' onChange={e => importScenefromfilegltf(e.target.files[0])} />
            <button onClick={() => {

                const exporter = new GLTFExporter();

                // Parse the input and generate the glTF output
                exporter.parse(
                    scene1,
                    // called when the gltf has been generated
                    function (gltf) {
                        // downloadJSON(gltf);


                        const inp = JSON.stringify(gltf);
                        // const inp = gltf;
                        const loader = new GLTFLoader();
                        loader.parseAsync(inp, function (gltf) {
                            setScene2(gltf.scene);
                        });

                    },
                    // called when there is an error in the generation
                    function (error) {

                        console.log('An error happened');
                    },
                    {}
                );

            }

            }>  load above as gltf</button>

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