import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import * as propTypes from "prop-types";

import Card, { CARD_HEIGHT, CARD_WIDTH } from "./Card";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

class CardList extends Component {
  static propTypes = {
    enableShowAnswer: propTypes.bool,
    cards: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        answer: propTypes.string.isRequired
      })
    ),
    onChangeSelectedCard: propTypes.func
  };
  static defaultProps = {
    enableShowAnswer: false,
    onChangeSelectedCard: () => {}
  };

  _carousel = null;

  _renderItem = ({ item }) => {
    return (
      <Card
        title={item.title}
        answer={item.answer}
        enableShowAnswer={this.props.enableShowAnswer}
      />
    );
  };

  snapToNext = () => {
    this._carousel.snapToNext();
  };

  scrollToIndex = index => {
    this._carousel.snapToItem(index, true, false);
  };

  render() {
    const {
      cards,
      onChangeSelectedCard,
      enableShowAnswer,
      ...otherProps
    } = this.props;

    return (
      <Carousel
        {...otherProps}
        ref={ref => (this._carousel = ref)}
        layout="tinder"
        containerCustomStyle={styles.container}
        contentContainerCustomStyle={styles.contentContainer}
        data={cards}
        renderItem={this._renderItem}
        itemWidth={CARD_WIDTH}
        itemHeight={CARD_HEIGHT}
        sliderWidth={WINDOW_WIDTH}
        onSnapToItem={onChangeSelectedCard}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CardList;
