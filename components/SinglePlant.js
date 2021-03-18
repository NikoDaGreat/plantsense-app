import React from 'react'
import { Text, View } from 'react-native'
import { Card, Button} from 'react-native-elements'
import PlantPlot from './PlantPlot'
import { styles } from '../style/style'

function waterPlant(plant) {
  plant.state = defaultPlantState
  plant.notificationLimit = defaultNotificationLimit + (Math.random() * 10 - 5)
  plant.initTime = Math.floor(new Date().getTime() / 1000)
  //storeData(plant.name, plant)
  console.log(plant.name + ', kosteus ' + plant.state)
}

const SinglePlant = ({ navigation, route }) => {

  // Unix time x, y in percentage
  const plotData = route.params.plant.sensorData.map( (point) => {
    return { ...point, label: `${point.y}%` }
  })

  const plantInfo = {
    'name': route.params.plant.name,
    'species': route.params.plant.species, // ehkä nimen perusteella hakee AsyncStoragesta?
    'moisture': route.params.plant.state,
  }
  const sensorInfo = {
    'serialNumber': route.params.plant.sensor,
    'battery': '100 %'
  }

  return (
    <Card containerStyle={{}} wrapperStyle={{}}>
      <Card.Title style={styles.promptText}>
        {plantInfo.name}
      </Card.Title>
      <Card.Divider/>
      <Text style={styles.plantText}>
        Laji: {plantInfo.species}
      </Text>
      <Text style={styles.plantText}>
        Kosteus: {plantInfo.moisture} %
      </Text>
      <Text style={styles.plantText}>
        Yhdistetty sensori: {sensorInfo.serialNumber}
      </Text>
      <Text style={styles.plantText}>
        Sensorin akku: {sensorInfo.battery}
      </Text>
      <Button
        title="Kastele"
        onPress={() => waterPlant(route.params.plant)}
        buttonStyle={styles.buttonStyle}
      />
      <View>
        <PlantPlot data={plotData}/>
      </View>
    </Card>
  )
}


export default SinglePlant
