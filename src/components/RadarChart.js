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

    return (
        errorMessage === "" && !isDataLoading ? (
            <ResponsiveContainer width={500} height={500}className="RadarChart-container">
                <RadarChart cx="50%" cy="50%" outerRadius="80%"  data={datas.data}>
                    <PolarGrid gridType='polygon'/>
                    <PolarAngleAxis dataKey="kind" />
                    <PolarRadiusAxis domain={[0,280]} tick={false} axisLine={false}/>
                    <Radar name="18" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
           </ResponsiveContainer>
        ) : (
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
        
    )
}

export default RadarPerf