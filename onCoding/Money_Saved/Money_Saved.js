/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Money_Saved/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import CardView from 'react-native-cardview';

import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,Share,ActivityIndicator, SafeAreaView
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'


export default class Money_Saved extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isHidden: false,
          //userInfo
           user_id:'',
           name :'',
           mobile_no:'',
           email_id :'',
           profile_image:'',
           fcm:'',
           token:'',
           per_day:'0',
           per_week:'0',
           per_month:'0',
          moneySaved: '0',
          moneySavedPerYear: '0',
   //ShareSavedMoneyLink
   uniqueShareSavedMoneyLink:'https://tobacco.page.link/Sohr',
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
 
    this.getSavings() 
  }
};


getSavings = async () => {
  const {token} = this.state
  this.setState({isHidden: true})
  
    axios
      .post(
        ApiName.savings, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {

        this.setState({isHidden: false})
        if (response.data.status == 200) {
         
          this.setState({
            
            per_day:response.data.data.per_day,
            per_week:response.data.data.per_week,
            per_month:response.data.data.per_month,
            moneySaved: response.data.data.total,
           moneySavedPerYear: response.data.data.per_year,
          
          })
         
        }
        
      })
      .catch((error) => {
        this.setState({isHidden: false})
        Toast.show('There was some error. Please try again')
       
      });
  }
  
    shareApp = async ({type}) => {
   
      const { moneySavedPerYear,moneySaved,per_year,per_week,per_month,per_day,uniqueShareSavedMoneyLink } = this.state
      
      if(type == 1){ 
        Share.share(
          {
            subject: 'Quit Tobacco Saved Money Link' ,
            message: 'My Saved Money '+ moneySaved +' Money spend/year '+moneySavedPerYear +' Click to download the app \n'+uniqueShareSavedMoneyLink,
            title: 'Quit Tobacco Saved Money Link',
          },
          {
            dialogTitle: 'Quit Tobacco Saved Money Link' ,// Android
            subject: 'Quit Tobacco Saved Money Link' ,// iOS
          }).then(success => console.log("success"), reason => console.log("DeepLink reason"))
  
      }
      
    };

render() {
    const {isHidden,moneySavedPerYear,moneySaved,per_year,per_week,per_month,per_day,uniqueShareSavedMoneyLink} = this.state;
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        <View style={styles.view}>
        <View style={styles.view2}>
        <View style={{flexDirection: 'row', width: '100%', marginTop: responsiveHeight(2),
              }}>

<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                   <Image style={styles.arrow} source={require('../../images/back_arrow.png')}/>
                   </TouchableOpacity>
           <Text style={styles.text_prg}>Money Saved</Text>
           <TouchableOpacity
                onPress= { () => this.shareApp({type: 1})}
                style={{position:'absolute',
    width: 30,
    height: 30,
    justifyContent:'flex-end',end:0,marginRight:responsiveWidth(5)
  
   }} >
              
                <Image style={{resizeMode: 'contain',
    width: 20,
    height: 20,
    justifyContent:'flex-end',end:0,
    tintColor:'#fff'
  
   }} source={require('../../images/share.png')} />
   </TouchableOpacity>
       </View>
       <Text style={styles.money}>TOTAL MONEY SAVED</Text>
       <Text style={{  color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Semibold',
        fontSize: responsiveFontSize(3.5),
      
       justifyContent:'center',
       alignSelf:'center',margin: responsiveWidth(3),
       }}>{moneySaved}</Text>
        </View>
        
        <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row',marginTop: blockMargin }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '48%', alignSelf: 'center', justifyContent: 'center', marginRight: blockMargin
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(16),
                          textAlign: 'left'
                        }}>
                         PER DAY
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(20),
                          textAlign: 'left'
                        }}>
                          {per_day}
                        </Text>


                      </View>

                    </CardView>

                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '48%', alignSelf: 'center', justifyContent: 'center'
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(16),
                          textAlign: 'left'
                        }}>
                          PER WEEK
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,

                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(20),
                          textAlign: 'left'
                        }}>
                          {per_week}
                        </Text>


                      </View>

                    </CardView>
                  </View>
                </View>
               
        <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '48%', alignSelf: 'center', justifyContent: 'center', marginRight: blockMargin
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(16),
                          textAlign: 'left'
                        }}>
                         PER MONTH
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(20),
                          textAlign: 'left'
                        }}>
                          {per_month}
                        </Text>


                      </View>

                    </CardView>

                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '48%', alignSelf: 'center', justifyContent: 'center'
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(16),
                          textAlign: 'left'
                        }}>
                          PER YEAR
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,

                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(20),
                          textAlign: 'left'
                        }}>
                          {moneySavedPerYear}
                        </Text>


                      </View>

                    </CardView>
                  </View>
                </View>
     
          
                            </View>
                            {isHidden ? (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
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
    </SafeAreaView>
    );
}
}
