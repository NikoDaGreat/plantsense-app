import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar, Divider } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from './AddPlant'

const SinglePlant = ({ navigation }) => {

  const plantInfo = {
    "name": "Pentti",
    "species": "Rahapuu",
    "moisture": "72",
  }
  const sensorInfo = {
    "serialNumber": "123",
    "battery": "27%"
  }

  return (
    <Card containerStyle={{}} wrapperStyle={{}}>
      <Card.Title>
        {plantInfo.name}
      </Card.Title>
      <Card.Divider/>
      <Text style={styles.baseText}>
        Laji: {plantInfo.species}
      </Text>
      <Text style={styles.baseText}>
        Kosteus: {plantInfo.moisture}
      </Text>
      <Text style={styles.baseText}>
        Yhdistetty sensori: {sensorInfo.serialNumber}
      </Text>
      <Text style={styles.baseText}>
        Sensorin akku: {sensorInfo.battery}
      </Text>
    </Card>

  )

}




export default SinglePlant
