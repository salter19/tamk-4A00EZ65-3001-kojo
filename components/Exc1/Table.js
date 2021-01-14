import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Table = () => {

  const boxRow = () => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <View key={i} style={singleBox}>

        </View>
      )
    }
  }

  return (
    <View style={styles.root}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "61%",
    flex:1,
    flexDirection:"row",
    borderColor:"#fff",
    borderWidth:2
  },
  singleBox: {
  }
});

export default Table;