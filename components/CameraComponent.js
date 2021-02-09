import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {Camera} from 'expo-camera';

const CameraComponent = ({onCloseCamera}) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async() => {
      const {status} = await Camera.requestPermissionsAsync().catch(e => console.log(e));
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTypeChoice = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Camera access denied</Text>;
  }

  return (
    <View>
      <Camera type={type}>
        <View>
          <TouchableOpacity onPress={handleTypeChoice}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={onCloseCamera}>
            <Text>Close Camera</Text>
          </TouchableOpacity>
        </View>

      </Camera>

    </View>
  );
};


export default CameraComponent;