import { Link } from 'react-router-dom';
import gameStyle from './GameCard.module.css';

const GameCard = (props) =>{

  return (
    <Link className={gameStyle.link} to={'/videogame/'+props.id}>
      <div className={gameStyle.mainBox}>
        <img className={gameStyle.img} src={props.image} alt={props.name}></img>
        <h3 className={gameStyle.name}>{props.name}</h3>
        <p className={gameStyle.genres}>Released Date: {props.released}</p>
        <p className={gameStyle.genres}>Genre(s): {props.genres.map(g=>g.name).join(', ')}</p>
      </div>
    </Link>
  );
}

export default GameCard;