import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Switch } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'
import { waterPlant } from './SinglePlant.js'


const Settings = ({ navigation }) => {

  const [rate, setRate] = useState(plantStateRate)
  const [mockPlantName, setMockPlantName] = useState('')
  const [mockPlantSpecies, setMockPlantSpecies] = useState('')
  const [mockPlantDays, setMockPlantDays] = useState(5)
  const [mockPlantMeasurementFreq, setMockPlantMeasurementFreq] = useState(7200)
  const [mockPlantDaysToDry, setMockPlantDaysToDry] = useState(2)

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

  const saveRate = () => {
    plantStateRate = rate
    Alert.alert(
      'Asetukset',
      'Kuivumisnopeus tallennettu',
      [
        { text: 'Ok' }
      ]
    )
  }

  const onRateTextChange = (text) => {
    setRate(parseInt(text) ? parseInt(text) : '')
  }

  const onMockPlantNameChange = (text) => {
    setMockPlantName(text)
    console.log(mockPlantName + ' ' + mockPlantSpecies + ' ' + rate)
  }

  const onMockPlantSpeciesChange = (text) => {
    setMockPlantSpecies(text)
    console.log(mockPlantName + ' ' + mockPlantSpecies)
  }

  const saveMockPlant = () => {
    let p = {}
    p.name = mockPlantName
    p.species = mockPlantSpecies
    p.sensor = '123'
    p.state = defaultPlantState + (Math.random() - 0.5) * 10
    p.sensorData = createMockData(p, 10, 10*3600, 2)
    mockPlants.push(p)
    Alert.alert(
      'Asetukset',
      'Tekokasvi tallennettu',
      [
        { text: 'Ok' }
      ]
    )
  }

  /*
  Arguments:
    days: for how many days mockdata is created
    measurementFrequency: how often measurements are made, in seconds
    daysToDry: how many days it takes the plant to dry after watering
  */
  const createMockData = (p, days, measurementFrequency, daysToDry) => {
    let date = new Date(Date.UTC('2021', '02', '30', '13', '15', '00'))
    let initTime = Math.floor(date.getTime()/1000)
    let plist = []
    let limit = 20 - (Math.random() * 20)
    const measurementsInInterval = (daysToDry * 24 * 3600) / measurementFrequency
    const daysInSeconds = days * 24 * 60 * 60
    for (var t = 0; t < daysInSeconds; t += measurementFrequency) {
      let currentTime = initTime + t
      if (p.state < limit) { 
        p.state = defaultPlantState + (Math.random() - 0.5) * 10
        limit = 20 - (Math.random() * 20)
      } else {
        let newState = p.state * Math.pow(20/60,1/(measurementsInInterval))
        p.state = Math.max(0, newState)
      }
      plist.push({x: currentTime, y: p.state})
      console.log('Adding datapoint: ' + currentTime + ', ' + p.state)
    }
    return plist
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
              value={rate.toString()}
              style={styles.textInput}
              underlineColorAndroid='rgb(52,174,113)'
            />
          </View>
        </Card>
        <Card>
          <View>
            <Button
              onPress={saveMockPlant}
              title='Tallenna tekokasvi'
              buttonStyle={styles.buttonStyle}
            />
            <TextInput 
              //keyboardType='numeric'
              placeholder='Tekokasvin nimi'
              onChangeText={onMockPlantNameChange}
              //value={state.mockPlantName}
              style={styles.textInput}
              underlineColorAndroid='rgb(52,174,113)'
            />
            <TextInput 
              //keyboardType='numeric'
              placeholder='Tekokasvin laji'
              onChangeText={onMockPlantSpeciesChange}
              //value={state.mockPlantSpecies}
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
