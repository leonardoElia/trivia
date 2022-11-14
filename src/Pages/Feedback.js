import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';

const acertos = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        {assertions < acertos ? (
          <p data-testid="feedback-text">Could be better...</p>
        ) : (<p data-testid="feedback-text">Well Done!</p>)}
      </>
    );
  }
}
const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
