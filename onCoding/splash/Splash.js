	/* eslint-disable prettier/prettier */
  import React, {Component} from 'react';
  import {View, Text, Image, Platform,ImageBackground, BackHandler,ActivityIndicator, Alert} from 'react-native';
  import styles from './styles';
 
// Logo

  import Questionare from '../Questionare_Screen1/Questionare_Screen1';
  //import Login from '../login/Login';
  // import Walkthrough from '../Walkthrough_Screen1/Walkthrough';
  import AsyncStorage from '@react-native-async-storage/async-storage';;

  import SplashScreenInit from 'react-native-splash-screen';
  import JailMonkey from 'jail-monkey';
  import Toast from 'react-native-simple-toast';
  import {  getUniqueId  } from 'react-native-device-info';
  import axios from 'react-native-axios';
  import ApiName from '../utils/Constants';
  import messaging, { firebase }  from '@react-native-firebase/messaging';
  import RNExitApp from 'react-native-exit-app';

   export default class Splash extends Component {
    constructor() {
      super();
      this.state = {
        isVisible: true,
        timePassed: false,
        walkthrough: false,
        loginStatus: false,
        questionareStatus: '0',

        unique_id:'',
        fcm_token: 'fcm_token',
        jwt_token:'',
        isHidden: false,
      };
    }
   
    componentDidMount() {

      console.log(JailMonkey.isJailBroken()+' '+JailMonkey.trustFall())

      // if (JailMonkey.isJailBroken()) {
      
      //  Toast.show('Your Device is rooted')

      //  if (Platform.OS === 'ios') { 
      //   setTimeout(() => {
      //     RNExitApp.exitApp();      
      //   }, 1000);         
              
      //      }else {           
      //         BackHandler.exitApp();           
      //  }
        
      // }

      SplashScreenInit.hide();
      this.setData();
      setTimeout(() => {
        this.mainscreen();
      }, 1000);
    }
  
  
    setData = async () => {
      
      try {

        let loginStatus = await AsyncStorage.getItem('LoginStatus');
        let walkthrough = await AsyncStorage.getItem('Walkthrough');
        let questionareStatus = await AsyncStorage.getItem('QuestionarieStatus');
        // if (loginStatus == true) {
        this.setState({loginStatus: loginStatus,
          walkthrough: walkthrough,
          questionareStatus: questionareStatus});

          this.fcmToken();
        // } else {
        //   this.setState({ loginStatus: false })
        // }
      } catch (error) {
        console.log(error);
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

  
  
    mainscreen = async () => {
      if (this.state.walkthrough == 'true') {
        if (this.state.loginStatus == 'true') {
          if (this.state.questionareStatus == '1') {
           this.props.navigation.navigate('UserHome');
          } else {
          this.props.navigation.navigate('QuestionareStack');
          }
        
        } else {
           //Toast.show('Your unique Id - '+getUniqueId()+' - '+this.state.fcm_token)
          console.log('Your unique Id - '+getUniqueId()+' - '+this.state.fcm_token)
          this.getRegLogDevice(getUniqueId(),this.state.fcm_token)
        }
       
      } else {
        this.props.navigation.navigate('OnBoardStack');
      }
    };
  
  
  
    render() {
      
      return (
        <View style={styles.MainContainer}>
      
              <Image source={require('../../images/splash_new.jpg')} 
                resizeMode="contain"
              style={{flex: 1,width:'100%',height:'100%'}} />

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
              
        </View>
      );
    }
  }
  