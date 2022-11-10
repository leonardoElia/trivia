import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import { saveQuestions } from '../redux/actions/indexAction';
import { getQuestions } from '../services';

const THREE = 3;

class Play extends React.Component {
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

  // randomAnswer = () => {
  //   const { questions } = this.props;
  // };

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
                  <p data-testid="question-text">{question.question}</p>
                  <div data-testid="answer-options ">
                    <button
                      data-testid="correct-answer"
                      type="button"
                    >
                      {question.correct_answer}
                    </button>
                    {question.incorrect_answers.map((answer, index) => (
                      <button
                        data-testid={ `wrong-answer-${index}` }
                        type="button"
                        key={ index }
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
