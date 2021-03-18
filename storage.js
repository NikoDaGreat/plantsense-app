import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getAllKeys() {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }

  console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

export async function getAllPlantsFromStorage() {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }
  keys.map(async function(k) {
    const p = await getData(k);
    plants.push(p);
  })
}


export async function storeData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    //console.log('stored');
  } catch (e) {
    // error
  }
}

export async function getData(key: string) {
  try {
    //console.log('getting timer');
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export async function removeValue(key: string) {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
  console.log('Removed ' + key)
}

export async function clearAll() {
  try {
    plants = []
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Cleared all plants')
}
