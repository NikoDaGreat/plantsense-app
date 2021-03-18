import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { clearAll } from '../storage.js'
import { styles } from '../style/style'


const Settings = ({ navigation }) => {

  return (
    <>
      <View style={{ marginTop: 10, padding: 15 }}>
        <Button
          title="Poista kaikki kasvit"
          onPress={() => {
            clearAll()
            plants = []
          }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </>
  )
}


export default Settings
