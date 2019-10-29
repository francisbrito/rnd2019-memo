import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

class ProgressiveImage extends Component {
  render() {
    const { style, source, thumbnailSource, ...otherProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image {...otherProps} style={[styles.imageOverlay]} source={thumbnailSource} />
        <Image {...otherProps} style={[styles.imageOverlay]} source={source} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8'
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject
  },
});

export default ProgressiveImage;
