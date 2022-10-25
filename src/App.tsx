import React, { useState } from "react";
import "./App.css";
import { hot } from "react-hot-loader";
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { Ground } from "./components/mesh/ground";
import { Branch } from "./components/mesh/branch/branch";
import uuid from 'react-uuid';
import { MapControl } from "./components/controllers/mapControl";
import { useLogger } from "./components/util/logger";
import { nextBranchDia } from "./components/mesh/branch/util";
import { SetupControls, treeValues } from "./components/ui/setupControls";
import { HemisphereLight } from "./components/lights/hemisphereLight";
import { DirectionalLight } from "./components/lights/directionalLight";
import { Sky } from "./components/sky/sky";
import { Color } from "three";


const App: React.FC = () => {
  const [roots, setRoots] = useState<JSX.Element[]>([])
  const { LoggerDisplay, LoggerRecorder } = useLogger();

  const handleGroundClicked = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta < 10) {
      setRoots(roots => [...roots, <Branch key={uuid()} start={e.point} diaStart={treeValues.rootDia} diaEnd={nextBranchDia(treeValues.rootDia)} len={treeValues.rootLen} />])
    }
  }

  const handleRemoveAll = () => {
    setRoots([])
  }

  return (
    <div className="full-height">
      <div className="controls_left">
        <LoggerDisplay />
        <button onClick={handleRemoveAll}>
          Clear all
        </button>
      </div>
      <div className="controls_right" id="lilGui">
        <SetupControls />
      </div>
      <Canvas shadows camera={{ fov: 45, position: [25, 5, 25] }}>
        <Sky />
        <LoggerRecorder />
        <MapControl />
        <HemisphereLight />
        <DirectionalLight />
        {/* <pointLight castShadow position={[10, 10, 10]} /> */}
        <Ground onClick={handleGroundClicked} />
        {roots}
      </Canvas>
    </div>
  )
}

export default hot(module)(App);
