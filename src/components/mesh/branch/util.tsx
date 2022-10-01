import { values } from "../../ui/setupControls"
import { random } from "../../util/math"

export const nextBranchLen = (len: number) => {
    return len * random(values.nextLenMin, values.nextLenMax)
}

export const nextBranchDia = (dia: number) => {
    return dia * random(values.nextDiaMin, values.nextDiaMax)
}