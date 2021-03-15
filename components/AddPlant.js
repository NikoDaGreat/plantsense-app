import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PlantSearch from './adding/PlantSearch'
import FoundSensors from './adding/FoundSensors'
import NamePlant from './adding/NamePlant'


const AddPlant = ({ navigation }) => {

  const plantList = ['Peikonlehti', 'Rahapuu']

  const [state, setState] = useState( {
    data: plantList,
    filter: '',
    name: '',
  })


  const Stack = createStackNavigator()

  return (
    <>

      <Stack.Navigator mode="card">
        <Stack.Screen name="Löydetyt sensorit" component={FoundSensors} />
        <Stack.Screen name="Kasvihaku" component={PlantSearch} />
        <Stack.Screen name="Nimeä kasvi" component={NamePlant} />
      </Stack.Navigator>
    </>
  )
}

export const styles = StyleSheet.create({
  baseText: {
    fontSize: 19,
    fontFamily: 'Roboto',
    margin: Dimensions.get('window').width / 13
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  listText: {
    fontSize: 17,
    fontFamily: 'Roboto',
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchStyle: {
    justifyContent: 'center', flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#F6F6F6',
    marginTop: 29,
  }
})

export default AddPlant
