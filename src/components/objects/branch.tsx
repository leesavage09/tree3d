import React, { Ref, useEffect, useRef } from "react"
import { CylinderGeometry, Mesh, BufferGeometry } from "three"

interface BranchProps {
    start: [number, number, number],
    angle_vir: number,
    angle_hor: number,
    dia_start: number,
    dia_end: number,
    length: number,
  }
  
  export const Branch: React.FC<BranchProps> = ({ dia_start, dia_end, length, start, angle_hor, angle_vir }) => {
    const ref = useRef()
    const geo = useRef()
  
    useEffect(() => {
      if (!geo.current) return
      const cylinder = geo.current as CylinderGeometry
      cylinder.translate(0, length/2, 0)
      cylinder.rotateX(angle_vir)
      cylinder.rotateY(angle_hor)
    }, [geo.current])
  
    return (
      <mesh
        ref={ref as unknown as Ref<Mesh<BufferGeometry>>}
        position={start}
      >
        <cylinderGeometry ref={geo as unknown as Ref<CylinderGeometry>} args={[dia_end, dia_start, length, 3]} />
        <meshStandardMaterial color={'#302d24'} />
      </mesh>
    )
  }
  