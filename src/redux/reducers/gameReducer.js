const INITIAL_STATE = {
  questions: [],
  number: 0,
};

const FOUR = 4;

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return {
      ...state,
      questions: action.data,
      number: Math.floor(Math.random() * FOUR),
    };
  default:
    return state;
  }
};

export default game;
