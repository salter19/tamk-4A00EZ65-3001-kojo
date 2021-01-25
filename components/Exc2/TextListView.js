import React, {useState, useEffect} from 'react';
import {Array, Text, View} from 'react-native';

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
        <View >
            {itemsArr.map((e, index) => <Text key={index}>{e}</Text>)}
        </View>
    );
};

export default TextListView;