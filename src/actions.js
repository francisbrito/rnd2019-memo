export const types = Object.freeze({
  ADD_NEW_DECK: "ADD_NEW_DECK",
  SELECT_DECK: "SELECT_DECK",
  ADD_NEW_CARD: "ADD_NEW_CARD",
  SELECT_CARD: "SELECT_CARD",
  SELECT_ANSWER: "SELECT_ANSWER"
});

export const addNewDeck = ({ title }) => ({
  type: types.ADD_NEW_DECK,
  payload: { title }
});

export const selectDeck = ({ id }) => ({
  type: types.SELECT_DECK,
  payload: { id }
});

export const addNewCard = ({ title, rightAnswer, wrongAnswer, deck }) => ({
  type: types.ADD_NEW_CARD,
  payload: {
    deckId: deck.id,
    title,
    rightAnswer,
    wrongAnswer
  }
});

export const selectCard = ({ id, deck }) => ({
  type: types.SELECT_CARD,
  payload: { id, deckId: deck.id }
});

export const selectAnswer = ({ deck, card, answer }) => ({
  type: types.SELECT_ANSWER,
  payload: { cardId: card.id, deckId: deck.id, answer }
});
