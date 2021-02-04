import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const placeholder = "Your task?";
  const [message, onChangeText] = useState("");

  const onSubmit = () => {
    props.onSubmitPress(message);
    onChangeText("");
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(e) => onChangeText(e)}
        value={message}
      />
      <Button title={props.buttonTitle} onPress={onSubmit} />
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
