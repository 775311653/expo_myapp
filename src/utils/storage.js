import AsyncStorage from  "@react-native-async-storage/async-storage";
class Storage {
  static getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static setItem(key, value) {
    AsyncStorage.setItem(key, value + "");
  }
  static removeItem(key) {
    AsyncStorage.removeItem(key);
  }
  static clear() {
    AsyncStorage.clear();
  }
}

export default Storage;
