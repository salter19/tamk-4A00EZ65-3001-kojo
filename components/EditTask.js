import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  Modal,
  StyleSheet,
  View,
  Platform,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Textfield from '../components/Exc2/InputText';
import ButtonTypes from '../data/ButtonTypes';
import * as Utils from './utils';
import Priority from './../data/Priority';
import { FADE_DURATION } from './../data/Constants';
import ButtonBase from './ButtonBase';
import Maps from './Maps';

const EditTask = ({ isModify, onClose, onSubmitPress, currentTask }) => {
  // states that define if an element is visible or not
  const [isVisible, setVisible] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isPrioritySet, setIsPrioritySet] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  // states that define element values
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');

  // date and time need to be formatted
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  // default value for priority is set to high
  const [priority, setPriority] = useState(Priority.HIGH);
  const [priorityHigh, toggleHigh] = useState(true);
  const [priorityMedium, toggleMedium] = useState(false);
  const [priorityLow, toggleLow] = useState(false);

  const [location, setLocation] = useState({
    latitude: undefined, 
    longitude: undefined
  });

  // Titles of form elements
  const titles = [
    'Task title    * mandatory', 
    'Description', 'Date', 
    'Set Date', 'Set Time'
  ];
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setVisible(true);
  }, [isModify]);

  useEffect(() => {
    if (!priority) {
      setIsPrioritySet(true);
      fadeIn(3000);
    }
  }, [priority]);

  // set fade in animation
  const fadeOut = (_duration = FADE_DURATION) => {
    (() => {
      const timeout = setTimeout(() => {
        setIsPrioritySet(false);
      }, 3000);
      return () => clearTimeout(timeout);
    })();

    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: _duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.circle),
    }).start();

    setPriority(Priority.HIGH);
    toggleHigh(true);
  };

  // set fade in animation
  const fadeIn = (_duration = FADE_DURATION) => {
    (() => {
      const timeout = setTimeout(() => {
        fadeOut(_duration);
      }, 3000);
      return () => clearTimeout(timeout);
    })();

    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: _duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.circle),
    }).start();
  };

  const saveAndClose = () => {
    // if there is a task title, save task at close
    const hasTitle = () => {
      onSubmitPress({
        key: key,
        title: title,
        description: description,
        date: date,
        priority: priority,
        location: location,
      });
      onClose();
    }

    // alert if task is not saved
    const hasNotTitle = () => {
      alert("No task title was set, task not saved.");
      onClose();
    }

    title !== '' 
    ? hasTitle()
    : hasNotTitle();
  };

  const onClosePressed = () => {
    // Alert about closing without saving
    // give option to close with or without saving
    Alert.alert(
      "About to close",
      "Save before closing?",
      [
        {
          text: "Don't save",
          onPress: onClose(),
          style:"cancel"
        },
        {
          text: "Save",
          onPress: saveAndClose(),
        }
      ],
      {
        cancelable: false
      }
    );
  };

  useEffect(() => {
    if (currentTask !== undefined) {
      setKey(currentTask.key);
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDate(currentTask.date);
      formatDateTime(currentTask.date);
      resetPriority(currentTask.priority);
      setLocation(currentTask.location);
    } else {
      formatDateTime(date);
    }
  }, []);

  const resetPriority = (value) => {
      switch (value) {
          case Priority.MEDIUM:
              setPriority(Priority.MEDIUM);
              toggleMedium(true);
              toggleHigh(false);
              toggleLow(false);
              break;
      
          case Priority.LOW:
              setPriority(Priority.LOW);
              toggleLow(true);
              toggleHigh(false);
              toggleMedium(false);
              break;
          default:
              break;
      }
  }

  const formatDateTime = (dateToFormat) => {
    const str = "";
    if (typeof dateToFormat !== typeof str) {
      formatDateToStr(dateToFormat);
      formatTimeToStr(dateToFormat);
    } else {
      const dateObj = new Date(Utils.formatDateTimeFromStr(dateToFormat));
      console.log('at edit ' + dateObj)
      setDate(dateObj);
      const date = Utils.formatDate(dateToFormat);
      const time = Utils.formatTime(dateToFormat);
      setFormattedDate(date);
      setFormattedTime(time);
    }
  };

  const formatDateToStr = (dateToFormat) => {
    const day = dateToFormat.getDate();
    const month = dateToFormat.getMonth() + 1;
    const year = dateToFormat.getFullYear();

    setFormattedDate(`${day}.${month}.${year}`);
  };

  const formatTimeToStr = (dateToFormat) => {
    let minute = dateToFormat.getMinutes();
    let hour = dateToFormat.getHours();

    if (minute < 10) {
      minute = `0${minute}`;
    }

    setFormattedTime(`${hour}:${minute}`);
  };

  const updateTitle = (data) => {
    setTitle(data);
  };

  const updateDescription = (data) => {
    setDescription(data);
  };

  const showMode = (currentMode) => {
    setPickerMode(currentMode);
    setIsPickerVisible(true);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  const handlePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('edit current date:' + typeof currentDate)
    setIsPickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    formatDateToStr(currentDate);
    formatTimeToStr(currentDate);
  };

  const setHigh = () => {
    toggleHigh(!priorityHigh);

    if (!priorityHigh) {
      setPriority(Priority.HIGH);
      toggleMedium(false);
      toggleLow(false);
    } else {
      setPriority(null);
    }
  };
  const setMedium = () => {
    toggleMedium(!priorityMedium);

    if (!priorityMedium) {
      setPriority(Priority.MEDIUM);
      toggleHigh(false);
      toggleLow(false);
    } else {
      setPriority(null);
    }
  };
  const setLow = () => {
    toggleLow(!priorityLow);

    if (!priorityLow) {
      setPriority(Priority.LOW);
      toggleMedium(false);
      toggleHigh(false);
    } else {
      setPriority(null);
    }
  };

  const onCloseMap = (location) => {
    setIsMapVisible(false);
    const loc = {latitude: location.latitude, longitude: location.longitude};
    setLocation(loc);
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={saveAndClose}
    >
      <View style={[styles.centeredView, styles.root]}>
        {/* task title */}
        <View>
          <Text style={[styles.textTitle, {marginLeft:"4%"}]}>{titles[0]}</Text>
          <Textfield
            currentItem={currentTask ? currentTask.title : ''}
            updateData={updateTitle}
          />
        </View>

        {/* task description */}
        <View>
          <Text style={[styles.textTitle, {marginLeft:"4%"}]}>{titles[1]}</Text>
          <Textfield
            currentItem={currentTask ? currentTask.description : ''}
            updateData={updateDescription}
          />
        </View>

        {/* date and time */}
        <View>
          <Text style={[styles.textTitle, styles.textLeftAlign]}>Due time</Text>
          <View style={styles.rightAligned}>
            {/* date */}
            <View style={styles.row}>
              <Text style={styles.dateTime}>{formattedDate}</Text>

              <View style={[styles.button]}>
                <ButtonBase 
                  onPress={showDatePicker}
                  buttonText={titles[3]}
                  buttonSize={2}
                  buttonColor="orange"
                />                
              </View>
            </View>

            {/* time */}
            <View style={styles.row}>
              <Text style={styles.dateTime}>{formattedTime}</Text>

              <View style={[styles.button]}>
                <ButtonBase 
                  onPress={showTimePicker} 
                  buttonText={titles[4]} 
                  buttonSize={2}
                  buttonColor="orange"
                />
              </View>
            </View>

            {/* dateTimePicker */}
            {isPickerVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={pickerMode}
                is24Hour={true}
                display="default"
                onChange={handlePickerChange}
              />
            )}

          </View>
        </View>
        
        {/* priority checkboxes */}
        <View>
          <Text style={[styles.textTitle, styles.textLeftAlign]}>Priority</Text>
          <View>
            
            {/* set to default if none is chosen */}
            {isPrioritySet && (
              <Animated.Text style={{ opacity: fadeAnimation }}>
                None chosen, set to default.
              </Animated.Text>
            )}

            {/* checkboxes */}
            <View style={styles.row}>
              <View style={styles.row}>
                <Text>high</Text>
                <CheckBox
                  disabled={false}
                  value={priorityHigh}
                  onValueChange={setHigh}
                />
              </View>

              <View style={styles.row}>
                <Text>medium</Text>
                <CheckBox
                  disabled={false}
                  value={priorityMedium}
                  onValueChange={setMedium}
                />
              </View>

              <View style={styles.row}>
                <Text>low</Text>
                <CheckBox
                  disabled={false}
                  value={priorityLow}
                  onValueChange={setLow}
                />
              </View>
            </View>

          </View>
        </View>

        {/* map */}
        <View>
          <Text style={[
            styles.textTitle, 
            styles.textLeftAlign, {paddingLeft:"7%"}]}>Location</Text>
          <View>
            <View style={styles.row}>

              <View style={{flexDirection:"column"}}>
                <View style={styles.textMap}>
                  <Text>Latitude:
                    {location.latitude !== undefined ? 
                    ` ${location.latitude}` : " -"}
                  </Text>
                </View>

                <View style={styles.textMap}>
                  <Text>Longitude: 
                    {location.longitude !== undefined ?
                    ` ${location.longitude}` : " -"}
                  </Text>
                </View>
              </View>

              <View style={[styles.button, styles.buttonMap]}>
                <ButtonBase 
                  onPress={() => setIsMapVisible(true)}
                  buttonText="Open Map"
                  buttonSize={2}
                  buttonColor="orange"
                  />
              </View>
            </View>

            {/* map view */}
            {isMapVisible && (
              <Maps 
                isVisible={isMapVisible}
                onClose={onCloseMap}
                location={location}
              />
            )}

          </View>
        </View>

        {/* bottom button row */}
        <View style={[styles.row, styles.buttonRow]}>
          
            {/* add - modify button */}
            <View >
              <ButtonBase 
                onPress={saveAndClose} 
                buttonText={currentTask ? ButtonTypes.UPDATE : ButtonTypes.ADD}
                buttonSize={2}
              />
            </View>

          {/* close button */}
          <View >
            <ButtonBase 
              onPress={onClosePressed} 
              buttonText={ButtonTypes.CLOSE} 
              buttonSize={2}
            />
          </View>
        
        </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    height: '80%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    height: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateTime: {
    marginTop: '10%',
    paddingTop: '0.3%',
    paddingRight: '3%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: '5%',
    width: 100,
  },
  leftAligned: {
    alignItems: 'flex-start',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
  buttonText: {
    color:"#fff",
    fontWeight:"700",
  },
  buttonMap: {
    marginTop:"2%",
    marginLeft: "2%"
  },
  buttonRow: {
    height: 100,
    width:"81%",
    marginTop: "-5%",
    paddingTop: "9%",
    paddingLeft: "8%",
    justifyContent: "space-around",
    alignItems:"center",
    flexDirection: "row"
  },
  textMap: {
    flexDirection:"column",
    marginTop:"2%",
    paddingLeft:"-4%"
  },
  textTitle: {
    fontSize:18,
    fontWeight:"bold",
    marginTop:"4%",
  },
  textLeftAlign: { 
    marginLeft:"-9%" 
  }
});

export default EditTask;
