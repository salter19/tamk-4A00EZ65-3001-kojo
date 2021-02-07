import React, { useEffect, useState } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const placeholder = "Your task?";
  const [userText, setUserText] = useState("");

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

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder={userText === "" ? placeholder : userText}
        onChangeText={(e) => setUserText(e)}
        value={userText}
      />
      {/* <Button title={props.buttonTitle} onPress={onSubmit} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    borderColor: "#fff",
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
