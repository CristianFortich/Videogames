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
    <div className={gameStyle.mainBox}>
      <button className={gameStyle.close} onClick={()=>deleteG(props.id)}>x</button>
      <img className={gameStyle.img} src={props.image} alt={props.name}></img>
      <Link to={'/videogame/'+props.id}>
        <h3 className={gameStyle.name}>{props.name}</h3>
      </Link>
      <p className={gameStyle.name}>Released Date: {props.released}</p>
      <p className={gameStyle.genres}>Genre(s): {props.genres.map(g=>g.name).join(', ')}</p>
    </div>
  );
}

export default GameCard;