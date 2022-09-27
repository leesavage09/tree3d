import { ThreeElements, useFrame } from "@react-three/fiber"
import React, { Ref, useEffect, useRef, useState } from "react"
import uuid from "react-uuid"
import { CylinderGeometry, Mesh, BufferGeometry, Vector3 } from "three"
import { findPosition, DegToRad } from '../util/math'

const minNodesPerMeter = 1
const maxNodesPerMeter = 3

export interface BranchProps {
  start: Vector3,
  pitch: number,
  yaw: number,
  dia_start: number,
  dia_end: number,
  len: number,
  col?: string,
}

export const Branch: React.FC<BranchProps> = ({ dia_start, dia_end, len, start, yaw, pitch, col = '#302d24' }) => {
  const ref = useRef()
  const geo = useRef()
  const [branches, setBranches] = useState<JSX.Element[]>([])
  const [length, setLength] = useState(0.1)

  useEffect(() => {
    if (!ref.current) return
    const cylinder = ref.current as Mesh
    cylinder.rotateX(pitch / 2)
    cylinder.rotateZ(yaw / 2)
  }, [ref.current])

  useEffect(() => {
    if (!geo.current) return
    const cylinder = geo.current as CylinderGeometry
    cylinder.translate(0, length / 2, 0)
  }, [geo.current])

  useFrame((state, delta) => {
    if (!geo.current) return
    const cylinder = geo.current as CylinderGeometry

    if (length !== len) {
      const newLength = Math.min(len, length + delta * 5)
      setLength(newLength)

      if (newLength === len) {
        if (len < 0.5) return
        const newPos = new Vector3(0, len, 0)
        setBranches(branches => [
          ...branches,
          // <Branch key={uuid()} start={newPos} pitch={DegToRad(45)} yaw={DegToRad(0)} dia_start={dia_end} dia_end={dia_end / 2} len={len / 1.7} />,
          // <Branch key={uuid()} start={newPos} pitch={DegToRad(-45)} yaw={DegToRad(0)} dia_start={dia_end} dia_end={dia_end / 2} len={len / 1.7} />,
          <Branch key={uuid()} start={newPos} pitch={0} col="yellow" yaw={0} dia_start={dia_end} dia_end={dia_end / 2} len={len / 1.7} />,
          <Branch key={uuid()} start={newPos} pitch={0} col="red" yaw={1.5} dia_start={dia_end} dia_end={dia_end / 2} len={len / 1.7} />
        ])
      }
    }
  })


  return (
    <>
      <mesh
        ref={ref as unknown as Ref<Mesh<BufferGeometry>>}
        position={start}
      >
        <cylinderGeometry ref={geo as unknown as Ref<CylinderGeometry>} args={[dia_end, dia_start, length, 6]} />
        <meshStandardMaterial color={col} />
        {branches}
      </mesh>

    </>
  )
}
