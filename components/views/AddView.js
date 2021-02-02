import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from "uuid";

// my components
import Textfield from '../Exc2/InputText';
import TaskList from '../Exc2/TextListView';

const AddView = ({onAddSubmit, deleteItem}) => {

  const [taskArr, setTaskArr] = useState([]);

  const onSubmit = (task) => {
    setTaskArr([...taskArr, {key: uuidv4(), text:task}]);
    onAddSubmit(taskArr);
  };

  return (
    <View style={styles.root}>
      <Textfield onSubmitPress={onSubmit} buttonTitle="Add"/>
      <TaskList input={taskArr} deleteItem={deleteItem}/>
    </View>
  );
};

// styling
const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6600",
    height: "100%",
    paddingLeft: "5%",
  }
});

export default AddView;