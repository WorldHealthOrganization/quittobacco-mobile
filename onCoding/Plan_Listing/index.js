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
import Plans from '../Plans/index';
import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

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
  Platform, ActivityIndicator, TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';
import dateFormat from 'date-fns/format';

import ViewMoreText from 'react-native-view-more-text';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

export default class Plan_Listing extends Component {

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

      quitDate: ' - ',
      planlist: [],
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

      this.Planlist()
    }
  };


  Planlist = async () => {

    const { token } = this.state
    console.log('input ==> ' + token + ' ' + ApiName.index_mission);

    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.index_mission, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Plan response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          var quit_date = new Date(response.data.data.quit_date);
          let quitFormatDate = dateFormat(quit_date, 'dd/MM/yyyy');

          this.setState({
            planlist: response.data.data.missions,
            quitDate: quitFormatDate

          });


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
            }}>No Plans Yet</Text>
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



renderViewMore(onPress){
  return(
    <Text style={{
      color: '#0072BB', fontSize: scalable(11),
      fontFamily: 'SF-Medium', textDecorationLine: 'underline', textDecorationStyle: "solid",
      marginTop: 1
    }}  onPress={onPress}>Read more</Text>
  )
}
renderViewLess(onPress){
  return(
    <Text style={{
      color: '#0072BB', fontSize: scalable(11),
      fontFamily: 'SF-Medium', textDecorationLine: 'underline', textDecorationStyle: "solid",
      marginTop: 1
    }}  onPress={onPress}>Read less</Text>
  )
}


  render() {
    const { isHidden, planlist, quitDate } = this.state;
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB',
          }}>
            <View style={{ width: '100%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Plan</Text>
            </View>

          </View>

          <View style={{
            flexDirection: 'column', width: '100%', height: '88%',
            backgroundColor: '#fff', justifyContent: 'center',
          }}>
           
<View style={{  flexDirection: 'column', width: '100%', height: '100%'}}>

              <View style={{  height: '18%', flexDirection: 'column', width: '100%' }}>

                <CardView style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,
                  marginBottom: blockMarginHalf / 2,
                  width: '90%', alignSelf: 'center', justifyContent: 'center',
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
                      textAlign: 'center',
                    }}>
                      {quitDate}
                    </Text>

                    <Text numberOfLines={2} style={{
                      marginTop: blockMarginHalf / 6, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                      color: '#0072BB',
                      fontFamily: 'SF-Medium',
                      fontSize: scalable(15),
                      textAlign: 'center',
                    }}>
                      {'Your Quit Date'}
                    </Text>

                  </View>

                </CardView>
              </View>



              <View style={{  height: '82%',justifyContent: 'center' }}>

                <FlatList
                  style={{ marginTop: blockMarginHalf }}
                  keyboardShouldPersistTaps={'handled'}
                  data={planlist}
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


                          <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>
                            <View style={{ width: '25%', flexDirection: 'column', }}>

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
                                    item.image === '' || item.image === null
                                      ? require('../../images/heart.png')
                                      : {
                                        uri: 'http://whoapp.dci.in/uploads/files/' + item.image,
                                        cache: 'force-cache',
                                      }
                                  }

                                  defaultSource={require('../../images/heart.png')}
                                  resizeMode='contain'

                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',

                                    justifyContent: 'center',

                                    alignSelf: 'center',
                                    borderRadius: 100 / 2,
                                  }}
                                />
                              </View>
                            </View>

                            <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center', paddingLeft: blockMarginHalf, paddingRight: blockMarginHalf }}>
                              <Text numberOfLines={2} style={{
                                marginBottom: blockMarginHalf / 4,
                                color: '#0072BB',
                                fontFamily: 'SF-Medium',
                                fontSize: scalable(15),
                              }}>
                                {item.name}
                              </Text>

                              
                              
                              <ViewMoreText
          numberOfLines={2}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          style={{color: '#202020',
          fontSize: scalable(12),
          fontFamily: 'SF-Regular'}}
          textStyle={{textAlign: 'left'}}
        >
          <Text style={{
                                  color: '#202020',
                                  fontSize: scalable(12),
                                  fontFamily: 'SF-Regular',
                                }}>
          {item.notes} </Text>
        </ViewMoreText>

                            </View>
                          </View>

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


                          <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>
                            <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center', paddingLeft: blockMarginHalf, paddingRight: blockMarginHalf }}>
                              <Text numberOfLines={2} style={{
                                marginBottom: blockMarginHalf / 4,
                                color: '#0072BB',
                                fontFamily: 'SF-Medium',
                                fontSize: scalable(15),
                              }}>
                                {item.name}
                              </Text>

                              <ViewMoreText
          numberOfLines={2}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          style={{color: '#202020',
          fontSize: scalable(12),
          fontFamily: 'SF-Regular'}}
          textStyle={{textAlign: 'left'}}
        >
          <Text style={{
                                  color: '#202020',
                                  fontSize: scalable(12),
                                  fontFamily: 'SF-Regular',
                                }}>
          {item.notes} </Text>
        </ViewMoreText>


                            </View>

                            <View style={{ width: '25%', flexDirection: 'column', }}>

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
                                    item.image === '' || item.image === null
                                      ? require('../../images/heart.png')
                                      : {
                                        uri: 'http://whoapp.dci.in/uploads/files/' + item.image,
                                        cache: 'force-cache',
                                      }
                                  }

                                  defaultSource={require('../../images/heart.png')}
                                  resizeMode='contain'

                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',

                                    justifyContent: 'center',

                                    alignSelf: 'center',
                                    borderRadius: 100 / 2,
                                  }}
                                />
                              </View>
                            </View>
                          </View>

                        </CardView>
                      }




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
                      color="#3283F1"
                      animating={true}
                      backgroundColor={'transparent'}
                    />
                  </View>
                ) : null}

              </View>
              </View>
            </View>

         
        </View>
       
          <View style={{
            flexDirection: 'row', bottom: 0,
            alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center'
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Plans')}>
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
    );
  }
}

// const RootStack = createStackNavigator({
//   Plans: Plans,
//   Plan_Listing: Plan_Listing,
// },
//   {
//     initialRouteName: 'Plan_Listing',
//     headerMode: 'none',
//   },

//   {
//     headerMode: 'none',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Planstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
