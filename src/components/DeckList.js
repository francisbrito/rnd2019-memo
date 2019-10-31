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
        title: propTypes.string.isRequired
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
  deck: {
    height: DECK_HEIGHT,
    justifyContent: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, .1)"
  },
  deckTitle: {
    fontSize: 18
  }
});

export default DeckList;
