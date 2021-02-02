// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { v4 as uuidv4 } from "uuid";

// my components


const buttonTitles = { ok: "OK", close: "Close" };

// the App to rule them all
export default function App() {
  const [taskArr, setTaskArr] = useState([]);

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
