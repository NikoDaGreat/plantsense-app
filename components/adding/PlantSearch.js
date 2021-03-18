import React, { useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
// import axios from 'axios'
import { styles } from '../../style/style'
import '../../globals.js'


const PlantSearch = ({ navigation }) => {

  const plantList = ['Peikonlehti', 'Rahapuu', 'Herttaköynnösvehka', 'Posliinikukka', 'Yönkuningatar']
  const AbortController = window.AbortController // Abort DOM API for non browsers

  const [state, setState] = useState( {
    data: plantList,
    filter: '',
    name: '',
    controller: new AbortController()
  })

  // useEffect(() => {
  //   const controller = new AbortController()
  //   const signal = controller.signal
  //   setFetchRes('fetch request created')
  //   hitApi(signal).then((res) => {
  //     setFetchRes(res)
  //   })
  //   //cleanup function
  //   return () => {controller.abort()}
  // }, [fetchClick])


  const handleSelectPlant = ( plant ) => {
    // tallenna kasvi käytetyksi ja kysy lempinimeä
    console.log(`Painettu tekstiä ${plant}`)
    plantToAdd.species = plant
    console.log('Modified: ' + JSON.stringify(plantToAdd))
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

  const searchFilterFunction = async ( text ) => {
    // REST API :Dd
    // Abort previous fetches and null abort state
    //console.log('controller:', state.controller)
    state.controller.abort()

    await setState({
      controller: new AbortController(),
    })

    const url = `https://api.finto.fi/rest/v1/search?vocab=kassu&query=${text}*&lang=fi&maxhits=10`
    fetch(url, state.controller.signal)
      .then((response) => response.json())
      .then((data) => {
        const newData = data.results.map( e => e.prefLabel )
        setState({
          data: newData,
        })
      })
      .catch((error) => {
        console.error(error)
      })

    // const newData = plantList.filter(e => e.toLowerCase().includes(text.toLowerCase()))
  }

  return (
    <>
      <View style={styles.container}>

        <Text style={styles.promptText}>Valitse kasvisi laji alla olevista vaihtoehdoista:</Text>

        <View style={styles.searchStyle}>
          <SearchBar
            lightTheme
            platform="android"
            inputStyle={{ backgroundColor: 'white' }}
            inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
            placeholder="Kirjoita tähän"
            round
            onChangeText={ (text) => { setState({
              filter: text,
            })
            searchFilterFunction(text) }}
            value={state.filter}
            autoFocus={true}
          />
          <FlatList
            data={state.data}
            renderItem={({ item }) => (
              <Text
                style={styles.listText}
                onPress={() => { handleSelectPlant(item) }}
              >
                {item}
              </Text>
            )}
            keyExtractor={item => item}
            ItemSeparatorComponent={renderSeparator}

          />
        </View>

      </View>

    </>
  )
}


export default PlantSearch
