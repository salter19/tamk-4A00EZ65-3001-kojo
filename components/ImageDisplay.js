import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

// image display, displays default img
const ImageDisplay = (props) => {
        
  const [image, setImage] = useState(<Image source={require('./../assets/TaikuriToRight.png')} />)
  
  return (
    <View style={styles.root}>
      {image}
    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    paddingTop: "6.1%", 
    paddingBottom: "4.2%", 
    marginRight:"2%",
    alignItems:"center",
  },
});

export default ImageDisplay;