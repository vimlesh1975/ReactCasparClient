import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { AnimationClip, AnimationMixer, NumberKeyframeTrack } from "three";
import React from 'react';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { getProject } from '@theatre/core'

// import studio from '@theatre/studio'
// import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import projectState from './state.json'

// studio.extend(extension);

// studio.initialize()

// var demoSheet = getProject('Demo Project').sheet('Demo Sheet')
const Threejs2 = () => {
    const [demoSheet, setDemoSheet] = useState(getProject('Demo Project', { projectState }).sheet('Demo Sheet'));
    const refkkk = useRef();
    const refprimitive = useRef();
    window.refkkk = refkkk;
    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();


    // React.useEffect(() => {
    //     demoSheet.project.ready.then(() => {
    //         demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    //     })
    // }, [])


    // const sampleAnimation = (projectState1) => {
    //     setDemoSheet(getProject('Demo Project', { state: projectState1 }).sheet('Demo Sheet'))
    //     // demoSheet = getProject('Demo Project', { state: projectState1 }).sheet('Demo Sheet')
    //     demoSheet.project.ready.then(() => {
    //         demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    //     })
    // }

    const sampleAnimation = (positionKF2, i) => {
        console.log(positionKF2.name)
        console.log(JSON.stringify(positionKF2.times))
        console.log(JSON.stringify(positionKF2.values))

        const positionKF3 = new NumberKeyframeTrack(`${positionKF2.name}`, Object.values(positionKF2.times), Object.values(positionKF2.values))


        const moveBlinkClip = new AnimationClip("move-n-blink", -1, [positionKF3]);

        const mixer = new AnimationMixer(scene1.children[i + 3]);
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

    window.sampleAnimation = sampleAnimation;

    const importScenefromData = (inp) => {
        var loader = new THREE.ObjectLoader();
        loader.parse(inp,
            json => {
                setScene1(json);
            }
        );
    }

    function importScenefromfilegltf(inp) {
        const loader = new GLTFLoader();
        loader.parse(inp, "", gltf2 => {
            setScene1(gltf2.scene);
        });
    }


    const addtextfromfont = (txtvalue) => {
        const loader = new FontLoader();
        loader.load('http://localhost:10000/reactCasparClient/fonts/helvetiker_regular.typeface.json', function (font) {

            const textGeometry = new TextGeometry(txtvalue, {
                font: font,
                size: 40,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            var cubeMaterial = new THREE.MeshNormalMaterial();
            var cube = new THREE.Mesh(textGeometry, cubeMaterial);
            cube.position.set(-50, -20, -120)

            scene2.remove(cube);
            scene2.add(cube);
        });

    }

    window.addtextfromfont = addtextfromfont;
    window.setScene1 = setScene1;
    window.setCamera1 = setCamera1;
    window.camera1 = camera1;
    window.importScenefromData = importScenefromData;
    window.importScenefromfilegltf = importScenefromfilegltf;

    const dd = useRef()

    return (<div >
        < div ref={refkkk} style={{ height: 1080 }}>
            <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                setScene2(scene);
                setCamera1(camera);
            }}>
                {/* <SheetProvider sheet={demoSheet}> */}
                <OrbitControls autoRotate autoRotateSpeed={'0.15'} />
                {/* <mesh theatreKey='box0' ref={dd}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> */}
                <primitive ref={refprimitive} object={scene1} />
                {/* </SheetProvider> */}
            </Canvas>
        </div>
    </div >)
}


export default Threejs2;