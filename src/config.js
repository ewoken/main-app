// eslint-disable-next-line
export const config = process.env;
export const USER_STORE_URL = config.REACT_APP_USER_STORE_URL;

if (config.NODE_ENV !== 'production') {
  console.log('CONFIG', JSON.stringify(config, null, 2));
}
