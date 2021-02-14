import * as FileSystem from 'expo-file-system';
import {Dimensions} from 'react-native';

export const IMAGE_DIR = FileSystem.documentDirectory + "images/";

export const CAMERA_BACK = 'back';
export const CAMERA_FRONT = 'front';
export const WINDOW_WIDTH = Dimensions.get('window').width;
