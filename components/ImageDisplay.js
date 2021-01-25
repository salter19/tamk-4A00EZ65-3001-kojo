import React, {useState} from 'react';
import {View, Image, StyleSheet, Pressable, Text} from 'react-native';

const ImageDisplay = () => {

  const [message, setMessage] = useState('');

  const onPressHandler = () => {
    setMessage('Tappara kun iskee vanhaan malliin!');
  }
  
  return (
    <View style={styles.root}>
      <Pressable onPress={onPressHandler}>
        <Image source={require('./../assets/steel.png')} />
      </Pressable>

      <View>
        <Text>{message}</Text>
      </View>
      
    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    paddingTop: "6.1%", 
    paddingBottom: "4.2%", 
    alignItems:"center"
  },
});

export default ImageDisplay;