import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import { answersReducer } from "./answersReducer";
import { cardsReducer } from "./cardsReducer";
import { decksReducer } from "./decksReducer";

const store = createStore(
  combineReducers({
    decks: decksReducer,
    cards: cardsReducer,
    answers: answersReducer
  }),
  applyMiddleware(logger)
);

export { store };
