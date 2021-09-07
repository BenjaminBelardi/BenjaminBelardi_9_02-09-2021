

export const fetchData = async (url, endPoint) => {
        const response = await fetch(url + endPoint)
        const jsonData = await response.json()
        if (typeof jsonData !== "object"){
            throw new Error(jsonData)
        }
        return jsonData
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