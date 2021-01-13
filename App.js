import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Honey from './Honey'

export default function App() {
  const [sweety, setSweety] = useState();

  const yes = () => {
    setSweety(Honey);
  }
  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app! Hello babe! Is it me,
        you're looking for?
      </Text>
      <Button style={styles.myButton} title="sí?" onPress={yes} />
      {sweety}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  myButton: {
    backgroundColor: "#ff6600",
    color:"#fff"
  }
  
});
