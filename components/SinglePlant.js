import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar, Divider } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from './AddPlant'

const SinglePlant = ({ navigation }) => {


  const plotData = [ // Unix time x, y in percentage
    { x: 1615973462 - 7*4 * 3600, y: 50 },
    { x: 1615973462 - 6*4 * 3600, y: 40 },
    { x: 1615973462 - 5*4 * 3600, y: 32 },
    { x: 1615973462 - 4*4 * 3600, y: 15 },
    { x: 1615973462 - 3*4 * 3600, y: 50 },
    { x: 1615973462 - 2*4 * 3600, y: 35 },
    { x: 1615973462 - 4 * 3600, y: 37 },
    { x: 1615973462, y: 26 }
  ].map( (point) => {
    return { ...point, label: `${point.y}%` }
  })

  const plantInfo = {
    'name': 'Pentti',
    'species': 'Rahapuu',
    'moisture': '72',
  }
  const sensorInfo = {
    'serialNumber': '123',
    'battery': '27%'
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
