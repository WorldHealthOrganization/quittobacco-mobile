/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';


import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight, SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Dialog, { DialogTitle, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import Toast from 'react-native-simple-toast';
import { MultiPickerMaterialDialog, SinglePickerMaterialDialog } from 'react-native-material-dialog';

import ReactNativePickerModule from "react-native-picker-module"
export default class Change_tobacco_data extends Component {
  constructor(props) {
    super(props);

    this.pick_first_tobacco = React.createRef()

    this.state = {
      money_spent: '',
      tobacco_count: '',
      first_tobacco: '',
      firsttobacco: [],
      visible: false,
      visible1: false,
      visible2: false,
      _pick_first_tobacco:false,
      isHidden: false,
      currency: '',
      symbol: '',

      first_tobacco_data: '',

    };
  }
  componentDidMount = () => {
    this.getData();
    this.onGetFirst();
    this.show();
  };

  getData = async () => {
    try {
      const { navigation } = this.props;
      // const UserId = navigation.getParam('UserId', 'Id');
      //const MobileNo = navigation.getParam('MobileNumber', 'No');
      //const CountryCode = navigation.getParam('CountryCode', 'CC');
      //const Password = navigation.getParam('Password', 'Pwd');

      let LoginId = await AsyncStorage.getItem('LoginId');

      let MobileNo = await AsyncStorage.getItem('UserMobileNo');
      let CountryCode = await AsyncStorage.getItem('CountryCode');
      let Password = await AsyncStorage.getItem('Password');
      let Money_Spent = await AsyncStorage.getItem('Money_Spent');
      let Tobacco_Count = await AsyncStorage.getItem('Tobacco_Count');
      let First_Smoke = await AsyncStorage.getItem('First_Smoke');

      // const MobileNumber = navigation.getParam('MobileNumber', 'MobileNumber');

      this.setState({ email_or_phone: MobileNo });
      this.setState({ id: LoginId });
      this.setState({ country_code: CountryCode });

      this.setState({ password: Password });

      let otpState = await AsyncStorage.getItem('OtpState');
      this.setState({ otpState: otpState });

    } catch (error) {
      console.log(error);
    }
  };



  show = async () => {

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.userInfoshow, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          this.setState({ money_spent: response.data.data.money_spent + '' });
          this.setState({ tobacco_count: response.data.data.tobacco_count + '' });
          this.setState({ first_tobacco: response.data.data.first_smoke_timing.Occurence });
          this.setState({ first_tobacco_data: response.data.data.first_smoke_timing.Occurence });
          this.setState({ symbol: response.data.data.symbol });
          this.setState({ currency: response.data.data.currency });

          AsyncStorage.setItem('Currency_Symbol', response.data.data.symbol)
          AsyncStorage.setItem('Currency_Abrv', response.data.data.currency)
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }


  onGetFirst = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.first_smoke_timings, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        if (response.data.status == 200) {

          const obj = [];


          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].Occurence,
            });
          }

          this.setState({ firsttobacco: obj });
        }
      })
      .catch((error) => {

        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }


  Updatedata = async () => {

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    const { money_spent, tobacco_count, first_tobacco_id } = this.state;

    this.setState({ visible: false });
    this.setState({ visible1: false });
    this.setState({ visible2: false });

    axios
      .post(
        ApiName.userInfoupdate,
        {

          money_spent: money_spent,
          tobacco_count: tobacco_count,
          first_smoke_timing_id: first_tobacco_id,

        },
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false })

        if (response.data.status == 200) {

          AsyncStorage.setItem(
            'JwtToken',
            'Bearer ' + response.data.jwt_token,
          );

          Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }

  render() {
    const { money_spent, tobacco_count, first_tobacco, firsttobacco, Money_Spent, isHidden } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View
          style={{
            flex: 1,
            height: deviceHeight,
            width: '100%',
            flexDirection: 'column',
          }}>
          <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>

            <View style={{
              flexDirection: 'row', width: '100%', height: '12%',
              backgroundColor: '#0072BB',
            }}>
              <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>

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
              <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),
                  justifyContent: 'center',
                  textAlign: 'center',

                }}>Change Tobacco Data</Text>

              </View>
            </View>
            {/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout}>
                <TextInput style={styles.textInput} placeholder={'How many times you use tobacco in a day at present?'}  
                onChangeText={(value) => this.setState({usage_count: value})}
                value={this.state.usage_count}/>
                </TextInputLayout>
                <TextInputLayout focusColor="#0072BB" style={styles.inputLayout}>
                <TextInput style={styles.textInput} placeholder={'How many pieces do you use in a day?'}
                onChangeText={(value) => this.setState({tobacco_count: value})}
                value={this.state.tobacco_count}/>
                </TextInputLayout>
                <TextInputLayout focusColor="#0072BB" style={styles.inputLayout}>
                <TextInput style={styles.textInput} placeholder={'How much do you spend on tobacco products in a day?'}
                 onChangeText={(value) => this.setState({money_spent: value})}
                 value={this.state.money_spent}/>
                </TextInputLayout> */}
            <Text style={{ color: '#202020', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3 }}>How much money do you spend on tobacco products in a day?</Text>
            <TouchableOpacity onPress={() => { this.setState({ visible: true }); }}>
              <View style={{ flexDirection: 'row' }}>


                <Text style={{ color: '#0072BB', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2 }}>{this.state.symbol} {money_spent != '' && money_spent != null ? money_spent : '0'}</Text>

                <Image source={require('../../images/down_arrow.png')} style={{
                  width: 10,
                  height: 8,
                  marginTop: blockMarginHalf * 2,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  marginLeft: blockMarginHalf * 2
                }} />

                <Dialog
                  width={0.8}
                  // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                  containerStyle={{ zIndex: 10, elevation: 10 }}
                  dialogStyle={{ backgroundColor: '#FFFFFF' }}
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({ visible: false });
                  }}
                >
                  <DialogContent>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                        <TouchableOpacity onPress={() => this.setState({ visible: false })} style={{ alignItems: 'flex-end' }}>
                          <Image style={{ resizeMode: 'contain', width: 12, height: 13, marginTop: blockMarginHalf * 2 }} source={require('../../images/close.png')}></Image></TouchableOpacity>
                        <Text style={{ color: '#202020', textAlign: 'center', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginTop: blockMarginHalf * 2 }}>How much money do you spend on tobacco products in a day?</Text>

                        <TextInput style={{ width: '80%', height: 45, color: '#0072BB', fontSize: scalable(14), fontFamily: 'SFCompactDisplay-Medium', justifyContent: 'center', alignSelf: 'center' }}
                          placeholder=""
                          placeholderTextColor="#0072BB"
                          autoCorrect={false}
                          value={this.state.money_spent + ''}
                          underlineColorAndroid="transparent"
                          onChangeText={(value) => this.setState({ money_spent: value + '' })}

                          returnKeyType="done"
                          keyboardType="numeric"
                        />
                        <View style={{
                          marginTop: 1,
                          borderBottomWidth: responsiveWidth(0.30),
                          borderBottomColor: '#B6C0CB',
                          width: '80%', justifyContent: 'center', alignSelf: 'center'
                        }} />
                        <View>
                          <TouchableHighlight
                            style={{
                              width: 200,
                              height: 38,
                              borderRadius: 30,
                              backgroundColor: '#0072BB',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              marginTop: blockMarginHalf * 2,
                            }}
                            onPress={() => this.Updatedata()}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'SFCompactDisplay-Medium',
                                fontSize: responsiveFontSize(2),
                              }}>
                              okay
                            </Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </DialogContent>
                </Dialog>




              </View>
            </TouchableOpacity>


            {/* <Text style={{ color: '#202020', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3 }}>How many pieces of chewing tobacco or cigarettes do you use daily? </Text>
            <TouchableOpacity onPress={() => { this.setState({ visible1: true }); }}>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ color: '#0072BB', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2 }}>{tobacco_count != '' && tobacco_count != null ? tobacco_count : '0'}</Text>


                <Image source={require('../../images/down_arrow.png')} style={{
                  width: 10,
                  height: 8,
                  marginTop: blockMarginHalf * 2,
                  alignSelf: 'center', justifyContent: 'center', marginLeft: blockMargin,
                  resizeMode: 'contain',
                }} />


                <Dialog
                  width={0.8}
                  // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                  containerStyle={{ zIndex: 10, elevation: 10 }}
                  dialogStyle={{ backgroundColor: '#FFFFFF' }}
                  visible={this.state.visible1}
                  onTouchOutside={() => {
                    this.setState({ visible1: false });
                  }}
                >
                  <DialogContent>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                        <TouchableOpacity onPress={() => this.setState({ visible1: false })} style={{ alignItems: 'flex-end' }}>
                          <Image style={{ resizeMode: 'contain', width: 12, height: 13, marginTop: blockMarginHalf * 2 }} source={require('../../images/close.png')}></Image></TouchableOpacity>
                        <Text style={{ color: '#202020', textAlign: 'center', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginTop: blockMarginHalf * 2 }}>How many pieces of chewing tobacco or cigarettes do you use daily? </Text>

                        <TextInput style={{ width: '80%', height: 45, color: '#0072BB', fontSize: scalable(14), fontFamily: 'SFCompactDisplay-Medium', justifyContent: 'center', alignSelf: 'center' }}
                          placeholder=""
                          placeholderTextColor="#0072BB"
                          autoCorrect={false}
                          maxLength={2}
                          underlineColorAndroid="transparent"
                          onChangeText={(value) => this.setState({ tobacco_count: value })} value={this.state.tobacco_count}
                          returnKeyType="done"
                          keyboardType="numeric"
                        />
                        <View style={{
                          marginTop: 1,
                          borderBottomWidth: responsiveWidth(0.30),
                          borderBottomColor: '#B6C0CB',
                          width: '80%', justifyContent: 'center', alignSelf: 'center'
                        }} />


                        <View>
                          <TouchableHighlight
                            style={{
                              width: 200,
                              height: 38,
                              borderRadius: 30,
                              backgroundColor: '#0072BB',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              marginTop: blockMarginHalf * 2,
                            }}
                            onPress={() => this.Updatedata()}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'SFCompactDisplay-Medium',
                                fontSize: responsiveFontSize(2),
                              }}>
                              okay
                            </Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </DialogContent>
                </Dialog>


              </View>
            </TouchableOpacity> */}
            <Text style={{ color: '#202020', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3 }}>How many pieces of chewing tobacco or cigarettes do you use daily? </Text>

            <TouchableOpacity onPress={() => { this.setState({ visible1: true }); }}>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ color: '#0072BB', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2 }}>{tobacco_count != '' && tobacco_count != null ? tobacco_count : '0'}</Text>


                <Image source={require('../../images/down_arrow.png')} style={{
                  width: 10,
                  height: 8,
                  marginTop: blockMarginHalf * 2,
                  alignSelf: 'center', justifyContent: 'center', marginLeft: blockMargin,
                  resizeMode: 'contain',
                }} />


                <Dialog
                  width={0.8}
                  // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                  containerStyle={{ zIndex: 10, elevation: 10 }}
                  dialogStyle={{ backgroundColor: '#FFFFFF' }}
                  visible={this.state.visible1}
                  onTouchOutside={() => {
                    this.setState({ visible1: false });
                  }}
                >
                  <DialogContent>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                        <TouchableOpacity onPress={() => this.setState({ visible1: false })} style={{ alignItems: 'flex-end' }}>
                          <Image style={{ resizeMode: 'contain', width: 12, height: 13, marginTop: blockMarginHalf * 2 }} source={require('../../images/close.png')}></Image></TouchableOpacity>
                        <Text style={{ color: '#202020', textAlign: 'center', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginTop: blockMarginHalf * 2 }}>How many pieces of chewing tobacco or cigarettes do you use daily? </Text>

                        <TextInput style={{ width: '80%', height: 45, color: '#0072BB', fontSize: scalable(14), fontFamily: 'SFCompactDisplay-Medium', justifyContent: 'center', alignSelf: 'center' }}
                          placeholder=""
                          placeholderTextColor="#0072BB"
                          autoCorrect={false}
                          maxLength={2}
                          underlineColorAndroid="transparent"
                          onChangeText={(value) => this.setState({ tobacco_count: value })} value={this.state.tobacco_count}
                          returnKeyType="done"
                          keyboardType="numeric"
                        />
                        <View style={{
                          marginTop: 1,
                          borderBottomWidth: responsiveWidth(0.30),
                          borderBottomColor: '#B6C0CB',
                          width: '80%', justifyContent: 'center', alignSelf: 'center'
                        }} />


                        <View>
                          <TouchableHighlight
                            style={{
                              width: 200,
                              height: 38,
                              borderRadius: 30,
                              backgroundColor: '#0072BB',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              marginTop: blockMarginHalf * 2,
                            }}
                            onPress={() => this.Updatedata()}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'SFCompactDisplay-Medium',
                                fontSize: responsiveFontSize(2),
                              }}>
                              okay
                            </Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </DialogContent>
                </Dialog>
                



              </View>
            </TouchableOpacity>



            <Text style={{ color: '#202020', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3 }}>How soon after you wake up do you use tobacco?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { this.setState({ visible2: true }); }}>
                <Text style={{ color: '#0072BB', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2 }}>{first_tobacco}</Text>
              </TouchableOpacity>



              <Dialog
                width={0.8}
                // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                containerStyle={{ zIndex: 10, elevation: 10 }}
                dialogStyle={{ backgroundColor: '#FFFFFF' }}
                visible={this.state.visible2}
                onTouchOutside={() => {
                  this.setState({ visible2: false });
                }}
              >
                <DialogContent>
                  <View>
                    <TouchableOpacity onPress={() => this.setState({ visible2: false })} style={{ alignItems: 'flex-end' }}>
                      <Image style={{ resizeMode: 'contain', width: 12, height: 13, marginTop: blockMarginHalf * 2 }} source={require('../../images/close.png')}></Image></TouchableOpacity>
                    <Text style={{ color: 'black', textAlign: 'center', fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), marginTop: blockMarginHalf * 2, lineHeight: deviceHeight / 25 }}>Please Select One</Text>


                    <TouchableOpacity onPress={() => { firsttobacco.length > 0 && this.setState({_pick_first_tobacco : true}) }} >
                      <View style={{
                        flexDirection: 'row',
                        width: responsiveWidth(60),
                        marginLeft: responsiveWidth(7), marginRight: responsiveWidth(4), marginTop: blockMarginHalf * 2, alignItems: 'center'
                      }}>
                        <Text style={{
                          color: 'black', fontFamily: 'SFCompactDisplay-Regular',
                          fontSize: 14, width: responsiveWidth(75),
                        }}>{this.state.first_tobacco_data != '' ? this.state.first_tobacco_data : 'Select Answer'}</Text>


                        <Image source={require('../../images/down_arrow.png')} style={{
                          width: responsiveWidth(2),
                          height: responsiveHeight(4),
                          marginLeft: responsiveWidth(2),
                          resizeMode: 'contain',
                        }} />
                      </View>
                    </TouchableOpacity>


                    <View style={{
                      marginTop: 1,
                      borderBottomWidth: responsiveWidth(0.30),
                      borderBottomColor: '#B6C0CB',
                      width: '80%', justifyContent: 'center', alignSelf: 'center'
                    }} />

                    <View>
                      <TouchableHighlight
                        style={{
                          width: 200,
                          height: 38,
                          borderRadius: 30,
                          backgroundColor: '#0072BB',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: blockMarginHalf * 4,
                        }}
                        onPress={() => this.Updatedata()}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: responsiveFontSize(2),
                          }}>
                          okay
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </DialogContent>
              </Dialog>

              <Image source={require('../../images/down_arrow.png')} style={{
                width: 10,
                height: 8,
                marginTop: blockMarginHalf * 2,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginLeft: blockMarginHalf * 2
              }} />
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

        <SinglePickerMaterialDialog
            title={'Select Answer'}
            items={firsttobacco}
            colorAccent={'#0072BB'}
            cancelLabel={'Cancel'}
            okLabel={'Confirm'}
            visible={this.state._pick_first_tobacco}
            selectedItem={this.state.first_tobacco_data}
            onCancel={() => this.setState({ _pick_first_tobacco: false })}
            onOk={value => {
                // this.setState({ education_Visible: false });
                // this.setState({ education_data: result.selectedItem.label, education: result.selectedItem.value });

                // for (var i = 0; i < firsttobacco.length; i++) {
                  // if (firsttobacco[i].value == value) {
                    this.setState({ first_tobacco: value.selectedItem.label });
                    this.setState({ first_tobacco_id: value.selectedItem.value });
                    this.setState({ first_tobacco_data: value.selectedItem.label })
                    this.setState({ _pick_first_tobacco: false })
                  // }
    
                // }
            }}
            

            // onValueChange={value => {

            //   let branch = firsttobacco.find((item) => item.value === value);
  
  
            //   for (var i = 0; i < firsttobacco.length; i++) {
            //     if (firsttobacco[i].value == value) {
            //       this.setState({ first_tobacco: firsttobacco[i].label });
            //       this.setState({ first_tobacco_id: firsttobacco[i].value });
            //       this.setState({ first_tobacco_data: firsttobacco[i].label })
            //     }
  
            //   }
            // }}
        />


        {/* <ReactNativePickerModule
          pickerRef={this.pick_first_tobacco}
          // ref={this.pick_first_tobacco}
          value={this.state.first_tobacco_data}
          title={"Select Answer"}
          items={firsttobacco}
          titleStyle={{ color: "white", fontFamily: 'SFCompactDisplay-Medium', }}
          itemStyle={{ color: "white", fontFamily: 'SFCompactDisplay-Medium', }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {

            let branch = firsttobacco.find((item) => item.value === value);


            for (var i = 0; i < firsttobacco.length; i++) {
              if (firsttobacco[i].value == value) {
                this.setState({ first_tobacco: firsttobacco[i].label });
                this.setState({ first_tobacco_id: firsttobacco[i].value });
                this.setState({ first_tobacco_data: firsttobacco[i].label })
              }

            }
          }}
        /> */}
      </SafeAreaView>
    );
  }
}