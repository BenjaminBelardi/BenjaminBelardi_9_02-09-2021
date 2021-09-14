
/* fetch function to get the data from the API*/
/* this fucntion take 2 inputs parameters :
    url : the url base of the API
    endPoint : the specific endPoint */

export const fetchData = async (url, endPoint) => {
        const response = await fetch(url + endPoint)
        const jsonData = await response.json()
        if (typeof jsonData !== "object"){
            throw new Error(jsonData)
        }
        return jsonData
}
