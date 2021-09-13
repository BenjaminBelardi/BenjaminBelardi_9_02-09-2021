import React, { useEffect, useState } from 'react'
import { fetchData } from "../utils/fetchApi"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import '../style/BarChart.css'


function DaylyActivity (){

    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const COLORS = ['#282D30', '#E60000'];

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
        value = value === "kilogram" ? "Poids (kg)" : "Calories brûlées (Kcal)"
        return <span style={style}>{value}</span>
    }

   
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="barChart-custom-tooltip">
              <p className="barChart-custom-tooltip__label">{`${payload[0].value}kg`}</p>
              <p className="barChart-custom-tooltip__label">{`${payload[1].value}Kcal`}</p>
            </div>
          );
        }
        return null;
      };

    return (
        console.log(datas),
        errorMessage === "" && !isDataLoading ?  (
            <div className="barChart-container">
                <h4 className="barChart-title">Activité quotidienne</h4>
                <ResponsiveContainer width="100%" height="100%" >
                <BarChart
                    title="test"
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
            <Tooltip content={<CustomTooltip />}/>
            <Legend verticalAlign="top" align="right" iconType="circle" formatter={renderColorLegentText} wrapperStyle={{paddingBottom: '50px' , paddingTop: '24px'}}/>
            <Bar dataKey="kilogram" fill={COLORS[0]} barSize={7} barCategoryGap={50} radius={[3,3,0,0]}/>
            <Bar dataKey="calories" fill={COLORS[1]}  barSize={7}  radius={[3,3,0,0]} />
            </BarChart>   
            </ResponsiveContainer>
        </div>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default DaylyActivity