import React, {useState} from 'react';
import { View } from "react-native";
import Header from './components/Exc1/Header'
import TextContent from './components/Exc1/TextContent'
import Table3x3 from './components/Exc1/Table3x3'

const TextAndTable = ({header}) => {
  const [message, setMessage] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');


  return(
    <View>
      <Header headerText={header}/>
      <TextContent content={message}/>
      <Table3x3 />
    </View>
  );

};

export default TextAndTable;