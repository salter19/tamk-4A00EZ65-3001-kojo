// imports needed
import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from 'expo-constants';
// import TextAndTable from './components/Exc1/TextAndTable';
import InputText from './components/Exc2/InputText';
import ImageDisplay from './components/ImageDisplay';
import ListView from './components/Exc2/ListView';


// helper variables to demonstrate dynamic nature of component(s) in components/Exc1/
// const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
// const tableAndTextHeader = 'Otsikko';

// the App to rule them all
export default function App() {

  const [task, setTask] = useState('');
  const [image, setImage] = useState();

  const onInputTextSubmit = (input) => {

    // Easter egg option included for output
    input === 'Tappara' || input === 'tappara'
    ? setOutputWithImage()
    : setOutput(input);
  }

  // Easter egg brought in while sandboxing
  const setOutputWithImage = () => {
    setTask('Kaikki jotka mahtuu änkee halliin!');
    setImage(<ImageDisplay/>);
  }

  const setOutput = (input) => {
    setTask(input);
    setImage(null);
  }

  return (
    <View style={styles.root}>

      {/* TextAndTable component includes Header, TextContent and Table3x3 components.
      One of each. */}
      {/* <TextAndTable header={tableAndTextHeader} textContent={loremIpsum}/> */}

      {/* InputText is a sandbox thingy, now with image! */}
      <InputText onSubmitPress={onInputTextSubmit}/>
      {/* <Text style={styles.message}>{task}</Text> */}
      
      <ListView input={task}/>
      <View>{image}</View>

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
      </View>
      
    </View>
  );
};

// Styling for elements in App
const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#ff6600",
    height:"100%",
    paddingLeft:"5%"
  },
  statusbar: {
    height: Constants.statusBarHeight,
    
  }, 
});
