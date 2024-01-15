// Imports
import React from 'react';
import {Alert, Linking} from 'react-native';
import {Provider} from 'react-redux';
import messaging, {firebase} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NotificationManager from 'react-native-check-notification-enable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationSetting from 'react-native-open-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {store, persistor} from './store';

import Routes from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribe = messaging().onMessage(async (remoteMessage) => {
      this.handleFCMMessage(remoteMessage);
    });
  }

  componentWillUnmount() {
    // Clean up the subscription when the component unmounts
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleFCMMessage = (remoteMessage) => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  };

  componentDidMount() {
    this.checkPermission();
    NotificationManager.areNotificationsEnabled()
      .then((e) => {
        if (e) {
          console.log('Notification Enabled');
        } else {
          NotificationSetting.open();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     console.log(
    //       'Notification caused app to open from quit statehvcxjv',
    //       remoteMessage.notification,
    //     );
    //     const dat = {
    //       channelId: 'fcm_fallback_notification_channel', // (required)
    //       channelName: 'My channel',
    //       largeIcon: "ic_launcher",
    //       //... You can use all the options from localNotifications
    //       message: remoteMessage.notification.body, // (required)
    //       title:remoteMessage.notification.title,
    //     };
    // console.log(dat)
    // PushNotification.localNotification(dat);
    //   });

    //   PushNotification.configure({
    //     onNotification: function(notification) {
    //         const { data } = notification;

    //         AsyncStorage.setItem('pushNotify', '1');
    //     }
    // });

    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification.userInteraction);
        // setnotifi(true)
        //  setLocalnotifi(true)

        // notification.finish(PushNotificationIOS.FetchResult.NoData);
        if (notification.userInteraction == true) {
          // alert('njm,,m,')
          //  setnotifi(false)
          //  navigation.navigate('NotificationList')
          AsyncStorage.setItem('pushNotify', '1');
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      foreground: true,
      popInitialNotification: true,
      requestPermissions: true,
    });
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   AsyncStorage.setItem('pushNotify', '1');
    // });

    messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // AsyncStorage.setItem('shownotification', 'true');
      // DeviceEventEmitter.emit('notificationKey', {shownotification:'true'});
      PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel',
        largeIcon: 'ic_launcher',
        //... You can use all the options from localNotifications
        message: remoteMessage.notification.body, // (required)
        title: remoteMessage.notification.title,
        foreground: true,
      });
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      // PushNotification.localNotification({
      //   channelId:'fcm_fallback_notification_channel',
      //   autoCancel: true,
      //   title: 'Edukool',
      //   foreground:true,
      //   message:  remoteMessage.data.message,
      //   vibrate: true,
      //   vibration: 300,
      //   playSound: true,
      //   soundName: 'default',
      // })

      const dat = {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel',
        largeIcon: 'ic_launcher',
        //... You can use all the options from localNotifications
        message: remoteMessage.notification.body, // (required)
        title: remoteMessage.notification.title,
      };
      console.log(dat);
      PushNotification.localNotification(dat);
      AsyncStorage.setItem('pushNotify', '1');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          AsyncStorage.setItem('pushNotify', '1');
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
    // this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    //this.notificationListener();
    //this.notificationOpenedListener();
  }

  async checkPermission() {
    // console.log("props "+JSON.stringify(this.props))
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('received toeknnnnn==', fcmToken);
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
      console.log('permission rejected', error);
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        var seen = [];
        // console.log(
        //   'notification ==>>> ' +
        //     JSON.stringify(notification, function (key, val) {
        //       if (val != null && typeof val == 'object') {
        //         if (seen.indexOf(val) >= 0) {
        //           return;
        //         }
        //         seen.push(val);
        //       }
        //       return val;
        //     }),
        // );

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
          .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
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
