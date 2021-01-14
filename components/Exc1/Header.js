import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({headerText}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{headerText}</Text>
    </View>
  );
};

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