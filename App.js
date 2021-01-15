// imports needed
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import TextAndTable from './components/Exc1/TextAndTable';
// import InputText from './components/InputText'


// helper variables to demonstrate dynamic nature of component(s)
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const tableAndTextHeader = 'Otsikko';

// the App to rule them all
export default function App() {

  return (
    <View style={styles.root}>

      {/* TextAndTable component includes Header, TextContent and Table3x3 components.
      One of each. */}
      <TextAndTable header={tableAndTextHeader} textContent={loremIpsum}/>

      {/* StatusBar component is phone's statusbar. */}
      <StatusBar style="auto" />
    </View>
  );
};

// Styling for elements in App
const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor:"#ff6600",
    height:"100%",
    paddingTop:"25%",
    paddingLeft:"5%"
  }
});
