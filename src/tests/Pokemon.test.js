import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

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

describe('Testa o componente Pokemon.js', () => {
  test(`Verifica se o nome correto do pokemon e
  mostrado na tela`, () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(mockFavorites[0].name);
  });

  test(`Verifica se o tipo correto do pokemon e
  mostrado na tela`, () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(mockFavorites[0].type);
  });

  test('Verifica se o peso e mostrado de forma correta na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const weight = mockFavorites[0].averageWeight.value;
    const unit = mockFavorites[0].averageWeight.measurementUnit;
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${weight} ${unit}`);
  });

  test('Verifica se a imagem correta e exibida na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const imgAlt = `${mockFavorites[0].name} sprite`;
    const pokemonImg = screen.getByAltText(imgAlt);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('http://localhost/%22https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png%22');
  });

  test(`Verifica se o card do pokemon indicado na pokedex contem um link de
  navegacao para exibir detalhes deste pokemon`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    const urlPokemonId = `/pokemons/${mockFavorites[0].id}`;
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(urlPokemonId);
  });

  test('Verifica se existe um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavorites[0] }
      isFavorite
    />);
    const imgFavoriteAlt = `${mockFavorites[0].name} is marked as favorite`;
    const pokemonFavoriteIcon = screen.getByAltText(imgFavoriteAlt);
    expect(pokemonFavoriteIcon).toBeInTheDocument();
    expect(pokemonFavoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
