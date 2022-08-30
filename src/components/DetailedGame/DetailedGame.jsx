import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import loadingImage from '../../pics/loading02.gif'
import detailStyle from './DetailedGame.module.css'

const DetailedGame = () => {
	let {id} = useParams();
	

    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
	React.useEffect(() => {
        let link = '';
		if(isNaN(parseInt(id))){
			id = id.split('-')[1];
            link = `https://videogame-fortich-api.herokuapp.com/videogames/${id}`;
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

	return (
		<div className={detailStyle.mainBox}>
            {isLoading ? (<img src={loadingImage}/>):
			(<>
                <p>{game.name}</p>
                <img src={game.image}/>
                <p>Platforms: {game.platforms}</p>
                <p>{game.description.replace( /(<([^>]+)>)/ig, '')}</p>
                <p>Rating: {game.rating}</p>
                <p>Release date: {game.released}</p>
                <p>Genres: {game.genres}</p>
            </>)}
		</div>
	);
};

export default DetailedGame;