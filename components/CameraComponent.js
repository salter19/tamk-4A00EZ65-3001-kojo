import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, 
  Pressable, Modal, Image} from 'react-native';
import {Camera as CameraView} from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import { IMAGE_DIR, CAMERA_BACK, CAMERA_FRONT, WINDOW_WIDTH } from '../data/Constants';
import LoadingAnimation from './LoadingAnimation';
import ButtonBase from './ButtonBase';

const CameraComponent = ({onCloseCamera, isVisible, saveImg, onGoGallery}) => {
  // camera permissions
  const [hasPermission, setHasPermission] = useState(undefined);

  // set camera type, latest picture
  const [type, setType] = useState(CAMERA_BACK);
  const [latestPic, setLatestPic] = useState(undefined);
  
  // useRefs
  const cameraRef = useRef(undefined);

  // send taken pic into app
  useEffect(() => {
    if (latestPic !== undefined) {
      saveImg(latestPic);
    }
  }, [latestPic]);

  const onShowCamera = () => {
    (async() => {
        const {status} = await CameraView.requestPermissionsAsync().catch(e => console.log(e));
        setHasPermission(status === 'granted');
    })();
  };
  
  // flip between front and back camera
  const toggleCameras = () => {
    setType(
      type === CAMERA_BACK
        ? CAMERA_FRONT
        : CAMERA_BACK
    );
  }

  // snap the image
  const takePicture = () => {   
    (async() => {
      if (cameraRef !== undefined) {
        let photo = await cameraRef.current.takePictureAsync().catch(e => console.error(e));
        
        // move taken picture to permanent location
        let imgFolderInfo = await FileSystem.getInfoAsync(IMAGE_DIR).catch(e => console.error(e));
        if (!imgFolderInfo.exists) {

          // create directory if it does not exist
          // options: if intermediates === true, create all none existing sub folders
          await FileSystem.makeDirectoryAsync(IMAGE_DIR, {intermediates: true}).catch(e => console.error(e));
        }

        const fileName = Date.now().toString() + ".jpg";
        const fullPath = IMAGE_DIR + fileName;

        await FileSystem.moveAsync({from: photo.uri, to: fullPath}).catch(e => console.error(e));
        setLatestPic(fullPath);
      }
    })();
  };

  // handle !== haspermission situations
  if (hasPermission === undefined) {
    return (
      <Modal 
        onShow={onShowCamera}
        animationType="fade"
        visible={isVisible}
        onRequestClose={onCloseCamera}
      >
        <View style={styles.loading}>
          <LoadingAnimation duration={50} style={ { width: 100, height: 100 } }/>
        </View>
        
        <View style={styles.info}>
          <Text>Waiting for permission to use camera.</Text>
          <View style={styles.button}>
            <ButtonBase onPress={onCloseCamera} buttonText="Close Camera"/>
          </View>
        </View>
    </Modal>
    );

  } else if (hasPermission === false) {
    return (
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={onCloseCamera}
      >
        <View style={styles.info}>
          <Text>Camera access denied.</Text>

          <View style={styles.button}>
            <ButtonBase onPress={onCloseCamera} buttonText="Close Camera"/>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={onCloseCamera}
      >
        <View style={styles.root}>

          <View>
            <CameraView 
              style={styles.cameraPreview}
              type={type}
              ref={cameraRef}
            >
            </CameraView>
          </View>

          <View style={[styles.buttonRow, styles.row]}>

            <View style={styles.button}>
              <ButtonBase onPress={toggleCameras} buttonText="Flip"/>
            </View>

            <View style={styles.button}>
              <ButtonBase onPress={takePicture} buttonText="SNAP!"/>
            </View>

            <View style={styles.button}>
              <ButtonBase onPress={onCloseCamera} buttonText="Close"/>
            </View>

          </View>

          <Pressable onPress={onGoGallery}>
            <View style={[styles.latest, styles.preview]}>
              <Image source={{uri:latestPic}}  style={styles.prevPic}/>
            </View>
          </Pressable>
          
        </View>
      </Modal>
    );

  }
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
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * (4 / 3),
  }, 
  latest: {
    flexDirection:"row",
    justifyContent:"center",
  },
  preview: {
    backgroundColor: "#0c2567",
    borderWidth: 4,
    borderColor: "#fff",
    height: 140,
    justifyContent:"center",
    alignItems:"center",
  },
  prevPic: {
    width: 124,
    height: 93,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#fff",
  },
  loading: {
    width:"100%",
    height:400,
  },
  myButton: {
    width: 100,
    height: 61,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:'10%',
    marginHorizontal: '5%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor:"#fff",
  }, 
  buttonText: {
    color:"#fff",
    fontWeight:"700",
  },
  buttonRow: {
    height: 100,
    marginVertical: "2%",
    paddingLeft: "5%",
    paddingTop: "2%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(255, 103, 0, 1)",
    borderWidth: 4,
    borderColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
  }
});

export default CameraComponent;