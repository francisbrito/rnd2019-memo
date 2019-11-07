import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";
import * as r from "ramda";

import { addNewCard } from "../actions";

import BottomActionButton from "../components/BottomActionButton";

class AddNewCard extends Component {
  static navigationOptions = () => ({
    title: "Add New Card"
  });

  static propTypes = {
    addCard: propTypes.func,
    selectedDeck: propTypes.shape({
      id: propTypes.string.isRequired
    })
  };
  static defaultProps = {
    addCard: () => {}
  };

  state = {
    title: "",
    answer: ""
  };

  _handleAddNewCard = () => {
    this.props.addNewCard({ ...this.state, deck: this.props.selectedDeck });
  };

  render() {
    const { title, answer } = this.state;
    const isFormInvalid = !(title && answer);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Question</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g: What's the largest planet in the solar system?"
              onChangeText={this._handleChangeField("title")}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Answer</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g: Jupiter"
              onChangeText={this._handleChangeField("answer")}
            />
          </View>
        </View>
        <BottomActionButton
          text="Save"
          onPress={this._handleAddNewCard}
          isCallToAction
          isDisabled={isFormInvalid}
        />
      </SafeAreaView>
    );
  }

  _handleChangeField = field => {
    return text => {
      this.setState(prev => ({ ...prev, [field]: text }));
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    padding: 16
  },
  label: {
    fontSize: 14,
    color: "#037aff",
    textTransform: "uppercase"
  },
  field: {
    marginBottom: 16
  },
  input: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#037aff"
  }
});

const mapStateToProps = ({ decks }) => ({
  selectedDeck: r.path(["all", decks.selected], decks)
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addNewCard: ({ title, answer, deck }) => {
    dispatch(addNewCard({ title, answer, deck }));
    navigation.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCard);
