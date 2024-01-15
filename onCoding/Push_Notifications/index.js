/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CardView from 'react-native-cardview';

import {
  View,
  TextInput,
  Image,
  Text,
  FlatList,
  TouchableOpacity,Share,
  TouchableHighlight,ActivityIndicator, SafeAreaView
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

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
     //ShareAPPLink
     uniqueShareAPPLink: 'https://tobacco.page.link/Sohr',
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
      AsyncStorage.setItem('pushNotify', '0');
      if (token !== '') {
        this.setState({
  
          token: token,
        });
  
        this.Notificationlist()
      }
    };

    Notificationlist = async () => {

      const { token } = this.state
  
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

          this.setState({ isHidden: false })

          if (response.data.status == 200) {
          
            this.setState({
              notificationlist: response.data.data });
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')
         
        });
    }

    redirect_to_carving = ({ notify_id }) => {
      const { navigation } = this.props
      navigation.navigate('Add_Cravings', {
        notification_id: notify_id,type: 1
      })
  }

    add_Achievement = async ({type_id,achievement_id,notify_id}) => {
      
      const { token } = this.state
      
  
      this.setState({ isHidden: true })

      if(type_id == '2'){
  
      axios
        .post(
          ApiName.store_achievements, {type: type_id,notification_id: notify_id,achievement_id: achievement_id},
          {
            headers: {
              'Authorization': token,
            },
          },
        )
        .then((response) => {
          this.setState({ isHidden: false })

          if (response.data.status == 200) {
          
            this.props.navigation.navigate('Achievements')
           
          }
          else {
            this.setState({ isHidden: false })
           Toast.show(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')
         
        });
      }else{
        
  axios
  .post(
    ApiName.store_craving,
    {
      tobacco_rating :0,
      carving_status: 0,
      type: type_id,
      notification_id: notify_id
    
    },
    {
      headers: {
        'Authorization': token,
      },
    },
  )
  .then((response) => {
   
    this.setState({isHidden: false});
    if (response.data.status == 200) {
    
      this.Notificationlist()
      Toast.show(response.data.data.message)
      }
    else {
      Toast.show(response.data.data.message)
     
    }
  })
  .catch((error) => {
    this.setState({isHidden: false});
    Toast.show('There was some error. Please try again')
   
  });
      }
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
                fontFamily: 'SFCompactDisplay-Medium',
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
  

    shareApp = async () => {
      const {
        uniqueShareAPPLink} = this.state;
  
     
        Share.share(
          {
            subject: 'Quit Tobacco App Link',
            message: 'Hurray!! I have completed 1 Month without using Tobacco \n Click to download the app \n' + uniqueShareAPPLink,
            title: 'Quit Tobacco App Link',
          },
          {
            dialogTitle: 'Quit Tobacco App Link', // Android
            subject: 'Quit Tobacco App Link', // iOS
          },
        ).then(
          (success) => console.log("success"),
          (reason) => console.log("DeepLink Reason"),
        );
      
    };
   

render() {
  const {isHidden,notificationlist} = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
      <View
      style={{
        flex: 1,
        height: deviceHeight,
        width: '100%',
        flexDirection: 'column',
      }}>
      <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>

      <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '12%',
            backgroundColor: '#0072BB',
            alignSelf: 'center',
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
          }}>
          <Text
            style={{
              
              color: '#FFFFFF',
            
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(18),
            
              alignSelf: 'center',
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center',
             
            }}>
            Notifications
          </Text>
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
                   fontFamily: 'SFCompactDisplay-Medium',
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
                              time={item.created_at*1000}
                              style={{
                                textAlign: 'left',
                                color: '#B6C0CB',
                                fontFamily: 'SFCompactDisplay-Medium',
                                fontSize: scalable(12),
                                margin: blockMarginHalf
                              }}
                            />
                            </View>


                         { item.notify_type == '3' &&  <View style={{width: '65%',flexDirection:'row',justifyContent:'flex-end'}}> 
                          <TouchableOpacity
                      onPress={() => this.shareApp()}
                      style={{
                       
                        width: 30,
                        
                        justifyContent: 'flex-end',alignSelf:'center',alignItems:'center',
                        end: 0,
                        marginRight: responsiveWidth(5),
                      }}>
                      <Image
                        style={{
                          resizeMode: 'contain',
                          width: 18,
                          height: 18,
                          justifyContent: 'flex-end',
                          end: 0,
                        }}
                        source={require('../../images/share.png')}
                      />
                    </TouchableOpacity>
     </View>
       }
                { item.seen_status == '0' &&  item.notify_type == '2' && 
                  <View style={{width: '65%',flexDirection:'row',justifyContent:'flex-end'}}> 
                  <TouchableOpacity onPress={() =>  this.redirect_to_carving({notify_id: item.id})
                  }>
                <Text style={{
                   color: '#09E544',
                   fontFamily: 'SFCompactDisplay-Semibold',
                   fontSize: scalable(15),
                   padding: blockMarginHalf,
                  
                 }}>{item.positive.toUpperCase()}</Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>  this.redirect_to_carving({notify_id: item.id})}>
                <Text style={{
                   color: '#DB0909',
                   fontFamily: 'SFCompactDisplay-Semibold',
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