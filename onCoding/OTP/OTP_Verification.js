/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../OTP/styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Change_pwd from '../Change_pwd/Change_pwd';
import Questionare_Screen1 from '../Questionare_Screen1/Questionare_Screen1';

import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,TouchableWithoutFeedback,
  ActivityIndicator,SafeAreaView, SafeAreaViewBase,Keyboard,KeyboardAvoidingView
} from 'react-native';


export default class OTP_Verification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      otp: '',
      email_or_phone: '',
      country_code:'',
      otpState: '',
      isHidden: false,
    };
  }

  componentDidMount = () => {
    
    
    this.getData();
  };

  getData = async () => {
    try {
      const {navigation} = this.props;
      // const UserId = navigation.getParam('UserId', 'Id');
    //const MobileNo = navigation.getParam('MobileNumber', 'No');
    //const CountryCode = navigation.getParam('CountryCode', 'CC');
    //const Password = navigation.getParam('Password', 'Pwd');
    
    let LoginId = await AsyncStorage.getItem('LoginId');
   
    let MobileNo = await AsyncStorage.getItem('UserMobileNo');
    let CountryCode = await AsyncStorage.getItem('CountryCode');
    let Password = await AsyncStorage.getItem('Password');

    // const MobileNumber = navigation.getParam('MobileNumber', 'MobileNumber');
    
    this.setState({email_or_phone:MobileNo});
    this.setState({id:LoginId});
    this.setState({country_code:CountryCode});
    
    this.setState({password:Password});

      let otpState = await AsyncStorage.getItem('OtpState');
      this.setState({otpState: otpState});

    } catch (error) {
      console.log(error);
    }
  };

  async verifyOTP() {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    const {id, email_or_phone,otp,password,otpState} = this.state;
    if (otp.length == 4 && otp != '') {
      this.setState({isHidden: true});
if(otpState == 1) {
  axios
  .post(
    ApiName.verifyOtp,
    {
      id: id,
      otp:otp,
    },
    {
      headers: {
        'Authorization': jwt_token,
      },
    },
  )
  .then((response) => {
   
    this.setState({isHidden: false});

    if (response.data.status == 200) {
    
        Toast.show(response.data.message);
        this.props.navigation.navigate('Change_pwd',{UserId:  id+''});

        
  } else {
    Toast.show(response.data.message);
    
  }

  })
  .catch((error) => {
    Toast.show('There was some error. Please try again')
   
    this.setState({isHidden:false });

  });
} else {
    axios
      .post(
        ApiName.verifyOtp,
        {
          id: id,
          mobile: email_or_phone,
          otp:otp,
          password:password,
        },
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {
       
        this.setState({isHidden: false});

        if (response.data.status == 200) {
         
            // AsyncStorage.setItem('LoginStatus', 'true');
            this.setState({isHidden: false});
        
          AsyncStorage.setItem('LoginStatus', 'true');
          AsyncStorage.setItem('QuestionarieStatus', response.data.data.questionarie_status+'');
          AsyncStorage.setItem('UserId',response.data.data.id+'');
          AsyncStorage.setItem('UserName',response.data.data.name);
          AsyncStorage.setItem('UserMobileNo',response.data.data.mobile);
          AsyncStorage.setItem('UserEmailId', response.data.data.email);
          AsyncStorage.setItem('UserProfileImage', response.data.data.profile_image);
          AsyncStorage.setItem('UserFCM', response.data.data.fcm_token);
          //AsyncStorage.setItem('Login_JwtToken','Bearer ' + response.data.jwt_token);

          Toast.show('User Registered succesfully')

          if(response.data.data.questionarie_status == 1){
            this.props.navigation.navigate('UserHome')
          }else{
            this.props.navigation.navigate('QuestionareStack');
          }
         
        
        
      } else {
        Toast.show(response.data.message);
        
      }

        
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
       
        this.setState({isHidden:false });

      });}
  }
  else {
    Toast.show('Enter OTP Number');
  }
}



  async resendOTP() {
    const {id, email_or_phone} = this.state;
    this.setState({isHidden: true});
    axios
      .post(
        ApiName.resendOtp,
        {
          id: id,
          mobile: email_or_phone,
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
      }

      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
       
        this.setState({isHidden: false});

      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
        
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(38)}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../images/back_arrow.png')} resizeMode={'contain'} style={styles.back_arrow}/>
              </TouchableOpacity>
            <Text style={styles.OTP_text}>OTP Verification</Text>
          </ImageBackground>
          
        
          <View style={styles.view1}>
          <Text style={styles.text}>
          Enter the 4-digit code sent to you {'\n'}at <Text style= {styles.text_phnno}> (+ {this.state.country_code}) {this.state.email_or_phone}</Text>
          </Text>
          </View>
         
          
          <View style={styles.view2}>
          <OTPInputView
                  // eslint-disable-next-line react-native/no-inline-styles
                  // onChangeText={(value) => this.setState({otp: value})}
                  // value={this.state.otp}
                  onCodeFilled = {(value) => this.setState({otp: value})}
                  keyboardType="numeric"
                  style={ {width: '50%', height: 45}}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}/>
                    </View>
                    <View style={styles.view2}>
                    <TouchableOpacity
            style={[styles.buttonContainer, styles.confirmbutton]}
            onPress={() =>  this.verifyOTP()}>
            <Text style={styles.confirmtext}>Confirm</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignSelf:'center',
              justifyContent:'center',
              marginTop: responsiveHeight(1),
              marginBottom: responsiveHeight(3),
            }}>
            <Text style={styles.OTP_text1}>Didn't receive the OTP?</Text>
            <Text style={styles.OTP_Resend} onPress={() =>  this.resendOTP()} >Resend OTP</Text>
          </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
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
