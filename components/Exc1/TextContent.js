import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextContent = ({content}) => {

  return (
    <View style={styles.root}>
      <Text style={styles.body}>{content}</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  root: {
    alignItems: "center"
  },
  body: {
    textAlign:"justify",
    width: "61%",
    color:"#fff",
    letterSpacing: 0.8
  }
});

export default TextContent;