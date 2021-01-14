import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import InputText from './components/InputText'

export default function App() {
  const [message, setMessage] = useState('');

  const yes = () => {
    setMessage('Tappara!');
  }

  return (
    <View style={styles.root}>
      <InputText onSubmitPress={yes}/>
      <Text>{message}</Text>
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
