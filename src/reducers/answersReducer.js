import * as r from "ramda";

import { types } from "../actions";

const INITIAL = {};

export function answersReducer(state = INITIAL, action) {
  switch (action.type) {
    case types.SELECT_ANSWER: {
      const { deckId, cardId } = action.payload;

      return r.set(r.lensPath([deckId, cardId]), action.payload.choice, state);
    }

    case types.RESET_ANSWERS: {
      return INITIAL;
    }

    default:
      return state;
  }
}
