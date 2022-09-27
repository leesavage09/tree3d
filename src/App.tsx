import React, { useRef, useState, Component, useEffect } from "react";
import { hot } from "react-hot-loader";
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import { Mesh } from "three";

const Box: React.FC<MeshProps> = (props) => {
  const ref = useRef()

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    const mesh = ref.current as Mesh
    mesh.rotation.x += 0.01
  })


  return (
    <mesh
      {...props}
      ref={ref.current}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Cuboid: React.FC<MeshProps> = (props) => {
  const ref = useRef()

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref.current}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 4, 1]} />
      <meshStandardMaterial color={hovered ? 'green' : 'grey'} />
    </mesh>
  )
}

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const App: React.FC = () => {
  console.log("reloaded")


  return (
    <div className="App">
      <h1> Hello, World!</h1>
      <Canvas>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.6, 0, 0]} />
        <Box position={[1.6, 0, 0]} />
        <Cuboid position={[0, 0, 0]} />
      </Canvas>
    </div>
  );

}

export default hot(module)(App);