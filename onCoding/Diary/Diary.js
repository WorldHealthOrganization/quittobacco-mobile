/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Diary/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

// import {
//   StepProgressBar
// } from 'react-native-step-progress-bar';
import Counter from 'react-native-counters';
import Feather from 'react-native-vector-icons/Feather';
import dateFormat from 'date-fns/format';
// import SnapSlider  from 'react-native-snap-slider';
import Slider from '@react-native-community/slider';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableHighlight,ActivityIndicator, SafeAreaView
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
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
} from '../ui/common/responsive';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  labelFontFamily: 'SFCompactDisplay-Medium',
  labelAlign: 'center',
};

export default class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      value: 0,
      diary_date: '',
      inputDate: '',
      notes: '',
      craving_count: 1,
      currentPosition: 0,
      isSeleted: 1,
      defaultItem: 0,
      desire:'',
      isDatePickerVisible:false
    };
  }
  componentDidMount = () => {
    var dateTime = new Date();
    let formatDate = dateFormat(dateTime, 'dd MMM yyyy');
   
    this.setState({
      diary_date: formatDate,
      inputDate: dateFormat(dateTime, 'yyyy-MM-dd'),
    });
  };
  onChange(number, type) {
    this.setState({craving_count: number}); // 1, + or -
  }

  // valueChanged(value) {
  //   // Truncate value to 2 decimal places and cast as Number.
  //   const nextValue = Number(value.toFixed(2));
  //   this.setState({ value: nextValue });
  //   // ...
  // }
  onPageChange(position) {
    this.setState({currentPosition: position});
    
  }
  slidingComplete = (itemSelected) => {
  
    this.setState({defaultItem: itemSelected})
    
  }
inputValidation(){
  const {
   
    notes,
  
  } = this.state;
if(notes.trim() == ''){
  Toast.show('Please enter the mandatory field');
}else{
this.goForAxios()
}
}

  goForAxios = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({isHidden: true});
    const {
      diary_date,
      last_entry,
      image,
      notes,
      tobacco_desire,
      craving_count,
      inputDate,
      isSeleted,
      defaultItem,
    } = this.state;

    axios
      .post(
        ApiName.store_diary,
        {
          date: inputDate,
          last_entry: isSeleted,
          notes: notes,
          tobacco_desire: defaultItem,
          craving_count: craving_count,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({isHidden: false});
        if (response.data.status == 200) {
         
          Toast.show(response.data.message);
        
          this.props.navigation.goBack();
        } else {
        
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again')
       
      });
  };

  date(date) {
    var dateTime = new Date(date);
    let formatDate = dateFormat(dateTime, 'dd-MMM-yyyy');

    this.setState({
      diary_date: formatDate,
      inputDate: dateFormat(dateTime, 'yyyy-MM-dd'),
    });
  }

  lastEntry(clickState) {
   
    if (clickState == 1) {
      this.setState({isSeleted: 1});
    } else {
      this.setState({isSeleted: 0});
    }
  }

  lastEntry1(sss) {
    
    if (this.state.isSeleted == 1) {
      this.setState({isSeleted: 0});
    } else {
      this.setState({isSeleted: 1});
    }
  }


showDatePicker = () => {
  this.setState({
    isDatePickerVisible: true,
  });
};
hideDatePicker = () => {
  this.setState({
    isDatePickerVisible: false,
  });
};
handleDateConfirm = (date) => {
  let formatDate = dateFormat(date, 'dd MMM yyyy');
  let formatValidDate = dateFormat(date, 'yyyy-MM-dd');

  this.setState({diary_date: formatDate});
  this.setState({inputDate: formatValidDate});
  this.hideDatePicker();
};

  render() {
    const{isHidden} =this.state
    const sliderValueLabels = ['Not at all', 'Medium', 'Strong'];

    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.view}>
    
          <View style={styles.view2}>
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
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Diary New Entry
              </Text>
            </View>
          </View>
          <KeyboardAwareScrollView
          style={{ flex: 1}}
          contentContainerStyle={{ flexGrow: 1}}>
            <View>
              
              <View style={{marginTop: 5}}>
                <Text style={styles.content}>Date</Text>
                {/* <DatePicker
                  style={{
                    width: responsiveWidth(95),
                    marginTop: responsiveHeight(0.25),
                    marginLeft: responsiveHeight(0),
                  }}
                  date={this.state.diary_date} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="DD MMM YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={require('../../images/calendar_theme.png')}
                  minDate={new Date()}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      resizeMode: 'contain',
                      height: responsiveHeight(4),
                      width: responsiveWidth(6.5),
                      right: responsiveWidth(2),
                      top: responsiveHeight(0.5),
                      marginLeft: responsiveHeight(0.5),
                    },
                    dateInput: {
                      marginLeft: responsiveHeight(-31),
                      borderWidth: responsiveWidth(0),
                    },
                  }}
                  onDateChange={(diary_date) => {
                    this.date(diary_date);
                  }}
                /> */}
                <TouchableOpacity onPress={()=> this.showDatePicker()}>
                  <View style={{flexDirection:'row', width:'100%', alignItems:'center',
                  justifyContent:'center', marginTop:blockMarginHalf, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'80%',
      color: '#000',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 16,marginLeft:0}} >{this.state.diary_date != '' ? this.state.diary_date : 'Select Date'}</Text>
                <Image source={require('../../images/calendar_theme.png')}
                resizeMode={'contain'}
                style={{width:18,height:18, }}/>
                </View></TouchableOpacity>
                
                <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        onConfirm={this.handleDateConfirm}
                        onCancel={this.hideDatePicker}
                      />

                <View style={styles.view4} />
              </View>
              <View
                style={{
                  marginTop: 8,
                  width: responsiveWidth(100),
                }}>
                <Text style={styles.text}>
                  Have you used Tobacco since your last entry?
                </Text>

                <View
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <View>
                    <TouchableHighlight
                      style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(6.5),
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
                    </TouchableHighlight>
                  </View>

                  <View
                    style={{
                      marginLeft: 20,
                    }}>
                    <TouchableHighlight
                      style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(6.5),
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
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: responsiveWidth(100),
                }}>
                <Text style={styles.text}>
                  How strong was your desire to use tobacco?
                </Text>
                <View
                  style={{
                    flex: 0.15,
                    marginTop: responsiveHeight(1),
                    width: responsiveWidth(100),
                  }}>
                 
        {/* <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                    itemWrapperStyle={styles.snapsliderItemWrapper}
                    itemStyle={styles.snapsliderItem}
                    items={[{value: 0, label: 'Not at All'},
                    {value: 1, label: 'Moderate'},
                    {value: 2, label: 'Strong'},
                    ]}
                    labelPosition="bottom"
                    defaultItem={this.state.defaultItem}
                    onSlidingComplete={this.slidingComplete} /> */}
                    <Slider
                        style={styles.snapslider}
                        step={1}
                        minimumValue={1}
                        maximumValue={3}
                        value={this.state.sliderValue}
                        // onValueChange={(value) => this.setState({ sliderValue: value })}
                        onValueChange={(value) => this.slidingComplete(value)}

                      />
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
                  marginTop: 10,
                  width: responsiveWidth(100),
                }}>
                <Text style={styles.text1}>
                  How many cravings would you say you had?
                </Text>
                <View
                  style={{
                    flex: 0.02,
                    height: responsiveHeight(5),
                    marginTop: responsiveHeight(1.5),
                    marginLeft: responsiveWidth(8.5),
                  }}>
                  <Counter
                    buttonStyle={{
                      borderWidth: responsiveWidth(0.75),
                      borderRadius: responsiveWidth(6),
                      borderColor: '#202020',
                      backgroundColor: '#CBE2F1',
                      fontFamily:'SFCompactDisplay-Medium'
                    }}
                    buttonTextStyle={{
                      fontSize: responsiveFontSize(2.5),
                      color: '#202020',fontFamily:'SFCompactDisplay-Medium'
                    }}
                    countTextStyle={{color: '#202020',fontFamily:'SFCompactDisplay-Medium'}}
                    start={1}
                    onChange={this.onChange.bind(this)}
                    value={this.state.craving_count}
                  />
                </View>
                <View style={styles.view5} />
              </View>
              <View
                style={{
                  flex: 0.1,
                  marginTop: responsiveHeight(1.5),
                  width: responsiveWidth(100),
                }}>
                <Text style={styles.text1}>Comments / Notes</Text>

                <TextInput
                  style={styles.input}
                  onChangeText={(value) => this.setState({notes: value})}
                  placeholder="Please write your experience and how you managed your craving(s)."
                  value={this.state.notes}
                  placeholderTextColor="#00000029" 
                  multiline={true}
                  returnKeyType="done"
                />
                <View style={styles.view4} />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  marginTop: responsiveHeight(3),
                  width: responsiveWidth(100),
                }}>
                <TouchableOpacity
                  onPress={() => this.inputValidation()}
                  style={[styles.buttonContainer1, styles.loginButton]}>
                  <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity>
              </View>
          
                
{isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
             position:'absolute',
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
          </KeyboardAwareScrollView>
        </View>
      </View>
      </SafeAreaView>
    );
  }
}
