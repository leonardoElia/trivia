import React from 'react';
import { screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../Pages/Feedback';
import App from '../App';
import { act } from 'react-dom/test-utils';


describe('tests from feedback page', () => {
  test('1) should tittle be on screen', () => {
    const initialStateMock = {
      player: {
        name: 'ivan',
        assertions: 3,
        score: 172,
        gravatarEmail: 'd99c9093443e7bfc295ac857adcfa11f'
      }
    }
    const {history} = renderWithRouterAndRedux(<Feedback />, initialStateMock, '/feedback',);
    const title = screen.getByRole('heading', {name: /feedback/i, level:1})
    expect(title).toBeInTheDocument();
  });
  test('2) should page be in correct path', () => {
    const initialStateMock = {
      player: {
        name: 'ivan',
        assertions: 3,
        score: 172,
        gravatarEmail: 'd99c9093443e7bfc295ac857adcfa11f'
      }
    }
    const {history} = renderWithRouterAndRedux(<Feedback />, initialStateMock, '/feedback',);
    expect(history.location.pathname).toBe('/feedback')
});
test('3) should assertions and score be on screen', () => {
  const initialStateMock = {
    player: {
      name: 'ivan',
      assertions: 3,
      score: 172,
      gravatarEmail: 'd99c9093443e7bfc295ac857adcfa11f'
    }
  }
  renderWithRouterAndRedux(<Feedback />, initialStateMock, '/feedback',);
  const assertions = screen.getByTestId('feedback-total-question');
  const pontuation = screen.getByTestId('feedback-total-score');
  expect(assertions && pontuation).toBeInTheDocument();
});
test('4) should playagain button be on screen and enable', async () => {
 
  const {history} = renderWithRouterAndRedux(<App />)
  act(()=>{
    history.push('/feedback')
  })
  const btnPlayAgain = screen.getByTestId('btn-play-again');
  expect(btnPlayAgain).toBeInTheDocument();
  expect(btnPlayAgain).toBeEnabled();
  userEvent.click(btnPlayAgain);
  expect(history.location.pathname).toBe('/')
});
test('5) should ranking button be on screen and enable', async () => {
  const {history} = renderWithRouterAndRedux(<App />)
  act(()=>{
    history.push('/feedback')
  })
  const btnRanking = screen.getByTestId('btn-ranking');
  expect(btnRanking).toBeInTheDocument();
  expect(btnRanking).toBeEnabled();
  userEvent.click(btnRanking);
  expect(history.location.pathname).toBe('/ranking')
});
});