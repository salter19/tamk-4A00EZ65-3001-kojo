// imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Table3x3 component takes in no props.
const Table3x3 = () => {

  // table state holds the table to be rendered
  const [table, setTable] = useState();

  // useEffect is run only at the page load.
  useEffect(() => {

    // useEffect sets the table using stackTable function inside the component.
    setTable(stackTable());
  }, []);

  // boxRow create a table row.
  // It takes as a param rowID, which is used for numbering the table elements.
  const boxRow = (rowID) => {

    // result will hold the row.
    let result = [];

    // Helper variable for table element numbering.
    const inc = getIncrement(rowID);

    // Iteration used for row (array) creation
    for (let i = 0; i < 3; i++) {
      result.push(

        // Each list item needs a unique key.
        <View key={i + inc} style={styles.singleBox}>
          {<Text style={styles.boxText}>{i + inc}</Text>}
        </View>
      );
    };
    return result;
  };

  // Helper function for numbering the table elements.
  const getIncrement = (value) => {
    return (
      value === 3 ? 7
      : value === 2 ? 4 : 1
    );
  };

  // Function used for stacking the table rows to form table.
  const stackTable = () => {
    let result = [];
    const rowCount = 3;

    for (let i = 0; i < rowCount; i++) {
      result.push(
        <View key={i} style={styles.horizontal}>

          {/* Param given to boxRow is it's rowID. */}
          {boxRow(i + 1)}
        </View>
      );
    };
    return result;
  }

  return (
    <View style={styles.root}>

      {/* State table is returned within the root.
      Using state makes it possible not to create table with every render. */}
      {table}      
    </View>
  );
};

// Styling for the elements within Table3x3 component.
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