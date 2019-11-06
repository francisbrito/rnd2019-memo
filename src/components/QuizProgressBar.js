import React, { Component } from "react";
import { Animated, StyleSheet } from "react-native";
import * as propTypes from "prop-types";

export const QUIZ_PROGRESS_BAR_HEIGHT = 12;

class QuizProgressBar extends Component {
  static propTypes = {
    maxWidth: propTypes.number.isRequired,
    progress: propTypes.number,
    hasSkipped: propTypes.bool,
    hasFailed: propTypes.bool
  };
  static defaultProps = {
    progress: 0,
    hasSkipped: false,
    hasFailed: false
  };

  width = new Animated.Value(0);

  render() {
    const { progress, hasSkipped, hasFailed } = this.props;

    Animated.spring(this.width, {
      toValue: progress
    }).start();

    const animationStyle = {
      width: this.width.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
    };

    const viewStyles = [styles.container];

    if (hasSkipped) {
      viewStyles.push(styles.hasSkipped);
    } else if (hasFailed) {
      viewStyles.push(styles.hasFailed);
    }

    viewStyles.push(animationStyle);

    return <Animated.View style={viewStyles} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00b000",
    height: QUIZ_PROGRESS_BAR_HEIGHT
  },
  hasFailed: {
    backgroundColor: "#ddcc00"
  },
  hasSkipped: {
    backgroundColor: "#037aff"
  }
});

export default QuizProgressBar;
