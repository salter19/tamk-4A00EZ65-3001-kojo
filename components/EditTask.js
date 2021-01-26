import React, { useState } from "react";
import { Modal, StyleSheet, View, Button } from "react-native";

import InputText from "./Exc2/InputText";

const EditTask = (props) => {
  const onClosePressed = () => {
    console.log("Close modal");
  };
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.root}>
        {/*ToDo: dynamic title */}
        <InputText
          onSubmitPressed={props.onSubmitPressed}
          buttonTitle1={props.buttonTitle1}
          buttonTitle2={props.buttonTitle2}
        />
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderColor: "#0c2576",
    borderWidth: 4,
    borderRadius: 2,
  },
});

export default EditTask;
