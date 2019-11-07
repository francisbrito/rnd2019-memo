import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import * as propTypes from "prop-types";

import Card, { CARD_HEIGHT, CARD_WIDTH } from "./Card";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

class CardList extends Component {
  static propTypes = {
    cards: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        title: propTypes.string.isRequired
      })
    ),
    onChangeSelectedCard: propTypes.func
  };
  static defaultProps = {
    onChangeSelectedCard: () => {}
  };

  _carousel = null;

  _renderItem = ({ item }) => {
    return <Card title={item.title} />;
  };

  snapToNextCard() {
    this._carousel.snapToNext();
  }

  render() {
    const { cards, onChangeSelectedCard, ...otherProps } = this.props;

    return (
      <Carousel
        {...otherProps}
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
