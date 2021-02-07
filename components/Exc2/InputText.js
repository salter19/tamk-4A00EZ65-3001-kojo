import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const placeholder = "Your task?";
  const titles = ['Task title', 'Description', 'Date'];
  const [userText, setUserText] = useState("");
  const [fieldTitle, setFieldTitle] = useState(undefined);

  const onSubmit = () => {

    if (userText.length > 0 && userText !== " ") {
      props.onSubmitPress(userText);
      setUserText("");
    }
  };

  useEffect(() => {
    props.userText !== undefined 
    ? setUserText(props.userText)
    : setUserText("");
    
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
      <Text>{fieldTitle}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={userText === "" ? placeholder : userText}
          onChangeText={(e) => setUserText(e)}
          value={userText}
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
});

export default InputText;
