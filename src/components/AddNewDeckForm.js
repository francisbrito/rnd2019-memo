import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import * as propTypes from "prop-types";

class AddNewDeckForm extends Component {
  static propTypes = {
    onChangeTitle: propTypes.func
  };

  static defaultProps = {
    onChangeTitle: () => {}
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g: The impact of Kanye West in modern society"
            onChangeText={this.props.onChangeTitle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  label: {
    fontSize: 14,
    color: "#037aff",
    textTransform: "uppercase"
  },
  field: {},
  input: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#037aff"
  }
});

export default AddNewDeckForm;
