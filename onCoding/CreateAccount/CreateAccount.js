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
  ActivityIndicator, SafeAreaView,Keyboard,TouchableWithoutFeedback, TouchableOpacityBase
} from 'react-native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import dateFormat from 'date-fns/format';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';
import CountryPicker from 'react-native-country-picker-modal';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import OTP_Verification from '../OTP/OTP_Verification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// FCM Import
import messaging, { firebase }  from '@react-native-firebase/messaging';

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
    date_of_birth_api: '',
    date_of_birth: '',
    isDatePickerVisible: false,

  };
  }


  componentDidMount() {

    this.fcmToken();
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
            });
          } else {
            console.log('Received Token Reason');
          }
        });
    } else {
      console.log("No Permission for FCM Notification");
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
      password,date_of_birth,date_of_birth_api
    } = this.state;

    if (name.trim() != '' && name.length >= 2) {
          if (mobile.trim() != '') {
            if (mobile.length == 10) {
            if (email.trim() != '') {
              if (this.validate(email)) {
              if (password.trim() != '') { 
                if (password.length >= 6) {
                  if(date_of_birth != ''  && date_of_birth_api != null){
                    this.setState({isHidden: true});
                    this.goForAxios();
                  } else {
                    Toast.show('Select Date of birth');
                  }
              
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
      country_code,date_of_birth_api
    } = this.state;
  
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
          security_question: date_of_birth_api
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
          
          AsyncStorage.setItem('LoginStatus', 'true');
          
        
          AsyncStorage.setItem('QuestionarieStatus', response.data.data.questionarie_status+'');

            AsyncStorage.setItem('LoginId', response.data.data.id+'');
            AsyncStorage.setItem('CountryCode', country_code+'');
            AsyncStorage.setItem('Password', password);

          AsyncStorage.setItem('UserEmailId', response.data.data.email);
          AsyncStorage.setItem('UserId', response.data.data.id+'');
          AsyncStorage.setItem('UserMobileNo', response.data.data.mobile);
          AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
          AsyncStorage.setItem('UserName', response.data.data.name);
          AsyncStorage.setItem('OtpState', '0');
          AsyncStorage.setItem('security_question', response.data.data.security_question);
          
          AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);
          

         

            this.Update_Notifications({user_id:response.data.data.id+'',jwt_token:response.data.jwt_token,questionarie_status: response.data.data.questionarie_status+''})

          this.setState({isHidden: false});
        
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
      })
      .catch((error) => {
       
        Toast.show('There was some error. Please try again')
        this.setState({isHidden: false});

      });
  }



  
  Update_Notifications = async ({user_id,jwt_token,questionarie_status}) => {
   
    this.setState({isHidden: true});
  
    axios
      .post(
        ApiName.update_notifications,
        {
          diary_remainder:'1',
          diary_remainder_time:'18:30',
          mission_remainder:'1',
          mission_remainder_time:'08:00',
          badge:'1',
          general_alert:'1',
        },
        {
          headers: {
            Authorization: 'Bearer '+jwt_token,
          },
        },
      )
      .then((response) => {
       
        this.setState({isHidden: false});

        if (response.data.status == 200) {
        
          // Toast.show('User Registered successfully')

          if(questionarie_status == 1){
            this.props.navigation.navigate('UserHome')
          }else{
            this.props.navigation.navigate('QuestionareStack');
          }
         
          // this.props.navigation.navigate('OTP_Verification',{
          //   UserId:  response.data.data.id, MobileNumber: mobile, CountryCode: country_code, Password: password });
        
        } else {
         
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again')
       
      });
  };


showDatePicker = () => {
  this.setState({
    isDatePickerVisible: true,
  });
  Keyboard.dismiss()
};

hideDatePicker = () => {
  this.setState({
    isDatePickerVisible: false,
  });
};

handleDateConfirm = (date) => {
  let formatDate = dateFormat(date, 'dd MMM yyyy');
  let formatValidDate = dateFormat(date, 'yyyy-MM-dd');

  this.setState({date_of_birth: formatDate});
  this.setState({date_of_birth_api: formatValidDate});
  this.hideDatePicker();
};


  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
      
        <View style={styles.view}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{ width: responsiveWidth(100), height: responsiveHeight(42)}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../../images/back_arrow.png')} resizeMode={'contain'} style={styles.back_arrow}/>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <Text style={styles.create_text}>Create Account</Text></TouchableWithoutFeedback>
          </ImageBackground>
          </TouchableWithoutFeedback>
          {/* <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 0} // adjust the value here if you need more padding
  style = {{ flex: 1 }} >
    <ScrollView style={styles.scrollview}   keyboardShouldPersistTaps={'handled'}> */}

  <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.view1}>
        <TextInput style={styles.text}
            placeholder="Name"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({name: value})} value={this.state.name}
            returnKeyType="next" onSubmitEditing={()=>this.input1.focus()}
          />  
          <View style={styles.view3} />
            <View
                  style={{flexDirection: 'row', flex: 1}}>
          <View style={styles.textBackground3}>
                    <TouchableOpacity
                      onPress={() => this.setState({visible: true})}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      
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
                          fontFamily: 'SFCompactDisplay-Medium',
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
                          
                          // alignSelf: 'center',
                          marginTop: responsiveHeight(0.75),
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: 16,
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
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({email: value})} value={this.state.email}
            returnKeyType="next" onSubmitEditing={()=>this.pwd.focus()}
          />
            <View style={styles.view3} />
       <View style = { styles.textBoxBtnHolder }>
          <TextInput ref={(input)=>this.pwd = input} style={styles.text} placeholder="Password" autoCorrect={false} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword }  onChangeText={(value) => this.setState({password: value})} value={this.state.password}  returnKeyType="done" />
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={()=> this.showDatePicker()}>
                  <View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'center', marginTop:blockMargin * 1.5, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'90%',
      color: '#000',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 14}} >{this.state.date_of_birth != '' ? this.state.date_of_birth : 'Date of Birth'}</Text>
                <Image source={require('../../images/calendar_theme.png')}
                resizeMode={'contain'}
                style={{width:15,height:15, }}/>
                </View></TouchableOpacity>
                
                <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={this.handleDateConfirm}
                        onCancel={this.hideDatePicker}
                      />

<View style={styles.view3} />
<View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'center', marginTop: blockMarginHalf/2, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'98%',
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 10}} >{'Register your Date of birth for security question'}</Text>
      </View>
       
        <View style={styles.view2}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.register()}
           >
            <Text style={styles.signuptext}>Sign Up</Text>
          </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: blockMargin * 2,
              justifyContent: 'center',
              marginBottom: blockMargin * 2
            }}>
            <Text style={styles.register_user}>Register User?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.login} >Login</Text></TouchableOpacity>
          </View>
         
       
        </View>
        </TouchableWithoutFeedback>
        {/* </ScrollView>

        </KeyboardAvoidingView> */}
       </KeyboardAwareScrollView>
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


