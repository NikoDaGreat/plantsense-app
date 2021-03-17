import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Card, Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import SinglePlant from './components/SinglePlant'
import { styles, colors } from './style/style'


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

  return (
    <>
      <View>
        {plants.map(function(d){
          return (
            <TouchableOpacity key={d.name}
              onPress={ () => navigation.navigate('Yksittäinen kasvi', {
                name: `${d.name}`,
              }) } >
              <Card containerStyle={{}} wrapperStyle={{}} >
                <Card.Title>{d.name}</Card.Title>
                <Card.Divider />
                <View
                  style={{
                    position: 'relative',
                    alignItems: 'center'
                  }} >
                  <Text>{d.state}</Text>
                </View>
              </Card>
            </TouchableOpacity>)
        })}
      </View>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Lisää kasvi"
          onPress={() => navigation.navigate('Lisää kasvi', { screen: 'Löydetyt sensorit' })}
          buttonStyle={styles.buttonStyle}
        />
      </View>
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
          <RootStack.Screen name="Yksittäinen kasvi" component={SinglePlant} />
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
