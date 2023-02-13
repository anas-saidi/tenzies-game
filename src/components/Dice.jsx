import React from 'react'
import '../index.css'
export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
return (
    <div className="dice" onClick={props.holdDice} style={styles}>
        <h2 className="dice--number"> {props.value}</h2>
    </div>
    
    )


}