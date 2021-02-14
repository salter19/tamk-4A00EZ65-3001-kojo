import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, 
  TouchableOpacity, Dimensions, Platform, Modal} from 'react-native';
import {Camera} from 'expo-camera';

const CameraComponent = ({onCloseCamera}) => {
  // camera permissions
  const [hasPermission, setHasPermission] = useState(undefined);
  const [camera, setCamera] = useState(null);

  // set camera type, screen ratio and image padding
  const [type, setType] = useState(Camera.Constants.Type.back);
//   const [isRatioSet, setIsRatioSet] = useState(false);
//   const [ratio, setRatio] = useState('4:3');
//   const {height, width} = Dimensions.get('screen');
//   const screenRatio = height / width;
//   const [imgPadding, setImgPadding] = useState(0);  

  // get permission to use camera
  // ToDo: why does this not ask persmission?
  useEffect(() => {
    (async() => {
      const {status} = await Camera.requestPermissionsAsync().catch(e => console.log(e));
      setHasPermission(status === 'granted');
    })();
  }, []);

  // handle !== haspermission situations
  if (hasPermission === undefined) {
    return (
        <Modal onShow={}>
            <View style={styles.info}>
                <Text>Waiting for permission to use camera.</Text>
            </View>
      </Modal>
    );
  }

  const onShowCamera = () => {
      (async () => {
          await CameraComponent.re
      })()
  }

  if (hasPermission === false) {
    return (
      <View style={styles.info}>
        <Text>Camera access denied</Text>
      </View>
    );
  }

  // flip between front and back camera
  const handleTypeChoice = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  // load camera for use
  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  // set camera ratio and padding (assumes portrait mode)
  const prepareRatio = async() => {
    // default given is system default
    let desiredRatio = '4:3';

    // something little for android only
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatioAsync().catch(e => console.log(e));

      // calculate w / h of each camera ratio
      // NOTE: these are measured in landscape mode
      // find ratio closest to the screen ratio (don't go over)
      let distances = {};
      let realRatios = {};
      let minDistance = null;

      for (let ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;

        // ratio can't be taller than screen, so no for abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance === null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set best match
      desiredRatio = minDistance;

      // calculate the diff between cam width and screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) /2
      );

      // set the preview padding and ratio
      setImgPadding(remainder);
      setRatio(desiredRatio);

      // set flag to prevent re-calculation w/ each rendering
      setIsRatioSet(true);
    }
  }


  return (
    <Modal>
      <View style={styles.root}>
        <Camera 
          style= {[styles.cameraPreview, {marginVertical: imgPadding}]}
          type={type}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => setCamera(ref)}
        >
          <View style={}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({

  info: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }, 
  root: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cameraPreview: {
    flex:1,
  }
});

export default CameraComponent;