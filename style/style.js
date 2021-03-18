import { StyleSheet, Dimensions } from 'react-native'

export const colors = {
  light: 'rgb(52,174,113)',
  dark: 'rgb(76,99,47)',
}

export const styles = StyleSheet.create({
  /* Views */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  stretch: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    resizeMode: 'stretch',
  },

  /* Texts */
  baseText: {
    fontSize: 19,
    fontFamily: 'Roboto',
    margin: Dimensions.get('window').width / 13
  },
  plantText: {
    fontSize: 19,
    // fontFamily: 'Roboto',
  },
  promptText: {
    fontSize: 28,
    color: colors.light,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    margin: Dimensions.get('window').width / 13
  },
  promptTextNoMargin: {
    fontSize: 28,
    color: colors.light,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    margin: 0
  },
  smallBoldText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  listText: {
    fontSize: 17,
    fontFamily: 'Roboto',
    margin: 10
  },
  textInput: {
    height: 40,
    width: Dimensions.get('window').width / 2.7,
    fontSize: 17,
    fontWeight: 'bold',
    margin: 20,
    paddingLeft: 6
  },
  searchStyle: {
    justifyContent: 'center', flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#F6F6F6',
    marginTop: 29,
  },

  /* Misc. */
  buttonStyle: {
    backgroundColor: colors.light
  },
})
