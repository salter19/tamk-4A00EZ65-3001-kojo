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

  const [taskArr, setTaskArr] = useState([]);
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
      const tasks = await TaskStorage.LoadTasks().catch(e => console.log(e));
      console.log(tasks)
      setTaskArr(tasks);
    })()
  }, []);

  useEffect(() => {
    (async() => {
      console.log('Saving...');
      const saveup = await TaskStorage.SaveTasks(taskArr).catch(e => console.log(e));
      console.log(saveup);
    })();
  }, [taskArr]);
  
  // 2:38 =>
  const onSubmit = (taskToSave) => {
    if (currentTask !== undefined) {
      // handle updated data
      console.log('at update')
      console.log(taskToSave)
    } else {
      // create new task
      createNewTask(taskToSave);
    }

    setCurrentTask(undefined);
    setModifyActive(false);
  };
  const createNewTask = (taskToSave) => {
    console.log('this is app, and task to save is:');

    let title_tmp = undefined;
    let description_tmp = undefined;
    let date_tmp = undefined;

    if (taskToSave.fieldtype === 0) {
      console.log('add me to title ' + taskToSave.value);
      title_tmp = taskToSave.value;
    } else if (taskToSave.fieldtype === 1) {
      console.log('add me to description ' + taskToSave.value);
      description_tmp = taskToSave.value;
    } else if (taskToSave.fieldtype === 2) {
      console.log('add me to date ' + taskToSave.value);
      date_tmp = taskToSave.value;
    }

    setTask({ key: uuidv4(), title: title_tmp, description: description_tmp, date: date_tmp });
  }

  // add task to tasks if key is found
  useEffect(() => {
    if (task.key !== undefined) {
      setTasks([...tasks, task]);
    }
  }, [task])

  // check that tasks was updated
  useEffect(() => {
    console.log('tasks was updated')
    console.log(tasks)
  }, [tasks])

  const deleteTask = (key) => {
    setTaskArr(taskArr.filter((item) => item.key !== key));
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
        <TaskList input={taskArr} deleteItem={deleteTask} modifyItem={modifyTask}/>
      </View>

  
      {isModifyActive ? 
        <EditTask 
          isModify={isModifyActive}  
          onSubmitPress={onSubmit} 
          onClose={() => setModifyActive(false)}
          currentTaskText={currentTask !== undefined ? currentTask.text : undefined}
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
