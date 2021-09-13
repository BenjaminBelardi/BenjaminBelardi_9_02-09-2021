import React, { useEffect, useState } from 'react'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { fetchData } from '../utils/fetchApi';
import '../style/RadarChart.css'

    

function RadarPerf (){

    const [datas , setData] = useState({})
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        async function getData (){
            try { 
                const perfDatas = await fetchData("http://localhost:3000/" , "user/18/performance")
                setData(perfDatas.data)
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            } finally{
                setDataloading(false)
            }
        }
        getData()
    }, [])
        
    // function customGrid(stroke){
    //     return (
    //         <g className="recharts-polar-grid">
    //             <g className="recharts-polar-grid-angle">
    //                 <line stroke={stroke}> </line>
    //             </g>
    //         </g>
    //       )
    // }
    const formatPolarAxis = (tickItem) => { 
            return datas.kind[tickItem]
    }

    return (
        errorMessage === "" && !isDataLoading ? (
            <ResponsiveContainer width="100%" height="100%" className="RadarChart-container">
                <RadarChart cx="50%" cy="50%" outerRadius="70%"  data={datas.data}>
                    <PolarGrid gridType='polygon'/>
                    <PolarAngleAxis dataKey="kind" tickFormatter={formatPolarAxis} stroke="#fff" tickLine={false} fontSize={10}/>
                    <PolarRadiusAxis domain={[0,300]} tick={false} axisLine={false} tickCount={6}/>
                    <Radar name="18" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
           </ResponsiveContainer>
        ) : (
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
        
    )
}

export default RadarPerf