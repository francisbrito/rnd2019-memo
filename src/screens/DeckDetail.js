import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "Deck detail")
  });

  render() {
    return (
      <View>
        <Text>Deck detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
