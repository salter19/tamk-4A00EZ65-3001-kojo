// imports needed
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import {v4 as uuidv4} from 'uuid';

// my components
import TaskList from './components/Exc2/TextListView';
import EditTask from "./components/EditTask";
import TaskStorage from './data/TaskStorage';
import PicStorage from './data/PicStorage';
import Gallery from './components/Gallery'; 
import Cam from './components/CameraComponent';

// the App to rule them all
export default function App() {

  const [task, setTask] = useState({
    key:undefined, 
    title:undefined, 
    description:undefined, 
    date:undefined,
    location:{ latitude:undefined, longitude:undefined},
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
      location: {latitude: '61.49572', longitude:'23.82407'},
    });   
  }
  
  // when ever picture is taken its path is pushed here
  const saveNewImg = (item) => {
    setImgPaths([...imgPaths, { path: item }]);
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
            <Pressable 
              onPress={addNewTask}
              style={({pressed}) => [{
                backgroundColor: pressed
                ? "rgba(12, 37, 103, 0.81)"
                : "rgba(12, 37, 103, 1)"
              }, styles.myButton]}
            >
              <Text style={styles.buttonText}>Add Task</Text>
            </Pressable>
      </View>
    </View>
  ;

  const buttonRow = 
    <View style={[styles.center, styles.buttonRow]}>

      <View style={styles.button}>
        <Pressable
          onPress={() => setGalleryActive(true)}
          style={({pressed}) => [{
            backgroundColor: pressed
            ? "rgba(12, 37, 103, 0.81)"
            : "rgba(12, 37, 103, 1)"
          }, styles.myButton]}
        >
          <Text style={styles.buttonText}>Open Gallery</Text></Pressable>
      </View>

      <View style={styles.button}>
        <Pressable 
          onPress={openCamera}
          style={({pressed}) => [{
            backgroundColor: pressed
            ? "rgba(12, 37, 103, 0.81)"
            : "rgba(12, 37, 103, 1)"
          }, styles.myButton]}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </View>

    </View>
  ;

  return (
    <View style={styles.root}>

      {/* StatusBar component is phone's statusbar. */}
      <View style={styles.statusbar}>
        <StatusBar style="auto" />
      </View>

      <Text style={[styles.titleText]}>MY TASKS</Text>
      <View style={styles.list}>
        <TaskList tasksArr={tasks} deleteItem={deleteTask} modifyItem={modifyTask}/>
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
        />
        : buttonRow
      }

       
      <Cam 
        onCloseCamera={handleCloseCamera}
        isVisible={showCamera}
        saveImg={saveNewImg}
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
    height: 61,
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
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(255, 103, 0, 1)",
    borderColor: "#0c2567",
    borderWidth: 4,
    flexDirection: "row"
  },
  center: {
    justifyContent:"center",
    alignItems:"center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 30,
    paddingTop: "2%"
  }
});
