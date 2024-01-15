/* eslint-disable prettier/prettier */
import React, { Component, useState, useRef } from 'react';
import {
  View, Text, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator,
  FlatList, ScrollView, Button, SafeAreaView
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Navigation from '../../Navigation/Navigation';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../../ui/common/responsive';
import CardView from 'react-native-cardview';
import Add_Cravings from '../Add_Cravings/index';
import Toast from 'react-native-simple-toast';
import CravingPlayer from '../../Cravings/Manage_Cravings/CravingPlayer'
import { BottomSheet } from 'react-native-btr';
import { th, tr, vi } from 'date-fns/locale';

export default class Manage_Cravings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
      visible: false,
      videoUrl: '',
      videoName: '',
      videoList: []
    };

  }

  componentDidMount = () => {

    this.getUser();
  };

  getUser = async () => {

    const user_id = await AsyncStorage.getItem('UserId');
    const user_name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');

    if (token !== '') {
      this.setState({

        token: token,
      });

      this.CravingVideos()
    }
  };



  CravingVideos = async () => {

    const { token } = this.state
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.video_craving, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
      
        this.setState({ isHidden: false })
        if (response.data.status == 200) {
        
          this.setState({ videoList: response.data.data });
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
       
      });
  }



  VideoLoadingUrl = async ({ url, name }) => {
    this.setState({ visible: true, videoUrl: url, videoName: name })
  }

  _toggleBottomNavigationView = () => {
    this.setState({ visible: !this.state.visible, videoUrl: '', videoName: '' });
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
            }}>No Videos Yet</Text>
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

    const { isHidden } = this.state;


    return (
      <SafeAreaView style={{ flex: 1 }} >
        <View
          style={{
            flex: 1,
            height: deviceHeight,
            width: '100%',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
          }}>
          <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

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
            Cravings
          </Text>
        </View>

        <ScrollView >

              <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: blockMarginHalf * 2 }}>
                <Text style={{ fontFamily: 'SFCompactDisplay-Semibold', textAlign: 'center', fontSize: scalable(16),color:'black' }}>Manage Your Cravings</Text>
                <Text style={{ fontFamily: 'SFCompactDisplay-Regular', textAlign: 'center', fontSize: scalable(14), margin: blockMarginHalf * 1.5,color:'black' }}>This section helps you to see where your cravings{'\n'}happen and the feelings, situations or people who{'\n'}trigger them. This helps you manage these and be prepared for the next one.</Text>
              </View>
              <View style={{ marginTop: blockMarginHalf, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Add_Cravings')}>
                  <View style={{
                    width: 200,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: '#0072bb',
                    opacity: 100,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    margin: blockMarginHalf, justifyContent: 'center'
                  }}>
                    <Text style={{
                      color: '#FFFFFF',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(16), alignSelf: 'center'
                    }}>Add Cravings</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <View style={{ marginTop: blockMarginHalf * 2, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Analyse_Cravings')}>
                  <View style={{
                    width: 200,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: '#0072bb',
                    opacity: 100,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    margin: blockMarginHalf, justifyContent: 'center'
                  }}>

                    <Text style={{
                      color: '#FFFFFF',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(16), alignSelf: 'center'
                    }}>Analyse Cravings</Text>

                  </View>
                </TouchableOpacity>
              </View>
          

              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: blockMarginHalf * 2 }}>
                <Text style={{ fontFamily: 'SFCompactDisplay-Semibold', textAlign: 'center', fontSize: scalable(15),color:"black" }}>Try doing the following to manage your cravings</Text>
               


                <FlatList

                  keyboardShouldPersistTaps={'handled'}
                  data={[
                    {
                      text: '1. Keep your mouth busy. Chew a gum or any other healthy option such as cardamom, fennel seeds, clove etc. (keep these items handy) instead of picking up smokeless tobacco, cigarettes or other tobacco products.',
                    },
                    {
                      text: '2. Drink water.',
                    },
                    {
                      text: '3. Take slow, deep breaths. Breathe through your cravings.',
                    },
                    {
                      text: '4. Do something else. When a craving hits, immediately try diverting your attention to anything you like to do such as listening to your favorite song, watch a movie, cook your favorite dish, play an instrument, read a book etc.',
                    },
                    {
                      text: '5. Eat a healthy snack.',
                    },
                    {
                      text: '6. If you are in the presence of smokers and other tobacco users, move away from that place.',
                    },
                    {
                      text: '7. Go for a walk or jog. Or go up and down the stairs a few times.',
                    },
                    {
                      text: '8. Call a friend.',
                    },
                    {
                      text: '9. Try meditation, yoga, dance exercise.',
                    },
                    {
                      text: '10. Remember your decision and reasons to quit.',
                    },
                  ]
                }                  
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (

                    <View>
                      
                            
                          <Text style={{marginLeft: blockMargin *2,marginRight: blockMargin*2, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(13), marginTop: blockMarginHalf*2,color:'black' }}>
                 {item.text}
</Text>



                    </View>
                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                />
                {/* <Text style={{marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>1. Keep your mouth busy. Chew a gum or any other healthy option such as cardamom, fennel seeds, clove etc. (keep these items handy) instead of picking up smokeless tobacco, cigarettes or other tobacco products.
                </Text>
              
                <Text style={{ marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>2. Drink water.</Text>
                
                <Text style={{ marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>3. Take slow, deep breaths. Breathe through your cravings.{'\n'}
                </Text>
                
                <Text style={{marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  4. Do something else. When a craving hits, immediately try diverting your attention to anything you like to do such as listening to your favorite song, watch a movie, cook your favorite dish, play an instrument, read a book etc.{'\n'}
</Text>
<Text style={{ marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>

5. Eat a healthy snack.{'\n'}</Text>
                <Text style={{ marginLeft: blockMargin,marginRight: blockMargin,fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  6. If you are in the presence of smokers and other tobacco users, move away from that place.{'\n'}</Text>
                <Text style={{marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  7. Go for a walk or jog. Or go up and down the stairs a few times.{'\n'}</Text>
                <Text style={{marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  8. Call a friend.{'\n'}</Text>
                <Text style={{ marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  9. Try meditation, yoga, dance exercise.{'\n'}</Text>
                <Text style={{ marginLeft: blockMargin,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(14), marginTop: blockMarginHalf }}>
                  10. Remember your decision and reasons to quit.{'\n'}
                </Text> */}
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: blockMargin * 2 }}>


                <FlatList

                  numColumns={2}
                  keyboardShouldPersistTaps={'handled'}
                  data={this.state.videoList}
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (

                    <View style={{ flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                      <CardView style={{
                        backgroundColor: '#FFFFFF',
                        marginTop: blockMarginHalf,
                        marginBottom: blockMargin,
                        width: '80%',
                      }}
                        cardElevation={3}
                        cardMaxElevation={5}
                        cornerRadius={blockMargin}>
                        <TouchableOpacity onPress={() => this.VideoLoadingUrl({ url: ApiName.baseVideoLink + item.uploads, name: item.name })}>
                          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 120, width: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: blockMarginHalf, marginTop: blockMargin }}
                              resizeMode={'cover'}

                              source={ item.thumbnail === '' || item.thumbnail === null || this.getExtensionFormat(item.thumbnail)
                              ? require('../../../images/placeholder.png')
                              : { uri: ApiName.baseLink + item.thumbnail }}
                              defaultSource={require('../../../images/placeholder.png')} />

                            <View style={{ height: 120, width: 120, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>

                              <Image style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                                resizeMode={'contain'} source={require('../../../images/play.png')} />
                            </View>

                            <Text numberOfLines={2} style={{
                              color: '#222222',
                              fontFamily: 'SFCompactDisplay-Medium',
                              textAlign:'center',
                              fontSize: scalable(14), alignSelf: 'center', margin: blockMarginHalf
                            }}>{item.name}</Text>

                          </View>

                        </TouchableOpacity>
                      </CardView>

                    </View>
                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              {isHidden ? (
                <View style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',

                  backgroundColor: 'transparent'
                }}>
                  <ActivityIndicator
                    size={40}
                    color="#0072bb"
                    animating={true}
                    backgroundColor={'transparent'}
                  />
                </View>
              ) : null}

            </ScrollView>

            <BottomSheet
              visible={this.state.visible}
              onBackButtonPress={this._toggleBottomNavigationView}
              onBackdropPress={this._toggleBottomNavigationView}>
              {/* new grid */}
              <SafeAreaView style={{ flex: 1 }}>

                <View style={{ width: '100%', flexDirection: 'row', height: 50, backgroundColor: '#0072bb', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ width: '12%', height: 50, position: 'absolute', left: 0, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ visible: false, videoUrl: '', videoName: '' })}>
                    <Image style={{ height: 15, width: 15, marginLeft: blockMargin,tintColor:'#FFFFFF' }}
                      tintColor={'#FFFFFF'}
                      resizeMode={'contain'} source={require('../../../images/close.png')} />
                  </TouchableOpacity>
                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{
                      width: '75%',

                      color: '#f9f9f9',

                      textAlign: 'center',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(14),

                      justifyContent: 'center', alignContent: 'center',
                      alignItems: 'center', alignSelf: 'center'

                    }}>{this.state.videoName}</Text>
                  </View>

                </View>
                <CravingPlayer

                  videoUrl={this.state.videoUrl}
                />

              </SafeAreaView>
            </BottomSheet>

          </View>
        </View>
      </SafeAreaView>
    );
  }
}


// const RootStack = createStackNavigator(
//     {
//       Manage_Cravings: Manage_Cravings,
//       Add_Cravings: Add_Cravings,
//       Sample: Sample,
//     },
//     {
//       initialRouteName: 'Manage_Cravings',
//       headerMode: 'none',
//     },

//     {
//       headerMode: 'none',
//     },
//   );

//   const AppContainer = createAppContainer(RootStack);

//   export default class ManageCravingStack extends React.Component {
//     render() {
//       return <AppContainer />;
//     }
//   }
