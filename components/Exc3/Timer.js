import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

// timer for the sake of exercise, not used at the app at the moment
const Timer = ({secondsGone, timeIsUp}) => {

  const [time, setTime] = useState(secondsGone);
  const [isCounting, setCounting] = useState(true);

  // useEffect has to values in the second param
  // secondsGone makes sure the object re-renders by each second 
  // while isCounting makes sure the rendering stops when it is
  // set to false.  
  useEffect(() => {

    if (isCounting) {
      
      // arbitrary time limit 
      // for future: 
      // take in props for the limit, instant stop & and counter start
      if (time <= 50 -1 && time >= 0) {

        // tic toc goes the clock
        timeHandler();
      } else {
        // timeIsUp() is func given in props
        timeIsUp();

        // boolean to stop the rendering
        setCounting(false);
      }
    }
    
  }, [secondsGone, isCounting]);

  const timeHandler = () => {
    setTime(secondsGone);
  }
  

    return (
        <View>
          <Text>Tic toc goes the clock: {time} seconds gone</Text>
        </View>
    );
};

export default Timer;