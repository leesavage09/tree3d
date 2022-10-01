import React, { useEffect } from "react";
import * as lilGui from 'lil-gui';

export const values: any = {

    rootLen: 3,
    rootDia: 1,

    nextLenMin: 0.60,
    nextLenMax: 0.60,
    nextDiaMin: 0.50,
    nextDiaMax: 0.60,

    rootSurvival: 1,
    survival1: 1,
    survival2: 1,
    survival3: 1,
    survival4: 1,


    SideMultiplier: 5,
    growth: 20,
    maxDepth: 3,
}

const addMinMaxCon = (group: lilGui.GUI, min: number, max: number, minString: string, maxString: string) => {
    const conMin = group.add(values, minString, min, max).name('min').onChange((min: any) => {
        if (min > values[maxString]) {
            values[maxString] = min
            conMax.updateDisplay()
        }
    });

    const conMax = group.add(values, maxString, min, max).name('max').onChange((max: any) => {
        if (max < values[minString]) {
            values[minString] = max
            conMin.updateDisplay()
        }
    });
}

export const SetupControls: React.FC = () => {

    useEffect(() => {
        const gui = new lilGui.GUI({ title: "Tree Controls" });

        const rootGUI = gui.addFolder('Root Branch')
        rootGUI.add(values, 'rootLen', 0.1, 10).name('Length');
        rootGUI.add(values, 'rootDia', 0.1, 10).name('Diameter');

        const survivalGUI = gui.addFolder('Branch Survival')
        survivalGUI.add(values, 'rootSurvival', 0, 1).name('Root');
        survivalGUI.add(values, 'survival1', 0, 1).name('Side 1');
        survivalGUI.add(values, 'survival2', 0, 1).name('Side 2');
        survivalGUI.add(values, 'survival3', 0, 1).name('Side 3');
        survivalGUI.add(values, 'survival4', 0, 1).name('Side 4');
        survivalGUI.add(values, 'maxDepth', 1, 6, 1).name('Maximum branch depth');

        const nextGUI = gui.addFolder('Next Branch')
        const nextLengthGUI = nextGUI.addFolder('Length')
        addMinMaxCon(nextLengthGUI, 0.1, 1, 'nextLenMin', 'nextLenMax')
        const nextDiaGUI = nextGUI.addFolder('Diameter')
        addMinMaxCon(nextDiaGUI, 0.1, 1, 'nextDiaMin', 'nextDiaMax')

        const renderGUI = gui.addFolder('Draw')
        renderGUI.add(values, 'SideMultiplier', 3, 60, 1).name('Side Multiplier');
        renderGUI.add(values, 'growth', 0.1, 20).name('Animation Speed');

        return () => {
            gui.destroy()
        }
    }, [])

    return <></>

}
