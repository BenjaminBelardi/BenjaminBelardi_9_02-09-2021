import React, { useEffect, useState } from 'react'
import { fetchData } from "../utils/fetchApi"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../style/DaylyActivity.css'


function DaylyActivity (){

    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        async function getData (){
            try { 
                const activityData = await fetchData("http://localhost:3000/" , "user/18/activity")
                setData(activityData.data.sessions)
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            }
        }
        getData()
    },[])

    const renderColorLegentText = (value) => {
        const style  = {color : "#74798C",
                        fontSize : "14px"
                        }

        return <span style={style}>{value}</span>
    }

    const COLORS = ['#282D30', '#E60000'];

    return (
        console.log(datas),
        errorMessage === "" && !isDataLoading ?  (
            <ResponsiveContainer width="100%" height="100%" className="BarChart-container">
            <BarChart
                // width={500}
                height={263}
                data={datas}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 10,
                }}
            >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontalPoints={[]}/>
          <XAxis dataKey="day" tickCount={3} />
          <YAxis orientation="right" dataKey="calories" tickCount={3}/>
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="circle" formatter={renderColorLegentText} wrapperStyle={{paddingBottom: '50px'}}/>
          <Bar dataKey="kilogram" fill={COLORS[0]} barSize={7} barCategoryGap={50} radius={[3,3,0,0]}/>
          <Bar dataKey="calories" fill={COLORS[1]}  barSize={7}  radius={[3,3,0,0]} />
        </BarChart>   
        </ResponsiveContainer>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default DaylyActivity