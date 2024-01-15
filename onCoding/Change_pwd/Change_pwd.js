/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Change_pwd/styles';

import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,SafeAreaView,Keyboard,TouchableWithoutFeedback
} from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import dateFormat from 'date-fns/format';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class Change_pwd extends Component {
  constructor()
  {
    super();
    this.state = {   hidePassword: true,
                     hidePassword1: true,
                     new_password: '',
                     new_password_confirmation: '',
                     id: '',
                     isHidden: false,
                     date_of_birth_api: '',
                     date_of_birth: '',
                     isDatePickerVisible: false,

                };
  }

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  managePasswordVisibility1 = () =>
  {
    this.setState({ hidePassword1: !this.state.hidePassword1 });
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 'ID');
    // const CountryCode = navigation.getParam('CountryCode', 'CC');

    this.setState({id:UserId});
  };

  // displayData = async () => {
  //   try {
  //     let id = await AsyncStorage.getItem('UserId');
  //     this.setState({id: id});
  //   } catch (error) {

  //   }
  // };

  async Change_pwd() {
    // this.props.navigation.navigate('ForgotPassword');

       const {new_password,new_password_confirmation,id,date_of_birth_api,date_of_birth} = this.state;
      //  const uid = this.props.navigation.navigate('data', 'UserId');
      if (date_of_birth != '' && date_of_birth_api != '' ) {
    if (new_password.length >= 6) {
      if (new_password_confirmation.length >= 6 && new_password_confirmation == new_password){
        
        this.setState({isHidden: true});

        axios
          .post(
            ApiName.changePassword,
            {
              security_question: date_of_birth_api,
              new_password: new_password,
              new_password_confirmation: new_password_confirmation,
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
              AsyncStorage.setItem('NewPassword', new_password);
              AsyncStorage.setItem('NewPasswordConfirmation',new_password_confirmation);
              AsyncStorage.setItem('UserId',response.data.data);
              this.props.navigation.navigate('Login');
           

            } else {
              Toast.show(response.data.message);

            }
          })
          .catch((error) => {
            Toast.show('There was some error. Please try again')
           
            this.setState({isHidden: false});

          });
      } else {
        Toast.show('Password Mismatch');
      }
    } else {
      Toast.show('Enter Valid Password');
    }}else {
      Toast.show('Select Registered Date of birth');
    }
  }

    
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
      <SafeAreaView style={{flex: 1,}}>
      <View style={styles.container}>
      
        <View style={styles.view}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(42)}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../images/back_arrow.png')} resizeMode={'contain'} style={styles.back_arrow}/>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Text style={styles.change_text}>Change Password</Text>
              </TouchableWithoutFeedback>
          </ImageBackground>
          </TouchableWithoutFeedback>
          {/* <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 0} // adjust the value here if you need more padding
  style = {{ flex: 1 }}
  behavior = "padding" > */}
<KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view1}>


                

          <TouchableOpacity onPress={()=> this.showDatePicker()}>
                  <View style={{flexDirection:'row', width:'90%',
                   alignItems:'center',justifyContent:'center', 
                   marginTop:blockMargin * 1.5, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'90%',
      color: '#000',
      textAlign:'left',marginLeft: blockMarginHalf * 2,
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 14}} >{this.state.date_of_birth != '' ? this.state.date_of_birth : 'Date of Birth'}</Text>
                <Image source={require('../../images/calendar_theme.png')}
                resizeMode={'contain'}
                style={{width:'10%',height:15}}/>
                </View></TouchableOpacity>
                
                <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={this.handleDateConfirm}
                        onCancel={this.hideDatePicker}
                      />

<View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '90%',}} />
<View style={{flexDirection:'row', width:'90%', alignItems:'center',justifyContent:'center', marginTop: blockMarginHalf/2, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'98%',
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 10}} >{'Your Registered Date of birth for security question'}</Text>
      </View>
          <View style = { styles.textBoxBtnHolder }>
          <TextInput placeholder="Password" onChangeText={(value) =>this.setState({new_password: value})} value={this.state.new_password} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox } returnKeyType='next'
                      onSubmitEditing={() => this.refs.confirm_password.focus()}/>
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <View style = { styles.textBoxBtnHolder }>
      
          <TextInput 
          ref='confirm_password'
          placeholder="Confirm Password" onChangeText={(value) =>this.setState({new_password_confirmation: value})} value={this.state.new_password_confirmation} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword1 } style = { styles.textBox } returnKeyType='done'
                      />
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility1 }>
            <Image source = { ( this.state.hidePassword1 ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <View style={styles.view2}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.submitbutton]}
            onPress={() => this.Change_pwd()}>
            <Text style={styles.buttontext}>Submit</Text>
          </TouchableOpacity>
          </View>
          </View>
         </TouchableWithoutFeedback>
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
