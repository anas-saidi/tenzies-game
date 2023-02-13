import React from 'react'
import Dice from './Dice'
import '../index.css'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App(){
/**
 * Challenge: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 * 
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 */

const [diceList,setDiceList]= React.useState(allNewDice())
const [tenzies,setTenzies] = React.useState(false)
React.useEffect(()=>{
    const allHeld = diceList.every(dice => dice.isHeld)
    const allSameValue = diceList.every(dice => dice.value === diceList[0].value)
    if(allHeld && allSameValue) 
    {
        setTenzies(true)
    }
},[diceList])
function createDice(){
   return {value:Math.ceil(Math.random()*6),isHeld:false,
        id:nanoid(),
        }
}
function rollDice(){
    if(tenzies){
        setDiceList(allNewDice())
        setTenzies(false)
    }
    else {
    setDiceList(prevList => 
        prevList.map((dice)=> dice.isHeld ? dice : createDice())
    )
    }
    
}
function holdDice(id){
setDiceList((prevList)=> prevList.map(dice=> dice.id===id ? {...dice, isHeld:!dice.isHeld} : dice))
}
function allNewDice(){
    const randomArray = []
    for(let i=0;i<10;i++){
        randomArray.push(createDice())
    }
    return randomArray
}

const diceElements = diceList.map((dice)=> <Dice  key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={()=>holdDice(dice.id)}/>)
return (
    
    <main className='main'>
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
        {diceElements}
    </div>
    {tenzies && <Confetti />}
    <button className="btn btn--roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>)


}