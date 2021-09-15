import React, { useEffect, useState } from 'react'
import { fetchData } from "../utils/fetchApi"
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import '../style/BarChart.css'

/* Componant DaylyActivity who used Bar Chart from Recharts library */
function DaylyActivity (props){

    const { urlBase, userId} = props
    const [datas , setData] = useState([])
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const COLORS = ['#282D30', '#E60000'];

    useEffect(()=>{
        async function getData (){
            try { 
                const activityData = await fetchData(urlBase , "user/" + userId + "/activity")
                setData(activityData.data.sessions)
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            }
        }
        getData()
    },[urlBase,userId])



    const renderColorLegentText = (value) => {
        const style  = {color : "#74798C",
                        fontSize : "0.87rem"
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

    /* return the last character of the string */
      const CustomXaxis = (value) => {
          return value.substring(value.length - 1 ,value.length)
      }

    return (
        errorMessage === "" && !isDataLoading ?  (
        <div className="barChart-container">
            <h4 className="barChart-title">Activité quotidienne</h4>
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart
                    title="test"
                    height={263}
                    data={datas}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 10,
                    }}
                >
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        horizontalPoints={[]}
                    />
                    <XAxis 
                        dataKey="day" 
                        tickLine={false} 
                        tickFormatter={CustomXaxis} 
                        tickMargin={10}
                    />
                    <YAxis 
                        orientation="right" 
                        dataKey="calories" 
                        tickCount={3} 
                        tickLine={false} 
                        tickMargin={10}/>
                    <Tooltip 
                        content={<CustomTooltip />}
                    />
                    <Legend 
                        verticalAlign="top" 
                        align="right" 
                        iconType="circle" 
                        formatter={renderColorLegentText} 
                        wrapperStyle={{paddingBottom: '50px' , paddingTop: '24px'}}
                    />
                    <Bar 
                        dataKey="kilogram" 
                        fill={COLORS[0]} 
                        barSize={7} 
                        barCategoryGap={50} 
                        radius={[3,3,0,0]}
                    />
                    <Bar 
                        dataKey="calories" 
                        fill={COLORS[1]}  
                        barSize={7}  
                        radius={[3,3,0,0]}
                    />
                </BarChart>   
            </ResponsiveContainer>
        </div>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

DaylyActivity.propTypes = {
    urlBase: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
}

export default DaylyActivity