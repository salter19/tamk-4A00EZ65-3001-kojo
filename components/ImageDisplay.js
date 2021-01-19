import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageDisplay = () => {

  return (
    <View style={styles.root}>
      <Image source={require('./../assets/steel.png')}/>
    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    paddingTop: "6.1%"
  },
});

export default ImageDisplay;