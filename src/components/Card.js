import React, { Component } from "react";
import { TouchableWithoutFeedback, Text, View, StyleSheet } from "react-native";
import * as propTypes from "prop-types";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Flippable from "react-native-card-flip";

export const CARD_HEIGHT = 350;
export const CARD_WIDTH = 300;

class Card extends Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    answer: propTypes.string.isRequired,
    enableShowAnswer: propTypes.bool
  };

  static defaultProps = {
    enableShowAnswer: false
  };

  _flippable = null;

  _handleToggleAnswer = () => {
    if (this._flippable) {
      this._flippable.flip();
    }
  };

  render() {
    const { title, answer, enableShowAnswer } = this.props;

    return (
      <Flippable style={styles.flippable} ref={f => (this._flippable = f)}>
        <TouchableWithoutFeedback
          onPress={this._handleToggleAnswer}
          disabled={!enableShowAnswer}
        >
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Icon name="swap-horizontal" style={styles.icon} size={24} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this._handleToggleAnswer}
          disabled={!enableShowAnswer}
        >
          <View style={styles.container}>
            <Text style={styles.title}>{answer}</Text>
            <Icon name="swap-horizontal" style={styles.icon} size={24} />
          </View>
        </TouchableWithoutFeedback>
      </Flippable>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
    color: "rgba(0, 0, 0, .25)"
  },
  flippable: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  },
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
