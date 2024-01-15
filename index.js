/**
 * @format
 */
 import 'react-native-gesture-handler'
 import 'react-native-reanimated'
 import '@react-native-async-storage/async-storage'
 import {AppRegistry} from 'react-native';
 import App from './onCoding/setup';
 import {name as appName} from './app.json';
 import messaging, { firebase }  from '@react-native-firebase/messaging';

 // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
 AppRegistry.registerComponent(appName, () => App);
 