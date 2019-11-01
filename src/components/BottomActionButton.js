import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing
} from "react-native";
import * as propTypes from "prop-types";

export const ACTION_BUTTON_HEIGHT = 56;

class BottomActionButton extends Component {
  static defaultProps = {
    onPress: () => {},
    isCallToAction: false,
    isDisabled: false
  };

  static propTypes = {
    text: propTypes.string.isRequired,
    onPress: propTypes.func,
    isCallToAction: propTypes.bool,
    isDisabled: propTypes.bool
  };

  opacity = new Animated.Value(0);
  displacement = new Animated.Value(ACTION_BUTTON_HEIGHT);

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.displacement, {
        toValue: 0
      }),
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.ease)
      })
    ]).start();
  }

  render() {
    const { onPress, text, style, isCallToAction, isDisabled } = this.props;
    const animationStyle = {
      opacity: this.opacity,
      transform: [
        {
          translateY: this.displacement
        }
      ]
    };

    return (
      <TouchableOpacity
        style={[styles.contentContainerStyle, isDisabled ? styles.disabled : {}, style]}
        disabled={isDisabled}
        onPress={isDisabled ? null : onPress}
      >
        <Animated.View
          style={[
            styles.container,
            isCallToAction ? styles.callToAction : {},
            animationStyle
          ]}
        >
          <Text style={[styles.text, isCallToAction ? { color: "#fff" } : {}]}>
            {text}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  callToAction: {
    backgroundColor: "#00b000"
  },
  contentContainerStyle: {},
  container: {
    backgroundColor: "#fff",
    height: ACTION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  disabled: {
    opacity: 0.333,
  },
  text: {
    fontSize: 18,
    color: "#00b000"
  }
});

export default BottomActionButton;
