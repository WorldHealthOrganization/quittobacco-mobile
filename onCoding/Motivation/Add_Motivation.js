/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
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
  Alert,
  TextInput,
  Platform,ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';
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
    };
  }

  componentDidMount = async () => {
    //let motivationId = await AsyncStorage.getItem('MotivationId');
    //alert(motivationId);
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

  chooseFile = () => {
    const {motivationImg} = this.state;
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
      } else {
        // let source = response;
        console.log('filePath ==> ' + JSON.stringify(response.uri));

        ImgToBase64.getBase64String(response.uri)
          .then((base64String) =>
            this.setState({
              base64String: base64String,
            }),
          )
          // eslint-disable-next-line no-undef
          .catch((err) => doSomethingWith(err));
        // let jj = [];
        // let obj = {
        //   uri: response.uri,
        //   type: response.type,
        //   name: response.fileName,
        // };
        // jj.push(obj);
        // this.setState({
        //   base64String: obj,
        // });
        this.setState({
          motivationImg: response.uri,
          fileName: response.fileName,
        });
        // alert(this.state.motivationImg);
        console.log('motivationImg ==> ' + JSON.stringify(motivationImg));
      }
    });
  };

  inputValidation(){
    const {notes, base64String,motivationImg} = this.state;
//     if ( base64String.trim() == ''){
// Toast.show('Please select a image')
//     }
// else 
if(notes.trim() == ''){
  Toast.show('Please add the motivation to quit')
}else{
      this.add_motivation()
    }
  }

  add_motivation = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let motivationState = await AsyncStorage.getItem('MotivationState');
    let motivationId = await AsyncStorage.getItem('MotivationId');
    const {notes, base64String} = this.state;
    this.setState({isHidden: true});
    console.log('add_motivation input ==> ' + notes + ' ' + base64String + ' ');

    let inputapiname = ApiName.add_motivation;
    if (motivationState == 1) {
      inputapiname = ApiName.update_motivation + motivationId + '/update';
    } else {
      inputapiname = ApiName.add_motivation;
    }
    // const formEvent = new FormData();
    // formEvent.append('motivation_request', notes);
    // formEvent.append('image', base64String);
    // console.log('formEvent == ' + JSON.stringify(formEvent));
    axios
      .post(
        inputapiname,
        {
          //formEvent,
          motivation_request: notes,
          image: base64String,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        console.log(
          'add_motivation response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

        // Toast.show(response.data.message);

        if (response.data.status == 200) {
          this.setState({isHidden: false});
          Toast.show(response.data.message);
          this.props.navigation.goBack();
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  };
  render() {
    const {isHidden} = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: responsiveHeight(10),
            backgroundColor: '#0072BB',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '12%',
              left: 0,
              position:'absolute',
              height: responsiveHeight(4),
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{
                width: responsiveWidth(3),
                height: responsiveHeight(4),
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('../../images/back_arrow.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              width: '88%',
              color: '#FFFFFF',
              fontFamily: 'SF-Medium',
              fontSize: scalable(18),
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Motivation
          </Text>
        </View>
        <ScrollView   keyboardShouldPersistTaps={'handled'}>
          <View style={styles.view}>

            <View style={styles.view2}>
              <View style={{flex: 1, marginTop: responsiveHeight(35)}}>
                {this.state.motivationImg != '' ? (
                  <View style={styles.square}>
                    <TouchableOpacity
                      style={styles.square2}
                      onPress={this.chooseFile.bind(this)}>
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
                      style={styles.fab}
                      onPress={this.chooseFile.bind(this)}>
                      <Text style={styles.text_fab}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>TAP TO ADD IMAGE</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.view1}>
            <Text style={{ color: '#000',
    fontSize: scalable(14),
    fontFamily: 'SF-Medium',
    fontWeight: 'bold',
    width: '100%',textAlign:'center',margin: blockMargin}}>What's your single biggest reason for quitting Tobacco?</Text>
              <TextInput
                style={styles.text2}
                placeholder="Add your motivation to Quit"
                placeholderTextColor="#B6C0CB"
                autoCorrect={false}
                returnKeyType="done"
                multiline={true}
                underlineColorAndroid="transparent"
                onChangeText={(value) => this.setState({notes: value})}
                value={this.state.notes}
              />
              <View style={styles.view4} />

                          
{isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
             position:'absolute',
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
            {/* <View style={{flex:0.5,justifyContent: 'center'}}>
        <Image  source={
                      this.state.motivationImg != ''
                        ? {uri: this.state.motivationImg}
                        : require('../../images/ITU_Logo.png')
                    } style={styles.img} />
        </View> */}
            <View style={{marginTop: 50}}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.confirmbutton]}
                onPress={() => this.inputValidation()}>
                <Text style={styles.confirmtext}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
