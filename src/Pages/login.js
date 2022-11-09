import React from 'react';

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
        <button type="button" data-testid="btn-play" disabled={ buttonPlay }>Play</button>

      </>

    );
  }
}

export default Login;
