import React, { useEffect, useState } from 'react'
import { getApi } from '../utils/test_api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label,Text, ResponsiveContainer } from 'recharts';
import '../style/LineChart.css'

function AverageSession (){

    const [datas , setData] = useState({})
    const [isDataLoading , setDataloading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(()=>{
        async function getData (){
            try { 
                const perfDatas = await getApi("http://localhost:3000/" , "user/18/average-sessions")
                setData(perfDatas.data.sessions)
                console.log("promesse linechart ok")
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

    const day = {
        1: "L",
        2: "M",
        3: "M",
        4: "J",
        5: "V",
        6: "S",
        7: "D"
    }

    const formatXaxis = (tickItem) => {
            return day[tickItem]
        }
        

    return (
        datas && (
            <ResponsiveContainer width={500} height={500} className="lineChar-container">
                <LineChart width={300} height={100} data={datas}>
                    <YAxis domain={['dataMin - 5','auto']} axisLine={false} tick={false} />
                    <XAxis dataKey="day" type={'category'} tickFormatter={formatXaxis} axisLine={false} tickLine={false} stroke="#fff"/>
                    <Legend verticalAlign="top" height={0}/>
                    <Line name="Durée moyenne des sessions" type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} />
                </LineChart>
                
           </ResponsiveContainer>
        )
        
    )
}

export default AverageSession