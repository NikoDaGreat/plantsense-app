import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Switch, ScrollView } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'
import { waterPlant } from './SinglePlant.js'


const Settings = ({ navigation }) => {

  const [rate, setRate] = useState(plantStateRate)
  const [mockPlantName, setMockPlantName] = useState('')
  const [mockPlantSpecies, setMockPlantSpecies] = useState('')
  const [mockPlantNotifications, setMockPlantNotifications] = useState(5)

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
  }

  const onMockPlantSpeciesChange = (text) => {
    setMockPlantSpecies(text)
  }

  const saveMockPlant = () => {
    let p = {}
    p.name = mockPlantName
    p.species = mockPlantSpecies
    p.sensor = '123'
    p.state = 0
    p.sensorData = createMockData(p, 5, mockPlantNotifications)
    mockPlants.push(p)
    Alert.alert(
      'Asetukset',
      'Tekokasvi tallennettu',
      [
        { text: 'Ok' }
      ]
    )
  }

  const deleteMockPlants = () => {
    mockPlants = []
    Alert.alert(
      'Asetukset',
      'Tekokasvit poistettu',
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
  const createMockData = (p, days, notifications) => {
    let date = new Date(Date.UTC('2021', '02', '30', '13', '15', '00'))
    let initTime = Math.floor(date.getTime()/1000)
    let plist = []
    let limit = 20 - (Math.random() * 20)

    const nMeasurements = 24
    //const measurementsInInterval = (daysToDry * 24 * 3600) / measurementFrequency
    const daysInSeconds = days * 24 * 60 * 60
    const measurementFrequency = Math.floor(daysInSeconds/nMeasurements)

    for (var t = 0; t < daysInSeconds; t += measurementFrequency) {
      let currentTime = initTime + t
      if (p.state < limit) { 
        p.state = defaultPlantState + (Math.random() - 0.5) * 10
        limit = 20 - (Math.random() * 20)
      } else {
        let stateMultiplier = Math.pow(10/60,1/(nMeasurements/notifications))
        let newState = p.state * stateMultiplier
        p.state = Math.max(0, newState)
      }
      plist.push({x: currentTime, y: p.state})
      console.log('Adding datapoint: ' + currentTime + ', ' + p.state)
    }
    return plist
  }


  return (
    <ScrollView>
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
            <Text style={{textAlign:'center'}}>Luo kasvi, jolla on staattinen data valmiina</Text>
            <TextInput 
              //keyboardType='numeric'
              placeholder='Tekokasvin nimi'
              onChangeText={onMockPlantNameChange}
              style={styles.textInput}
              underlineColorAndroid='rgb(52,174,113)'
            />
            <TextInput 
              //keyboardType='numeric'
              placeholder='Tekokasvin laji'
              onChangeText={onMockPlantSpeciesChange}
              style={styles.textInput}
              underlineColorAndroid='rgb(52,174,113)'
            />
            <TextInput 
              keyboardType='numeric'
              placeholder='Notifikaatiot (kpl)'
              onChangeText={(text) => setMockPlantNotifications(parseInt(text) ? parseInt(text) : NaN) }
              style={styles.textInput}
              underlineColorAndroid='rgb(52,174,113)'
            />
            <Button
              title="Poista kaikki tekokasvit"
              onPress={deleteMockPlants}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}


export default Settings
