import * as type from "../types/types";

export const setUserActionCreator = (user) => ({
  type: type.SET_USER,
  payload: user,
});
export const setAuthActionCreator = (bool) => ({
  type: type.SET_AUTH,
  payload: bool,
});

export const removeUserActionCreator = () => ({
  type: type.REMOVE_AUTH
})