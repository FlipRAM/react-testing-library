import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente About.js', () => {
  test(`A pagina about contem um h2 com o texto About 
  pokédex`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutHeader = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutHeader).toBeInTheDocument();
  });

  test(`A pagina about contem dois paragrafos com 
  texto sobre a pokédex`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragraphOne = screen.getByText(/this application simulates/i);
    const paragraphTwo = screen.getByText(/one can filter pokémons by/i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test(`A pagina contem a foto com o url
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imgAbout = screen.getByAltText('Pokédex');
    expect(imgAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
