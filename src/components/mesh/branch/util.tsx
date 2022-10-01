import { random } from "../../util/math"
import { constants } from "../../../App"

export const nextBranchLen = (len: number) => {
    return len * random(constants.nextLenMin, constants.nextLenMax)
}

export const nextBranchDia = (dia: number) => {
    return dia * random(constants.nextDiaMin, constants.nextDiaMax)
}