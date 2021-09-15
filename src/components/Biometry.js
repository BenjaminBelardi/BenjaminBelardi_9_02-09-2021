import React from "react"
import PropTypes from 'prop-types'
import '../style/Biometry.css'



function Biometry (props){
    const {icon, value, unit, type} = props
 return(
    <aside className="biometry-thumb-container">
        {icon}
        <div className="biometry-info">
            <span className="biometry-value">{value}{unit}</span>
            <span className="biometry-type">{type}</span>
        </div>
    </aside>
 )
}

Biometry.propTypes = {
    icon: PropTypes.object,
    value: PropTypes.number,
    unit: PropTypes.string,
    type: PropTypes.string
}

export default Biometry