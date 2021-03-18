import { StatusBar } from 'expo-status-bar'
import React, { useState, useRef, useEffect } from 'react'
import { Card, Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPlant from './components/AddPlant'
import SinglePlant from './components/SinglePlant'
import { styles, colors } from './style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
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
    plants = []
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Cleared all plants')
}

const p1 = {'name': 'JP', 'species': 'Rahapuu', 'state': 0 };
const p2 = {'name': 'PJ', 'species': 'Peikonlehti', 'state': 0 };


function updatePlantStates() {
  plants.map(function(p) {
    const currentTime = Math.floor(new Date().getTime() / 1000)
    p.state = Math.max(0, defaultPlantState - (currentTime - p.initTime))
    console.log(p.name + ', kosteus ' + p.state)
    if(p.state <= p.notificationLimit && p.state > 0) {
      schedulePushNotification(p.name + ' tarvitsee vettä (mullan kosteus ' + p.state + ')')
      p.notificationLimit -= Math.max(0, p.notificationLimit - 10)
    }
    storeData(p.name, p)
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


setInterval( () => {
  updatePlantStates();
}, 10000)

// Background functions
const taskName = 'test-background-fetch';

async function registerTask() {
  TaskManager.defineTask(taskName, async () => {
    updatePlantStates();
    console.log('updating in background');
    return BackgroundFetch.Result.NewData;
  });
  console.log('task defined');

  await BackgroundFetch.registerTaskAsync(taskName, {
    stopOnTerminate: false,
    minimumInterval: 1
  });
  //console.log(await TaskManager.getRegisteredTasksAsync());
}

registerTask();

// Set-up app data
//console.log('Main stored: ')
//getAllKeys()

//clearAll()
getAllPlantsFromStorage()



const HomeScreen = ({ navigation }) => {
  const [plantlist, setPlantlist] = useState(plants)

  //const plants = [];
  //console.log('Main: ' + plants)

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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(msg) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Plantsense",
      body: msg,
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}