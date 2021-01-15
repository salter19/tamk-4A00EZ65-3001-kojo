// imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Header component takes as props the header text,
// which it uses as a header.
// Props in this case are destructed for the sake of more compact code.
const Header = ({headerText}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{headerText}</Text>
    </View>
  );
};

// Styling for elements in Header component.
const styles = StyleSheet.create({
  root:{
    alignItems:"center"
  },
  header: {
    fontWeight: "700",
    fontSize: 27,
  }
});

export default Header;