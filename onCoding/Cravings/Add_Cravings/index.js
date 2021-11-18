/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Add_Cravings/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-datepicker';
import Slider from 'react-native-slider';
// import {
//   StepProgressBar
// } from 'react-native-step-progress-bar';
import Counter from 'react-native-counters';
import Feather from 'react-native-vector-icons/Feather';
import dateFormat from 'date-fns/format';
import { Dropdown } from 'react-native-material-dropdown-v2';
import ToggleSwitch from 'toggle-switch-react-native';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import SnapSlider from 'react-native-snap-slider';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TextInput,
  TouchableHighlight, ActivityIndicator
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { SimpleStepper } from 'react-native-simple-stepper';
import { Stepper } from 'react-form-stepper';
import StepIndicator from 'react-native-step-indicator';
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
//import TimePicker from the package we installed
import TimePicker from "react-native-24h-timepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog, {ScaleAnimation,DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';

import { min } from 'date-fns';
const labels = ['Not At All', 'Moderate', 'Too Strong'];


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
  labelFontFamily: 'SF-Medium',
  labelAlign: 'center',
};

export default class Add_Cravings extends Component {
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
      feelings: [],
      feelings_value: '',
      feelings_type: 0,
      feelings_other:'',
      doing: [],
      doing_value: '',
      whom: [],
      whom_value: '',

      triggersYou: '',
      location: '',
      typeLocation:'',
      locValue: [
        { value: 'Home' },
        { value: 'Office' },
        { value: 'Shopping' },
        { value: 'Outside' },
        { value: 'Nearby Shop' },
        { value: 'Others' }
      ],
   
      defaultItem: 0,

      time: 'Select Time',
      isTimePickerVisible: false
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

    console.log('Navigated Data:-'+type+'---'+notification_id+'--'+this.state.defaultItem)

    if(type == '1'){
      
      this.setState({ type: type,notification_id: notification_id,defaultItem: 0});
      console.log('Navigated Data:-'+type+'---'+notification_id+'--'+this.state.defaultItem)

    }

    if (token !== '') {
      this.setState({
        defaultItem: 0,
        isSeleted: 2,
        isUse:'',
        isUseTobacco: false,
        token: token,
      });
      this.getFeelings();
      this.getDoing();
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
    console.log(number, type);
    this.setState({ craving_count: number }); // 1, + or -
  }


  onPageChange(position) {
    this.setState({ currentPosition: position });
    console.log(position);
  }

 

  slidingComplete = (itemSelected) => {
    console.log("slidingComplete");
    console.log("item selected " + this.refs.slider.state.item);
    console.log("item selected(from callback)" + itemSelected);
    this.setState({ defaultItem: itemSelected })
    // console.log("value " + this.sliderOptions[this.refs.slider.state.item].value);
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
      doing_value,

    } = this.state;
    if (triggersYou.trim() != '') {
      if (time.trim() != 'Select Time' && time.trim() != '00:00') {
      if (location.trim() != '' ) {
        if(location == 'Others'){
          if(typeLocation.trim() == '' ){
            Toast.show('Please type the location');
          }else{
            if (feelings_value != '') {
              console.log('feelings_value --'+feelings_value+'-'+feelings_type)
              if(feelings_type == 1){
                if(feelings_other.trim() == '' ){
                  Toast.show('Please type the feelings');
                }else{
                  if (doing_value != '') {
                    if (whom_value != '') {
                      this.addCravingData({carvingStatus: 1})
                    }else {
                      Toast.show('Please select whom are you with');
                    }
                  }else {
                    Toast.show('Please select what are you doing');
                  }
                }
              }else{
              if (doing_value != '') {
                if (whom_value != '') {
                  this.addCravingData({carvingStatus: 1})
                }else {
                  Toast.show('Please select whom are you with');
                }
              }else {
                Toast.show('Please select what are you doing');
              }}
            }else {
              Toast.show('Please select how you feel');
            }
          }
        }else{
          if (feelings_value != '') {
            console.log('feelings_value --'+feelings_value+'-'+feelings_type)
            if(feelings_type == 1){
              if(feelings_other.trim() == '' ){
                Toast.show('Please type the feelings');
              }else{
                if (doing_value != '') {
                  if (whom_value != '') {
                    this.addCravingData({carvingStatus: 1})
                  }else {
                    Toast.show('Please select whom are you with');
                  }
                }else {
                  Toast.show('Please select what are you doing');
                }
              }
            }else{
            if (doing_value != '') {
              if (whom_value != '') {
                this.addCravingData({carvingStatus: 1})
              }else {
                Toast.show('Please select whom are you with');
              }
            }else {
              Toast.show('Please select what are you doing');
            }}
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
    //alert(clickState);
    if (clickState == 1) {
      this.setState({ isSeleted: 1,isUseTobacco: true,isUse:'' });
    } else {
    
      this.setState({  isUse:'No', isSeleted: 0,isUseTobacco: false});
      this.addCravingData({carvingStatus: 0})
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
        console.log(
          'Feelings response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {

          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].name,
  
            });
          }
          this.setState({ feelings: obj });
          console.log(JSON.stringify(response.data));

          // Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.data.message)
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
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
        console.log(
          'Doing response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

      

        if (response.data.status == 200) {

          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].name,
  
            });
          }
          this.setState({ doing: obj });

          console.log(JSON.stringify(response.data));

          // Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
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
        console.log(
          'Whom response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

      
        if (response.data.status == 200) {

          console.log(JSON.stringify(response.data));
          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].relation,
  
            });
          }
          this.setState({ whom: obj });
  
          // Toast.show(response.data.message);
        }
        else {
          Toast.show(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }


  
addCravingData = async ({carvingStatus}) =>{
  
  const {defaultItem,triggersYou,time,location,token ,feelings_value,feelings_other,feelings_type,
    whom_value,typeLocation,type,notification_id,
    doing_value,} = this.state
  this.setState({isHidden: true});
    console.log('input ==> '+ApiName.store_craving+' --- ' + token+' =---= '+carvingStatus+" =--= "+defaultItem+' =--= '+triggersYou+' =--= '+time+' =--= '+location + ' =-= ' + feelings_value+ ' =-= '+whom_value +' =-= '+doing_value);
 
    console.log('Navigation'+type+'---'+notification_id)
    if(carvingStatus == 1){

  let LocationField = ''
  if(location == 'Others'){
    LocationField = typeLocation
  }else{
    LocationField = location
  }

  console.log('Yes'+ LocationField+'---$'+feelings_other+'$---'+feelings_type);

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
     
      doing_id:doing_value,
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
    console.log(
      'Add Yes craving response ',
       JSON.stringify(response.data),
    );

    // Toast.show(response.data.message);
    this.setState({  isUse:''})
    if (response.data.status == 200) {
      this.setState({isHidden: false});
      Toast.show(response.data.message)
       this.props.navigation.goBack();
      }
    else {
      Toast.show(response.data.message);
      console.log(response.data.message);
    }
  })
  .catch((error) => {
    this.setState({isHidden: false});
    Toast.show('There was some error. Please try again')
    console.log('reactNativeDemo axios error:', error);
  });

 }else{

  console.log('Noo');

  axios
  .post(
    ApiName.store_craving,
    {
      tobacco_rating :defaultItem,
      carving_status: carvingStatus,
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
    console.log(
      'Add Noo craving response ',
       JSON.stringify(response.data),
    );

    // Toast.show(response.data.message);

    if (response.data.status == 200) {
      this.setState({isHidden: false});
      Toast.show(response.data.data.message)
      }
    else {
      Toast.show(response.data.data.message)
      console.log(response.data.message);
    }
  })
  .catch((error) => {
    this.setState({isHidden: false});
    Toast.show('There was some error. Please try again')
    console.log('reactNativeDemo axios error:', error);
  });
 }


        
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
                }} source={require('../../../images/back_arrow.png')} />

              </TouchableOpacity>

            </View>
            <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Add Cravings</Text>

            </View>
          </View>
          <ScrollView style={{ marginTop: 0 }} keyboardShouldPersistTaps={'handled'}>
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
                  <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                    itemWrapperStyle={styles.snapsliderItemWrapper}
                    itemStyle={styles.snapsliderItem}
                    items={[{ value: 0, label: 'Not at All' },
                    { value: 1, label: 'Moderate' },
                    { value: 2, label: 'Strong' },
                    ]}
                    labelPosition="bottom"
                    defaultItem={defaultItem}
                    onSlidingComplete={this.slidingComplete} />
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
                          fontFamily: 'SF-Medium',
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
                          fontFamily: 'SF-Medium',
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
                          fontFamily: 'SF-Bold',
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
                          fontFamily: 'SF-Medium',
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
                          fontFamily: 'SF-Bold',
                          fontSize: scalable(15),
                          textAlign:'center',
                         margin: blockMarginHalf
                        }}>{'Very Good, you are successfully on the track. Keep it up!!'}</Text>
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

<Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14),}}>What triggered you?</Text>
                  

                  <TextInput  style={{  width: '100%' }}
                    ref={(input) => this.trigger = input}
                    placeholder=""
                    placeholderTextColor="#B6C0CB"
                   
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="#B6C0CB"
                    onChangeText={(triggersYou) => { this.setState({ triggersYou }); }
                    }
                    value={this.state.triggersYou}
                   
                  />
                </View>


                
                <View style={{
                  marginTop: blockMarginHalf * 2,
                  marginBottom: blockMarginHalf * 2,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14),}}>How long craving lasted?</Text>
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
        
                   <Text style={{ width: '100%', flex:1, color: '#222222', fontFamily: 'SF-Regular', fontSize: scalable(14),marginTop:blockMargin,marginBottom:blockMarginHalf}}>{time}</Text>
                   </TouchableOpacity>
                   <DateTimePickerModal

isVisible={isTimePickerVisible}
mode='time'
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

<Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14),}}>Where were you at the time of craving? (At home, At office, etc..)</Text>
<View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: responsiveHeight(0),
                    }}>
                   
                     <Dropdown
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
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SF-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SF-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SF-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={locValue}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />

                  </View>
                  <View style={styles.view4} />


{ location == 'Others' && <View style={{marginTop: blockMarginHalf}}>                  
<TextInput  style={{  width: '100%' }}
                    ref={(input) => this.loc = input}
                    placeholder="Type your Place here.."
                    placeholderTextColor="#B6C0CB"
                   
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="#B6C0CB"
                    onChangeText={(typeLocation) => { this.setState({ typeLocation }); }
                    }
                    value={this.state.typeLocation}
                    onSubmitEditing={() => this.feelings.focus()}
                  />

</View>}
                 
                </View>


              
                <View style={{
                  marginTop: blockMargin,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14), marginTop: blockMarginHalf,}}>How are you feeling?</Text>
                  <View
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
                            console.log('Selected Feelings -'+feelings[i].label.toLowerCase())

                          if(feelings[i].label.toLowerCase() == 'others'){
                            this.setState({ feelings_type : 1 });
                           console.log('Selected Others Feelings');
                          }else{
                            console.log('Selected Feelings');
                            this.setState({ feelings_type : 0,feelings_other:'' });
                          }}
                        }
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SF-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SF-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SF-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={feelings}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />

                  </View>
                  <View style={styles.view4} />

                  
{ feelings_type == 1 && <View style={{marginTop: blockMarginHalf}}>                  
<TextInput  style={{  width: '100%' }}
                    ref={(input) => this.loc = input}
                    placeholder="Type your feeling here.."
                    placeholderTextColor="#B6C0CB"
                   
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="#B6C0CB"
                    onChangeText={(feelings_other) => { this.setState({ feelings_other }); }
                    }
                    value={this.state.feelings_other}
                    onSubmitEditing={() => this.doing.focus()}
                  />

</View>}
                </View>


                <View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>
                 
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14)}}>What are you doing?</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                   
                    <Dropdown
                      underlineColor="transparent"
                      ref={(input) => this.doing = input}
                      value={doing_value}
                      onChangeText={doing_value => {
                        this.setState({ doing_value });
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SF-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SF-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SF-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={doing}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />
                  </View>
                  <View style={styles.view4} />
                </View>


                

                <View style={{
                  marginTop: blockMarginHalf * 2,
                  width: '100%',
                }}>
                  <Text style={{ color: '#B6C0CB', fontFamily: 'SF-Regular', fontSize: scalable(14) }}>Whom were the people with you at the time of craving?</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Dropdown
                      underlineColor="transparent"
                      ref="Whom"
                      value={whom_value}
                      onChangeText={whom_value => {
                        this.setState({ whom_value });
                      }}
                      placeholderTextColor="#202020"
                      label=""
                      useNativeDriver="true"
                      dropdownPosition={0}
                      labelHeight={7}
                      style={{ backgroundColor: '#FFFFFF', marginLeft: -blockMarginHalf,marginTop: blockMarginHalf / 2, fontFamily: 'SF-Medium', fontSize: scalable(14), width: responsiveWidth(85), height: 35 }}
                      itemTextStyle={{ fontFamily: 'SF-Medium',  fontSize: scalable(14), height: 25 }}
                      pickerStyle={{ width: '90%',marginLeft: blockMarginHalf, marginTop: blockMarginHalf * 4, fontFamily: 'SF-Medium',alignSelf:'center',justifyContent:'center' }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      data={whom}
                      valueExtractor={({ value }) => value}
                    />
                    <Image source={require('../../../images/down_arrow.png')} style={styles.arrow} />

                  </View>
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
                        fontFamily: 'SF-Medium',
                        fontSize: scalable(16), alignSelf: 'center'
                      }}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>

 
              </View>
  }
             

             

            </View>
            
          </ScrollView>
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
    );
  }
}
  //  this.getLocation();

    //  Geolocation.getCurrentPosition(
    //               (position) => {
    //                   this.setState({
    //                       latitude: position.coords.latitude,
    //                       longitude: position.coords.longitude,
    //                   });
    //   Geocoder.init("AIzaSyBgJpywvW_gPepfPigGtCfEjzsPK_OZVc8");
    //                   Geocoder.from(position.coords.latitude, position.coords.longitude)
    //                       .then(json => {
    //                           console.log(json);
    //                           var addressComponent = json.results[0].address_components;
    //                           this.setState({
    //                               Address: addressComponent,
    //                           });
    //                           console.log(addressComponent);
    //                       })
    //                       .catch(error => console.warn(error));
    //               },
    //               (error) => {
    //                   // See error code charts below.
    //                    this.setState({ error: error.message }),
    //                      console.log(error.code, error.message);
    //                },
    //               { enableHighAccuracy: false, timeout: 10000, maximumAge: 100000 }
    //           ); 
    //getLocation() {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       console.log(location);
  //     })
  //     .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //     });
  // }