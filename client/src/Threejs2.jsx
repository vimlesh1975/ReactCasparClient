import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { AnimationClip, AnimationMixer, NumberKeyframeTrack } from "three";
import React from 'react';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const Threejs2 = () => {
    const refkkk = useRef();
    const refprimitive = useRef();
    window.refkkk = refkkk;
    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();

    const sampleAnimation = (positionKF2, i) => {

        const positionKF3 = new NumberKeyframeTrack(`${positionKF2.name}`, Object.values(positionKF2.times), Object.values(positionKF2.values))
        const moveBlinkClip = new AnimationClip("move-n-blink", -1, [positionKF3]);

        const mixer = new AnimationMixer(scene1.children[i + 3]);
        var action = mixer.clipAction(moveBlinkClip);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
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

    return (<div >
        < div ref={refkkk} style={{ height: 1080 }}>
            <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                setScene2(scene);
                setCamera1(camera);
            }}>
                <OrbitControls autoRotate autoRotateSpeed={'0.15'} />
                <primitive ref={refprimitive} object={scene1} />
            </Canvas>
        </div>
    </div >)
}


export default Threejs2;