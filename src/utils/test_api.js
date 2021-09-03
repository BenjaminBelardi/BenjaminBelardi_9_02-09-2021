//import { useEffect, useState } from "react"



export const getApi = async (url, endPoint) => {
    let response = await fetch(url + endPoint)
    let data = await response.json()
    console.log("get data API")
    console.log(response)
    return data
}


// function API(){

// const [data, setData] = useState({})
// const [isDataLoading , setDataloading] = useState(false)
// const [error, setError] = useState(null)

//     useEffect(()=>{
//         async function getData (url, endPoint) {
//             try{
//                 const response = await fetch(url + endPoint)
//                 const {data} = await response.json()
//                 setData(data)

//             } catch (err){
//                 console.log(err)
//                 setError(true)
//             } finally{
//                 setDataloading(true)
//             }
//         }
//         getData()
//     }, [])

//     return(
//         null
//     )

// }

// export default API