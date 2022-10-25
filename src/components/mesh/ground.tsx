import { MeshProps } from "@react-three/fiber"
import React from "react"

export const Ground: React.FC<MeshProps> = (props) => {
    return (
        <mesh
            receiveShadow
            {...props}
            rotation={[-1.5708, 0, 0]}
            position={[0, 0, 0]}
            
        >
            <planeGeometry args={[80, 80]} />
            <meshStandardMaterial color={'green'} />
        </mesh>
    )
}