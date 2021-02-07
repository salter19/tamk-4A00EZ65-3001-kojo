import React, {useState} from 'react';
import {
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    View,
    FlatList,
    SafeAreaView
} from 'react-native';


const TextListView = ({input, deleteItem, modifyItem}) => {
    const [deleteI, setDeleteI] = useState(null);

    const _onPress = (item) => {
      modifyItem(item);
    }

    const _onLongPress = (item) => {
        // set state deleteI
        // it is used to update the flatlist
        setDeleteI(item.key);

        // call deleteItem in App
        deleteItem(item.key);
    }
    const renderItem = ({item, index}) => {
        
        return (
          
          <TouchableOpacity 
              key={item.key} 
              onPress={() => _onPress(item)}
              onLongPress= { () => _onLongPress(item)}
          >
            <View style={[
              index % 2 === 0 
              ? styles.touchableItem_even
              : styles.touchableItem_odd,
              ]}>
                <Text style={styles.text}>{item.title}</Text>
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
          <Text style={styles.text}>Tasks:</Text>
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
        alignSelf: 'center'
    },
    touchableItem_odd: {
        width: "100%",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginVertical: 4,
        paddingHorizontal: 6
    },
    touchableItem_even: {
      width: "100%",
      borderColor: "#ffffff",
      backgroundColor:"#0c2576",
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
