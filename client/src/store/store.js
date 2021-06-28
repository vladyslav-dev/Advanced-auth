import { combineReducers, createStore, applyMiddleware } from "redux";
import userAuthReducer from "./reducers/userAuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userAuthReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
