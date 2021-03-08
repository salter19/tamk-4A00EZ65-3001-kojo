// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import {v4 as uuidv4} from 'uuid';
import * as FileSystem from 'expo-file-system';

// my components
import TaskList from './components/Exc2/TextListView';
import EditTask from "./components/EditTask";
import TaskStorage from './data/TaskStorage';
import PicStorage from './data/PicStorage';
import Gallery from './components/Gallery'; 
import Cam from './components/CameraComponent';
import ButtonBase from './components/ButtonBase';
import ImageDisplay from "./components/ImageDisplay";

// the App to rule them all
export default function App() {

  const [task, setTask] = useState({
    key:undefined, 
    title:undefined, 
    description:undefined, 
    date:undefined,
    location:{ latitude:undefined, longitude:undefined},
    priority:undefined,
  });

  const [tasks, setTasks] = useState([]);
  const [isModifyActive, setModifyActive] = useState(false);
  const [currentTask, setCurrentTask] = useState(undefined);
  const [imgPaths, setImgPaths] = useState([]);
  const [isGalleryActive, setGalleryActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    (async() => {
      console.log('Loading...');
      const tasks1 = await TaskStorage.LoadTasks().catch(e => console.log(e));
      setTasks(tasks1);
    })()
  }, []);

  useEffect(() => {
    (async() => {
      console.log('Saving...');
      await TaskStorage.SaveTasks(tasks).catch(e => console.log(e));
    })();
  }, [tasks]);
  
  // 2:38 =>
  const onSubmit = (taskToSave) => {
    
    let key_tmp = undefined;
    
    currentTask !== undefined
      // handle updated data
      ? key_tmp = taskToSave.key   
      // create new task
      : key_tmp = uuidv4();
    
    createTask(taskToSave, key_tmp);
    setCurrentTask(undefined);
    setModifyActive(false);
  };

  const createTask = (taskToSave, key_tmp) => {
    
    setTask({ 
      key: key_tmp, 
      title: taskToSave.title, 
      description: taskToSave.description, 
      date: taskToSave.date,
      location: {
        latitude: taskToSave.location.latitude, 
        longitude:taskToSave.location.longitude
      },
      priority: taskToSave.priority,
    });   
  }
  
  // when ever picture is taken its path is pushed here
  const saveNewImg = (item) => {
    // make sure no duplicates are created
    const tmp = (imgPaths.filter((pic) => pic !== item));
    setImgPaths([...tmp, { path: item }]);
  }

  // load img paths
  useEffect(() => {
    (async() => {
      console.log('Loading paths...')
      const paths = await PicStorage.LoadPicPaths().catch(e => {console.error(e)});
      setImgPaths(paths); 
    })();
  }, []);

  // save img paths
  useEffect(() => {
    (async() => {
      console.log('saving paths...')
      await PicStorage.SavePicPaths(imgPaths).catch(e => console.error(e));
    })();
  }, [imgPaths]);

  // remove img
  const deleteImage = async(img) => {
    // remove img path from storage
    setImgPaths(imgPaths.filter((item) => item.path !== img));

    // remove img from memory
    await FileSystem.deleteAsync(img).catch(e => console.error(e));
  }

  // add task to tasks if key is found
  useEffect(() => {
    if (task.key !== undefined) {
      // make sure no duplicates are created
      const tmp = (tasks.filter((item) => item.key !== task.key));
      setTasks([...tmp, task]);
    }
  }, [task])

  // check that tasks was updated
  useEffect(() => {
    //console.log('tasks was updated')
  }, [tasks])

  const deleteTask = (key) => {
    setTasks(tasks.filter((item) => item.key !== key));
  };

  const modifyTask = (item) => {
    setCurrentTask(item);
    setModifyActive(true);
  };

  const addNewTask = () => {
    setCurrentTask(undefined);
    setModifyActive(true);
  };
  
  const openCamera = () => {
    setShowCamera(true);
  }

  const handleCloseCamera = () => {
    setShowCamera(false);
  }

  const addButton = 
    <View style={[styles.center, styles.buttonRow]}>
      <View style={styles.button}>
        <ButtonBase onPress={addNewTask} buttonText="Add Task" buttonSize={1}/>
      </View>
    </View>
  ;

  const buttonRow = 
    <View style={[styles.center, styles.buttonRow]}>

      <View style={styles.button}>
        <ButtonBase 
          onPress={() => setGalleryActive(true)} 
          buttonText="Gallery" 
          buttonSize={2}
        />
      </View>

      <View style={styles.button}>
        <ButtonBase onPress={openCamera} buttonText="Camera" buttonSize={2}/>
      </View>

    </View>
  ;

  const handleFromCameraToGallery = () => {
    handleCloseCamera();
    setGalleryActive(true);
  }

  return (
    <View style={styles.root}>

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
      </View>

      <View style={styles.row}>
        <ImageDisplay />
        <Text style={[styles.titleText]}>MY TASKS</Text>
      </View>

      
      <View style={styles.list}>
        {tasks.length > 0 ?
          <TaskList tasksArr={tasks} del={deleteTask} modify={modifyTask}/>
          :
          <View style={[styles.buttonRow, { width: "100%"}]}>
            <Text style={{color: "#fff", fontWeight:"700"}}>
              No tasks set yet
            </Text>
          </View>
        }
      </View>

      {isModifyActive ? 
        <EditTask 
          isModify={isModifyActive}  
          onSubmitPress={onSubmit} 
          onClose={() => setModifyActive(false)}
          currentTask={currentTask}
          saveNewImg={saveNewImg}
        />
        : addButton
      }

      {isGalleryActive ?
        <Gallery 
          onClose={() => setGalleryActive(false)} 
          paths={imgPaths}
          openCamera={openCamera}
          del={deleteImage}
        />
        : buttonRow
      }
   
      <Cam 
        onCloseCamera={handleCloseCamera}
        isVisible={showCamera}
        saveImg={saveNewImg}
        onGoGallery={handleFromCameraToGallery}
      />
     
    </View>
  );

  
}

// Styling for elements in App
const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingLeft: "5%",
  },
  statusbar: {
    height: Constants.statusBarHeight,
  },
  list: {
    width: "81%",
    maxHeight: "42%",
  },
  button: {
    marginHorizontal:"3%",
    marginBottom:"3%",
  },
  myButton: {
    width: 100,
    height: 42,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:'10%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor:"#fff",
  },
  buttonText: {
    color:"#fff",
    fontWeight:"700",
  },
  buttonRow: {
    height: 100,
    width:"81%",
    marginTop: "2%",
    paddingTop: "5%",
    paddingLeft: "3%",
    justifyContent: "space-around",
    alignItems:"center",
    backgroundColor: "rgba(255, 103, 0, 1)",
    borderColor: "#0c2567",
    borderWidth: 4,
    flexDirection: "row"
  },
  center: {
    justifyContent: "center",
    alignItems:"center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 30,
    paddingTop: "15%"
  }, 
  row: {
    flexDirection: "row",
    marginLeft: "-20%",
    marginBottom: "-5%",
  }
});
