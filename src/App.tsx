import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { Canvas, ThreeEvent, RootState } from '@react-three/fiber'
import { Ground } from "./components/mesh/ground";
import { Branch } from "./components/mesh/branch";
import uuid from 'react-uuid';
import { MapControl } from "./components/controllers/mapControl";
import GUI from 'lil-gui';
import "./App.css";
import { useLogger } from "./components/util/logger";

export const constants = {
  maxDepth: 3,

  rootSurvival: 1,
  rootLen: 3,
  rootDia: 1,


  sideSurvival: 1,
  nextLen: 0.60,
  nextDia: 0.50,

  SideMultiplier: 5,
  growth: 20,

}

const App: React.FC = () => {
  const [roots, setRoots] = useState<JSX.Element[]>([])
  const { LoggerDisplay, LoggerRecorder } = useLogger();


  const handleGroundClicked = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta < 10) {
      setRoots(roots => [...roots, <Branch key={uuid()} start={e.point} dia={constants.rootDia} len={constants.rootLen} />])
    }
  }

  useEffect(() => {
    const gui = new GUI({ title: "Tree Controls" });

    const rootGUI = gui.addFolder('Root Branch')
    rootGUI.add(constants, 'rootSurvival', 0, 1).name('Survival probability');
    rootGUI.add(constants, 'rootLen', 0.1, 10).name('Length');
    rootGUI.add(constants, 'rootDia', 0.1, 10).name('Diameter');

    const nextGUI = gui.addFolder('Next Branch')
    nextGUI.add(constants, 'sideSurvival', 0, 1).name('Survival probability');
    nextGUI.add(constants, 'nextLen', 0, 1).name('Length multiplier');
    nextGUI.add(constants, 'nextDia', 0, 1).name('Diameter multiplier');

    const renderGUI = gui.addFolder('Draw')
    renderGUI.add(constants, 'SideMultiplier', 3, 30, 1).name('Side Multiplier');
    renderGUI.add(constants, 'growth', 0.1, 20).name('Animation Speed');
    renderGUI.add(constants, 'maxDepth', 1, 6, 1).name('Maximum branch depth');

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <div className="App">
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
