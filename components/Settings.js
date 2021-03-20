import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Switch } from 'react-native'
import { Button } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'
import { storeData } from '../storage.js'


const Settings = ({ navigation }) => {

  const lala_names = ['Name1', 'Name2', 'Name3', 'Name4']
  const lala_plants = lala_names.map( (nimi) => ({
    name: nimi,
    species: 'Lala osallistuja',
    moisture: 100,
    state: 100,

    sensor: '0',
    notificationLimit: defaultNotificationLimit,
    prevTime: Math.floor(new Date().getTime() / 1000),
    sensorData: []
  }) )

  const handleLala = () => {
    // tallenna kasvin lempinimi ja poistu etusivulle
    // console.log(`Valittu lempinimi ${state.name}`)
    // plantToAdd.name = state.name

    lala_plants.forEach((e) => {
      plants.push(e)
      storeData(e.name, e)
    })
  }

  const [state, setState] = useState({
    rate: plantStateRate,
    isEnabled: speedMode
  })

  const handleClearAll = () => {
    Alert.alert(
      'Haluatko varmasti poistaa kasvit?',
      '❌🏵🌵☘',
      [
        {
          text: 'Peruuta',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Kyllä', onPress: () => {
          clearAll()
          plants = []
        } }
      ]
    )

  }

  const toggleSwitch = () => {
    speedMode = !speedMode
    plantStateRate = speedMode ? 60 : 360
    console.log('speedMode ' + speedMode)
    setState( { isEnabled: !state.isEnabled })
  }

  return (
    <>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Poista kaikki kasvit"
          onPress={() => { handleClearAll() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Lisää lala osallistujat"
          onPress={() => { handleLala() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Text style={styles.baseText}>Pikatestaus (ilmoitus n. 40 min kastelusta) </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={state.isEnabled}
      />
    </>
  )
}


export default Settings
