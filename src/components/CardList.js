import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import Card, { CARD_HEIGHT, CARD_WIDTH } from "./Card";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

class CardList extends Component {
  _renderItem = ({ item }) => {
    return <Card title={item.title} />;
  };

  render() {
    const { cards } = this.props;

    return (
      <Carousel
        layout="tinder"
        containerCustomStyle={styles.container}
        contentContainerCustomStyle={styles.contentContainer}
        data={cards}
        renderItem={this._renderItem}
        itemWidth={CARD_WIDTH}
        itemHeight={CARD_HEIGHT}
        sliderWidth={WINDOW_WIDTH}
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
