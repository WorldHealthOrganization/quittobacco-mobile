/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CardView from 'react-native-cardview';
import dateFormat from 'date-fns/format';

import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TextInput,
  Platform, ActivityIndicator, Share,
  TouchableOpacity,
} from 'react-native';
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

export default class Achievements extends Component {

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
      quitDate: '-',
      achievements: [],
    };
  }


  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    //AppState.removeEventListener('change', this._handleAppStateChange);
    this.focusListener.remove();
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearTimeout(this.t);

  }


  componentDidMount = () => {
    this.Achievements();
    //AppState.addEventListener('change', this._handleAppStateChange);
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {

      this.getUser()
      this.setState({ count: 0 });
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


  ListEmpty = () => {
    const { isHidden } = this.state
    if (!isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Text numberOfLines={2} style={{
              color: '#555555',
              fontFamily: 'SF-Medium',
              fontSize: scalable(14), alignItems: 'center'
            }}>No Achievements Yet</Text>
          </View>
        </View>
      );
    } else if (isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          </View>
        </View>
      );
    }
  };

  Achievements = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const {title, description, image} = this.state;
this.setState({isHidden: true})
    console.log('screen input ==> ' + description);

    axios
      .post(
        ApiName.Achievements,
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        console.log(
          'View diary response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));


          var quit_date = new Date(response.data.data.quit_date);
          let quitFormatDate = dateFormat(quit_date, 'dd/MM/yyyy');
        

          this.setState({achievements: response.data.data.achievement});

          this.setState({
            quitDate: quitFormatDate

          });  
                  this.setState({isHidden: false})
          // Toast.show(response.data.message);
        } else {
          this.setState({isHidden: false})
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false})
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  };

  render() {
    const {isHidden, quitDate} = this.state;
    return (
      <View
        style={{
          flex: 1,
         justifyContent:'center',alignItems:'center',
          width: '100%',
          flexDirection: 'column',
        }}>
     

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
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Achievements</Text>
            </View>
           
          </View>

         
       

                <CardView style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,
                  marginBottom: blockMargin,
                 
                  width: '90%', alignSelf: 'center', justifyContent: 'center'
                }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin}>

                  <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                    <Text numberOfLines={2} style={{
                      marginLeft: blockMarginHalf,
                      color: '#000',
                      fontFamily: 'SF-Medium',
                      fontSize: scalable(20),
                      textAlign: 'center'
                    }}>
                      {quitDate}
                    </Text>

                    <Text numberOfLines={2} style={{
                      marginTop: blockMarginHalf / 6, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                      color: '#0072BB',
                      fontFamily: 'SF-Medium',
                      fontSize: scalable(15),
                      textAlign: 'center'
                    }}>
                      {'Your Quit Date'}
                    </Text>

                    </View>

</CardView>

       
          <FlatList
          numColumns={2}
          keyboardShouldPersistTaps={'handled'}
       style={{marginBottom: blockMargin}}
        data={this.state.achievements}
          showsVerticalScrollIndicator={false}

          renderItem={({ item, index }) => (

            <View style={{ flexDirection: 'column',marginRight: blockMargin * 2,marginLeft: blockMargin * 2 ,marginTop: blockMargin}}>
           <Image style={{height:120,width: deviceWidth/4,alignSelf: 'center'}}
           resizeMode={'contain'} source={{uri:'http://whoapp.dci.in/uploads/files/' +item.image} }/>             
          <Text style={{alignSelf: 'center', fontFamily: 'SF-Heavy',fontSize: scalable(14)}}>{item.badge+'th Batch'}</Text>
          <Text style={{alignSelf: 'center',color:'#0072BB', fontFamily: 'SF-Heavy',fontSize: scalable(14)}}>{'Tobacco Free'}</Text>
          {/* <Text style={{alignSelf: 'center', fontFamily: 'SF-Medium',fontSize: scalable(12),color: '#0072BB'}}>{item.description}</Text> */}

</View>


          )}
          enableEmptySections={true}
          ListEmptyComponent={this.ListEmpty}

          keyExtractor={(item, index) => index.toString()}
        />




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
                color="#0072bb"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null} 
        </View>




    

    );
  
  }

}
