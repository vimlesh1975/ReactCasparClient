import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const Threejs2 = () => {
    const refkkk = useRef();
    window.refkkk = refkkk;
    const [scene1, setScene1] = useState({});
    const [scene2, setScene2] = useState({});
    const [camera1, setCamera1] = useState();



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
        loader.parseAsync(inp, function (gltf) {
            setScene1(gltf.scene);
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
            // create a cube and add to scene
            var cubeMaterial = new THREE.MeshNormalMaterial();
            // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            var cube = new THREE.Mesh(textGeometry, cubeMaterial);
            cube.position.set(-50, -20, -120)

            scene2.remove(cube);
            scene2.add(cube);
        });

    }
    window.setScene1 = setScene1;
    window.setCamera1 = setCamera1;
    window.camera1 = camera1;

    window.importScenefromData = importScenefromData;
    window.importScenefromfilegltf = importScenefromfilegltf;


    window.addtextfromfont = addtextfromfont;


    // function Box() {
    //     const ref = useRef();
    //     useFrame(() => {
    //         ref.current.rotation.x += 0.010;
    //     });
    //     return (
    //         <mesh
    //             ref={ref}
    //             position={[0, -3, 0]}
    //             scale={[5, 0.3, 0.2]}
    //             rotation={[0, 0, 0]}

    //         >
    //             {/* <mesh>
    //                 <Text fontSize={0.2} position={[0, 5, 5]}  > Vimlesh Kumar</Text>
    //             </mesh> */}
    //             <boxGeometry attach="geometry" />
    //             <meshNormalMaterial attach="material" />

    //         </mesh>
    //     );
    // }
    return (<div >
        {/* <input type='text' value='Vimlesh Kumar' onClick={() => alert('hi')} /> */}
        < div ref={refkkk} style={{ height: 1080 }}>
            <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                // console.log(camera.position);
                // console.log(camera.rotation);
                // console.log(scene);
                setScene2(scene);
                setCamera1(camera);
            }}>
                <OrbitControls />
                {/* <Box /> */}

                <primitive object={scene1} />
            </Canvas>
        </div>
    </div >)
}


export default Threejs2;