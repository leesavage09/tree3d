import { ThreeElements, useFrame } from "@react-three/fiber"
import React, { MutableRefObject, Ref, useEffect, useRef, useState } from "react"
import uuid from "react-uuid"
import { CylinderGeometry, Mesh, BufferGeometry, Vector3 } from "three"
import { findPosition, DegToRad, roll } from '../util/math'
import { constants } from "../../App"

const minNodesPerMeter = 1
const maxNodesPerMeter = 3

export interface BranchProps {
  //required
  start: Vector3,
  dia: number,
  len: number,

  //optional
  xAngle?: number,
  zAngle?: number,
  col?: string,
  depth?: number,
}

const defaultProps = {
  depth: 1,
  xAngle: 0,
  zAngle: 0,
  col: "#302d24",
};

export const Branch: React.FC<BranchProps> = (props) => {
  const { dia, len, start, zAngle, xAngle, col, depth } = { ...defaultProps, ...props }

  const [branches, setBranches] = useState<JSX.Element[]>([])
  const [length, setLength] = useState(0.1)

  const ref = {
    mesh: useRef() as MutableRefObject<Mesh>,
    geometry: useRef() as MutableRefObject<CylinderGeometry>,
  }

  const spawnAsyncBranch = (branch: JSX.Element) => {
    setTimeout(() => {
      setBranches((branches => [...branches, branch]))
    }, 1);
  }

  const spawnBranches = (start: Vector3, dia: number, len: number) => {
    const nextDepth = depth+1
    if (depth >= constants.maxDepth) return
    if (roll(constants.rootSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={0} zAngle={0} dia={dia} len={len} depth={nextDepth} />)

    if (roll(constants.sideSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={-3} zAngle={0} dia={dia} len={len} depth={nextDepth} />)
    if (roll(constants.sideSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={3} zAngle={0} dia={dia} len={len} depth={nextDepth} />)
    if (roll(constants.sideSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={0} zAngle={3} dia={dia} len={len} depth={nextDepth} />)
    if (roll(constants.sideSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={0} zAngle={-3} dia={dia} len={len} depth={nextDepth} />)
  }

  useEffect(() => {
    if (!ref.mesh.current) return
    const mesh = ref.mesh.current
    mesh.rotateX(xAngle / 2)
    mesh.rotateZ(zAngle / 2)
  }, [ref.mesh])

  useEffect(() => {
    if (!ref.geometry.current) return
    const geometry = ref.geometry.current as CylinderGeometry
    geometry.translate(0, length / 2, 0)
  }, [length])

  useFrame((state, delta) => {
    if (length !== len) {
      const newLength = Math.min(len, length + delta * constants.growth)
      setLength(newLength)
      if (newLength === len) {
        spawnBranches(new Vector3(0, len, 0), dia * constants.nextDia, len * constants.nextLen)
      }
    }
  })

  return (
    <mesh
      ref={ref.mesh}
      position={start}
    >
      <cylinderGeometry ref={ref.geometry} args={[dia * constants.nextDia, dia, length, Math.max(3, Math.floor(dia * constants.SideMultiplier)), 1, false]} />
      <meshStandardMaterial color={col} />
      {branches}
    </mesh>
  )
}


