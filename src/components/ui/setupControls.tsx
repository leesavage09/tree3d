import React, { useEffect } from "react";
import * as lilGui from 'lil-gui';

interface TreeValues {
    rootLen: number,
    rootDia: number,

    nextLenMin: number,
    nextLenMax: number,
    nextDiaMin: number,
    nextDiaMax: number,

    rootSurvival: number,
    survival1: number,
    survival2: number,
    survival3: number,
    survival4: number,

    rootAngleMin: number,
    rootAngleMax: number,
    sideAngleMin: number,
    sideAngleMax: number,

    SideMultiplier: number,
    growth: number,
    maxDepth: number
}

export const treeValues: TreeValues = {
    rootLen: 3,
    rootDia: 1,

    nextLenMin: 0.60,
    nextLenMax: 0.60,
    nextDiaMin: 0.50,
    nextDiaMax: 0.60,

    rootSurvival: 0,
    survival1: 1,
    survival2: 1,
    survival3: 0,
    survival4: 0,

    rootAngleMin: 0,
    rootAngleMax: 0,
    sideAngleMin: 45,
    sideAngleMax: 45,

    SideMultiplier: 5,
    growth: 20,
    maxDepth: 3,
}

export const ExampleOne: TreeValues = {
    rootLen: 1,
    rootDia: 0.5,

    nextLenMin: 0.60,
    nextLenMax: 0.60,
    nextDiaMin: 0.50,
    nextDiaMax: 0.60,

    rootSurvival: 1,
    survival1: 1,
    survival2: 1,
    survival3: 1,
    survival4: 1,

    rootAngleMin: 0,
    rootAngleMax: 0,
    sideAngleMin: 38,
    sideAngleMax: 49,

    SideMultiplier: 10,
    growth: 20,
    maxDepth: 4,
}

export const ExampleTwo: TreeValues = {
    rootLen: 5,
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

    rootAngleMin: 0,
    rootAngleMax: 0,
    sideAngleMin: 38,
    sideAngleMax: 49,

    SideMultiplier: 10,
    growth: 20,
    maxDepth: 4,
}

const addMinMaxCon = (group: lilGui.GUI, min: number, max: number, minString: string, maxString: string, name = '') => {
    const v = treeValues as any;
    const conMin = group.add(v, minString, min, max).name(name + ' min').onChange((min: any) => {
        if (min > v[maxString]) {
            v[maxString] = min
            conMax.updateDisplay()
        }
    });

    const conMax = group.add(v, maxString, min, max).name(name + ' max').onChange((max: any) => {
        if (max < v[minString]) {
            v[minString] = max
            conMin.updateDisplay()
        }
    });
}

export const SetupControls: React.FC = () => {

    useEffect(() => {
        const gui = new lilGui.GUI({ title: "Tree Controls", container: document.getElementById('lilGui') || undefined });

        const presetsGUI = gui.addFolder('Presets')
        presetsGUI.add({ Preset: undefined }, 'Preset', { ExampleOne, ExampleTwo }).name('Select Preset').onChange((v: any) => {
            Object.assign(treeValues, v)
        })


        const rootGUI = gui.addFolder('Root Branch')
        rootGUI.add(treeValues, 'rootLen', 0.1, 10).name('Length');
        rootGUI.add(treeValues, 'rootDia', 0.1, 10).name('Diameter');

        const survivalGUI = gui.addFolder('Branch Survival')
        survivalGUI.add(treeValues, 'rootSurvival', 0, 1).name('Root');
        survivalGUI.add(treeValues, 'survival1', 0, 1).name('Side 1');
        survivalGUI.add(treeValues, 'survival2', 0, 1).name('Side 2');
        survivalGUI.add(treeValues, 'survival3', 0, 1).name('Side 3');
        survivalGUI.add(treeValues, 'survival4', 0, 1).name('Side 4');
        survivalGUI.add(treeValues, 'maxDepth', 1, 6, 1).name('Maximum branch depth');

        const nextGUI = gui.addFolder('Next Branch')
        const nextLengthGUI = nextGUI.addFolder('Length')
        addMinMaxCon(nextLengthGUI, 0.1, 1, 'nextLenMin', 'nextLenMax')
        const nextDiaGUI = nextGUI.addFolder('Diameter')
        addMinMaxCon(nextDiaGUI, 0.1, 1, 'nextDiaMin', 'nextDiaMax')

        const anglesGUI = gui.addFolder('Side Angles')
        addMinMaxCon(anglesGUI, 0, 180, 'rootAngleMin', 'rootAngleMax', "Root angle")
        addMinMaxCon(anglesGUI, 0, 180, 'sideAngleMin', 'sideAngleMax', "Side angle")

        const renderGUI = gui.addFolder('Draw')
        renderGUI.add(treeValues, 'SideMultiplier', 3, 60, 1).name('Side Multiplier');
        renderGUI.add(treeValues, 'growth', 0.1, 40).name('Animation Speed');

        return () => {
            gui.destroy()
        }
    }, [])

    return <></>

}
