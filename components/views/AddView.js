import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from "uuid";

// my components
import Textfield from '../Exc2/InputText';

const AddView = ({onAddSubmit}) => {

  const [taskArr, setTaskArr] = useState([]);


  const onSubmit = (task) => {
    let tmp = taskArr;
    tmp.push({ key: uuidv4(), text:task });
    onAddSubmit(tmp);
  };

  return (
    <View style={styles.root}>
      <Textfield onSubmitPress={onSubmit} buttonTitle="Add"/>
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
    width: "61%"
  }
});

export default AddView;