import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Card, ListItem, Button, Icon, ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import SinglePlant from './components/SinglePlant'

const HomeScreen = ({ navigation }) => {
  const plants = [
    {
      "name": "Rahapuu",
      "state": "Tämä kasvi voi hyvin"
    }, {
      "name": "Peikonlehti",
      "state": "Tämä kasvi tarvitsee kastelua välittömästi"
    }
  ]
  return (
    <>
      <div>
        {plants.map(function(d){
          return (
          <div onClick={ () => navigation.navigate('Yhden kasvin sivu') }>
            <Card containerStyle={{}} wrapperStyle={{}} >
              <Card.Title>{d.name}</Card.Title>
              <Card.Divider />
              <View
                style={{
                  position: "relative",
                  alignItems: "center"
                }}
              >
                <Text>{d.state}</Text>
              </View>
            </Card>
          </div>)
        })} 
      </div>
      <Button
        title="Lisää kasvi"
        onPress={() => navigation.navigate('Lisää kasvi', { screen: 'Löydetyt sensorit' })}
      />
    </>
  )
}

export default function App() {

  const [isAddPlant, setIsAddPlant] = useState(false)

  const colors = {
    light: 'rgb(52,174,113)',
    dark: 'rgb(76,99,47)',
  }

  const theme = {
    Button: {
      containerStyle: {
        backgroundColor: colors.light
      }
    },
  }

  const RootStack = createStackNavigator()

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.light}/>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" initialRouteName="Etusivu">
            <RootStack.Screen name="Etusivu" component={HomeScreen} />
            <RootStack.Screen name="Yhden kasvin sivu" component={SinglePlant} />
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
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    resizeMode: 'stretch',
  },
})


// <View style={styles.container}>
//   <StatusBar style="light" backgroundColor={colors.light}/>
//
//   {true ? <AddPlant/> :
//     <>
//       <Button
//         title="Lisää kasvi"
//         onPress={setIsAddPlant}
//       />
//     </>
//   }
//
// </View>
