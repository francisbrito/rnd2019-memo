import React from "react";
import { StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createStackNavigator,
  HeaderBackButton as HeaderButton
} from "react-navigation-stack";

import AddNewDeck from "./src/screens/AddNewDeck";
import DeckDetail from "./src/screens/DeckDetail";
import Home from "./src/screens/Home";

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerBackTitle: "Cancel"
      })
    },
    AddNewDeck: {
      screen: AddNewDeck
    }
  },
  {
    mode: "modal"
  }
);

const MainNavigator = createSwitchNavigator({
  Home: HomeNavigator,
  DeckDetail: { screen: DeckDetail }
});

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B8E986"
  }
});
