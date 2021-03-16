import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const PlantSearch = ({ navigation }) => {

  // const fs = require('fs')
  // fs.readFile('../../kasvilista.txt', (text) => {
  //   const plantList = text.toString('utf-8').split('\n')
  // })
  const plantList = ['Peikonlehti', 'Rahapuu', 'Herttaköynnösvehka', 'Posliinikukka', 'Yönkuningatar']

  const [state, setState] = useState( {
    data: plantList,
    filter: '',
    name: '',
  })


  const handleSelectPlant = ( plant ) => {
    // tallenna kasvi käytetyksi ja kysy lempinimeä
    console.log(`Painettu tekstiä ${plant}`)
    navigation.push('Nimeä kasvi')
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    )
  }

  const renderHeader = () => {
    return (
      <SearchBar
        lightTheme
        inputStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
        placeholder="Kirjoita tähän"
        round
        onChangeText={ (text) => { searchFilterFunction(text) }}
        value={state.filter}
        autoFocus={true}
      />
    )
  }

  const searchFilterFunction = async ( text ) => {
    // sais REST :D `https://api.finto.fi/rest/v1/search?vocab=kassu&query=${input}*&lang=fi`
    const newData = plantList.filter(e => e.toLowerCase().includes(text.toLowerCase()))
    setState({
      filter: text,
      data: newData,
    })
  }

  return (
    <>
      <View style={styles.container}>

        <Text style={styles.baseText}>Valitse kasvisi laji alle olevista vaihtoehdoista:</Text>

        <View style={styles.searchStyle}>
          <FlatList
            data={state.data}
            renderItem={({ item }) => (
              <Text
                style={styles.listText}
                onPress={() => { handleSelectPlant(item) }} >
                {item}
              </Text>
            )}
            keyExtractor={item => item}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
          />
        </View>

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
  listText: {
    fontSize: 17,
    fontFamily: 'Roboto',
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchStyle: {
    justifyContent: 'center', flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#F6F6F6',
    marginTop: 29,
  }
})

export default PlantSearch
