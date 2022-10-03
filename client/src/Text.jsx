import * as THREE from 'three'
import React, { useMemo, useRef, useLayoutEffect } from 'react'
import boldUrl from './assets/fonts/bold.blob'
import { Text3D } from '@react-three/drei'

export default function Text({ children, vAlign = 'center', hAlign = 'center', size = 1.5, color = '#000000', ...props }) {
    const config = useMemo(
        () => ({ size: 10, height: 3, curveSegments: 3, bevelEnabled: true, bevelThickness: 2, bevelSize: 0.5, bevelOffset: 0, bevelSegments: 2 }),
        []
    )
    const mesh = useRef()
    useLayoutEffect(() => {
        const size = new THREE.Vector3()
        mesh.current.geometry.computeBoundingBox()
        mesh.current.geometry.boundingBox.getSize(size)
        mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
        mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    }, [children])
    return (
        <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
            <Text3D ref={mesh} font={boldUrl} {...config}>
                {children}
                <meshStandardMaterial />
            </Text3D>
        </group>
    )
}
