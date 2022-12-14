import React from 'react'
import {searchGames, organizeGames, updatePages, setPage, resetAll} from "../../redux/actions"
import { useDispatch } from 'react-redux';
import searchStyle from './SearchBar.module.css';

function SearchBar() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    toSearch: '',
    order: 'descend',
    orderBy: 'name',
    filter: "both"
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const order = async (e) => {
    e.preventDefault();
    await dispatch(organizeGames({order: state.order, orderBy: state.orderBy}))
    dispatch(updatePages(state.filter))
  }

  const search = async (e) => {
    e.preventDefault();
    dispatch(resetAll())
  	await dispatch(searchGames(state.toSearch.toLowerCase()));
    await dispatch(updatePages(state.filter))
    dispatch(setPage(1))
  }
  return (
    <div className={searchStyle.mainBox}>
      <div className={searchStyle.searcher}>
        <input type="text" placeholder="Search game.." value={state.toSearch} onChange={handleChange} name="toSearch"/>
        <button type="submit" className={searchStyle.button} onClick={search}>Search</button>
      </div>
      <div className={searchStyle.filter}>
        <select className='' onChange={handleChange} name="filter">
          <option selecter="yes" value={"both"}>Both</option>
          <option value={"added"}>Added</option>
          <option value={"existent"}>Existent</option>
        </select>
        <select onChange={handleChange} name="order">
          <option selecter="yes" value={"descend"}>Descendent</option>
          <option value={"ascend"}>Ascendent</option>
        </select>
        <select onChange={handleChange} name="orderBy">
          <option selecter="yes" value={"name"}>Name</option>
          <option value={"rating"}>Rating</option>
        </select>
        <button className={searchStyle.button} onClick={order}>Filter</button>
      </div>
    </div>
    )
}

export default SearchBar