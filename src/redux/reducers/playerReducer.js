const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'MUDAR_EMAIL':
    return { ...state, gravatarEmail: action.email };
  case 'MUDAR_NOME':
    return { ...state, name: action.nome };
  case 'ADICIONAR_SCORE':
    return { ...state, score: state.score + action.score };
  case 'ADICIONAR_ACERTO':
    return { ...state, assertions: state.assertions + 1 };
  default:
    return state;
  }
};

export default player;
