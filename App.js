// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { v4 as uuidv4 } from "uuid";

// my components
import InputText from "./components/Exc2/InputText";
import TextListView from "./components/Exc2/TextListView";
// import EditTask from "./components/EditTask";
import { LoadTasks, SaveTasks } from './data/TaskStorage';


const buttonTitles = { ok: "OK", close: "Close" };

// the App to rule them all
export default function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [isEditViewVisible, setEditViewVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [isCountingTime, setCountingTime] = useState(true);
  const [timeMsg, setTimeMsg] = useState('');

  // add tasks to an array
  const addTaskHandler = (task) => {
    setTaskArr([...taskArr, { key: uuidv4(), text: task }]);
  };

  // this is the delete, which removes
  // task pressed by its id
  const deleteItem = (itemKey) => {
    setTaskArr(taskArr.filter((item) => item.key !== itemKey));
  };

  // timeCounter uses setInterval to get the seconds and
  // sets each second as time when the second changes
  // Note: at the moment time loops thus from 0 to 59
  const timeCounter = () => {
    setInterval(() => {

      let res = new Date().getSeconds();
      if (res != time) {
        setTime(res);
      }
    });
  };

  // stopTimer is called when timer is up
  // it sets isCountingTime to false and thus
  // stops the counting.
  // It also sets the message telling time is up.
  const stopTimer = () => {
    setCountingTime(false);
    setTimeMsg('TIME IS UP!');
  };

  // useEffect takes two values as second param
  // time makes sure timeCounter is invoked with each second
  // and isCountingTime stops the rendering when set to false
  useEffect(() => {
    if (isCountingTime) {
      timeCounter();
    };
  },[time, isCountingTime]);

  return (
    <View style={styles.root}>

      {/* InputText for text input */}
      <InputText onSubmitPress={addTaskHandler} buttonTitle={buttonTitles.ok} />

      {/* TextListView  to list those tasks*/}
      <TextListView input={taskArr} deleteItem={deleteItem} />

      {/* <EditTask
        onSubmitPress={addTaskHandler}
        buttonTitle1={buttonTitles.close}
        buttonTitle2={buttonTitles.ok}
      /> */}

      <View>
        {/* Timer to take time and do something */}
        <Timer secondsGone={time} timeIsUp={stopTimer}/>
        <Text>{timeMsg}</Text>
      </View>
      

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
