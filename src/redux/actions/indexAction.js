export const actionEmail = (email) => ({
  type: 'MUDAR_EMAIL',
  email,
});

export const actionNome = (nome) => ({
  type: 'MUDAR_NOME',
  nome,
});

export const actionScore = (score) => ({
  type: 'ADICIONAR_SCORE',
  score,
});

export const saveQuestions = (data) => ({
  type: 'SAVE_QUESTIONS',
  data,
});

export const saveAcertion = () => ({
  type: 'ADICIONAR_ACERTO',
});
