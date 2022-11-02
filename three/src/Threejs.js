import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from 'three';
import { NumberKeyframeTrack, AnimationClip, AnimationMixer } from "three";
import axios from 'axios';
import socketIOClient from "socket.io-client";

import { DragControls } from 'three/examples/jsm/controls/DragControls'

import React, { useEffect } from 'react'

import { endpoint } from './common'
import { useRef, Suspense, useState } from 'react';
import * as STDLIB from 'three-stdlib'

import { GLTFExporter } from './GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import { getProject } from '@theatre/core'

import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'

studio.extend(extension);


const demoSheet = getProject('Demo Project').sheet('Demo Sheet')
const transformMode = ["scale", "rotate", "translate"];

var intersects;

const Threejs = () => {

    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();
    const [camera2, setCamera2] = useState();
    const [raycaster1, setRaycaster1] = useState(new THREE.Raycaster())

    const transform = useRef();

    const [orbitcontrolenable, setorbitcontrolenable] = useState(false)
    const [pickableObjects, setPickableObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState();
    const [shapesOnCanvas, setShapesOnCanvas] = useState([])
    var pickableObjects2;

    const sampleAnimationcaspar = () => {
        pickableObjects.forEach((mesh, i) => {
            const _objectid = mesh.userData.__storeKey.split('Demo Sheet:default:')[1];
            if (studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid]) {
                const trackData = Object.values(studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid].trackData)

                trackData.forEach(element => {
                    var positionKF2 = [];
                    const animationName = "." + element.__debugName.split(':')[1].split(',')[0].split('"')[1] + "[" + element.__debugName.split(':')[1].split(',')[1].split('"')[1] + "]"
                    const aa = element.keyframes
                    const bb = []
                    aa.forEach((val) => {
                        bb.push(val.position)
                    })
                    const cc = []
                    aa.forEach((val) => {
                        cc.push(val.value)
                    })
                    positionKF2.push(new NumberKeyframeTrack(animationName, bb, cc))
                    endpoint(`call 1-97 "
                    sampleAnimation(${(JSON.stringify(positionKF2[0])).replaceAll('"', '\\"')}, ${i});
                    "`);
                });

            }

        });

    }

    const sampleAnimation = () => {
        pickableObjects.forEach(mesh => {
            const _objectid = mesh.userData.__storeKey.split('Demo Sheet:default:')[1];
            if (studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid]) {
                const trackData = Object.values(studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid].trackData)
                var positionKF2 = [];
                trackData.forEach(element => {
                    const animationName = "." + element.__debugName.split(':')[1].split(',')[0].split('"')[1] + "[" + element.__debugName.split(':')[1].split(',')[1].split('"')[1] + "]"
                    const aa = element.keyframes
                    const bb = []
                    aa.forEach((val) => {
                        bb.push(val.position)
                    })
                    const cc = []
                    aa.forEach((val) => {
                        cc.push(val.value)
                    })
                    positionKF2.push(new NumberKeyframeTrack(animationName, bb, cc))
                });
                const moveBlinkClip = new AnimationClip("move-n-blink", -1, [...positionKF2]);
                const mixer = new AnimationMixer(mesh);
                var action = mixer.clipAction(moveBlinkClip);
                action.setLoop(THREE.LoopPingPong, 2);
                action.play();
                const clock = new THREE.Clock();
                const aa1 = () => {
                    mixer.update(clock.getDelta());
                    requestAnimationFrame(aa1);
                }
                aa1();
            }
        });
    }
    const sampleAnimation2 = () => {
        pickableObjects2 = [...scene2.children]
        pickableObjects2.splice(0, 4)
        pickableObjects2.forEach(mesh => {
            const _objectid = mesh.userData.__storeKey.split('Demo Sheet:default:')[1];
            if (studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid]) {
                const trackData = Object.values(studio.createContentOfSaveFile('Demo Project').sheetsById["Demo Sheet"].sequence.tracksByObject[_objectid].trackData)
                var positionKF2 = [];
                trackData.forEach(element => {
                    const animationName = "." + element.__debugName.split(':')[1].split(',')[0].split('"')[1] + "[" + element.__debugName.split(':')[1].split(',')[1].split('"')[1] + "]"
                    const aa = element.keyframes
                    const bb = []
                    aa.forEach((val) => {
                        bb.push(val.position)
                    })
                    const cc = []
                    aa.forEach((val) => {
                        cc.push(val.value)
                    })
                    positionKF2.push(new NumberKeyframeTrack(animationName, bb, cc))
                });
                const moveBlinkClip = new AnimationClip("move-n-blink", -1, [...positionKF2]);
                const mixer = new AnimationMixer(mesh);
                var action = mixer.clipAction(moveBlinkClip);
                action.setLoop(THREE.LoopPingPong, 2);
                action.play();
                const clock = new THREE.Clock();
                const aa1 = () => {
                    mixer.update(clock.getDelta());
                    requestAnimationFrame(aa1);
                }
                aa1();
            }
        });
    }

    const Shape = (props) => {

        const mesh = useRef();
        const allShapes = {
            box: new THREE.BoxGeometry(6, 1, 0.3),
            cylinder: new THREE.CylinderGeometry(1, 1, 1, 32),
            donut: new THREE.TorusGeometry(0.5, 0.2, 3, 20),
            sphere: new THREE.SphereGeometry(0.5, 16, 16),
        }
        const allColors = {
            box: "red",
            cylinder: "pink",
            donut: "blue",
            sphere: "green",
        }
        return (
            <e.mesh
                {...props}
                ref={mesh}
                scale={[1.5, 1.5, 1.5]}
                onPointerOver={e => {
                    e.object.material.emissive.r = 1;
                }}
                onPointerOut={e => {
                    e.object.material.emissive.r = 0;
                }}
            >
                <primitive object={allShapes[props.shape]} attach={"geometry"} />
                <meshStandardMaterial color={allColors[props.shape]} roughness={0.3} metalness={0.8} />
            </e.mesh>
        );
    }

    const Shapetext3D = (props) => {
        const mesh = useRef();
        return (
            <e.mesh {...props} ref={mesh}
                onPointerOver={e => {
                    e.object.material.emissive.r = 1;
                }}
                onPointerOut={e => {
                    e.object.material.emissive.r = 0;
                }} >
                <primitive object={props.geometry} attach={"geometry"} />
                <meshStandardMaterial color={props.color} />
            </e.mesh>
        );
    }

    const Shapetext2D = (props) => {
        const mesh = useRef();
        return (
            <e.mesh {...props} ref={mesh} onPointerOver={e => {
                e.object.material.emissive && (e.object.material.emissive.r = 1);
            }}
                onPointerOut={e => {
                    e.object.material.emissive && (e.object.material.emissive.r = 0);
                }}>
                <primitive object={props.geometry} attach={"geometry"} />
                <primitive object={props.material} attach={"material"} />
            </e.mesh>
        );
    }

    const Shapefabricjs = (props) => {
        const mesh = useRef();
        return (
            <e.mesh {...props} ref={mesh} onPointerOver={e => {
                e.object.material.emissive && (e.object.material.emissive.r = 1)
            }}
                onPointerOut={e => {
                    e.object.material.emissive && (e.object.material.emissive.r = 0)
                }}>
                <primitive object={props.geometry} attach={"geometry"} />
                <primitive object={props.material} attach={"material"} />
            </e.mesh>
        );
    }


    useEffect(() => {
        const socket = socketIOClient(':9000');
        socket.on("setCurrentCanvas", data => {
            // setCurrentCanvas(data.data1);
            const geometry = new THREE.BoxGeometry(7, 4, 5);
            const material = new THREE.MeshBasicMaterial({
                roughness: 0.3, metalness: 0.8,
                transparent: true,
                map: new THREE.TextureLoader().load(data.data1, (texture) => {
                    // console.log(texture)
                    const shapeCount = shapesOnCanvas.length
                    const shape = "fabricjs"
                    setShapesOnCanvas(
                        [
                            ...shapesOnCanvas,
                            <Shapefabricjs
                                shape={shape}
                                key={shapeCount}
                                geometry={geometry}
                                material={material}
                                theatreKey={shape + shapeCount}
                            />
                        ]
                    )
                })
            });
        }
        )
        socket.on('error', function () {
            socket?.removeListener('setCurrentCanvas');
            socket?.off('setCurrentCanvas');
            socket?.disconnect();
        })


        return () => {
            socket?.removeListener('setCurrentCanvas');
            socket?.off('setCurrentCanvas');
            socket?.disconnect();
        }
    }, [shapesOnCanvas])

    const addShape = (e) => {
        const shapeCount = shapesOnCanvas.length
        const shape = e.target.getAttribute("data-shape")
        setShapesOnCanvas(
            [
                ...shapesOnCanvas,
                <Shape
                    shape={shape}
                    key={shapeCount}
                    theatreKey={shape + shapeCount}
                    position={[-4 + (Math.random()) * 10, 0, 0]}
                />
            ]
        )
    }
    const [imported1, setImported1] = useState([])

    const addImportedShape = (shape, mesh1, i) => {
        const shapeCount = shapesOnCanvas.length
        imported1.push(
            <ShapeImported
                shape={shape}
                key={shapeCount}
                theatreKey={shape + shapeCount + i}
                position={mesh1.position}
                rotation={mesh1.rotation}
                scale={mesh1.scale}
                geometry={mesh1.geometry}
                material={mesh1.material.clone()}
            />
        )
    }

    const ShapeImported = (props) => {
        const mesh = useRef();
        return (<>
            <e.mesh {...props} ref={mesh} onPointerOver={e => {
                e.object.material.emissive && (e.object.material.emissive.r = 1)
            }}
                onPointerOut={e => {
                    e.object.material.emissive && (e.object.material.emissive.r = 0)
                }}>
                <primitive object={props.geometry} attach={"geometry"} />
                <primitive object={props.material} attach={"material"} />
            </e.mesh>
        </>)
    }

    const [gl1, setGl1] = useState()

    useEffect(() => {
        studio.initialize();
        return () => {
            // studio.hide();
        }
    }, [])


    useEffect(() => {
        var dragControls;
        var transformCurrent = transform.current;
        if (pickableObjects.length > 0) {
            dragControls = new DragControls(pickableObjects, camera1, gl1?.domElement);
            dragControls.addEventListener('dragstart', function (event) {
                setorbitcontrolenable(false);
            });
            dragControls.addEventListener('dragend', function (event) {
                setorbitcontrolenable(true);
            });
            transformCurrent.addEventListener('dragging-changed', function (event) {
                setorbitcontrolenable(!event.value);
            })
        }
        return () => {
            if (pickableObjects.length > 0) {
                dragControls.removeEventListener('dragstart', false);
                dragControls.removeEventListener('dragend', false);
                transformCurrent.removeEventListener('dragging-changed', false);
            }
        }
        // eslint-disable-next-line 
    }, [pickableObjects])


    useEffect(() => {
        setTimeout(() => {
            scene1?.children && scene1?.children[3].detach();
            if (scene1?.children?.length > 4) {
                const aa = [...scene1.children];
                aa.splice(0, 4)
                setPickableObjects(aa);
                scene1.children[3].attach(scene1.children[scene1.children.length - 1])
                setSelectedObject(scene1.children[scene1.children.length - 1])

            }
        }, 100);

        return () => {
            // second
        }
        // eslint-disable-next-line 
    }, [shapesOnCanvas])


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

    function importScenefromfilegltftoscene1(inp) {
        var reader = new FileReader();
        reader.onload = e => {
            const loader = new GLTFLoader();
            loader.load(e.target.result, (gltf) => {
                (gltf.scene.children).forEach((element, i) => {
                    console.log(element);
                    if (element.type === 'Mesh') {
                        addImportedShape("imported", element, i)
                    }
                })
                setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
                setImported1([]);
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
                    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
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

    const playAnimation = () => {
        demoSheet.sequence.play({ rate: 1, range: [0, 2], iterationCount: Infinity })
    }
    const pauseAnimation = () => {
        demoSheet.sequence.pause()
    }
    window.demoSheet = demoSheet;
    window.studio = studio;

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



    const loadfabricjstoCasparcg = () => {
        if (window.location.origin !== 'https://vimlesh1975.github.io') {
            axios.post('http://localhost:9000/getCurrentCanvas').then((aa) => {
            }).catch((aa) => { console.log('Error', aa) });
        }
    }

    const addDreiText = () => {
        var loader = new FontLoader();
        loader.load(window.location.origin + "/three/helvetiker_regular.typeface.json", function (font) {
            var geometry = new STDLIB.TextGeometry(f0, {
                font: font,
                size: 1.2,
                height: .001,
                curveSegments: 10,
                bevelThickness: 0.1,
                bevelSize: 0.01,
                bevelEnabled: true,
            });
            const shapeCount = shapesOnCanvas.length
            const shape = "text3d"
            setShapesOnCanvas(
                [
                    ...shapesOnCanvas,
                    <Shapetext3D
                        shape={shape}
                        key={shapeCount}
                        geometry={geometry}
                        scale={[0.8, 0.6, 1]}
                        position={[-5, -3.2, 0.25]}
                        theatreKey={shape + shapeCount}
                        color={'yellow'}
                    />
                ]
            )
        })
    }
    const addBox = () => {
        const shapeCount = shapesOnCanvas.length
        const shape = "box"
        setShapesOnCanvas(
            [
                ...shapesOnCanvas,
                <Shapetext3D
                    shape={shape}
                    key={shapeCount}
                    geometry={new THREE.BoxGeometry(11, 1, 0.3)}
                    // scale={[0.8, 0.6, 1]}
                    position={[0, -3, 0]}
                    theatreKey={shape + shapeCount}
                    color={'maroon'}
                />
            ]
        )
    }

    const addDreiText2 = () => {
        const dreiText2 = STDLIB.createText(f0, 1.5)
        const shapeCount = shapesOnCanvas.length
        const shape = "2dText"
        setShapesOnCanvas(
            [
                ...shapesOnCanvas,
                <Shapetext2D
                    shape={shape}
                    key={shapeCount}
                    geometry={dreiText2.geometry}
                    material={dreiText2.material}
                    scale={[0.64, 0.54, 1]}
                    position={[0, -3, 0.27]}
                    theatreKey={shape + shapeCount}
                    color={'white'}
                />
            ]
        )
    }

    const copySelected = () => {
        if (selectedObject) {
            addImportedShape("copied", selectedObject, 1);
            setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
            setImported1([]);
        }
    }

    const addCircle = () => {
        const mesh = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'green', roughness: 0.3, metalness: 0.8 }))
        addImportedShape("circle", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addCone = () => {
        const mesh = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 16), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'red', roughness: 0.3, metalness: 0.8 }))
        addImportedShape("cone", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addCylinder = () => {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 8, 64, 64), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'lightpink', roughness: 0.3, metalness: 0.8 }))
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("cyllinder", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }


    const addDodecahedronGeometry = () => {
        const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'yellow', roughness: 0.3, metalness: 0.8 }))
        addImportedShape("Dodecahedron", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addextrudeGeometry = () => {
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const extrudeSettings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 2,
        };

        const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, extrudeSettings), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'pink', roughness: 0.3, metalness: 0.8 }))
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("extruded", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }

    const addLatheGeometry = () => {
        const points = [];
        for (let i = 0; i < 10; ++i) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }
        const mesh = new THREE.Mesh(new THREE.LatheGeometry(points), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'yellow', roughness: 0.3, metalness: 0.8 }));
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("lathe", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addRing = () => {
        const mesh = new THREE.Mesh(new THREE.RingGeometry(2, 7, 18), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'yellow', roughness: 0.3, metalness: 0.8 }));
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("ring", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addTorusknot = () => {
        const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(3.5, 1.5, 64, 64, 2, 3), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'lightblue', roughness: 0.3, metalness: 0.8 }));
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("torusknot", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }
    const addTube = () => {
        class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            getPoint(t) {
                const tx = t * 3 - 1.5;
                const ty = Math.sin(2 * Math.PI * t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }

        const path = new CustomSinCurve(4);
        const tubularSegments = 20;
        const radius = 1;
        const radialSegments = 8;
        const closed = false;

        const mesh = new THREE.Mesh(new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'lightblue', roughness: 0.3, metalness: 0.8 }));
        mesh.scale.set(0.2, 0.2, 0.2)
        addImportedShape("tube", mesh, 1);
        setShapesOnCanvas([...shapesOnCanvas, ...imported1]);
        setImported1([]);
    }

    const deleteSelected = () => {
        if (intersects[0]) {
            scene1.children[3].detach();
            const updatedshapesOnCanvas = [...shapesOnCanvas];
            const bb = updatedshapesOnCanvas.filter((val, i) => {
                return (intersects[0].object.userData.__storeKey !== "Demo Sheet:default:" + updatedshapesOnCanvas[i].props.theatreKey)
            })
            setShapesOnCanvas(bb);
            const updatedpickableObjects = [...pickableObjects]
            updatedpickableObjects.filter((val) => {
                return (val !== intersects[0].object)
            })
            setPickableObjects(updatedpickableObjects);
            setSelectedObject(null);
        }
    }
    const deleteAll = () => {
        scene1.children[3].detach();
        setPickableObjects([]);
        setSelectedObject(null);
        setShapesOnCanvas([])
    }

    const DeselectAll = () => {
        scene1.children[3].detach();
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
            scene1.children[3].attach(intersects[0].object);
        }
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentMouseMove, false);
        return () => {
            document.removeEventListener('click', onDocumentMouseMove);
        }
        // eslint-disable-next-line
    }, [pickableObjects])

    return (<div>
        <div style={{ display: 'flex', border: '1px solid red' }}>
            <div style={{ minWidth: 200, backgroundColor: 'darkgrey', border: '1px solid red' }}> </div>
            <div style={{ border: '1px solid red' }}>
                <div style={{ border: '1px solid red' }}>
                    <div style={{ border: '1px solid red' }}>
                        Caspar Control
                        <button onClick={showToCasparcg}>Initialise casparcg</button>
                        <button onClick={updatetoCaspar1}>Update to Caspar</button>
                        <button onClick={sampleAnimationcaspar}>animation to Caspar</button>


                        <button onClick={resetCameraToCasparc}>caspar camera Reset</button>
                        <button onClick={() => {
                            if (studio.ui.isHidden) {
                                studio.ui.restore();
                            }
                            else {
                                studio.ui.hide();
                            }
                        }}>Toggle Animation Editor</button>
                    </div>
                    <button onClick={addBox} data-shape={"box"}>Box </button>
                    <button onClick={addCylinder} >Cylinder </button>
                    <button onClick={addShape} data-shape={"donut"}>Donut </button>
                    <button onClick={addShape} data-shape={"sphere"}>sphere </button>

                    <button onClick={addDreiText} data-shape={"text3D"}>3D Text</button>
                    <button onClick={() => addDreiText2()}>2D Text</button>
                    <button onClick={() => changetext()}>Change text</button>

                    <button onClick={addCircle}>Circle</button>
                    <button onClick={addCone}>Cone</button>
                    <button onClick={addDodecahedronGeometry}>Docehedron</button>
                    <button onClick={addextrudeGeometry}>Extrude</button>
                    <button onClick={addLatheGeometry}>Lathe</button>
                    <button onClick={addRing}>Ring</button>
                    <button onClick={addTorusknot}>TorusKnot</button>
                    <button onClick={addTube}>Tube</button>




                    <button onClick={deleteSelected}>Delete</button>
                    <button onClick={() => deleteAll()}>Delete All</button>
                    <button onClick={() => copySelected()}>copy</button>
                    <button onClick={() => DeselectAll()}>DeSelect All</button>
                    <input type='color' onChange={e => applyColor(e)} />

                    <input size={10} type='text' value={f0} onChange={e => setF0(e.target.value)} />

                    {transformMode.map((val, i) =>
                        <span key={i}>  <input defaultChecked={(val === 'translate') ? true : false} onClick={e => transform.current.setMode(e.target.value)} type="radio" id={val} value={val} name="transformMode" /><label htmlFor={val}>{val}</label></span>
                    )}
                    Texture<input id="importjson" type='file' className='input-file' accept='.png,jpg,.bmp,.jpeg' onChange={e => applyTexture(e.target.files[0])} />


                    <button onClick={resetCamera1}>Reset Camera</button>
                    <button onClick={loadfabricjstoCasparcg}>Load fabricjs here</button>

                    <button onClick={drawingFileSaveAsgltf}>FileSave As gltf</button>
                    Open gltf file: < input id="importjson" type='file' className='input-file' accept='.gltf' onChange={e => importScenefromfilegltftoscene1(e.target.files[0])} />
                    <label htmlFor='hhh'> orbitcontrolenable: <input id='hhh' type={'checkbox'} checked={orbitcontrolenable} onChange={() => setorbitcontrolenable(!orbitcontrolenable)} /></label>
                    <button onClick={() => {
                        console.log(scene1.children);
                    }}>console log</button>

                    <button onClick={playAnimation}>Play Animation</button>
                    <button onClick={pauseAnimation}>Pause Animation</button>
                    <button onClick={sampleAnimation}>Play Sample Animation</button>
                    {/* <button onClick={logkeyframes}>Log keyframes</button> */}
                </div>
                <div style={{ height: 650, backgroundColor: 'grey', border: '1px solid red' }} >
                    <Canvas gl={{ preserveDrawingBuffer: true }}
                        onCreated={({ gl, raycaster, scene, camera }) => {
                            setScene1(scene);
                            setCamera1(camera);
                            setRaycaster1(raycaster);
                            setGl1(gl)
                        }}
                    >
                        <SheetProvider sheet={demoSheet}>
                            <OrbitControls enabled={orbitcontrolenable} theatreKey='orb 1' />
                            <TransformControls ref={transform} theatreKey='transformControls 1' />
                            <e.spotLight position={[10, 15, 10]} angle={10.5} intensity={10} theatreKey='spotLight 1' />
                            <e.spotLight position={[-10, -15, -10]} angle={10.5} intensity={10} theatreKey='spotLight 2' />
                            <Suspense fallback={null}>
                                {/* <Text color="black" anchorX="center" anchorY="middle">
                                    hello world!
                                </Text> */}
                                {/* <Text font={boldUrl2} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
                                    hello world!
                                </Text> */}
                                {/* <Text3D font={boldUrl2} >
                                    Hello world!
                                    <meshNormalMaterial />
                                </Text3D> */}
                                {/* <Html occlude ><h1>hello </h1> </Html> */}

                                {shapesOnCanvas}

                                {/* {dd.map((val, i) => {
                                    return (<>
                                        <e.mesh key={i} theatreKey={val}>
                                            <primitive object={new THREE.BoxGeometry(1, 1, 1)} attach={"geometry"} />
                                            <primitive object={new THREE.MeshStandardMaterial({ color: 'red' })} attach={"material"} />
                                        </e.mesh>
                                    </>)
                                }
                                )} */}
                            </Suspense>
                        </SheetProvider>
                    </Canvas>
                </div>
            </div>
            <div style={{ border: '1px solid red' }}>
                <div style={{ minWidth: 300, backgroundColor: 'darkgrey', border: '1px solid red' }}>  <h3>Props Area</h3> </div>
                <div style={{ position: 'absolute', top: 475, border: '1px solid red' }}>
                    gltf file < input id="importjson" type='file' className='input-file' accept='.gltf' onChange={e => importScenefromfilegltf(e.target.files[0])} />
                    < button onClick={async () => {
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
                    }> load above as gltf</button >
                    <button onClick={updatetoCaspar2}>Update to Caspar</button>
                    <button onClick={resetCamera2}>Reset Camera</button>
                    <button onClick={addLight}>Add light</button>
                    <button onClick={() => console.log(scene2)}>console log</button>
                    <button onClick={sampleAnimation2}>Play Above animation</button>

                </div>
                <div style={{ position: 'absolute', top: 585, minWidth: 200, height: 150, backgroundColor: 'grey', border: '1px solid red' }} >
                    <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                        setCamera2(camera);
                    }}
                    >
                        <OrbitControls />
                        {scene2 && <primitive object={scene2} />}
                    </Canvas>
                </div>
            </div>
        </div >
        <div style={{ textAlign: 'center', minHeight: 220, border: '1px solid red' }}>
            <h1>Timeline Area</h1>
        </div>
    </div >)
}
export default Threejs;