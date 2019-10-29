import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing
} from "react-native";

export const ACTION_BUTTON_HEIGHT = 56;

class BottomActionButton extends Component {
  static defaultProps = {
    onPress: () => {}
  };

  opacity = new Animated.Value(0);
  displacement = new Animated.Value(ACTION_BUTTON_HEIGHT);

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.displacement, {
        toValue: 0,
        duration: 100,
        easing: Easing.in(Easing.ease)
      }),
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease)
      })
    ]).start();
  }

  render() {
    const { onPress, text, style } = this.props;
    const animationStyle = {
      opacity: this.opacity,
      transform: [
        {
          translateY: this.displacement
        }
      ]
    };

    return (
      <TouchableOpacity style={[styles.contentContainerStyle, style]} onPress={onPress}>
        <Animated.View style={[styles.container, animationStyle]}>
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
  },
  container: {
    backgroundColor: "#fff",
    height: ACTION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    color: "#00b000"
  }
});

export default BottomActionButton;
