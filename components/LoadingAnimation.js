import React, {useRef, useEffect} from 'react';
import {Animated, View, Image, StyleSheet, Easing} from 'react-native';


const LoadingAnimation = ({ duration }) => {
  // the current rotation in degrees
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, 
        {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
    
  }, [spinValue]);

  const spin = () => {
    return (
    spinValue.current.interpolate( {
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    );
  }
  return (
    <Animated.View style={{transform: [ { rotate: spin() } ]}}>
      <Image 
        source={require('../assets/spinner.png')}
        style={StyleSheet.img}
      />
    </Animated.View>
  );

};

const styles = StyleSheet.create(
  {
    img: {
      width: 200,
      height: 200,
    }
  }
);

export default LoadingAnimation;