/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Add_Cravings/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'

import Feather from 'react-native-vector-icons/Feather';
import dateFormat from 'date-fns/format';
import ToggleSwitch from 'toggle-switch-react-native';
// import SnapSlider from 'react-native-snap-slider';
import Slider from '@react-native-community/slider';
import ReactNativePickerModule from "react-native-picker-module"
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableHighlight, ActivityIndicator, SafeAreaView,TouchableWithoutFeedback,Keyboard
} from 'react-native';
import axios from 'react-native-axios';
import ApiName from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
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
  buttonPadding,
} from '../../ui/common/responsive';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog, {ScaleAnimation,DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';

import { min } from 'date-fns';
const labels = ['Not At All', 'Moderate', 'Too Strong'];
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';

const customStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize: 18,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#0072BB',
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: '#B6C0CB',
  stepStrokeUnFinishedColor: '#B6C0CB',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0072BB',
  stepIndicatorUnFinishedColor: '#B6C0CB',
  stepIndicatorCurrentColor: '#0072BB',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#0072BB',
  stepIndicatorLabelFinishedColor: '#0072BB',
  stepIndicatorLabelUnFinishedColor: '#FFFFFF',
  labelColor: '#202020',
  labelSize: responsiveFontSize(1.45),
  currentStepLabelColor: '#202020',
  labelFontFamily: 'SFCompactDisplay-Medium',
  labelAlign: 'center',
};

export default class Add_Cravings extends Component {
  constructor(props) {
    super(props);

    this.pick_timeCraving = React.createRef();
    this.pick_feelings = React.createRef()
    this.pick_people = React.createRef()

    this.state = {
      selTimeCraving:'',
      selFeelings:'',
      selPeople:'',
      isHidden: false,
    //userInfo
    user_id: '',
    user_name: '',
    mobile_no: '',
    email_id: '',
    profile_image: '',
    fcm: '',
    token: '',

    type: '',
    notification_id: '',


      value: 0,
      diary_date: '',
      inputDate: '',
      notes: '',
      craving_count: 1,
      currentPosition: 0,
      isSeleted: 2,
      isUseTobacco: false,
      isUse:'',
      // feelings:   [{"value":"5","label":"Feeling Low"},{"value":"4","label":"Lonely"},{"value":"3","label":"Bored"},{"value":"2","label":"Depressed"},{"value":"1","label":"Other"}],
      feelings : [],
      feelings_value: '',
      feelings_type: 0,
      feelings_other:'',
      doing:  [],
      doing_value: '',
      whom:  [{"value":"3","label":"Family"},{"value":"2","label":"Friends"},{"value":"1","label":"Other"}],
      whom_value: '',

      triggersYou: '',
      location: '',
      typeLocation:'',
      locValue: [
        {label:'Home', value: 'Home' },
        { label:'Office', value: 'Office' },
        { label:'Shopping', value: 'Shopping' },
        { label:'Outside', value: 'Outside' },
        { label:'Others', value: 'Others' }
      ],

      
      defaultItem: 0,

      time: 'Select Time',
      isTimePickerVisible: false,
      sliderValue: 1,
      locate_Visible : false,
      select_People : false,
      feeling_Visible : false,
    };
  }


  
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    //AppState.removeEventListener('change', this._handleAppStateChange);
    this.focusListener.remove();
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearTimeout(this.t);

  }

  componentDidMount = () => {

    //AppState.addEventListener('change', this._handleAppStateChange);
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {

      this.getUser()
      this.setState({ count: 0 });
    });

  }




  getUser = async () => {

    const {navigation} = this.props
    const user_id = await AsyncStorage.getItem('UserId');
    const user_name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');
  
    const type = navigation.getParam('type', '');
    const notification_id = navigation.getParam('notification_id', 'ID');


    if(type == '1'){
      
      this.setState({ type: type,notification_id: notification_id,defaultItem: 0});

    }
console.log("token======>", token)
    if (token !== '') {
      this.setState({
        defaultItem: 0,
        isSeleted: 2,
        isUse:'',
        isUseTobacco: false,
        token: token,
      });

      this.getFeelings();
      // this.getDoing();
      this.getWhom();
     
    }
  };


  handleTimeConfirm = (date) => {
    let formatTime = dateFormat(date, 'HH:mm')

    this.setState({
      time: formatTime
    })
    this.hideTimePicker();
  };

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true
    })
  };

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false
    })
  };

  onChange(number, type) {
    this.setState({ craving_count: number }); // 1, + or -
  }


  onPageChange(position) {
    this.setState({ currentPosition: position });
  }

 

  slidingComplete = (itemSelected) => {

    this.setState({ defaultItem: itemSelected })
    
  }

  inputValidation() {
    const {
      isSeleted,
      triggersYou,
      time,
      location,
      typeLocation,
      feelings_value,
      feelings_type,
      feelings_other,
      whom_value,
      // doing_value,

    } = this.state;
    if (triggersYou.trim() != '') {
      if (time.trim() != 'Select Time' && time.trim() != '00:00') {
      if (location.trim() != '' ) {
        if(location == 'Others'){
          if(typeLocation.trim() == '' ){
            Toast.show('Please type the location');
          }else{
            if (feelings_value != '') {
              if(feelings_type == 1){
                if(feelings_other.trim() == '' ){
                  Toast.show('Please type the feelings');
                }else{
                  // if (doing_value != '') {
                    if (whom_value != '') {
                      this.addCravingData({carvingStatus: isSeleted})
                    }else {
                      Toast.show('Please select whom are you with');
                    }
                  // }else {
                  //   Toast.show('Please select what are you doing');
                  // }
                }
              }else{
             
                if (whom_value != '') {
                  this.addCravingData({carvingStatus: isSeleted})
                }else {
                  Toast.show('Please select whom are you with');
                }
            }
            }else {
              Toast.show('Please select how you feel');
            }
          }
        }else{
          if (feelings_value != '') {
          
            if(feelings_type == 1){
              if(feelings_other.trim() == '' ){
                Toast.show('Please type the feelings');
              }else{
                // if (doing_value != '') {
                  if (whom_value != '') {
                    this.addCravingData({carvingStatus: isSeleted})
                  }else {
                    Toast.show('Please select whom are you with');
                  }
                // }else {
                //   Toast.show('Please select what are you doing');
                // }
              }
            }else{
            // if (doing_value != '') {
              if (whom_value != '') {
                this.addCravingData({carvingStatus: isSeleted})
              }else {
                Toast.show('Please select whom are you with');
              }
            // }else {
            //   Toast.show('Please select what are you doing');
            // }}
            }
          }else {
            Toast.show('Please select how you feel');
          }
          
        }
        
      }else {
        Toast.show('Please select the location');
      }
    }  else {
      Toast.show('Please select the time');
    }
  }else {
      Toast.show('Please enter the triggers');
    }
  }




  lastEntry(clickState) {
    if (clickState == 1) {
      this.setState({ isSeleted: 1,isUseTobacco: true,isUse:'' });
    } else {
      this.setState({ isSeleted: 0,isUseTobacco: true,isUse:'' });
      // this.setState({  isUse:'No', isSeleted: 0,isUseTobacco: false});
      // this.addCravingData({carvingStatus: 0})
    }
  }


  getFeelings = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.feelings, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {
        // console.log("checking feelingsfd",JSON.stringify(response.data.data) )
        if (response.data.status == 200) {
          console.log("print====",JSON.stringify(response.data.data));

          const obj = [];
          const _data = response.data.data;
          for (var i = 0; i < _data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].name
            });
            console.log("for===",response.data.data[i].name);
          }

          console.log("checking feelings",JSON.stringify(obj))
          this.setState({ feelings: obj});
        
        }
        else {
          Toast.show(response.data.data.message)
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
       
      });
  }


  getDoing = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.doings, {},
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
              label: response.data.data[i].name,
  
            });
          }
          this.setState({ doing: obj });

        
          // Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
       
      });
  }

  getWhom = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.with_whom, {},
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
            console.log("log----",i);
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].relation,
  
            });
          }
          console.log("checking whom",JSON.stringify(obj))
          this.setState({ whom: obj });
  
          // Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.message);
         
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
       
      });
  }


  
addCravingData = async ({carvingStatus}) =>{
  
  const {defaultItem,triggersYou,time,location,token ,feelings_value,feelings_other,feelings_type,
    whom_value,typeLocation,type,notification_id,
    doing_value} = this.state;
    
  this.setState({isHidden: true});
    // if(carvingStatus == 1){

  let LocationField = ''
  if(location == 'Others'){
    LocationField = typeLocation
  }else{
    LocationField = location
  }
console.log("feelings_type  "+feelings_type +" defaultItem "+defaultItem+" carvingStatus "+carvingStatus+" triggersYou "+triggersYou+" time "+time+" feelings_value "+feelings_value+" feelings_other "+feelings_other+" LocationField "+LocationField+" whom_value "+whom_value+" type "+type+ " notification_id "+notification_id)
  axios
  .post(
    ApiName.store_craving,
    {
      feeling_type: feelings_type,
      tobacco_rating :defaultItem,
      carving_status: carvingStatus,
      what_triggered_you: triggersYou,
      how_long_did_craving_lasted:  time,
      feeling_id:feelings_value,
      other_feeling:feelings_other,
      location: LocationField,
     
      // doing_id:doing_value,
      with_whom_id:whom_value,

      type: type,
      notification_id: notification_id

    },
    {
      headers: {
        'Authorization': token,
      },
    },
  )
  .then((response) => {

 this.setState({isHidden: false});
    this.setState({  isUse:''})

    if (response.data.status == 200) {
     
      Toast.show(response.data.message)
       this.props.navigation.goBack();
      }
    else {
      Toast.show(response.data.message);
    }
  })
  .catch((error) => {
    this.setState({isHidden: false});
    Toast.show('There was some error. Please try again')
   
  });

        }

  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {

    const { isHidden,defaultItem, feelings, feelings_value,feelings_type, doing, doing_value, whom, whom_value,time,location,locValue,typeLocation,isTimePickerVisible } = this.state;
    const sliderValueLabels = ['Not at all', 'Medium', 'Strong'];
    if(feelings.length==0)
    {
    this.getFeelings();
    this.getWhom();
    }
    console.log("feelings",feelings)
    console.log('Loc Value ',locValue)
    return (
      <SafeAreaView style={{flex:1}}>
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
                }} source={require('../../../images/back_arrow.png')} />

              </TouchableOpacity>

            </View>
            <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Add Cravings</Text>

            </View>
          </View>
          <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{padding: blockMargin * 1.3}}>

              <View
                style={{
                  
                  width: '100%',
                }}>
                <Text style={styles.text}>
                  How strong was your desire to use tobacco?
                </Text>
                <View
                  style={{
                    flex: 0.15,
                    marginTop: blockMarginHalf * 2,
                    width: '100%',
                  }}>
                  {/* <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                    itemWrapperStyle={styles.snapsliderItemWrapper}
                    itemStyle={styles.snapsliderItem}
                    items={[{ value: 0, label: 'Not at All' },
                    { value: 1, label: 'Moderate' },
                    { value: 2, label: 'Strong' },
                    ]}
                    labelPosition="bottom"
                    defaultItem={defaultItem}
                    onSlidingComplete={this.slidingComplete} /> */}
                      <Slider
                        style={styles.snapslider}
                        step={1}
                        minimumValue={1}
                        maximumValue={3}
                        // minimumTrackTintColor="#0072BB"
                        // maximumTrackTintColor="#000000"
                        thumbTintColor="#0072BB"
                        value={this.state.sliderValue}
                        // onValueChange={(value) => this.setState({ sliderValue: value })}
                        onValueChange={(value) => this.slidingComplete(value)}
                        
                        />
                        {console.log("slider value", defaultItem)}
                      <View style={styles.labelContainer}>
                        {sliderValueLabels.map((label, index) => (
                          <Text key={index} style={styles.label}>
                            {label}
                          </Text>
                        ))}
                      </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>
                <Text style={styles.text}>
                  Did you use Tobacco?
                </Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: blockMargin * 1.3,
                  }}>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: 80,
                        height: 35,
                        borderRadius: 30,
                        backgroundColor:
                          this.state.isSeleted == 1 ? '#0072BB' : '#CBE2F1',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.lastEntry(1)}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        YES
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginLeft: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 80,
                        height: 35,
                        borderRadius: 30,
                        backgroundColor:
                          this.state.isSeleted == 0 ? '#0072BB' : '#CBE2F1',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.lastEntry(0)}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        NO
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Dialog
                 dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.isUseTobacco}
    dialogAnimation={new ScaleAnimation({
      initialValue: 0, // optional
      useNativeDriver: true, // optional
    })}
  >
    <DialogContent>
    
    <Text
                        style={{
                          color: '#222222',
                          fontFamily: 'SFCompactDisplay-Semibold',
                          fontSize: scalable(15),
                          textAlign:'center',
                         margin: blockMargin,
                        
                        }}>{'Analyse your triggers!'}</Text>
                        <TouchableOpacity
                      style={{
                        width: 100,
                        height: 35,
                        borderRadius: 30,
                        backgroundColor:'#0072BB',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:blockMarginHalf,
                      }}
                      onPress={() => this.setState({ isUseTobacco: false,isUse: 'Yes' })}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(12),
                        }}>
                        Okay
                      </Text>
                    </TouchableOpacity>
    
    </DialogContent>
  </Dialog>
              
              </View>

{ this.state.isUse == '' ? null :  this.state.isUse == 'No' ? 
              <View style={{
                flex:1, flexDirection:'column',
                marginTop: blockMargin * 2,
               
                alignItems:'center',justifyContent:'center',
              }}>
                <Text
                        style={{
                          color: '#222222',
                          fontFamily: 'SFCompactDisplay-Semibold',
                          fontSize: scalable(15),
                          textAlign:'center',
                         margin: blockMarginHalf
                        }}>{'Very good, you are successfully on track. Keep it up!'}</Text>
                 </View>


:
              <View style={{
                marginTop: blockMarginHalf,
                width: '100%',
              }}>
 
<View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>

<Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14),}}>What triggered the craving?</Text>
                  

                  <TextInput  style={{  width: '100%', minHeight:45,fontFamily: 'SFCompactDisplay-Regular', color:'black'}}
                    ref={(input) => this.trigger = input}
                    placeholder=""
                    placeholderTextColor="#B6C0CB"
                   
                  
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    onChangeText={(triggersYou) => { this.setState({ triggersYou }); }
                    }
                    value={this.state.triggersYou}
                   
                  />

<View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />


                </View>


                
                <View style={{
                  marginTop: blockMarginHalf * 2,
                  marginBottom: blockMarginHalf * 2,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14),}}>When did the cravings occur?</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: responsiveHeight(0),
                    }}>
                    <TouchableOpacity
        //  onPress={() => this.TimePicker.open()}
        onPress={this.showTimePicker}
        style={{
          width: '100%', flex:1,
         
        }}>
        
                   <Text style={{ width: '100%', flex:1, color: '#222222', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14),marginTop:blockMargin,marginBottom:blockMarginHalf}}>{time}</Text>
                   </TouchableOpacity>
                   <DateTimePickerModal

isVisible={isTimePickerVisible}
mode='time'
locale="en_GB" 
is24Hour={true}  
onConfirm={this.handleTimeConfirm}
onCancel={this.hideTimePicker}
/>
                   {/* <TimePicker
                   ref={ref => {
                    this.TimePicker = ref;
                  }}
          itemStyle={{fontSize:scalable(12)}}
          maxHour={12}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        /> */}

                  </View>
                  <View style={styles.view4} />
                </View>





                <View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>

<Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14),}}>Where were you at the time of craving? (At home, At office, etc..)</Text>

        <TouchableOpacity onPress={() => { locValue.length > 0 && this.setState({locate_Visible : true}) }} >
          <View style={{
            flexDirection: 'row',

            marginLeft: responsiveWidth(0), marginRight: responsiveWidth(4), marginTop: 8, alignItems: 'center', marginBottom: 5
          }}>
            <Text style={{
              color: '#202020', fontFamily: 'SFCompactDisplay-Regular',
              fontSize: 14, width: '95%',
            }}>{this.state.selTimeCraving != '' ? this.state.selTimeCraving : 'Select Location of Craving'}</Text>


            <Image source={require('../../../images/down_arrow.png')} style={{
              width: responsiveWidth(3),
              height: responsiveHeight(3),
              marginLeft: responsiveWidth(2),
              resizeMode: 'contain',
            }} />

          </View>

        </TouchableOpacity>

{/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: responsiveHeight(0),
                    }}>
                   <Text >{this.state.selTimeCraving}</Text> */}
                     {/* <Dropdown
                      underlineColor="transparent"
                      ref='Where'
                      value={location}
                      underlineColor="transparent"
                      onChangeText={location => {
                        this.setState({ location });
                      }}
                   
                    
                     
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SFCompactDisplay-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SFCompactDisplay-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={locValue}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} /> */}

                  {/* </View> */}
                  <View style={styles.view4} />


{ location == 'Others' && <View style={{marginTop: blockMarginHalf}}>                  
<TextInput  style={{  width: '100%', minHeight:45 ,fontFamily: 'SFCompactDisplay-Regular'}}
                    ref={(input) => this.loc = input}
                    placeholder="Type your Place here.."
                    placeholderTextColor="#B6C0CB"
                   
                    
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    onChangeText={(typeLocation) => { this.setState({ typeLocation }); }
                    }
                    value={this.state.typeLocation}
                   // onSubmitEditing={() => this.feelings.focus()}
                  />
                  <View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />


</View>}
                 
                </View>


              
                <View style={{
                  marginTop: blockMargin,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14), marginTop: blockMarginHalf,}}>How were you feeling?</Text>
                 
                  <TouchableOpacity onPress={() => {feelings.length > 0 && this.setState({feeling_Visible: true})}} >
<View style={{
              flexDirection: 'row',
             
              marginLeft: responsiveWidth(0),marginRight: responsiveWidth(4), marginTop:8, alignItems:'center',marginBottom:5
            }}>
              <Text style={{ color:'#202020',fontFamily: 'SFCompactDisplay-Regular', 
              fontSize: 14, width: '95%',}}>{this.state.selFeelings != '' ? this.state.selFeelings : 'Select Feeling'}</Text>
              
              
              <Image source={require('../../../images/down_arrow.png')} style={{width: responsiveWidth(3),
  height: responsiveHeight(3),
  marginLeft: responsiveWidth(2),
  resizeMode: 'contain',}} />
       
        </View>
        
        </TouchableOpacity>
                 
                  {/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: responsiveHeight(0),
                    }}>
                   
                     <Dropdown
                      underlineColor="transparent"
                      ref={(input) => this.feelings = input}
                      value={feelings_value}
                      onChangeText={feelings_value => {
                        this.setState({ feelings_value });
                        for (var i = 0; i < feelings.length; i++) {
                       
                          if(feelings[i].value == feelings_value){
                           
                          if(feelings[i].label.toLowerCase() == 'others'){
                            this.setState({ feelings_type : 1 });
                         
                          }else{
                         
                            this.setState({ feelings_type : 0,feelings_other:'' });
                          }}
                        }
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SFCompactDisplay-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SFCompactDisplay-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={feelings}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />

                  </View> */}
                  <View style={styles.view4} />

                  
{ feelings_type == 1 && <View style={{marginTop: blockMarginHalf}}>                  
<TextInput  style={{  width: '100%', minHeight:45 ,fontFamily: 'SFCompactDisplay-Regular'}}
                    ref={(input) => this.loc = input}
                    placeholder="Type your feeling here.."
                    placeholderTextColor="#B6C0CB"
                   
                  
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    onChangeText={(feelings_other) => { this.setState({ feelings_other }); }
                    }
                    value={this.state.feelings_other}
                    //onSubmitEditing={() => this.whom.focus()}
                  />
<View style={{ borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '100%',}} />

</View>}
                </View>


                {/* <View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>
                 
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14)}}>What are you doing?</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                   
                    <Dropdown
                      underlineColor="transparent"
                      ref={(input) => this.doing = input}
                      value={evalue}
                      onChangeText={doing_value => {
                        this.setState({ doing_value });
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SFCompactDisplay-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SFCompactDisplay-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={doing}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />
                  </View>
                  <View style={styles.view4} />
                </View> */}


                

                <View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SFCompactDisplay-Regular', fontSize: scalable(14) }}>Who were the people with you at the time of craving?</Text>
                  <TouchableOpacity onPress={() => {whom.length > 0 && this.setState({select_People : true})}} >
<View style={{
              flexDirection: 'row',
             
              marginLeft: responsiveWidth(0),marginRight: responsiveWidth(4), marginTop:8, alignItems:'center',marginBottom:5
            }}>
              <Text style={{ color:'#202020',fontFamily: 'SFCompactDisplay-Regular', 
              fontSize: 14, width: '95%',}}>{this.state.selPeople != '' ? this.state.selPeople : 'Select People'}</Text>
              
              
              <Image source={require('../../../images/down_arrow.png')} style={{width: responsiveWidth(3),
  height: responsiveHeight(3),
  marginLeft: responsiveWidth(2),
  resizeMode: 'contain',}} />
       
        </View>
        
        </TouchableOpacity>
                  
                  {/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Dropdown
                      underlineColor="transparent"
                      ref={(input) => this.whom = input} 
                      value={whom_value}
                      onChangeText={whom_value => {
                        this.setState({ whom_value });
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SFCompactDisplay-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SFCompactDisplay-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SFCompactDisplay-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={whom}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />

                  </View> */}
                  <View style={styles.view4} />
                </View>

                <View style={{ marginTop: blockMarginHalf * 3, marginBottom: blockMarginHalf * 2,alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.inputValidation()}>
                    <View style={{
                      width: 200,
                      height: 50,
                      borderRadius: 30,
                      backgroundColor: '#0072bb',
                      opacity: 100,
                      borderWidth: 2,
                      borderColor: '#FFFFFF',
                      margin: blockMarginHalf, justifyContent: 'center',
                    }}>
                      <Text style={{
                        color: '#FFFFFF',
                        fontFamily: 'SFCompactDisplay-Medium',
                        fontSize: scalable(16), alignSelf: 'center'
                      }}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>

 
              </View>
  }
             

             

            </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
          {isHidden ? (
                <View style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  backgroundColor : 'transparent'
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
      </View>
{/*     
      <ReactNativePickerModule
        // pickerRef={this.pick_timeCraving}
        ref={this.pick_timeCraving}
        value={this.state.location}
        title={"Select Location of Craving"}
        items={locValue}
        tintColor='black'
        titleStyle={{ color: "white" }}
        itemStyle={{ color: "white" }}
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
          let branch = locValue.find((item) => item.value === value );
          this.setState({selTimeCraving:branch.label ,location:branch.value})
        }}
      /> */}
         <SinglePickerMaterialDialog
            title={'Select Location of Craving'}
            items={locValue}
            scrolled = {true}
            colorAccent={'#0072BB'}
            cancelLabel={'Cancel'}
            okLabel={'Confirm'}
            visible={this.state.locate_Visible}
            selectedItem={this.state.location}
            onCancel={() => this.setState({ locate_Visible: false })}
            onOk={result => {
              if(result.selectedItem != undefined){

                this.setState({ locate_Visible: false });
                this.setState({selTimeCraving:result.selectedItem.label ,location:result.selectedItem.value})
              }else {
                this.setState({ locate_Visible: false });

              }
            }}
        />
      {/* <ReactNativePickerModule
        // pickerRef={this.pick_feelings}
        ref={this.pick_feelings}
        value={this.state.feelings_value}
        title={"Select Feeling"}
        items={feelings}
        tintColor='black'
        titleStyle={{ color: "white" }}
        itemStyle={{ color: "white" }}
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
          let branch = feelings.find((item) => item.value === value );
          this.setState({selFeelings:branch.label ,feelings_value:branch.value})

          for (var i = 0; i < feelings.length; i++) {
                       
            if(feelings[i].value == value){
          
            if(feelings[i].label.toLowerCase() == 'others'){
              this.setState({ feelings_type : 1 });
            
            }else{
             
              this.setState({ feelings_type : 0,feelings_other:'' });
            }}
          }

        }}
      /> */}
    <SinglePickerMaterialDialog
            title={'Select Feeling'}
            items={feelings}
            colorAccent={'#0072BB'}
            cancelLabel={'Cancel'}
            okLabel={'Confirm'}
            visible={this.state.feeling_Visible}
            selectedItem={this.state.feelings_value}
            onCancel={() => this.setState({ feeling_Visible: false })}
            onOk={result => {
              if(result.selectedItem != undefined){

                this.setState({ feeling_Visible: false });
                this.setState({selFeelings:result.selectedItem.label ,feelings_value:result.selectedItem.value})
              } else {
                this.setState({ feeling_Visible: false });

              }
                // for (var i = 0; i < feelings.length; i++) {
                       
                  // if(feelings[i].value == result.selectedItem.value){
                console.log("print====",result);
                if(result.selectedItem != undefined){
                  if(result.selectedItem.label == 'Other'){
                    this.setState({ feelings_type : 1 });
                  
                  }else{
                   
                    this.setState({ feelings_type : 0,feelings_other:'' });
                  }
                } else {

                }
                 
                // }
                // }
            }}
        />
{/* <ReactNativePickerModule
        // pickerRef={this.pick_people}
        ref={this.pick_people}
        value={this.state.whom_value}
        title={"Select People"}
        items={whom}
        tintColor='black'
        titleStyle={{ color: "white",fontFamily:'SFCompactDisplay-Medium', fontWeight: '300' }}
        itemStyle={{ color: "white" ,fontFamily:'SFCompactDisplay-Medium', fontWeight: '300'}}
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
      
          let branch = whom.find((item) => item.value === value );
          this.setState({selPeople:branch.label ,whom_value:branch.value})


        }}
      /> */}
    <SinglePickerMaterialDialog
            title={'Select People'}
            items={whom}
            scrolled = {true}
            colorAccent={'#0072BB'}
            cancelLabel={'Cancel'}
            okLabel={'Confirm'}
            visible={this.state.select_People}
            selectedItem={this.state.whom_value}
            onCancel={() => this.setState({ select_People : false })}
            onOk={result => {
              if(result.selectedItem != undefined){

                this.setState({ select_People: false });
                this.setState({selPeople:result.selectedItem.label ,whom_value:result.selectedItem.value})
              }else {
                this.setState({ select_People: false });

              }
            }}
        />
    </SafeAreaView>
    );
  }
}
 