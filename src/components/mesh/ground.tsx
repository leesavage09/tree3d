import { MeshProps } from "@react-three/fiber"
import React from "react"

export const Ground: React.FC<MeshProps> = (props) => {
    return (
        <mesh
            {...props}
            rotation={[-1.5708, 0, 0]}
            position={[0, 0, 0]}
        >
            <planeGeometry args={[10000, 10000]} />
            <meshStandardMaterial color={'green'} />
        </mesh>
    )
}