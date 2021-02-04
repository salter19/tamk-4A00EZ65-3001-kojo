import React, {useState} from 'react';
import {
    Text, 
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

    const itemSeparator = () => {
        return (
            <View style={styles.separator}/>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* FlatList for scrolling */}
            <FlatList 
            style={styles.flatListView}
            data={input}
            renderItem={renderItem}
            extraData={deleteI}
            ItemSeparatorComponent={itemSeparator}
            >
            <Text>{deleteI}</Text>
            </FlatList>
        </SafeAreaView>
    );
   
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: "8%",
        borderWidth: 2,
        borderColor: "#ffffff",
        marginVertical:"3%"
    },
    flatListView: {
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
    },
    separator: {
        height: 6,
        width:"80%",
        backgroundColor: "#0c2576",
        alignSelf:"center",
        borderTopColor:"#ffffff",
        borderBottomColor:"#ffffff",
        borderWidth:1
    }
});

export default TextListView;
