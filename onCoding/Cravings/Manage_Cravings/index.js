/* eslint-disable prettier/prettier */
import React, { Component,useState, useRef}from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator, FlatList, ScrollView,Button } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
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
import Sample from '../../Sample';
import Toast from 'react-native-simple-toast';
import Video from 'react-native-video';
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
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
      videoUrl:'',
      videoName:'',
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
    console.log('input ==> ' + token + ' ' + ApiName.video_craving);

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
        console.log(
          'Craving Video response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.setState({ videoList: response.data.data });


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


  
  VideoLoadingUrl = async ({url,name}) => {
    console.log('cravingVideoUrl - '+url)
    this.setState({visible:true,videoUrl: url,videoName: name})
   }

  _toggleBottomNavigationView = () => {
    // alert(JSON.stringify(this.state.coCreatorData))
    this.setState({visible: !this.state.visible,videoUrl: '',videoName:''});
  };

  render() {

    const { isHidden } = this.state;
    

    return (
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{


            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB',
          }}>
            <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>

              {/* <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.props.navigation.goBack()}>

                <Image style={{
                  width: responsiveWidth(3),
                  height: responsiveHeight(4),
                  resizeMode: 'contain',
                }} source={require('../../../images/back_arrow.png')} />

              </TouchableOpacity> */}

            </View>
            <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Cravings</Text>

            </View>
          </View>
          <ScrollView >

            <View style={{ width: '100%', height: deviceHeight / 8, alignItems: 'center', justifyContent: 'center', marginTop: blockMarginHalf * 2 }}>
              <Text style={{ fontFamily: 'SF-Medium', textAlign: 'center', fontSize: scalable(16) }}>Manage Your Cravings</Text>
              <Text style={{ fontFamily: 'SF-Regular', textAlign: 'center', fontSize: scalable(14), marginTop: blockMarginHalf }}>The section helps you to see where your cravings{'\n'}happen and the feelings, situations or people who{'\n'}tigger them. This helps you manage these and prepare{'\n'}the next one.</Text>
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
                    fontFamily: 'SF-Medium',
                    fontSize: scalable(16), alignSelf: 'center'
                  }}>Analyse Cravings</Text>

                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: blockMarginHalf, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Add_Cravings')}>
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
                    fontFamily: 'SF-Medium',
                    fontSize: scalable(16), alignSelf: 'center'
                  }}>Add Cravings</Text>
                </View>
              </TouchableOpacity>
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
                      marginBottom: blockMargin,
                      width: '80%',
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin}>
  <TouchableOpacity onPress={ () => this.VideoLoadingUrl({url:'http://whoapp.dci.in/uploads/video/'+item.uploads,name: item.name})}>
                      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 120, width: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: blockMarginHalf }}
                         resizeMode={'contain'} 

                         source={{ uri: 'http://whoapp.dci.in/uploads/files/' + item.thumbnail }}
                         defaultSource={require('../../../images/placeholder.png')} />
                       
                        <View style={{ height: 120, width: 120, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>

                          <Image style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} 
                          resizeMode={'contain'} source={require('../../../images/play.png')} />
                        </View>
                       
                        <Text numberOfLines={1} style={{
                          color: '#222222',
                          fontFamily: 'SF-Bold',
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
          <View style={{flex: 1}}>
               
              <View style={{ width: '100%', flexDirection: 'row', height: 50, backgroundColor: '#0072bb', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '12%', height: 50, position: 'absolute', left: 0, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ visible: false, videoUrl: '', videoName: '' })}>
                  <Image style={{ height: 15, width: 15, marginLeft: blockMargin }}
                    tintColor={'#f9f9f9'}
                    resizeMode={'contain'} source={require('../../../images/close.png')} />
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text numberOfLines={1} style={{
                    width: '75%',

                    color: '#f9f9f9',

                    textAlign: 'center',
                    fontFamily: 'SF-Medium',
                    fontSize: scalable(14),

                    justifyContent: 'center', alignContent: 'center',
                    alignItems: 'center', alignSelf: 'center'

                  }}>{this.state.videoName}</Text>
                </View>

              </View>   
<CravingPlayer

videoUrl={this.state.videoUrl}
/>
     
    </View>
          </BottomSheet>

        </View>
      </View>

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
