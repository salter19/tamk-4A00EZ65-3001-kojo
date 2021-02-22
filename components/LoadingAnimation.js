import React, {useRef, useEffect} from 'react';
import {Animated, View, Image, StyleSheet, Easing} from 'react-native';


const LoadingAnimation = (props) => {
  // the current rotation in degrees
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, 
        {
          toValue: 1,
          duration: props.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
    ).start();
    
  });

  const spin = () => {
    return (
    spinValue.current.interpolate( {
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    })
    );
  }
  return (
    <View >
      <Animated.Image 
        source={require('../assets/spinner.png')}
        style={[StyleSheet.img, {transform: [ { rotate: spin() } ]}]}
      />
    </View>
  );

};

const styles = StyleSheet.create(
  {
    img: {
      width: 100,
      height: 100,
    }
  }
);

export default LoadingAnimation;