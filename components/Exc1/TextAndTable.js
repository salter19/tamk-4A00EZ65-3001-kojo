import React, {useState, useEffect} from 'react';
import { View } from "react-native";
import Header from './Header';
import TextContent from './TextContent';
import Table3x3 from './Table3x3';

const TextAndTable = ({header, textContent}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(textContent);
  }, [])

  return(
    <View>
      <Header headerText={header}/>
      <TextContent content={message}/>
      <Table3x3 />
    </View>
  );

};

export default TextAndTable;