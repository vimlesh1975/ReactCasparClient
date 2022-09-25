import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
// import { useSelector } from 'react-redux'
// import { endpoint } from './common'
import { useRef } from 'react';
// import { useParams } from "react-router-dom";
// import { useState } from 'react';

const Threejs2 = ({ color1 }) => {
    // const canvas = useSelector(state => state.canvasReducer.canvas);
    // const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    // const showToCasparcg = () => {
    //     // const colorwithouthash = color.replace("#", "");
    //     endpoint(`play 1-5 [html] http://localhost:10000/ReactCasparClient/threejs2/`);
    // }

    const refkkk = useRef();
    // let { width, height } = useParams();

    function Box() {
        const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
        return (
            <mesh
                onClick={() => {
                    api.velocity.set(0, 20, 0);
                }}
                ref={ref}
                position={[0, 2, 0]}
            >
                <boxGeometry attach="geometry" />
                <meshLambertMaterial attach="material" color={color1} />
            </mesh>
        );
    }

    function Plane() {
        const [ref] = usePlane(() => ({
            rotation: [-Math.PI / 2, 0, 0],
        }));
        return (
            <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry attach="geometry" args={[10, 10]} />
                <meshLambertMaterial attach="material" color="darkblue" />
            </mesh>
        );
    }

    return (<div >
        {/* {width} {height}

        {console.log(width)}
        {console.log(height)} */}
        {/* <div >
            <button onClick={showToCasparcg}>Show to casparcg</button>
            <input type='color' />
        </div> */}
        <div ref={refkkk} style={{ width: 'kk', height: 1080, backgroundColor: '#272727' }}>
            <Canvas>
                <OrbitControls />
                <Stars />
                {/* <Text fontSize={2}>vimlesh</Text> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Physics>
                    <Box />
                    <Plane />
                </Physics>
            </Canvas>
        </div>
    </div >)
}


export default Threejs2;