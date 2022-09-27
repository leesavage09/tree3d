import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { Ground } from "./components/objects/ground";
import { CameraController } from "./components/objects/cameraController";
import { Branch } from "./components/objects/branch";
import uuid from 'react-uuid';
import "./App.css";

const App: React.FC = () => {
  const [roots, setRoots] = useState<JSX.Element[]>([])

  const handleGroundClicked = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta < 10) {
      setRoots(roots => [...roots, <Branch key={uuid()} start={e.point} pitch={0} yaw={0} dia_start={1} dia_end={0.5} len={3} />])
    }
  }

  return (
    <div className="App">
      <Canvas camera={{ fov: 45, position: [25, 5, 25] }}>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ground onClick={handleGroundClicked} />
        {roots}
      </Canvas>
    </div>
  );
}

export default hot(module)(App);
