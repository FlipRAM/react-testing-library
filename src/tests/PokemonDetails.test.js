import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const alakazam = {
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
  summary:
    'Closing both its eyes heightens all its other senses. '
    + 'This enables it to use its abilities to their extremes.',
};

describe('Testa o componente PokemonDetails.js', () => {
  test(`Verifica se a pagina contem um texto Name Details onde name e o
  nome do pokemon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${alakazam.id}`);
    const pokemonDetailsHeader = screen.getByRole('heading', {
      name: `${alakazam.name} Details`,
    });
    expect(pokemonDetailsHeader).toBeInTheDocument();
  });

  test(`Verifica se na pagina nao existe o link de navegacao para os detalhes do
  pokemon selecionado`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${alakazam.id}`);
    const pokemonMoreDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(pokemonMoreDetails).toBe(null);
  });

  test(`Verifica se a secao de detalhes contem um h2 com o texto Summary e um
  paragrafo com o resumo desse pokemon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${alakazam.id}`);
    const pokemonSummaryHeader = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(pokemonSummaryHeader).toBeInTheDocument();
    const pokemonSummaryParagraph = screen.getByText(alakazam.summary);
    expect(pokemonSummaryParagraph).toBeInTheDocument();
  });

  test(`Verifica se a secao de detalhes contem um h2 com o texto Game Locations
  of "name" onde name e o nome do pokemon, se todas as localizacoes do
  pokemon sao mostradas, e sao exibidos o nome e a imagem da localizacao,
  a imagem tendo um atributo src com o endereco certo e o atributo alt correto`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${alakazam.id}`);
    const pokemonMapHeader = screen.getByRole('heading', {
      name: `Game Locations of ${alakazam.name}`,
      level: 2,
    });
    expect(pokemonMapHeader).toBeInTheDocument();
    const locations = screen.getAllByAltText(`${alakazam.name} location`);
    expect(locations).toBeDefined();
    expect(locations.length).toBe(alakazam.foundAt.length);
    const locationName = screen.getByText(alakazam.foundAt[0].location);
    expect(locationName).toBeInTheDocument();
    expect(locations[0].src).toBe(alakazam.foundAt[0].map);
  });

  test(`Verifica se o usuario pode favoritar um pokemon atraves da pagina
  de detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${alakazam.id}`);
    const pokemonCheckboxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    expect(pokemonCheckboxFavorite).toBeInTheDocument();
    userEvent.click(pokemonCheckboxFavorite);
    history.push('/favorites');
    const pokemonFavorite = screen.getByTestId('pokemon-name');
    expect(pokemonFavorite).toBeInTheDocument();
    expect(pokemonFavorite).toHaveTextContent(alakazam.name);
  });
});
