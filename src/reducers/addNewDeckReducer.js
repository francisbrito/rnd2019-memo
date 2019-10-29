import * as uuid from "uuid";

import { types } from "../actions";

const INITIAL = {};

export function addNewDeckReducer(state = INITIAL, action) {
  switch (action.type) {
    case types.ADD_NEW_DECK:
      return {
        [uuid.v4()]: {
          ...action.payload,
          createdAt: Date.now()
        }
      };
    default:
      return state;
  }
}
