import React, {useState, useEffect} from 'react';
import {View, Button, Image, Modal, StyleSheet, Text} from 'react-native';

const Gallery = (props) => {
  const [picPaths, setPicPaths] = useState([]);
  const [currentPic, setCurrentPic] = useState('./../assets/TaikuriToRigth.png');
  const [currentIndex, setCurrentIndex] = useState(null);

  // get images from props
  useEffect(() => {
    console.log('img count: ' + props.paths.length)
    if (props.paths.length > 0) {
      for (let item of props.paths) {
        if (item.path !== undefined) {
          setPicPaths([...picPaths, item.path]);
        }
      }
    }
  }, []);

  // set current picture
  useEffect(() => {
    console.log('img count now: ' + picPaths.length)
    if (picPaths.length > 0) {
      setCurrentPic(picPaths[0]);
      setCurrentIndex(0);
    }
  }, [picPaths]);

  const moveToNext = () => {
    
    if (currentIndex !== null) {
      console.log('current index is real ' + currentIndex + '|' + props.paths.length)
      if (currentIndex < picPaths.length -2) {
        let tmp = currentIndex;
        console.log('tmp is ' + tmp);
        setCurrentIndex(tmp += 1);
        setCurrentPic(picPaths[tmp += 1]);
      }
    }
  }

  const moveToPrev = () => {
    
    if (currentIndex !== null) {
      if (currentIndex > 0) {
        let tmp = currentIndex;
        setCurrentIndex(tmp -= 1);
        setCurrentPic(picPaths[tmp -= 1]);
        console.log(picPaths[tmp -= 1]);
      }
    }
  }

  return (
    <Modal>

      <View>
        <Text>ToDo: show images here</Text>

        <View style={styles.latest}>
          <Image source={{uri:currentPic}}  style={styles.prevPic}/>
        </View>
      </View>

      <View style={styles.row}>
        <Button title="prev" onPress={moveToPrev}/>
        <Button title="next" onPress={moveToNext}/>
        <Button title="close" onPress={props.onClose}/>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop: "2%",
    
  },
});
export default Gallery;