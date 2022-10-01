import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react"
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

export const MapControl = () => {
    const { camera, gl } = useThree();
    const [controls, setControls] = useState<MapControls>()

    useEffect(
        () => {
            const controls = new MapControls(camera, gl.domElement);

            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.minDistance = 10;
            controls.maxDistance = 500;
            controls.maxPolarAngle = 1.5

            controls.listenToKeyEvents(window)
            controls.keyPanSpeed = 50
            controls.keys.UP = "KeyW"
            controls.keys.BOTTOM = "KeyS"
            controls.keys.LEFT = "KeyA"
            controls.keys.RIGHT = "KeyD"

            setControls(controls)

            return () => {
                controls.dispose();
            };

        },
        [camera, gl]
    );

    useFrame(() => {
        if (controls) controls.update()
    })
    return null;
};