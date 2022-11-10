const TOKEN_API_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(TOKEN_API_ENDPOINT);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getToken;

export const getQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
