import fetch from 'cross-fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const LoginOnRequest = (email, pass) => ({
  type: 'LOGIN_REQUEST',
  email,
  pass,
});

const LoginOnReceived = (email, token) => ({
  type: 'LOGIN_RESPONSE',
  token,
  email,
});

const LoginOnError = err => ({
  type: 'LOGIN_FAIL',
  error: err,
});

export const login = (email, password) => (
  dispatch => new Promise((resolve, reject) => {
    dispatch(LoginOnRequest(email, password));
    fetch('http://127.0.0.1:8080/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok === false) {
          const answer = { status: res.status, statusText: res.statusText };
          dispatch(LoginOnError(answer));
          reject(answer);
        }
        return res.json();
      })
      .then((data) => {
        if (data !== null) {
          dispatch(LoginOnReceived(email, data.token));
          resolve(true);
        } else {
          const err = 'No token id received';
          dispatch(LoginOnError(err));
          reject(err);
        }
      })
      .catch((err) => {
        dispatch(LoginOnError(err));
        reject(err);
      });
  })
);

export default login;
