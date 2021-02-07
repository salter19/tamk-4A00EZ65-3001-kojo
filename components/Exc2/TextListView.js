import React, {useState} from 'react';
import {
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    View,
    FlatList,
    SafeAreaView
} from 'react-native';

// my components
import ImageDisplay from '../ImageDisplay';


const TextListView = ({input, deleteItem, modifyItem}) => {
    const [deleteI, setDeleteI] = useState(null);
    const imgpath = './../assets/steel.png';
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

                <View style={styles.rowItem}>
                  <ImageDisplay />
                  <View style={styles.columnItem}>

                    <View>
                      <Text style={[styles.text, styles.titleText]}>
                        {item.title}
                      </Text>
                    </View>
                    
                    <View>
                      <Text style={[styles.text, styles.descriptionText]}>
                        {item.description}
                      </Text>
                    </View>

                    <View>
                      
                    </View>
                  </View>
                </View>
                
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
          <Text style={[styles.text, styles.titleText]}>Tasks:</Text>
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
        alignSelf: 'center'
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 32,
      lineHeight: 42,
    },
    descriptionText: {
      fontSize: 26,
      lineHeight: 36,
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
  },
  rowItem: {
    flexDirection:'row',
  },
  columnItem: {
    flexDirection:'column'
  }
});

export default TextListView;
