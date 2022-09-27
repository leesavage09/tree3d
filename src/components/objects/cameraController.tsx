import { useThree } from "@react-three/fiber";
import { useEffect } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraController = () => {
    const { camera, gl } = useThree();

    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 30;
            controls.maxDistance = 100;
            controls.maxPolarAngle = 1.5

            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};