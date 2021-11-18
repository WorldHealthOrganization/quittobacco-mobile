// Imports
import React from 'react';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import firebase from 'react-native-firebase';
import type, {Notification, NotificationOpen} from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

// App Imports
import {store, persistor} from './store';

import Routes from './routes';
//import fontPatch from './helpers/fontPatch';

////fontPatch();

// App
export default class App extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
  }

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        var seen = [];
        console.log(
          'notification ==>>> ' +
            JSON.stringify(notification, function (key, val) {
              if (val != null && typeof val == 'object') {
                if (seen.indexOf(val) >= 0) {
                  return;
                }
                seen.push(val);
              }
              return val;
            }),
        );
        //console.log('notification ==>>> ' + JSON.stringify(seen));
        const {title, body} = notification;

        const localNotification = new firebase.notifications.Notification({
          sound: notification.data.sound ? notification.data.sound : 'default',
          show_in_foreground: true,
        })
          .setNotificationId(notification._notificationId)
          .setTitle(notification._title)
          //.setSubtitle(notification.subtitle)
          .setBody(notification._body)
          .setData(notification._message)
          .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
          .android.setSmallIcon('@mipmap/ic_launcher_round') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch((err) => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_default_channel',
      'Tobacco',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Tobacco')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;

        AsyncStorage.setItem('pushNotify', '1');
        show_in_foreground: true;
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;

      AsyncStorage.setItem('pushNotify', '1');
      show_in_foreground: true;
    }
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <Provider store={store} key="provider">
        {/* <PersistGate persistor={persistor}> */}
        <Routes />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}
