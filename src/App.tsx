import React, { useState } from "react";
import "./App.css";
import { hot } from "react-hot-loader";
import { Canvas, ThreeEvent, RootState } from '@react-three/fiber'
import { Ground } from "./components/mesh/ground";
import { Branch } from "./components/mesh/branch/branch";
import uuid from 'react-uuid';
import { MapControl } from "./components/controllers/mapControl";
import { useLogger } from "./components/util/logger";
import { nextBranchDia } from "./components/mesh/branch/util";
import { SetupControls, values } from "./components/ui/setupControls";

const App: React.FC = () => {
  const [roots, setRoots] = useState<JSX.Element[]>([])
  const { LoggerDisplay, LoggerRecorder } = useLogger();

  const handleGroundClicked = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta < 10) {
      setRoots(roots => [...roots, <Branch key={uuid()} start={e.point} diaStart={values.rootDia} diaEnd={nextBranchDia(values.rootDia)} len={values.rootLen} />])
    }
  }

  return (
    <div className="App">
      <SetupControls />
      <LoggerDisplay />
      <Canvas camera={{ fov: 45, position: [25, 5, 25] }}>
        <LoggerRecorder />
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
