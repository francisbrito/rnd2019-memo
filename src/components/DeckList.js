import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import EmptyDeckList from "./EmptyDeckList";

class DeckList extends Component {
  static defaultProps = {
    decks: []
  };

  render() {
    const { decks } = this.props;

    return (
      <View style={[styles.container]}>
        {decks.length ? (
          <FlatList horizontal data={decks} />
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
  }
});

export default DeckList;
