import React from "react"
import '../style/Biometry.css'

require.context ('../assets/biometry', true , /\.svg$/)


function Biometry (props){

 return(
    <aside className="biometry-thumb-container">
        {props.icon}
        <div className="biometry-info">
            <span className="biometry-value">{props.value}{props.unit}</span>
            <span className="biometry-type">{props.type}</span>
        </div>
    </aside>
 )
}

export default Biometry