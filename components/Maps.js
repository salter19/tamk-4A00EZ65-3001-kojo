import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import ButtonBase from './ButtonBase';

const Maps = (props) => {
  const LATITUDE_DELTA = 0.1;
  const LONGITUDE_DELTA = 0.1;

  const [location, setLocation] = useState(undefined);
  const [hasLocationPermission, setHasLocationPermission] = useState(undefined);
  const [region, setRegion] = useState(undefined);

  // get permission & initial locatin
  useEffect(() => {
    getInitialLocationAsync();
  }, []);

  // set region when location changes
  useEffect(() => {
    setRegion(location);
  }, [location]);

  // set marker to initial loc when map is opened
  const getInitialLocationAsync = async () => {

    // use of location was not granted
    const notGranted = () => {
      setHasLocationPermission(false);
      return;
    }

    // use of location was granted
    const grantedAsync = async() => {
      setHasLocationPermission(true);

      let coordinates;

      // if location is undefined, get current pos
      const setCurrentPosAsync = async () => {
        // location needs accuracy: 6 for it to work
        let location = await Location.getCurrentPositionAsync({accuracy: 6});
        coordinates = {
          latitude: location.coords.latitude, 
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
      };

      // if location can be retrieved, use it
      const setSavedPos = () => {
        coordinates = {
          latitude: props.location.latitude,
          longitude: props.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
      };

      // figure out if location can be retrieved
      props.location.latitude !== undefined 
      ? setSavedPos()
      : await setCurrentPosAsync();

      setLocation(coordinates);
    }

    const {status} = await Location.requestPermissionsAsync();

    status === 'granted' 
    ? grantedAsync()
    : notGranted();
  };

  // set region when map has been moved
  const onRegionChange = (_region) => {
    setRegion(_region);
  };

  // move marker to the location of longPress coordinate
  const onLongPress = (event) => {
    const loc = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    setLocation(loc)
  }

  const onClose = () => {
    props.onClose(location)
  }

  // ask permission to use location, if undefined
  if (hasLocationPermission === undefined) {
    return (
      <View>
        <Text>Waiting for permissions.</Text>
      </View>
    )
  }

  return (
    <Modal
      animationType="fade"
      visible={props.isVisible}
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <MapView 
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChange={onRegionChange}
          onLongPress={onLongPress}
        >
          {location !== undefined ?
            <Marker
              coordinate={{
                latitude:location.latitude, 
                longitude:location.longitude
              }}
              on
            >        
            </Marker>
            : <View></View>
          }

        </MapView>

        <ButtonBase 
          onPress={onClose}
          buttonText="Close"
          buttonSize={2}
        />

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create(
  {
    root: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems:"center",
    },
    map: {
      width: "100%",
      height:"100%"
    }
  }
);
export default Maps;