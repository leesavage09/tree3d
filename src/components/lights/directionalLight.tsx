import { useThree } from '@react-three/fiber';
import React, { MutableRefObject, useRef, useEffect } from 'react'
import { Color, DirectionalLight as ThreeDirectionalLight } from "three";


export const DirectionalLight = () => {
    const ref = useRef() as MutableRefObject<ThreeDirectionalLight>
    const three = useThree()

    useEffect(() => {
        if (!ref.current) return
        const light = ref.current

        // light.color.setHSL(0.1, 1, 0.95);
        // light.position.set(20, 10, 0);
        // light.position.multiplyScalar(30);

        // // light.castShadow = true;

        // // light.shadow.mapSize.width = 2048;
        // // light.shadow.mapSize.height = 2048;

        // const d = 1000;

        // light.shadow.camera.left = - d;
        // light.shadow.camera.right = d;
        // light.shadow.camera.top = d;
        // light.shadow.camera.bottom = - d;

        // light.shadow.camera.far = 3000;
        // light.shadow.camera.near = 1;
        // light.shadow.bias = - 0.0001;

        // light.shadow. = three.camera

        // console.log(light.shadow.three.camera)
    }, [ref])

    return (
        <>
            {/* <directionalLight
                ref={ref}
                intensity={1}
                castShadow
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
            /> */}

            <directionalLight
             ref={ref}
                intensity={1}
                position={[80, 80, 30]}
                castShadow shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20} />
        </>

    )
}
