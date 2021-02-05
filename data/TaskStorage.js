import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'Tasks';

const LoadTasks = () => {
    const func = async(resolve, reject) => {
      let tasks = await AsyncStorage.getItem(STORAGE_KEY).
      catch((e) => reject(e));

      tasks === null 
      ? tasks = []
      : tasks = JSON.parse(tasks);

      resolve(tasks);
    }

    return new Promise(func);
};

const SaveTasks = (tasks) => {
    const func = async(resolve, reject) => {
      const save = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).
      catch((e) => reject(e));

      resolve('201 - created.')
    }

    return new Promise(func);
};

export default {LoadTasks, SaveTasks};