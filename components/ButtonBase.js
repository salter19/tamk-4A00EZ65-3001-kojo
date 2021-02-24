import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const ButtonBase = ({onPress, buttonText}) => {

  const deleteBase = (({ pressed }) => [{
    backgroundColor: pressed
      ? 'rgba(255, 42, 0, 0.81)'
      : 'rgba(255, 42, 0, 1)'
    }, 
    styles.myButton, styles.buttonDel
  ]);

  const blueBase = (({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgba(12, 37, 103, 0.81)'
        : 'rgba(12, 37, 103, 1)'
    },
    styles.myButton,
  ]);

  return (
    <Pressable
            onPress={onPress}
            style={buttonText === 'DELETE'
                ? deleteBase
                : blueBase
            }
    >
      <Text style={buttonText === 'DELETE'
                    ? [styles.buttonText, styles.textDel]
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
    width: 56,
    height: 42,
    borderColor: '#0c2567',
    borderWidth: 4,
  },
  textDel: {
    fontSize: 11,
  },
}
)

export default ButtonBase;