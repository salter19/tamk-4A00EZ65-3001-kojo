import React from 'react';
import {TextInput, Button, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection:"row",
    borderColor: "#fff"
  },
  input: {
    height:40,
    borderColor: "#0c2576",
    backgroundColor:"#fff",
    borderWidth: 4,
    width: "20%",
    margin: 2
  }
});

const InputText = (props) => {

  return (
    <View style={styles.root}>
      <TextInput style={styles.input} onTouchEnd={e => console.log('end of touch')}/>
      <Button title="Submit" onPress={props.onSubmitPress}/>
    </View>
  );

};

export default InputText;