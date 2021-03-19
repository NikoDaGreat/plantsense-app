import React from 'react'
import { Dimensions } from 'react-native'
import { VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryGroup,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  createContainer } from 'victory-native'
import { colors } from '../style/style'


const PlantPlot = ({ data }) => {

  //const lowerLimit = [ { x: Math.min(...data.map(xy => xy.x)), y: 10 }, { x: Math.max(...data.map(xy => xy.x)) + 4 * 3600, y: 10 } ]
  //const upperLimit = [ { x: Math.min(...data.map(xy => xy.x)), y: 60 }, { x: Math.max(...data.map(xy => xy.x)) + 4 * 3600, y: 60 } ]
  const minX = Math.min(...data.map(xy => xy.x))
  const maxX = Math.max(...data.map(xy => xy.x))
  const lowerLimit = [ { x: minX, y: 10 }, { x: maxX + (maxX - minX) * 0.2, y: 10 } ]
  const upperLimit = [ { x: minX, y: 60 }, { x: maxX + (maxX - minX) * 0.2, y: 60 } ]
  const limits = [lowerLimit, upperLimit]

  const GivenVictoryContainers = createContainer('zoom', 'voronoi')

  return (
    <>
      <VictoryChart
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width * 0.93}
        containerComponent={
          <GivenVictoryContainers label={d => `${d.label}`} />
        }
      >
        {/* Axis labels */}
        <VictoryAxis
          dependentAxis
          label='Kosteus (%)'
          style={{ axis: { strokeWidth: 2.0 } }}
          axisLabelComponent={<VictoryLabel dy={35}/>}
        />
        <VictoryAxis
          label='Aika'
          tickFormat={(unix_time) => {
            const current = new Date(unix_time * 1000)
            const hours = current.getHours()
            const minutes = '0' + current.getMinutes()
            return `${hours + '.' + minutes.substr(-2)}`}}
          style={{ axis: { strokeWidth: 2.0 } }}
          axisLabelComponent={<VictoryLabel dy={-30}/>}
        />

        {/* Main plot */}
        <VictoryGroup
          domain={ { y: [0, Math.max(80,  Math.max(...data.map(xy => xy.y)))] } }
          labelComponent={<VictoryTooltip renderInPortal={false} />}
          data={data}
        >
          <VictoryLine
            style={{
              data: {
                stroke: colors.light,
                strokeWidth: 4.5
              }
            }}
            interpolation='catmullRom'
          />
          <VictoryScatter
            symbol='diamond'
            color='black'
            size={({ active }) => active ? 8 : 4}
          />
        </VictoryGroup>

        {/* Upper and lower limits */}
        { limits.map( (limit, i) =>
          <VictoryLine
            key={i}
            interpolation='natural'
            data={limit}
            style={{
              data: {
                stroke: 'red',
                strokeWidth: 2,
                strokeDasharray: 5.0
              }
            }}
          />
        )}
      </VictoryChart>
    </>
  )
}


export default PlantPlot
