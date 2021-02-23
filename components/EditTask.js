import React, { useEffect, useState } from 'react';
import { Text, Modal, StyleSheet, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Textfield from '../components/Exc2/InputText';
import ButtonTypes from '../data/ButtonTypes';
import { formatDate, formatTime } from './utils';
import { HIGH, MEDIUM, LOW } from '../../data/Priority';

const EditTask = ({ isModify, onClose, onSubmitPress, currentTask }) => {
  const [isVisible, setVisible] = useState(false);
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [priority, setPriority] = useState(HIGH);

  const titles = ['Task title', 'Description', 'Date', 'Set Date', 'Set Time'];

  useEffect(() => {
    setVisible(true);
  }, [isModify]);

  const saveAndClose = () => {
    onSubmitPress({
      key: key,
      title: title,
      description: description,
      date: date,
      priority: priority,
    });
    onClose();
  };

  const onClosePressed = () => {
    console.log('pressed close, should save?');
    onClose();
  };

  useEffect(() => {
    if (currentTask !== undefined) {
      setKey(currentTask.key);
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDate(currentTask.date);

      formatDateTime(currentTask.date);
    } else {
      formatDateTime(date);
    }
  }, []);

  const formatDateTime = (dateToFormat) => {
    const str = 'this is a str';

    if (typeof dateToFormat !== typeof str) {
      formatDateToStr(dateToFormat);
      formatTimeToStr(dateToFormat);
    } else {
      setDate(new Date(dateToFormat));
      const date = formatDate(dateToFormat);
      const time = formatTime(dateToFormat);
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
    setShowPicker(true);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  const handlePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    formatDateToStr(currentDate);
    formatTimeToStr(currentDate);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={saveAndClose}
    >
      <View style={[styles.centeredView, styles.root]}>
        <View>
          <Text>{titles[0]}</Text>
          <Textfield
            currentItem={currentTask ? currentTask.title : ''}
            updateData={updateTitle}
          />
        </View>

        <View>
          <Text>{titles[1]}</Text>
          <Textfield
            currentItem={currentTask ? currentTask.description : ''}
            updateData={updateDescription}
          />
        </View>

        <View style={styles.rightAligned}>
          <View style={styles.row}>
            {/* ToDo: add textfield possibility to add date */}
            <Text style={styles.dateTime}>{formattedDate}</Text>

            <View style={[styles.button]}>
              <Button title={titles[3]} onPress={showDatePicker} />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.dateTime}>{formattedTime}</Text>

            <View style={[styles.button]}>
              <Button title={titles[4]} onPress={showTimePicker} />
            </View>
          </View>

          {showPicker && (
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

        <View style={styles.row}>
          <View style={[styles.buttonLeft, styles.button]}>
            <Button
              title={currentTask ? ButtonTypes.UPDATE : ButtonTypes.ADD}
              onPress={saveAndClose}
            />
          </View>
          <View style={[styles.buttonRight, styles.button]}>
            <Button title={ButtonTypes.CLOSE} onPress={onClosePressed} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.81)',
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
    marginTop: '10%',
    width: 100,
  },
  buttonLeft: {
    marginRight: '5%',
  },
  buttonRight: {
    marginLeft: '5%',
  },
  leftAligned: {
    alignItems: 'flex-start',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
});

export default EditTask;
