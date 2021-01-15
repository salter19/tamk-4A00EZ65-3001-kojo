import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Table3x3 = () => {

  const [table, setTable] = useState();

  useEffect(() => {
    setTable(stackTable());
  }, []);

  const boxRow = (rowID) => {
    let result = [];

    const inc = getIncrement(rowID);

    for (let i = 0; i < 3; i++) {
      result.push(
        <View key={i} style={styles.singleBox}>
          {<Text style={styles.boxText}>{i + inc}</Text>}
        </View>
      );
    };
    return result;
  };

  const getIncrement = (value) => {
    return (
      value === 3 ? 7
      : value === 2 ? 4 : 1
    );

  };

  const stackTable = () => {
    let result = [];
    const rowCount = 3;

    console.log("stacking table")

    for (let i = 0; i < rowCount; i++) {
      result.push(
        <View key={i} style={styles.horizontal}>
          {boxRow(i + 1)}
        </View>
      );
    };
    return result;
  }

  return (
    <View style={styles.root}>
      {table}      
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems:"center",
    marginTop: "4.2%"   
  },
  singleBox: {
    width: 81,
    height: 81,
    backgroundColor:"#0c2576",
    borderColor: "#fff",
    borderWidth:2,
    alignItems:"center",
    justifyContent:"center",
  },
  horizontal: {
    flexDirection:"row"
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Table3x3;