import React, { useState } from "react";
import { RootState, useFrame, useThree } from "@react-three/fiber";

interface stats {
    three: RootState,
    fps: number,
}

interface LoggerProps {
    updateStats: (stats: stats) => void
}

const Logger: React.FC<LoggerProps> = ({ updateStats }) => {
    const three = useThree();

    useFrame((state, delta) => {
        updateStats({
            fps: Math.round(1 / delta),
            three
        })
    })

    return <></>
}



interface StatsProps {
    stats?: stats
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
    if (!stats) return (
        <div>
            Error no stats
        </div>
    )

    const t = stats.three.gl.info.render.triangles
    const triangles = t > 1000 ? `${t / 1000}K` : t.toString()

    return (
        <div>
            <p>
                {`Triangles ${triangles}`}
                <br />
                {`FPS ${stats.fps}`}
            </p>
        </div>
    )
}




export const useLogger = () => {
    const [stats, setStats] = useState<stats>()

    return {
        LoggerDisplay: () => <Stats stats={stats} />,
        LoggerRecorder: () => <Logger updateStats={setStats} />
    }
}