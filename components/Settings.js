import React from 'react'
import { Button } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'


const Settings = ({ navigation }) => {

  const Stack = createStackNavigator()

  return (
    <>
    <Button
      title="Poista kaikki kasvit"
      onPress={() => {
        clearAll()
        plants = []
      }}
      buttonStyle={styles.buttonStyle}
    />
    </>
  )
}


export default Settings
