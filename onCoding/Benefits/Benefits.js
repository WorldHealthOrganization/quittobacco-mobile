/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View, Text, Image, SafeAreaView,
  FlatList, TouchableOpacity, ActivityIndicator
} from 'react-native';
import styles from '../Benefits/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import CardView from 'react-native-cardview';

import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Benefits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      benefits_value: [],
      description: '',
    };
  }

  componentDidMount = () => {
    this.Benefits();
  };

  Benefits = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })
    const { title, description, image, } = this.state;



    axios
      .post(
        ApiName.benefits, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false })
        if (response.data.status == 200) {
          this.setState({ benefits_value: response.data.data })

        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }

  getExtensionFormat = (filename) => {

    if (filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'jpeg') {
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
            }}>No Benefits Yet</Text>
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

    const { benefits_value, isHidden } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: deviceHeight,
            width: deviceWidth,
            flexDirection: 'column',
          }}>

          <View style={{ flexDirection: 'row', width: '100%', height: responsiveHeight(10), backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity style={{
              width: '12%', left: 0,
              height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
            }} onPress={() => this.props.navigation.goBack()}>

              <Image style={{
                width: responsiveWidth(3),
                height: responsiveHeight(4),
                alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
                resizeMode: 'contain'
              }} source={require('../../images/back_arrow.png')} />

            </TouchableOpacity>

            <Text style={{
              width: '88%', color: '#FFFFFF',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(18),
              justifyContent: 'center',
              textAlign: 'center',
            }}>Benefits of Quitting Tobacco</Text>




          </View>


          <CardView style={{
            backgroundColor: '#CBE2F1',
            marginTop: blockMargin,
            marginBottom: blockMargin,
            width: '80%', alignSelf: 'center', justifyContent: 'center'
          }}
            cardElevation={3}
            cardMaxElevation={5}
            cornerRadius={blockMargin/2}>

            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: blockMarginHalf }}>

              <Text style={{
                marginBottom: blockMarginHalf, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf,
                color: '#0072BB', textAlign: 'center',
                fontFamily: 'SFCompactDisplay-Semibold',
                fontSize: scalable(16),
              }}>
                {"WHAT HAPPENS TO YOUR BODY AFTER QUITTING TOBACCO?"}
              </Text>

            </View>
          </CardView>


          <FlatList

            keyboardShouldPersistTaps={'handled'}
            data={benefits_value}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: blockMargin }}
            renderItem={({ item, index }) => (

              <View style={{ flexDirection: 'column', width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                {index % 2 == 0 ? <View style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>

                  <View style={{

                    justifyContent: 'center', alignItems: 'center',
                    width: '10%'
                  }}>

                    <View style={{
                      flex: 1,
                      justifyContent: 'center', alignItems: 'center',
                      width: '2%', borderRightWidth: index == 0 ? 0 : 1, borderRightColor: '#0072bb'
                    }} />
                    <FontAwesome style={{ justifyContent: 'center', alignSelf: 'center' }} name="circle" color={'#0072bb'} size={index == 0 ? 10 : index == (benefits_value.length - 1) ? 15 : 12} />

                    <View style={{
                      flex: 1,
                      justifyContent: 'center', alignItems: 'center',
                      width: '2%', borderRightWidth: index == (benefits_value.length - 1) ? 0 : 1, borderRightColor: '#0072bb'
                    }} />




                  </View>

                  <View style={{

justifyContent: 'center', alignItems: 'center',
width: '4%'
}}/>

                  <CardView style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMarginHalf,
                    marginBottom: blockMarginHalf,
                    alignSelf: 'center', justifyContent: 'center',
                    width: '86%',
                  }}
                    cardElevation={3}
                    cardMaxElevation={5}
                    cornerRadius={blockMargin/2}>

                    <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf/2 }}>
                      <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                        <Text numberOfLines={2} style={{
                          marginBottom: blockMarginHalf, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf/2,
                          color: '#0072BB',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(14),
                        }}>
                          {item.title}
                        </Text>
                        <Text style={{
                          color: '#202020',
                          fontSize: scalable(13),
                          fontFamily: 'SFCompactDisplay-Regular', marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2
                        }}>{item.description}</Text>
                      </View>
                      <View style={{ width: '25%', flexDirection: 'column',alignItems:'center' }}>

                        <View style={{
                          width: 60,
                          height: 60,
                          borderRadius: 100 / 2,
                          backgroundColor: '#FFFFFF',
                          opacity: 100,
                          margin: blockMarginHalf, justifyContent: 'center'
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
                            resizeMode='contain'
                            defaultSource={require('../../images/placeholder.png')}
                            style={{
                              width: 40,
                              height: 40,
                              resizeMode: 'contain',

                              justifyContent: 'center',

                              alignSelf: 'center',

                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </CardView>
                </View>
                  :


                  <View style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>


                    <View style={{

                      justifyContent: 'center', alignItems: 'center',
                      width: '10%'
                    }}>

                      <View style={{
                        flex: 1,
                        justifyContent: 'center', alignItems: 'center',
                        width: '2%', borderRightWidth: index == 0 ? 0 : 1, borderRightColor: '#0072bb'
                      }} />
                      <FontAwesome style={{ justifyContent: 'center', alignSelf: 'center' }} name="circle" color={'#0072bb'} size={index == 0 ? 10 : index == (benefits_value.length - 1) ? 15 : 12} />

                      <View style={{
                        flex: 1,
                        justifyContent: 'center', alignItems: 'center',
                        width: '2%', borderRightWidth: index == (benefits_value.length - 1) ? 0 : 1, borderRightColor: '#0072bb'
                      }} />




                    </View>

                    <View style={{

justifyContent: 'center', alignItems: 'center',
width: '4%'
}}/>

                    <CardView style={{
                      backgroundColor: '#CBE2F1',
                      marginTop: blockMarginHalf,
                      marginBottom: blockMarginHalf,
                      width: '86%',
                    }}
                      cardElevation={3}
                      cardMaxElevation={5}
                      cornerRadius={blockMargin/2}>


                      <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf/2 }}>

                        <View style={{ width: '25%', flexDirection: 'column',alignItems:'center' }}>

                          <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100 / 2,
                            backgroundColor: '#FFFFFF',
                            opacity: 100,
                            margin: blockMarginHalf, justifyContent: 'center'
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
                              resizeMode='contain'
                              defaultSource={require('../../images/placeholder.png')}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',

                                justifyContent: 'center',

                                alignSelf: 'center',

                              }}
                            />
                          </View>
                        </View>
                        <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                          <Text numberOfLines={2} style={{
                            marginBottom: blockMarginHalf, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf/2,
                            color: '#0072BB',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: scalable(14),
                          }}>
                            {item.title}
                          </Text>
                          <Text style={{
                            color: '#202020',
                            fontSize: scalable(13),
                            fontFamily: 'SFCompactDisplay-Regular', marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2
                          }}>{item.description}</Text>
                        </View>
                      </View>
                    </CardView>
                  </View>}
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
      </SafeAreaView>
    );
  }
}

