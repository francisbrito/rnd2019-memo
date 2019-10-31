import React from "react";
import { StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";

import { store } from "./src/reducers/rootReducer";
import AddNewDeck from "./src/screens/AddNewDeck";
import DeckDetail from "./src/screens/DeckDetail";
import Home from "./src/screens/Home";

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  AddNewDeck: {
    screen: AddNewDeck
  },
  DeckDetail: { screen: DeckDetail }
});

const MainNavigator = createSwitchNavigator({
  Home: HomeNavigator
});

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B8E986"
  }
});
