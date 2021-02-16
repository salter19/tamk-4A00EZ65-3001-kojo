import React, {useState, useEffect} from 'react';
import {View, Button, Image, Modal, StyleSheet, Text} from 'react-native';




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

  const moveNext = () => {
    if (picIndex < picGallery.length -1) {
      const tmp = picIndex + 1;
      setPicIndex(tmp);
    }
  };

  const movePrev = () => {
    if (picIndex > 0) {
      const tmp = picIndex -1;
      setPicIndex(tmp)
    }
  }

  console.log('pic gallery, current pic index')
  console.log(picIndex + ' | ' + (picGallery.length -1))
  return (
    <Modal>

      <View>
        <Text>ToDo: show images here</Text>
      </View>

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
});
export default Gallery;