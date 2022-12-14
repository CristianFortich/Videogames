import React, { Component } from 'react'
import {connect} from 'react-redux'
import {searchGames, getAllGames, organizeGames, deleteGame, updatePages, setPage, cgSwitch, aboutSwitch, resetAll} from "../../redux/actions"
import GameCard from '../GameCard/GameCard'
import loadingImage from '../../pics/loading02.gif'
import Draggable from "react-draggable"
import SearchBar from '../SearchBar/SearchBar'
import homeStyle from './Home.module.css'
import CreateGame from '../CreatGame/CreateGame'
import About from '../About/About'
import logo from '../../pics/consileico.webp'

export class Home extends Component {
  async componentDidMount(){
    await this.props.getAllGames();
    this.props.updatePages();
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
    const handleLogo = async ()=>{
      this.props.resetAll()
      await this.props.getAllGames();
      this.props.updatePages();
      this.props.setPage(1)
    }
    return (
      <div className={homeStyle.mainbox}>
        <p>.</p>
        <div className={homeStyle.topBox}>
          <div className={homeStyle.homeButtons}>
            <img onClick={()=>handleLogo()} src={logo} className={homeStyle.logo}/>
            {/* <p className={homeStyle.logo}>Home</p> */}
            <div className={homeStyle.divButtons}>
              <button className={homeStyle.createGameB} onClick={(e)=>createGameSwitch(e)}>Create Game</button>
              <button className={homeStyle.createGameB} onClick={(e)=>handleAboutSwitch(e)}>About</button>
            </div>
          </div>
          <div className={homeStyle.divSearch}>
            <SearchBar/>
          </div>
        </div>
          <div className={homeStyle.about}>
            {this.props.about?<About/>:null}
          </div>
        <Draggable>
          <div className={homeStyle.CreateGame}>
            {this.props.switch?<CreateGame genres={this.props.genres}/>:null}
          </div>
        </Draggable>
        {this.props.games.length > 0 ? null:
          <div className={homeStyle.pImg}>
            <img className={homeStyle.loading} src={loadingImage} alt='Loading...'></img>
          </div>
        }
          <div className={homeStyle.container}>
            {this.props.games.length > 0 ? this.props.pages.filter(g=>g.page == this.props.page).map((p) => {
              return (
                <GameCard  key={p.game.id} id={p.game.id} name={p.game.name} released={p.game.released} genres={p.game.genres} image={p.game.background_image} />
                );	
              }):null}
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
    aboutSwitch: (data)=> dispatch(aboutSwitch(data)),
    resetAll: ()=> dispatch(resetAll())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)