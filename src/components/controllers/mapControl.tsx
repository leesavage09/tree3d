import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react"
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const MapControl = () => {
    const { camera, gl } = useThree();
    const [controls, setControls] = useState<MapControls>()

    useEffect(
        () => {
            const controls = new MapControls(camera, gl.domElement);

            controls.enableDamping = true;
			controls.dampingFactor = 0.05;
            controls.minDistance = 10;
            controls.maxDistance = 100;
            controls.maxPolarAngle = 1.5
            setControls(controls)

            return () => {
                controls.dispose();
            };
            
        },
        [camera, gl]
    );

    useFrame(()=>{
        if (controls) controls.update()
    })
    return null;
};