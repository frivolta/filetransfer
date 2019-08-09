export const apiUrl =
  process.env.REACT_APP_PRODUCTION === true
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_LOCALHOST_API;
