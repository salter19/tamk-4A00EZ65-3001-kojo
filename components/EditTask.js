import React from "react";
import { Modal, StyleSheet, View, Text} from "react-native";

import InputText from "./Exc2/InputText";

const EditTask = (props) => {
  
  return (
      <View style={styles.root}>
          <Text>Edit task</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "#0c2576",
    borderWidth: 4,
    borderRadius: 2,
    padding: 8,
    width: "61%",
  },
});

export default EditTask;
