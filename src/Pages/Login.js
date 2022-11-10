import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { actionEmail, actionNome } from '../redux/actions/indexAction';
import getToken from '../services';

const INITIAL_STATE = {
  name: '',
  email: '',
  buttonPlay: true,
};
class Login extends React.Component {
  state = INITIAL_STATE;

  validateForm = () => {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email) && name.length > 0) {
      this.setState({ buttonPlay: false });
    } else {
      this.setState({ buttonPlay: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateForm);
  };


  entrar = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const response = await getToken();
    localStorage.setItem('token', response.token);
    const emailGravatar = md5(email).toString();
    dispatch((actionNome(name)));
    dispatch(actionEmail(emailGravatar));
    history.push('/play');
  };

  configButton = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

  render() {
    const { buttonPlay, name, email } = this.state;
    return (
      <>
        <h1>Login</h1>
        <label htmlFor="nome">
          nome
          <input
            type="text"
            id="nome"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ name }
          />

        </label>

        <label htmlFor="email">
          email
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ email }
          />

        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ buttonPlay }
          onClick={ this.entrar }
        >
          Play

        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.configButton }
        >
          Configurações
        </button>

      </>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);


export default Login;

