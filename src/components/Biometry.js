import React from "react"
import PropTypes from 'prop-types'
import '../style/Biometry.css'


/**
 * Component for showing the the biometry of the user 
 * @component 
 * @param {component} props.icon Icon's svg component
 * @param {number} props.value User's biometry value
 * @param {string} props.unit User's biometry unit
 * @param {string} props.type User's biometry type
 * @returns {component}
 *  <Biometry key={typeUnit[data].type} icon={<IconType />}  value={userDatas.keyData[data]} unit={typeUnit[data].unit} type={typeUnit[data].type}/>
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