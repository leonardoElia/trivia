import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import { saveQuestions } from '../redux/actions/indexAction';
import { getQuestions } from '../services';
import './play.css';

const THREE = 3;

class Play extends React.Component {
  state = {
    question: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    if (questions.response_code === THREE) {
      localStorage.clear();
      const { history } = this.props;
      history.push('/');
    }
    const { dispatch } = this.props;
    await dispatch(saveQuestions(questions));
  }

  componentDidUpdate() {

  }

  randomAnswer = () => {
    const { questions: { results }, randomNumber } = this.props;
    const incorrectAnswers = results[randomNumber].incorrect_answers;
    const correctAnswer = results[randomNumber].correct_answer;
    const arrayOfAnswer = [...incorrectAnswers, correctAnswer];
    if (arrayOfAnswer.length === 2) {
      return [arrayOfAnswer[1], arrayOfAnswer[0]];
    }
    return [arrayOfAnswer[3], arrayOfAnswer[2], arrayOfAnswer[0], arrayOfAnswer[1]];
  };

  handleColor = (color) => {
    const { question } = this.state;
    if (question) {
      return color === 'correct_answer' ? 'correct' : 'wrong';
    }
    return '';
  };

  render() {
    const { questions, randomNumber } = this.props;
    return (
      <div>
        <Header />
        {
          questions.length !== 0
            ? questions.results.filter((_e, index) => index === randomNumber)
              .map((question) => (
                <div
                  key={ question.question }
                >
                  <p data-testid="question-category">{question.category}</p>
                  <br />
                  <p data-testid="question-text">{question.question}</p>
                  <div data-testid="answer-options ">
                    {this.randomAnswer().map((answer, index) => (
                      <button
                        className={ this.handleColor(answer) }
                        data-testid={ answer === question.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${index}` }
                        type="button"
                        key={ answer }
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>
              )) : null
        }

      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.objectOf().isRequired,
  randomNumber: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  questions: store.game.questions,
  randomNumber: store.game.number,

});
export default connect(mapStateToProps)(Play);
