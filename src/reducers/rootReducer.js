import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import { decksReducer } from "./decksReducer";

const store = createStore(
  combineReducers({
    decks: decksReducer
  }),
  applyMiddleware(logger)
);

export { store };
