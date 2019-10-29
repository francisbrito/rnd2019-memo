import React, { Component } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import BottomActionButton from "../components/BottomActionButton";

class AddNewDeck extends Component {
  static navigationOptions = {
    title: "Add New Deck"
  };

  handleSaveNewDeck = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{ flex: 1 }}></View>
        <BottomActionButton text="Save" onPress={this.handleSaveNewDeck} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddNewDeck;
