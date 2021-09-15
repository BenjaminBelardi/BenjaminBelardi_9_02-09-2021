import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchData } from "../utils/fetchApi"
import { PieChart, Pie,Cell, Label, ResponsiveContainer } from "recharts"
import '../style/PieChart.css'


function Score (props){

    const { urlBase, userId} = props
    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const COLORS = ['#FF0000', '#FBFBFB'];


    useEffect(()=>{
        async function getData (){
            try { 
                const scoreData = await fetchData(urlBase , "user/" + userId)
                setData([scoreData.data, {score : 1 - scoreData.data.score}])
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            }
        }
        getData()
    },[urlBase,userId])

    
    
    return (
        errorMessage === "" && !isDataLoading ?  (
            <ResponsiveContainer width="100%" height="100%" className="PieChart-container">
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
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index]}  
                            />
                        ))}
                        <Label 
                            value={datas[0].score*100 + "%"} 
                            position="center" 
                            fontSize={26} 
                            fontWeight={700} dy={-10}
                        />
                        <Label 
                            value="de votre objectif" 
                            position="centerTop" dy={10}  
                            width={100} fill="#74798C" 
                            fontSize={16}
                            fontWeight={500}
                        />
                    </Pie>
                </PieChart>
        </ResponsiveContainer>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

Score.propTypes = {
    urlBase: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
}
export default Score