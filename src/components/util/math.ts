import { Vector3 } from "three"

export const findPosition = (yaw: number, pitch: number, distance: number) => {
    const Px = distance * Math.sin(yaw) * Math.cos(pitch)
    const Pz = distance * Math.sin(pitch)
    const Py = distance * Math.cos(yaw) * Math.cos(pitch)

    return new Vector3(Px, Py, Pz)
}


export const DegToRad = (deg: number) => deg * Math.PI / 180

export const roll = (probability:number) => {
    return Math.random()<probability
}
