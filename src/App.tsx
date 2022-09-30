import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { Ground } from "./components/mesh/ground";
import { Branch } from "./components/mesh/branch";
import uuid from 'react-uuid';
import { Logger } from "./components/util/logger";
import { MapControl } from "./components/controllers/mapControl";
import "./App.css";

const App: React.FC = () => {
  const [roots, setRoots] = useState<JSX.Element[]>([])

  const handleGroundClicked = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta < 10) {
      setRoots(roots => [...roots, <Branch key={uuid()} start={e.point} dia={0.5} len={3} />])
    }
  }

  return (
    <div className="App">
      <Canvas camera={{ fov: 45, position: [25, 5, 25] }}>
        <Logger />
        <MapControl />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ground onClick={handleGroundClicked} />
        {roots}
      </Canvas>
    </div>
  )
}

export default hot(module)(App);
