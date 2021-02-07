import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const placeholder = "Your task?";
  const titles = ['Task title', 'Description', 'Date'];
  const [userInput, setUserInput] = useState("");
  const [fieldTitle, setFieldTitle] = useState(undefined);

  const onSubmit = () => {

    if (userInput.length > 0 && userInput !== " ") {
      props.onSubmitPress(userInput);
      setUserInput("");
    }
  };

  // send user input to EditTask as it changes
  const handleOnChangeText = (event) => {
    // show on field
    setUserInput(event);

    // send data to EditTask if field is known
    if (props.fieldtype !== undefined) {
      if (props.currentItem !== undefined) {
        props.updateData({ 
          key:props.currentItem.key, 
          fieldtype:props.fieldtype, 
          value:event
        });
      } else {
        props.updateData({
          fieldtype: props.fieldtype,
          value:event
        });
      }
    }

  }

  // set field value, while on update view (!== add new task view)
  useEffect(() => {

    if (props.currentItem !== undefined) {
      setUserInput(props.currentItem.title);
    } else {
      setUserInput("")
    }
    
  }, [props.currentItem]);

  // set field title if one is given
  useEffect(() => {
    if (props.fieldtype != undefined) {
      if (props.fieldtype <= titles.length -1) {
        setFieldTitle(titles[props.fieldtype]);
      }        
    }
  
  }, [])

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{fieldTitle}</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={userInput === "" ? placeholder : userInput}
          onChangeText={handleOnChangeText}
          value={userInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#0c2576",
    backgroundColor: "#fff",
    borderWidth: 4,
    width: "61%",
    margin: 2,
    paddingLeft: 6,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
  }
});

export default InputText;
