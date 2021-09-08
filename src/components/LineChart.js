import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/fetchApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label,Text, ResponsiveContainer } from 'recharts';
import '../style/LineChart.css'

function AverageSession (){

    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        async function getData (){
            try { 
                const sessionsDatas = await fetchData("http://localhost:3000/" , "user/18/average-sessions")
                setData(sessionsDatas.data.sessions)
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
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
        7: "D",
    }

    const formatXaxis = (tickItem) => {
            return day[tickItem]
        }
        

    return (
        errorMessage === "" && !isDataLoading ?  (
            <ResponsiveContainer width="33%" height={263} className="lineChart-container">
                <LineChart data={datas}
                           margin={{left :-50 , right: 10}} 
                           width="100%"
                           >
                    <YAxis domain={['dataMin - 5','dataMax + 20']} 
                           axisLine={false} 
                           tick={false}
                        //    label={{value: 'durée moyenne des sessions', position:"insideTopLeft", offset: 50 }}
                           />
                    <XAxis dataKey="day" type={'category'} tickFormatter={formatXaxis} axisLine={false} tickLine={false} stroke="#fff" tickMargin={0}/>
                    <Line name="Durée moyenne des sessions" 
                          type="monotone" 
                          dataKey="sessionLength" 
                          stroke="#fff" 
                          strokeWidth={2} 
                          dot={false}
                    />
                </LineChart>  
                
           </ResponsiveContainer>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default AverageSession