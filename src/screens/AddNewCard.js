import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import * as propTypes from "prop-types";
import { connect } from "react-redux";

import { addNewCard } from "../actions";

import BottomActionButton from "../components/BottomActionButton";

class AddNewCard extends Component {
  static navigationOptions = () => ({
    title: "Add New Card"
  });

  static propTypes = {
    addCard: propTypes.func
  };
  static defaultProps = {
    addCard: () => {}
  };

  state = {
    title: "",
    rightAnswer: "",
    wrongAnswer: ""
  };

  _handleChangeCardTitle = title => {
    this.setState({ title });
  };

  _handleAddNewCard = () => {
    this.props.addNewCard(this.state);
  };

  render() {
    const { title, rightAnswer, wrongAnswer } = this.state;
    const isFormInvalid = !(title && rightAnswer && wrongAnswer);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g: What's the largest planet in the solar system?"
              onChangeText={this._handleChangeField("title")}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Right answer</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g: Jupiter"
              onChangeText={this._handleChangeField("rightAnswer")}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Wrong answer</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g: Venus"
              onChangeText={this._handleChangeField("wrongAnswer")}
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

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addNewCard: ({ title, rightAnswer, wrongAnswer }) => {
    dispatch(addNewCard({ title, rightAnswer, wrongAnswer }));
    navigation.goBack();
  }
});

export default connect(
  null,
  mapDispatchToProps
)(AddNewCard);
