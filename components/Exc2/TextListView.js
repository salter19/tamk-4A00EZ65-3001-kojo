import React, {useState, useEffect} from 'react';
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
import {formatDateTime, formatDateTimeFromDate} from '../utils';

// static width wrapper for text
const wrap = (str) => {
  const res = str.replace(new RegExp(`(?![^\\n]{1,24}$)([^\\n]{1,24})\\s`, 'g'),'$1\n');
  return res;
}

const format = (dateObj) => {
  // type tester
  const str = "this a string";

  if (typeof dateObj !== typeof str) {
    // handle Date object    
    return formatDateTimeFromDate(dateObj);
  } else {
    return formatDateTime(dateObj);
  }
}

const TextListView = ({tasksArr, deleteItem, modifyItem}) => {
    const [deleteI, setDeleteI] = useState(null);

    const _onPress = (item) => {
      modifyItem(item);
    };

    const _onLongPress = (item) => {
        // set state deleteI
        // it is used to update the flatlist
        setDeleteI(item.key);

        // call deleteItem in App
        deleteItem(item.key);
    };

    const renderItem = ({item, index}) => {

      return (
        
        <TouchableOpacity 
            key={item.key} 
            onPress={() => _onPress(item)}
            onLongPress= { () => _onLongPress(item)}
        >
          <View style={[
            index % 2 === 0 
            ? [styles.touchableItem_even, styles.listItem]
            : styles.listItem,
            ]}>

              <View style={styles.rowItem}>
                <ImageDisplay />
                <View style={styles.columnItem}>

                  <View>
                    <Text style={[styles.text, styles.titleText]}>
                      {wrap(item.title)}
                    </Text>
                  </View>
                  
                  <View>
                    <Text style={[styles.text, styles.descriptionText]}>
                      {wrap(item.description)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.text}>
                      {format(item.date)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.text}>
                      {'latitude: ' + item.location.latitude}
                    </Text>
                    <Text style={styles.text}>
                      {'longitude: ' + item.location.longitude}
                    </Text>
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
            data={tasksArr}
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
      paddingHorizontal: "2%",
      borderWidth: 2,
      borderColor: "#ffffff",
      borderRadius: 1,
      marginVertical:"3%",
      alignItems:"center",
  },
  flatListView: {
      marginVertical:"8%",
      width: "100%",
  },
  text: {
      color:"#ffffff", 
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 30,
    paddingTop: "2%"
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 24,
    flexWrap:"wrap",
  },
  listItem: {
    width: "100%",
    borderColor: "#ffffff",
    borderWidth: 4,
    borderRadius: 2,
    marginVertical: 2,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  touchableItem_even: {
    backgroundColor:"#0c2576",
  },
  separator: {
    height: 8,
    width:"80%",
    backgroundColor: "#0c2576",
    alignSelf:"center",
    borderTopColor:"#ffffff",
    borderBottomColor:"#ffffff",
    borderWidth:2,
    marginVertical:4,
  },
  rowItem: {
    flexDirection:'row',
  },
  columnItem: {
    flexDirection:'column'
  }
});

export default TextListView;
