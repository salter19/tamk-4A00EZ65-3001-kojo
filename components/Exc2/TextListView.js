import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, SafeAreaView, Touchable} from 'react-native';
import {v4 as uuidv4} from 'uuid';


const TextListView = ({input}) => {

    const [itemsArr, setItemsArr] = useState([]);

    // call useEffect at each input change
    useEffect(() => {
        // add input into itemsArr
        addItemHandler();
    }, [input]);
    
    const addItemHandler = () => {
        if (input) {
            setItemsArr([...itemsArr, input]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView} 
                indicatorStyle={'white'}
            >
                {itemsArr.map(e => 
                <Text key={uuidv4()} style={styles.text}>{e}</Text>)}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "30%",
        width:"80%",
        paddingHorizontal: "8%",
        borderWidth: 2,
        borderColor: "#ffffff"
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