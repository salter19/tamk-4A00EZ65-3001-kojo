// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {v4 as uuidv4} from 'uuid';

// my components
import ButtonTypes from './data/ButtonTypes';
import Textfield from './components/Exc2/InputText';
import TaskList from './components/Exc2/TextListView';

// the App to rule them all
export default function App() {

  const [taskArr, setTaskArr] = useState([]);
  
  const onAddSubmit = (strItem) => {
    console.log(strItem);

    setTaskArr([... taskArr, { key: uuidv4(), text:strItem}]);
  };

  const deleteTask = (key) => {
    setTaskArr(taskArr.filter((item) => item.key !== key));
  };

  const modifyTask = (key) => {
    console.log(`you want to modify ${key}`);
  }
  console.log(taskArr)

  return (
    <View style={styles.root}>

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
      </View>

      <View>
        <Textfield onSubmitPress={onAddSubmit} buttonTitle={ButtonTypes.ADD} />
      </View>

      <View style={styles.list}>
        <TaskList input={taskArr} deleteItem={deleteTask} modifyItem={modifyTask}/>
      </View>

      
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
