import { treeValues } from "../../ui/setupControls"
import { DegToRad, random } from "../../util/math"

export const nextBranchLen = (len: number) => {
    return len * random(treeValues.nextLenMin, treeValues.nextLenMax)
}

export const nextBranchDia = (dia: number) => {
    return dia * random(treeValues.nextDiaMin, treeValues.nextDiaMax)
}

export const nextRootAngle = () => {
    const a = random(DegToRad(treeValues.rootAngleMin), DegToRad(treeValues.rootAngleMax))
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
    return random(DegToRad(treeValues.sideAngleMin), DegToRad(treeValues.sideAngleMax))
}