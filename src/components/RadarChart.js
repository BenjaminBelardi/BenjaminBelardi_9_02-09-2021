import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { fetchData } from '../utils/fetchApi';
import '../style/RadarChart.css'

    
/**
 * Component showing the user's activity type in radr chart
 * @component 
 * @param {string} props.urlBase  Url base to call API
 * @param {number} props.userID User's ID 
 * @returns {component}
 *  <RadarPerf urlBase={URL_BASE} userId={USER_ID}/>
 */
function RadarPerf (props){

    const { urlBase, userId} = props
    const [datas , setData] = useState({})
    const [isDataLoading , setDataloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    /* call the user performance data from the API */
    useEffect(()=>{
        async function getData (){
            try { 
                const perfDatas = await fetchData(urlBase , "user/"+ userId + "/performance")
                setData(perfDatas.data)
                setDataloading(false)
            } catch (error){
                setErrorMessage(error.message)
            } 
        }
        getData()
    }, [urlBase,userId])
     
    
    /**
     * Transform the first string character to uppercase
     * @param {string} str 
     * @returns {string} string with the first charater to uppercase
     */
    function strUcFirst(str){
        return (str +'').charAt(0).toLocaleUpperCase() + str.substr(1)
    }

    /**
     * Converted the default radar chart polar axis value
     * @param {string} tickItem default radar chart polar axis value 
     * @returns a new polar axis value diffined in the datas.king object
     */
    const formatPolarAxis = (tickItem) => { 
            return strUcFirst(datas.kind[tickItem])
    }

    return (
        errorMessage === "" && !isDataLoading ? (
            <ResponsiveContainer 
                width="100%" 
                height="100%" 
                className="RadarChart-container"
            >
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%"  
                    data={datas.data}
                >
                    <PolarGrid gridType='polygon'/>
                    <PolarAngleAxis 
                        dataKey="kind" 
                        type='category' 
                        tickFormatter={formatPolarAxis} 
                        stroke="#fff" 
                        tickLine={false} 
                        fontSize={10}
                    />
                    <PolarRadiusAxis 
                        domain={[0,300]} 
                        tick={false} 
                        axisLine={false} 
                        tickCount={6}/>
                    <Radar 
                        name="18" 
                        dataKey="value" 
                        fill="#FF0101" 
                        fillOpacity={0.7} 
                    />
                </RadarChart>
           </ResponsiveContainer>
        ) : (
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
        
    )
}

RadarPerf.propTypes = {
    /**
     * Url base to call the API
     */
    urlBase: PropTypes.string.isRequired,
    /**
     * User's ID
     */
    userId: PropTypes.number.isRequired
}

export default RadarPerf