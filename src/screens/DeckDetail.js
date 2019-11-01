import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import Carousel from "react-native-snap-carousel";

import Card from "../components/Card";
import CardList from '../components/CardList'

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "Deck detail")
  });

  render() {
    const cards = [
      { title: "Who you gonna call" },
      { title: "What do we say to death?" }
    ];

    return (
      <View style={styles.container}>
        <CardList cards={cards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
