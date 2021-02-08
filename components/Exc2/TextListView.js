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

// static width wrapper for text
const wrap = (str) => {
  const res = str.replace(new RegExp(`(?![^\\n]{1,24}$)([^\\n]{1,24})\\s`, 'g'),'$1\n');
  return res;
}

const format = (dateStr) => {
  // type tester
  const str = "this a string";

  if (typeof dateStr !== typeof str) {
    // if Date object, proceed with funcs
    const date = dateStr.getDate();
    const month = dateStr.getMonth() +1;
    const year = dateStr.getFullYear();
    const hour = dateStr.getHours();
    let minute = dateStr.getMinutes();

    // add zero in front, if one digit
    if (minute < 10) {
      const tmp = `0+${minute}`;
      minute = tmp;
    }
    return (date + "." + month + "." + year + " " + hour + ":" + minute);

  } else {
    // if string object, proceed with string operations
    let tmp_date = dateStr.split(new RegExp('[-:T]'), 3);
    const date = tmp_date.reverse().join('.');
    const time = dateStr.split(new RegExp('[-T:]'), 5).slice(3).join(':');
    return date + ' ' + time;
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
            ? styles.touchableItem_even
            : styles.touchableItem_odd,
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
        marginVertical:"3%"
    },
    flatListView: {
        marginVertical:"8%",
    },
    text: {
        color:"#ffffff", 
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 24,
      lineHeight: 36,
    },
    descriptionText: {
      fontSize: 18,
      lineHeight: 24,
      flexWrap:"wrap",
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
