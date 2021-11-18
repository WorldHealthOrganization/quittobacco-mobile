/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text,Alert,BackHandler,  Image,TouchableOpacity,TouchableHighlight,Button} from 'react-native';
import styles from '../Settings/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Dialog, {DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-simple-toast';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'date-fns/format';
import Login from '../login/Login';

export default class Settings extends Component {

  componentWillUnmount() {
   
  }
  constructor(props) {
    super(props);
    this.state = {
      isSeleted: 1,
      visible: false,
      visible2: false,
      quit_date: '',
      qit_date_api:'',
      quit_time: '',
      isDateTimePickerVisible: false,
      time: 0,
    };
  }

  componentDidMount = () => {
  
  };

  _showDateTimePicker = () =>{
    
      this.setState({isDateTimePickerVisible: true});
      // alert('visible'+ this.state.isDateTimePickerVisible);

 
  //this.state.time==1 ? true : false
}


  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    let formatDate = dateFormat(date, 'hh:mm a');
    

    this.setState({quit_time: formatDate});
    this._hideDateTimePicker();
    // alert(this.state.quit_time);
    
  };

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Are you sure want to logout and exit WHO application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.logout(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  Updatedate = async () =>{

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    const {quit_date,quit_time,quit_date_api} = this.state;

      console.log('login input ==> ' + quit_date + quit_time + quit_date_api);
      this.setState({ visible: false });
      this.setState({ visible1: false });
      this.setState({ visible2: false });
      this.setState({visible5: false})

            axios
              .post(
                ApiName.userInfoupdate,
                {

                  quit_date: quit_date_api,
                  quit_time: quit_time,

                },
                {
                  headers: {
                    'Authorization': jwt_token,
                  },
                },
              )
              .then((response) => {
                console.log(
                  'login response ',
                  'response get details:==> ' + JSON.stringify(response.data),
                );
  
                // Toast.show(response.data.message);
                this.setState({ visible4: false });
                if (response.data.status == 200) {
                  this.setState({ visible4: false });
  
                  AsyncStorage.setItem(
                    'JwtToken',
                    'Bearer ' + response.data.jwt_token,
                  );
                  
                  Toast.show(response.data.message);
                  AsyncStorage.setItem('SettingState', '1');

                  // this.props.navigation.navigate('Navigation');
                  }
                else {
                  Toast.show(response.data.message);
                }
              })
              .catch((error) => {
                this.setState({isHidden: false});
                console.log('reactNativeDemo axios error:', error);
              });
          }

          resetdata= async () => {
            let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

            this.setState({ isHidden: true })
            this.setState({ visible: false })

                  axios
                    .post(
                      ApiName.reset_data,{ },
                      {
                        headers: {
                          'Authorization': jwt_token,
                        },
                      },
                    )
                    .then((response) => {
                      console.log(
                        'Reset response ',
                        'response get details:==> ' + JSON.stringify(response.data),
                      );
        
        
                      if (response.data.status == 201) {
                        console.log(JSON.stringify( response.data));
                        console.log(JSON.stringify( 'QS:' + response.data.questionarie_status));
                        this.setState({ isHidden: false })
                        this.setState({ visible: false })

                      
                        if (response.data.questionarie_status == 0){
                          console.log( 'Reset All status'+response.data.questionarie_status)
                          AsyncStorage.setItem('QuestionarieStatus', '0');
                            this.props.navigation.navigate('QuestionareStack');
                        }
                        Toast.show(response.data.message);
                      }
                      else {
                        console.log(response.data.message);
                        this.setState({ isHidden: false })
        
                      }
                    })
                    .catch((error) => {
                      console.log('reactNativeDemo axios error:', error);
                      this.setState({ isHidden: false })
        
                    });
          }
        


  lastEntry(clickState) {
    this.setState({ visible: false })
    //alert(clickState);
    if (clickState == 1) {
      this.setState({isSeleted: 1});
    } else {
      this.setState({isSeleted: 0});
    }
  }

  lastEntry1(sss) {
    alert(sss + 1);
    if (this.state.isSeleted == 1) {
      this.setState({isSeleted: 0});
    } else {
      this.setState({isSeleted: 1});
    }
  }
  
  logout = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })
    axios
    .post(
      ApiName.logout,{ },
      {
        headers: {
          'Authorization': jwt_token,
        },
      },
    )
    .then((response) => {
      console.log(
        'Logout response ',
        'response get details:==> ' + JSON.stringify(response.data),
      );

      if (response.data.status == 200 || response.data.status == 201) {
        console.log(JSON.stringify( response.data));
       
        this.setState({ isHidden: false })
      
        AsyncStorage.clear();
        AsyncStorage.setItem('LoginStatus', 'false');
        AsyncStorage.setItem('Walkthrough', 'true');
        //BackHandler.exitApp();
        
        Toast.show('You have logged out successfully');
        
        this.props.navigation.navigate('LoginStack');
      }
      else {
        console.log(response.data.message);
        this.setState({ isHidden: false })
      }
    })
    .catch((error) => {
      console.log('reactNativeDemo axios error:', error);
      this.setState({ isHidden: false })
    });
   
  }

  
  render() {


    return (
      <View style={{flex:1}}>
           
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: '100%',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column',backgroundColor: '#FFFFFF' }}>


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
            <View style={{ width: '52%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                marginLeft: blockMarginHalf * 9 ,
                textAlign: 'center',

              }}>Settings</Text>
            </View>
            <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: blockMarginHalf * 3,
              marginLeft: blockMarginHalf * 2 ,
              width: 108,
              height:32,
              borderRadius: 30,
              backgroundColor: '#CBE2F1',
            }}
            onPress={() => this.props.navigation.navigate('Feedback')}>
            <Text style={styles.submittext}>Feedback</Text>
        </TouchableOpacity>
            </View>
            <View style={{ marginTop: responsiveHeight(2)}}>
    <View
            style={{
              flexDirection: 'row',
            //   marginLeft: responsiveWidth(32),
            //   marginTop: responsiveHeight(5),
            }}>
                    <Text style={styles.text}>Change Quit Date</Text>

  <TouchableOpacity  onPress={() => {this.setState({ visible2: true });}}>
                    <Image style={styles.img} source={require('../../images/next_arrow.png')}/>
                    </TouchableOpacity>

                    <Dialog
                    width={0.8}
                        containerStyle={{zIndex: 10, elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.visible2}
    onTouchOutside={() => {
      this.setState({ visible2: false });
    }}
    onDismiss={()=> {
      this.setState({ visible2: false });
    }
    }
  >
    <DialogContent>
      <TouchableOpacity onPress={()=>this.setState({ visible2: false })}>
    <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>SELECT DATE</Text>
    <View style={{backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
    }} />



<DatePicker
style={{width: responsiveWidth(68), marginTop:blockMarginHalf * 4,}}
date={this.state.quit_date} //initial date from state
mode="date" //The enum of date, datetime and time
placeholder="Select Date"
format="DD-MM-YYYY"
iconSource={require('../../images/calendar_theme.png')}
minDate={new Date()}
customStyles={{
dateIcon: {
 position: 'absolute',
 resizeMode: 'contain',
 height: responsiveHeight(6),
 width: responsiveWidth(5),
 right: responsiveWidth(3.5),
 top: responsiveHeight(0.3),
 marginLeft: blockMarginHalf * 2,
},
dateInput: {
 marginLeft: responsiveWidth(-32),
 borderWidth: responsiveWidth(0),

},
}}
onDateChange={(quit_date) => {
           
  let momentObj = moment(quit_date, 'DD-MM-YYYY')
  let dateformat = moment(momentObj).format('YYYY-MM-DD')
  
  console.log('Quit date: ' + dateformat+'--'+quit_date);
  
  this.setState({quit_date: quit_date,quit_date_api: dateformat});
}}
/>
                   <View style={{marginTop: responsiveHeight(0),
        borderBottomWidth: responsiveWidth(0.22),
        borderBottomColor: '#B6C0CB',
        width: responsiveWidth(60),
        marginLeft:blockMarginHalf * 3}} />
<View>
                    <TouchableHighlight
                      style={{
                        width: 200,
                        height: 38,
                        borderRadius: 30,
                        backgroundColor:'#0072BB',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:blockMarginHalf * 4,
                      }}
                      onPress={() => this.setState({ visible2: false,visible5: true })}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        Continue
                      </Text>
                    </TouchableHighlight>


                  
                  </View>

    </DialogContent>
  </Dialog>

                    </View>
                    <View
            style={{
              flexDirection: 'row',
         
            }}>
                    <Text style={styles.text}>Change Tobacco Data</Text>
                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Change_tobacco_data')}}>
                    <Image style={styles.img1} source={require('../../images/next_arrow.png')}/>
                    </TouchableOpacity>
                   
                    </View>
                    <View
            style={{
              flexDirection: 'row',
            
            }}>
                    <Text style={styles.text}>Notifications</Text>
                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Notifications')}}>
                    <Image style={styles.img2} source={require('../../images/next_arrow.png')}/>
                    </TouchableOpacity>
                    </View>
                    <View
            style={{
              flexDirection: 'row',
            }}>
                  

                    <Text style={styles.text}>Reasons to Quit Tobacco</Text>
                   
                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Quit_Reasons')}}>
                    <Image style={styles.img3} source={require('../../images/next_arrow.png')}/>
                    </TouchableOpacity>

                    </View>
                    <View
            style={{
              flexDirection: 'row',
          
            }}>
                                  <TouchableOpacity  onPress={() => {this.setState({ visible: true });}}>
                    <Text style={styles.text}>Reset all data</Text>
                    </TouchableOpacity>
                    <Dialog
                    width={0.8}
                        // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                        containerStyle={{zIndex: 10, elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
                        dialogFooter={<View><Button text="DISMISS" align="center" /></View>}
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
    onDismiss={()=> {
      this.setState({ visible: false });
    }
    }
  >
    <DialogContent>
      <View>
        <TouchableOpacity onPress={()=>this.setState({ visible: false })}>
        <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>RESET DATA</Text>
     <Text style={{color:'#202020', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(14),marginTop: blockMarginHalf * 2,lineHeight: deviceHeight / 25}}>This will clear all the data you've{'\n'}entered and reset the app entirely</Text>
     <View>
                    <TouchableHighlight
                      style={{
                        width: 200,
                        height: 38,
                        borderRadius: 30,
                        backgroundColor:
                        this.state.isSeleted == 1 ? '#0072BB' : '#CBE2F1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:blockMarginHalf * 2,
                      }}
                      onPress={() => this.resetdata()}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        YES
                      </Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight
                      style={{
                        width: 200,
                        height: 38,
                        borderRadius: 30,
                        backgroundColor:
                        this.state.isSeleted == 0 ? '#0072BB' : '#CBE2F1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:blockMarginHalf,
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
                    </TouchableHighlight>
                  </View>
     </View>

    </DialogContent>
  </Dialog>

                    </View>
       </View>
       <View style={styles.view2}>
       <TouchableOpacity
            style={[styles.buttonContainer1, styles.submitbutton]}
            onPress={() => this.handleBackButton()}>
            <Text style={styles.submittext}>Log Out</Text>
        </TouchableOpacity>
</View>
      </View>

      </View>
      <View style={{flex:1, backgroundColor:'#FFFFFFF', position:'absolute'}}>
      <Dialog
                    width={0.8}
                        containerStyle={{zIndex: 10, elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.visible5}
    onTouchOutside={() => {
      this.setState({ visible5: false });
    }}
    onDismiss={()=> {
      this.setState({ visible5: false });
    }
    }
  >
    <DialogContent>
      <TouchableOpacity onPress={()=>this.setState({ visible5: false })}>
    <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>SELECT TIME</Text>
    <View style={{backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
    }} />
 



<TouchableOpacity onPress={()=>this.setState({isDateTimePickerVisible: true})}>
                      <Text
                        style={{
                          fontFamily: 'SF-Regular',
                          marginTop: blockMarginHalf * 6,
                          marginLeft: blockMarginHalf * 3,
                        }}>
                        Select Time {'\n'} {this.state.quit_time}
                      </Text>
                    </TouchableOpacity>
                  
                   <View style={{marginTop: responsiveHeight(1),
        borderBottomWidth: responsiveWidth(0.22),
        borderBottomColor: '#B6C0CB',
        width: responsiveWidth(60),
        marginLeft:blockMarginHalf * 3}} />
<View>
                    <TouchableHighlight
                      style={{
                        width: 200,
                        height: 38,
                        borderRadius: 30,
                        backgroundColor:'#0072BB',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:blockMarginHalf * 4,
                      }}
                      onPress={() => this.Updatedate()}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        Continue
                      </Text>
                    </TouchableHighlight>


                  
                  </View>

    </DialogContent>
  </Dialog>

                </View>
                {this.state.isDateTimePickerVisible ? 
  <View>
  <DateTimePicker
                      mode="time"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                    

  </View>
  : null}
        </View>
    );
  }
}
