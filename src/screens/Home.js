import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as propTypes from "prop-types";

import { selectDeck } from "../actions";
import BottomActionButton from "../components/BottomActionButton";
import DeckList from "../components/DeckList";

class Home extends Component {
  static navigationOptions = {
    title: "Decks"
  };

  static defaultProps = {
    decks: []
  };

  static propTypes = {
    decks: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired
      })
    )
  };

  _handleAddNewDeck = () => {
    this.props.navigation.push("AddNewDeck");
  };

  _handleSelectDeck = deck => {
    this.props.selectDeck(deck);
  };

  render() {
    const { decks } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <DeckList decks={decks} onSelectDeck={this._handleSelectDeck} />
        <BottomActionButton text="Add deck" onPress={this._handleAddNewDeck} />
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
  decks: Object.values(decks.all).sort((x, y) => y.createdAt - x.createdAt)
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  selectDeck: deck => {
    dispatch(selectDeck(deck));
    navigation.navigate({
      routeName: "DeckDetail",
      params: deck
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
