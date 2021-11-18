/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Change_pwd/styles';

import {
  View,
  ImageBackground,
  Image,
  Text,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Header } from 'react-navigation-stack';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

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
    // alert (CountryCode);
    this.setState({id:UserId});
  };

  // displayData = async () => {
  //   try {
  //     let id = await AsyncStorage.getItem('UserId');
  //     this.setState({id: id});
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  async Change_pwd() {
    // this.props.navigation.navigate('ForgotPassword');

       const {new_password,new_password_confirmation,id} = this.state;
      //  const uid = this.props.navigation.navigate('data', 'UserId');

    if (new_password.length >= 6) {
      if (new_password_confirmation.length >= 6 && new_password_confirmation == new_password){
        // alert(new_password + new_password_confirmation + id);
        this.setState({isHidden: true});

        axios
          .post(
            ApiName.changePassword,
            {
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
            console.log(
              'change response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );
            Toast.show(response.data.message);
            //this.props.navigation.navigate('Login'),

          this.setState({isHidden: false});

            if (response.data.status == 200) {
              AsyncStorage.setItem('NewPassword', new_password);
              AsyncStorage.setItem('NewPasswordConfirmation',new_password_confirmation);
              AsyncStorage.setItem('UserId',response.data.data);
              this.props.navigation.navigate('Login');
              this.setState({isHidden: false});

            } else {
              // AsyncStorage.setItem('UserId', Id);
              this.setState({isHidden: false});

            }
          })
          .catch((error) => {
            console.log('reactNativeDemo axios error:', error.message);
            this.setState({isHidden: false});

          });
      } else {
        Toast.show('Password Mismatch');
      }
    } else {
      Toast.show('Enter Valid Password');
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.view}>
          <ImageBackground
            source={require('../../images/shape.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(37)}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('OTP_Verification')}>
              <Image source={require('../../images/back_arrow.png')} style={styles.back_arrow}/>
              </TouchableOpacity>
            <Text style={styles.change_text}>Change Password</Text>
          </ImageBackground>
          <KeyboardAvoidingView
  keyboardVerticalOffset = {Header.HEIGHT + 50} // adjust the value here if you need more padding
  style = {{ flex: 1 }}
  behavior = "padding" >
<ScrollView style={styles.scrollview}   keyboardShouldPersistTaps={'handled'}>
          <View style={styles.view1}>
          <View style = { styles.textBoxBtnHolder }>
          <TextInput placeholder="Password" onChangeText={(value) =>this.setState({new_password: value})} value={this.state.new_password} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox }/>
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <View style = { styles.textBoxBtnHolder }>
          <TextInput placeholder="Confirm Password" onChangeText={(value) =>this.setState({new_password_confirmation: value})} value={this.state.new_password_confirmation} placeholderTextColor="#B6C0CB" underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword1 } style = { styles.textBox }/>
          <View style={styles.view3} />
          <TouchableOpacity activeOpacity = { 0.5 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility1 }>
            <Image source = { ( this.state.hidePassword1 ) ? require('../../images/eye-off.png') : require('../../images/eye_1.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
          <View style={styles.view2}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.submitbutton]}
            onPress={() => this.Change_pwd()}>
            <Text style={styles.buttontext}>Submit</Text>
          </TouchableOpacity>
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
