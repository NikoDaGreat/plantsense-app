import { StatusBar } from 'expo-status-bar'
import React, { useState, useRef, useEffect } from 'react'
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import SinglePlant from './components/SinglePlant'
import { styles, colors } from './style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import './globals.js'
import { getAllPlantsFromStorage, clearAll, storeData } from './storage.js'
import Settings from './components/Settings'


function updatePlantStates() {
  plants = plants.map(function(p) {
    const currentTime = Math.floor(new Date().getTime() / 1000)
    const newState = defaultPlantState -
      ((1/plantStateRate) * (currentTime - p.initTime) + (Math.random() * 0.5))
    p.state = Math.round(Math.max(0, newState))
    console.log(p.name + ', kosteus ' + p.state)
    if(p.state <= p.notificationLimit && p.state > 0) {
      schedulePushNotification(p.name + ' tarvitsee vettä (Kosteus: ' + p.state + '%)')
      p.notificationLimit = Math.max(0, p.notificationLimit - 10)
    }
    p.sensorData.push({ x: currentTime, y: p.state })
    storeData(p.name, p)
    return p
  })
}

function waterAll() {
  plants.map(function(p) {
    console.log('Kaikki kasteltu')
    p.state = defaultPlantState
    p.notificationLimit = defaultNotificationLimit
    p.initTime = Math.floor(new Date().getTime() / 1000)
    storeData(p.name, p)
    console.log(p.name + ', kosteus ' + p.state)
  })
}

// Update plant states when app is active
setInterval( () => {
  updatePlantStates()
}, updateRate)

// Set up background tasks and register them
const taskName = 'test-background-fetch'

async function registerTask() {
  TaskManager.defineTask(taskName, async () => {
    updatePlantStates()
    console.log('updating in background')
    return BackgroundFetch.Result.NewData
  })
  console.log('task defined')

  await BackgroundFetch.registerTaskAsync(taskName, {
    stopOnTerminate: false,
    minimumInterval: 1
  })
  //console.log(await TaskManager.getRegisteredTasksAsync());
}

registerTask()

// Set-up app data
getAllPlantsFromStorage()


const HomeScreen = ({ navigation }) => {
  const [plantlist, setPlantlist] = useState(plants)

  // Tried to make homescreen update when returned to
  useEffect(
    () => {
      const unsubscribe = navigation.addListener('focus', () => {
        setPlantlist(plants)
      })
      return unsubscribe
    },
    [navigation],
  )

  // Update homescreen every second
  useEffect(
    () => {
      const intervalId = setInterval(() => {
        setPlantlist(plants)
      }, 1000)
      return () => clearInterval(intervalId)
    },
    [navigation],
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {plantlist.map(function(d){
            return (
              <TouchableOpacity key={d.name}
                onPress={ () => navigation.navigate('Yksittäinen kasvi', {
                  plant: d,
                }) } >
                <Card containerStyle={{}} wrapperStyle={{}} >
                  <Card.Title>{d.name}</Card.Title>
                  <Card.Divider />
                  <View
                    style={{
                      position: 'relative',
                      alignItems: 'center'
                    }} >
                    <Text>
                    Kosteus {d.state} %
                      {parseInt(d.state) > 25 ? '' : parseInt(d.state) > 10 ? ',  Tarvitsee kastelua' : ',  Kastele nyt!'}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>)
          })}
        </View>
        <View style={{ marginTop: 10, padding: 15 }}>
          <Button
            icon={
              <Icon
                name="leaf"
                size={17}
                color="white"
              />
            }
            title="  Lisää kasvi"
            onPress={() => navigation.navigate('Lisää kasvi', { screen: 'Löydetyt sensorit' })}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={{ marginTop: -10, padding: 15 }}>
          <Button
            icon={
              <Icon
                name="gear"
                size={17}
                color="white"
              />
            }
            title="  Asetukset"
            onPress={() => navigation.navigate('Asetukset', { screen: 'Asetukset' })}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default function App() {
  // Notification stuff
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

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
          <RootStack.Screen
            name="Asetukset"
            component={Settings}
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

// Notification functions
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

async function schedulePushNotification(msg) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Plantsense',
      body: msg,
      data: { data: 'goes here' },
    },
    trigger: null,
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}
