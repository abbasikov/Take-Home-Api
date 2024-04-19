const generateRandomString = () => {
  let result = '';
  const length = 8;
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const shortenUrl = () => {
  const shortened = process.env.URL_PATH + '/' + generateRandomString();
  return shortened;
};

export { shortenUrl };
