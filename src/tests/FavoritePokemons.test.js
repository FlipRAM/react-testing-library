import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

const mockFavorites = [
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: '"https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png"',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary: `Closing both its eyes heightens all its
    other senses. This enables it to use its abilities
    to their extremes.`,
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary: `Apparently, it appears only to those
    people who are pure of heart and have a strong
    desire to see it.`,
  },
];

describe('Testa o componente FavoritePokemons.js', () => {
  test(`E exibido na tela a mensagem "No favorite
  pokemon found" se a pessoa nao tiver pokemons
  favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('E exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavorites } />);
    const favoritesPokemons = screen.getAllByTestId('pokemon-name');
    expect(favoritesPokemons).toBeDefined();
    expect(favoritesPokemons.length).toBe(2);
    expect(favoritesPokemons[0]).toHaveTextContent(/alakazam/i);
    expect(favoritesPokemons[1]).toHaveTextContent(/mew/i);
  });
});
