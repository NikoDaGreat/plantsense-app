import React, { useState } from 'react'
import { Text, View, Alert, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { styles } from '../../style/style'


const NamePlant = ({ navigation }) => {

  const [state, setState] = useState({
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
