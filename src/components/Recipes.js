import React from 'react'
import style from '../recipes.module.css'

export const rounding = (number) => {
    // if(typeof(number) == number){
       let fixed = number.toFixed(3);
    return parseFloat(fixed) 
    
    // return number
}

function Recipes(props) {
const ingriediantsArray = props.ingredients.map(ing => <li style={{maxWidth:'380px', paddingRight:'4px'}}>{ing.text}</li>)
    return (
       <>
       <div className={`${style.recipes} ${style.example}`}>
            <h2 style={{marginLeft:"12px",maxWidth:'380px'}}>{props.title}</h2>
            <h2 style={{marginLeft:"12px"}}>Ingredients</h2>
            <ul>
                {ingriediantsArray}
            </ul>
                <p style={{marginLeft:"12px"}}> <strong>Calories</strong> : {rounding(props.calories) }</p>
            <img src={props.image} alt={props.title}/>
            
       </div>
       
       </>
    )
}

export default Recipes
