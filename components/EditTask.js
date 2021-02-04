import React, {useEffect, useState} from "react";
import { Modal, StyleSheet, View, Text, TouchableHighlight} from "react-native";

const EditTask = ({isModify, onClose}) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(()=> {
    setVisible(true)
  }, [isModify])

  const saveOnClose = () => {
    console.log('Should save here, before closing')
    onClose();
  }
  
  return (
      <View style={styles.centeredView}>
          <Modal 
            animationType= "slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={saveOnClose}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setVisible(!isVisible);
                }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>

              </View>
            </View>
           
          </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"2%"
  }, 
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});

export default EditTask;
