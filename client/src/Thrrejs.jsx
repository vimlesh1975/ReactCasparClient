import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
// import { useSelector } from 'react-redux'
import { endpoint } from './common'
import { useRef } from 'react';
import { useState, useCallback } from 'react';
// import * as THREE from 'three'
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { v4 as uuidv4 } from 'uuid';

const Threejs = () => {
    const [items, set] = useState([])

    const [scene1, setScene1] = useState();
    const [camera1, setCamera1] = useState();
    // const canvas = useSelector(state => state.canvasReducer.canvas);
    // const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const showToCasparcg = () => {
        endpoint(`play 1-5 [html] http://localhost:10000/ReactCasparClient/threejs2`);

    }
    const [color, setColor] = useState('red');

    const refkkk = useRef();
    function Cube() {
        const ref = useRef()
        // const handleClick = 
        return (
            <>
                <mesh ref={ref} >
                    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                    <meshStandardMaterial attach="material" color="grey" />
                </mesh>
                {items.map((key, index) => (
                    <Spawned key={key} position={[0, 1 + index * 0.4, 0]} />
                ))}
            </>
        )
    }
    function Box() {
        const ref = useRef();
        useFrame(() => {
            // ref.current.rotation.y += 0.010;
            // ref.current.rotation.x += 0.010;
        });
        return (
            <mesh
                ref={ref}
                position={[0, 2, 0]}
            >
                <boxGeometry attach="geometry" />
                <meshNormalMaterial attach="material" color={color} />
            </mesh>
        );
    }
    function Spawned(props) {
        return (
            <mesh {...props}>
                <sphereGeometry attach="geometry" args={[0.5, 16, 16]} />
                <meshStandardMaterial attach="material" color="hotpink" transparent />
            </mesh>
        )
    }

    function showSvgtoCasparcg() {
        var rendererSVG = new SVGRenderer();
        rendererSVG.setSize(window.innerWidth, window.innerHeight);
        // rendererSVG.setClearColor('red', 0.50);
        rendererSVG.render(scene1, camera1);
        var XMLS = new XMLSerializer();
        var svgfile = XMLS.serializeToString(rendererSVG.domElement);
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        svgfile = preface + svgfile.replace(`style="background-color: rgb(254, 254, 254);"`, "");

        endpoint(`play ${window.chNumber}-${96} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${96} "
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
            var aa = document.createElement('div');
            aa.style.position='absolute';
            aa.innerHTML='${(svgfile).replaceAll('"', '\\"')}';
            bb.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${1920 * 100}/1920)+'%';
            document.body.style.overflow='hidden';
            "`)
    }


    return (<div >
        <div >
            <button onClick={showToCasparcg}>Show to casparcg</button>
            <button onClick={useCallback(e => set(items => [...items, uuidv4()]), [])}>add shere to Cube</button>
            <button onClick={showSvgtoCasparcg}> Show SVG to casparcg</button>
            <input type='color' onChange={e => setColor(e.target.value)} />
        </div>
        <div ref={refkkk} style={{ width: 800, height: 450, }}>
            <Canvas
                onCreated={({ gl, raycaster, scene, camera }) => {
                    // console.log(camera);
                    console.log(scene);
                    setScene1(scene);
                    setCamera1(camera);
                }}
            >
                <OrbitControls />
                {/* <Stars /> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={10.5} />
                <Physics>
                    <Box />
                    <Cube position={[0, 0, 0]} />
                </Physics>
            </Canvas>
            {/* <Canvas id='ggg'
            >
                <OrbitControls />
                <primitive object={scene1} />
            </Canvas> */}
        </div>
    </div>
    )
}


export default Threejs;