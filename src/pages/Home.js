import React, { useEffect, useState  } from "react"
import '../style/Home.css'
import SportNav from '../components/SportNav'
import RadarPerf from '../components/RadarChart'
import AverageSession from '../components/LineChart'
import Score from '../components/PieChart'
import DailyActivity from '../components/BarChart'
import Biometry from "../components/Biometry"
import {ReactComponent as Calories} from '../assets/biometry/calories-icon.svg'
import {ReactComponent as Proteines} from '../assets/biometry/proteines-icon.svg'
import {ReactComponent as Glucides} from '../assets/biometry/glucides-icon.svg'
import {ReactComponent as Lipides} from '../assets/biometry/lipides-icon.svg'
import { fetchData } from '../utils/fetchApi'




/**
 * Component showing the home page
 * @component 
 * @return {component} home page with all user's profil data
 */

function Home () {
        // global const API
        const URL_BASE = "http://localhost:3000/"
        const USER_ID = 18

        const [userDatas , setUserData] = useState({})
        const [isDataLoading , setDataloading] = useState(true)
        const [errorMessage, setErrorMessage] = useState("")
    
        useEffect(()=>{
            async function getData (){
                try { 
                    const userMainDatas = await fetchData(URL_BASE , "user/" + USER_ID )
                    setUserData(userMainDatas.data)
                    setDataloading(false)
                } catch (error){
                    setErrorMessage(error.message)
                }
            }
            getData()
        }, [])

        /* this object allow to create dynamically the Biometry componant with all needs props */ 
        const typeUnit = {
            calorieCount : {
                type : "Calories",
                unit : "Kcal",
                componant : Calories
            },
            proteinCount : {
                type : "Proteines",
                unit : "g",
                componant : Proteines
            },
            carbohydrateCount : {
                type : "Glucides",
                unit : "g",
                componant : Glucides
            },
            lipidCount : {

                type : "Lipides",
                unit : "g",
                componant : Lipides
            }

        }

    return (
        errorMessage === "" && !isDataLoading ?  (
        <main className="main-container">
            <SportNav />
            <article className="article-container">
                <div className="title-container">
                    <h1>Bonjour <span>{userDatas.userInfos.firstName}</span></h1>
                    <h3>Félicitation ! Vous avez explosé vos objectifs hier &#128079;</h3>
                </div>
                <section className="userStat-container">
                    <DailyActivity urlBase={URL_BASE} userId={USER_ID}/>
                    <AverageSession urlBase={URL_BASE} userId={USER_ID}/>
                    <RadarPerf urlBase={URL_BASE} userId={USER_ID}/>
                    <Score urlBase={URL_BASE} userId={USER_ID}/>
                </section>
                <aside className="biometry-container">
                {Object.keys(userDatas.keyData).map(data => {
                    const IconType = typeUnit[data].componant
                    return (
                        <Biometry key={typeUnit[data].type} icon={<IconType />}  value={userDatas.keyData[data]} unit={typeUnit[data].unit} type={typeUnit[data].type}/>
                    )
                })}
                </aside>
            </article>
            
        </main>
        ):(
            errorMessage !== "" ? <div>{errorMessage}</div> : <div>Loading...</div>
        )
    )
}

export default Home
