import React, {useState, useEffect} from 'react';
import {View, Button, Image, Modal, StyleSheet, Text} from 'react-native';

import {WINDOW_WIDTH} from './../data/Constants';

const PADDED_WIDTH = WINDOW_WIDTH * 0.8;

const Gallery = (props) => {
  const [picGallery, setPicGallery] = useState([]);
  const [currentPic, setCurrentPic] = useState({index:null, path:undefined});
  const [picIndex, setPicIndex] = useState(null);
  
  // set up pic gallery
  useEffect(() => {
    const tmp = props.paths.map((item, index) => {
      return {index:index, path:item.path}
    });
    setPicGallery(tmp);
  }, [props.paths]);
  
  // set up init current pic
  useEffect(() => {
    if (picGallery.length > 0) {
      setCurrentPic({
        index:picGallery[0].index,
        path:picGallery[0].path
      })
      setPicIndex(0);
    }
  }, [picGallery]);

  // set current pic according to navigation
  useEffect(() => {
    if (picGallery.length > 0) {

      setCurrentPic({
        index: picGallery[picIndex].index,
        path: picGallery[picIndex].path
      })
    }
  }, [picIndex]);

  // button functionality
  const moveNext = () => {
    if (picIndex < picGallery.length -1) {
      const tmp = picIndex + 1;
      setPicIndex(tmp);
    }
  };

  // button functionality
  const movePrev = () => {
    if (picIndex > 0) {
      const tmp = picIndex -1;
      setPicIndex(tmp)
    }
  }

  return (
    <Modal>

      <View style={styles.topHeader}>
        <Text style={styles.header}>Picture Gallery</Text>
      </View>

      { currentPic.path !== undefined 
        ? <View style={styles.latest}>
            <Image source={{uri:currentPic.path}}  style={styles.prevPic}/>
          </View>
        : <View>
            <Text> To Do: loading animation</Text>
          </View>
      }
      

      <View style={styles.row}>
        <Button title="prev" onPress={movePrev}/>
        <Button title="next" onPress={moveNext}/>
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
  latest: {
    flexDirection:"row",
    justifyContent:"center",
  },
  prevPic: {
    width: PADDED_WIDTH,
    height: PADDED_WIDTH * ( 4 / 3 ),
    borderColor:"#0c2567",
    borderWidth: 8,
    borderRadius:6,
  },
  topHeader:{
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: "2%",
    paddingVertical: "3%"
  },
  header: {
    fontSize:42,
    fontWeight:"bold",
    textAlign:"center",
  },
});
export default Gallery;