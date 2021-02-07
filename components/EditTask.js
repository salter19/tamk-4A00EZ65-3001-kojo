import React, {useEffect, useState} from "react";
import { Text, Modal, StyleSheet, View, Button} from "react-native";

import Textfield from '../components/Exc2/InputText';
import ButtonTypes from "../data/ButtonTypes";

const EditTask = ({isModify, onClose, onSubmitPress, currentTask}) => {
  const [isVisible, setVisible] = useState(false);
  const [taskToSave, setTaskToSave] = useState({
    key:undefined,
    title:undefined,
    description:undefined
  });
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titles = ['Task title', 'Description', 'Date'];

  useEffect(() => {
    setVisible(true);
    
  }, [isModify])


  const saveAndClose = () => {
    onSubmitPress({key:key, title:title, description:description});
    onClose();
  }

  const onClosePressed = () => {
    console.log('pressed close, should save?')
    onClose();
  }

  useEffect(() => {
    if (currentTask !== undefined) {
      setKey(currentTask.key);
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, []);

  const updateTitle = (data) => {
    setTitle(data);
  };


  const updateDescription = (data) => {
    setDescription(data);
  };
  
  // TODO: add due date handling
  // const updateDate = (data) => {};
  
  return (
    <Modal 
      animationType= "fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={saveAndClose}
    >
      <View style={[styles.centeredView, styles.root]}>

        <View>
          <Text>{titles[0]}</Text>
          <Textfield 
            currentItem={currentTask ? currentTask.title : ''}
            updateData={updateTitle}
          />
        </View>
        
        <View>
          <Text>{titles[1]}</Text>
          <Textfield 
            currentItem={currentTask ? currentTask.description : ''}
            updateData={updateDescription}
          />
        </View>
        

        <View style={styles.buttonRow}>
          <View style={[styles.buttonLeft, styles.button]}>
            <Button title={currentTask ? ButtonTypes.UPDATE : ButtonTypes.ADD} onPress={saveAndClose} />
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
    backgroundColor:"rgba(255, 255, 255, 0.81)",
    height: "80%"
  },
  centeredView: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"2%",
    height:"80%",
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
