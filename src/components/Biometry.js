import React from "react"
import PropTypes from 'prop-types'
import '../style/Biometry.css'


/**
 * Component for showing the user's biometry
 * @component 
 * @return {component} 
 * 
 */
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
    /**
     * Biometry Icon
     */
    icon: PropTypes.object,
    /**
     * User's biometry value
     */
    value: PropTypes.number,
    /**
     * Biometry unit
     */
    unit: PropTypes.string,
    /**
     * Biometry type
     */
    type: PropTypes.string
}

export default Biometry