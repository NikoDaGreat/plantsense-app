import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


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
              onPress={() => {setIsSearched(false)}}
            />
          </>
        )  : (
          <>
            <Text style={styles.baseText}>Lähistöltä löydetyt sensorit:</Text>
            {
              sensorit.map((e, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  topDivider
                >

                  <Text style={styles.titleText}>
                    {e.name}{'\n'}
                    {Math.floor(Math.random() * 41) + 60}%
                    <Icon
                      type='font-awesome'
                      name='battery'
                      size={15}
                      color="black"
                    />
                  </Text>

                  <Button title={'Yhdistä'} onPress={() => connectSensorAlert(e)} />

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

const styles = StyleSheet.create({
  baseText: {
    fontSize: 19,
    fontFamily: 'Roboto',
    margin: Dimensions.get('window').width / 13
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FoundSensors
