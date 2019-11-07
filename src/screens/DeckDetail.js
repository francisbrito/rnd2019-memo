import React, { Component, Fragment } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";
import * as r from "ramda";
import { selectAnswer, selectCard, resetAnswers } from "../actions";

import BottomActionButton, {
  ACTION_BUTTON_HEIGHT
} from "../components/BottomActionButton";
import BottomButtonGroup from "../components/BottomButtonGroup";
import CardList from "../components/CardList";
import EmptyCardList from "../components/EmptyCardList";
import QuizProgressBar from "../components/QuizProgressBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam(
      "title",
      "Deck detail"
    )} (${navigation.getParam("cardCount", 0)})`
  });

  static propTypes = {
    cards: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        answer: propTypes.string.isRequired
      })
    ),
    selectedCard: propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      answer: propTypes.string
    }),
    selectedDeck: propTypes.shape({
      id: propTypes.string.isRequired
    }),
    selectedAnswer: propTypes.string,
    selectAnswer: propTypes.func
  };

  static defaultProps = {
    cards: [],
    selectCard: () => {},
    selectedCard: {},
    selectedAnswer: null,
    selectAnswer: () => {}
  };

  state = {
    progress: 0,
    currentCardIndex: 0,
    quizRunning: false,
    hasFailed: false
  };

  _cardList = null;

  _handleShowAddCardView = () => {
    this.props.navigation.navigate("AddNewCard");
  };

  _updateProgressBar = index => {
    this.setState(prev => ({
      ...prev,
      progress: (index + 1) / (this.props.cards.length || 1)
    }));
  };

  _handleStartQuiz = () => {
    this.setState({
      progress: 0,
      quizRunning: true,
      hasFailed: false
    });
    this._handleSelectCard(0);
  };

  _handleSelectCard = index => {
    this._updateProgressBar(index);
    this.props.selectCard({
      id: this.props.cards[index].id,
      deck: this.props.selectedDeck
    });
    this.setState(prev => ({ ...prev, currentCardIndex: index }));
  };

  _handleEndQuiz = () => {
    this._cardList.scrollToIndex(0);

    setTimeout(() => {
      this.setState(() => {
        this.props.resetAnswers();

        return {
          progress: 0,
          quizRunning: false,
          hasFailed: false,
          currentCardIndex: 0
        };
      });
    }, 500);
  };

  _handleSelectedCorrectAnswer = () => {
    this._cardList.snapToNext();
    this.props.selectAnswer({
      deck: this.props.selectedDeck,
      card: this.props.selectedCard,
      choice: "correct"
    });
  };

  _handleSelectedIncorrectAnswer = () => {
    this._cardList.snapToNext();
    this.setState(prev => ({ ...prev, hasFailed: true }));
    this.props.selectAnswer({
      deck: this.props.selectedDeck,
      card: this.props.selectedCard,
      choice: "incorrect"
    });
  };

  componentDidMount() {
    this._updateCardCount();
    this.props.resetAnswers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.cards.length !== prevProps.cards.length) {
      this._updateCardCount();
    }

    if (
      this.props.selectedAnswer &&
      this.state.currentCardIndex === this.props.cards.length - 1
    ) {
      this._handleEndQuiz();
    }
  }

  _updateCardCount() {
    this.props.navigation.setParams({ cardCount: this.props.cards.length });
  }

  render() {
    const { cards } = this.props;
    const { progress, quizRunning, hasFailed } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {cards.length ? (
          <Fragment>
            <QuizProgressBar
              maxWidth={SCREEN_WIDTH}
              progress={progress}
              hasFailed={hasFailed}
            />
            <CardList
              ref={cardList => (this._cardList = cardList)}
              cards={cards}
              onChangeSelectedCard={this._handleSelectCard}
              scrollEnabled={false}
              enableShowAnswer={quizRunning}
            />
          </Fragment>
        ) : (
          <Fragment>
            <EmptyCardList />
          </Fragment>
        )}
        {quizRunning ? (
          <BottomButtonGroup itemHeight={ACTION_BUTTON_HEIGHT}>
            <BottomActionButton
              text="Correct"
              onPress={this._handleSelectedCorrectAnswer}
            />
            <BottomActionButton
              text="Incorrect"
              onPress={this._handleSelectedIncorrectAnswer}
            />
            <BottomActionButton text="End quiz" onPress={this._handleEndQuiz} />
          </BottomButtonGroup>
        ) : (
          <BottomButtonGroup
            itemHeight={ACTION_BUTTON_HEIGHT}
            isVisible={!quizRunning}
          >
            <BottomActionButton
              text="Add card"
              onPress={this._handleShowAddCardView}
            />
            {cards.length > 0 && (
              <BottomActionButton
                text="Start quiz"
                isCallToAction
                onPress={this._handleStartQuiz}
              />
            )}
          </BottomButtonGroup>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = ({ decks, cards, answers }) => ({
  cards: r.pipe(
    r.path(["all", decks.selected]),
    r.values,
    r.sortBy(r.prop("createdAt"))
  )(cards),
  selectedCard: r.path(["all", decks.selected, cards.selected], cards),
  selectedDeck: r.path(["all", decks.selected], decks),
  selectedAnswer: r.path([decks.selected, cards.selected], answers)
});

const mapDispatchToProps = dispatch => ({
  selectCard: ({ id, deck }) => dispatch(selectCard({ id, deck })),
  selectAnswer: ({ deck, card, choice }) =>
    dispatch(selectAnswer({ deck, card, choice })),
  resetAnswers: () => dispatch(resetAnswers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
