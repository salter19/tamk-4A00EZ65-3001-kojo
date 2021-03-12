import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

// Custom button for the project
const ButtonBase = ({
  onPress, 
  buttonText, 
  buttonColor = 'blue', 
  buttonSize = 1
}) => {

  // button base for delete
  const deleteBase = (({ pressed }) => [{
    backgroundColor: pressed
      ? 'rgba(255, 42, 0, 0.81)'
      : 'rgba(255, 42, 0, 1)'
    }, 
    styles.myButton, styles.buttonDel, styles.smallButton
  ]);

  // button base for blue button
  const blueBase = (({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgba(12, 37, 103, 0.81)'
        : 'rgba(12, 37, 103, 1)'
    },

    // set button according to given size
    buttonSize === 1 
      ? styles.myButton
      : buttonSize === 0
        ? [styles.myButton, styles.smallButton]
        : [styles.myButton, styles.smallButton, styles.longButton]
        
  ]);

  // button base for orange button
  const orangeBase = (({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgba( 255, 102, 0, 0.81)'
        : 'rgba( 255, 102, 0, 1)'
    },

    // set button according to given sizw
    buttonSize === 1 
      ? styles.myButton
      : buttonSize === 0
        ? [styles.myButton, styles.smallButton]
        : [styles.myButton, styles.smallButton, styles.longButton]
  ]);

  return (
    <Pressable
            onPress={onPress}
            style={
              buttonText === 'DELETE'
                ? deleteBase
                : buttonColor === 'blue'
                  ? blueBase
                  : orangeBase
            }
    >
      <Text style={
        buttonText === 'DELETE'
          ? [styles.buttonText, styles.textSmallButton]
          : buttonSize === 0
              ? [styles.buttonText, styles.textSmallButton]
              : styles.buttonText
        }
      >
        {buttonText}
      </Text>
    </Pressable>
  );

}

const styles = StyleSheet.create(
{  myButton: {
    width: 100,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
    marginHorizontal: '5%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  buttonDel: {
    borderColor: '#0c2567',
    borderWidth: 4,
  },
  textSmallButton: {
    fontSize: 10,
  },
  smallButton: {
    width: 56,
    height: 42,
  },
  longButton: {
    width: 100,
  }
}
)

export default ButtonBase;