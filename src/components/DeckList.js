import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet
} from "react-native";
import * as propTypes from "prop-types";

import EmptyDeckList from "./EmptyDeckList";

export const DECK_HEIGHT = 56;

class DeckList extends Component {
  static defaultProps = {
    decks: [],
    onSelectDeck: () => {}
  };

  static propTypes = {
    decks: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        cardCount: propTypes.number.isRequired
      })
    ),
    onSelectDeck: propTypes.func
  };

  _renderDeck = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => this.props.onSelectDeck(item)}
    >
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>{item.title}</Text>
        <View style={styles.cardCountContainer}>
          <Text style={styles.cardCount}>{item.cardCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  _getDeckId = ({ id }) => id;

  render() {
    const { decks } = this.props;

    return (
      <View style={[styles.container]}>
        {decks.length ? (
          <FlatList
            data={decks}
            renderItem={this._renderDeck}
            keyExtractor={this._getDeckId}
          />
        ) : (
          <EmptyDeckList />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardCount: {},
  cardCountContainer: {
    backgroundColor: "#dadada",
    height: 32,
    width: 32,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto"
  },
  deck: {
    height: DECK_HEIGHT,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, .1)",
    flexDirection: "row",
    alignItems: "center"
  },
  deckTitle: {
    fontSize: 18
  }
});

export default DeckList;
