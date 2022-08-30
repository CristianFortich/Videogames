import React from 'react'
import createGameStyle from './CreateGame.module.css';
import {cgSwitch, getAllGames, updatePages, setPage, resetAll} from "../../redux/actions"
import { useDispatch } from 'react-redux';


function CreateGame(props) {

  const [state, setState] = React.useState({
    name: '',
    description: '',
    released: "",
    rating: 0,
    genre: [],
    platform: [],
    genres: [],
    platforms: ['nintendo', 'pc', 'xbox', 'sega', 'playstation'],
    error: {ok:true, message:""}
  });

  React.useEffect(async ()=>{
    console.log(props.genres)
    setState(
      {...state, genres: props.genres} 
    )
  },[])

  const dispatch = useDispatch();
  const close = ()=>{
    dispatch(cgSwitch(true))
  }

  const validate = ()=>{
    if(state.released == ""){
      return {ok: false, message: "Select the released date"}
    }
    if(state.genre.length == 0){
      return {ok: false, message: "Select one or more genres"}
    }
    if(state.platform.length == 0){
      return {ok: false, message: "Select one or more platforms"}
    }
    return {ok:true, message: "Ready to submit"}
  }

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  

  const genreHandleChange = (e)=>{
    if(e.target.value != 20){
      if(!state.genre.includes(e.target.value)){
        let aux = [] 
        aux = [...aux,...state.genre]
        aux.push(e.target.value)
        setState({...state, genre: aux})
      }else{
        let aux = state.genre.filter(value =>value !== e.target.value)
        setState({...state, genre: aux})
      }
    }
  }

  const platformHandleChange = (e) =>{
    if(e.target.value != "..."){
      if(!state.platform.includes(e.target.value)){
        let aux = []
        aux = [...aux, ...state.platform]
        aux.push(e.target.value)
        setState({...state, platform: aux})
      }else{
        let aux = state.platform.filter(value =>value !== e.target.value)
        setState({...state, platform: aux})
      }
    }
  }
{

}
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = validate()
    if(!validation.ok){
      setState({...state, error: {ok: validation.ok, message: validation.message}})
    }else{
      setState({...state, error: {ok: validation.ok, message: validation.message}})
      fetch('https://videogame-fortich-api.herokuapp.com/videogames', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: state.name.toLowerCase(),
          description: state.description,
          released: state.released,
          rating: state.rating,
          genres: state.genre,
          platforms: state.platform.join(', ')
        })
      }).then(async response=>{
        dispatch(resetAll())
        await dispatch(getAllGames())
        await dispatch(updatePages())
        dispatch(setPage(1))
        dispatch(cgSwitch(true))
      })
    }

  };

  return (
    <div className={createGameStyle.mainBox}>
      <button className={createGameStyle.close} onClick={()=>close()}>x</button>
      <div>
        <p className={createGameStyle.name}>Create Game</p>
      </div>
      <form onSubmit={handleSubmit} id="createGame">
        <div className={createGameStyle.divBox}>
          <label>{`Name: `}</label>
          <input type='text' name='name' value={state.name} onChange={handleChange} />
        </div>
        <div className={createGameStyle.divBox}>
          <label>{`Description: `}</label>
          <textarea className={createGameStyle.inputText} name='description' onChange={(e) => handleChange(e)}></textarea>
        </div>
        <div className={createGameStyle.divBox}>
          <label>{`Rating: `}</label>
          <input type='number' name='rating' value={state.rating} onChange={handleChange} min={0} max={5} />
        </div>
        <div className={createGameStyle.divBox}>
          <label>{`Release date: `}</label>
          <input type='date' name='released' value={state.released} placeholder="01/01/2020" onChange={handleChange} />
        </div>
        <div className={createGameStyle.divBox}>
          <label>{`Genre: `}</label>
          <select form='createGame' onChange={(e)=>genreHandleChange(e)}>
            <option selected disabled hidden>...</option>
            {state.genres.map(e=>{
              return (<option value={e.id}>{e.name}</option>);
            })
          }
          </select>
          <p className={createGameStyle.pSelect}>{state.genre.map(g=>g==state.genres[g-1].id? state.genres[g-1].name:null).join(', ')}</p>
        </div>
        <div className={createGameStyle.divBox}>
          <label>{`Platforms: `}</label>
          <select form='createGame' onChange={e=>platformHandleChange(e)}>
            <option selected disabled hidden>...</option>
            {state.platforms.map(p=>{
              return (<option>{p}</option>)
            })}
          </select>
          <p className={createGameStyle.pSelect}>{state.platform.join(', ')}</p>
        </div>
        <button className={createGameStyle.button} type='submit' onClick={(e)=>handleSubmit(e)}>Create Product</button>
        {state.error.ok ? null: (<div className={createGameStyle.error} id="error"><p>{state.error.message}</p></div>)}
      </form>
    </div>
  );
}

export default CreateGame
