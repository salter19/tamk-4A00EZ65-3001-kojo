import React, {useState} from 'react';
import {View, Button, Image, Modal, StyleSheet, Text} from 'react-native';

const Gallery = (props) => {
  return (
    <Modal>

      <View>
        <Text>ToDo: show images here</Text>
      </View>

      <View style={styles.row}>
        <Button title="prev" onPress={props.onClose}/>
        <Button title="next" onPress={props.onClose}/>
        <Button title="close" onPress={props.onClose}/>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop: "2%",
  },
});
export default Gallery;