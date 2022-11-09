import React from 'react';
import PropTypes from 'prop-types';
 grupo2-req4

import getToken from '../services';
 grupo2-release

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

 grupo2-req4
  entrar = () => {
    const { history } = this.props;
    history.push('/play');
  };


  entrar = async () => {
    const { history } = this.props;
    const response = await getToken();
    localStorage.setItem('token', response.token);
    history.push('/play');
  };

  configButton = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

 grupo2-release
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
 grupo2-req4

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.configButton }
        >
          Configurações
        </button>
 grupo2-release

      </>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
