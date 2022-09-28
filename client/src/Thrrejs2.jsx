import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from "@react-three/drei";
import { useRef, useState } from 'react';

const Threejs2 = () => {
    const refkkk = useRef();
    window.refkkk = refkkk;
    const [scene1, setScene1] = useState({});
    window.setScene1 = setScene1;

    function Box() {
        const ref = useRef();
        useFrame(() => {
            ref.current.rotation.x += 0.010;
        });
        return (
            <mesh
                ref={ref}
                position={[0, -3, 0]}
                scale={[5, 0.3, 0.2]}
                rotation={[0, 0, 0]}

            >
                {/* <mesh>
                    <Text fontSize={0.2} position={[0, 5, 5]}  > Vimlesh Kumar</Text>
                </mesh> */}
                <boxGeometry attach="geometry" />
                <meshNormalMaterial attach="material" />

            </mesh>
        );
    }
    return (<div >

        <div ref={refkkk} style={{ height: 1080 }}>
            <Canvas >
                <OrbitControls />
                <Box />
                <primitive object={scene1} />
            </Canvas>
        </div>
    </div >)
}


export default Threejs2;