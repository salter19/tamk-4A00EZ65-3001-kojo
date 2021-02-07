import React, {useEffect, useState} from "react";
import { Modal, StyleSheet, View, Button} from "react-native";

import Textfield from '../components/Exc2/InputText';
import ButtonTypes from "../data/ButtonTypes";
import Fieldtypes from '../data/TextfieldTitles';

const EditTask = ({isModify, onClose, onSubmitPress, currentTaskText}) => {
  const [isVisible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(undefined);

  useEffect(() => {
    setVisible(true)
  }, [isModify])

  useEffect(() => {
    currentTaskText !== undefined ? 
      setCurrentItem(currentTaskText)
      : setCurrentItem(undefined);
    
  }, [currentTaskText]);

  const saveOnClose = () => {
    console.log('Should save here, before closing')
    onClose();
  }

  const onClosePressed = () => {
    console.log('pressed close, should save')
    onClose();

  }
  
  return (
    <Modal 
      animationType= "fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={saveOnClose}
    >
      <View style={[styles.centeredView, styles.root]}>

        <Textfield 
          onSubmitPress={onSubmitPress}
          buttonTitle={currentItem ? ButtonTypes.UPDATE : ButtonTypes.ADD}
          userText={currentItem}
          fieldtype={Fieldtypes.TITLE}
        />
        <Textfield 
          onSubmitPress={onSubmitPress}
          buttonTitle={currentItem ? ButtonTypes.UPDATE : ButtonTypes.ADD}
          userText={currentItem}
        />

        <Button title={ButtonTypes.CLOSE} onPress={onClosePressed}></Button>

      </View>
      
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor:"rgba(255, 255, 255, 0.81)"
  },
  centeredView: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"2%"
  }, 
});

export default EditTask;
