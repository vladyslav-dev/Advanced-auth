import * as type from "../types/types";

const initialState = {
  user: {},
  isAuth: false,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true
      };
    case type.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    case type.REMOVE_AUTH:
      console.log('remove auth')
      return {
        ...state,
        isAuth: false
      }
    default:
      return state;
  }
};

export default userAuthReducer;
