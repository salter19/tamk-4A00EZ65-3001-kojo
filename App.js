// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

// my components

// the App to rule them all
export default function App() {

  const [taskArr, setTaskArr] = useState([]);
  
  const onAddSubmit = (tasks) => {
    setTaskArr(tasks);
  };

  const deleteTask = (key) => {
    setTaskArr(taskArr.filter((item) => item.key !== key));
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
