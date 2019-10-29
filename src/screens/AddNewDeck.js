import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as propTypes from "prop-types";

import { addNewDeck } from "../actions";
import AddNewDeckForm from "../components/AddNewDeckForm";
import BottomActionButton from "../components/BottomActionButton";

class AddNewDeck extends Component {
  static navigationOptions = {
    title: "Add New Deck"
  };

  static propTypes = {
    addNewDeck: propTypes.func
  };

  static defaultProps = {
    addNewDeck: () => {}
  };

  state = {
    deckTitle: ""
  };

  handleAddNewDeck = () => {
    this.props.addNewDeck({ title: this.state.deckTitle });
  };

  handleChangeTitle = deckTitle => {
    this.setState({ deckTitle });
  };

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <AddNewDeckForm onChangeTitle={this.handleChangeTitle} />
        <BottomActionButton text="Save" onPress={this.handleAddNewDeck} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addNewDeck: ({ title }) => {
    dispatch(addNewDeck({ title }));
    navigation.navigate("Home");
  }
});

export default connect(
  null,
  mapDispatchToProps
)(AddNewDeck);
