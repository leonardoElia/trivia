import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';

const acertos = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        {assertions < acertos ? (
          <p data-testid="feedback-text">Could be better...</p>
        ) : (<p data-testid="feedback-text">Well Done!</p>)}
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </>
    );
  }
}
const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
