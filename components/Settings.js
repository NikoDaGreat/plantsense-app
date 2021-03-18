import React from 'react'
import { View, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'


const Settings = ({ navigation }) => {

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

  return (
    <>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Poista kaikki kasvit"
          onPress={() => { handleClearAll() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </>
  )
}


export default Settings
