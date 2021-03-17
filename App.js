import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Card, Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import { styles, colors } from './style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import './globals.js'

const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }

  console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

const getAllPlantsFromStorage = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }
  keys.map(async function(k) {
    const p = await getData(k);
    plants.push(p);
  })
}


const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    //console.log('stored');
  } catch (e) {
    // error
  }
}

const getData = async (key: string) => {
  try {
    //console.log('getting timer');
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
  console.log('Removed ' + key)
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Cleared all plants')
}

const p1 = {'name': 'JP', 'species': 'Rahapuu', 'state': 0 };
const p2 = {'name': 'PJ', 'species': 'Peikonlehti', 'state': 0 };

console.log('Main stored: ')
getAllKeys()

//clearAll()
getAllPlantsFromStorage()

function updatePlantStates() {
  plants.map(function(p) {
    const currentTime = Math.floor(new Date().getTime() / 1000)
    p.state = Math.max(0, 100 - (currentTime - p.initTime))
    console.log(p.name + ' ' + p.state)
  })
}

setInterval( () => {
  updatePlantStates();
}, 10000)



const HomeScreen = ({ navigation }) => {

  //const plants = [];
  //console.log('Main: ' + plants)

  return (
    <>
      {plants.map(function(d){
        return (
          <Card key={d.name} containerStyle={{}} wrapperStyle={{}}>
            <Card.Title>{d.name}</Card.Title>
            <Card.Divider />
            <View
              style={{
                position: 'relative',
                alignItems: 'center'
              }}
            >
              <Text>{d.state}</Text>
            </View>
          </Card>
        )
      })}
      <Button
        title="Lisää kasvi"
        onPress={() => navigation.navigate('Lisää kasvi', { screen: 'Löydetyt sensorit' })}
        buttonStyle={styles.buttonStyle}
      />
      <Button
        title="Poista kaikki "
        onPress={() => clearAll()}
        buttonStyle={styles.buttonStyle}
      />
    </>
  )
}


export default function App() {

  const RootStack = createStackNavigator()

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.light}/>

      <NavigationContainer>
        <RootStack.Navigator mode="modal" initialRouteName="Etusivu">
          <RootStack.Screen
            name="Etusivu"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.light,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}/>
          <RootStack.Screen
            name="Lisää kasvi"
            component={AddPlant}
            options={{
              headerStyle: {
                backgroundColor: colors.light,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
        </RootStack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  )
}
