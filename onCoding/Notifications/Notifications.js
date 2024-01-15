/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Notifications/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'date-fns/format';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Image,
  Text, TouchableOpacity,
  ActivityIndicator, SafeAreaView, ScrollView
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import ToggleSwitch from 'toggle-switch-react-native';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { tr } from 'date-fns/locale';


export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1Value: false,
      switch2Value: false,
      switch3Value: false,
      switch4Value: false,
      diarytime: '6.30 PM',
      isDateTimePickerVisible: false,
      isDateTimePickerVisible1: false,
      missiontime: '8:00 AM',
      diary_remainder_time: '',
      diary_remainder_time_api: '',
      mission_remainder_time: '',
      mission_remainder_time_api: '',
      isHidden: false,

    };
  }


  componentDidMount = () => {

    this.Notifications();
    // this.List_Notifications();

  };




  Notifications = async () => {

    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })

    axios
      .post(
        ApiName.view_notifications, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false })

        if (response.data.status == 200) {
          let diarydate_remainder = response.data.data.diary_remainder_time;
          let diarydate_disp = moment(diarydate_remainder, ["HH:mm"]).format("hh:mm A");
          console.log('DISP')
          this.setState({ diary_remainder_time: diarydate_disp })

          let missiondate_remainder = response.data.data.mission_remainder_time;
          let missiondate_disp = moment(missiondate_remainder, ["HH:mm"]).format("hh:mm A");
          console.log('DISPM')


          this.setState({ diary_remainder_time: diarydate_disp })
          this.setState({ mission_remainder_time: missiondate_disp })
          this.setState({ diary_remainder_time_api: response.data.data.diary_remainder_time })
          this.setState({ mission_remainder_time_api: response.data.data.mission_remainder_time })

          if (response.data.data.diary_remainder == 1 || response.data.data.diary_remainder == '1') {
            this.setState({ switch1Value: true })
          }


          if (response.data.data.mission_remainder == 1 || response.data.data.mission_remainder == '1') {
            this.setState({ switch2Value: true })
          }


          if (response.data.data.general_alert == 1 || response.data.data.general_alert == '1') {
            this.setState({ switch4Value: true })
          }


        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  }

  Update_Notifications = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true });
    const {
      diary_remainder_time_api,
      mission_remainder_time_api,
      switch1Value,
      switch2Value,
      switch3Value,
      switch4Value,

    } = this.state;

    let general_alert = 0;
    let diary_alert = 0;
    let mission_alert = 0;


    if (switch1Value) {
      diary_alert = 1;
    } else {
      diary_alert = 0;
    }

    if (switch2Value) {
      mission_alert = 1;
    } else {
      mission_alert = 0;
    }

    if (switch4Value) {
      general_alert = 1;
    } else {
      general_alert = 0;
    }


    axios
      .post(
        ApiName.update_notifications,
        {


          diary_remainder: diary_alert,
          diary_remainder_time: diary_remainder_time_api,
          mission_remainder: mission_alert,
          mission_remainder_time: mission_remainder_time_api,
          badge: 1,
          general_alert: general_alert,
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

        } else {

          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again')

      });
  };


  toggleSwitch1 = (value) => {


    if (value) {
      this.setState({ switch1Value: true });
    }
    else {
      this.setState({ switch1Value: false });
    }

    this.Update_Notifications();
  }
  toggleSwitch2 = (value) => {


    if (value) {
      this.setState({ switch2Value: true });
    }
    else {
      this.setState({ switch2Value: false });
    }

    this.Update_Notifications();
  }
  toggleSwitch3 = (value) => {

    if (value) {
      this.setState({ switch3Value: true });
    }
    else {
      this.setState({ switch3Value: false });
    }

    this.Update_Notifications();

  }
  toggleSwitch4 = (value) => {


    if (value) {
      this.setState({ switch4Value: true });
    }
    else {
      this.setState({ switch4Value: false });
    }

    this.Update_Notifications();
  }



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });



  _handleDatePicked = (date) => {

    let diarydate = dateFormat(date, 'hh:mm a');
    let diarydate_api = moment(date, ["h:mm A"]).format("HH:mm");
    console.log('DISPP')
    this.setState({ diary_remainder_time: diarydate });
    this.setState({ diary_remainder_time_api: diarydate_api });

    this.Update_Notifications();
    this._hideDateTimePicker();
  };

  _handleDatePicked1 = (date) => {

    let missiondate = dateFormat(date, 'hh:mm a');
    let missiondate_api = moment(date, ["h:mm A"]).format("HH:mm");
    console.log('DISPMP')
    this.setState({ mission_remainder_time: missiondate });
    this.setState({ mission_remainder_time_api: missiondate_api });

    this.Update_Notifications();
    this._hideDateTimePicker1();
  };

  render() {
    const { switch1Value, switch2Value, switch3Value, switch4Value, diary_remainder_time, mission_remainder_time, isHidden } = this.state;



    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: '100%',
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

                }}>Notifications and Reminders</Text>

              </View>
            </View>


            <ScrollView>
              <View style={{ flexDirection: 'column', width: '98%', marginBottom: 20, alignSelf: 'center', justifyContent: 'center' }}>



                <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                  <View style={{ flex: 0.94, flexDirection: 'row' }}>
                    <Image
                      style={{
                        width: 18, height: 20, marginTop: responsiveHeight(4.5),
                        marginLeft: responsiveWidth(4), tintColor: '#0072BB'
                      }}
                      resizeMode={'contain'}
                      tintColor={'#0072BB'}
                      source={require('../../images/bell.png')} />

                    <Text style={{
                      color: '#202020',
                      fontSize: responsiveFontSize(2.20),
                      color: '#0072BB',
                      fontFamily: 'SFCompactDisplay-Semibold',
                      marginTop: responsiveHeight(4.5),
                      marginLeft: responsiveWidth(1.5),
                      width: '100%',
                    }}>Allow Notifications & Reminders</Text>
                  </View>
                  <View style={styles.switch}>
                    <ToggleSwitch
                      isOn={switch4Value}
                      onColor="#0072BB"
                      offColor="#CBE2F1"
                      trackOnStyle={styles.trackOnStyle}
                      trackColor={{ false: "red", true: "#CBE2F1" }}
                      label=""
                      labelStyle={{ color: "black", marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
                      size="medium"
                      onToggle={this.toggleSwitch4}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ flex: 0.94 }}>
                    <Text style={styles.text}>Diary Reminder</Text>
                  </View>
                  <View style={styles.switch}>
                    <ToggleSwitch
                      isOn={switch1Value}
                      onColor="#0072BB"
                      offColor="#CBE2F1"
                      trackOnStyle={styles.trackOnStyle}
                      trackColor={{ false: "red", true: "#CBE2F1" }}
                      label=""
                      labelStyle={{ color: "black", marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
                      size="medium"
                      onToggle={this.toggleSwitch1}
                    />
                  </View>
                </View>

                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 0.94 }}>
                      <Text style={styles.text}>Set Diary Reminder Time</Text>
                    </View>
                    <View style={styles.switch}>

                      <Image
                        style={{ width: 18, height: 18 }}
                        resizeMode={'contain'}
                        source={require('../../images/next_arrow.png')} />

                    </View>

                    <DateTimePicker
                      mode="time"
                      headerTextIOS="Pick a time"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />


                  </View>
                </TouchableOpacity>

                <View style={{ marginTop: responsiveHeight(0) }}>
                  <Text style={styles.text2}>You will be notified everyday on the set time{'\n'}({diary_remainder_time}) to complete your diary . You can tap to change the reminder time.</Text>
                </View>




                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ flex: 0.94 }}>
                    <Text style={styles.text}>Plan Reminder</Text>
                  </View>
                  <View style={styles.switch}>
                    <ToggleSwitch
                      isOn={switch2Value}
                      onColor="#0072BB"
                      offColor="#CBE2F1"
                      trackOnStyle={styles.trackOnStyle}
                      trackColor={{ false: "red", true: "#CBE2F1" }}
                      label=""
                      labelStyle={{ color: "black", marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
                      size="medium"
                      onToggle={this.toggleSwitch2}
                    />
                  </View>
                </View>

                <TouchableOpacity onPress={this._showDateTimePicker1}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 0.94 }}>
                      <Text style={styles.text}>Set Plan Reminder Time</Text>
                    </View>
                    <View style={styles.switch}>

                      <Image
                        style={{ width: 18, height: 18 }}
                        resizeMode={'contain'}
                        source={require('../../images/next_arrow.png')} />

                    </View>

                    <DateTimePicker
                      mode="time"
                      headerTextIOS="Pick a Time"
                      isVisible={this.state.isDateTimePickerVisible1}
                      onConfirm={this._handleDatePicked1}
                      onCancel={this._hideDateTimePicker1}
                    />


                  </View>
                </TouchableOpacity>


                <View style={{ marginTop: responsiveHeight(1) }}>
                  <Text style={styles.text2}>You will be notified everyday on the set time{'\n'}({mission_remainder_time}) with the plan set. You can tap to change the reminder time.</Text>
                </View>
                {/* 
<View style={{flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
                              <Text style={styles.text}>Badge Notifications</Text>
                             </View>
                           <View style={styles.switch}>
                           <ToggleSwitch
  isOn={switch3Value}
  onColor="#0072BB"
  offColor="#CBE2F1"
  trackOnStyle={styles.trackOnStyle}
  trackColor={{ false: "red", true: "#CBE2F1" }}
  label=""
  labelStyle={{ color: "black",marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
  size="medium"
  onToggle={this.toggleSwitch3}
/>
</View>
</View> */}
                {/* 
<View style={{flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.94}}>
                              <Text style={styles.text}>General Alert Notifications</Text>
                             </View>
                           <View style={styles.switch}>
                           <ToggleSwitch 
  isOn={switch4Value}
  onColor="#0072BB"
  offColor="#CBE2F1"
  trackOnStyle={styles.trackOnStyle}
  trackColor={{ false: "red", true: "#CBE2F1" }}
  label=""
  labelStyle={{ color: "black", fontWeight: "900",marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
  size="medium"
  onToggle={this.toggleSwitch4}
/>
</View>
</View> */}


              </View>
            </ScrollView>
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
                color="#0072BB"
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
