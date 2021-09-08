import React from "react"
import SportNav from '../components/SportNav';
import RadarPerf from '../components/RadarChart';
import AverageSession from '../components/LineChart';
import Score from '../components/PieChart';
import DaylyActivity from '../components/BarChart';

function Accueil () {


    return (
        <div>
            <SportNav />
            <div>
                <DaylyActivity />
                <AverageSession />
                <RadarPerf />
                <Score />
            </div>
        </div>
        

    )
}

export default Accueil
