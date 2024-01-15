/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text,Alert,BackHandler,  Image,
  TouchableOpacity,TouchableHighlight,Button, SafeAreaView, ActivityIndicator,ScrollView} from 'react-native';
import styles from '../Settings/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Dialog, {DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';

import Toast from 'react-native-simple-toast';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'date-fns/format';
//import Login from '../login/Login';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class Settings extends Component {

  componentWillUnmount() {
   
  }
  constructor(props) {
    super(props);
    this.state = {
      isSeleted: 1,
      isHidden: false,
      visible: false,
      visible2: false,
      visible5: false,
      quit_date: '',
      qit_date_api:'',
      quit_time: '',
      quit_time_api: '',
      isDateTimePickerVisible: false,
      time: 0,
    };
  }

  componentDidMount = () => {
  
  };

  _showDateTimePicker = () =>{
    
      this.setState({isDateTimePickerVisible: true});
   
  //this.state.time==1 ? true : false
}


  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = (date) => {
    let formatDate = dateFormat(date, 'hh:mm a');
    let formatDateApi = dateFormat(date, 'HH:mm:ss');

    this.setState({quit_time: formatDate});
    this.setState({quit_time_api: formatDateApi});
    this._hideDateTimePicker();
  
    
  };

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Are you sure want to logout from the APP?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
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

    const {quit_date,quit_time,quit_date_api,quit_time_api} = this.state;
    this.setState({isHidden: true});
     this.setState({ visible: false });
      this.setState({ visible1: false });
      this.setState({ visible2: false });
      this.setState({visible5: false})

      var momentObj = moment(quit_date_api +' '+quit_time_api, 'YYYY-MM-DDLT');
      console.log('response '+momentObj)
            axios
              .post(
                ApiName.userInfoupdate,
                {
                  quit_date_time:quit_date_api +' '+quit_time_api,
                  quit_date: quit_date_api,
                  quit_time: quit_time_api,
                  quit_timestamp: new Date(momentObj).getTime()

                },
                {
                  headers: {
                    'Authorization': jwt_token,
                  },
                },
              )
              .then((response) => {
                console.log('response '+JSON.stringify(response))
                this.setState({isHidden: false});
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
                console.log(error)
                Toast.show('There was some error. Please try again')
               
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
                      this.setState({ isHidden: false })
                      if (response.data.status == 201 || response.data.status == 200)  {
                     
                        this.setState({ visible: false })

                        if (response.data.questionarie_status == 0){
                        
                          AsyncStorage.setItem('QuestionarieStatus', '0');
                            this.props.navigation.navigate('QuestionareStack');
                        }
                        Toast.show(response.data.message);
                      }else {
                        Toast.show(response.data.message);
                        
        
                      }
                    })
                    .catch((error) => {
                     console.log("Reset  ffd data "+error)
                     Toast.show('There was some error. Please try again');

                      this.setState({ isHidden: false })
        
                    });
          }
        


  lastEntry(clickState) {
    this.setState({ visible: false })
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
    
      //if (response.data.status == 200 || response.data.status == 201) {
       
        this.setState({ isHidden: false })
      
        AsyncStorage.clear();
        AsyncStorage.setItem('LoginStatus', 'false');
        AsyncStorage.setItem('Walkthrough', 'true');
        //BackHandler.exitApp();
        
        Toast.show('You have logged out successfully');
        
        this.props.navigation.navigate('Splash');
      // }
      // else {
        // this.setState({ isHidden: false })
      // }
    })
    .catch((error) => {
     
      this.setState({ isHidden: false })
      
      AsyncStorage.clear();
      AsyncStorage.setItem('LoginStatus', 'false');
      AsyncStorage.setItem('Walkthrough', 'true');
      //BackHandler.exitApp();
      
      Toast.show('You have logged out successfully');
      
      this.props.navigation.navigate('Splash');
    });
   
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

  this.setState({quit_date: formatDate});
  this.setState({quit_date_api: formatValidDate});
  this.hideDatePicker();
};

  render() {
const {isHidden} = this.state

    return (
      <SafeAreaView style={{flex: 1,}}>
        
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
            <View style={{ width: '60%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                textAlign: 'center',

              }}>Settings</Text>
            </View>
            <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
             
             
             alignSelf:'center',
              borderRadius: 30,
              backgroundColor: '#CBE2F1',
            }}
            onPress={() => this.props.navigation.navigate('Feedback')}>
            <Text style={styles.submittext}>Feedback</Text>
        </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={{flexDirection:'column'}}>
            <View style={{ marginTop: responsiveHeight(2)}}>
            <TouchableOpacity  onPress={() => {this.setState({ visible2: true });}}>
    <View
            style={{
              flexDirection: 'row',
            //   marginLeft: responsiveWidth(32),
            //   marginTop: responsiveHeight(5),
            }}>
                    <Text style={styles.text}>Change Quit Date</Text>

 
                    <Image style={styles.img} source={require('../../images/next_arrow.png')}/>
                 

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
      <TouchableOpacity onPress={()=>this.setState({ visible2: false })} style={{alignItems:'flex-end'}}>
    <Image style={{resizeMode:'contain',width:12,height:13, justifyContent:'center', marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SFCompactDisplay-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>SELECT DATE</Text>
    <View style={{backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
    }} />


<TouchableOpacity onPress={()=> this.showDatePicker()}>
                  <View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'center', marginTop:blockMargin * 2, marginBottom:blockMarginHalf}}>
                <Text style={{
                width:'75%',
      color: '#000',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 16,marginLeft:5}} >{this.state.quit_date != '' ? this.state.quit_date : 'Select Quit Date'}</Text>
                <Image source={require('../../images/calendar_theme.png')}
                resizeMode={'contain'}
                style={{width:18,height:18, }}/>
                </View></TouchableOpacity>
                
                <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        minimumDate={new Date()}
                        onConfirm={this.handleDateConfirm}
                        onCancel={this.hideDatePicker}
                      />

                   <View style={{marginTop: responsiveHeight(0),
        borderBottomWidth: responsiveWidth(0.30),
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
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        Continue
                      </Text>
                    </TouchableHighlight>


                  
                  </View>

    </DialogContent>
  </Dialog>

                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Change_tobacco_data')}}>
                    <View
            style={{
              flexDirection: 'row',
            }}>
                    <Text style={styles.text}>Change Tobacco Data</Text>
                   
                    <Image style={styles.img1} source={require('../../images/next_arrow.png')}/>
                    
                   
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Notification_Settings',{isButton: '0'})}}>
                    <View
            style={{
              flexDirection: 'row',
            
            }}>
                    <Text style={styles.text}>Notifications and Reminders</Text>
                   
                    <Image style={styles.img2} source={require('../../images/next_arrow.png')}/>
                    
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Quit_Reasons')}}>
                    <View
            style={{
              flexDirection: 'row',
            }}>
                  

                    <Text style={styles.text}>Reasons to Quit Tobacco</Text>
                   
                    
                    <Image style={styles.img3} source={require('../../images/next_arrow.png')}/>
                  

                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {this.setState({ visible: true });}}>
                    <View
            style={{
              flexDirection: 'row',
          
            }}>
                                  
                    <Text style={styles.text}>Reset all data</Text>
                    
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
        <TouchableOpacity onPress={()=>this.setState({ visible: false })} style={{alignItems:'flex-end'}}>
        <Image style={{resizeMode:'contain',width:12,height:13, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SFCompactDisplay-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>RESET DATA</Text>
     <Text style={{color:'#202020', textAlign:'center',fontFamily: 'SFCompactDisplay-Medium',fontSize: scalable(14),marginTop: blockMarginHalf * 2,}}>This will clear all the data you've{'\n'}entered and reset the app entirely</Text>
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
                        marginTop:blockMarginHalf * 3,
                      }}
                      onPress={() => this.resetdata()}>
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
                          fontFamily: 'SFCompactDisplay-Medium',
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
                    </TouchableOpacity>
       </View>
    
       <View style={styles.view2}>
       {/* <TouchableOpacity
            style={[styles.buttonContainer1, styles.submitbutton]}
            onPress={() => this.handleBackButton()}>
            <Text style={styles.submittext}>Log Out</Text>
        </TouchableOpacity> */}
</View>
</View>  
</ScrollView>
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
      <TouchableOpacity onPress={()=>this.setState({ visible5: false })} style={{alignItems:'flex-end'}}>
    <Image style={{resizeMode:'contain',width:12,height:13, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#0072BB', textAlign:'center',fontFamily: 'SFCompactDisplay-Medium',fontSize: scalable(17),marginTop: blockMarginHalf * 2}}>SELECT TIME</Text>
    <View style={{backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
    }} />
 



<TouchableOpacity onPress={()=>this.setState({isDateTimePickerVisible: true})}>
                      <Text
                        style={{
                          fontFamily: 'SFCompactDisplay-Regular',
                          color:'black',
                          marginTop: blockMarginHalf * 6,
                          marginLeft: blockMarginHalf * 3,
                        }}>
                        {this.state.quit_time != '' ? this.state.quit_time : 'Select Quit Time'}
                      </Text>
                    </TouchableOpacity>
                  
                   <View style={{marginTop: responsiveHeight(1),
        borderBottomWidth: responsiveWidth(0.30),
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
                          fontFamily: 'SFCompactDisplay-Medium',
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
                      headerTextIOS="Pick a time"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                    

  </View>
  : null}


       </View>

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
           
    </SafeAreaView>
    );
  }
}
