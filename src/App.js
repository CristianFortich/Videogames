import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import './App.css';
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import DetailedGame from "./components/DetailedGame/DetailedGame"
import {getAllGenres} from './redux/actions'
import { useDispatch } from 'react-redux';


// let info;
function App() {
  const dispatch = useDispatch();
  React.useEffect(async ()=>{
    dispatch(getAllGenres())
  },[])

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} render={()=><LandingPage/>}/>
        <Route exact path={'/home'} render={()=><Home/>}/>
        <Route path={'/videogame/:id'} render={()=><DetailedGame/>}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;