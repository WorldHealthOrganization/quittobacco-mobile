/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
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
  FlatList,
  ImageBackground,
} from 'react-native';

import styles from '../Dashboard/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import Toast from 'react-native-simple-toast';
import PureChart from 'react-native-pure-chart';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import {
  scalable,
  deviceWidth,
  deviceHeight,
  itemRadius,
  itemRadiusHalf,
  blockMarginHalf,
  blockMargin,
  blockPadding,
  blockPaddingHalf,
} from '../ui/common/responsive';

//import CountdownCircle from 'react-native-countdown-circle';
//import CountdownCircleTimer from 'react-countdown-circle-timer';
import CircleTimer from 'react-native-circle-timer';
import CardView from 'react-native-cardview';
// import ActionButton from 'react-native-circular-action-menu';


import ActivityRings from 'react-native-activity-rings';
// import { LineChart, Grid } from 'react-native-svg-charts';
import OptionsMenu from 'react-native-options-menu';
//import { getDashboard } from '../api/actions/query'
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import dateFormat from 'date-fns/format';
import CountDown from 'react-native-countdown-component';
import CircularTimer from 'react-native-circular-timer';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import {th} from 'date-fns/locale';
import firebase from 'react-native-firebase';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   LineChart,
//   ProgressChart,
// } from 'react-native-chart-kit';

// const MoreIcon = require("../../assets/more/more.png");

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
//import Settings from '../Settings/Settings';
import About from '../About_this_App/About';
import Benefits from '../Benefits/Benefits';
import Money_Saved from '../Money_Saved/Money_Saved';
import Wish_list from '../Wish_list/Wish_list';
import Add_Motivation from '../Motivation/Add_Motivation';
import Health_Improvements from '../Health_Improvements/Health';
import View_Wishlist from '../Wish_list/View_Wishlist';
import Edit_Wishlist from '../Wish_list/Edit_Wishlist';
import Members from '../Members/index';
import List_Members from '../List_Members/index';
import Update_Members from '../Update_Members/index';

import Terms_And_Conditions from '../Terms_And_Conditions/index';
import References from '../References/index';
import Privacy_Policy from '../Privacy_Policy/index';
import Difficult_Situations from '../Difficult_Situations/index';
import Achievements from '../Achievements/index';
import Feedback from '../Feedback/index';
import Change_tobacco_data from '../Change_tobacco_data/index';
import Notifications from '../Notifications/Notifications';
import Tobacco_Diseases from '../Tobacco_Diseases/index';
import Questionare_Screen1 from '../Questionare_Screen1/Questionare_Screen1';

const activityConfig = {
  width: 140,
  height: 140,
  radius: 18,
  ringSize: 12,
};
const defaultConfig = {
  grid: {
    visible: false,
    backgroundColor: '#fff',
    strokeWidth: 1,
    strokeColor: '#ededed',
    stepSize: 15,
  },
  line: {
    visible: false,
    strokeWidth: 1,
    strokeColor: '#333',
  },
  area: {
    visible: true,
    gradientFrom: '#be2ddd',
    gradientFromOpacity: 1,
    gradientTo: '#e056fd',
    gradientToOpacity: 0.4,
  },
  yAxis: {
    visible: true,
    labelFontSize: 12,
    labelColor: '#777',
    labelFormatter: (v) => String(v),
  },
  xAxis: {
    visible: false,
    labelFontSize: 12,
    labelColor: '#777',
  },
  tooltip: {
    visible: false,
    labelFormatter: (v) => v.toFixed(2),
    lineColor: '#777',
    lineWidth: 1,
    circleColor: '#fff',
    circleBorderColor: '#fff',
    circleBorderWidth: 1,
    boxColor: '#fff',
    boxBorderWidth: 1,
    boxBorderColor: '#FFFFFF',
    boxBorderRadius: 5,
    boxPaddingY: 0,
    boxPaddingX: 0,
    labelColor: 'black',
    labelFontSize: 10,
  },
  dataPoint: {
    visible: false,
    color: '#777',
    radius: 5,
    label: {
      visible: false,
      labelFontSize: 12,
      labelColor: '#777',
      labelFormatter: (v) => String(v),
      marginBottom: 25,
    },
  },
  insetY: 0,
  insetX: 0,
  interpolation: 'none',
  backgroundColor: '#fff',
  backgroundOpacity: 1,
};

const ListHeader = () => {
  //View to set in Header
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#CBE2F1',
      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
          marginEnd: 20,
        }}>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            textAlign: 'left',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'NAME'}{' '}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '43%',
            textAlign: 'center',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'TOBACCO FREE DAYS'}{' '}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            textAlign: 'center',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'RANK'}{' '}
        </Text>
      </View>
    </View>
  );
};

const EmptyListMessage = ({item}) => {
  return (
    // Flat List Item
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginEnd: 20,
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '100%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 16,
        }}>
        {' '}
        {'No Data Found'}{' '}
      </Text>
    </View>
  );
};

const ItemView = ({item}) => {
  return (
    // Flat List
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginEnd: 20,
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '34%',
          textAlign: 'left',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.name}{' '}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '34%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.tabacco_free_days}{' '}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '32%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.rank}{' '}
      </Text>
    </View>
  );
};

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.9,
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    />
  );
};

export default class Dashboard extends Component {
  constructor(props) {
    console.disableYellowBox = true
    super(props);
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
      uniqueShareAPPLink: 'https://whotobaccoapp.page.link/6SuK',
      //ShareSavedMoneyLink
      uniqueShareSavedMoneyLink: 'https://whotobaccoapp.page.link/6SuK',
      //ShareMyhealthImproveLink
      uniqueShareMyhealthImproveLink: 'https://whotobaccoapp.page.link/6SuK',
      //ShareMyProgressLink
      uniqueShareMyProgressLink: 'https://whotobaccoapp.page.link/6SuK',
      //ShareAchieveLink
      uniqueShareAchieveLink: 'https://whotobaccoapp.page.link/6SuK',
      motivationRequest: '',
      motivationID: '',
      motivationDesc:'',
      motivationImg:'',
      achievements: [],
      achievement_badge:'',
      motivation_status: 0
    };
  }

  handleBackButton = async () => {
    Alert.alert(
      'Exit App',
      'Are you sure want to exit WHO application?',
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
    //   alert(userId);
    //   this.props.navigation.navigate('HomePage');
    //   return false;
    // }
  };

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    //AppState.removeEventListener('change', this._handleAppStateChange);
    this.focusListener.remove();
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearTimeout(this.t);

  }

  componentDidMount = () => {
    //AppState.addEventListener('change', this._handleAppStateChange);
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {

      this.getUser()
      this.setState({ count: 0 });
    });

  }

  getUser = async () => {
    const user_id = await AsyncStorage.getItem('UserId');
    const name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');

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
      this.getDashboard();
    }
  };

  checkLink = async () => {
    let url = await firebase.links().getInitialLink();
    console.log('incoming url', url);
    if (url) {
      //const ID = this.getParameterFromUrl(url, 'eventID');
      console.log('ID', url); //ID USER1234

      // if(ID != null && ID !='null' && ID != ''){
      //   this.onGetEventDetails({event_id:ID,type:1})

      // }
    }
  };

  getParameterFromUrl(url, parm) {
    var re = new RegExp('.*[?&]' + parm + '=([^&]+)(&|$)');
    var match = url.match(re);
    return match ? match[1] : '';
  }

  shareApp = async ({type}) => {
    const {
      uniqueShareAPPLink,
      moneySaved,
      moneySpent,
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

    if (type == 0) {
      Share.share(
        {
          subject: 'WHO App Link',
          message: 'Click to download the app \n' + uniqueShareAPPLink,
          title: 'WHO App Link',
        },
        {
          dialogTitle: 'WHO App Link', // Android
          subject: 'WHO App Link', // iOS
        },
      ).then(
        (success) => console.log(success),
        (reason) => console.log(reason),
      );
    } else if (type == 1) {
      Share.share(
        {
          subject: 'WHO Saved Money Link',
          message:
            'My Saved Money ' +
            moneySaved +
            ' Money spend/year ' +
            moneySpent +
            ' Click to download the app \n' +
            uniqueShareSavedMoneyLink,
          title: 'WHO Saved Money Link',
        },
        {
          dialogTitle: 'WHO Saved Money Link', // Android
          subject: 'WHO Saved Money Link', // iOS
        },
      ).then(
        (success) => console.log(success),
        (reason) => console.log(reason),
      );
    } else if (type == 2) {
      Share.share(
        {
          subject: 'WHO My Health Improvement Link',
          message:
            'My Health Improve without using tobacco :- \n OxygenLevels - ' +
            OxygenLevels +
            '\n Lungs - ' +
            Lungs +
            '\n CarbonMonoxideLevel - ' +
            CarbonMonoxideLevel +
            '\n Click to download the app \n' +
            uniqueShareMyhealthImproveLink,
          title: 'WHO My Health Improvement Link',
        },
        {
          dialogTitle: 'WHO My Health Improvement Link', // Android
          subject: 'WHO My Health Improvement Link', // iOS
        },
      ).then(
        (success) => console.log(success),
        (reason) => console.log(reason),
      );
    } else if (type == 3) {
      Share.share(
        {
          subject: 'WHO My Progress Link',
          message:
            'My progrss without using tobacco :- \n NotUsedTobacco - ' +
            notUsedDays +
            '\n Life Regained - ' +
            lifeRegained +
            '\n Cravings Resisted ' +
            cravingsResisted +
            '\n Click to download the app \n' +
            uniqueShareMyProgressLink,
          title: 'WHO My Progress Link',
        },
        {
          dialogTitle: 'WHO My Progress Link', // Android
          subject: 'WHO My Progress Link', // iOS
        },
      ).then(
        (success) => console.log(success),
        (reason) => console.log(reason),
      );
    } else if (type == 4) {
      Share.share(
        {
          subject: 'WHO My Achievement Link',
          message: 'I have earned' + ' ' + achievement_badge + ' ' + 'badges \n' +
          'Try the app \n' + uniqueShareAchieveLink,
          title: 'WHO My Achievement Link',
        },
        {
          dialogTitle: 'WHO My Achievement  Link', // Android
          subject: 'WHO My Achievement  Link', // iOS
        },
      ).then(
        (success) => console.log(success),
        (reason) => console.log(reason),
      );
    }
  };

  getDashboard = async () => {
    const {token} = this.state;
    this.setState({
      isHidden: true,
      leftTime: 0.0,
      totalTime: 0,
      leftTimeSec: 0,
    });
    console.log('Dasboard response token', token);
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
        console.log(
          'Dasboard response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

        if (response.data.status == 200) {
          // AsyncStorage.setItem('MoneySaved', response.data.data.money.saved);
          this.setState({isHidden: false});
          this.setState({
            //dayTimeLeft
            updatedDate: response.data.data.time_smoke_free.updated_at,
            leftDays: response.data.data.time_smoke_free.days,
            leftDate: response.data.data.time_smoke_free.date,
            //leftDate: '15-10-2020',
            //BenefitsOfQuitingTobacco
            BenefitsOfQuitingTobacco:
              response.data.data.benefits_of_quiting_tobacco,
            //savedMoney
            moneySaved: response.data.data.money.total,
            moneySpent: response.data.data.money.per_year,
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
            cravingGraphData: response.data.data.cravings[0],
            //leaderBoard
            leaderBoard: response.data.data.leader_board,
            motivation_status: response.data.data.motivation_status,
            //achievements
            achievements: response.data.data.achievements.achievement,
            achievement_badge: response.data.data.achievements.achievement.length,

          });
          //motivation
        
          if (response.data.data.motivation_status == 1) {
            this.setState({
              motivationRequest: response.data.data.motivation.request,
              motivationImg: response.data.data.motivation.file,
              motivationID: response.data.data.motivation.id,
            });
          }else{
            this.setState({
              motivationRequest: response.data.data.motivation.description,
              motivationID: 0,
            });
          }
          console.log('Dataaaaa');
          this.onGettingTimeLeft();
        } else {
          this.setState({isHidden: false});
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
        console.log('reactNativeDemo axios error:', error);
      });
  };

  onGettingTimeLeft = () => {
    console.log('FindingLeftTime');

    const {leftDate, updatedDate} = this.state;

    var dateTime = new Date();
    let formatDate = dateFormat(dateTime, 'dd MMM yyyy hh:mm:ss a');

    console.log(
      'Event DAtaeeee' + leftDate + ' ' + formatDate + ' ---' + updatedDate,
    );

    var dt3 = new Date(updatedDate);
    let updatedFormatDate = dateFormat(dt3, 'dd MMM yyyy hh:mm:ss a');
    console.log('Event DAtaeeee3');
    var dt2 = new Date(leftDate);
    let eventFormatDate = dateFormat(dt2, 'dd MMM yyyy hh:mm:ss a');
    console.log('Event DAtaeeee1');

    console.log(
      'FindingLeftTime' +
        '-' +
        eventFormatDate +
        '====' +
        formatDate +
        ' === ' +
        updatedFormatDate,
    );
    console.log(
      'diffffff' +
        '-' +
        dt2.getTime() +
        '----' +
        dt3.getTime() +
        '====' +
        dateTime.getTime(),
    );

    var diff = (dt2.getTime() - dateTime.getTime()) / 1000;

    var totalDiff = (dt2.getTime() - dt3.getTime()) / 1000;

    console.log(
      'FindingLeftTime diff' +
        dt2.getTime() +
        ' ' +
        dateTime.getTime() +
        '-----' +
        diff +
        '  -----  ' +
        totalDiff +
        ' --- ' +
        (diff / totalDiff) * 100,
    );

    console.log('LeftTime min' + diff / 60);
    console.log('LeftTime hr' + diff / (60 * 60));
    console.log(
      'LeftTime days' +
        (dt2.getTime() - dateTime.getTime()) / (1000 * 3600 * 24),
    );
    console.log('LeftTime round of' + Math.abs(Math.round(diff)));

    this.setState({
      leftTime: diff,
      totalTime: (diff / totalDiff) * 100,
      //leftTimeSec: Math.abs(Math.round(diff))
    });
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
              fontFamily: 'SF-Medium',
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
  render() {
    const activityData = [
      {
        value: this.state.Lungs,
        color: '#FFCB5C',
        label: 'Lungs',
        backgroundColor: '#DCDCDC',
      },
      {
        label: 'Carbon Monoxide level',
        value: this.state.CarbonMonoxideLevel,
        color: '#FF8517',
        backgroundColor: '#DCDCDC',
      },
      {
        label: 'Oxygen levels',
        value: this.state.OxygenLevels,
        color: '#0072BB',
        backgroundColor: '#DCDCDC',
      },
    ];

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
    } = this.state;
    // alert(JSON.stringify(cravingGraphData))
    return (
      
        <SafeAreaView style={styles.container}>
          <View style={styles.view}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '10%',
                backgroundColor: '#0072BB',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '86%',
                  color: '#FFFFFF',
                  fontFamily: 'SF-Medium',
                  fontSize: responsiveFontSize(2.5),
                  marginLeft: responsiveWidth(5),
                  alignContent: 'center',
                }}>
                Dashboard
              </Text>

              <Menu
                style={styles.menu}
                ref={this.setMenuRef}
                button={
                  <TouchableOpacity onPress={this.showMenu}>
                    <View style={{marginRight: responsiveWidth(5)}}>
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
                <MenuItem onPress={this.option1Click}>Settings</MenuItem>
                <MenuItem onPress={this.option2Click}>About this App</MenuItem>
              </Menu>
            </View>

          
            
              <ScrollView style={styles.scrollview}   keyboardShouldPersistTaps={'handled'}>
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
                      color: '#202020',
                      fontFamily: 'SF-Medium',
                      fontSize: responsiveFontSize(2),
                    }}>
                    Time Tobacco Free
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      width: 32,
                      height: 32,
                      justifyContent: 'flex-end',
                      end: 0,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.shareApp({type: 0})}
                      style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        justifyContent: 'flex-end',
                        end: 0,
                        marginRight: responsiveWidth(5),
                      }}>
                      <Image
                        style={{
                          resizeMode: 'contain',
                          width: 23,
                          height: 23,
                          justifyContent: 'flex-end',
                          end: 0,
                        }}
                        source={require('../../images/share.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Image
                    source={require('../../images/circles.png')}
                    style={{width: '56%', height: 100, position: 'absolute'}}
                  />

                  <AnimatedCircularProgress
                    style={{justifyContent: 'center', marginTop: 20}}
                    size={180}
                    width={10}
                    fill={totalTime}
                    tintColor="#00e0ff"
                    backgroundColor="#1497FB"
                    backgroundWidth={4}
                    arcSweepAngle={300}
                    lineCap={'round'}
                    // renderCap={({ center }) => (
                    //   <Circle
                    //     cx={center.x}
                    //     cy={center.y}
                    //     r="13"
                    //     fill={'#000'}
                    //   />
                    // )}
                    rotation={210}>
                    {(fill) =>
                      leftTime != 0.0 && (
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
                            marginTop: -5,
                          }}
                          //formate to show
                          // onFinish={() => Toast.show('Finished')}
                          //on Finish call
                          digitStyle={{backgroundColor: '#FFF'}}
                          digitTxtStyle={{color: '#000', fontSize: 14}}
                          //on Press call
                          size={12}
                        />
                      )
                    }
                  </AnimatedCircularProgress>

                  <Text
                    numberOfLines={2}
                    style={{
                      marginTop: -20,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: '#555555',
                      fontSize: 14,
                    }}>
                    Goal
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      marginTop: 2,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: '#AAAAAA',
                      fontSize: 14,
                    }}>
                    {leftDays != '' && leftDays != 'null' && leftDays != null
                      ? leftDays == '1'
                        ? leftDays + ' Day'
                        : leftDays + ' Days'
                      : '0 Days'}
                  </Text>
                </View>

                <Text style={styles.head_text}>
                  BENEFITS OF QUITTING TOBACCO
                </Text>
                <View style={{flex: 0.3}}>
                  <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={BenefitsOfQuitingTobacco}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {index % 2 == 0 ? (
                          <CardView
                            style={{
                              backgroundColor: '#CBE2F1',
                              marginTop: blockMargin,
                              marginBottom: blockMarginHalf / 2,
                              width: '90%',
                            }}
                            cardElevation={3}
                            cardMaxElevation={5}
                            cornerRadius={blockMargin}>
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
                                    color: '#0072BB',
                                    fontFamily: 'SF-Medium',
                                    fontSize: scalable(15),
                                  }}>
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontSize: scalable(13),
                                    fontFamily: 'SF-Regular',
                                    marginLeft: blockMarginHalf,
                                    marginBottom: blockMarginHalf / 2,
                                  }}>
                                  {'- ' + item.description}
                                </Text>
                              </View>
                              <View
                                style={{width: '25%', flexDirection: 'column'}}>
                                <View
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 100 / 2,
                                    backgroundColor: '#FFFFFF',
                                    opacity: 100,
                                    margin: blockMarginHalf,
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    source={
                                      item.image === '' || item.image === null
                                        ? require('../../images/heart.png')
                                        : {
                                            uri:
                                              'http://whoapp.dci.in/uploads/files/' +
                                              item.image,
                                            cache: 'force-cache',
                                          }
                                    }
                                    resizeMode="contain"
                                    defaultSource={require('../../images/heart.png')}
                                    style={{
                                      width: 40,
                                      height: 40,
                                      resizeMode: 'contain',

                                      justifyContent: 'center',

                                      alignSelf: 'center',
                                      borderRadius: 100 / 2,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </CardView>
                        ) : (
                          <CardView
                            style={{
                              backgroundColor: '#CBE2F1',
                              marginTop: blockMargin,
                              marginBottom: blockMarginHalf,
                              width: '90%',
                            }}
                            cardElevation={3}
                            cardMaxElevation={5}
                            cornerRadius={blockMargin}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                padding: blockMarginHalf,
                              }}>
                              <View
                                style={{width: '25%', flexDirection: 'column'}}>
                                <View
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 100 / 2,
                                    backgroundColor: '#FFFFFF',
                                    opacity: 100,
                                    margin: blockMarginHalf,
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    source={
                                      item.image === '' || item.image === null
                                        ? require('../../images/heart.png')
                                        : {
                                            uri:
                                              'http://whoapp.dci.in/uploads/files/' +
                                              item.image,
                                            cache: 'force-cache',
                                          }
                                    }
                                    resizeMode="contain"
                                    defaultSource={require('../../images/heart.png')}
                                    style={{
                                      width: 40,
                                      height: 40,
                                      resizeMode: 'contain',

                                      justifyContent: 'center',

                                      alignSelf: 'center',
                                      borderRadius: 100 / 2,
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
                                    color: '#0072BB',
                                    fontFamily: 'SF-Medium',
                                    fontSize: scalable(15),
                                  }}>
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontSize: scalable(13),
                                    fontFamily: 'SF-Regular',
                                    marginLeft: blockMarginHalf,
                                    marginBottom: blockMarginHalf / 2,
                                  }}>
                                  {'- ' + item.description}
                                </Text>
                              </View>
                            </View>
                          </CardView>
                        )}
                      </View>
                    )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() => this.props.navigation.navigate('Benefits')}>
                    <Text style={styles.submittext}>View More</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.2, alignItems: 'center'}}>
                  <CardView
                    style={styles.cardview1}
                    cardElevation={responsiveWidth(1)}
                    cardMaxElevation={responsiveWidth(2)}
                    cornerRadius={responsiveWidth(4)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '90%',
                        marginTop: blockMargin,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          width: '80%',
                          textAlign: 'left',
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2.3),
                        }}>
                        Saved Money
                      </Text>

                      <View
                        style={{
                          width: '20%',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => this.shareApp({type: 1})}
                          style={{
                            resizeMode: 'contain',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: 22,
                            height: 22,
                          }}>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              width: 18,
                              height: 18,
                              tintColor: '#fff',
                            }}
                            source={require('../../images/share.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: responsiveHeight(0),
                      }}>
                      <Text
                        style={{
                          marginTop: responsiveHeight(1),
                          width: '90%',
                          textAlign: 'left',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          alignSelf: 'center',
                          fontSize: responsiveFontSize(1.5),
                        }}>
                        Find out how much money you spend on tobacco. Think
                        about what else you could do with that money!
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '90%',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          marginTop: blockMargin,
                        }}>
                        <Text style={styles.card_text6}>Money Saved</Text>
                        <Text style={styles.card_text7}>Money Spend/year</Text>
                      </View>
                      
                                              <View style={{ flexDirection: 'row', width: '90%', marginTop: responsiveHeight(0), alignItems: 'center', justifyContent: 'center',marginTop: responsiveHeight(1),marginBottom: responsiveHeight(2)}}>
                        <Text numberOfLines={2} style={styles.card_text8}>
                          {moneySaved}
                        </Text>
                        <Text numberOfLines={2} style={styles.card_text9}>
                          {moneySpent}
                        </Text>
                      </View>
                    </View>
                  </CardView>
                </View>

                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() =>
                      this.props.navigation.navigate('Money_Saved')
                    }>
                    <Text style={styles.submittext}>Explore</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CardView
                    style={{
                      backgroundColor: '#CBE2F1',
                      marginTop: blockMargin,
                      marginBottom: blockMarginHalf / 2,
                      width: '90%',
                    }}
                    cardElevation={3}
                    cardMaxElevation={5}
                    cornerRadius={blockMargin}>
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
                            color: '#0072BB',
                            fontFamily: 'SF-Medium',
                            fontSize: scalable(15),
                          }}>
                          Your plan
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(13),
                            fontFamily: 'SF-Regular',
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          We have created a plan as per your set QUIT date. You
                          can go ahead with the plan or set own plan
                        </Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                  </CardView>
               
                  <CardView
                    style={{
                      backgroundColor: '#CBE2F1',
                      marginTop: blockMargin,
                      marginBottom: blockMarginHalf,
                      width: '90%',
                    }}
                    cardElevation={3}
                    cardMaxElevation={5}
                    cornerRadius={blockMargin}>
                      <TouchableOpacity
                    
                    onPress={() => this.props.navigation.navigate('View_Wishlist')}>
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
                            marginTop: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf,
                            color: '#0072BB',
                            fontFamily: 'SF-Medium',
                            fontSize: scalable(15),
                          }}>
                          Wishlist
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontSize: scalable(13),
                            fontFamily: 'SF-Regular',
                            marginLeft: blockMarginHalf,
                            marginBottom: blockMarginHalf / 2,
                          }}>
                          Create a wish list of some nice items which you can
                          buy for you or your family/friends with the savings by
                          not using tobacco
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
                            source={require('../../images/bike.png')}
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
                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() => this.props.navigation.navigate('View_Wishlist')}>
                    <Text style={styles.submittext}>Explore</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: responsiveHeight(2),
                    marginBottom: responsiveHeight(1.5),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0072BB',
                      fontFamily: 'SF-Medium',
                      fontSize: responsiveFontSize(2),
                      justifyContent: 'center',
                      margin: responsiveHeight(1),
                    }}>
                    YOUR HEALTH IMPROVEMENTS
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.shareApp({type: 2})}
                    style={{
                      position: 'absolute',
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      end: 0,
                      marginRight: responsiveWidth(5),
                    }}>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        justifyContent: 'flex-end',
                        end: 0,
                      }}
                      source={require('../../images/share.png')}
                    />
                  </TouchableOpacity>
                </View>
              
                <Text style={styles.text2}>Lung Capacity increases by 30% after a few weeks without tobacco usage! Breathe Deeply and take a walk</Text>
                <View style={{flex: 0.2, marginTop: responsiveHeight(2)}}>
                  <ActivityRings
                    data={activityData}
                    config={activityConfig}
                    legend={true}
                    theme={'light'}
                  />
                </View>
                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() =>
                      this.props.navigation.navigate('Health_Improvements')
                    }>
                    <Text style={styles.submittext}>Explore</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: responsiveHeight(2),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0072BB',
                      fontFamily: 'SF-Medium',
                      fontSize: responsiveFontSize(2),
                      justifyContent: 'center',
                      margin: responsiveHeight(1),
                    }}>
                    YOUR PROGRESS
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.shareApp({type: 3})}
                    style={{
                      position: 'absolute',
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      end: 0,
                      marginRight: responsiveWidth(5),
                    }}>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        justifyContent: 'flex-end',
                        end: 0,
                      }}
                      source={require('../../images/share.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: responsiveHeight(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CardView
                    style={styles.cardview}
                    cardElevation={responsiveWidth(1)}
                    cardMaxElevation={responsiveWidth(2)}
                    cornerRadius={responsiveWidth(4)}>
                    <View
                      style={{flex: 1, flexDirection: 'column', width: '100%'}}>
                      <Text numberOfLines={1} style={styles.card_text13}>
                        {notUsedDays}
                      </Text>
                      <Text numberOfLines={1} style={styles.card_text14}>
                        Tobacco not used{'\n'}(Day)
                      </Text>
                    </View>
                  </CardView>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: blockMarginHalf,
                  }}>
                  <View style={{width: '45%', marginLeft: responsiveWidth(1)}}>
                    <CardView
                      style={styles.cardview2}
                      cardElevation={responsiveWidth(1)}
                      cardMaxElevation={responsiveWidth(2)}
                      cornerRadius={responsiveWidth(4)}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          width: '100%',
                          marginTop: responsiveHeight(1),
                        }}>
                        <Text style={styles.card_text16}>Life Regained</Text>
                        <Text numberOfLines={2} style={styles.card_text15}>
                          {lifeRegained}
                        </Text>
                      </View>
                    </CardView>
                  </View>
                  <View style={{width: '45%', marginLeft: responsiveWidth(1)}}>
                    <CardView
                      style={styles.cardview2}
                      cardElevation={responsiveWidth(1)}
                      cardMaxElevation={responsiveWidth(2)}
                      cornerRadius={responsiveWidth(4)}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          width: '100%',
                          marginTop: responsiveHeight(1),
                        }}>
                        <Text style={styles.card_text16}>
                          Cravings Resisted
                        </Text>
                        <Text numberOfLines={2} style={styles.card_text15}>
                          {cravingsResisted}
                        </Text>
                      </View>
                    </CardView>
                  </View>
                </View>
                <View style={styles.motivation_view}>
                  <Text style={styles.text3}>MOTIVATION</Text>
                  <Text style={styles.text4}>
                    {this.state.motivationRequest != null &&
                    this.state.motivationRequest != ''
                      ? this.state.motivationRequest
                      : this.state.motivationDesc}
                  </Text>

                  <TouchableOpacity
                    style={{height: responsiveHeight(8),
                      width: responsiveWidth(16),
                      borderRadius: 100 / 2,
                      borderStyle: 'dotted',
                     marginTop: blockMargin,
                      marginBottom: blockMargin,
                      // right: responsiveWidth(5),
                      
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf:'center',
                      backgroundColor: '#0072BB',
                      borderWidth: 2,
                      borderColor: '#CBE2F1',
                      marginTop: 5,}}
                    onPress={() => {
                      // alert(this.state.motivationID);
                      if (this.state.motivation_status == 1) {
                        AsyncStorage.setItem('MotivationState', '1');
                        AsyncStorage.setItem(
                          'MotivationId',
                          this.state.motivationID + '',
                        );
                      } else {
                        AsyncStorage.setItem('MotivationState', '0');
                        AsyncStorage.setItem('MotivationId', '0');
                      }
                      this.props.navigation.navigate('Add_Motivation');
                    }}>
                    <Text style={styles.text_fab}>+</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: blockMargin,
                      marginBottom: blockMargin,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#0072BB',
                        fontFamily: 'SF-Medium',
                        fontSize: responsiveFontSize(2),
                        justifyContent: 'center',
                        margin: blockMarginHalf,
                      }}>
                      CRAVINGS
                    </Text>
                  </View>
                  <Text style={styles.text2}>
                    You are moving towards your QUIT date. Identify people
                    around you who do not use tobacco. Talk to them when you
                    feel the urge for tobacco
                  </Text>
                </View>
               
                <View
                  style={{
                    flexDirection: 'row',
                   
                    width: '100%',
                    marginTop: blockMargin,
                  }}>
                    {this.state.cravingGraphData.length > 0 ? 
                    
                    <PureChart data={ this.state.cravingGraphData}
                 type='line'   
                color={'#0072bb'}
                numberOfYAxisGuideLine={5}
  height={200} 
  /> 

  : 

  <View style={{width:'100%',
  height : 200, alignSelf:'center',
  alignItems:'center',
  justifyContent:'center'}}><Text
  style={{
    
    color: '#222222',
    fontSize: 15,
    fontFamily: 'SF-Semibold',
    textAlign: 'center',
   
  
  }}>{isHidden ? '' : ' No Analysis Yet' }
 
          </Text></View>
}
              
                {/* <TouchableOpacity
                    style={styles.fab1}
                    onPress={() => Toast.show('Coming Soon')}>
                    <Text style={styles.text_fab1}>+</Text>
                  </TouchableOpacity> */}
                </View>
                
                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() => this.props.navigation.navigate('Cravings')}>
                    <Text style={styles.submittext}>Explore</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.motivation_view}>
                  <Text style={styles.text3}>LINK MEMBERS</Text>
                  <Text style={styles.text4}>
                    Why don't you add a friend/family member{'\n'}to track your
                    progress?
                  </Text>
                  <View style={styles.view3}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton1]}
                    onPress={() => this.props.navigation.navigate('List_Members')}>
                    <Text style={styles.submittext1}>Explore</Text>
                  </TouchableOpacity>
                </View>
               
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: blockMargin,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0072BB',
                      fontFamily: 'SF-Medium',
                      fontSize: responsiveFontSize(2),
                      justifyContent: 'center',
                      margin: blockMarginHalf,
                    }}>
                    ACHIEVEMENTS
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.shareApp({type: 4})}
                    style={{
                      position: 'absolute',
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      end: 0,
                      marginRight: responsiveWidth(5),
                    }}>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        justifyContent: 'flex-end',
                        end: 0,
                      }}
                      source={require('../../images/share.png')}
                    />
                  </TouchableOpacity>
                </View>

                {/* <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    marginTop: responsiveHeight(2),
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={styles.badge1}
                    source={{uri: 'http://whoapp.dci.in/uploads/files/goal.png'}}
                  />
                 
                </View> */}



          <View style={{justifyContent: 'center',alignItems:'center',marginTop:blockMarginHalf }}>

<FlatList
numColumns={2}
keyboardShouldPersistTaps={'handled'}
// 
data={this.state.achievements}
showsVerticalScrollIndicator={false}

renderItem={({ item, index }) => (

  <View style={{ flexDirection: 'column',marginLeft: blockMargin,marginTop: blockMargin}}>
 <Image style={{height:120,width: deviceWidth/3.5,alignSelf: 'center'}}
 resizeMode={'contain'} source={{uri:'http://whoapp.dci.in/uploads/files/' +item.image} }/>             

</View>


)}
enableEmptySections={true}
ListEmptyComponent={this.ListEmpty}

keyExtractor={(item, index) => index.toString()}
/>


    </View>

     

                <View style={styles.view2}>
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitbutton]}
                    onPress={() =>this.props.navigation.navigate('Achievements')}>
                    <Text style={styles.submittext}>Explore</Text>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    backgroundColor: '#0072BB',
                    marginTop: responsiveHeight(2),
                    width: '100%',
                    paddingBottom: 10,
                  }}>
                  <Text style={styles.text3}>LEADERBOARD</Text>

                  <View
                    style={{
                      width: '100%',
                      marginTop: responsiveHeight(2),
                      alignSelf: 'center',
                    }}>
                    <FlatList
                      data={leaderBoard}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={ItemSeparatorView}
                      //Header to show above listview
                      ListHeaderComponent={ListHeader}
                      //Footer to show below listview
                      renderItem={ItemView}
                      ListEmptyComponent={EmptyListMessage}
                    />
                  </View>
                </View>
                <View style={{flex: 1, marginTop: blockMargin}} /> */}
                </View>
              </ScrollView>
            
            {isHidden ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',

                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',backgroundColor:'transparent'
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

// const RootStack = createStackNavigator(
//   {
//     Dashboard: Dashboard,
//     Settings: Settings,
//     About: About,
//     Money_Saved: Money_Saved,
//     Wish_list: Wish_list,
//     Benefits: Benefits,
//     Add_Motivation: Add_Motivation,
//     Health_Improvements: Health_Improvements,
//     View_Wishlist: View_Wishlist,
//     Edit_Wishlist: Edit_Wishlist,
//     Members: Members,
//     List_Members: List_Members,
//     Update_Members: Update_Members,
//     Achievements: Achievements,
//     Feedback: Feedback,
//     Terms_And_Conditions: Terms_And_Conditions,
//     References: References,
//     Privacy_Policy: Privacy_Policy,
//     Difficult_Situations: Difficult_Situations,
//     Change_tobacco_data: Change_tobacco_data,
//     Notifications: Notifications,
//     Tobacco_Diseases: Tobacco_Diseases,
//   },
//   {
//     initialRouteName: 'Dashboard',
//     headerMode: 'none',
//   },

//   {
//     headerMode: 'none',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Homestack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
