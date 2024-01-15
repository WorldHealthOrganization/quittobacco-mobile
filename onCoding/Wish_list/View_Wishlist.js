/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Wish_list/styles_view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImgToBase64 from 'react-native-image-base64';
import CardView from 'react-native-cardview';

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
  TouchableOpacity,
  Platform, ActivityIndicator, Share
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

export default class View_Wishlist extends Component {

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

      //savedMoney
      moneySaved: '0',
      moneySpent: '0',
      Achieved_count:'0',

      //ShareWishListLink
      uniqueShareWishListLink: 'https://tobacco.page.link/Sohr',
      wishlist: [],
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
      this.getUser()

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

      this.Wishlist()
    }
  };

  
  editWish(id) {
   
    Alert.alert(
      '',
      'Are you sure do you want to edit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.props.navigation.navigate('Edit_Wishlist',{ WishId : id}),
        },
      ],
      {
        cancelable: false,
      },
    );
  }


  Wishlist = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    const { token } = this.state
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.index_wishlist, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        if (response.data.status == 200) {
        
          this.setState({
            wishlist: response.data.data.wish_lists,
            moneySpent: response.data.data.money.per_day,
            moneySaved: response.data.data.money.total,
            Achieved_count: response.data.data.achieved_count+''
          });

          this.setState({ isHidden: false })

        }else {
          this.setState({ isHidden: false })
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
       
      });
  }

  shareApp = async ({ type }) => {

    const { uniqueShareWishListLink } = this.state

    if (type == 2) {
      Share.share(
        {
          subject: 'Quit Tobacco My Wish List Link',
          message: 'My Wish List link  \n Click to download the app \n' + uniqueShareWishListLink,
          title: 'Quit Tobacco My Wish List Link',
        },
        {
          dialogTitle: 'Quit Tobacco My Wish List Link',// Android
          subject: 'Quit Tobacco My Wish List Link',// iOS
        }).then(success => console.log("success"), reason => console.log("Deeplink Reason"))


    }

  };

  getExtensionFormat = (filename) => {
   
    if(filename.split('.').pop() === 'png' || filename.split('.').pop() ==='jpg' || filename.split('.').pop() ==='jpeg'){
      return false
    }
    return true
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
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(14), alignItems: 'center'
            }}>No WishList Yet</Text>
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


  render() {
    const { wishlist, isHidden, moneySaved, moneySpent } = this.state;
    return (
    <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: '100%',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
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
            <View style={{ width: '76%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Wish List</Text>
            </View>
            <View style={{ width: '12%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>

              <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.shareApp({ type: 2 })}>

                <Image style={{
                  width: 20,
                  height: 20,
                  tintColor: '#fff',
                  resizeMode: 'contain'
                }} source={require('../../images/share.png')} />

              </TouchableOpacity>
            </View>
          </View>

          <View style={{
            flexDirection: 'row', width: '100%', height: '88%',
            backgroundColor: '#fff', justifyContent: 'center'
          }}>
            <ScrollView   keyboardShouldPersistTaps={'handled'}>
              <View style={{ justifyContent: 'center' }}>

                <CardView style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,
                  marginBottom: blockMarginHalf / 2,
                  width: '90%', alignSelf: 'center', justifyContent: 'center'
                }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin}>

                  <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                    <Text numberOfLines={2} style={{
                      marginLeft: blockMarginHalf,
                      color: '#000',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(20),
                      textAlign: 'center'
                    }}>
                      {this.state.Achieved_count+'/' + wishlist.length}
                    </Text>

                    <Text numberOfLines={2} style={{
                      marginTop: blockMarginHalf / 6, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                      color: '#0072BB',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(15),
                      textAlign: 'center'
                    }}>
                      {'Achieved'}
                    </Text>


                  </View>

                </CardView>
               
                <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '49%', alignSelf: 'center', justifyContent: 'center', marginRight: blockMarginHalf
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMarginHalf, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(14),
                          textAlign: 'center'
                        }}>
                          Daily Savings
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(18),
                          textAlign: 'center'
                        }}>
                          {moneySpent}
                        </Text>


                      </View>

                    </CardView>

                    <CardView style={{
                      backgroundColor: '#fff',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf / 2,
                      width: '49%', alignSelf: 'center', justifyContent: 'center'
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>

                      <View style={{ width: '100%', flexDirection: 'column', padding: blockMarginHalf, justifyContent: 'center' }}>

                        <Text numberOfLines={2} style={{
                          marginLeft: blockMarginHalf,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(14),
                          textAlign: 'center'
                        }}>
                          Total Saved
          </Text>

                        <Text style={{
                          marginTop: blockMarginHalf / 4, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,

                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(18),
                          textAlign: 'center'
                        }}>
                          {moneySaved}
                        </Text>


                      </View>

                    </CardView>
                  </View>
                </View>
               
                <FlatList
                  style = {{marginTop: blockMargin}}
                  keyboardShouldPersistTaps={'handled'}
                  data={wishlist}
                  extraData={this.state}
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (

                    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                      {index % 2 == 0 ?
                        <CardView style={{
                          backgroundColor: '#CBE2F1',
                         
                          marginBottom: blockMarginHalf * 1.5,
                          width: '90%',
                        }}
                          cardElevation={3}
                          cardMaxElevation={5}
                          cornerRadius={blockMargin}>

                          <TouchableOpacity onPress={() => this.editWish(item.code)}> 
                            <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>
                              <View style={{ width: '25%', flexDirection: 'column' }}>

                                <View style={{
                                  width: 75,
                                  height: 75,
                                  borderRadius: 15,
                                  backgroundColor: '#FFFFFF',
                                  opacity: 100,
                                  marginRight: blockMarginHalf, marginBottom: blockMarginHalf / 4, marginTop: blockMarginHalf / 4, justifyContent: 'center'
                                }}>
                                  <Image
                                    source={
                                      item.image === '' || item.image === null || this.getExtensionFormat(item.image)
                                        ? require('../../images/placeholder.png')
                                        : {
                                          uri: ApiName.baseLink + item.image,
                                          cache: 'force-cache',
                                        }
                                    }

                                    defaultSource={require('../../images/placeholder.png')}
                                    resizeMode='cover'

                                    style={{
                                      width: 50,
                                      height: 50,
                                      resizeMode: 'cover',

                                      justifyContent: 'center',

                                      alignSelf: 'center',
                                      borderRadius: 100/2,
                                    }}
                                  />
                                </View>
                              </View>

                              <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text numberOfLines={2} style={{
                                  marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 4,
                                  color: '#0072BB',
                                  fontFamily: 'SFCompactDisplay-Medium',
                                  fontSize: scalable(15),
                                }}>
                                  {item.name}
                                </Text>
                                <Text style={{
                                  color: '#202020',
                                  fontSize: scalable(14),
                                  fontFamily: 'SFCompactDisplay-Regular', marginLeft: blockMarginHalf,marginTop: blockMarginHalf/2
                                }}>{item.notes}</Text>
 <Text numberOfLines={2} style={{
                                  marginTop: blockMarginHalf / 2, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                                  color: '#222222',
                                  fontFamily: 'SFCompactDisplay-Semibold',
                                  fontSize: scalable(18),
                                }}>
                                  {item.currency + item.price}
                                </Text>

                                <Text numberOfLines={2} style={{
                                   marginLeft: blockMarginHalf,
                                  color: '#0072BB',
                                  textAlign:'left',
                                  fontFamily: 'SFCompactDisplay-Medium',
                                  fontSize: scalable(12),
                                }}>
                                 {item.status === 1 ? 'Completed' :'remaining time: '+ item.remaining_time }
                                </Text>

                                
                              </View>
                            </View>
                           </TouchableOpacity> 
                        </CardView>

                        :

                        <CardView style={{
                          backgroundColor: '#CBE2F1',
                        
                          marginBottom: blockMarginHalf * 1.5,

                          width: '90%',
                        }}
                          cardElevation={3}
                          cardMaxElevation={5}
                          cornerRadius={blockMargin}>

                        <TouchableOpacity onPress={() => this.editWish(item.code)}> 
                            <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>
                              <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text numberOfLines={2} style={{
                                  marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 4,
                                  color: '#0072BB',
                                  fontFamily: 'SFCompactDisplay-Medium',
                                  fontSize: scalable(15),
                                }}>
                                  {item.name}
                                </Text>
                                <Text style={{
                                  color: '#202020',
                                  fontSize: scalable(14),
                                  fontFamily: 'SFCompactDisplay-Regular', marginLeft: blockMarginHalf,marginTop: blockMarginHalf/2
                                }}>{item.notes}</Text>



                                <Text numberOfLines={2} style={{
                                  marginTop: blockMarginHalf / 2, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                                  color: '#222222',
                                  fontFamily: 'SFCompactDisplay-Semibold',
                                  fontSize: scalable(18),
                                }}>
                                  {item.currency + item.price}
                                </Text>

                                <Text numberOfLines={2} style={{
                                   marginLeft: blockMarginHalf,
                                  color: '#0072BB',
                                  textAlign:'left',
                                  fontFamily: 'SFCompactDisplay-Medium',
                                  fontSize: scalable(12),
                                }}>
                               {item.status === 1 ? 'Completed' :'remaining time: '+ item.remaining_time }
                                </Text>


                              </View>

                              <View style={{ width: '25%', flexDirection: 'column' }}>

                                <View style={{
                                  width: 75,
                                  height: 75,
                                  borderRadius: 15,
                                  backgroundColor: '#FFFFFF',
                                  opacity: 100,
                                  marginRight: blockMarginHalf, marginBottom: blockMarginHalf / 4, marginTop: blockMarginHalf / 4, justifyContent: 'center'
                                }}>
                                  <Image
                                    source={
                                      item.image === '' || item.image === null || this.getExtensionFormat(item.image)
                                        ? require('../../images/placeholder.png')
                                        : {
                                          uri: ApiName.baseLink + item.image,
                                          cache: 'force-cache',
                                        }
                                    }

                                    defaultSource={require('../../images/placeholder.png')}
                                    resizeMode='cover'

                                    style={{
                                      width: 50,
                                      height: 50,
                                      resizeMode: 'cover',

                                      justifyContent: 'center',

                                      alignSelf: 'center',
                                   borderRadius: 100/2,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity> 
                        </CardView>
                      }




                    </View>
                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </ScrollView>
          </View>


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
                color="#0072bb"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
        </View>


        <View style={{
          flexDirection: 'row', bottom: 0,
          alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center'
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Wish_list')}>
            <View style={{
              width: 50,
              height: 50,
              borderStyle: 'dotted',
              borderRadius: 100 / 2,
              backgroundColor: '#FFFFFF',
              opacity: 100,
              borderWidth: 2,
              borderColor: '#0072bb',
              margin: blockMarginHalf, justifyContent: 'center'
            }}>
              <Image

                resizeMode='contain'
                source={require('../../images/add.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',

                  justifyContent: 'center',

                  alignSelf: 'center',
                  borderRadius: 100 / 2,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>


      </View>
</SafeAreaView>
    );
   
  }

}
