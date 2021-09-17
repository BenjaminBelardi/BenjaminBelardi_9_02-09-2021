/**
 * Call the SportSee API
 * @function
 * @param {string} url url base of the API ex: http://localhost.com:3000
 * @param {string} endPoint the End Point of the url to get the specific data ex: /user/:id
 * @returns {object} user's data requested
 */
export const fetchData = async (url, endPoint) => {
        const response = await fetch(url + endPoint)
        const jsonData = await response.json()
        if (typeof jsonData !== "object"){
            throw new Error(jsonData)
        }
        return jsonData
}
