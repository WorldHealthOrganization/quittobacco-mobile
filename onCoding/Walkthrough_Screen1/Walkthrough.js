/* eslint-disable prettier/prettier */
import {AppRegistry,StyleSheet, View, Text, SafeAreaView,ActivityIndicator} from 'react-native';
import React, { Component } from 'react';
import Walkthrough_screen_2 from '../Walkthrough_Screen2/Walkthrough_screen_2';
import Walkthrough_screen_3 from '../Walkthrough_Screen3/Walkthrough_screen_3';
import Walkthrough_screen_1 from '../Walkthrough_Screen1/Walkthrough_screen_1';
import Walkthrough_screen_4 from '../Walkthrough_Screen1/Walkthrough_screen_4';
import Swiper from 'react-native-swiper';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';
import {  getUniqueId  } from 'react-native-device-info';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import messaging, { firebase }  from '@react-native-firebase/messaging';

import { blockMarginHalf,blockMargin } from '../ui/common/responsive';

export default class Walkthrough extends Component {
  constructor() {
    super();
    this.state = {
      unique_id:'',
      fcm_token: 'fcm_token',
      jwt_token:'',
      isHidden: false,
    };
  }

  componentDidMount() {
    this.fcmToken()
  }
   
  fcmToken = async () => {
    
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
          
            this.setState({
              fcm_token: fcmToken,
              unique_id: getUniqueId()
            });
            console.log('Received Token Success');
         
          } else {
            console.log('Received Token else');
          }
        });
    } else {
      console.log("No Permission for FCM Notification");
    }
  }
    
    getRegLogDevice = async(unique_id,fcm_token) => {

          this.setState({isHidden: true});
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
              console.log('Your Login unique Id - '+JSON.stringify(response))
              this.setState({isHidden: false});

              if (response.data.status == 200) {
                AsyncStorage.setItem('LoginStatus', 'true');
                AsyncStorage.setItem('QuestionarieStatus', response.data.data.questionarie_status + '');
                AsyncStorage.setItem('UserId',response.data.data.id + '');
               if(response.data.data.name != null && response.data.data.name != ''){
                  AsyncStorage.setItem('UserName', response.data.data.name);
                 }
              
                if(response.data.data.mobile != null && response.data.data.fcm_token != ''){
                  AsyncStorage.setItem('UserMobileNo',response.data.data.mobile);
                }
                
                if(response.data.data.fcm_token != null && response.data.data.fcm_token != ''){
                 AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
                }
                 // }else{
                //  AsyncStorage.setItem('UserFCM', fcm_token);
                // }
                AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);

                Toast.show(response.data.message);


                if (response.data.data.questionarie_status == 1){
                  this.props.navigation.navigate('UserHome');
                } else {
                  this.props.navigation.navigate('QuestionareStack');
                }
              
              } else if (response.data.status == 401) {

                Toast.show(response.data.message);
               
              }
              else {
                Toast.show(response.data.message);
             
              }
            })
            .catch((error) => {
              this.setState({isHidden: false});
              Toast.show('There was some error. Please try again')
             
            });
      
  }

  setSkipDone = async () => {
    try {
      AsyncStorage.setItem('Walkthrough', 'true');
      //Toast.show('Your unique Id - '+getUniqueId()+' - '+this.state.fcm_token)
      console.log('Your unique Id - '+getUniqueId()+' - '+this.state.fcm_token)
      this.getRegLogDevice(getUniqueId(),this.state.fcm_token)
    } catch (error) {
      Toast.show(error);
    }
  };



  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, backgroundColor: '#0072BB'}} >
      <Swiper style={styles.wrapper} dotColor='#60B6EE' activeDotColor='#FFFFFF' loop={false} showsButtons={false}>
      <View style={styles.slide1}>
        <Walkthrough_screen_1/>
        <Text style={styles.text} onPress={() => this.setSkipDone()}>SKIP</Text>
      </View>
      <View style={styles.slide2}>
      <Walkthrough_screen_2/>
      <Text style={styles.text}></Text>
       </View>
       <View style={styles.slide2}>
      <Walkthrough_screen_4/>
      <Text style={styles.text}></Text>
       </View>
      <View style={styles.slide3}>
      <Walkthrough_screen_3/>
      <Text style={styles.text} onPress={() => this.setSkipDone()}>DONE</Text>
      </View>
    </Swiper>
    </View>
   
   
{this.state.isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
              <ActivityIndicator
                size={50}
                color="#CBE2F1"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
              
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {marginTop: 0},
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
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: responsiveFontSize(2),
    textAlign: 'right',
    marginRight: responsiveWidth(12),
    marginTop: blockMargin,
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
