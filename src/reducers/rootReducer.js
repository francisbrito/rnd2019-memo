import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import { addNewDeckReducer } from "./addNewDeckReducer";

const store = createStore(
  combineReducers({
    addNewDeck: addNewDeckReducer
  }),
  applyMiddleware(logger)
);

export { store };
