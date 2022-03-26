import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';

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

const listIdFavorites = {
  65: true,
  151: true,
};

const testPokemonName = 'pokemon-name';

describe('Testa o componente Pokedex.js', () => {
  test('Verifica se a pagina contem um h2 com o texto "Encountered pokemons"', () => {
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(pokedexHeader).toBeInTheDocument();
  });

  test('Verifica se a pagina contem um botao com o texto proximo pokemon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
  });

  test(`Verifica se os pokemons sao mostrados um a um, ao clicar
  sucessivamente no botao de proximo e se ao chegar
  no ultimo, clicar novamente te levara ao primeiro`, () => {
    renderWithRouter(<Pokedex
      pokemons={ mockFavorites }
      isPokemonFavoriteById={ listIdFavorites }
    />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    const secondPokemonName = screen.getByTestId(testPokemonName);
    expect(secondPokemonName).toHaveTextContent(mockFavorites[1].name);
    userEvent.click(buttonNext);
    const firstPokemonName = screen.getByTestId(testPokemonName);
    expect(firstPokemonName).toHaveTextContent(mockFavorites[0].name);
  });

  test('Verifica se e mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ mockFavorites }
      isPokemonFavoriteById={ listIdFavorites }
    />);
    const allPokemons = screen.getAllByTestId(testPokemonName);
    expect(allPokemons.length).toBe(1);
  });

  test('Verifica se a pokedex tem os botoes de filtro para cada tipo', () => {
    renderWithRouter(<App />);
    const buttonElectric = screen.getAllByRole('button', { name: /electric/i });
    const buttonFire = screen.getAllByRole('button', { name: /fire/i });
    const buttonBug = screen.getAllByRole('button', { name: /bug/i });
    const buttonPoison = screen.getAllByRole('button', { name: /poison/i });
    const buttonPsychic = screen.getAllByRole('button', { name: /psychic/i });
    const buttonNormal = screen.getAllByRole('button', { name: /normal/i });
    const buttonDragon = screen.getAllByRole('button', { name: /dragon/i });
    expect(buttonElectric).toBeDefined();
    expect(buttonElectric.length).toBe(1);
    expect(buttonFire).toBeDefined();
    expect(buttonFire.length).toBe(1);
    expect(buttonBug).toBeDefined();
    expect(buttonBug.length).toBe(1);
    expect(buttonPoison).toBeDefined();
    expect(buttonPoison.length).toBe(1);
    expect(buttonPsychic).toBeDefined();
    expect(buttonPsychic.length).toBe(1);
    expect(buttonNormal).toBeDefined();
    expect(buttonNormal.length).toBe(1);
    expect(buttonDragon).toBeDefined();
    expect(buttonDragon.length).toBe(1);
  });

  test(`Verifica se a página contém um button resetar o
  filtro e se ele sempre esta visivel.`, () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).not.toBeDisabled();
    expect(buttonAll).toBeVisible();
  });

  test(`Verifica se apos clicar no botao all e
  permitido percorrer os pokemons`, () => {
    renderWithRouter(<App />);
    const buttonCaseMutant = screen.getByTestId('');
    expect(buttonCaseMutant).toBeDefined();
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).not.toBeDisabled();
  });
});
