// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import {v4 as uuidv4} from 'uuid';

// my components
import ButtonTypes from './data/ButtonTypes';
import TaskList from './components/Exc2/TextListView';
import EditTask from "./components/EditTask";
import TaskStorage from './data/TaskStorage';

// the App to rule them all
export default function App() {

  //const [taskArr, setTaskArr] = useState([]);
  const [task, setTask] = useState({
    key:undefined, 
    title:undefined, 
    description:undefined, 
    date:undefined
  });
  const [tasks, setTasks] = useState([]);
  const [isModifyActive, setModifyActive] = useState(false);
  const [currentTask, setCurrentTask] = useState(undefined);

  useEffect(() => {
    (async() => {
      console.log('Loading...');
      const tasks1 = await TaskStorage.LoadTasks().catch(e => console.log(e));
      
      setTasks(tasks1);

      for (t in tasks1) {
        console.log(tasks1[t].title)
      }
    })()
  }, []);

  useEffect(() => {
    (async() => {
      console.log('Saving...');
      await TaskStorage.SaveTasks(tasks).catch(e => console.log(e));
    })();
  }, [tasks]);
  
  // 2:38 =>
  const onSubmit = (taskToSave) => {
    let key_tmp = undefined;
    if (currentTask !== undefined) {
      // handle updated data
      key_tmp = taskToSave.key;
      
    } else {
      // create new task
      key_tmp = uuidv4();
    }

    createNewTask(taskToSave, key_tmp);

    setCurrentTask(undefined);
    setModifyActive(false);
  };

  const createNewTask = (taskToSave, key_tmp) => {
    console.log('creating new task')

    let title_tmp = undefined;
    let description_tmp = undefined;
    let date_tmp = undefined;

    if (taskToSave.fieldtype === 0) {
      title_tmp = taskToSave.value;
    } else if (taskToSave.fieldtype === 1) {
      description_tmp = taskToSave.value;
    } else if (taskToSave.fieldtype === 2) {
      date_tmp = taskToSave.value;
    }

    setTask({ 
      key: key_tmp, 
      title: title_tmp, 
      description: description_tmp, 
      date: date_tmp 
    });   
  }

  // add task to tasks if key is found
  useEffect(() => {
    if (task.key !== undefined) {
      
      // make sure no duplicates are created
      const tmp = (tasks.filter((item) => item.key !== task.key));
      setTasks([...tmp, task]);
    }
  }, [task])

  // check that tasks was updated
  useEffect(() => {
    console.log('tasks was updated')
    // console.log(tasks)
  }, [tasks])

  const deleteTask = (key) => {
    setTasks(tasks.filter((item) => item.key !== key));
  };

  const modifyTask = (item) => {
    setCurrentTask(item);
    setModifyActive(true);
  };

  const addNewTask = () => {
    setCurrentTask(undefined);
    setModifyActive(true);
  };

  // TODO: figure if you want to use this or no
  // const clearCurrentTask = (clearTask) => {
  //   if (clearTask) {
  //     setCurrentTask(undefined);
  //   }

  //   setModifyActive(!clearTask);
  // }

  return (
    <View style={styles.root}>

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
      </View>

      <View style={styles.list}>
        <TaskList input={tasks} deleteItem={deleteTask} modifyItem={modifyTask}/>
      </View>

  
      {isModifyActive ? 
        <EditTask 
          isModify={isModifyActive}  
          onSubmitPress={onSubmit} 
          onClose={() => setModifyActive(false)}
          currentTask={currentTask}
        />
        : <Button title={ButtonTypes.ADD} onPress={addNewTask}></Button>
      }
     
    </View>
  );

  
}

// Styling for elements in App
const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6600",
    height: "100%",
    paddingLeft: "5%",
  },
  statusbar: {
    height: Constants.statusBarHeight,
  },
  list: {
    width: "61%",
    maxHeight: "42%",
  },
});
