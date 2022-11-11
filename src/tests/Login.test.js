import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const email = 'teste@teste.com';

describe('Analisando a página de Login', () => {
  test('Verificar se o texto Login esta impresso na tela', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/Login/i);

    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um input de nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByText(/nome/i);
    userEvent.type(inputName, 'Pedro');
    expect(inputName).toBeInTheDocument();
  });

  test('Verificar se existe um input de email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByText(/email/i);
    userEvent.type(inputEmail, email);
    expect(inputEmail).toBeInTheDocument();
  });

  test(
    'Verificar se existe um botão clicavel na tela e se redireciona para a página /play',
    async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const buttonPlay = screen.getByRole('button', { name: /Play/i });
      expect(buttonPlay).toBeDisabled();

      const inputName = screen.getByTestId('input-player-name');
      userEvent.type(inputName, 'Pedro');
      const inputEmail = screen.getByText(/email/i);
      userEvent.type(inputEmail, email);
      expect(buttonPlay).toBeEnabled();
      expect(buttonPlay).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/');
      userEvent.click(buttonPlay);

      await waitFor(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/play');
        const token = localStorage.getItem('token')
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        }); 
    },
  );

  test(
    'Verificar um botão clicavel na tela que redireciona para a página /configuracoes',
    () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const buttonPlay = screen.getByRole('button', { name: /Play/i });
      expect(buttonPlay).toBeDisabled();

      const inputName = screen.getByTestId('input-player-name');
      userEvent.type(inputName, 'Pedro');
      const inputEmail = screen.getByText(/email/i);
      userEvent.type(inputEmail, email);

      const buttonConf = screen.getByRole('button', { name: /Configurações/i });

      expect(buttonConf).toBeInTheDocument();
      userEvent.click(buttonConf);

      const { pathname } = history.location;
      expect(pathname).toBe('/configuracoes');
    },
  );
});
