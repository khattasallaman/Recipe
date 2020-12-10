import React, {useEffect, useState, useReducer} from 'react';
import './App.css';
import Recipes from './components/Recipes'
import config from './config'
import Fade from 'react-reveal/Fade';


const initialValues = {
  isLoading:false,
  success:false,
  hits:null,
  errors:''
}
const reducer = (state, action={}) => {
  switch(action.type) {
    case "isLoading":
      return {...state, isLoading:true, success:false}
    case "SUCCESS":
      return {...state, isLoading:false, hits:action.payload, errors:'', success:true}
    case "FAILURE":
      return {...state, isLoading:false, hits:'', errors:action.payload, success:false }
    default:
      return initialValues
  }

}


function App() {

  const [recipe, dispatch] = useReducer(reducer, initialValues)



  const [inputChange, setInputChange] = useState('');
  const [searchedRecp, setSearchedRecp] =  useState('');

  
  const getRecipes = () => {
    fetch(`https://api.edamam.com/search?q=${inputChange}&app_id=${config.APP_ID}&app_key=${config.APP_KEYS}`
    ).then(res => res.json()).then(res => {
      const hits = res.hits;
      dispatch({type:'SUCCESS', payload:hits}); console.log(hits)}).catch(err=> dispatch({type:'FAILURE', payload:err.message}))
  }


  // useEffect( ()=> {
  //   getRecipes()
  // },[searchedRecp])

  const handleChange = (e)=> {
    e.preventDefault();
    dispatch({type:"isLoading"});
    // setSearchedRecp(inputChange)
    getRecipes()

  }




  return (
    <>

    <div className="App">
      <form onSubmit={handleChange} className="search_form">
        <input className="search_bar" type="text" id="search" name="recipe" value={inputChange} placeholder="Look up recipes" onChange={e=> setInputChange(e.target.value)} />
        <button className="search_button" disabled={inputChange === ""}>Search</button>
      </form>


      <div className="recipes">
          {recipe.isLoading ? <h4>Loading . . .</h4> : recipe.errors ? <h3>
            {recipe.errors}
          </h3> : (recipe.success === true && recipe.hits.length == 0) ? <h3> Sorry No Recipe Found.</h3> : recipe.hits &&
          <Fade bottom>
            {recipe.hits.map(el => <Recipes title={el.recipe.label} key={el.recipe.label} ingredients={el.recipe.ingredients} image={el.recipe.image} calories={el.recipe.calories}/>)}
          </Fade>
          
          }

      </div>
    </div>
    </>
  );
}

export default App;
