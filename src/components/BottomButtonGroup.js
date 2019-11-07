import React, { Component } from "react";
import { Animated, StyleSheet } from "react-native";
import * as propTypes from "prop-types";

class BottomButtonGroup extends Component {
  _animation = new Animated.Value(0);

  static propTypes = {
    itemHeight: propTypes.number.isRequired,
    children: propTypes.node,
    isVisible: propTypes.bool
  };

  static defaultProps = {
    isVisible: true,
    children: []
  };

  componentDidMount() {
    this._doAnimation();
  }

  componentDidUpdate() {
    this._doAnimation();
  }

  render() {
    const { itemHeight, children } = this.props;
    const animationStyle = {
      transform: [
        {
          translateY: this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: [children.length * itemHeight, 0],
            extrapolate: "clamp"
          })
        }
      ]
    };

    return (
      <Animated.View style={[styles.container, animationStyle]}>
        {children}
      </Animated.View>
    );
  }

  _doAnimation() {
    Animated.timing(this._animation, {
      toValue: this.props.isVisible ? 1 : 0,
      duration: 300
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {}
});

export default BottomButtonGroup;
