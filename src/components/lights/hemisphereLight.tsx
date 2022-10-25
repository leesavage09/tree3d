import React, { MutableRefObject, useRef, useEffect } from 'react'
import { Color, HemisphereLight as ThreeHemisphereLight} from "three";


export const HemisphereLight = () => {
    const ref = useRef() as MutableRefObject<ThreeHemisphereLight>

    useEffect(() => {
        if (!ref.current) return
        const light = ref.current

        light.color.setHSL(0.6, 1, 0.6);
        light.groundColor.setHSL(0.095, 1, 0.75);
        light.position.set(0, 50, 0);

        light.visible = true

    }, [ref])

    const skyCol = new Color(0.6, 0.6, 0.8)
    const groundCol = new Color(0.6, 0.8, 0.6)

    return (
        <hemisphereLight ref={ref} args={[skyCol, groundCol, 0.6]} />
    )
}
