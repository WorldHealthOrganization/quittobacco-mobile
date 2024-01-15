/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Motivation/Add_Styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImgToBase64 from 'react-native-image-base64';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  Modal,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  scalable,
  deviceWidth,
  deviceHeight,
  itemRadius,
  itemRadiusHalf,
  blockMarginHalf,
  blockMargin,
  blockPadding,
  blockPaddingHalf,
} from '../ui/common/responsive';
import { id } from 'date-fns/locale';

export default class Add_Motivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      motivationImg: '',
      fileName: '',
      base64String: '',
      notes: '',
      image: '',
      isModalVisible: false,
    };
  }

  componentDidMount = async () => {
    //let motivationId = await AsyncStorage.getItem('MotivationId');

    this.permissionChk();
  };

  permissionChk = async () => {
    request(
      Platform.select({
        android_read: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        android_write: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios_photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
        ios_media: PERMISSIONS.IOS.MEDIA_LIBRARY,
      }),
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  // chooseFile = () => {
  //   this.permissionChk();
  //   ImagePicker.openPicker({
  //     cropping: true,
  //     includeBase64:true,
  //     freeStyleCropEnabled: true,
  //     mediaType: 'photo',
  //   })
  //     .then(image => {
  //       // Set the selected image and base64 representation in the state
  //       this.setState(
  //         {
  //           motivationImg: image.path,
  //           base64String: image.data,
  //         },
  //         () => {
  //           console.log('Selected Image Path:', this.state.motivationImg);
  //           console.log('Base64 Image:', this.state.base64String);
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       console.log('ImagePicker Error: ', error);
  //     });
  // };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  selectFromGallery = () => {
    this.permissionChk();
    // this.toggleModal();
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
    })
      .then((image) => {
        this.setState(
          {
            motivationImg: image.path,
            base64String: image.data,
          },
          () => {
            console.log('Selected Image Path:', this.state.motivationImg);
            console.log('Base64 Image:', this.state.base64String);
            this.toggleModal();

          },
        );
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  takePhoto = () => {
    this.permissionChk();
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
    })
      .then((image) => {
        this.setState({
          motivationImg: image.path,
          base64String: image.data,
        });
        this.toggleModal();

      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  inputValidation() {
    const { notes, base64String, motivationImg } = this.state;

    if (notes.trim() == '') {
      Toast.show('Please add the motivation to quit');
    } else {
      this.add_motivation();
    }
  }

  add_motivation = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let motivationState = await AsyncStorage.getItem('MotivationState');
    let motivationId = await AsyncStorage.getItem('MotivationId');
    const { notes, base64String } = this.state;
    this.setState({ isHidden: true });
    console.log('add_motivation input ==> ' + notes + ' ' + base64String + ' ');

    let inputapiname = ApiName.add_motivation;

    if (motivationState == 1) {
      inputapiname = ApiName.update_motivation + motivationId + '/update';
    } else {
      inputapiname = ApiName.add_motivation;
    }

    axios
      .post(
        inputapiname,
        {
          //formEvent,
          message: notes,
          image: 'data:image/jpeg;base64, ' + base64String,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({ isHidden: false });

        if (response.data.status == 200) {
          Toast.show(response.data.message);
          this.setState({
            notes: '',
            motivationImg: '',
          });
          this.props.navigation.navigate('List_Motivation');
        } else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again');
      });
  };

  render() {
    const { isHidden } = this.state;
    const { memberImage, isModalVisible } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.view}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '12%',
                  backgroundColor: '#0072BB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '12%',
                    height: responsiveHeight(10),
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                    }}
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      style={{
                        width: responsiveWidth(3),
                        height: responsiveHeight(4),

                        resizeMode: 'contain',
                      }}
                      source={require('../../images/back_arrow.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '76%',
                    height: responsiveHeight(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(18),
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    Motivation
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: responsiveHeight(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: blockMarginHalf,
                  }}>
                  <Image
                    style={{
                      width: 0,
                      height: 0,
                      tintColor: '#fff',
                      resizeMode: 'contain',
                    }}
                    source={require('../../images/share.png')}
                  />
                </View>
              </View>
              <View style={{ height: '35%', width: '100%' }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.view2}>
                    <View style={{ marginTop: 0 }}>
                      {this.state.motivationImg != '' ? (
                        <View style={styles.square}>
                          <TouchableOpacity
                            style={styles.square2}
                            onPress={this.toggleModal}>
                            <Image
                              source={{
                                uri: this.state.motivationImg,
                                cache: 'force-cache',
                              }}
                              style={styles.img}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.square}>
                          <TouchableOpacity
                            style={{ marginBottom: 0 }}
                            onPress={this.toggleModal}>
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                borderStyle: 'dotted',
                                borderRadius: 100 / 2,
                                backgroundColor: '#0072bb',
                                opacity: 100,
                                borderWidth: 2,
                                borderColor: '#FFFFFF',
                                margin: blockMarginHalf,
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <Image
                                resizeMode="contain"
                                tintColor={'#FFFFFF'}
                                source={require('../../images/add.png')}
                                style={{
                                  width: 15,
                                  height: 15,
                                  resizeMode: 'contain',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  borderRadius: 100 / 2,
                                  tintColor: '#FFFFFF',
                                }}
                              />
                            </View>
                          </TouchableOpacity>

                          <Text style={styles.text}>TAP TO ADD IMAGE</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={this.selectFromGallery}>
                    <Text style={styles.modalButtonText}>
                      Select from Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={this.takePhoto}>
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={this.toggleModal}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 0 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View
                    style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <View style={styles.view1}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: scalable(15),
                          fontFamily: 'SFCompactDisplay-Medium',
                          width: '100%',
                          textAlign: 'center',
                          marginTop: blockMarginHalf,
                          marginBottom: blockMargin,
                        }}>
                        What motivates you to quit using Tobacco?
                      </Text>
                      <TextInput
                        style={styles.text2}
                        placeholder="Add your motivation to quit."
                        placeholderTextColor="#B6C0CB"
                        maxLength={500}
                        returnKeyType="next"
                        multiline={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({ notes: value })}
                        value={this.state.notes}
                      />
                      <View style={styles.view4} />

                      {isHidden ? (
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
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
                    {/* <View style={{flex:0.5,justifyContent: 'center'}}>
        <Image  source={
                      this.state.motivationImg != ''
                        ? {uri: this.state.motivationImg}
                        : require('../../images/ITU_Logo.png')
                    } style={styles.img} />
        </View> */}
                    <View
                      style={{
                        marginTop: blockMargin * 3,
                        marginBottom: blockMargin,
                      }}>
                      <TouchableOpacity
                        style={[styles.buttonContainer, styles.confirmbutton]}
                        onPress={() => this.inputValidation()}>
                        <Text style={styles.confirmtext}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
