/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CardView from 'react-native-cardview';
import styles from '../Feedback/styles';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform, ActivityIndicator, Share,
  TouchableOpacity, Keyboard,TouchableWithoutFeedback
} from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';



import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

export default class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      //userInfo
      user_id: '',
      name: '',
      mobile_no: '',
      email_id: '',
      profile_image: '',
      fcm: '',
      token: '',

      email: '',
      message: '',
       messageValid: false,
       emailValid: false,
       emailEmpty: false,
       messageLength: false,

     

    };
  }





  componentDidMount = () => {
    //AppState.addEventListener('change', this._handleAppStateChange);
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {

      this.getUser();
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

        token: token,
      });

    }
  };

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

  inputValidation = async () =>  {
    const {
      email,
      message,
       messageValid,
       emailValid,
       emailEmpty,
       messageLength,
    } = this.state;

     if ( email.trim() == '' || message.trim() == '' ) {

      if (email.trim() != ''){
          if (this.validate(email)){
              this.setState({emailValid: false});
          }
          else {

            this.setState({ emailValid: true });
    
          }

      } else {

        this.setState({ emailEmpty: true })
        this.setState({ emailValid: false });

      }

      if(message.trim() != ''){
        if(message.length > 0 ){
          this.setState({messageValid: false})
          if(message.length >= 3 ){
            this.setState({messageLength: false})
          }else{
            this.setState({messageLength: true})
          }
        }else{
          this.setState({messageValid: true})
        }
      }else{
       
        this.setState({ messageValid: true })
      
      }

    } else {
       if (messageValid || emailEmpty || emailValid || messageLength){
        Toast.show('Please enter valid details');
      } else {
           this.feedback();               //API call
      }
    }
  }


  feedback = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
   
    const {email, message} = this.state;
    this.setState({isHidden: true});

    let inputapiname = ApiName.feedback;

    axios
      .post(
        inputapiname,
        {
          //formEvent,
          email: email,
          message: message,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({isHidden: false});

        if (response.data.status == 200) {
         
          Toast.show(response.data.message);
          this.props.navigation.goBack();
        } else {
        Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again')
       
      });
  };




  render() {
    const {isHidden,email,emailValid,message,messageValid,emailEmpty,messageLength} = this.state;
    return (
      <SafeAreaView style={{flex: 1,}}>
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF', 
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB', 
          }}>
            <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}>

              <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.props.navigation.goBack()}>

                <Image style={{
                  width: responsiveWidth(3),
                  height: responsiveHeight(4),
                  resizeMode: 'contain'
                }} source={require('../../images/back_arrow.png')} />

              </TouchableOpacity>

            </View>
            <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Feedback</Text>
            </View>           
          </View>
          <KeyboardAwareScrollView
          >
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={{flexDirection:'column'}}>
          <View>
                <Text style={styles.text}>Leave us your email and we will get {'\n'} in touch with you</Text>
            </View>

            <View style={styles.view1}>
        <TextInput style={styles.text2}
            placeholder="Email"
            placeholderTextColor="#B6C0CB"
            
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={(email) => {
              this.setState({email})
              if(email.trim() != ''){
                if (this.validate(email) ){
                  this.setState({emailValid: false});
                } else {
                  this.setState({emailValid: true});
                  this.setState({emailEmpty: false});
                }
              } else {
               
                this.setState({ emailEmpty: false });
                this.setState({ emailValid: true });

              }
            }} value={this.state.email}
            onSubmitEditing={()=>this.message.focus()}
          />

<View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />


{emailEmpty && <Text style={{color: 'red',textAlign: 'left',
    marginTop: blockMarginHalf,
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: scalable(12)}}>Please Enter the email</Text>}
   {emailValid && <Text style={{color: 'red',textAlign: 'left',
  marginTop: blockMarginHalf,
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(12)}}>Please Enter Valid email</Text>}

            <TextInput style={styles.text2}
            ref={(input)=>this.message = input}
            placeholder="Message"
            placeholderTextColor="#B6C0CB"
            
            returnKeyType="done"
            multiline={true}
            underlineColorAndroid="transparent"
            onChangeText={(message) =>
              {  this.setState({message})
              if(message.trim() != ''){
                if(message.length > 0 ){
                  this.setState({messageValid: false})
                  if(message.length >= 6 ){
                    this.setState({messageLength: false})
                  }else{
                    this.setState({messageLength: true})
                  }
                }else{
                  this.setState({messageValid: true})
                }
              }else{
               
                this.setState({ messageValid: true })
                this.setState({messageLength: false})
              
              }
               }} value={this.state.message}
          />

          <View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />

          {messageValid && <Text style={{color: 'red',textAlign: 'left',
    marginTop: blockMarginHalf,
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(12),}}>Please Enter the Message</Text>}
   {messageLength && <Text style={{color: 'red',textAlign: 'left',
    marginTop: blockMarginHalf,
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(12),}}>Please Enter atleast 6 characters</Text>}
           
        </View>
       
      
        <View>
        <TouchableOpacity
            
            onPress={() => this.inputValidation()}>
   <View style={{
              width: 230,
              height: 50,
              borderRadius: 30,
              backgroundColor: '#0072bb',
              opacity: 100,
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: blockMargin * 4, alignSelf: 'center',justifyContent: 'center',
            }}>
            <Text style={{ color: '#FFFFFF',
                           fontFamily: 'SFCompactDisplay-Medium',
                        fontSize: scalable(16),alignSelf: 'center'}}>Submit</Text>
            </View>
                      </TouchableOpacity>
        </View>

        </View>
          
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>    
          
          {isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center'
            }}>
              <ActivityIndicator
                size={40}
                color="#0072BB"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
        </View>




      </View>
</SafeAreaView>
    );
  
  }

}
