import React, { Component } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";
import * as r from "ramda";
import { selectCard } from "../actions";

import BottomActionButton, {
  ACTION_BUTTON_HEIGHT
} from "../components/BottomActionButton";
import BottomButtonGroup from "../components/BottomButtonGroup";
import CardList from "../components/CardList";
import QuizProgressBar from "../components/QuizProgressBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "Deck detail")
  });

  static propTypes = {
    cards: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        rightAnswer: propTypes.string.isRequired,
        wrongAnswer: propTypes.string.isRequired
      })
    ),
    selectedCard: propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      rightAnswer: propTypes.string,
      wrongAnswer: propTypes.string
    }),
    selectedDeck: propTypes.shape({
      id: propTypes.string.isRequired
    })
  };

  static defaultProps = {
    cards: [],
    selectCard: () => {},
    selectedCard: {}
  };

  state = {
    progress: 0,
    quizRunning: false
  };

  _cardList = null;

  _handleShowAddCardView = () => {
    this.props.navigation.navigate("AddNewCard");
  };

  _handleChangeTopCard = index => {
    this.setState({
      progress:
        this.props.cards.length > 0 ? (index + 1) / this.props.cards.length : 0
    });
  };

  _handleStartQuiz = () => {
    this.setState({ progress: 0, quizRunning: true });
    this._handleSelectCard(0);
  };
  _handleSelectCard = index => {
    this.props.selectCard({
      id: this.props.cards[index].id,
      deck: this.props.selectedDeck
    });
  };

  render() {
    const { cards, selectedCard } = this.props;
    const { progress, quizRunning } = this.state;
    const answers = selectedCard
      ? r.sortBy(Math.random)([
          selectedCard.rightAnswer,
          selectedCard.wrongAnswer
        ])
      : [];

    return (
      <SafeAreaView style={styles.container}>
        <QuizProgressBar maxWidth={SCREEN_WIDTH} progress={progress} />
        <CardList
          ref={cardList => (this._cardList = cardList)}
          cards={cards}
          onChangeSelectedCard={this._handleChangeTopCard}
          scrollEnabled={quizRunning}
          onSnapToItem={this._handleSelectCard}
        />
        {quizRunning ? (
          <BottomButtonGroup itemHeight={ACTION_BUTTON_HEIGHT}>
            <BottomActionButton text={answers[0]} />
            <BottomActionButton text={answers[1]} />
            <BottomActionButton text="Skip" />
            <BottomActionButton text="End quiz" />
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
  selectedDeck: r.path(["all", decks.selected], decks)
});

const mapDispatchToProps = dispatch => ({
  selectCard: ({ id, deck }) => dispatch(selectCard({ id, deck }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
