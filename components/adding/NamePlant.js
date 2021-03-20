import React, { useState } from 'react'
import { Text, View, Alert, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { styles } from '../../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import '../../globals.js'
import { storeData } from '../../storage.js'


const NamePlant = ({ navigation }) => {

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

  const [state, setState] = useState({
    name: '',
  })

  const handleNamePlant = ( ) => {
    // tallenna kasvin lempinimi ja poistu etusivulle
    console.log(`Valittu lempinimi ${state.name}`)
    plantToAdd.name = state.name

    lala_plants.forEach((e) => {
      plants.push(e)
      storeData(e.name, e)
    })


    plantToAdd = {}
    console.log(plants)
    console.log('Modified: ' + JSON.stringify(plantToAdd))

    Alert.alert(
      'Onnistui!',
      `Tallennettu ${state.name} onnistuneesti 💪. Kasvi ilmestyy listaan ensimmäisen mittauksen tullessa sensorista (n. 10s).`,
      [
        { text: 'Jiihaa!', onPress: () => {console.log('onnistuttu')} }
      ]
    )

    navigation.navigate('Etusivu')  // etusivulle ->
  }



  return (
    <>
      <View style={styles.container}>

        <Text style={styles.promptText}>Anna kasvillesi lempinimi</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={ (text) => {setState({ name: text })} }
          placeholder="esim. Jean Pierre III"
          placeholderTextColor="grey"
          underlineColorAndroid='rgb(52,174,113)'
        />
        <Button
          title="Hyväksy"
          buttonStyle={styles.buttonStyle}
          onPress={() => {handleNamePlant()}}
        />

      </View>

    </>
  )
}


export default NamePlant
