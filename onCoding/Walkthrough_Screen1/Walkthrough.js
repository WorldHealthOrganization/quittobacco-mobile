/* eslint-disable prettier/prettier */
import {AppRegistry,StyleSheet, View, Text, Alert, ToastAndroid} from 'react-native';
import React, { Component } from 'react';
import Walkthrough_screen_2 from '../Walkthrough_Screen2/Walkthrough_screen_2';
import Walkthrough_screen_3 from '../Walkthrough_Screen3/Walkthrough_screen_3';
import Walkthrough_screen_1 from '../Walkthrough_Screen1/Walkthrough_screen_1';
import Swiper from 'react-native-swiper';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import forgot_pwd from '../forgot_password/forgot_pwd';
import Splash from '../splash/Splash';
import CreateAccount from '../CreateAccount/CreateAccount';
import OTP_Verification from '../OTP/OTP_Verification';
import Change_pwd from '../Change_pwd/Change_pwd';
import Questionare_Screen1 from '../Questionare_Screen1/Questionare_Screen1';
import Welcome from '../Welcome/Welcome';
import Questionare_Screen4 from '../Questionare_Screen4/Questionare_Screen4';
import Questionare_Screen5 from '../Questionare_Screen5/Questionare_Screen5';
import Questionare_Sample from '../Questionare_Screen4/Questionare_Sample';
import Disclaimer from '../Disclaimer/Disclaimer';
import Dashboard from '../Dashboard/Dashboard';
import Transparent_page from '../Transparent_page/Transparent_page';
import Navigation from '../Navigation/Navigation';
import Login from '../login/Login';
import Settings from '../Settings/Settings';
import About from '../About_this_App/About';
import Benefits from '../Benefits/Benefits';
import Notifications from '../Notifications/Notifications';
import Money_Saved from '../Money_Saved/Money_Saved';
import Wish_list from '../Wish_list/Wish_list';
import View_Wishlist from '../Wish_list/View_Wishlist';
import Diary from '../Diary/Diary';
import View_Diary from '../Diary/View_Diary';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
export default class Walkthrough extends Component {

  setSkipDone = async () => {
    try {
      AsyncStorage.setItem('Walkthrough', 'true');
      this.props.navigation.navigate('Login')
    } catch (error) {
      Toast.show(error);
    }
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#0072BB'}} >
      <Swiper style={styles.wrapper} dotColor='#60B6EE' activeDotColor='#FFFFFF' loop={false} showsButtons={false} nextButton={<Text>Hi</Text>}>
      <View style={styles.slide1}>
        <Walkthrough_screen_1/>
        <Text style={styles.text} onPress={() => this.setSkipDone()}>SKIP</Text>
      </View>
      <View style={styles.slide2}>
      <Walkthrough_screen_2/>
       </View>
      <View style={styles.slide3}>
      <Walkthrough_screen_3/>
      <Text style={styles.text} onPress={() => this.setSkipDone()}>DONE</Text>
      </View>
    </Swiper>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072BB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072BB',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072BB',
  },
  text: {
    backgroundColor:'#0072BB',
    width: '100%',
    color: '#60B6EE',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    textAlign: 'right',
    marginRight: responsiveWidth(12),
    marginBottom: responsiveWidth(7),
  },
});

// const RootStack = createStackNavigator({
//   ForgotPassword: forgot_pwd,
//   ScreenSplash: Splash,
//   Login: Login,
//   Walkthrough:Walkthrough,
//   Walkthrough_screen_1: Walkthrough_screen_1,
//   Walkthrough2: Walkthrough_screen_2,
//   Walkthrough3: Walkthrough_screen_3,
//   CreateAccount: CreateAccount,
//   OTP_Verification: OTP_Verification,
//   Change_pwd: Change_pwd,
//   Questionare_Screen1: Questionare_Screen1,
//   Welcome:Welcome,
//   Questionare_Screen4: Questionare_Screen4,
//   Questionare_Screen5: Questionare_Screen5,
//   Questionare_Sample: Questionare_Sample,
//   Disclaimer: Disclaimer,
//   Dashboard: Dashboard,
//   Transparent_page: Transparent_page,
//   Navigation: Navigation,
//   Settings: Settings,
//   About: About,
//   Benefits: Benefits,
//   Notifications: Notifications,
//   Money_Saved: Money_Saved,
//   Wish_list: Wish_list,
//   View_Wishlist: View_Wishlist,
//   Diary: Diary,
//   View_Diary: View_Diary,
// },
// {
//   initialRouteName: 'Walkthrough',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Loginstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
