import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
// import InputText from './components/InputText'
import Header from './components/Exc1/Header'
import TextContent from './components/Exc1/TextContent'
import Table3x3 from './components/Exc1/Table3x3'

/*
  const yes = () => {
    setMessage('Tappara!');
  };

  const lectureView = () => {
    return (
      <View style={styles.root}>
        <InputText onSubmitPress={yes}/>
        <Text>{message}</Text>
      </View>
    );
  };
 */

export default function App() {
  const [message, setMessage] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');


  return (
    <View style={styles.root}>
      <Header headerText="Otsikko"/>
      <TextContent content={message}/>
      <Table3x3 />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor:"#ff6600",
    height:"100%",
    paddingTop:"25%",
    paddingLeft:"5%"
  },
  text: {
    width: 100
  },
  button: {
    color: "#ff6600"
  }

});
