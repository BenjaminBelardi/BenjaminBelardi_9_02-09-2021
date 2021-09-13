import React, { useEffect, useState  } from "react";
import '../style/Home.css';
import SportNav from '../components/SportNav';
import RadarPerf from '../components/RadarChart';
import AverageSession from '../components/LineChart';
import Score from '../components/PieChart';
import DaylyActivity from '../components/BarChart';
import Biometry from "../components/Biometry";
import {ReactComponent as Calories} from '../assets/biometry/calories-icon.svg'
import {ReactComponent as Proteines} from '../assets/biometry/proteines-icon.svg'
import {ReactComponent as Glucides} from '../assets/biometry/glucides-icon.svg'
import {ReactComponent as Lipides} from '../assets/biometry/lipides-icon.svg'

import { fetchData } from '../utils/fetchApi';

function Home () {

        const [userDatas , setUserData] = useState({})
        const [isDataLoading , setDataloading] = useState(true)
        const [errorMessage, setErrorMessage] = useState("")
    
        useEffect(()=>{
            async function getData (){
                try { 
                    const userMainDatas = await fetchData("http://localhost:3000/" , "user/18")
                    setUserData(userMainDatas.data)
                    setDataloading(false)
                } catch (error){
                    setErrorMessage(error.message)
                }
            }
            getData()
        }, [])

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

        // const addBiometricComponant = (biometricData) => {
        //     Object.keys(biometricData).forEach(data => {
        //         return (
        //             <Biometry icon={<Calorie />}  value={biometricData[data]} unit={typeUnit[data].unit} type={typeUnit[data].type}/>
        //         )
        //     });
        // }

    return (
        console.log(userDatas.keyData),
        errorMessage === "" && !isDataLoading ?  (
        <main className="main-container">
            <SportNav />
            <article className="article-container">
                <div className="title-container">
                    <h1>Bonjour <span>{userDatas.userInfos.firstName}</span></h1>
                    <h3>Félicitation ! Vous avez explosé vos objectifs hier &#128079;</h3>
                </div>
                <section className="userStat-container">
                    <DaylyActivity />
                    <AverageSession />
                    <RadarPerf />
                    <Score />
                </section>
                <aside className="biometry-container">
                {Object.keys(userDatas.keyData).map(data => {
                    const IconType = typeUnit[data].componant
                    return (
                        <Biometry icon={<IconType />}  value={userDatas.keyData[data]} unit={typeUnit[data].unit} type={typeUnit[data].type}/>
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
