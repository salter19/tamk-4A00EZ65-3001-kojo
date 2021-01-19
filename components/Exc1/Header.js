// imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Header component takes as props the header text,
// which it uses as a header.
// Props in this case are destructed for the sake of more compact code.
const Header = ({headerText}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header} numberOfLines={1}>{headerText}</Text>
    </View>
  );
};

// Styling for elements in Header component.
const styles = StyleSheet.create({
  root:{
    alignItems:"center"
  },
  header: {
    fontWeight: "bold",
    fontSize: 27,
  }
});

// Header needs to be exported to be used in elsewhere.
export default Header;