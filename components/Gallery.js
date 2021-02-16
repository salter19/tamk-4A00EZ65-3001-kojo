import React, {useState, useEffect, useRef} from 'react';
import {
  View, Pressable,
  Modal, StyleSheet, 
  Image, Text, 
  Animated, Easing,
} from 'react-native';

import {WINDOW_WIDTH} from './../data/Constants';
import LoadingAnimation from './LoadingAnimation';

const PADDED_WIDTH = WINDOW_WIDTH * 0.8;
const FADE_DURATION = 1000;

const Gallery = (props) => {
  const [picGallery, setPicGallery] = useState([]);
  const [currentPic, setCurrentPic] = useState({index:null, path:undefined});
  const [picIndex, setPicIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOutOfRange, setIsOutOfRange] = useState(true);
  
  const loadingView = 
    <View style={styles.latest}>
          <View style={[styles.prevPic, styles.center]}>
            <LoadingAnimation duration={1000} style={styles.loading}/>
          </View>
    </View>
  ;

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  
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
      fadeIn(3000);
      setIsOutOfRange(false);
    }
  }, [picGallery]);

  // set current pic according to navigation
  useEffect(() => {
    if (picGallery.length > 0 && !isOutOfRange) {
      setCurrentPic({
        index: picGallery[picIndex].index,
        path: picGallery[picIndex].path
      })
    }
    fadeIn();
  }, [picIndex]);

  // Animate out of range view
  useEffect(() => {
    if (isOutOfRange) {
      fadeIn(FADE_DURATION);
    }
  }, [isOutOfRange]);

  // close image at hand and invoke moveNext
  const onPressNext = () => {
    if (picIndex < picGallery.length) {
      setIsVisible(false);
      moveNext();
    } 
  }

  // move to next image 
  const moveNext = () => {
    if (picIndex < picGallery.length -1) {
      setIsOutOfRange(false);
      const tmp = picIndex + 1;
      setPicIndex(tmp);
    } else {
      setIsOutOfRange(true);
      setPicIndex(picGallery.length);
    }
  };

  // close image at hand and invoke movePrev
  const onPressPrev = () => {
    if (picIndex > -1) {
      setIsVisible(false);
      movePrev();
    }
  }

  // move to previous image
  const movePrev = () => {
    if (picIndex > 0) {
      setIsOutOfRange(false);
      const tmp = picIndex -1;
      setPicIndex(tmp);    
    } else {
      setIsOutOfRange(true);
      setPicIndex(-1);   
    }
  };

  // set fade in animation
  const fadeIn = (_duration = FADE_DURATION) => {

    (() => {
      const timeout = setTimeout(() => {setIsVisible(true)}, 300);
      return () => clearTimeout(timeout);
    })();

    Animated.timing(fadeAnimation, {
      toValue:1,
      duration: _duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.circle),
    }).start();

  };

  return (
    <Modal>
      <View style={styles.root}>
        <View style={styles.topHeader}>
          <Text style={styles.header}>Picture Gallery</Text>
        </View>

        {isOutOfRange
          ? currentPic !== undefined && isVisible
            ? <Animated.View style={[styles.outerLimits, {opacity:fadeAnimation}]}>
                <Image 
                source={require('./../assets/TaikuriToRight.png')} 
                style={[styles.prevPic]} 
                />
              </Animated.View>
            : loadingView

          :  currentPic.path !== undefined && isVisible
            ? <View style={[styles.latest]}>
                <Animated.Image 
                  source={{uri:currentPic.path}} 
                  style={[styles.prevPic, {opacity: fadeAnimation}]}
                />
              </View>
            : loadingView
          
        }
        
        <View style={[styles.row, styles.buttonRow]}>
          <Pressable onPress={onPressPrev} style={({pressed}) => [{
            backgroundColor: pressed
            ? "rgba(12, 37, 103, 0.81)"
            : "rgba(12, 37, 103, 1)"
          }, styles.myButton]}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>

          <Pressable 
            onPress={onPressNext} 
            style={({pressed}) => [{
              backgroundColor: pressed
              ? "rgba(12, 37, 103, 0.81)"
              : "rgba(12, 37, 103, 1)"
            }, styles.myButton]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>

        <View style={[styles.row, styles.buttonRow, {backgroundColor:"rgba(12, 37, 103, 1)"}]}>
          <Pressable 
            onPress={props.onClose} 
            style={({pressed}) => [{
              backgroundColor: pressed
              ? "rgba( 255, 102, 0, 0.81)"
              : "rgba(255, 102, 0, 1)"
            }, styles.myButton]}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
        </View>

        {isOutOfRange
          ? <View style={styles.bottomView}>
              <Text style={styles.text}>At the outer limits of Gallery.</Text>
            </View>
          : <View style={styles.bottomView}></View>
        }
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
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
  loading: {
    width: 50,
    height: 50,
  },
  outerLimits: {
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent:"center",
    alignItems:"center",
  },
  text: {
    fontSize: 30,
    textAlign:"center",
    paddingTop: "2%",
    color:"#fff",
  },
  myButton: {
    width: 100,
    height: 61,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:'10%',
    marginHorizontal: '19%',
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
    marginTop: "8%",
    paddingTop: "9%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(255, 103, 0, 0.81)"
  },
  bottomView: {
    height:400,
  }
});
export default Gallery;