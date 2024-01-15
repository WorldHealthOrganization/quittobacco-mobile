/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  BackHandler,
  SafeAreaView,
  ActivityIndicator,
  FlatList, ScrollView,
  ImageBackground, AppState, Linking,
} from 'react-native';

import styles from '../Dashboard/styles';
import Toast from 'react-native-simple-toast';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Menu, { MenuItem } from 'react-native-material-menu';

import {
  scalable,
  deviceWidth,
  deviceHeight,
  blockMarginHalf,
  blockMargin,

} from '../ui/common/responsive';

import CardView from 'react-native-cardview';

import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import dateFormat from 'date-fns/format';
import CountDown from 'react-native-countdown-component';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import messaging, { firebase } from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
// import { lessThan } from 'react-native-reanimated';
import NotificationSetting from 'react-native-open-notification';


import { getUniqueId } from 'react-native-device-info';

const getDateTime = (daaa) => {
  let ddd = daaa;
  return dateFormat(new Date(ddd * 1000), 'dd MMM yyyy');
}
let mInterval = null;

export default class Dashboard extends Component {
  constructor(props) {

    super(props);

    // this.unsubscribe = dynamicLinks().onLink((link) => {
    //   console.log('Received dynamic link:', link.url);
    // });
    this.state = {
      isHidden: true,
      //userInfo
      user_id: '',
      name: '',
      mobile_no: '',
      email_id: '',
      profile_image: '',
      fcm: '',
      token: '',
      //dayTimeLeft
      leftDays: '',
      updatedDate: '',
      leftDate: '',
      leftTime: 0.0,
      totalTime: 0,
      leftTimeSec: 0,
      //BenefitsOfQuitingTobacco
      BenefitsOfQuitingTobacco: [],
      //savedMoney
      moneySaved: '0',
      moneySpent: '0',
      //healthImprovementChart
      OxygenLevels: 0,
      Lungs: 0,
      CarbonMonoxideLevel: 0,
      //Your Progress
      notUsedDays: '0',
      lifeRegained: '0',
      cravingsResisted: '0',
      //CravingGraph
      cravingGraphData: [],
      //LeaderBoard
      leaderBoard: [],
      //ShareAPPLink
      uniqueShareAPPLink: 'https://tobacco.page.link/Sohr',
      //ShareSavedMoneyLink
      uniqueShareSavedMoneyLink: 'https://tobacco.page.link/Sohr',
      //ShareMyhealthImproveLink
      uniqueShareMyhealthImproveLink: 'https://tobacco.page.link/Sohr',
      //ShareMyProgressLink
      uniqueShareMyProgressLink: 'https://tobacco.page.link/Sohr',
      //ShareAchieveLink
      uniqueShareAchieveLink: 'https://tobacco.page.link/Sohr',
      motivationRequestByUser: '',
      motivationID: '',
      motivationDescByAdmin: '',
      motivationImg: '',
      achievements: [],
      achievement_badge: '',
      motivation_status: 0,
      appState: AppState.currentState,
      curTime: {
        d: '00',
        h: '00',
        m: '00',
        s: '00'
      },
      isTimerReached: false,
      per_day: '0',
      per_month: '0',
      per_year: '0'


    };
  }

  handleBackButton = async () => {
    Alert.alert(
      'Exit App',
      'Are you sure want to exit Quit Tobacco application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
    // } else {
    //   this.props.navigation.navigate('HomePage');
    //   return false;
    // }
  };

  componentWillUnmount() {
    // // Remove the event listener before removing the screen from the stack
    // AppState.removeEventListener('changes', this._handleAppStateChange);
    // this.focusListener.remove();
    // //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // clearTimeout(this.t);

  }

  componentDidMount = () => {
    //  NotificationSetting.open();
    // Linking.openSettings();

    // this.dimensionsSubscription = Dimensions.addEventListener('change', this.updateWindowDims);

    AppState.addEventListener('change', this._handleAppStateChange);
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {

      this.getUser()
      this.setState({ count: 0 });

    });

  }



  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active') {
      // console.log(
      //   'App State: ' +
      //   'App has come to the foreground!'
      // );
      // Alert(
      //   'App State: ' +
      //   'App has come to the foreground!'
      // );
      this.getUser();
      //this.setState({visible: false});
    }
    this.setState({ appState: nextAppState });
  };

  getUser = async () => {

    const user_id = await AsyncStorage.getItem('UserId');
    const name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    if (fcm == null || fcm == 'null' || fcm == '' || fcm == 'fcm_token') {
      this.fcmToken()
    }
    const token = await AsyncStorage.getItem('Login_JwtToken');
    const notifyStack = await AsyncStorage.getItem('pushNotify')
    console.log("token check", token)
    if (token !== '') {
      this.setState({
        user_id: user_id,
        name: name,
        mobile_no: mobile_no,
        email_id: email_id,
        profile_image: profile_image,
        fcm: fcm,
        token: token,
      });
      this.checkLink();

      if (notifyStack == '1') {
        this.props.navigation.navigate('Notifications')
      } else {
        this.getDashboard();
      }
    }
  };

  fcmToken = async () => {

    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {

            this.setUpdateFCM(getUniqueId(), fcmToken)
            console.log('Received Token Success ' + fcmToken);

          } else {
            console.log('Received Token else');
          }
        });
    } else {
      console.log("No Permission for FCM Notification");
    }
  }


  setUpdateFCM = async (unique_id, fcm_token) => {

    this.setState({ isHidden: true });
    axios
      .post(
        ApiName.login,
        {
          email_or_phone: unique_id,
          password: '',
          fcm_token: fcm_token,
          jwt_token: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('Your Login unique Id - ' + JSON.stringify(response))
        this.setState({ isHidden: false });

        if (response.data.status == 200) {

          if (response.data.data.fcm_token != null && response.data.data.fcm_token != '') {
            AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
          }
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again')

      });

  }

  // componentDidMount() {
  //   // Add a listener to handle incoming dynamic links
  //   this.unsubscribe = dynamicLinks().onLink((link) => {
  //     // Handle the dynamic link here
  //     console.log('Received dynamic link:', link.url);
  //   });
  // }

  // componentDidMount() {
  //   this.unsubscribe = dynamicLinks().onLink(async link => {
  //     if (link) {
  //       if (link.url) {
  //         // Handle the dynamic link URL when the app is installed
  //         this.setState({ dynamicLink: link.url });
  //       } else if (link.fallbackUrl) {
  //         // Handle the fallback URL when the app is not installed
  //         this.setState({ dynamicLink: link.fallbackUrl });
  //       }
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   // Don't forget to unsubscribe when the component is unmounted
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  // handleDynamicLinkPress = async ({type}) => {

  //   try {
  //     // Create a dynamic link
  //     const link = await firebase.dynamicLinks().buildLink({
  //       link: 'https://www.whotobacco.com',
  //       domainUriPrefix: 'https://tobacco.page.link',
  //     });

  //     // Share the dynamic link
  //     console.log('Dynamic link:', link);
  //   } catch (error) {
  //     console.error('Error creating dynamic link:', error);
  //   }
  // };



  checkLink = async () => {
    console.log('check link ', url);
    let url = await firebase.links().getInitialLink();
    console.log('check link ', url);
    if (url) {
      console.log('ID');
    }
  };

  getParameterFromUrl(url, parm) {
    var re = new RegExp('.*[?&]' + parm + '=([^&]+)(&|$)');
    var match = url.match(re);
    return match ? match[1] : '';
  }

  shareApp = async ({ type }) => {
    const {
      uniqueShareAPPLink,
      moneySaved,
      moneySpent,
      per_day,
      per_month,
      per_year,
      uniqueShareSavedMoneyLink,
      OxygenLevels,
      Lungs,
      CarbonMonoxideLevel,
      uniqueShareMyhealthImproveLink,
      notUsedDays,
      lifeRegained,
      cravingsResisted,
      uniqueShareMyProgressLink,
      uniqueShareAchieveLink,
      achievements,
      achievement_badge,
    } = this.state;
    console.log('share type check ', type)
    try {
      // Create a dynamic link
      // const link = await firebase.dynamicLinks().buildLink({
      const link = await dynamicLinks().buildLink({
        link: 'https://who.dci.in',
        domainUriPrefix: 'https://tobacco.page.link',
        android: {
          packageName: 'com.who.quit.tobacco',
        },
      });


      // Share the dynamic link
      console.log('Dynamic link:', link);
    } catch (error) {
      console.error('Error creating dynamic link:', error);
    }
    if (type == 0) {
      Share.share(
        {
          subject: 'Quit Tobacco App Link',
          message: 'Click to download the app \n' + uniqueShareAPPLink,
          title: 'Quit Tobacco App Link',
        },
        {
          dialogTitle: 'Quit Tobacco App Link', // Android
          subject: 'Quit Tobacco App Link', // iOS
        },
      ).then(
        (success) => console.log("success"),
        (reason) => console.log("DeepLink Reason"),

      );
    } else if (type == 1) {
      Share.share(
        {
          subject: 'Quit Tobacco Saved Money Link',
          message:
            ' Money spend/Day ' +
            per_day +
            ' Money spend/Month ' +
            per_month +
            ' Money spend/year ' +
            per_year +
            ' Click to download the app \n' +
            uniqueShareSavedMoneyLink,
          title: 'Quit Tobacco Saved Money Link',
        },
        {
          dialogTitle: 'Quit Tobacco Saved Money Link', // Android
          subject: 'Quit Tobacco Saved Money Link', // iOS
        },
      ).then(
        (success) => console.log("success"),
        (reason) => console.log("DeepLink Reason"),

      );
    } else if (type == 2) {
      Share.share(
        {
          subject: 'Quit Tobacco My Health Improvement Link',
          message:
            'My Health Improvements without using tobacco :- \n Lungs capacity increases by 30% after a few weeks without tobacco usage!' +

            '\n Click to download the app \n' +
            uniqueShareMyhealthImproveLink,
          title: 'Quit Tobacco My Health Improvement Link',
        },
        {
          dialogTitle: 'Quit Tobacco My Health Improvement Link', // Android
          subject: 'Quit Tobacco My Health Improvement Link', // iOS
        },
      ).then(
        (success) => console.log("success"),
        (reason) => console.log("DeepLink Reason"),

      );
    } else if (type == 3) {
      Share.share(
        {
          subject: 'Quit Tobacco My Progress Link',
          message:
            'My progress without using tobacco :- \n NotUsedTobacco - ' +
            notUsedDays +
            '\n Cravings Resisted ' +
            cravingsResisted +
            '\n Click to download the app \n' +
            uniqueShareMyProgressLink,
          title: 'Quit Tobacco My Progress Link',
        },
        {
          dialogTitle: 'Quit Tobacco My Progress Link', // Android
          subject: 'Quit Tobacco My Progress Link', // iOS
        },
      ).then(
        (success) => console.log("success"),
        (reason) => console.log("DeepLink Reason"),

      );
    } else if (type == 4) {
      Share.share(
        {
          subject: 'Quit Tobacco My Achievement Link',
          message: 'I have earned' + ' ' + achievement_badge + ' ' + 'badges \n' +
            'Try the app \n' + uniqueShareAchieveLink,
          title: 'Quit Tobacco My Achievement Link',
        },
        {
          dialogTitle: 'Quit Tobacco My Achievement  Link', // Android
          subject: 'Quit Tobacco My Achievement  Link', // iOS
        },
      ).then(
        (success) => console.log("success"),
        (reason) => console.log("DeepLink Reason"),
      );
    }
  };

  getDashboard = async () => {
    const { token } = this.state;

    if (mInterval != null) {
      clearInterval(mInterval)
      this.setState({
        curTime: {
          d: '00',
          h: '00',
          m: '00',
          s: '00'
        }
      })
    }

    this.setState({
      isHidden: true,
      leftTime: 0.0,
      totalTime: 0,
      leftTimeSec: 0,
    });

    axios
      .post(
        ApiName.dashboard,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false });
        if (response.data.status == 200) {
          console.log('dashboard' + JSON.stringify(response))
          this.setState({
            //dayTimeLeft
            updatedDate: response.data.data.time_smoke_free.updated_at,
            leftDays: response.data.data.time_smoke_free.days,
            leftDate: response.data.data.time_smoke_free.quit_timestamp,

            //BenefitsOfQuitingTobacco
            BenefitsOfQuitingTobacco:
              response.data.data.benefits_of_quiting_tobacco,
            //savedMoney
            moneySaved: response.data.data.money.total,
            moneySpent: response.data.data.money.per_year,
            per_day: response.data.data.money.per_day,
            per_month: response.data.data.money.per_month,
            per_year: response.data.data.money.per_year,
            //healthImprovementChart
            OxygenLevels:
              response.data.data.health_improvements.oxygen_level / 100,
            Lungs: response.data.data.health_improvements.lungs / 100,
            CarbonMonoxideLevel:
              response.data.data.health_improvements.carbon_monoxide_level /
              100,
            //progress
            notUsedDays: response.data.data.your_progress.not_used_days,
            lifeRegained: response.data.data.your_progress.life_regained,
            cravingsResisted:
              response.data.data.your_progress.cravings_resisted,
            //CravingGraph
            //cravingGraphData: response.data.data.cravings[0],
            //leaderBoard
            leaderBoard: response.data.data.leader_board,
            motivation_status: response.data.data.motivation_status,
            //achievements
            achievements: response.data.data.achievements.achievement,
            achievement_badge: response.data.data.achievements.achievement.length,

          });

          console.log('difffff ' + new Date().getTime() + '  --  ' + response.data.data.time_smoke_free.quit_timestamp)

          if (new Date().getTime() > (response.data.data.time_smoke_free.quit_timestamp)) {
            this.setState({ isTimerReached: true })
            let old = 0
            if (mInterval != null) {
              clearInterval(mInterval)
              this.setState({
                curTime: {
                  d: '00',
                  h: '00',
                  m: '00',
                  s: '00'
                }
              })
            }
            old = response.data.data.time_smoke_free.quit_timestamp
            console.log('difffff old ' + old)
            mInterval = setInterval(() => {
              this.setState({
                curTime: this.toHHMMSS(new Date().getTime() - old)
              })

              //console.log("Current log"+JSON.stringify(this.state.curTime))
            }, 1000)
          } else {
            if (mInterval != null) {
              clearInterval(mInterval)
              this.setState({
                curTime: {
                  d: '00',
                  h: '00',
                  m: '00',
                  s: '00'
                }
              })
            }

            this.onGettingTimeLeft({ leftDate: response.data.data.time_smoke_free.quit_timestamp, updatedDate: response.data.data.time_smoke_free.updated_at });

            this.setState({ isTimerReached: false })
          }

          console.log("isTimerReached" + this.state.isTimerReached)

          let obj = [];
          for (var i = 0; i < response.data.data.cravings[0].length; i++) {
            obj.push({
              x: getDateTime(response.data.data.cravings[0][i].date), y: response.data.data.cravings[0][i].y
            })
          }
          this.setState({
            cravingGraphData: obj,

          });

          //motivation
          this.setState({
            motivationDescByAdmin: response.data.data.admin_motivation,
            motivationRequestByUser: response.data.data.motivation.message,
            motivationImg: response.data.data.motivation.image
          })

        } else if (response.data.status == 401) {
          this.setState({ isHidden: false });

          AsyncStorage.clear();
          AsyncStorage.setItem('LoginStatus', 'false');
          AsyncStorage.setItem('Walkthrough', 'false');

          Toast.show("Token expired, Please Login again to continue");

          this.props.navigation.navigate('Splash');
        } else {
          this.setState({ isHidden: false });
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        console.log(error)
        Toast.show('There was some error. Please try again');

      });
  };

  onGettingTimeLeft = ({ leftDate, updatedDate }) => {

    var dateTime = new Date();
    let formatDate = dateFormat(dateTime, 'dd MMM yyyy hh:mm:ss a');

    var dt3 = new Date(updatedDate * 1000);
    let updatedFormatDate = dateFormat(dt3, 'dd MMM yyyy hh:mm:ss a');

    console.log('updatedFormatDate' + dt3 + '--' + updatedFormatDate);

    var dt2 = new Date(leftDate);
    console.log('updatedFormatDate ' + leftDate + 'gfhd' + dt2 + '--' + updatedFormatDate);
    let eventFormatDate = dateFormat(dt2, 'dd MMM yyyy hh:mm:ss a');
    console.log('updatedFormatDate gfhd' + dt2 + '--' + eventFormatDate);


    var diff = (dt2.getTime() - dateTime.getTime()) / 1000;

    var totalDiff = (dt2.getTime() - dt3.getTime()) / 1000;

    this.setState({
      leftTime: diff,
      totalTime: (diff / totalDiff) * 100,
      //leftTimeSec: Math.abs(Math.round(diff))
    });
    this.setState({ isTimerReached: false })
    console.log('eventFormatDate' + diff);
  };

  _menu = null;
  setMenuRef = (ref) => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.navigation.navigate('Settings');
  };

  getExtensionFormat = (filename) => {

    if (filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'jpeg') {
      return false
    }
    return true
  };


  option2Click = () => {
    this._menu.hide();
    this.props.navigation.navigate('AboutUs');
  };



  ListEmpty = () => {
    const { isHidden } = this.state
    if (!isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Text numberOfLines={2} style={{
              color: '#555555',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(14), alignItems: 'center'
            }}>No Achievements Yet</Text>
          </View>
        </View>
      );
    } else if (isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          </View>
        </View>
      );
    }
  };

  toHHMMSS = (d) => {

    let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
    let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
    let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
    let minutes = Math.floor(d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60);
    let seconds = Math.floor(d / 1000 - weekdays * 7 * 24 * 60 * 60 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);

    if (days < 10) {
      days = '0' + days;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    let obj = {
      "d": days,
      "h": hours,
      "m": minutes,
      "s": seconds
    };

    // console.log('old   =>  '+days+' '+hours+' '+minutes+' '+seconds)
    //return days+' '+hours+' '+minutes+' '+seconds;
    return obj
  }

  getCountUpTimer = () => {
    console.log('Finished')
    this.setState({ leftTime: 0, totalTime: 0 })
    if (new Date().getTime() >= (this.state.leftDate)) {
      console.log('Finished if')
      this.setState({ isTimerReached: true })
      let old = 0
      if (mInterval != null) {
        clearInterval(mInterval)
        this.setState({
          curTime: {
            d: '00',
            h: '00',
            m: '00',
            s: '00'
          }
        })
      }
      old = this.state.leftDate
      console.log('difffff old ' + old)
      mInterval = setInterval(() => {
        this.setState({
          curTime: this.toHHMMSS(new Date().getTime() - old)
        })

        // console.log("Current log"+JSON.stringify(this.state.curTime))
      }, 1000)
    }
  }

  render() {


    const {
      isHidden,
      leaderBoard,
      cravingGraphData,
      notUsedDays,
      lifeRegained,
      cravingsResisted,
      moneySaved,
      moneySpent,
      BenefitsOfQuitingTobacco,
      leftTime,
      leftTimeSec,
      totalTime,
      leftDate,
      leftDays,
      achievements,
      per_day, per_month, per_year
    } = this.state;

    return (

      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '12%',
              backgroundColor: '#0072BB',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: '83%',
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: responsiveFontSize(2.5),
                marginLeft: responsiveWidth(5),
                alignContent: 'center',
              }}>
              HOME
            </Text>

            {/* <View style={{alignSelf:'center'}}>
        <Text style={{alignSelf:'center'}}>Current state: {this.state.appState}</Text>
      </View> */}
            <Menu
              style={styles.menu}
              ref={this.setMenuRef}
              button={
                <TouchableOpacity style={{ width: responsiveWidth(10), height: responsiveHeight(3), justifyContent: 'center', alignItems: 'center' }} onPress={this.showMenu}>
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{
                        width: responsiveWidth(3),
                        height: responsiveHeight(2.5),

                        resizeMode: 'contain',
                      }}
                      source={require('../../images/more.png')}
                    />
                  </View>
                </TouchableOpacity>
              }>
              <MenuItem textStyle={{ fontFamily: 'SFCompactDisplay-Medium', color: 'black' }} onPress={this.option1Click}>Settings</MenuItem>
              <MenuItem textStyle={{ fontFamily: 'SFCompactDisplay-Medium', color: 'black' }} onPress={this.option2Click}>About this App</MenuItem>
            </Menu>
          </View>

          <ScrollView style={styles.scrollview} keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: blockMargin,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: responsiveHeight(1),
                    color: '#0072BB',
                    fontFamily: 'SFCompactDisplay-Semibold',
                    fontSize: scalable(18),
                  }}>
                  YOUR PROGRESS
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    width: 32,
                    height: 32,
                    justifyContent: 'flex-end',
                    right: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.shareApp({ type: 0 })}
                    style={{
                      position: 'absolute',
                      width: 30,
                      height: 30,
                      justifyContent: 'flex-end',
                    }}>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        width: 23,
                        height: 23,
                        justifyContent: 'flex-end',
                      }}
                      source={require('../../images/share.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{

                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Image
                  source={require('../../images/circles.png')}
                  style={{ width: '56%', height: 100, position: 'absolute' }}
                />

                <AnimatedCircularProgress
                  style={{ justifyContent: 'center', marginTop: 20 }}
                  size={180}
                  width={10}
                  fill={totalTime}
                  tintColor="#00e0ff"
                  backgroundColor="#1497FB"
                  backgroundWidth={4}
                  arcSweepAngle={300}
                  lineCap={'round'}

                  rotation={210}>
                  {(fill) =>
                    <View>
                      {leftTime > 0 ? (

                        <CountDown
                          until={leftTime}
                          //duration of countdown in seconds
                          timeToShow={['D', 'H', 'M', 'S']}
                          timeLabels={{
                            d: 'Days',
                            h: 'Hours',
                            m: 'Mins',
                            s: 'Secs',
                          }}
                          showSeparator={false}
                          timeLabelStyle={{
                            color: '#bdbdbd',
                            fontSize: 8,
                            marginTop: -5, fontFamily: 'SFCompactDisplay-Medium'
                          }}

                          //formate to show
                          onFinish={() => this.getCountUpTimer()}
                          //on Finish call
                          digitStyle={{ backgroundColor: '#FFF' }}
                          digitTxtStyle={{ color: '#000', fontFamily: 'SFCompactDisplay-Bold', fontWeight: '300' }}

                          //on Press call
                          size={12}
                        />

                      ) :

                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'column', marginStart: 10, marginEnd: 13 }}>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#000',
                                fontSize: 12,
                                fontFamily: 'SFCompactDisplay-Bold',
                              }}>
                              {this.state.curTime.d}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#bdbdbd',
                                fontSize: 8,
                                fontFamily: 'SFCompactDisplay-Medium',
                              }}>
                              Days
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'column', marginEnd: 13 }}>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#000',
                                fontSize: 12,
                                fontFamily: 'SFCompactDisplay-Bold',
                              }}>
                              {this.state.curTime.h}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#bdbdbd',
                                fontSize: 8,
                                fontFamily: 'SFCompactDisplay-Medium',
                              }}>
                              Hours
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'column', marginEnd: 13 }}>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#000',
                                fontSize: 12,
                                fontFamily: 'SFCompactDisplay-Bold',
                              }}>
                              {this.state.curTime.m}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#bdbdbd',
                                fontSize: 8,
                                fontFamily: 'SFCompactDisplay-Medium',
                              }}>
                              Mins
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'column', marginEnd: 10 }}>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#000',
                                fontSize: 12,
                                fontFamily: 'SFCompactDisplay-Bold',
                              }}>
                              {this.state.curTime.s}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{

                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#bdbdbd',
                                fontSize: 8,
                                fontFamily: 'SFCompactDisplay-Medium',
                              }}>
                              Secs
                            </Text>
                          </View>

                        </View>

                      }
                    </View>


                  }
                </AnimatedCircularProgress>

                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: -35,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#555555',
                    fontSize: 14,
                    fontFamily: 'SFCompactDisplay-Semibold',
                  }}>
                  {leftTime > 0 && leftDays != null && leftDays != 'null' && 'Goal'}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: 8,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#AAAAAA',
                    fontSize: 14,
                    fontFamily: 'SFCompactDisplay-Medium',
                  }}>
                  {leftTime > 0 && leftDays != null && leftDays != 'null'
                    ? leftDays == '1' || leftDays == '0'
                      ? leftDays + ' Day'
                      : leftDays + ' Days'
                    : notUsedDays + ' Days Without Tobacco'}
                </Text>

              </View>
              <Text style={{
                color: '#0072BB',
                fontSize: scalable(18),
                textAlign: 'center',
                fontFamily: 'SFCompactDisplay-Semibold',
                marginTop: responsiveHeight(2)
              }}>
                YOUR HEALTH IMPROVEMENTS
              </Text>


              <View
                style={{

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>

                <CardView
                  style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMargin,
                    width: '90%',
                  }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin / 2}>
                  <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Health_Improvements')}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: blockMarginHalf / 2,
                      }}>
                      <View
                        style={{
                          width: '75%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            marginBottom: blockMarginHalf,
                            marginLeft: blockMargin,
                            marginBottom: blockMarginHalf,
                            color: '#002D50',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: scalable(16),
                          }}>
                          1 DAY AFTER QUITING
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(14),
                            fontFamily: 'SFCompactDisplay-Regular',
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          - The carbon monoxide level in your blood returns to normal.
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '25%',
                          flexDirection: 'column', alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: 68,
                            height: 68,
                            borderRadius: 50,
                            backgroundColor: '#FFFFFF',
                            opacity: 100,
                            marginRight: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            marginTop: blockMarginHalf,
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../../images/sun.jpg')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 50,
                              resizeMode: 'contain',

                              justifyContent: 'center',

                              alignSelf: 'center',
                              borderRadius: 0,
                            }}
                          />
                        </View>
                      </View>


                    </View>
                  </TouchableOpacity>
                </CardView>

              </View>

              <View style={{
                backgroundColor: '#FFFFFF',
                marginTop: blockMargin / 2,
                alignItems: 'center',
                marginBottom: blockMargin / 2
              }}>

                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#0072BB',
                    borderRadius: 30
                  }}
                  onPress={() => this.props.navigation.navigate('Benefits')}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontFamily: 'SFCompactDisplay-Medium',
                    fontSize: 14, marginTop: 12, marginBottom: 12, marginStart: 20, marginEnd: 20,
                    alignItems: 'center',
                  }}>EXPLORE MORE BENEFITS</Text>
                </TouchableOpacity>
              </View>


              <View
                style={{

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CardView
                  style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMargin,
                    width: '90%',
                  }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin / 2}>
                  <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Money_Saved')}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'column',
                        padding: blockMarginHalf,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',

                        }}>
                        <View
                          style={{
                            width: '75%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}>
                          <Text
                            numberOfLines={2}
                            style={{

                              marginLeft: blockMarginHalf,
                              marginBottom: blockMarginHalf,
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(16),
                            }}>
                            MONEY SAVED
                          </Text>
                          <Text
                            style={{
                              color: '#202020',
                              fontSize: scalable(13),
                              fontFamily: 'SFCompactDisplay-Regular',
                              marginLeft: blockMarginHalf,
                              marginBottom: blockMarginHalf / 2,
                            }}>
                            Find out how much money you spend on tobacco products. Think
                            about what else you could do with that money!
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '25%',
                            flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 68,
                              height: 68,
                              borderRadius: 13,
                              backgroundColor: '#FFFFFF',
                              opacity: 100,
                              marginRight: blockMarginHalf,
                              marginBottom: blockMarginHalf,
                              marginTop: blockMarginHalf,
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../../images/money.png')}
                              resizeMode="contain"
                              style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',

                                justifyContent: 'center',

                                alignSelf: 'center',
                                borderRadius: 0,
                              }}
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row', marginTop: blockMarginHalf
                        }}>
                        <View
                          style={{
                            width: '32%',
                            flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{

                              width: '100%', textAlign: 'center',
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"DAILY"}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{

                              width: '100%', textAlign: 'center',
                              marginBottom: blockMarginHalf,
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"SAVINGS"}
                          </Text>
                          <Text
                            style={{
                              width: '100%', textAlign: 'center',

                              marginBottom: blockMarginHalf,
                              color: '#202020',
                              fontFamily: 'SFCompactDisplay-Regular',
                              fontSize: scalable(14),
                            }}>
                            {per_day}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '2%'
                          }} />

                        <View
                          style={{
                            width: '32%',
                            flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{

                              width: '100%', textAlign: 'center',
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"MONTHLY"}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{

                              width: '100%', textAlign: 'center',
                              marginBottom: blockMarginHalf,
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"SAVINGS"}
                          </Text>
                          <Text
                            style={{
                              width: '100%', textAlign: 'center',
                              marginBottom: blockMarginHalf,
                              color: '#202020',
                              fontFamily: 'SFCompactDisplay-Regular',
                              fontSize: scalable(14),
                            }}>
                            {per_month}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '2%'
                          }} />

                        <View
                          style={{
                            width: '32%',
                            flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{


                              width: '100%', textAlign: 'center',
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"YEARLY"}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{

                              width: '100%', textAlign: 'center',
                              marginBottom: blockMarginHalf,
                              color: '#004072',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(14),
                            }}>
                            {"SAVINGS"}
                          </Text>
                          <Text
                            style={{
                              width: '100%', textAlign: 'center',
                              marginBottom: blockMarginHalf,
                              color: '#202020',
                              fontFamily: 'SFCompactDisplay-Regular',
                              fontSize: scalable(14),
                            }}>
                            {per_year}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardView>


              </View>

              <View
                style={{

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CardView
                  style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMargin,
                    width: '90%',
                  }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin / 2}>
                  <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Plans')}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: blockMarginHalf,
                      }}>
                      <View
                        style={{
                          width: '25%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 15,
                            backgroundColor: '#FFFFFF',
                            opacity: 100,
                            marginRight: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            marginTop: blockMarginHalf,
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../../images/report.png')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 45,
                              resizeMode: 'contain',

                              justifyContent: 'center',

                              alignSelf: 'center',
                              borderRadius: 0,
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: '75%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            marginBottom: blockMarginHalf,
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            color: '#004072',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: scalable(16),
                          }}>
                          PERSONAL QUIT PLAN
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(14),
                            fontFamily: 'SFCompactDisplay-Regular',
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          We have created a plan as per your set QUIT date. You
                          can go ahead with the plan or set own plan.
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardView>

                <CardView
                  style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMargin,
                    width: '90%',
                  }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin / 2}>
                  <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('List_Motivation')}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: blockMarginHalf,
                      }}>
                      <View
                        style={{
                          width: '75%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            marginBottom: blockMarginHalf,
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            color: '#004072',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: scalable(16),
                          }}>
                          MOTIVATION
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(14),
                            fontFamily: 'SFCompactDisplay-Regular',
                            marginLeft: blockMarginHalf,
                            marginRight: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          Write down your personal motivators. Let them guide you on this journey!
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '25%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 15,
                            backgroundColor: '#FFFFFF',
                            opacity: 100,
                            marginRight: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            marginTop: blockMarginHalf,
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../../images/empowerment.png')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 50,
                              resizeMode: 'contain',

                              justifyContent: 'center',

                              alignSelf: 'center',
                              borderRadius: 0,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardView>


                <CardView
                  style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMargin,
                    width: '90%',
                  }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin / 2}>
                  <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('List_Members')}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: blockMarginHalf,
                      }}>
                      <View
                        style={{
                          width: '25%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 15,
                            backgroundColor: '#FFFFFF',
                            opacity: 100,
                            marginRight: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            marginTop: blockMarginHalf,
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../../images/group.png')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 50,
                              resizeMode: 'contain',

                              justifyContent: 'center',

                              alignSelf: 'center',
                              borderRadius: 0,
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: '75%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            marginBottom: blockMarginHalf,
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            color: '#004072',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: scalable(16),
                          }}>
                          LINK SUPPORTERS
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(14),
                            fontFamily: 'SFCompactDisplay-Regular',
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          Invite your friends, family and supporters to help you on your journey.
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardView>


              </View>

            </View>
          </ScrollView>

          {isHidden ? (
            <View
              style={{
                width: '100%',
                height: '100%',

                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center', backgroundColor: 'transparent'
              }}>
              <ActivityIndicator
                size={40}
                color="#0072bb"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
        </View>

      </SafeAreaView>

    );
  }
}

