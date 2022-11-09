import React from 'react';

class Play extends React.Component {
  render() {
    return (
      <div>

        <h1>Play</h1>
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configuração
        </button>
      </div>
    );
  }
}

export default Play;
