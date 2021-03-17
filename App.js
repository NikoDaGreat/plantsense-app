import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Card, Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import { styles, colors } from './style/style'
import PlantPlot from './components/PlantPlot'


const HomeScreen = ({ navigation }) => {

  const plants = [
    {
      'name': 'Rahapuu',
      'state': 'Tämä kasvi voi hyvin'
    }, {
      'name': 'Peikonlehti',
      'state': 'Tämä kasvi tarvitsee kastelua välittömästi'
    }
  ]

  // Unix time x, y in percentage
  const plotData = [
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

      <PlantPlot data={plotData}/>
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
