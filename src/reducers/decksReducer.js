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

      return r.set(
        r.lensPath(["all", id]),
        { ...action.payload, id, createdAt: Date.now(), cards: {} },
        state
      );
    }
    case types.SELECT_DECK:
      return r.set(r.lensProp("selected"), action.payload.id, state);
    case types.ADD_NEW_CARD: {
      const id = uuid.v4();

      return r.set(
        r.lensPath(["all", state.selected, "cards", id]),
        {
          ...action.payload,
          id,
          createdAt: Date.now()
        },
        state
      );
    }
    default:
      return state;
  }
}
