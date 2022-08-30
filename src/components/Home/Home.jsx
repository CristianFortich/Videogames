import React, { Component } from 'react'
import {connect} from 'react-redux'
import {searchGames, getAllGames, organizeGames, deleteGame, updatePages, setPage, cgSwitch, aboutSwitch} from "../../redux/actions"
import GameCard from '../GameCard/GameCard'
import loadingImage from '../../pics/loading02.gif'
import Draggable from "react-draggable"
import SearchBar from '../SearchBar/SearchBar'
import homeStyle from './Home.module.css'
import CreateGame from '../CreatGame/CreateGame'
import About from '../About/About'

export class Home extends Component {
  async componentDidMount(){
    await this.props.getAllGames();
    this.props.updatePages();
    console.log(this.props.genres)
  }

  
  render() {
    const changePage = (e)=>{
      e.preventDefault();
      this.props.setPage(e.target.name);
    }
    const createGameSwitch = (e)=>{
      this.props.cgSwitch(this.props.switch)
    }
    const handleAboutSwitch = (e)=>{
      console.log(this.props.about)
      this.props.aboutSwitch(this.props.about)
    }
    return (
      <div className={homeStyle.mainbox}>
        <p>.</p>
        <div className={homeStyle.topBox}>
          <p className={homeStyle.logo}>Home</p>
          <button className={homeStyle.createGameB} onClick={(e)=>createGameSwitch(e)}>Create Game</button>
          <button className={homeStyle.createGameB} onClick={(e)=>handleAboutSwitch(e)}>About</button>
          <SearchBar/>
        </div>
        <Draggable>
          <div className={homeStyle.about}>
            {this.props.about?<About/>:null}
          </div>
        </Draggable>
        <Draggable>
          <div className={homeStyle.CreateGame}>
            {this.props.switch?<CreateGame genres={this.props.genres}/>:null}
          </div>
        </Draggable>
        <div className={homeStyle.container}>
          {this.props.games.length > 0 ? this.props.pages.filter(g=>g.page == this.props.page).map((p) => {
            return (
              <GameCard  key={p.game.id} id={p.game.id} name={p.game.name} released={p.game.released} genres={p.game.genres} image={p.game.background_image} />
              );	
            }): <img className={homeStyle.loading} src={loadingImage} alt='Loading...'></img>}
        </div>
        <div className={homeStyle.pages}>
          {this.props.pages.length > 0 ? this.props.buttonPage.map((b)=>{
            return (
              <button className={homeStyle.pageButtons} onClick={(e)=>changePage(e)} name={b}>{b}</button>
            )
          }): (<p>...</p>)
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state)=>{
  return {
    games: state.games,
    pages: state.pages,
    page: state.page,
    buttonPage: state.buttonPage,
    genres: state.genres,
    switch: state.switch,
    about: state.about
  }
}

export const mapDispatchToProps = (dispatch)=>{
  return {
    getAllGames: () => dispatch(getAllGames()),
    searchGames: (info) => dispatch(searchGames(info)),
    organizeGames: (info) => dispatch(organizeGames(info)),
    deleteGame: (id) => dispatch(deleteGame(id)),
    updatePages: () => dispatch(updatePages()),
    setPage: (pageNumber) => dispatch(setPage(pageNumber)),
    cgSwitch: (data)=> dispatch(cgSwitch(data)),
    aboutSwitch: (data)=> dispatch(aboutSwitch(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)