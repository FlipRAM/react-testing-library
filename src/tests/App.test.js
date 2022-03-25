import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  test(`Verifica se o topo da aplicacao contem um
  conjunto fixo de links`, () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test(`Verifica se ao clicar no link Home
  redireciona para para a rota "/"`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test(`Verifica se ao clicar no link About
  redireciona para para a rota "/about"`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test(`Verifica se ao clicar no link Favorite Pokémons
  redireciona para para a rota "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test(`Verifica se ao entrar em uma url desconhecida,
  a pagina e redirecionada para Not Found`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquer-coisa');
    const notFoundHeader = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundHeader).toBeInTheDocument();
  });
});
