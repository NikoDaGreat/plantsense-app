import { StatusBar } from 'expo-status-bar'
import React, { useState, useRef, useEffect } from 'react'
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
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
import { VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryGroup,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  createContainer } from 'victory-native'


function updatePlantStates() {
  plants = plants.map(function(p) {
    const currentTime = Math.floor(new Date().getTime() / 1000)
    const newState = p.state -
      ((1/32) * (currentTime - p.prevTime) + (Math.random() * 8))
    p.state = Math.round(Math.max(0, newState))
    p.prevTime = currentTime
    console.log(p.name + ', kosteus ' + p.state)
    if(p.state <= p.notificationLimit && p.state > 0) {
      schedulePushNotification(p.name + ' tarvitsee vettä (Kosteus: ' + p.state + '%)')
      p.notificationLimit = Math.max(0, p.notificationLimit - 10)
    }
    if (p.dropTime === undefined && p.state <= 0) {
      time = new Date()
      p.dropTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
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
  // updatePlantStates()
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
        // updatePlantStates()
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

  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const GivenVictoryContainers = createContainer('zoom', 'voronoi')

  const lala_data = plants.map(p => p.sensorData)

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
                name="refresh"
                size={17}
                color="white"
              />
            }
            title="  Seuraava tick"
            onPress={() => {updatePlantStates()}}
            buttonStyle={styles.buttonStyle}
          />
        </View>


        <>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width * 0.93}
            containerComponent={
              <GivenVictoryContainers label={d => `${d.label}`} />
            }
          >
            {/* Axis labels */}
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              label='Kosteus (%)'
              style={{ axis: { strokeWidth: 2.0 } }}
              axisLabelComponent={<VictoryLabel dy={35}/>}
            />
            <VictoryAxis
              label='Aika'

              tickFormat={(unix_time) => {
                const current = new Date(unix_time * 1000)
                const hours = current.getHours()
                const minutes = '0' + current.getMinutes()
                return `${hours + '.' + minutes.substr(-2)}`}}
              style={{ axis: { strokeWidth: 2.0 } }}
              axisLabelComponent={<VictoryLabel dy={-30}/>}
            />

            {/* Main plot
            <VictoryGroup
              domain={ { y: [0, Math.max(80,  Math.max(...data.map(xy => xy.y)))] } }
              labelComponent={<VictoryTooltip renderInPortal={false} />}
              data={data}
            >
              <VictoryLine

              />
              <VictoryScatter
                color='black'
                size={({ active }) => active ? 8 : 4}
              />
            </VictoryGroup>
            */}

            {/* Upper and lower limits */}
            { lala_data.map( (limit, i) =>
              <VictoryLine
                symbol='diamond'
                key={i}
                interpolation='linear'
                data={limit}
                style={{
                  data: {
                    stroke: colors.light,
                    strokeWidth: 4.5
                  }
                }}
              />
            )}
          </VictoryChart>

          { plants.sort(function(a, b){return a.dropTime - b.dropTime}).map( (p, i) => {
            if (p.state <= 0) { return (
              <Text styles={styles.baseText} key={i}>{p.name} putosi ajassa {p.dropTime}</Text>
            )}
          }
          )}
        </>





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
