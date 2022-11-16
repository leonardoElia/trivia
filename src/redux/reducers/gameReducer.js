const INITIAL_STATE = {
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return {
      ...state,
      questions: action.data,
    };
  default:
    return state;
  }
};

export default game;
