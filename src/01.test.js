import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import GameCardConnected from '../src/components/GameCard/GameCard';
// import * as actions from '../src/redux/actions/index';
// import * as data from '../db.json';

configure({ adapter: new Adapter() });

describe('<GametCard />', () => {
  let gameCard, state, store;
  const mockStore = configureStore([thunk]);
  let games = [
    {id:1, name:"resident trucho",genres:[{name: "action"},{name: "adventure"}],image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"},
    {id:2, name:"red dead vendetta",genres:[{name: "action"},{name: "adventure"}],image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"},
    {id:3, name:"doomed marine",genres:[{name: "action"}, {name: "shooter"}],image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"},
    {id:4, name:"legend of carla",genres:[{name: "adventure"},{name: "rpg"}],image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"},
    {id:5, name:"merloid separation",genres:[{name: "adventure"},{name: "puzzle"}],image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"}];
  state = {
    games: [],
    gameDetails: {},
  };
  store = mockStore(state);
  beforeEach(() => {
    gameCard = (game) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <GameCardConnected
              id={game.id}
              name={game.name}
              genres={game.genres}
              image={game.image}
            />
          </MemoryRouter>
        </Provider>,
      );
  });

  afterEach(() => jest.restoreAllMocks());

  describe('Estructura', () => {
    it('Debería renderizar un "button" con el texto "x"', () => {
      const wrapper = gameCard(games[0]);
      expect(wrapper.find('button').text()).toBe('x');
    });

    it('Debería renderizar un tag "h3" que muestre lo que contiene el "name" de cada "game"', () => {
      expect(gameCard(games[0]).find('h3').at(0).text()).toBe(
        'resident trucho',
      );
      expect(gameCard(games[1]).find('h3').at(0).text()).toBe(
        'red dead vendetta',
      );
      expect(gameCard(games[2]).find('h3').at(0).text()).toBe(
        'doomed marine',
      );
    });

    it('Debería renderizar la imágen de cada juego y un alt con el nombre del respectivo juego', () => {
      expect(gameCard(games[0]).find('img').prop('src')).toBe(
        games[0].image,
      );
      expect(gameCard(games[0]).find('img').prop('alt')).toBe(
        games[0].name,
      );
      expect(gameCard(games[1]).find('img').prop('src')).toBe(
        games[1].image,
      );
      expect(gameCard(games[1]).find('img').prop('alt')).toBe(
        games[1].name,
      );
    });

    it('Debería renderizar un tag "p" que contenga el texto "Genres: " más la prop "genre" de cada "game"', () => {
      expect(gameCard(games[0]).find('p').at(0).text()).toBe('Genre(s): action, adventure');
      expect(gameCard(games[1]).find('p').at(0).text()).toBe('Genre(s): action, adventure');
      expect(gameCard(games[2]).find('p').at(0).text()).toBe('Genre(s): action, shooter');
      expect(gameCard(games[3]).find('p').at(0).text()).toBe('Genre(s): adventure, rpg');
      expect(gameCard(games[4]).find('p').at(0).text()).toBe('Genre(s): adventure, puzzle');
    });

    it('Debería renderizar un componente <Link> que encierre el "name" de cada "game" y debería redirigir a "/game/:id"', () => {
      // El valor de "gameId" lo tenes que sacar del objeto games, tiene una propiedad "id".
      expect(gameCard(games[0]).find(Link)).toHaveLength(1);
      expect(gameCard(games[0]).find(Link).at(0).prop('to')).toEqual(
        '/videogame/1',
      );
    });
  });
});