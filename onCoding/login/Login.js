/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from './styles';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { LoginManager, GraphRequest, AccessToken, GraphRequestManager } from 'react-native-fbsdk';
// FCM Import
import firebase from 'react-native-firebase';
import ImgToBase64 from 'react-native-image-base64';
import Sample from '../Sample';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CountryPicker from 'react-native-country-picker-modal';



//  const MESSAGE_SHOW = 'COMMON/MESSAGE_SHOW';
 const MESSAGE_HIDE = 'COMMON/MESSAGE_HIDE';

export default class Login extends Component {

  constructor()
  {
    super();
    this.state = {  hidePassword: true,
                    email_or_phone: '',
                    password: '',
                    fcm_token: '',
                    country_code: 91,
                    items:'',
                    name: '',
                    mobile_number:'',
                    // profile_pic: '',
                    email_id: '',
                    social_media_id: '',
                    type: 3,
                    jwt_token:'',
                    isHidden: false,
                   
                    };

  }

  componentDidMount() {

    this.fcmToken();

    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      androidClientId:'765623951630-k55s09rpbstbkk2j7h8dho544fnet453.apps.googleusercontent.com',
      //webClientId: '765623951630-eai1iuu5c3b90r8eimbukjov3b52tcms.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
      //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }

  fcmToken = async () => {
    
    console.log('Tooooken');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log('Received Token ' + fcmToken);
            this.setState({
              fcm_token: fcmToken,
            });
          } else {
            console.log('Received Token Error');
          }
        });
    } else {
      //alert("No Permission for FCM Notification");
    }
  }

  setUser = async () => {
    try {
      let emailid = await AsyncStorage.getItem('UserEmailId');
      let jwt_token = await AsyncStorage.getItem('JwtToken');
      let userid = await AsyncStorage.getItem('UserId');
      this.setState({User_Id: userid});
      this.setState({Email_Id: emailid});
      this.setState({jwt_token: jwt_token});
    } catch (error) {
      alert(error);
    }
  };

  fbSignIn = async () => {

    LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const accessToken = data.accessToken;
          const responseInfoCallback = (error, result) => {
            if (error) {
              console.log(error);
              console.log('Error fetching data=', error.toString());
            } else {
              console.log('FB Data Success fetching data=', JSON.stringify(result));
          //     let fbEmail = result.email;
          //     let fbmobile = result.mobile;
          //     if (fbEmail != null && fbEmail != '') {
          //       this.onSocialLogin({ first_name: result.first_name, last_name:result.last_name, profile_image: result.picture.data.url, socialid: result.id, email: result.email, mobile: ' ',  type:2 });
          //     } else {
          //       console.log('FB Data Success Email not here');
          //       this.setState({
          //         visible: true, first_name: result.first_name, last_name: result.last_name,
          //         socialid: result.id,
          //         socialProfileImg: result.picture.data.url,
          //       });

          //     }
          //   }
          // };
          let fbEmail = result.email;
          let fbMobile= result.mobile;
              if ((fbEmail != null && fbEmail != '') || (fbMobile != null && fbMobile != '')) {
          this.setState({isHidden: true});
                ImgToBase64.getBase64String(result.picture.data.url)
                  .then((base64String) =>
                    //console.log('base64String ====> ' + base64String),
                    // this.setState({
                    //   base64Image: 'data:image/jpeg;base64, ' + base64String,
                    // }),
                    this.onSocialLogin({
                      name : result.name,
                      // profile_image: 'data:image/jpeg;base64, ' + base64String,
                      socialid: result.id,
                      email: result.email,
                      mobile: result.mobile,
                      type: 2,
                    }),
                  )
                  .catch((err) => alert(err));
                  LoginManager.logOut();
                  }

                  else {
                          console.log('FB Data Success Email not here');
                          this.setState({
                            name: result.name, 
                            socialid: result.id,
                            // socialProfileImg: result.picture.data.url,
                          });
                        }
            }
          };

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name,picture.type(large)',
                },
              },
            },
            responseInfoCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    });
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      // this.setState({ info });
      console.log('Google Data' + JSON.stringify(info) + '--' + info.user.name);
console.log(JSON.stringify(info.user.name));

if (info.user.mobile != '' && info.user.mobile != null) {
  ImgToBase64.getBase64String(info.user.photo)
    .then((base64String) =>
      //console.log('base64String ====> ' + base64String),
      // this.setState({
      //   base64Image: 'data:image/jpeg;base64, ' + base64String,
      // }),
      this.onSocialLogin({
        name: info.user.name,
        // profile_image: 'data:image/jpeg;base64, ' + base64String,
        socialid: info.user.id,
        email: info.user.email,
        mobile: info.user.mobile,
        type: 2,
      }
      ),
    )
    .catch((err) => console.log(err));
} else {
  this.onSocialLogin({
    name: info.user.name,
    // profile_image: ' ',
    socialid: info.user.id,
    email: info.user.email,
    mobile: '',
    type: 2,
  }
  );
}
await GoogleSignin.revokeAccess();
await GoogleSignin.signOut();

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

   onSocialLogin= async ({ name, socialid, email, mobile, type }) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
     const {fcm_token,jwt_token} = this.state;
    console.log('login input ==> ' +  name + email + mobile + socialid + ' ' + type + jwt_token );
    this.setState({isHidden: true});
          axios
            .post(
              ApiName.registerSocialMedia,
              {
                name:name,
                social_media_id: socialid,
                email: email,
                mobile: mobile,
                type:type,
                fcm_token: fcm_token,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
              },
              },
            )
            .then((response) => {
              console.log(
                'login response ',
                'response get details:==> ' + JSON.stringify(response.data),
              );
              this.setState({isHidden: false});

              // alert(response.data.message);
              if (response.data.status == 200) {
                // AsyncStorage.setItem('LoginStatus', 'true');
                // AsyncStorage.setItem('Fb_Name', response.data.data.name);
                // AsyncStorage.setItem('Profile_Pic', response.data.data.profile_pic);
                // AsyncStorage.setItem('Fb_Email', response.data.data.email_id);
                // AsyncStorage.setItem('Fb_Mobile', response.data.data.mobile_number);
                // AsyncStorage.setItem('Id', response.data.data.id);
                // AsyncStorage.setItem('Social_Id', response.data.data.social_media_id);
                // AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);

                AsyncStorage.setItem('LoginStatus', 'true');
                AsyncStorage.setItem('QuestionarieStatus', response.data.data.questionarie_status + '');
                AsyncStorage.setItem('UserId',response.data.data.social_media_id);
                AsyncStorage.setItem('UserName',response.data.data.name);
                AsyncStorage.setItem('UserMobileNo',response.data.data.mobile);
                AsyncStorage.setItem('UserEmailId', response.data.data.email);
                AsyncStorage.setItem('UserProfileImage', response.data.data.profile_image);
                AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
                AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);

                Toast.show(response.data.message);

                if (response.data.data.questionarie_status == 1){
                  this.props.navigation.navigate('UserHome');
                } else {
                  this.props.navigation.navigate('QuestionareStack');
                }
              this.setState({isHidden: false});
                // Toast.show(response.data.message);
              }
              else {
                Toast.show(response.message);
                this.setState({isHidden: false});

              }
            })
            .catch((error) => {
              this.setState({isHidden: false});
              console.log('reactNativeDemo axios error:', error);
              this.setState({isHidden: false});

            });
  }


   messageHide() {
    return { type: MESSAGE_HIDE };
  }


  managePasswordVisibility = () =>{
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  async login() {

    const {email_or_phone, password, fcm_token, jwt_token} = this.state;
    console.log('login input ==> ' + email_or_phone + ' ' + password + '==' + fcm_token);
    if (email_or_phone.length >= 8 ) {
        if (password.length >= 6 ) {
          this.setState({isHidden: true});
          axios
            .post(
              ApiName.login,
              {
                email_or_phone: email_or_phone,
                password: password,
                fcm_token: fcm_token,
                jwt_token: jwt_token,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              console.log(
                'login response ',
                'response get details:==> ' + JSON.stringify(response.data)
              );

              Toast.show(response.data.message);
              this.setState({isHidden: false});

              if (response.data.status == 200) {
                AsyncStorage.setItem('LoginStatus', 'true');
                AsyncStorage.setItem('QuestionarieStatus', response.data.data.questionarie_status + '');
                AsyncStorage.setItem('UserId',response.data.data.id);
                AsyncStorage.setItem('UserName',response.data.data.name);
                AsyncStorage.setItem('UserMobileNo',response.data.data.mobile);
                AsyncStorage.setItem('UserEmailId', response.data.data.email);
                AsyncStorage.setItem('UserProfileImage', response.data.data.profile_image);
                AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
                AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);

                Toast.show(response.data.message);

                if (response.data.data.questionarie_status == 1){
                  this.props.navigation.navigate('UserHome');
                } else {
                  this.props.navigation.navigate('QuestionareStack');
                }
              this.setState({isHidden: false});

                // this.props.navigation.navigate('Navigation');
              } else if (response.data.status == 401) {
                AsyncStorage.setItem('MobileNumber', response.data.mobile);

                AsyncStorage.setItem('UserPassword', response.data.password);
                AsyncStorage.setItem(
                  'JwtToken',
                  'Bearer ' + response.data.jwt_token,
                );
                Toast.show(response.data.message);
                this.setState({isHidden: false});
              }
              else {
                Toast.show(response.data.message);
                this.setState({isHidden: false});
              }
            })
            .catch((error) => {
              this.setState({isHidden: false});
              console.log('reactNativeDemo axios error:', error);
            });
        } else {
          Toast.show('Enter Password');
        }
    } else {
      Toast.show('Enter Mobile Number');
    }
  }


  render() {
    return (
              <View style={styles.container}>
        <View style={styles.view}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(37), resizemode: 'contain'}}>
            <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
          </ImageBackground>

          <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 0} // adjust the value here if you need more padding
  style = {{ flex: 1.5 }}
  behavior = "padding" >
    <ScrollView style={styles.scrollview}
     keyboardShouldPersistTaps={'handled'}>
        <View style={styles.view1}>
          <Text style={styles.text}>Phone Number</Text>
          <View
                  style={{flexDirection: 'row', flex: 1}}>
          <View style={styles.textBackground3}>
                    <TouchableOpacity
                      onPress={() => this.setState({visible: true})}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginStart: responsiveWidth(1),
                        marginTop:responsiveHeight(1),
                      }}>
          <CountryPicker style={{marginTop: responsiveHeight(0)}}
                        onChangeText={(value) => this.setState({email_or_phone: value})} value={this.state.email_or_phone}
                        withFilter
                        withCallingCode
                        withFlagButton="false"
                        countryCode={this.state.country_flag}
                        onClose={() => this.setState({visible: false})}
                        visible={this.state.visible}
                        theme={{
                          fontFamily: 'SF Display',
                        }}
                        placeholder={''}
                        onSelect={(country) => {
                          if (this.props.country_code_handler) {
                            this.props.country_code_handler(
                              country.callingCode[0],
                            );
                          }
                          this.setState({
                            country_code: country.callingCode[0],
                            visible: false,
                            // country_flag: country.cca2,
                          });
                        }}
                      />
                       <Text
                        style={{
                          marginLeft: responsiveWidth(2),
                          // alignSelf: 'center',
                          marginTop: responsiveHeight(0),
                          // fontFamily: 'Lato-Regular',
                          fontSize: responsiveFontSize(2),
                          color: '#131313',
                        }}>
                        +{this.state.country_code}
                      </Text>
                      <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
                      </TouchableOpacity>
                      </View>

          <TextInput
                    ref={this.input1}
                    style={styles.textBackground4}
                    keyboardType="numeric"
                    placeholder="Mobile Number"
                    onChangeText={(value) => this.setState({email_or_phone: value})}
                    value={this.state.email_or_phone}
                    underlineColorAndroid="transparent"
                      />
                </View>
                <View style={styles.view4} />
          <View style = { styles.textBoxBtnHolder }>
          <TextInput ref={this.input2} placeholder="Password" onChangeText={(value) => this.setState({password: value})} value={this.state.password} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox }/>
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
        </KeyboardAvoidingView>

          <View style={{backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(3),
        alignItems:'center',
        height: '100%',flex:0.4}}>
          <Text style={styles.forgotpwd} onPress={() => this.props.navigation.navigate('forgot_pwd')}>Forgot Password?</Text>
          </View>
          <View><Text style={styles.login}>Login via</Text></View>


          <View style={styles.logo_view}>
          <TouchableOpacity onPress={() => this.fbSignIn()}>
            <Image source={require('../../images/facebook.png')} style={styles.fb_logo} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.signIn()}>
             <Image source={require('../../images/google+.png')} style={styles.gplus_logo} />
             </TouchableOpacity>
             { Platform.OS == 'ios' &&
             <TouchableOpacity onPress={() => alert('Apple Login')}>
            <Image source={require('../../images/apple.png')} style={styles.apple_logo} />
            </TouchableOpacity>}
          </View>
          <View style={styles.view2}>
          <TouchableHighlight onPress={() => this.login()}
            style={[styles.buttonContainer, styles.loginButton]}
           >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              marginLeft: responsiveWidth(34),
              marginTop: responsiveHeight(5),
            }}>
            <Text style={styles.newuser}>New User?</Text>
            <Text style={styles.signup} onPress={() => this.props.navigation.navigate('CreateAccount')}>Signup</Text>
          </View>
      </View>
      {this.state.isHidden ? (
            <View style={styles.box2}>
              <ActivityIndicator
                size={60}
                color="#0072BB"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
      </View>
    );
  }
}

// const RootStack = createStackNavigator({
//   Login: Login,
//   Questionare_Screen1: Questionare_Screen1,
//   ForgotPassword: forgot_pwd,
//   Navigation: Navigation,
//   CreateAccount: CreateAccount,
//   OTP_Verification: OTP_Verification,
//   Change_pwd: Change_pwd,
//   Sample: Sample,
// },
// {
//   initialRouteName: 'Login',
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
