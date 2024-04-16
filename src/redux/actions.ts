// src/redux/actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email: string, name: string, token: string) => ({
  type: LOGIN,
  payload: { email, name, token },
});

export const logout = () => ({
  type: LOGOUT,
});