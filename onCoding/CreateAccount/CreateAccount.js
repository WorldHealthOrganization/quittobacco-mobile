/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../CreateAccount/styles';
import {
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import CountryPicker from 'react-native-country-picker-modal';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import OTP_Verification from '../OTP/OTP_Verification';

// FCM Import
import firebase from 'react-native-firebase';

 export default class CreateAccount extends Component {
  constructor()
  {
    super();
    this.state = { hidePassword: true ,
    name: '',
    email: '',
    mobile: '',
    country_code: 91,
    password: '',
    fcm_token: '',
    jwt_token:'',
    isHidden: false,

  };
  }


  componentDidMount() {

    this.fcmToken();
  }


  fcmToken = async () => {
    
    console.log('SignUp');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log('SignUp Received Token ' + fcmToken);
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

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  async register() {
    const {
      name,
      email,
      mobile,
      password,
    } = this.state;

    if (name.trim() != '' && name.length >= 2) {
          if (mobile.trim() != '') {
            if (mobile.length == 10) {
            if (email.trim() != '') {
              if (this.validate(email)) {
              if (password.trim() != '') { 
                if (password.length >= 6) {
                this.setState({isHidden: true});
                this.goForAxios();
              }
            
            else {
              Toast.show('Password length should be 6 and above ');
            }
          }
                 else {
                Toast.show('Enter Password');
              }
            }
            else {
              Toast.show('Enter Valid Email Id');
            }
          }
          else {
              Toast.show('Enter Email');
            }
          }
         else {
          Toast.show('Enter Valid Mobile Number');
        }
      } else {
            Toast.show('Enter Mobile Number');
          }
    } else {
      Toast.show('Enter Name');
    }
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({email: text});
      return false;
    } else {
      this.setState({email: text});
      return true;
    }
  }

  onTextChanged1(e) {
    if (/^\d+$/.test(e.toString()) || e === '') { 
      this.setState({ mobile: e });
    }
  }

  async goForAxios () {
    const {
      name,
      email,
      mobile,
      password,
      fcm_token,
      jwt_token,
      country_code,
    } = this.state;
    // console.log('error ==> ' + name);
    //console.log('last_name ==> '+JSON.stringify(filePath.data));
    this.setState({isHidden: true});

    axios
      .post(
        ApiName.register,
        {
          name:name,
          mobile: mobile,
          email: email,
          password: password,
          fcm_token: fcm_token,
          jwt_token: jwt_token,
          country_code: country_code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        this.setState({isHidden: false});
        if (response.data.status == 200) {
          Toast.show(response.data.message);
          

            AsyncStorage.setItem('LoginId', response.data.data.id+'');
            AsyncStorage.setItem('CountryCode', country_code+'');
            AsyncStorage.setItem('Password', password);

          AsyncStorage.setItem('UserEmailId', response.data.data.email);
          AsyncStorage.setItem('UserId', response.data.data.id+'');
          AsyncStorage.setItem('UserMobileNo', response.data.data.mobile);
          AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
          AsyncStorage.setItem('UserName', response.data.data.name);
          AsyncStorage.setItem('OtpState', '0');

          this.setState({isHidden: false});
          this.props.navigation.navigate('OTP_Verification',{
            UserId:  response.data.data.id, MobileNumber: mobile, CountryCode: country_code, Password: password });
          // this.props.navigation.navigate('Login');
        } 
        else if (response.data.status == 400) {
          if (
            response.data.errors.mobile != null &&
            response.data.errors.mobile.length > 0
          ) {
            Toast.show(response.data.errors.mobile[0]);
          } else if (
            response.data.errors.email != null &&
            response.data.errors.email.length > 0
          ) {
            Toast.show(response.data.errors.email[0]);
          }
        }
       else {
        }
        console.log(
          'reactNativeDemo',
          'response get details:' + JSON.stringify(response.data),
        );
      })
      .catch((error) => {
        console.log('reactNativeDemo axios error:', error);
        this.setState({isHidden: false});

      });
  }


  render() {
    return (
        <View style={styles.container}>
        <View style={styles.view}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{ width: responsiveWidth(100), height: responsiveHeight(35)}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Image source={require('../../images/back_arrow.png')} style={styles.back_arrow}/>
            </TouchableOpacity>
           <Text style={styles.create_text}>Create Account</Text>
          </ImageBackground>
          <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 0} // adjust the value here if you need more padding
  style = {{ flex: 1 }}
  behavior = "padding" >
    <ScrollView style={styles.scrollview}   keyboardShouldPersistTaps={'handled'}>
            <View style={styles.view1}>
        <TextInput style={styles.text}
            placeholder="Name"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            underlineColorAndroid="#B6C0CB"
            onChangeText={(value) => this.setState({name: value})} value={this.state.name}
            returnKeyType="next" onSubmitEditing={()=>this.input1.focus()}
          />
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
                        onChangeText={(value) => this.setState({mobile: value})} value={this.state.mobile}
                        withFilter
                        withCallingCode
                        withFlagButton="false"
                        countryCode={this.state.country_flag}
                        onClose={() => this.setState({visible: false})}
                        visible={this.state.visible}
                        theme={{
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(1.65),

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
                          marginLeft: responsiveWidth(0),
                          // alignSelf: 'center',
                          marginTop: responsiveHeight(0.75),
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(1.65),
                          color: '#202020',
                        }}>
                        +{this.state.country_code}
                      </Text>
                      <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
                      </TouchableOpacity>
                      </View>

          <TextInput
                    ref={(input)=>this.input1 = input}
                    style={styles.textBackground4}
                    keyboardType='number-pad'
                    placeholder="Mobile Number"
                    placeholderTextColor="#B6C0CB"
                    // onChangeText={(value) => this.setState({mobile: value})}
                    onChangeText = {(e)=> this.onTextChanged1(e)}
                    value={this.state.mobile}
                    underlineColorAndroid="transparent"
                    returnKeyType="next" onSubmitEditing={()=>this.email.focus()}
                      />
                </View>
                <View style={styles.view4} />

            <TextInput style={styles.text_email}
            ref={(input)=>this.email = input}
            placeholder="Email"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            underlineColorAndroid="#B6C0CB"
            onChangeText={(value) => this.setState({email: value})} value={this.state.email}
            returnKeyType="next" onSubmitEditing={()=>this.pwd.focus()}
          />
       <View style = { styles.textBoxBtnHolder }>
          <TextInput ref={(input)=>this.pwd = input} style={styles.text} placeholder="Password" placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword }  onChangeText={(value) => this.setState({password: value})} value={this.state.password}  returnKeyType="done" />
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        <View style={{flex:0.5, flexDirection:'column', backgroundColor: '#FFFFFF'}}>
                <View style={styles.view2}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.register()}
           >
            <Text style={styles.signuptext}>Sign Up</Text>
          </TouchableHighlight>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: responsiveHeight(2),
              justifyContent: 'center',
            }}>
            <Text style={styles.register_user}>Register User?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.login} >Login</Text></TouchableOpacity>
          </View>
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


