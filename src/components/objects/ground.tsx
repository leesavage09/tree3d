import React from "react"

export const Ground: React.FC = () => {
    return (
        <mesh
            rotation={[-1.5708, 0, 0]}
            position={[0, 0, 0]}
        >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color={'green'} />
        </mesh>
    )
}