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

        <View style={styles.buttonRow}>
          <View style={[styles.buttonLeft, styles.button]}>
            <Button title={ButtonTypes.UPDATE} onPress={onClosePressed} />
          </View>
          <View style={[styles.buttonRight, styles.button]}>
            <Button title={ButtonTypes.CLOSE} onPress={onClosePressed} />
          </View>          
        </View>

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
  buttonRow: {
    marginTop:"10%",
    flexDirection:"row",
  },
  button: {
    width: 100,
  },
  buttonLeft: {
    marginRight: "5%",
  },
  buttonRight: {
    marginLeft: "5%",
  },
});

export default EditTask;
