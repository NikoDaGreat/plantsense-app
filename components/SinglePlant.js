import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import PlantPlot from './PlantPlot'
import { styles } from '../style/style'


const SinglePlant = ({ navigation, route }) => {

  const plotData = [ // Unix time x, y in percentage
    { x: 1615973462 - 7*4 * 3600, y: 50 },
    { x: 1615973462 - 6*4 * 3600, y: 40 },
    { x: 1615973462 - 5*4 * 3600, y: 32 },
    { x: 1615973462 - 4*4 * 3600, y: 15 },
    { x: 1615973462 - 3*4 * 3600, y: 50 },
    { x: 1615973462 - 2*4 * 3600, y: 35 },
    { x: 1615973462 - 4 * 3600, y: 37 },
    { x: 1615973462, y: 26 }
  ].map( (point) => {
    return { ...point, label: `${point.y}%` }
  })

  const plantInfo = {
    'name': route.params.name,
    'species': 'Rahapuu', // ehkä nimen perusteella hakee AsyncStoragesta?
    'moisture': '72',
  }
  const sensorInfo = {
    'serialNumber': '123',
    'battery': '27%'
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
        Kosteus: {plantInfo.moisture}
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
    </Card>
  )
}


export default SinglePlant
