import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";
import * as r from "ramda";

import BottomActionButton from "../components/BottomActionButton";

import CardList from "../components/CardList";

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

  _handleShowAddCardView = () => {
    this.props.navigation.navigate("AddNewCard");
  };

  render() {
    const { cards } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <CardList cards={cards} />
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
