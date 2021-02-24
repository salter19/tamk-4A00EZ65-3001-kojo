import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const ButtonBase = ({onPress, buttonText}) => {

  return (
    <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(12, 37, 103, 0.81)'
                  : 'rgba(12, 37, 103, 1)',
              },
              styles.myButton,
            ]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
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
  },}
)

export default ButtonBase;