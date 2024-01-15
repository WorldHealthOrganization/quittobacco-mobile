/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Members/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,Modal,
  Platform, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class Members extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      //userInfo
      user_id: '',
      user_name: '',
      mobile_no: '',

      profile_image: '',
      fcm: '',
      token: '',

      nameValid: false,
      nameValidLength: false,

      relationValid: false,
      numberValid: false,
      numberValidLength: false,

      memberImage: '',
      

      memberbase64Image: '',

      name: '',
      relation: '',
      mobnum: '',

      email: '',
      emailValid: false,
      emailEmpty: false,

      memberdata: [],
      isModalVisible: false,
    };
  }



  componentWillUnmount() { }


  componentDidMount = () => {
    this.getUser()
    this.permissionChk();

  }

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


    }
  };


  validate = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
      return true;
    }
  }



  inputValidation = async () => {
    const {
      name,
      relation,
      mobnum,
      memberImage, numberValidLength, relationValid, numberValid, nameValidLength, nameValid,
      emailValid, email,
      emailEmpty,
    } = this.state;

    if (name.trim() == '' || relation.trim() == '' || email.trim() == '') {

      if (name.trim() != '') {
        if (name.length > 0) {
          this.setState({ nameValid: false })
          if (name.length >= 3) {
            this.setState({ nameValidLength: false })
          } else {
            this.setState({ nameValidLength: true })
          }
        } else {
          this.setState({ nameValid: true })
        }
      } else {

        this.setState({ nameValid: true })

      }

      if (relation.trim() == '') {
        this.setState({ relationValid: true })
      }


      if (email.trim() != '') {
        if (this.validate(email)) {
          this.setState({ emailValid: false });
        }
        else {

          this.setState({ emailValid: true });

        }

      } else {

        this.setState({ emailEmpty: true })
        this.setState({ emailValid: false });

      }

    } else {
      if (numberValidLength && relationValid && numberValid && nameValidLength && nameValid && emailEmpty && emailValid) {
        Toast.show('Please enter the mandatory field');
      } else {
        this.addMemberData();
      }

    }

  }

  addMemberData = async () => {

    const { memberbase64Image } = this.state


    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let objView2 = [...this.state.memberdata];

    if (!this.state.nameValid && !this.state.relationValid && !this.state.emailValid) {
      if (memberbase64Image != null && memberbase64Image != '') {
        objView2[0] = { index: 0, name: this.state.name, relation: this.state.relation, email: this.state.email, image: 'data:image/jpeg;base64, ' + memberbase64Image };
      } else {
        objView2[0] = { index: 0, name: this.state.name, relation: this.state.relation, email: this.state.email };

      }
      this.setState({ memberdata: objView2 })
      this.setState({ isHidden: true });
      console.log('member data', this.state.memberdata)
      const input = {
        link_members: this.state.memberdata,
        qp: 2
      }
      axios
        .post(
          // ApiName.userInfoupdate, {
          ApiName.userQuitPlan,
          input,
          {
            headers: {
              'Authorization': jwt_token,
            },
          },
        )
        .then((response) => {

          if (response.data.status == 200) {
            this.setState({ isHidden: false });

            Toast.show(response.data.message)

            this.props.navigation.navigate('List_Members')
            // Toast.show(response.data.message);
          }
          else if (response.data.status == 401) {

            this.setState({ isHidden: false });

            AsyncStorage.clear();
            AsyncStorage.setItem('LoginStatus', 'false');
            AsyncStorage.setItem('Walkthrough', 'false');

            Toast.show("Token expired, Please Login again to continue");

            this.props.navigation.navigate('Splash');
          }
          else {
            Toast.show(response.data.message)
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false });
          console.log("errror=====>",error)
          Toast.show('There was some error. Please try again');
        });



    } else {
      Toast.show('Please enter the mandatory field');
    }
  }


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

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  selectFromGallery = () => {
    this.permissionChk();
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
    })
      .then(image => {
        this.setState({
          memberImage: image.path,
          memberbase64Image: image.data,
        },
        () => {
          console.log('Selected Image Path:', this.state.memberImage);
          console.log('Base64 Image:', this.state.memberbase64Image);
         this.toggleModal();

        }
        );
      })
      .catch(error => {
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
      .then(image => {
        this.setState({
          memberImage: image.path,
          memberbase64Image: image.data,
        });
    this.toggleModal();

      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };





  render() {
    const { isHidden, nameValid, relationValid, numberValid, nameValidLength, numberValidLength, email, emailValid, emailEmpty } = this.state;
    const { memberImage, isModalVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.view}>
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

                }}>Supporters</Text>
              </View>
              <View style={{ width: '12%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>


                <Image style={{
                  width: 0,
                  height: 0,
                  tintColor: '#fff',
                  resizeMode: 'contain'
                }} source={require('../../images/share.png')} />


              </View>
            </View>

            <View style={{ height: '35%', width: '100%', }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.view2}>

                  <View style={{ marginTop: 0 }}>
                    {this.state.memberImage != '' ?


                      <View style={styles.square}>
                        <TouchableOpacity style={styles.square2} onPress={this.toggleModal}>

                          <Image source={{ uri: this.state.memberImage, cache: 'force-cache' }} style={styles.img} />
                        </TouchableOpacity>
                      </View>

                      :


                      <View style={styles.square}>
                        <TouchableOpacity style={{ marginBottom: 0 }} onPress={this.toggleModal}>
                          <View style={{
                            width: 50,
                            height: 50,
                            borderStyle: 'dotted',
                            borderRadius: 100 / 2,
                            backgroundColor: '#0072bb',
                            opacity: 100,
                            borderWidth: 2,
                            borderColor: '#FFFFFF',
                            margin: blockMarginHalf, justifyContent: 'center', alignSelf: 'center'
                          }}>
                            <Image

                              resizeMode='contain'
                              tintColor={'#FFFFFF'}
                              source={require('../../images/add.png')}
                              style={{
                                width: 15,
                                height: 15,
                                resizeMode: 'contain',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                borderRadius: 100 / 2,
                                tintColor: '#FFFFFF'
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.fab} onPress={this.chooseFile.bind(this)}>
                   <Text style={styles.text_fab}>+</Text>
                 </TouchableOpacity> */}
                        <Text style={styles.text}>TAP TO ADD IMAGE</Text>
                      </View>


                    }

                  </View>

                </View>
              </TouchableWithoutFeedback>
            </View>

          <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={this.selectFromGallery}>
              <Text style={styles.modalButtonText}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this.takePhoto}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this.toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, }}
            >

              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column' }}>

                  <View style={styles.view1}>
                    <TextInput 
                      keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
                      style={styles.text2}
                      placeholder="Name"
                      placeholderTextColor="#B6C0CB"

                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                      onChangeText={(name) => {
                        this.setState({ name })
                        if (name.trim() != '') {
                          if (name.length > 0) {
                            this.setState({ nameValid: false })
                            if (name.length >= 3) {
                              this.setState({ nameValidLength: false })
                            } else {
                              this.setState({ nameValidLength: true })
                            }
                          } else {
                            this.setState({ nameValid: true })
                          }
                        } else {

                          this.setState({ nameValid: true })
                          this.setState({ nameValidLength: false })

                        }
                      }} value={this.state.name}
                      onSubmitEditing={() => this.relation.focus()}
                    />

                    <View style={{
                      borderBottomWidth: responsiveWidth(0.30),
                      marginTop: responsiveHeight(0),
                      borderBottomColor: '#B6C0CB',
                      width: '100%',
                    }} />


                    {nameValid && <Text style={{
                      color: 'red', textAlign: 'left',

                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12)
                    }}>Please Enter the name</Text>}
                    {nameValidLength && <Text style={{
                      color: 'red', textAlign: 'left',
                      marginTop: blockMarginHalf,
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12),
                    }}>Please Enter atleast 3 characters</Text>}

                    <TextInput 
                      keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
                      style={styles.text2}
                      ref={(input) => this.relation = input}
                      placeholder="Relation"
                      placeholderTextColor="#B6C0CB"

                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                      onChangeText={(relation) => {
                        this.setState({ relation })
                        if (relation.trim() != '') {

                          this.setState({ relationValid: false })

                        } else {

                          this.setState({ relationValid: true })

                        }

                      }
                      } value={this.state.relation}
                      onSubmitEditing={() => this.mobnum.focus()}
                    />

                    <View style={{
                      borderBottomWidth: responsiveWidth(0.30),
                      marginTop: responsiveHeight(0),
                      borderBottomColor: '#B6C0CB',
                      width: '100%',
                    }} />


                    {relationValid && <Text style={{
                      color: 'red', textAlign: 'left',
                      marginTop: blockMarginHalf,
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12),
                    }}>Please Enter the Relationship</Text>}


                    <TextInput 
                      keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
                      style={styles.text2}
                      ref={(input) => this.mobnum = input}
                      placeholder="Email"

                      placeholderTextColor="#B6C0CB"

                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                      // onChangeText={(mobnum) => {
                      //   this.setState({ mobnum })
                      //   if (mobnum.trim() != '') {
                      //     if (mobnum.length > 0) {
                      //       this.setState({ numberValid: false })
                      //       if (mobnum.length >= 8) {
                      //         this.setState({ numberValidLength: false })
                      //       } else {
                      //         this.setState({ numberValidLength: true })
                      //       }
                      //     } else {
                      //       this.setState({ numberValid: true })
                      //     }
                      //   } else {


                      //     this.setState({ numberValid: true })
                      //     this.setState({ numberValidLength: false })

                      //   }
                      // }

                      // } 

                      onChangeText={(email) => {
                        this.setState({ email })
                        if (email.trim() != '') {
                          if (this.validate(email)) {
                            this.setState({ emailValid: false });
                          } else {
                            this.setState({ emailValid: true });
                            this.setState({ emailEmpty: false });
                          }
                        } else {

                          this.setState({ emailEmpty: false });
                          this.setState({ emailValid: true });

                        }
                      }}


                      value={this.state.email}
                    />

                    <View style={{
                      borderBottomWidth: responsiveWidth(0.30),
                      marginTop: responsiveHeight(0),
                      borderBottomColor: '#B6C0CB',
                      width: '100%',
                    }} />


                    {emailEmpty && <Text style={{
                      color: 'red', textAlign: 'left',
                      marginTop: blockMarginHalf,
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12)
                    }}>Please Enter the email</Text>}
                    {emailValid && <Text style={{
                      color: 'red', textAlign: 'left',
                      marginTop: blockMarginHalf,
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12)
                    }}>Please Enter Valid email</Text>}

                    {/* <View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />

        
            {numberValid && <Text style={{
              color: 'red', textAlign: 'left',
marginTop:blockMarginHalf,
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(12),
            }}>Please Enter the Mobile Number</Text>}
            {numberValidLength && <Text style={{
              color: 'red', textAlign: 'left',
              marginTop:blockMarginHalf,
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(12),
            }}>Please Enter valid number</Text>}
           */}




                  </View>


                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.confirmbutton]}
                      onPress={() => this.inputValidation()}>
                      <Text style={styles.confirmtext}>Add Supporters</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>

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
