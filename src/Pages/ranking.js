import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const rankingLocal = [JSON.parse(localStorage.getItem('ranking'))];
    // const rankingSort = rankingLocal.sort((a, b) => (b.rankingScore) - (a.rankingScore));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankingLocal !== null ? (
          rankingLocal.map((player, index) => (
            <div key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` } alt="imagemGravatar" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))
        ) : null}

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnGoHome }
        >
          Back to login
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
