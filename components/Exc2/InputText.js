import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const placeholder = "Fill in";
  const [userInput, setUserInput] = useState("");

  // send user input to EditTask as it changes
  const handleOnChangeText = (event) => {
    // show on field
    setUserInput(event);

    // update at edit
    props.updateData(event); 
  }

  // set field value, while on update view (!== add new task view)
  useEffect(() => {

    if (props.currentItem !== undefined) {
      setUserInput(props.currentItem)
    } else {
      setUserInput("");
    }
    
  }, [props.currentItem]);

  return (
    <View style={styles.root}>
      {/* {console.log(userInput)} */}

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
