import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { Card, Button } from 'react-native-elements'
import PlantPlot from './PlantPlot'
import { styles } from '../style/style'

function waterPlant(plant) {
  plant.state = defaultPlantState + (Math.random() * 10 - 5)
  plant.notificationLimit = defaultNotificationLimit
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
    <SafeAreaView>
      <ScrollView>
        <Card containerStyle={{}} wrapperStyle={{}}>
          <Card.Title style={styles.promptTextNoMargin}>
            {plantInfo.name}
          </Card.Title>
          <Card.Divider/>
          <Text style={styles.plantText}>
        Laji: {plantInfo.species}
          </Text>
          <Text style={styles.plantText}>
        Kosteus: {plantInfo.moisture} %
            <Text style={{ fontWeight: 'bold' }}>
              {parseInt(plantInfo.moisture) > 25 ? '' : parseInt(plantInfo.moisture) > 10 ? '  Tarvitsee kastelua' : '  Kastele nyt!'}
            </Text>
          </Text>
          <Text style={styles.plantText}>
        Yhdistetty sensori: {sensorInfo.serialNumber}
          </Text>
          <Text style={styles.plantText}>
        Sensorin akku: {sensorInfo.battery}
          </Text>
          <View>
            <PlantPlot data={plotData}/>
          </View>
          <Button
            title="Kuittaa kastelu💧"
            onPress={() => waterPlant(route.params.plant)}
            buttonStyle={styles.buttonStyle}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}


export default SinglePlant
