// imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// TextContent component takes in content as props,
// which it uses as the text content.
// Props in here are destructed for the sake of compact code.
const TextContent = ({content}) => {

  return (
    <View style={styles.root}>
      <Text style={styles.body}>{content}</Text>
    </View>
  );
};

// Styling of the elements in TextContent.
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

// TextContent needs to be exported to be used in elsewhere.
export default TextContent;