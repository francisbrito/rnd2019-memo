import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import BottomActionButton from "../components/BottomActionButton";
import DeckList from "../components/DeckList";

class Home extends Component {
  static navigationOptions = {
    title: "Decks"
  };

  static defaultProps = {
    decks: []
  };

  handleAddNewDeck = () => {
    this.props.navigation.push("AddNewDeck");
  };

  render() {
    const { decks, onAddNewDeck } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <DeckList />
        <BottomActionButton
          text="Add deck"
          onPress={this.handleAddNewDeck}
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

export default Home;
