import React, {useState, useEffect, Component} from 'react';
import {
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    View,
} from 'react-native';


const TextListView = ({input, deleteItem}) => {

    return (
        <View style={styles.container}>
            {/* ScrollView for scrolling */}
            <ScrollView>
                {
                    input.map(item => {
                        return (
                            // map through items of given array and render them
                            // as touchable text
                            <TouchableOpacity key={item.key} onPress={deleteItem(item.key)}>
                                <Text style={styles.text}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
   
};

const styles = StyleSheet.create({
    container: {
        height: "30%",
        width:"80%",
        paddingHorizontal: "8%",
        borderWidth: 2,
        borderColor: "#ffffff",
        marginVertical:"3%"
    },
    itemContainer:{
        backgroundColor:"#c9c9c9"
    },
    scrollView: {
        marginVertical:"8%",
    },
    text: {
        color:"#ffffff", 
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 42,
    }
});

export default TextListView;