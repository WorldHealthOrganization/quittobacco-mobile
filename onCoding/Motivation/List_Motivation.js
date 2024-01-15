/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, Alert, SafeAreaView, FlatList, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../Benefits/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import CardView from 'react-native-cardview';
import Toast from 'react-native-simple-toast';

import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { color } from 'react-native-reanimated';


export default class List_Motivation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      motivation_list: [],
      description: '',
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.List_Motivation();
    });
    this.List_Motivation();
  };


  componentWillUnmount() {
    this.focusListener.remove();
    clearTimeout(this.t);
  }

  delete(id) {

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
          onPress: () => this.delete_Motivation({ id: id }),
        },
      ],
      {
        cancelable: false,
      },
    );
  }


  selectedMotivation(id) {

    console.log('inside dialog')

    Alert.alert(
      '',
      'Do you want to select this as your Motivation?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.select_Motivation({ id: id }),
        },
      ],
      {
        cancelable: false,
      },
    );
  }




  delete_Motivation = async ({ id }) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })

    axios
      .post(
        ApiName.delete_motivation + id + '/destroy',
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {

        if (response.data.status == 200) {

          Toast.show("Motivation deleted successfully");

          this.List_Motivation();
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


  select_Motivation = async ({ id }) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })


    axios
      .post(
        ApiName.select_motivation + id + '/default',
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {



        if (response.data.status == 200) {

          this.List_Motivation();
          Toast.show("Motivation selected successfully");
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


  List_Motivation = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })
    const { title, description, image, } = this.state;

    axios
      .post(
        ApiName.list_motivation, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({ isHidden: false })
        console.log('Motivation response' + JSON.stringify(response))
        if (response.data.status == 200) {

          this.setState({ motivation_list: response.data.data })


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
            }}>No Motivation Yet</Text>
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

    const { motivation_list, isHidden } = this.state;
    console.log("motivation loist", motivation_list)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: deviceHeight,
            width: deviceWidth,
            flexDirection: 'column',
          }}>

          <View style={{
            flexDirection: 'row', width: '100%', height: '10%', marginTop: responsiveHeight(0), backgroundColor: '#0072BB'
          }}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Image style={styles.arrow} source={require('../../images/back_arrow.png')} />
            </TouchableOpacity>
            {/* <Text style={styles.text_prg}>Money Saved</Text> */}
            <Text style={{
              color: '#FFFFFF',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: responsiveFontSize(2.5),
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(28),

            }}>Motivation</Text>
            <TouchableOpacity
              onPress={() => this.shareApp({ type: 1 })}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                justifyContent: 'flex-end', end: 0, marginRight: responsiveWidth(5)

              }} >

              <Image style={{
                resizeMode: 'contain',
                width: 20,
                height: 20,
                justifyContent: 'flex-end', end: 0,
                tintColor: '#0072BB',
              }} source={require('../../images/share.png')} />
            </TouchableOpacity>
          </View>

          <FlatList

            keyboardShouldPersistTaps={'handled'}
            data={motivation_list}
            // data={[
            //   {
            //     id:1,
            //     image:require('../../images/placeholder.png'),
            //     message: 'First Item',
            //   },
            //   {
            //     id:2,
            //     image: require('../../images/placeholder.png'),
            //     message: 'Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.',
            //   },
            //   {
            //       id:3,
            //       image:require('../../images/placeholder.png'),
            //       message: 'Third Item',
            //   },
            //   {
            //     id:3,
            //     image:require('../../images/placeholder.png'),
            //     message: 'Third Item',
            // },
            // ]}
            extraData={this.state}
            showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (

            <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity onPress={() => this.selectedMotivation(item.code)}>
                <CardView style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,

                  marginBottom: blockMarginHalf / 2,
                  width: '90%',
                }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin}>


                  <View style={{
                    width: '100%', flexDirection: 'row', padding: blockMarginHalf, borderWidth: item.display_status == '1' ? 2 : 0,
                    borderColor: '#0072bb', borderStyle: 'dotted',
                    borderRadius: 100 / 8
                  }}>
{console.log("mtiv list img check",ApiName.baseImageLink + item.image)}
                    <View style={{ width: '15%', flexDirection: 'column' }}>

                      <View style={{
                        width: 45,
                        height: 45,
                        borderRadius: 100 / 2,
                        backgroundColor: '#FFFFFF',
                        opacity: 100,
                        margin: blockMarginHalf / 2, justifyContent: 'center'
                      }}>
                        <Image
                          resizeMode={'cover'}
                          source={
                            item.image === '' || item.image === null 
                              ? require('../../images/placeholder.png')
                              :
                              {

                                uri: ApiName.baseImageLink + item.image
                                // uri: require('../../images/placeholder.png')
                              }}
                          defaultSource={require('../../images/placeholder.png')}

                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'cover',

                            justifyContent: 'center',

                            alignSelf: 'center',
                            borderRadius: 100 / 2,
                          }}
                        />

                      </View>

                    </View>
                    <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                      <Text numberOfLines={8} style={{
                        marginBottom: blockMarginHalf / 2, marginTop: blockMarginHalf / 2,
                        marginLeft: blockMarginHalf * 1.5, marginRight: blockMarginHalf / 2, justifyContent: 'center',
                        color: '#0072BB',
                        fontFamily: 'SFCompactDisplay-Medium',
                        fontSize: scalable(15),
                      }}>
                        {item.message}
                      </Text>

                    </View>
                    <View style={{ width: '10%', flexDirection: 'column' }}>
                      <TouchableOpacity onPress={() => this.delete(item.code)}>
                        <View style={{
                          width: 25,
                          height: 25,
                          borderRadius: 100 / 2,
                          backgroundColor: 'transparent',
                          opacity: 100,
                          margin: blockMarginHalf / 2, justifyContent: 'center'
                        }}>
                          <Image
                            resizeMode={'contain'}
                            source={require('../../images/trash.png')}
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                              tintColor: '#0077bb',
                              justifyContent: 'center',

                              alignSelf: 'center',
                              borderRadius: 100 / 2,
                            }}
                          />
                        </View>
                      </TouchableOpacity>

                    </View>

                  </View>
                </CardView>
              </TouchableOpacity>
            </View>
            )}
            enableEmptySections={true}
            ListEmptyComponent={this.ListEmpty}

            keyExtractor={(item, index) => index.toString()}
          />

          <View style={{
            flexDirection: 'row', bottom: 0,
            alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center'
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Add_Motivation')}>
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

