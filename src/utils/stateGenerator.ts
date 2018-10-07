// stateGenerator

const stateGenerator = () => {
  let state = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const stateLength = 16;

  for (let index = 0; index < 16; index += 1) {
    state += letters.charAt(Math.floor(Math.random() * stateLength));
  }

  return state;
};

export default stateGenerator;
