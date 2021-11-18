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
  Alert,
  TextInput,
  Platform, ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'


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

      memberbase64Image: '',

      member_id: '',

      name: '',
      relation: '',
      mobnum: '',

    };
  }



  componentWillUnmount() { }


  componentDidMount = () => {


    this.getUser()
    this.permissionChk();

  }

  getUser = async () => {
    const{navigation} = this.props
    const user_id = await AsyncStorage.getItem('UserId');
    const user_name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');
    const member_id = navigation.getParam('MembersId', 'ID');

    if (token !== '' && member_id !== '') {
      this.setState({

        token: token,
        member_id: member_id
      });

      this.getMemberData()

    }
  };

  getMemberData = async () => {
   
    const { token,member_id } = this.state
    this.setState({ isHidden: true })
    axios
      .post(
       ApiName.updateMember+member_id+'/show', {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'get Member response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.setState({
            name: response.data.data.name,
            relation: response.data.data.relationship,
            mobnum: response.data.data.mobile,
            memberImageurl: response.data.data.image
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

  inputValidation = async () => {
    const {
     
      name,
      relation,
      mobnum,
      memberImage,  memberImageurl,numberValidLength, relationValid, numberValid, nameValidLength, nameValid
    } = this.state;

   if (name.trim() == '' || relation.trim() == '' || mobnum.trim() == '') {

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
      if (mobnum.trim() != '') {
        if (mobnum.length > 0) {
          this.setState({ numberValid: false })
          if (mobnum.length >= 8) {
            this.setState({ numberValidLength: false })
          } else {
            this.setState({ numberValidLength: true })
          }
        } else {
          this.setState({ numberValid: true })
        }
      } else {

        this.setState({ numberValid: true })

      }

    } else {
      if (numberValidLength || relationValid || numberValid || nameValidLength || nameValid) {
        Toast.show('Please enter the mandatory field');
      } else{
    
        if( memberImageurl.trim() != ''){
          this.addMemberData();
        }else if(memberImage.trim() == '' || memberImage.trim() == null){
            Toast.show('Please select a Image')
        }else{
          this.addMemberDataWithImage();
        }
        
      }
    }

  }


  addMemberData = async () => {

    const { name, relation, mobnum, memberbase64Image, token,member_id } = this.state;
    this.setState({ isHidden: true });
    console.log('input ==> ' + token + ' ' + name + ' ' + relation + ' ' + mobnum +   ApiName.updateMember+member_id+'/update');

    axios
      .post(
        ApiName.updateMember+member_id+'/update',
        {
          name: name,
          relationship: relation,
          mobile: mobnum,
          image: '',

        },
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Update without Image Member response ',
          JSON.stringify(response.data),
        );

        // Toast.show(response.data.message);

        if (response.data.status == 200) {
          this.setState({ isHidden: false });
          Toast.show(response.data.message)
          this.props.navigation.goBack();
        }
        else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }



  
  addMemberDataWithImage = async () => {

    const { name, relation, mobnum, memberbase64Image, token,member_id } = this.state;
    this.setState({ isHidden: true });
    console.log('Image ==> ' + JSON.stringify(this.state.memberImage) + ' -- ' + this.state.memberbase64Image);

    console.log('input with image==> ' + token + ' ' + name + ' ' + relation + ' ' + mobnum +   ApiName.updateMember+member_id+'/update');

    axios
      .post(
        ApiName.updateMember+member_id+'/update',
        {
          name: name,
          relationship: relation,
          mobile: mobnum,
          image: 'data:image/jpeg;base64, ' + memberbase64Image,

        },
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Updated Member response ',
          JSON.stringify(response.data),
        );

        // Toast.show(response.data.message);

        if (response.data.status == 200) {
          this.setState({ isHidden: false });
          Toast.show(response.data.message)
          this.props.navigation.goBack();
        }
        else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
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




  chooseFile = () => {
    
    this.permissionChk();
    var options = {
      title: 'Select Image',
      noData: true,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // let source = response;
        console.log('filePath ==> ' + JSON.stringify(response.path));

        this.setState({
          memberImageurl:'',
          memberImage: response.uri,
        });

        ImgToBase64.getBase64String(response.uri)
          .then((base64String) => {
            console.log('memberImage ==> ' + base64String)
            this.setState({
              memberbase64Image: base64String,
            });
          }
          )
          // eslint-disable-next-line no-undef
          .catch((err) => doSomethingWith(err));

        // alert(this.state.wishImage);
        console.log('memberImage ==> ' + JSON.stringify(this.state.memberImage) + ' -- ' + this.state.memberbase64Image);
      }
    });
  };

  render() {
    const { isHidden, nameValid, relationValid, numberValid, nameValidLength, numberValidLength } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <View style={styles.view2}>
            <View style={{
              flexDirection: 'row', width: '100%', marginTop: responsiveHeight(2),
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image style={styles.arrow} source={require('../../images/back_arrow.png')} />
              </TouchableOpacity>
              <Text style={styles.text_prg}>Edit Members</Text>
              {/* <Image style={styles.share_img2} source={require('../../images/share.png')}/> */}
            </View>

            <View style={{flex: 1, marginTop: responsiveHeight(35)}}>
         {this.state.memberImage != ''  ?


       <View style={styles.square}>
                <TouchableOpacity style={styles.square2} onPress={this.chooseFile.bind(this)}>

             <Image  source={{ uri: this.state.memberImage, cache: 'force-cache' }} style={styles.img} />
             </TouchableOpacity>
       </View>

       : this.state.memberImageurl != '' ?

       <View style={styles.square}>
       <TouchableOpacity style={styles.square2} onPress={this.chooseFile.bind(this)}>

    <Image  source={{ uri: 'http://whoapp.dci.in/uploads/files/' + this.state.memberImageurl, cache: 'force-cache' }} style={styles.img} />
    </TouchableOpacity>
</View> :  <View style={styles.square}>

<TouchableOpacity style={styles.fab} onPress={this.chooseFile.bind(this)}>
     <Text style={styles.text_fab}>+</Text>
   </TouchableOpacity>
   <Text style={styles.text}>TAP TO ADD IMAGE</Text>
</View>


    }

       </View>

          </View>
          <View style={styles.view1}>
            <TextInput style={styles.text2}
              placeholder="Name"
              placeholderTextColor="#B6C0CB"
              autoCorrect={false}
              returnKeyType="next"
              underlineColorAndroid="#B6C0CB"
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
            {nameValid && <Text style={{
              color: 'red', textAlign: 'left',

              fontFamily: 'SF-Medium',
              fontSize: scalable(9)
            }}>Please Enter the name</Text>}
            {nameValidLength && <Text style={{
              color: 'red', textAlign: 'left',

              fontFamily: 'SF-Medium',
              fontSize: scalable(9),
            }}>Please Enter atleast 3 characters</Text>}

            <TextInput style={styles.text2}
              ref={(input) => this.relation = input}
              placeholder="Relation"
              placeholderTextColor="#B6C0CB"
              autoCorrect={false}
              returnKeyType="next"
              underlineColorAndroid="#B6C0CB"
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
            {relationValid && <Text style={{
              color: 'red', textAlign: 'left',

              fontFamily: 'SF-Medium',
              fontSize: scalable(9),
            }}>Please Enter the Relationship</Text>}
            <TextInput style={styles.text2}
              ref={(input) => this.mobnum = input}
              placeholder="Mobile Number"
              keyboardType="numeric"
              placeholderTextColor="#B6C0CB"
              autoCorrect={false}
              returnKeyType="done"
              underlineColorAndroid="#B6C0CB"
              onChangeText={(mobnum) => {
                this.setState({ mobnum })
                if (mobnum.trim() != '') {
                  if (mobnum.length > 0) {
                    this.setState({ numberValid: false })
                    if (mobnum.length >= 8) {
                      this.setState({ numberValidLength: false })
                    } else {
                      this.setState({ numberValidLength: true })
                    }
                  } else {
                    this.setState({ numberValid: true })
                  }
                } else {


                  this.setState({ numberValid: true })
                  this.setState({ numberValidLength: false })

                }
              }

              } value={this.state.mobnum}
            />
            {numberValid && <Text style={{
              color: 'red', textAlign: 'left',

              fontFamily: 'SF-Medium',
              fontSize: scalable(9),
            }}>Please Enter the Mobile Number</Text>}
            {numberValidLength && <Text style={{
              color: 'red', textAlign: 'left',

              fontFamily: 'SF-Medium',
              fontSize: scalable(9),
            }}>Please Enter valid number</Text>}
          </View>


          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.confirmbutton]}
              onPress={() => this.inputValidation()}>
              <Text style={styles.confirmtext}>Update</Text>
            </TouchableOpacity>
          </View>
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
    );
  }

}
