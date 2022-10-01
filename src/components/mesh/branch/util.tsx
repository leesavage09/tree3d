import { values } from "../../ui/setupControls"
import { DegToRad, random } from "../../util/math"

export const nextBranchLen = (len: number) => {
    return len * random(values.nextLenMin, values.nextLenMax)
}

export const nextBranchDia = (dia: number) => {
    return dia * random(values.nextDiaMin, values.nextDiaMax)
}

export const nextRootAngle = () => {
    const a = random(DegToRad(values.rootAngleMin), DegToRad(values.rootAngleMax))
    if (Math.random() > 0.5) {
        console.log(">", a)
        return a
    } else {
        const b = 0- a
        console.log("<", b)
        return b
    }
}

export const nextSideAngle = () => {
    return random(DegToRad(values.sideAngleMin), DegToRad(values.sideAngleMax))
}