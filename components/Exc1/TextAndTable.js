// imports
import React from 'react';
import { View } from "react-native";
import Header from './Header';
import TextContent from './TextContent';
import Table3x3 from './Table3x3';

// TextAndTable component takes in as props header and textContent.
// props are destructed for the sake of more compact code.
const TextAndTable = ({header, textContent}) => {


  return(
    <View>
      <Header headerText={header}/>
      <TextContent content={textContent}/>
      <Table3x3 />
    </View>
  );

};

// TextAndTable needs to be exported so it can be used in elsewhere.
export default TextAndTable;