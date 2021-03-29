import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Switch } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'
import { waterPlant } from './SinglePlant.js'


const Settings = ({ navigation }) => {

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

  const waterAll = () => {
    plants.map(function(p) {
      waterPlant(p);
    })
    Alert.alert(
      'Asetukset',
      'Kaikki kasvit kasteltu',
      [
        { text: 'Ok' }
      ]
    )
  }


  const toggleSwitch = () => {
    speedMode = !speedMode
    plantStateRate = speedMode ? 60 : 360
    console.log('speedMode ' + speedMode)
    setState( { isEnabled: !state.isEnabled })
  }

  const saveRate = () => {
    plantStateRate = state.rate
    Alert.alert(
      'Asetukset',
      'Kuivumisnopeus tallennettu',
      [
        { text: 'Ok' }
      ]
    )
  }

  const onRateTextChange = (text) => {
    setState( {
      rate: parseInt(text) ? parseInt(text) : ''
    })
  }


  return (
    <>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Poista kaikki kasvit"
          onPress={() => { handleClearAll() }}
          buttonStyle={styles.buttonStyle}
        />
        <View style={{ marginTop: 10 }} />
        <Button
          title="Kastele kaikki"
          onPress={() => { waterAll() }}
          buttonStyle={styles.buttonStyle}
        />
      {/*
        <Card containerStyle={{}} wrapperStyle={{}} >
          <Card.Title>Pikatestaus (ilmoitus n. 40 min kastelusta)</Card.Title>
          <Card.Divider />
          <View
            style={{
              position: 'relative',
              alignItems: 'center'
            }} >
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={state.isEnabled}
            />
          </View>
        </Card>
      */}
        <Card>
          <View>
          <Button
            onPress={saveRate}
            title='Aseta kuivumisnopeus'
            buttonStyle={styles.buttonStyle}
          />
          <Text style={{textAlign:'center'}}>Sekuntia per prosenttiyksikön kuivuminen </Text>
          <TextInput 
            keyboardType='numeric'
            placeholder=''
            onChangeText={onRateTextChange}
            value={state.rate.toString()}
            style={styles.textInput}
            underlineColorAndroid='rgb(52,174,113)'
          />
          </View>
        </Card>
      </View>
    </>
  )
}


export default Settings
