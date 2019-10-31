export const types = Object.freeze({
  ADD_NEW_DECK: "ADD_NEW_DECK",
  SELECT_DECK: "SELECT_DECK"
});

export const addNewDeck = ({ title }) => ({
  type: types.ADD_NEW_DECK,
  payload: { title }
});

export const selectDeck = ({ id }) => ({
  type: types.SELECT_DECK,
  payload: { id }
});
