/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-material-dropdown-v2';
import CardView from 'react-native-cardview';

import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,ActivityIndicator
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputLayout} from 'rn-textinputlayout';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Dialog, {DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';
import Toast from 'react-native-simple-toast';
import TimeAgo from 'react-native-timeago';
import {routesCraving} from '../setup/routes/userHome/cravingStack'

export default class Push_Notifications extends Component {
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
    
          notificationlist: [],
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
  
        this.Notificationlist()
      }
    };

    Notificationlist = async () => {

      const { token } = this.state
      console.log('input ==> ' + token + ' ' + ApiName.List_notifications);
  
      this.setState({ isHidden: true })
      axios
        .post(
          ApiName.List_notifications, {},
          {
            headers: {
              'Authorization': token,
            },
          },
        )
        .then((response) => {
          console.log(
            'Notification response ',
            'response get details:==> ' + JSON.stringify(response.data),
          );
  
  
          if (response.data.status == 200) {
            console.log(JSON.stringify(response.data));
  
            this.setState({
              notificationlist: response.data.data });

            this.setState({ isHidden: false })
          }
          else {
            this.setState({ isHidden: false })
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')
          console.log('reactNativeDemo axios error:', error);
        });
    }

    redirect_to_carving = ({ notify_id }) => {
      console.log('Hiii redirect'+notify_id)
      const { navigation } = this.props
      navigation.navigate('Add_Cravings', {
        notification_id: notify_id,type: 1
      })
  }

    add_Achievement = async ({notify_id}) => {

      const { token } = this.state
      console.log('input ==> ' + token + ' ' +  ApiName.seen_notifications+notify_id);
  
      this.setState({ isHidden: true })
      axios
        .post(
          ApiName.seen_notifications, {type: 1,notification_id: notify_id},
          {
            headers: {
              'Authorization': token,
            },
          },
        )
        .then((response) => {
          console.log(
            'Notification seen response ',
            'response get details:==> ' + JSON.stringify(response.data),
          );
  
  
          if (response.data.status == 200) {
            console.log(JSON.stringify(response.data));
  
            this.setState({ isHidden: false })
          }
          else {
            this.setState({ isHidden: false })
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')
          console.log('reactNativeDemo axios error:', error);
        });
    }
  
    ListEmpty = () => {
      const { isHidden } = this.state;
      if (!isHidden) {
        return (
          //View to show when list is empty
          <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Text numberOfLines={2} style={{
                color: '#555555',
                fontFamily: 'SF-Medium',
                fontSize: scalable(14), alignItems: 'center',
              }}>No Notifications Yet</Text>
            </View>
          </View>
        );
      } else if (isHidden) {
        return (
          //View to show when list is empty
          <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
          </View>
        );
      }
    };
  

   

render() {
  const {isHidden,notificationlist} = this.state;

    return (
      <View
      style={{
        flex: 1,
        height: deviceHeight,
        width: '100%',
        flexDirection: 'column',
      }}>
      <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>

           <View style={{
          flexDirection: 'row', width: '100%', height: '12%',
          backgroundColor: '#0072BB',
        }}>
          {/* <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>

            <TouchableOpacity style={{

              alignItems: 'center',
            }} onPress={() => this.props.navigation.goBack()}>

              <Image style={{
                width: responsiveWidth(3),
                height: responsiveHeight(4),
                resizeMode: 'contain',
              }} source={require('../../images/back_arrow.png')} />

            </TouchableOpacity>

          </View> */}
          <View style={{ width: '100%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              color: '#FFFFFF',
              fontFamily: 'SF-Medium',
              fontSize: scalable(18),
              justifyContent: 'center',
              textAlign: 'center',

            }}>Notifications</Text>

          </View>
          </View>

          <FlatList
       style={{marginTop: blockMargin,marginBottom:blockMargin}}
       keyboardShouldPersistTaps={'handled'}
    //    data={[{
    //     text:'Day 1 is almost over! Did you Quit Today?',
    //     time: '2 hours ago',
    //     positive_response: 'Yes',
    //     negative_response: 'No',
    //   },
    //   {
    //     text:'4 days Tobacco Free! The first few days can be tough. Try to relax. Listen to Music, have fresh vegetables, fruits, do yoga, or deep breathing',
    //     time: '4 hours ago',
    //   },
    //   {
    //     text:'What is you current level of craving (urge) to use tobacco?',
    //     time: '1 day ago',
    //     positive_response: 'Yes',
    //     negative_response: 'No',
    //   },
    //   ]
    // }
    data={notificationlist}
       showsVerticalScrollIndicator={false}

       renderItem={({ item, index }) => (

         <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
           <CardView style={{
             backgroundColor: '#FFFFFF',
             marginBottom: blockMarginHalf,
             width: '90%',
             marginTop: blockMarginHalf
           }}
             cardElevation={3}
             cardMaxElevation={5}
             cornerRadius={blockMargin}>


               <View style={{ width: '93%',  justifyContent: 'center',alignSelf:'center',marginTop: blockMarginHalf * 1.5 }}>
                 <Text numberOfLines={6} style={{
                  //  marginBottom: blockMarginHalf ,  
                   color: '#202020',
                   fontFamily: 'SF-Bold',
                   fontSize: scalable(15),
                   textAlign:'left'
                  //  marginTop: blockMarginHalf *2,
                   
                 }}>
                   {item.message }
                 </Text>
               </View>

               <View style={{ width: '93%', flexDirection: 'row',justifyContent: 'center',alignSelf:'center',marginTop: blockMarginHalf,marginBottom: blockMarginHalf  }}>
               <View style={{ width: '100%', flexDirection: 'row'}}>
               <View style={{width: '35%',flexDirection:'row',justifyContent:'flex-start',alignSelf:'center'}}>   
               <TimeAgo
                              time={item.created_at}
                              style={{
                                textAlign: 'left',
                                color: '#B6C0CB',
                                fontFamily: 'SF-Medium',
                                fontSize: scalable(12),
                                margin: blockMarginHalf
                              }}
                            />
                            </View>
                
                { item.seen_status == '0' &&  item.type == '1' && 
                  <View style={{width: '65%',flexDirection:'row',justifyContent:'flex-end'}}> 
                  <TouchableOpacity onPress={() =>  this.redirect_to_carving({notify_id: item.id})}>
                <Text style={{
                   color: '#09E544',
                   fontFamily: 'SF-Bold',
                   fontSize: scalable(15),
                   padding: blockMarginHalf,
                  
                 }}>{item.positive.toUpperCase()}</Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() => this.add_Achievement({notify_id: item.id})}>
                <Text style={{
                   color: '#DB0909',
                   fontFamily: 'SF-Bold',
                   fontSize: scalable(15),
                   padding: blockMarginHalf,
                  marginRight: blockMargin,
                  marginLeft: blockMargin,
                 
                 }}>{item.negative.toUpperCase()}</Text></TouchableOpacity>
                 
                 </View>
       }
                 </View>
             </View>

            
           </CardView>

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
                    alignSelf: 'center',
                    backgroundColor:'transparent'
                  }}>
                    <ActivityIndicator
                      size={40}
                      color="#3283F1"
                      animating={true}
                      backgroundColor={'transparent'}
                    />
                  </View>
                ) : null}


       </View>
        </View>
    );
}
}