import { useFrame } from "@react-three/fiber"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import uuid from "react-uuid"
import { CylinderGeometry, Mesh, Vector3 } from "three"
import { treeValues } from "../../ui/setupControls"
import { roll } from '../../util/math'
import { nextBranchDia, nextBranchLen, nextRootAngle, nextSideAngle } from './util'


export interface BranchProps {
  //required
  start: Vector3,
  diaStart: number,
  diaEnd: number,

  len: number,

  //optional

  xAngle?: number,
  zAngle?: number,
  depth?: number,
}

const defaultProps = {
  depth: 1,
  xAngle: 0,
  zAngle: 0,
  col: "#302d24",
};



export const Branch: React.FC<BranchProps> = (props) => {
  const { diaStart, diaEnd, len, start, zAngle, xAngle, col, depth } = { ...defaultProps, ...props }
  // const diaEnd = props.diaEnd? props.diaEnd : nextBranchDia(props.diaStart)


  const [branches, setBranches] = useState<JSX.Element[]>([])
  const [length, setLength] = useState(0)

  const ref = {
    mesh: useRef() as MutableRefObject<Mesh>,
    geometry: useRef() as MutableRefObject<CylinderGeometry>,
  }

  const spawnAsyncBranch = (branch: JSX.Element) => {
    setTimeout(() => {
      setBranches((branches => [...branches, branch]))
    }, 1);
  }

  const spawnBranches = (start: Vector3) => {
    const nextDepth = depth + 1
    if (depth >= treeValues.maxDepth) return
    if (roll(treeValues.rootSurvival)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={nextRootAngle()} zAngle={nextRootAngle()} diaStart={diaEnd} diaEnd={nextBranchDia(diaEnd)} len={nextBranchLen(len)} depth={nextDepth} />)

    if (roll(treeValues.survival1)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={nextSideAngle()} zAngle={0} diaStart={diaEnd} diaEnd={nextBranchDia(diaEnd)} len={nextBranchLen(len)} depth={nextDepth} />)
    if (roll(treeValues.survival2)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={-nextSideAngle()} zAngle={0} diaStart={diaEnd} diaEnd={nextBranchDia(diaEnd)} len={nextBranchLen(len)} depth={nextDepth} />)
    if (roll(treeValues.survival3)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={0} zAngle={nextSideAngle()} diaStart={diaEnd} diaEnd={nextBranchDia(diaEnd)} len={nextBranchLen(len)} depth={nextDepth} />)
    if (roll(treeValues.survival4)) spawnAsyncBranch(<Branch key={uuid()} start={start} xAngle={0} zAngle={-nextSideAngle()} diaStart={diaEnd} diaEnd={nextBranchDia(diaEnd)} len={nextBranchLen(len)} depth={nextDepth} />)
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
      const newLength = Math.min(len, length + delta * treeValues.growth)
      setLength(newLength)
      if (newLength === len) {
        spawnBranches(new Vector3(0, len, 0))
      }
    }
  })

  return (
    <mesh
      castShadow
      ref={ref.mesh}
      position={start}
    >
      <cylinderGeometry ref={ref.geometry} args={[diaEnd, diaStart, length, Math.max(3, Math.floor(diaStart * treeValues.SideMultiplier)), 1, false]} />
      <meshStandardMaterial color={col} />
      {branches}
    </mesh>
  )
}


