import React, { Component } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";
import * as r from "ramda";

import BottomActionButton from "../components/BottomActionButton";
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
        title: propTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    cards: []
  };

  state = {
    progress: 0
  };

  _handleShowAddCardView = () => {
    this.props.navigation.navigate("AddNewCard");
  };

  _handleChangeTopCard = index => {
    this.setState({
      progress:
        this.props.cards.length > 0 ? (index + 1) / this.props.cards.length : 0
    });
  };

  render() {
    const { cards } = this.props;
    const { progress } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <QuizProgressBar maxWidth={SCREEN_WIDTH} progress={progress} />
        <CardList
          cards={cards}
          onChangeSelectedCard={this._handleChangeTopCard}
        />
        <BottomActionButton
          text="Add card"
          onPress={this._handleShowAddCardView}
        />
        <BottomActionButton
          text="Start quiz"
          isCallToAction
          isDisabled={cards.length === 0}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = ({ decks }) => ({
  cards: r.pipe(
    r.pathOr({}, ["all", decks.selected, "cards"]),
    r.values,
    r.sortBy(r.prop("createdAt"))
  )(decks)
});

export default connect(mapStateToProps)(DeckDetail);
