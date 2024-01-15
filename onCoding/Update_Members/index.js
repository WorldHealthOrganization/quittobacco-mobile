/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Update_Members/styles';
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
  TextInput,Modal,
  Platform, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';

import ImagePicker from 'react-native-image-crop-picker';


import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class Update_Members extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      //userInfo
      user_id: '',
      user_name: '',
      mobile_no: '',
      email_id: '',
      profile_image: '',
      fcm: '',
      token: '',

      nameValid: false,
      nameValidLength: false,

      relationValid: false,
      numberValid: false,
      numberValidLength: false,

      memberImageurl: '',
      memberImage: '',

      memberbase64Image: null,

      member_id: '',

      name: '',
      relation: '',
      mobnum: '',

      email: '',
      emailValid: false,
      emailEmpty: false,
      selectedImage: null,
      isModalVisible: false,
    };
  }


  componentWillUnmount() {
  {  console.log("image====>",this.state.selectedImage)}
  {  console.log("imageurl====>",this.state.memberImageurl)}

   }


  componentDidMount = () => {


    this.getUser()
    this.permissionChk();

  }

  getUser = async () => {
    const { navigation } = this.props
    const user_id = await AsyncStorage.getItem('UserId');
    const user_name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');
    const member_id = navigation.getParam('MembersId', 'ID');
console.log("token==3=>", token)
    if (token !== '' && member_id !== '') {
      this.setState({

        token: token,
        member_id: member_id
      });

      this.getMemberData()

    }
  };

  getMemberData = async () => {

    const { token, member_id } = this.state
    console.log("member id===>", member_id)
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.updateMember + member_id + '/show', {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        if (response.data.status == 200) {

          this.setState({
            name: response.data.data.name,
            relation: response.data.data.relationship,
            email: response.data.data.email,
            memberImageurl: response.data.data.image
          });

          this.setState({ isHidden: false })
        }
        else {
          this.setState({ isHidden: false })
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }



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
      emailValid, email, memberImageurl,
      emailEmpty, memberbase64Image
    } = this.state;
console.log("member image==>",JSON.stringify (memberbase64Image))
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
      if (numberValidLength || relationValid || numberValid || nameValidLength || nameValid) {
        Toast.show('Please enter the mandatory field');
      } else {

        if (memberbase64Image == '') {
          this.addMemberData();
        }
        else {
          this.addMemberDataWithImage();
        }

      }

    }

  }

  

  addMemberData = async () => {

    const { name, relation, mobnum, memberbase64Image, email, token, member_id } = this.state;
    this.setState({ isHidden: true });



    axios
      .post(
        ApiName.updateMember + member_id + '/update',
        {
          name: name,
          relationship: relation,
          email: email,
        },
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false });
        if (response.data.status == 200) {

          Toast.show(response.data.message)

          this.props.navigation.goBack();
        }
        else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        console.log(error)
        Toast.show('There was some error. Please try again')

      });
  }




  addMemberDataWithImage = async () => {
    console.log("update member url  "+ ApiName.updateMember + member_id + '/update')
    console.log("member id",member_id)
    console.log("member base64",memberbase64Image)
    console.log()
    const { name, relation, mobnum, email, memberbase64Image, token, member_id } = this.state;
    this.setState({ isHidden: true });


    axios
      .post(
        ApiName.updateMember + member_id + '/update',
        {
          name: name,
          relationship: relation,
          email: email,
          image: memberbase64Image != '' ? 'data:image/jpeg;base64, ' + memberbase64Image : '',

        },
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {

        console.log("update url :" + ApiName.updateMember + member_id + '/update')
        console.log("updated data :")
        this.setState({ isHidden: false });
        if (response.data.status == 200) {
          Toast.show(response.data.message)
          this.props.navigation.goBack();
        }
        else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again')

      });
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
  //           memberImage: image.path,
  //           memberbase64Image: image.data,
  //         },
  //         () => {
  //           console.log('Selected Image Path:', this.state.memberImage);
  //           console.log('Base64 Image:', this.state.memberbase64Image);
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

  

  getExtensionFormat = (filename) => {

    if (filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'jpeg') {
      return false
    }
    return true
  };

  render() {
    const { isHidden, nameValid, relationValid, numberValid, nameValidLength, numberValidLength, email, emailEmpty, emailValid } = this.state;
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

        <View style={{ height: '35%', width: '100%' }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.view2}>

              <View style={{ marginTop: 0,  }}>
                {this.state.memberImage != '' ?


                  <View style={styles.square}>
                    <TouchableOpacity style={styles.square2} onPress={this.toggleModal}>
                     <Image source={{ uri: this.state.memberImage }} style={styles.img} />

                      {/* <Image source={{ uri: this.state.memberImage, cache: 'force-cache' }} style={styles.img} /> */}
                    </TouchableOpacity>
                  </View>

                  : this.state.memberImageurl != '' ?

                    <View style={styles.square}>
                      <TouchableOpacity style={styles.square2} onPress={this.toggleModal}>

                        <Image source={this.state.memberImageurl === '' || this.state.memberImageurl === null || this.getExtensionFormat(this.state.memberImageurl)
                          ? require('../../images/placeholder.png')
                          : { uri: ApiName.baseLink + this.state.memberImageurl, cache: 'force-cache' }} style={styles.img} />
                      </TouchableOpacity>
                    </View> :


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
                    <TextInput style={styles.text2}
                      placeholder="Name"
                      placeholderTextColor="#B6C0CB"
                      keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
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
                      fontSize: scalable(9)
                    }}>Please Enter the name</Text>}
                    {nameValidLength && <Text style={{
                      color: 'red', textAlign: 'left',

                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(9),
                    }}>Please Enter atleast 3 characters</Text>}

                    <TextInput style={styles.text2}
                      ref={(input) => this.relation = input}
                      placeholder="Relation"
                      placeholderTextColor="#B6C0CB"
                      keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
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

                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(9),
                    }}>Please Enter the Relationship</Text>}



                    <TextInput style={styles.text2}
                      ref={(input) => this.mobnum = input}
                      placeholder="Email"
                      keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
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
                      fontSize: scalable(9)
                    }}>Please Enter the email</Text>}
                    {emailValid && <Text style={{
                      color: 'red', textAlign: 'left',
                      marginTop: blockMarginHalf,
                      fontFamily: 'SFCompactDisplay-Medium',
                      fontSize: scalable(12)
                    }}>Please Enter Valid email</Text>}
                  </View>


                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.confirmbutton]}
                      onPress={() => this.inputValidation()}>
                      <Text style={styles.confirmtext}>Update</Text>
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
        </View>
      </SafeAreaView>
    );
  }

}
