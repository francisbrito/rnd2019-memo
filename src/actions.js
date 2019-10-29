export const types = Object.freeze({
  ADD_NEW_DECK: "ADD_NEW_DECK"
});

export const addNewDeck = ({ title }) => ({
  type: types.ADD_NEW_DECK,
  payload: { title }
});
