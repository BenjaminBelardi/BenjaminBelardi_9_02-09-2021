import React, { useEffect, useState } from 'react'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getApi } from '../utils/test_api';

    // const [data, setData] = useState({})
// const [isDataLoading , setDataloading] = useState(false)
// const [error, setError] = useState(null)

//     useEffect(()=>{
//         async function getData (url, endPoint) {
//             try{
//                 const response = await fetch(url + endPoint)
//                 const {data} = await response.json()
//                 setData(data)

//             } catch (err){
//                 console.log(err)
//                 setError(true)
//             } finally{
//                 setDataloading(true)
//             }
//         }
//         getData()
//     }, [])


function RadarPerf (){

    const [datas , setData] = useState({})
    const [isDataLoading , setDataloading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(()=>{
        async function getData (){
            try { 
                const perfDatas = await getApi("http://localhost:3000/" , "user/18/performance")
                setData(perfDatas.data)
                console.log("promesse ok")
                console.log(datas)
            } catch (error){
                console.log(error)
                setError(true)
            } finally{
                setDataloading(true)
            }
        }
        getData()
    }, [])
        

    return (
        console.log("dtatest" + datas),
        datas && (
            <ResponsiveContainer width={500} height={500}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%"  data={datas.data}>
                    <PolarGrid gridType='polygon'/>
                    <PolarAngleAxis dataKey="kind" />
                    <PolarRadiusAxis domain={[0,280]} tick={false} axisLine={false}/>
                    <Radar name="18" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
           </ResponsiveContainer>
        )
        
    )
}

export default RadarPerf