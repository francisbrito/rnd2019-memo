import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

class EmptyCardList extends Component {
  render () {
    return (
      <View style={[styles.container]}>
        <Icon name="cards-outline" size={96} color="rgba(0, 0, 0, .3)"/>
        <Text style={styles.text}>Add cards to get started</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 16,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, .025)"
  },
  text: {
    fontSize: 24,
    color: "rgba(0, 0, 0, .25)"
  },
})

export default EmptyCardList
