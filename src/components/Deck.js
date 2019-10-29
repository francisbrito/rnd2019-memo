import React, { Component } from "react";
import { Animated, View, StyleSheet, Text, Image, Easing } from "react-native";
import * as propTypes from "prop-types";

export const DECK_PADDING = 8;
export const DECK_WIDTH = 300;
export const DECK_HEIGHT = 450;

export const DECK_BORDER_RADIUS = 4;

export const DECK_COVER_IMAGE_HEIGHT = DECK_HEIGHT / 2;

class Deck extends Component {
  scale = new Animated.Value(0);

  static propTypes = {
    cardCount: propTypes.number.isRequired,
    category: propTypes.string.isRequired,
    coverImageSource: propTypes.any,
    title: propTypes.string.isRequired,
  };

  componentDidMount() {
    Animated.spring(this.scale, {
      toValue: 1,
      duration: 200
    }).start();
  }

  componentWillUnmount() {
    Animated.spring(this.scale, {
      toValue: 0,
      duration: 200
    });
  }

  render() {
    const { coverImageSource, cardCount, category, title } = this.props;
    const animationStyle = {
      transform: [{ scale: this.scale }]
    };

    return (
      <Animated.View style={[styles.container, animationStyle]}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        <View style={styles.coverContainer}>
          <Image
            style={styles.coverImage}
            source={coverImageSource}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '100',
  },
  categoryContainer: {
    maxWidth: DECK_WIDTH / 3,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: DECK_WIDTH,
    padding: DECK_PADDING,
    marginBottom: DECK_PADDING,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
  },
  coverImage: {
    flex: 1,
  },
  coverContainer: {
    flex: 1,
    backgroundColor: '#dadada',
    overflow: "hidden",
    height: DECK_COVER_IMAGE_HEIGHT,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  contentContainer: {
    padding: DECK_PADDING,
    height: DECK_HEIGHT / 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderBottomLeftRadius: DECK_BORDER_RADIUS,
    borderBottomRightRadius: DECK_BORDER_RADIUS,
  },
  container: {
    width: DECK_WIDTH,
    height: DECK_HEIGHT,
    borderRadius: DECK_BORDER_RADIUS,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.28,
    shadowRadius: 4.0,

    elevation: 1
  }
});

export default Deck;
