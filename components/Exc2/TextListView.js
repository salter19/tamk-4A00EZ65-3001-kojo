import React, {useState} from 'react';
import {
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    View,
    FlatList,
    SafeAreaView
} from 'react-native';


const TextListView = ({input, deleteItem}) => {
    const [deleteI, setDeleteI] = useState(null);

    const _onPress = (item) => {
        // set state deleteI
        // it is used to update the flatlist
        setDeleteI(item.key);

        // call deleteItem in App
        deleteItem(item.key);
    }

    const renderItem = ({item}) => {
         
        return (
            <TouchableOpacity 
                key={item.key} 
                onPress={() => _onPress(item)}>
    
                <View style={styles.touchableItem}>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
                
            </TouchableOpacity>);
        
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* ScrollView for scrolling */}
            <FlatList 
            style={styles.scrollView}
            data={input}
            renderItem={renderItem}
            extraData={deleteI}
            >
            <Text>{deleteI}</Text>
            </FlatList>
        </SafeAreaView>
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
    scrollView: {
        marginVertical:"8%",
    },
    text: {
        color:"#ffffff", 
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 42,
    },
    touchableItem: {
        width: "100%",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginVertical: 4,
        paddingHorizontal: 6
    }
});

export default TextListView;
