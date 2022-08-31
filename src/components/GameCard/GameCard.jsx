import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGame, updatePages, setPage } from '../../redux/actions';
import gameStyle from './GameCard.module.css';

const GameCard = (props) =>{
  const dispatch = useDispatch();

  const deleteG = async(e) => {
		await dispatch(deleteGame(e));
    await dispatch(updatePages())
    dispatch(setPage(1))
  }

  return (
    <Link className={gameStyle.link} to={'/videogame/'+props.id}>
      <div className={gameStyle.mainBox}>
        <button className={gameStyle.close} onClick={()=>deleteG(props.id)}>x</button>
        <img className={gameStyle.img} src={props.image} alt={props.name}></img>
        <h3 className={gameStyle.name}>{props.name}</h3>
        <p className={gameStyle.genres}>Released Date: {props.released}</p>
        <p className={gameStyle.genres}>Genre(s): {props.genres.map(g=>g.name).join(', ')}</p>
      </div>
    </Link>
  );
}

export default GameCard;