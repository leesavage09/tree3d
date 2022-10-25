import { useThree } from '@react-three/fiber'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { Color, BackSide, Fog, HemisphereLight } from 'three'

export const Sky = () => {
    const three = useThree()
    const ref = {
        fog: useRef() as MutableRefObject<Fog>,
        hemi: useRef() as MutableRefObject<HemisphereLight>
    }

    const vertexShader = `
    varying vec3 vWorldPosition;

    void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `
    const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;

    void main() {
        float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }
    `

    const skyCol = new Color(0.6, 0.6, 0.8)
    const groundCol = new Color(0.6, 0.8, 0.6)


    const uniforms = {
        'topColor': { value: new Color(0.6, 1, 0.6) },
        'bottomColor': { value: new Color(0.6, 1, 0.6) },
        'offset': { value: 33 },
        'exponent': { value: 0.6 }
    };




    useEffect(() => {
        if (!ref.fog.current) return
        ref.fog.current.color.copy(uniforms['bottomColor'].value);
    }, [ref.fog])



    useEffect(() => {
        if (!ref.hemi.current) return
        const light = ref.hemi.current

        light.color.setHSL(0.6, 1, 0.6);
        light.groundColor.setHSL(0.095, 1, 0.75);
        light.position.set(0, 50, 0);

        light.visible = true

        uniforms['topColor'].value.copy(light.color);

    }, [ref.hemi])




    return (
        <>
            <color attach="background" args={[0.6, 0.6, 0.8]} />
            <fog ref={ref.fog} attach="fog" args={[new Color(0.6, 0.6, 0.8), 1, 1000]} />
            <mesh>
                <sphereGeometry args={[4000, 32, 15]} />
                <shaderMaterial args={[{
                    uniforms: uniforms,
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    side: BackSide
                }]} />

            </mesh>
            <hemisphereLight ref={ref.hemi} args={[skyCol, groundCol, 0.6]} />
        </>

    )
}
