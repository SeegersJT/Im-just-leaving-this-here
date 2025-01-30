export const SET_USER = '[USER] SET - USER';
export const RESET_USER = '[USER] RESET - USER';

export const setUser = (payload) => ({
  type: SET_USER,
  payload
});

export const resetUser = () => ({
  type: RESET_USER
});
