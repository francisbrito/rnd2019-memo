import * as r from "ramda";
import * as uuid from "uuid";

import { types } from "../actions";

const INITIAL = {
  all: {},
  selected: null
};

export function decksReducer(state = INITIAL, action) {
  switch (action.type) {
    case types.ADD_NEW_DECK: {
      const id = uuid.v4();
      const newDeck = { ...action.payload, id, createdAt: Date.now() };

      return r.set(r.lensPath(["all", id]), newDeck, state);
    }

    case types.SELECT_DECK:
      console.log(r.set(r.lensProp("selected"), action.payload.id, state))
      return r.set(r.lensProp("selected"), action.payload.id, state);

    default:
      return state;
  }
}
