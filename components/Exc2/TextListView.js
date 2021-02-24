import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Priority from '../../data/Priority';

// my components
import ImageDisplay from '../ImageDisplay';
import { formatDateTime, formatDateTimeFromDate } from '../utils';

// static width wrapper for text
const wrap = (str) => {
  const res = str.replace(
    new RegExp(`(?![^\\n]{1,15}$)([^\\n]{1,15})\\s`, 'g'),
    '$1\n',
  );
  return res;
};

const format = (dateObj) => {
  // type tester
  const str = '';

  if (typeof dateObj !== typeof str) {
    // handle Date object
    return formatDateTimeFromDate(dateObj);
  } else {
    return formatDateTime(dateObj);
  }
};

const TextListView = ({ tasksArr, del, modifyItem }) => {
  const [deleteI, setDeleteI] = useState(null);

  const _onPress = (item) => {
    modifyItem(item);
  };

  const _onLongPress = (item) => {
    // set state deleteI
    // it is used to update the flatlist
    setDeleteI(item.key);

    // call deleteItem in App
    del(item.key);
};

const getPriority = (value) => {
    switch (value) {
        case Priority.MEDIUM:
            return "Med";
        
        case Priority.LOW:
            return "Low";
    
        default:
            return "High";
    }
}

const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => _onPress(item)}
        onLongPress={() => _onLongPress(item)}
      >
        <View
          style={[
            index % 2 === 0
              ? [styles.touchableItem_even, styles.listItem]
              : styles.listItem,
          ]}
        >

            <View>
                <Text style={styles.priority}>{getPriority(item.priority)}</Text>
            </View>  

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
            <Text style={styles.text}>{format(item.date)}</Text>
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
    </TouchableOpacity>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
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
    width: '100%',
    paddingHorizontal: '2%',
    borderWidth: 4,
    borderColor: '#0c2567',
    borderRadius: 2,
    marginVertical: '3%',
    alignItems: 'center',
    backgroundColor: '#ff6600',
  },
  flatListView: {
    marginVertical: '8%',
    width: '97%',
  },
  text: {
    color: '#ffffff',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 30,
    paddingTop: '2%',
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 24,
    flexWrap: 'wrap',
  },
  listItem: {
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 2,
    marginVertical: 2,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  touchableItem_even: {
    backgroundColor: '#0c2576',
  },
  separator: {
    height: 8,
    width: '80%',
    backgroundColor: '#0c2576',
    alignSelf: 'center',
    borderTopColor: '#ffffff',
    borderBottomColor: '#ffffff',
    borderWidth: 2,
    marginVertical: 4,
  },
  rowItem: {
    flexDirection: 'row',
  },
  columnItem: {
    flexDirection: 'column',
  },
  priority: {
    color:"#0c2567",
    fontWeight: "700",
    borderColor: "#ffffff",
    borderWidth: 2,
    marginRight: "-76%",
    marginBottom: "-42%",
    paddingLeft: "2%",
    paddingTop: "4%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.61)",
    borderRadius:21,
    width: 42,
    height: 42,
    
    
  },
});

export default TextListView;
