import {GET_ALL_GAMES, ABOUT_SWITCH, SEARCH_GAMES, ORGANIZE_GAMES, DELETE_GAME, UPDATE_PAGES, SET_PAGE, RESET_ALL, GET_ALL_GENRES, CG_SWITCH} from '../actions'

const initialState = {
    games: [],
    pages: [],
    page: 1,
    buttonPage: [],
    genres: [],
    switch: false,
    about: false
};  

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ALL_GAMES:{
        return{
          ...state,
          games: action.payload
        }
      }
      case RESET_ALL:{
        return{
          ...state,
          games: [],
          pages: [],
          page: 1,
          buttonPage: []
        }
      }
      case CG_SWITCH:{
        return{
          ...state,
          switch: action.payload
        }
      }
      case ABOUT_SWITCH:{
        return{
          ...state,
          about: action.payload
        }
      }
      case GET_ALL_GENRES:{
        return{
          ...state,
          genres: action.payload
        }
      }
      case SET_PAGE:{
        return{
          ...state,
          page: action.payload
        }
      }
      case UPDATE_PAGES:{
        return{
          ...state,
          pages: dividePages(filter(action.payload, state.games.map(g=>g))),
          buttonPage: setButtonNumbers(filter(action.payload, state.games.map(g=>g)))
        }
      }
      case SEARCH_GAMES:{
        return{
          ...state,
          games: action.payload
        }
      }
      case ORGANIZE_GAMES:{
        return{
          ...state,
          games: organize(action.payload.order, action.payload.orderBy, state.games.map(g=>g))
        }
      }
      case DELETE_GAME:{
        return{
          ...state,
          games: state.games.filter(e => action.payload !== e.id)
        }
      }
      default: 
        return {...state};
    }
  };

  const filter = (filter, book)=>{
    switch (filter) {
      case "added":
        
        return book.filter(g=> isNaN(parseInt(g.id)))
      case "existent":
        
        return book.filter(g=> !isNaN(parseInt(g.id)))
      default:
        return book
    }
  }

  const setButtonNumbers = (book)=>{
    let chapters = [1]
    let count = 0;
    for (let index = 0; index < book.length; index++) {
      if(((index)%15)==0){
        count++;
        chapters.push(count)
      } 
    }
    return chapters
  }
  
  const dividePages = (book)=>{
    let chapters = []
    let count = 0;
    for (let index = 0; index < book.length; index++) {
      if(((index)%15)==0) count++;
      chapters.push({page: count, game: book[index]})      
    }
    return chapters
  }

  const organize = (order,orderBy,listToOrder)=>{
    let pivot = listToOrder[0];
    let left = [];
    let right = [];
    if(order === 'descend'){
        for(let i = 1;i<listToOrder.length;i++){
          if(orderBy === 'name' ? listToOrder[i][orderBy].toLowerCase()<pivot[orderBy].toLowerCase() : listToOrder[i][orderBy]<pivot[orderBy]){
              right.push(listToOrder[i]);
          }else{
              left.push(listToOrder[i]);     
          }
        }
    }else{
        for(let i = 1;i<listToOrder.length;i++){
          if(orderBy === 'name'? listToOrder[i][orderBy].toLowerCase()<pivot[orderBy].toLowerCase() : listToOrder[i][orderBy]<pivot[orderBy]){
              left.push(listToOrder[i]);
          }else{
              right.push(listToOrder[i]);
          }
        }
    }
    if(right.length>1){
        right = organize(order,orderBy,right);
    }
    if(left.length>1){
        left = organize(order,orderBy,left);
    }
    left.push(pivot);
    if(right.length>0){
        right.forEach((element) => {
        left.push(element);
        });
    }
    return left;
  }

  export default rootReducer;