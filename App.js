// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
// import TextAndTable from './components/Exc1/TextAndTable';
import InputText from "./components/Exc2/InputText";
import ImageDisplay from "./components/ImageDisplay";
import TextListView from "./components/Exc2/TextListView";
import EditTask from "./components/EditTask";

import { v4 as uuidv4 } from "uuid";

// helper variables to demonstrate dynamic nature of component(s) in components/Exc1/
// const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
// const tableAndTextHeader = 'Otsikko';

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
      {/* TextAndTable component includes Header, TextContent and Table3x3 components.
      One of each. */}
      {/* <TextAndTable header={tableAndTextHeader} textContent={loremIpsum}/> */}

      {/* InputText for text input */}
      <InputText onSubmitPress={addTaskHandler} buttonTitle={buttonTitles.ok} />
      {/* <Text style={styles.message}>{task}</Text> */}

      {/* TextListView  to list those tasks*/}
      <TextListView input={taskArr} deleteItem={deleteItem} />
      {/* <View>{image}</View> */}

      <EditTask
        onSubmitPress={addTaskHandler}
        buttonTitle1={buttonTitles.close}
        buttonTitle2={buttonTitles.ok}
      />

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
