/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Notifications/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'date-fns/format';

import {
  View,
  Image,
  Text,TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import ToggleSwitch from 'toggle-switch-react-native';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Toast from 'react-native-simple-toast';
import moment from 'moment';


export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
                switch1Value: 0,
                switch2Value: 0,
                switch3Value: 0,
                switch4Value: 0,
                diarytime:'6.30 AM',
                isDateTimePickerVisible: false,
                isDateTimePickerVisible1: false,
                missiontime:'8:00 AM',
                diary_remainder_time:'',
                diary_remainder_time_api: '',
                mission_remainder_time:'',
                mission_remainder_time_api:'',
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

     
      // const { title, description, image, } = this.state;


  console.log('link ==>' + ApiName.view_notifications)
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
          
          console.log('Notifications response ', JSON.stringify(response.data));
  
          if (response.data.status == 200) {
            let diarydate_remainder = response.data.data.diary_remainder_time;
            let diarydate_disp = moment(diarydate_remainder, ["HH.mm:ss"]).format("hh:mm A");
            console.log('Diary DISP Date: ' + diarydate_disp)
            this.setState({ diary_remainder_time: diarydate_disp})

            let missiondate_remainder = response.data.data.mission_remainder_time;
            let missiondate_disp = moment(missiondate_remainder, ["HH.mm:ss"]).format("hh:mm A");
            console.log('Mission DISP Date: ' + missiondate_disp)

            this.setState({ diary_remainder_time: diarydate_disp})
            this.setState({ mission_remainder_time: missiondate_disp})
            this.setState({ diary_remainder_time_api: response.data.data.diary_remainder_time})
            this.setState({ mission_remainder_time_api: response.data.data.mission_remainder_time})
            this.setState({ switch1Value: response.data.data.diary_remainder})
            this.setState({ switch2Value: response.data.data.mission_remainder})
            this.setState({ switch3Value: response.data.data.badge})
            this.setState({ switch4Value: response.data.data.general_alert})
            this.setState({ isHidden: false })

            // Toast.show(response.data.message);
          }
          else {
            console.log(response.data.message);
            this.setState({ isHidden: false })
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')
          console.log('reactNativeDemo axios error:', error);
        });
    }

    Update_Notifications = async () => {
      let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
      console.log('Diary time' + diary_remainder_time_api)
      console.log('Mission time' + mission_remainder_time_api)
      this.setState({isHidden: true});
      const {
        diary_remainder_time_api,
        mission_remainder_time_api,
        switch1Value,
        switch2Value,
        switch3Value,
        switch4Value,
        
      } = this.state;
  
      
  
      axios
        .post(
          ApiName.update_notifications,
          {
            diary_remainder:switch1Value,
            diary_remainder_time:diary_remainder_time_api,
            mission_remainder:switch2Value,
            mission_remainder_time:mission_remainder_time_api,
            badge:switch3Value,
            general_alert:switch4Value,
          },
          {
            headers: {
              Authorization: jwt_token,
            },
          },
        )
        .then((response) => {
          console.log(
            'Update Notification response ',
            'response get details:==> ' + JSON.stringify(response.data),
          );
  
          if (response.data.status == 200) {
            this.setState({isHidden: false});
            Toast.show(response.data.message);
          
          } else {
            this.setState({isHidden: false});
            Toast.show(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({isHidden: false});
          Toast.show('There was some error. Please try again')
          console.log('reactNativeDemo axios error:', error);
        });
    };
  

    toggleSwitch1 = (value) => {
        this.Update_Notifications();
        console.log('Switch 1 is: ' + value);
        if(value){
          this.setState({switch1Value: 1});
        }
        else {
          this.setState({switch1Value: 0});
        }
     }
     toggleSwitch2 = (value) => {
      this.Update_Notifications();
      console.log('Switch 2 is: ' + value);
      if(value){
        this.setState({switch2Value: 1});
      }
      else {
        this.setState({switch2Value: 0});
      }
   }
   toggleSwitch3 = (value) => {
    this.Update_Notifications();
    console.log('Switch 3 is: ' + value);
    if(value){
      this.setState({switch3Value: 1});
    }
    else {
      this.setState({switch3Value: 0});
    }
 }
 toggleSwitch4 = (value) => {
  this.Update_Notifications();
  console.log('Switch 4 is: ' + value);
  if(value){
    this.setState({switch4Value: 1});
  }
  else {
    this.setState({switch4Value: 0});
  }
}



_showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _showDateTimePicker1 = () => this.setState({isDateTimePickerVisible1: true});

  _hideDateTimePicker1 = () => this.setState({isDateTimePickerVisible1: false});

 

_handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    let diarydate = dateFormat(date, 'hh:mm a');
    let diarydate_api = moment(date, ["h:mm A"]).format("HH:mm:ss");
    console.log('Diary API Date: ' + diarydate_api)
    this.setState({diary_remainder_time: diarydate});
    this.setState({diary_remainder_time_api: diarydate_api});

    this.Update_Notifications();
    this._hideDateTimePicker();
  };

_handleDatePicked1 = (date) => {
    console.log('A date has been picked: ', date);
    let missiondate = dateFormat(date, 'hh:mm a');
    let missiondate_api = moment(date, ["h:mm A"]).format("HH:mm:ss");
    console.log('Mission API Date: ' + missiondate_api)
    this.setState({mission_remainder_time: missiondate});
    this.setState({mission_remainder_time_api: missiondate_api});

    this.Update_Notifications();
    this._hideDateTimePicker1();
  };

render() {
    const {switch1Value,switch2Value,switch3Value,switch4Value,diary_remainder_time,mission_remainder_time,isHidden} = this.state;

    
    
    return (
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
              fontFamily: 'SF-Medium',
              fontSize: scalable(18),
              justifyContent: 'center',
              textAlign: 'center',

            }}>Notifications</Text>

          </View>
          </View>
                           <View style={{flex: 0.12,flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
                              <Text style={styles.text}>Dairy Reminder</Text>
                             </View>
                           <View style={styles.switch}>
                           <ToggleSwitch
  isOn={switch1Value}
  onColor="#0072BB"
  offColor="#CBE2F1"
  trackOnStyle={styles.trackOnStyle}
  trackColor={{ false: "red", true: "#CBE2F1" }}
  label=""
  labelStyle={{ color: "black", fontWeight: "900",marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
  size="medium"
  onToggle={this.toggleSwitch1}
/>
</View>
</View>
 {/* <Switch
         onValueChange = {this.toggleSwitch1}
         value = {switch1Value}
         thumbColor={switch1Value ? "#0072BB" : "#CBE2F1"}
         trackColor={{ false: "#f4f3f4", true: "#CBE2F1" }}
         size="large"
         /> */}

<View style={{flex: 0.1,flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
                              <Text style={styles.text}>Set Diary Reminder Time</Text>
                             </View>
                             
                           <View style={styles.switch}>
                           <TouchableOpacity onPress={this._showDateTimePicker}>
                           <Image  source={require('../../images/next_arrow.png')}/>
                           </TouchableOpacity>

</View>

<DateTimePicker
                      mode="time"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />


</View>
<View style={{marginTop: responsiveHeight(1)}}>
<Text style={styles.text2}>You will be notified everyday on the set time{'\n'}({diary_remainder_time}) to complete your diary . You can tap to change the reminder time.</Text>
</View>




<View style={{flex: 0.12,flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
                              <Text style={styles.text}>Mission Reminder</Text>
                             </View>
                           <View style={styles.switch}>
                           <ToggleSwitch 
  isOn={switch2Value}
  onColor="#0072BB"
  offColor="#CBE2F1"
  trackOnStyle={styles.trackOnStyle}
  trackColor={{ false: "red", true: "#CBE2F1" }}
  label=""
  labelStyle={{ color: "black", fontWeight: "900",marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
  size="medium"
  onToggle={this.toggleSwitch2}
/>
</View>
</View>
 {/* <Switch
         onValueChange = {this.toggleSwitch1}
         value = {switch1Value}
         thumbColor={switch1Value ? "#0072BB" : "#CBE2F1"}
         trackColor={{ false: "#f4f3f4", true: "#CBE2F1" }}
         size="large"
         /> */}

<View style={{flex: 0.1,flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
                              <Text style={styles.text}>Set Mission Reminder Time</Text>
                             </View>
                           <View style={styles.switch}>
                           <TouchableOpacity onPress={this._showDateTimePicker1}>
                           <Image  source={require('../../images/next_arrow.png')}/>
                           </TouchableOpacity>
</View>

<DateTimePicker
                      mode="time"
                      isVisible={this.state.isDateTimePickerVisible1}
                      onConfirm={this._handleDatePicked1}
                      onCancel={this._hideDateTimePicker1}
                    />


</View>
<View style={{marginTop: responsiveHeight(1)}}>
<Text style={styles.text2}>You will be notified everyday on the set time{'\n'}({mission_remainder_time}) with the mission set. You can tap to change the reminder time.</Text>
</View>

<View style={{flex: 0.12,flexDirection: 'row', width: '100%'}}>
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
  labelStyle={{ color: "black", fontWeight: "900",marginLeft: responsiveWidth(10), marginHorizontal: responsiveWidth(25), marginTop: responsiveHeight(5) }}
  size="medium"
  onToggle={this.toggleSwitch3}
/>
</View>
</View>

<View style={{flex: 0.12,flexDirection: 'row', width: '100%'}}>
                             <View style={{flex:0.9}}>
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
              color="#3283F1"
              animating={true}
              backgroundColor={'transparent'}
            />
          </View>
        ) : null}

        </View>
    );
}
}
