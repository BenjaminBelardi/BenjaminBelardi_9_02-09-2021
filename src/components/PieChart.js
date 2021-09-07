import React, { useEffect, useState } from 'react'
import { fetchData } from "../utils/fetchApi"
import { PieChart, Pie,Cell, Sector, ResponsiveContainer } from "recharts"


function Score (){

    const [datas , setData] = useState({})
    const [isDataLoading , setDataloading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        async function getData (){
            try { 
                const scoreData = await fetchData("http://localhost:3000/" , "user/18")
                setData(scoreData)
                setDataloading(false)
                console.log(datas)
            } catch (error){
                setErrorMessage(error.message)
            } finally{
                setDataloading(false)
            }
        }
        getData()
    }, [])

    const data02 = [
        { value: 0.3 },
        // { value: 0.7 },
      ];

    const COLORS = ['#FF0000', '#FBFBFB'];

    return (
        errorMessage === "" && !isDataLoading ?  (
            <ResponsiveContainer width={500} height={500} className="PieChart-container">
                <PieChart width={300} height={100} >
                    <Pie
                       data={datas}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       startAngle={90}
                       endAngle={-270}
                       fill="#FF0000"
                       dataKey="score" 
                    >
                    {data02.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
        </ResponsiveContainer>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default Score