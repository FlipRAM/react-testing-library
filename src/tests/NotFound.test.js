import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound.js', () => {
  test(`Verifica se a pagina contem um h2 com o texto
  Page requested not found`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquer-coisa');
    const notFoundHeader = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundHeader).toBeInTheDocument();
  });

  test('Verifica se a pagina mostra o gif do pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquer-coisa');
    const imgNotFound = screen.getByAltText(/pikachu crying/i);
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
