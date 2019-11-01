import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as propTypes from "prop-types";

export const CARD_HEIGHT = 350;
export const CARD_WIDTH = 300;

class Card extends Component {
  static propTypes = {
    title: propTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <View style={[styles.container]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#fff",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.28,
    shadowRadius: 4.0,

    elevation: 1
  },
  title: {
    fontSize: 18
  }
});

export default Card;
