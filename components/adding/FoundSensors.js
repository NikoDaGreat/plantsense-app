import React, { useState } from 'react'
import { Text, View, Alert } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import { styles } from '../../style/style'
import '../../globals.js'


const FoundSensors = ({ navigation }) => {

  const [isSearched, setIsSearched] = useState(true)

  const sensorit = [
    {
      name: '123',
    },
    {
      name: '456',
    }
  ]

  const connectSensorAlert = ( sensor ) =>
    Alert.alert(
      `Haluatko yhdistää sensorin ${sensor.name}`,
      'Naapureiden sensoreihin ei kannata yhdistää 😅',
      [
        {
          text: 'Peruuta',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Kyllä', onPress: () => handleConnect( sensor ) }
      ]
    )


  const handleConnect = ( sensor ) => {
    // tallenna sensori käytetyksi ja siirry kasvin valintaan
    console.log(`${sensor.name} Pressed`)
    plantToAdd.sensor = sensor.name
    plantToAdd.state = 10
    console.log('Modified: ' + JSON.stringify(plantToAdd))
    navigation.push('Kasvihaku')
  }


  return (
    <>
      <View style={styles.container}>

        { isSearched ? (
          <>
            <Text style={styles.baseText}>Ei sensoreita saatavilla 😢, tarkista, onko sensori paritustilassa.
           Saat paritustilan käyttöön, kun painat sensorin nappia.</Text>
            <Button
              title="Kokeile uudestaan"
              buttonStyle={styles.buttonStyle}
              onPress={() => {setIsSearched(false)}}
            />
          </>
        )  : (
          <>
            <Text style={styles.promptText}>Lähistöltä löydetyt sensorit:</Text>
            {
              sensorit.map((e, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  topDivider
                >

                  <Text style={styles.smallBoldText}>
                    {e.name}{'\n'}
                    {Math.floor(Math.random() * 41) + 60}%
                    <Icon
                      type='font-awesome'
                      name='battery'
                      size={15}
                      color="black"
                    />
                  </Text>
                  <Button
                    title={'Yhdistä'}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => connectSensorAlert(e)}
                  />

                </ListItem>

              ))
            }
          </>
        )
        }

      </View>
    </>
  )
}


export default FoundSensors
