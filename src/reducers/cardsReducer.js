import * as r from "ramda";
import * as uuid from "uuid";

import { types } from "../actions";

const INITIAL = {
  all: {},
  selected: null
};

export function cardsReducer(state = INITIAL, action) {
  switch (action.type) {
    case types.ADD_NEW_CARD: {
      const id = uuid.v4();
      const newCard = {
        id,
        createdAt: Date.now(),
        ...action.payload
      };

      return r.set(
        r.lensPath(["all", action.payload.deckId, id]),
        newCard,
        state
      );
    }

    case types.SELECT_CARD: {
      return r.set(r.lensProp("selected"), action.payload.id, state);
    }

    default:
      return state;
  }
}
