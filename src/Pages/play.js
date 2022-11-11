import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Timer from '../componentes/Timer';
import { saveQuestions } from '../redux/actions/indexAction';
import { getQuestions } from '../services';
import './play.css';

const THREE = 3;

class Play extends React.Component {
  state = {
    answerColor: false,
    random: 0,
    timer: 30,
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
    this.setState({
      random: Math.floor(Math.random() * 100),
    });
  }

  componentDidUpdate() {

  }

  randomAnswer = () => {
    const { random } = this.state;
    const { questions: { results } } = this.props;
    const incorrectAnswers = results[0].incorrect_answers;
    const correctAnswer = results[0].correct_answer;
    const arrayOfAnswer = [...incorrectAnswers, correctAnswer];
    if (arrayOfAnswer.length === 2 && random % 2 === 0) {
      return [arrayOfAnswer[1], arrayOfAnswer[0]];
    } return arrayOfAnswer;
  };

  handleColor = (answer) => {
    const { answerColor } = this.state;
    const { questions } = this.props;
    if (answerColor) {
      return answer === questions.results[0].correct_answer ? 'correct' : 'wrong';
    }
    return '';
  };

  handleClick = () => {
    // const { target: { value } } = event;
    // const { answerColor } = this.state;
    // const { questions: { results } } = this.props;
    this.setState({
      answerColor: true,
    });
  };

  render() {
    const { timer } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <Timer timer={ timer } />
        {
          questions.length !== 0
            ? questions.results.filter((e, i) => i === 0)
              .map((question) => (
                <div
                  key={ question.question }
                >
                  <p data-testid="question-category">{question.category}</p>
                  <br />
                  <p data-testid="question-text">{question.question}</p>
                  <div data-testid="answer-options">
                    {this.randomAnswer().map((answer, index) => (
                      <button
                        className={ this.handleColor(answer) }
                        data-testid={ answer === question.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${index}` }
                        type="button"
                        key={ answer }
                        onClick={ this.handleClick }
                        value={ answer }
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
  // randomNumber: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  questions: store.game.questions,
  // randomNumber: store.game.number,

});
export default connect(mapStateToProps)(Play);
