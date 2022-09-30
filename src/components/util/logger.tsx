import React from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const Logger: React.FC = () => {
    const three = useThree();
    
    useFrame(() => {
        console.log('triangles:', three.gl.info.render.triangles)
    })

    return <></>
}
