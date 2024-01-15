/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
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
  Platform, ActivityIndicator, Share,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

export default class List_Members extends Component {

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

      memberlist: [],
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

      this.Memberlist()
    }
  };


  Memberlist = async () => {

    const { token } = this.state

    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.indexMember, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false })
        console.log('mem list res', JSON.stringify(response))
        if (response.data.status == 200) {
          let memObj = []

          for (var i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].name != null && response.data.data[i].name != '' &&
              response.data.data[i].relationship != null && response.data.data[i].relationship != '' && response.data.data[i].email != null && response.data.data[i].email != '') {
              memObj.push(response.data.data[i])
            }
            // memObj.push(response.data.data[i])
          }
          this.setState({
            memberlist: memObj

          });


        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        console.log(error)
        Toast.show('There was some error. Please try again')

      });
  }

  editMember(id) {

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
          onPress: () => this.props.navigation.navigate('Update_Members', { MembersId: id }),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  deleteMember(id) {

    Alert.alert(
      '',
      'Are you sure do you want to delete?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.delete_Member({ id: id }),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  delete_Member = async ({ id }) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const { title, description, image } = this.state;
    this.setState({ isHidden: true })

    axios
      .post(
        ApiName.deleteMember + id + '/destroy',
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {

        if (response.data.status == 200) {
          Toast.show('Supporter deleted successfully');
          this.Memberlist();

        } else {
          this.setState({ isHidden: false })
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  };

  getExtensionFormat = (filename) => {

    if (filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'jpeg') {
      return false
    }
    return true
  };

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
            }}>No Supporters Yet</Text>
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
    const { isHidden, memberlist } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            backgroundColor: '#ffffff'
          }}>
          <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

            <View style={{
              flexDirection: 'row', width: '100%', height: '12%',
              backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center',
            }}>
              <View style={{ width: '5%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>

                <TouchableOpacity style={{

                  alignItems: 'center',
                }} onPress={() => this.props.navigation.goBack()}>

                  <Image style={{
                    width: responsiveWidth(3),
                    height: responsiveHeight(4),

                    resizeMode: 'contain',
                  }} source={require('../../images/back_arrow.png')} />

                </TouchableOpacity>

              </View>
              <View style={{ width: '85%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),
                  justifyContent: 'center',
                  textAlign: 'center',

                }}>Supporters</Text>
              </View>

            </View>

            <View style={{
              flexDirection: 'row', width: '100%', height: '88%',
              backgroundColor: '#fff', justifyContent: 'center',
            }}>

              <View style={{ width: '100%', justifyContent: 'center' }}>

                <View style={{ backgroundColor: '#FFFFFF', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: blockMargin * 1.5, marginBottom: blockMargin }}>
                  <Text style={{
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'SFCompactDisplay-Medium',
                    fontSize: scalable(14),
                    justifyContent: 'center',
                    textAlign: 'center',

                  }}>Add supporters who will help you Quit Tobacco</Text>
                </View>


                <FlatList

                  keyboardShouldPersistTaps={'handled'}
                  data={memberlist}
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                   { console.log("item image",ApiName.baseLink + item.image)}

                      <CardView style={{
                        backgroundColor: '#CBE2F1',
                        marginBottom: blockMargin,
                        width: '90%',
                      }}
                        cardElevation={3}
                        cardMaxElevation={5}
                        cornerRadius={blockMargin}>

                        <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>

                          <View style={{ width: '20%', flexDirection: 'column' }}>
                            <View style={{
                              width: 50,
                              height: 50,
                              borderRadius: 15,
                              backgroundColor: '#FFFFFF',
                              opacity: 100,
                              margin: blockMarginHalf / 2, justifyContent: 'center'
                            }}>
                              <Image
                                resizeMode={'contain'}
                                source={
                                  item.image === '' || item.image === null || this.getExtensionFormat(item.image)
                                    ? require('../../images/placeholder.png')
                                    :
                                    {

                                      uri: ApiName.baseLink + item.image
                                    }}
                                defaultSource={require('../../images/placeholder.png')}

                                style={{
                                  width: 40,
                                  height: 40,
                                  resizeMode: 'cover',

                                  justifyContent: 'center',

                                  alignSelf: 'center',
                                  borderRadius: 10,
                                }}
                              />

                            </View>

                          </View>

                          <View style={{ width: '55%', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text numberOfLines={2} style={{
                              marginBottom: blockMarginHalf, marginLeft: blockMarginHalf / 4, marginBottom: blockMarginHalf,
                              color: '#0072BB',
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: scalable(15),
                            }}>
                              {item.name}
                            </Text>
                            <Text numberOfLines={1} style={{
                              color: '#202020',
                              fontSize: scalable(13),
                              fontFamily: 'SFCompactDisplay-Regular', marginLeft: blockMarginHalf / 4, marginBottom: blockMarginHalf / 2,
                            }}>{item.relationship}</Text>
                          </View>

                          <View style={{ width: '25%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View
                              style={{
                                height: 30,
                                width: 30,
                                backgroundColor: '#0072BB',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',

                              }}>
                              <TouchableOpacity
                                style={{
                                  height: 30,
                                  width: 30,
                                  backgroundColor: '#0072BB',
                                  borderRadius: 30,
                                  alignItems: 'center',
                                  justifyContent: 'center',

                                }}
                                onPress={() => this.editMember(item.code)}
                              >
                                <Image
                                  style={{
                                    height: 12,
                                    width: 12,
                                  }}
                                  source={require('../../images/edit.png')}
                                  resizeMode={'contain'}
                                />
                              </TouchableOpacity>
                            </View>

                            <View
                              style={{
                                height: 30,
                                width: 30,
                                backgroundColor: 'white',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: blockMarginHalf,
                              }}>
                              <TouchableOpacity
                                style={{
                                  height: 30,
                                  width: 30,
                                  backgroundColor: 'white',
                                  borderRadius: 30,
                                  alignItems: 'center',
                                  justifyContent: 'center',

                                }}
                                onPress={() => this.deleteMember(item.code)}
                              >
                                <Image
                                  style={{
                                    height: 15,
                                    width: 15,
                                  }}
                                  source={require('../../images/trash.png')}
                                  resizeMode={'contain'}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>

                        </View>


                      </CardView>

                    </View>
                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                />


              </View>

            </View>

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

          <View style={{
            flexDirection: 'row', bottom: 0,
            alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center'
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Members')}>
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
