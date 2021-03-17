import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PlantSearch from './adding/PlantSearch'
import FoundSensors from './adding/FoundSensors'
import NamePlant from './adding/NamePlant'


const AddPlant = ({ navigation }) => {

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


export default AddPlant
