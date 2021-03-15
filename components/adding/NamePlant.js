import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert, FlatList, TextInput } from 'react-native'
import { Card, Icon, ListItem, Button, ThemeProvider, SearchBar } from 'react-native-elements'

const NamePlant = ({ navigation }) => {

  const [state, setState] = useState( {
    name: '',
  })


  const handleNamePlant = ( ) => {
    // tallenna kasvin lempinimi ja poistu etusivulle
    console.log(`Valittu lempinimi ${state.name}`)

    Alert.alert(
      'Onnistui!',
      `Tallennettu ${state.name} onnistuneesti 💪`,
      [
        { text: 'Jiihaa!', onPress: () => {console.log('onnistuttu')} }
      ]
    )

    // etusivulle ->
    navigation.navigate('Etusivu')
    // navigation.popToTop() // first screen in the stack.
  }



  return (
    <>
      <View style={styles.container}>


        <Text style={styles.baseText}>Anna kasvillesi lempinimi</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={ (text) => {setState({ name: text })} }
          placeholder="esim. Jean Pierre III"
          placeholderTextColor="grey"
          underlineColorAndroid='rgb(52,174,113)'
        />
        <Button
          title="Hyväksy"
          color="green"
          onPress={() => {handleNamePlant()}}
        />

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
  textInput: {
    height: 40,
    width: Dimensions.get('window').width / 2.7,
    fontSize: 17,
    fontWeight: 'bold',
    margin: 20,
    paddingLeft: 6
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NamePlant
