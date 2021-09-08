import React, { useEffect, useState } from 'react'
import { fetchData } from "../utils/fetchApi"
import { PieChart, Pie,Cell, Sector, Label, ResponsiveContainer } from "recharts"


function Score (){

    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        async function getData (){
            try { 
                const scoreData = await fetchData("http://localhost:3000/" , "user/18")
                setData([scoreData.data, {score : 1 - scoreData.data.score}])
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            }
        }
        getData()
    },[])

    
    const COLORS = ['#FF0000', '#FBFBFB'];

    return (
        errorMessage === "" && !isDataLoading ?  (
            <ResponsiveContainer width="33%" height={263} className="PieChart-container">
                <PieChart>
                    <Pie
                       data={datas}
                       cx="50%"
                       cy="50%"
                       innerRadius={70}
                       outerRadius={80}
                       cornerRadius={50}
                       startAngle={90}
                       endAngle={-270}
                       fill={COLORS[0]}
                       dataKey="score"
                    >
                    {datas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}  />
                    ))}
                    <Label value={datas[0].score*100 + "%"} position="center" fontSize={26} fontWeight={700} dy={-10}/>
                    <Label value="de votre objectif" position="centerTop" dy={10}  width={100} fill="#282D30" />
                    </Pie>
                </PieChart>
        </ResponsiveContainer>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default Score