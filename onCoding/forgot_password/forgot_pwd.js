/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../forgot_password/styles';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,SafeAreaView,Keyboard,TouchableWithoutFeedback
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import CountryPicker from 'react-native-country-picker-modal';
import Toast from 'react-native-simple-toast';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Change_pwd from '../Change_pwd/Change_pwd';
import OTP_Verification from '../OTP/OTP_Verification';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { blockMargin,blockMarginHalf } from '../ui/common/responsive';

 export default class forgot_pwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      mobile: '',
      country_code: '91',
      id: '',
      isHidden: false,

    };
  }

  async forgotPassword() {

    // this.props.navigation.navigate('ForgotPassword');
    const {mobile,id,country_code} = this.state;

    // if (country_code.length >= 1) {
      if (mobile.length >= 8) {
        this.setState({isHidden: true});

        axios
          .post(
            ApiName.forgotPassword,
            {
              country_code: country_code,
              mobile: mobile,
              id: id,
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
              // AsyncStorage.setItem('CountryCode', response.data.data.country_code);
              // AsyncStorage.setItem('MobileNumber', response.data.data.mobile);
              // AsyncStorage.setItem('Pwd_UserId', response.data.data);
              // // AsyncStorage.setItem('Code', response.data.data);
              // AsyncStorage.setItem('OtpState','1');
              // // this.props.navigation.navigate('OTP_Verification');
              // this.setState({isHidden: false});

              AsyncStorage.setItem('LoginId', response.data.data+'');
              AsyncStorage.setItem('UserMobileNo', mobile+'');
              AsyncStorage.setItem('OtpState', '1');
              AsyncStorage.setItem('CountryCode', country_code+'');
    
             
              this.setState({isHidden: false});
              this.props.navigation.navigate('Change_pwd',{UserId:  response.data.data+''});

      
// this.props.navigation.navigate('OTP_Verification',{
//               UserId:  response.data.id+'', MobileNumber: mobile+'', CountryCode: country_code+''
//           });
          Toast.show(response.data.message);
            }
            else if (response.data.status == 400) {
              if (
                response.data.errors.mobile != null &&
                response.data.errors.mobile.length > 0
              ) {
                Toast.show(response.data.errors.mobile[0]);
              }
            } else {
            }
            this.setState({isHidden: false});
          })
          .catch((error) => {
            Toast.show('There was some error. Please try again')
           
            this.setState({isHidden: false});
          });
      } else {
        Toast.show('Enter Mobile Number');
      }
    // } else {
    //   Toast.show('Enter Country Code');
    // }
  }


  render() {

    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <View style={styles.view}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(42)}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Image source={require('../../images/back_arrow.png')} resizeMode={'contain'} style={styles.back_arrow}/>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Text style={styles.pwd}>Forgot Password</Text>
              </TouchableWithoutFeedback>
          </ImageBackground>
          </TouchableWithoutFeedback>
{/* <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 0} // adjust the value here if you need more padding
  style = {{ flex: 1.5 }}
  behavior = "padding" >
<ScrollView style={styles.scrollview}> */}
  <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view1}> 
          <Text style={styles.text}>
             Enter your registered mobile number to reset the password.
          </Text>
          <Text style={styles.text2}>Phone Number</Text>
          <View
                  style={{flexDirection: 'row', flex: 1,justifyContent:'center',alignItems:'center'}}>
          <View style={styles.textBackground3}>
                    <TouchableOpacity
                      onPress={() => this.setState({visible: true})}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginStart: responsiveWidth(1),
                        
                      }}>
          <CountryPicker style={{marginTop: responsiveHeight(0)}}
                        // containerButtonStyle={{fontFamily: 'Prompt-Regular'}}
                        onChangeText={(value) => this.setState({country_code: value})} value={this.state.country_code}
                        withFilter
                        withCallingCode
                        withFlagButton="false"
                        countryCode={this.state.country_flag}
                        onClose={() => this.setState({visible: false})}
                        visible={this.state.visible}
                        theme={{
                          fontFamily: 'SFCompactDisplay-Regular',
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
                          marginLeft: responsiveWidth(5),
                          // alignSelf: 'center',
                          justifyContent:'center',alignSelf:'center',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: responsiveFontSize(2),
                          color: '#131313',
                        }}>
                        +{this.state.country_code}
                      </Text>
                      <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
                      </TouchableOpacity>
                      </View>
          <TextInput
                    style={styles.textBackground4}
                    keyboardType="numeric"
                    placeholder="Phone Number"
                    placeholderTextColor='#B6C0CB'
                    onChangeText={(value) => this.setState({mobile: value})}
                    value={this.state.mobile}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.view4} />
                   <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.forgotPassword()}>
            <Text style={styles.loginText}>Reset Password</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
             justifyContent:'center',
              marginTop: blockMargin * 2,
            marginBottom: blockMargin * 1.5
            }}>
            <Text style={styles.newuser}>New User?</Text>
            <Text style={styles.signup} onPress={() => this.props.navigation.navigate('CreateAccount')}>Signup</Text>
          </View>
        
        </View>
       </TouchableWithoutFeedback>
       {/* </ScrollView>
        </KeyboardAvoidingView> */}
        </KeyboardAwareScrollView>
        
        {Platform.OS == 'ios' && <View style={{height:blockMarginHalf,
    backgroundColor: '#FFFFFF',
    alignItems:'center'}}></View> } 

        
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
    </SafeAreaView>
    );
  }
}
