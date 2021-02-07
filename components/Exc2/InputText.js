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

  useEffect(() => {
    props.userText !== undefined 
    ? setUserInput(props.userText)
    : setUserInput("");
    
  }, [props.userText]);

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
          onChangeText={(e) => setUserInput(e)}
          value={userInput}
        />
        {/* <Button title={props.buttonTitle} onPress={onSubmit} /> */}
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
