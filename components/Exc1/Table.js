import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Table = () => {

  const [table, setTable] = useState();

  useEffect(() => {
    setTable(stackTable());
  }, []);

  const boxRow = (rowID) => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <View key={i} style={styles.singleBox}>
          {<Text style={styles.boxText}>{i + rowID}</Text>}
        </View>
      );
    };
    return result;
  }

  const stackTable = () => {
    let result = [];
    const rowCount = 3;

    console.log("stacking table")

    for (let i = 0; i < rowCount; i++) {
      result.push(
        <View key={i} style={styles.horizontal}>
          {boxRow(i < 3 ? i + 1 : i + 2)}
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

export default Table;