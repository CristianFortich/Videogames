import axios from "axios";
export const GET_ALL_GAMES='GET_ALL_GAMES';
export const GET_ALL_GENRES='GET_ALL_GENRES'
export const SEARCH_GAMES='SEARCH_GAMES';
export const ORGANIZE_GAMES='ORGANIZE_GAMES';
export const DELETE_GAME='DELETE_GAME';
export const UPDATE_PAGES = 'UPDATE_PAGES';
export const SET_PAGE = 'SET_PAGE';
export const RESET_ALL = 'RESET_ALL';
export const CG_SWITCH = 'CG_SWITCH';
export const ABOUT_SWITCH = 'ABOUT_SWITCH';

export const getAllGames = ()=>{
    return async function (dispatch){
        let allgames = [];
        await axios.get('https://videogame-fortich-api.herokuapp.com/videogames')
        .then(response=>{
            allgames = [...allgames,...response.data];            
        })
        let next = 'https://api.rawg.io/api/games?key=913bbd053b714cc8a46cd399097bfa02'
        for (let i = 0; i < 5; i++) {
            await axios.get(next)
            .then(response=>{
                let aux = [] 
                response.data.results.forEach(element => {
                    aux.push({
                        name: element.name,
                        id: element.id,
                        image: element.background_image,
                        genres: element.genres
                    })
                });
                allgames = [...allgames,...response.data.results];
                next = response.data.next
            })
        }
        dispatch({type: GET_ALL_GAMES, payload: allgames})
    }
}
export const getAllGenres = ()=>{
    return async function (dispatch){
        const genres = await axios.get('https://videogame-fortich-api.herokuapp.com/genres')
        dispatch({type: GET_ALL_GENRES, payload: genres.data})
    }
}
export const resetAll = ()=>{
    return {type: RESET_ALL, payload: null}
}
export const cgSwitch = (data)=>{
    return{type: CG_SWITCH, payload: data?false:true}
}
export const aboutSwitch = (data)=>{
    return{type: ABOUT_SWITCH, payload: data?false:true}
}
export const searchGames = (data)=>{
    return async function (dispatch) {
        let allgames = [];
        let page = 0;
        let flag = true;
        await axios.get(`https://videogame-fortich-api.herokuapp.com/videogames/?name=${data}`)
        .then(response=>{
            allgames = [...allgames, ...response.data]
        })
        let next = `https://api.rawg.io/api/games?key=913bbd053b714cc8a46cd399097bfa02&search=${data}`
        do{
            await axios.get(next)
            .then(response=>{
                allgames = [...allgames,...response.data.results];
                if(response.data.next){
                    next = response.data.next
                    page ++;
                }else{
                    flag = false;
                }
            })
        }while(flag && page<5);
        dispatch({type: SEARCH_GAMES, payload: allgames})
    }
}

export const organizeGames = (data)=>{
    //data must be {order: 'descend or ascend', orderBy: 'name or rating', filter: 'both, added or existent'}
    return {type: ORGANIZE_GAMES, payload: data}
}

export const deleteGame = (id)=>{
    return async function(dispatch){
        if (isNaN(parseInt(id))) {
            await axios.delete(`https://videogame-fortich-api.herokuapp.com/videogames/${id}`)
        }
        dispatch({type: DELETE_GAME, payload: id})
    }
}

export const setPage = (pageNumber)=>{
    return {type: SET_PAGE, payload: pageNumber}
}

export const updatePages = (filter)=>{
    return {type: UPDATE_PAGES, payload: filter}
}
