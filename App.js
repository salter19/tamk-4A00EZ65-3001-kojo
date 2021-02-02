// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { v4 as uuidv4 } from "uuid";

// my components
import InputText from "./components/Exc2/InputText";
import TextListView from "./components/Exc2/TextListView";
import EditTask from "./components/EditTask";
import { LoadTasks, SaveTasks } from './data/TaskStorage';


const buttonTitles = { ok: "OK", close: "Close" };

// the App to rule them all
export default function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [isEditViewVisible, setEditViewVisible] = useState(false);

  // add tasks to an array
  const addTaskHandler = (task) => {
    setTaskArr([...taskArr, { key: uuidv4(), text: task }]);
  };

  // this is the delete, which removes
  // task pressed by its id
  const deleteItem = (itemKey) => {
    setTaskArr(taskArr.filter((item) => item.key !== itemKey));
  };

  return (
    <View style={styles.root}>

      {/* InputText for text input */}
      <InputText onSubmitPress={addTaskHandler} buttonTitle={buttonTitles.ok} />

      {/* TextListView  to list those tasks*/}
      <TextListView input={taskArr} deleteItem={deleteItem} />

      <EditTask />

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
        
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
});
