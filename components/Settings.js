import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Switch, Share } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button, Card } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'


const Settings = ({ navigation }) => {

  const [state, setState] = useState({
    rate: plantStateRate,
    isEnabled: speedMode
  })

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

  const toggleSwitch = () => {
    speedMode = !speedMode
    plantStateRate = speedMode ? 60 : 360
    console.log('speedMode ' + speedMode)
    setState( { isEnabled: !state.isEnabled })
  }

  const onShare = async () => {
    try {
      await Share.share({
        message:
        'Hei! Kasvieni tilan voi tarkistaa osoitteesta http://plantsense.fi/84675f2baf7',
        dialogTitle: 'Kasvijako'
      })
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          icon={
            <Icon
              name="trash"
              size={17}
              color="white"
            />
          }
          title="  Poista kaikki kasvit"
          onPress={() => { handleClearAll() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <View style={{ marginTop: -10, padding: 15 }}>
        <Button
          icon={
            <Icon
              name="share-alt"
              size={17}
              color="white"
            />
          }
          title="  Jaa kasvit"
          onPress={() => { onShare() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </>
  )
}


export default Settings
