import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Timer from '../componentes/Timer';
import { actionScore, saveQuestions } from '../redux/actions/indexAction';
import { getQuestions } from '../services';
import './play.css';

const THREE = 3;
const ONE_SECOND = 1000;
const soma10 = 10;
const hard = 3;
const medium = 2;
const easy = 1;

class Play extends React.Component {
  state = {
    answerColor: false,
    random: 0,
    timer: 30,
    buttonDisabled: false,
    indexPergunta: 0,
    indexQ: 0,
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
    this.timer();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 1) {
      clearInterval(this.intervalID);
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log('Timer Desmontado');
  }

  timer = () => {
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer > 0 ? prev.timer - 1 : 0,
      }));
    }, ONE_SECOND);
  };

  randomAnswer = () => {
    const { random, indexQ } = this.state;
    const { questions: { results } } = this.props;
    const incorrectAnswers = results[indexQ].incorrect_answers;
    const correctAnswer = results[indexQ].correct_answer;
    const arrayOfAnswer = [...incorrectAnswers, correctAnswer];
    if (arrayOfAnswer.length === 2 && random % 2 === 0) {
      return [arrayOfAnswer[1], arrayOfAnswer[0]];
    } return arrayOfAnswer;
  };

  handleColor = (answer) => {
    const { answerColor, indexQ } = this.state;
    const { questions } = this.props;
    if (answerColor) {
      return answer === questions.results[indexQ].correct_answer ? 'correct' : 'wrong';
    }
    return '';
  };

  handleClick = ({ target }) => {
    this.setState({
      answerColor: true,
    });
    const { results, dispatch } = this.props;

    const { indexPergunta } = this.state;
    const { value } = target;
    if (results[indexPergunta].correct_answer === value) {
      const { timer } = this.state;
      const { difficulty } = results[indexPergunta];

      let pontuacao = 0;
      if (difficulty === 'hard') {
        pontuacao = soma10 + (hard * timer);
        dispatch(actionScore(pontuacao));
      } else if (difficulty === 'medium') {
        pontuacao = soma10 + (medium * timer);
        dispatch(actionScore(pontuacao));
      } else {
        pontuacao = soma10 + (easy * timer);
        dispatch(actionScore(pontuacao));
      }
    }
  };

  handleClickNext = () => {
    const { indexQ } = this.state;
    const { history } = this.props;
    const four = 4;
    if (indexQ === four) {
      history.push('/feedback');
    }
    this.setState((prev) => ({
      indexQ: prev.indexQ + 1,
      answerColor: false,
      indexPergunta: prev.indexPergunta + 1,
      timer: 30,
    }));
  };

  render() {
    const { timer, buttonDisabled, answerColor, indexQ } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <Timer timer={ timer } />
        {
          questions.length !== 0
            ? questions.results.filter((_e, i) => i === indexQ)
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
                        disabled={ buttonDisabled }
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>
              )) : null
        }
        { answerColor && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClickNext }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.objectOf().isRequired,
  results: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  questions: store.game.questions,
  results: store.game.questions.results,
});
export default connect(mapStateToProps)(Play);
