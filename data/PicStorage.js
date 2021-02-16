import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ImgPaths';

const LoadPicPaths = () => {
    const func = async(resolve, reject) => {
      let picPaths = await AsyncStorage.getItem(STORAGE_KEY).
      catch((e) => reject(e));

      picPaths === null 
      ? picPaths = []
      : picPaths = JSON.parse(picPaths);

      resolve(picPaths);
    }

    return new Promise(func);
};

const SavePicPaths = (picPaths) => {
    const func = async(resolve, reject) => {
      const save = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(picPaths)).
      catch((e) => reject(e));

      resolve('201 - created.')
    }

    return new Promise(func);
};

export default { LoadPicPaths, SavePicPaths};