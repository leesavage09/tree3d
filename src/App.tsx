import React from "react";
import { hot } from "react-hot-loader";
import { Canvas } from '@react-three/fiber'
import { Ground } from "./components/objects/ground";
import { CameraController } from "./components/objects/cameraController";
import { Branch } from "./components/objects/branch";
import "./App.css";

const DegToRad = (deg: number) => deg * Math.PI / 180

const App: React.FC = () => {
  return (
    <div className="App">
      <h1> Hello, World!</h1>
      <Canvas camera={{ fov: 45, position: [25, 5, 25] }}>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ground />
        <Branch start={[0, 0, 0]} angle_vir={0} angle_hor={0} dia_start={2} dia_end={0.1} length={10} />
        <Branch start={[0, 2.5, 0]} angle_vir={DegToRad(45)} angle_hor={DegToRad(0)} dia_start={1} dia_end={0.5} length={3} />
      </Canvas>
    </div>
  );
}

export default hot(module)(App);
