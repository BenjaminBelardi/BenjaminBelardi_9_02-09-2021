import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/fetchApi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
        const CustomTooltip = ({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="lineChart-custom-tooltip">
                  <p className="lineChart-custom-tooltip__label">{`${payload[0].value} min`}</p>
                </div>
              );
            }
            return null;
          };
        

    return (
        errorMessage === "" && !isDataLoading ?  (
            <div className='lineChart-container'>
                <h4 className='lineChart-title'>Durée moyenne des sessions</h4>
                <ResponsiveContainer width="100%" height="100%" className="lineChart-container">
                    <LineChart data={datas}
                            margin={{left :-50 , right: 10}} 
                            width="100%"
                            >
                        <YAxis domain={['dataMin - 5','dataMax + 20']} 
                            axisLine={false} 
                            tick={false}
                            dataKey="sessionLength"
                            type={'number'}
                            />
                        <XAxis dataKey="day" 
                            type={'category'} 
                            tickFormatter={formatXaxis} 
                            axisLine={false} 
                            tickLine={false} 
                            stroke="#fff" 
                            tickMargin={0}/>

                        <Tooltip  cursor={false}  content={<CustomTooltip />} />
                        <Line name="Durée moyenne des sessions" 
                            type="monotone" 
                            dataKey="sessionLength" 
                            stroke="#fff" 
                            strokeWidth={2} 
                            dot={false}
                        />
                    </LineChart>  
                    
            </ResponsiveContainer>
           </div>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default AverageSession