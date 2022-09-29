import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from 'react';
import * as THREE from 'three'

const Threejs2 = () => {
    const refkkk = useRef();
    window.refkkk = refkkk;
    const [scene1, setScene1] = useState({});
    const [camera1, setCamera1] = useState();




    const importScenefromData = (inp) => {
        var loader = new THREE.ObjectLoader();
        loader.parse(inp,
            json => {
                setScene1(json);
            }
        );
    }

    window.setScene1 = setScene1;
    window.setCamera1 = setCamera1;
    window.camera1 = camera1;

    window.importScenefromData = importScenefromData;


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

        <div ref={refkkk} style={{ height: 1080 }}>
            <Canvas onCreated={({ gl, raycaster, scene, camera }) => {
                // console.log(camera.position);
                // console.log(camera.rotation);

                // console.log(scene);
                // setScene1(scene);
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