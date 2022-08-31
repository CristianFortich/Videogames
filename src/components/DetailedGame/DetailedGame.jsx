import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import loadingImage from '../../pics/loading02.gif'
import { deleteGame, updatePages, setPage } from '../../redux/actions';
import detailStyle from './DetailedGame.module.css'
import { useDispatch } from 'react-redux';


const DetailedGame = () => {
    const dispatch = useDispatch();
	let {id} = useParams();
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
	React.useEffect(() => {
        let link = '';
		if(isNaN(parseInt(id))){
			id = id.split('-')[1];
            link = `https://videogame-fortich-api.herokuapp.com/videogame/${id}`;
		}else {
            link = `https://api.rawg.io/api/games/${id}?key=913bbd053b714cc8a46cd399097bfa02`
        }
        fetch(link)
            .then((response)=> response.json())
            .then((data)=>{
                let genres = data.genres.map(e=>e.name).join(', ')
                let platforms
                if(typeof data.platforms !== "string"){
                    platforms = data.platforms.map(e=>{
                        return e.platform.name
                    }).join(', ') 
                }else{
                    platforms = data.platforms
                }
                setGame({
                    name: data.name,
                    description: data.description,
                    released: data.released,
                    platforms: platforms,
                    genres: genres,
                    image: data.background_image,
                    rating: data.rating
                })
                setIsLoading(false)
            })
            
        }, []);
        
        const deleteG = async(e) => {
            await dispatch(deleteGame(e));
            await dispatch(updatePages())
            dispatch(setPage(1))
        }

        return (
		<div className={detailStyle.mainBox}>
            {isLoading ? (
                <div className={detailStyle.divImg}>
                    <img className={detailStyle.lImg} src={loadingImage}/>
                </div>
            ):
			(<>
                <div className={detailStyle.divHead}></div>
                <div className={detailStyle.divInfo}>
                    <p className={detailStyle.p}>
                        <h1 className={detailStyle.h1}>{game.name.toUpperCase()}</h1>
                        <p className={detailStyle.pImg}>
                            <img className={detailStyle.img} src={game.image}/>
                        </p>
                        <p className={detailStyle.pI}>Platforms: {game.platforms}</p>
                        <p className={detailStyle.pI}>{game.description.replace( /(<([^>]+)>)/ig, '')}</p>
                        <p className={detailStyle.pI}>Rating: {game.rating}</p>
                        <p className={detailStyle.pI}>Release date: {game.released}</p>
                        <p className={detailStyle.pI}>Genres: {game.genres}</p>
                        <div className={detailStyle.pFoot}></div>
                    </p>
                </div>
                {isNaN(parseInt(id))? (<button className={detailStyle.close} onClick={()=>deleteG(id)}>Delete</button>) : null }
                <div className={detailStyle.divFoot}></div>
            </>)}
		</div>
	);
};

export default DetailedGame;