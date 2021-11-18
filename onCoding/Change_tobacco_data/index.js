/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-material-dropdown-v2';

import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputLayout} from 'rn-textinputlayout';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Dialog, {DialogTitle, DialogContent,DialogFooter } from 'react-native-popup-dialog';
import Toast from 'react-native-simple-toast';


export default class Change_tobacco_data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money_spent: '',
            tobacco_count: '',
            first_tobacco: '',
            firsttobacco:[],
            visible: false,
            visible1: false,
            visible2: false,

        };
    }
    componentDidMount = () => {
      this.getData();
      this.onGetFirst();
      this.show();
    };

    getData = async () => {
      try {
        const {navigation} = this.props;
        // const UserId = navigation.getParam('UserId', 'Id');
      //const MobileNo = navigation.getParam('MobileNumber', 'No');
      //const CountryCode = navigation.getParam('CountryCode', 'CC');
      //const Password = navigation.getParam('Password', 'Pwd');

      let LoginId = await AsyncStorage.getItem('LoginId');
     
      let MobileNo = await AsyncStorage.getItem('UserMobileNo');
      let CountryCode = await AsyncStorage.getItem('CountryCode');
      let Password = await AsyncStorage.getItem('Password');
      let Money_Spent= await AsyncStorage.getItem('Money_Spent');
      let Tobacco_Count= await AsyncStorage.getItem('Tobacco_Count');
      let First_Smoke= await AsyncStorage.getItem('First_Smoke');

      // const MobileNumber = navigation.getParam('MobileNumber', 'MobileNumber');
      //alert (LoginId+' - '+UserId+' - '+MobileNo);
      this.setState({email_or_phone:MobileNo});
      this.setState({id:LoginId});
      this.setState({country_code:CountryCode});
    
      this.setState({password:Password});
  
        let otpState = await AsyncStorage.getItem('OtpState');
        this.setState({otpState: otpState});
  // alert(otpState);
  
        //alert(parsed.email);
      } catch (error) {
        console.log(error);
      }
    };

    async onValueChangeCat(value) {
   alert(JSON.stringify(value));
    }

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
          console.log(
            'Show Data response ',
            'response get details:==> ' + JSON.stringify(response.data),
          );

          if (response.data.status == 200) {
            console.log(JSON.stringify(response.data));
            this.setState({money_spent:response.data.data.money_spent});
            this.setState({tobacco_count:response.data.data.tobacco_count});
            this.setState({first_tobacco:response.data.data.first_smoke_timing.Occurence});
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
  

    onGetFirst= async () => {
      let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    
            axios
              .post(
                ApiName.first_smoke_timings,{ },
                {
                  headers: {
                    'Authorization': jwt_token,
                  },
                },
              )
              .then((response) => {
                console.log(
                  'First Smoke response ',
                  'response get details:==> ' + JSON.stringify(response.data),
                );

                const obj = [];


                for (var i = 0; i < response.data.data.length; i++) {
                    obj.push({
                    value: response.data.data[i].id + '',
                    label: response.data.data[i].Occurence,
                  });
                }
    
                this.setState({firsttobacco: obj});
    
                if (response.data.status == 200) {
    
                  console.log(JSON.stringify( response.data));
                
    
                  // Toast.show(response.data.message);
                }
                else {
                  alert(response.data.message);
                }
              })
              .catch((error) => {
    
                console.log('reactNativeDemo axios error:', error);
              });
    }


    Updatedata = async () =>{

        let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

        const {money_spent,tobacco_count,first_tobacco_id} = this.state;

          console.log('login input ==> ' + first_tobacco_id  + tobacco_count + money_spent);
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
                    console.log(
                      'login response ',
                      'response get details:==> ' + JSON.stringify(response.data),
                    );
      
                    // Toast.show(response.data.message);
      
                    if (response.data.status == 200) {
                     
      
                      AsyncStorage.setItem(
                        'JwtToken',
                        'Bearer ' + response.data.jwt_token,
                      );
                      AsyncStorage.setItem('Gender',response.data.data.gender);
                      AsyncStorage.setItem('Education',response.data.data.education);
                      Toast.show(response.data.message);

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

render() {
  const {money_spent,tobacco_count,first_tobacco,firsttobacco,Money_Spent} = this.state;

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
                <Text style={{color: '#202020', fontFamily: 'SF-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3}}>How much do you spend on tobacco products in a day?</Text>
                <View style={{flexDirection: 'row'}}>

                <TouchableOpacity  onPress={() => {this.setState({ visible: true });}}>
              <Text style={{color: '#0072BB', fontFamily: 'SF-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2}}>${money_spent}</Text>
                </TouchableOpacity>
                <Dialog
                    width={0.8}
                        // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                        containerStyle={{zIndex: 10,elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <DialogContent>
    <View>
        <TouchableOpacity onPress={()=>this.setState({ visible: false })}>
        <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#202020', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(14),marginTop: blockMarginHalf * 2,lineHeight: deviceHeight / 25}}>How much do you spend on tobacco products in a day?</Text>

     <TextInput style={{color:'#0072BB',fontSize: scalable(14), fontFamily:'SF-Medium'}}
            placeholder=""
            placeholderTextColor="#0072BB"
            autoCorrect={false}
            underlineColorAndroid="#CBCBCB"
            onChangeText={(value) => this.setState({money_spent: value})} value={this.state.money_spent}
            returnKeyType="done"
            keyboardType="numeric"
          />

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
                        marginTop:blockMarginHalf * 2,
                      }}
                      onPress={() => this.Updatedata()}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        okay
                      </Text>
                    </TouchableHighlight>
                  </View>
     </View>
      </DialogContent>
      </Dialog>


                <Image source={require('../../images/down_arrow.png')} style={{width: 10,
        height: 8,
        marginTop: blockMarginHalf * 2,
        alignSelf:'center',
        resizeMode: 'contain',
        marginLeft: blockMarginHalf * 2}} />
                </View>


                <Text style={{color: '#202020', fontFamily: 'SF-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3}}>Mention the Quantity of Tobacco used per day</Text>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity  onPress={() => {this.setState({ visible1: true });}}>

                <Text style={{color: '#0072BB', fontFamily: 'SF-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2}}>{tobacco_count}</Text>
                </TouchableOpacity>

                <Dialog
                    width={0.8}
                        // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                        containerStyle={{zIndex: 10,elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.visible1}
    onTouchOutside={() => {
      this.setState({ visible1: false });
    }}
  >
    <DialogContent>
    <View>
        <TouchableOpacity onPress={()=>this.setState({ visible1: false })}>
        <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#202020', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(14),marginTop: blockMarginHalf * 2,lineHeight: deviceHeight / 25}}>Mention the Quantity of Tobacco used per day</Text>

     <TextInput style={{color:'#0072BB',fontSize: scalable(14), fontFamily:'SF-Medium'}}
            placeholder=""
            placeholderTextColor="#0072BB"
            autoCorrect={false}
            underlineColorAndroid="#CBCBCB"
            onChangeText={(value) => this.setState({tobacco_count: value})} value={this.state.tobacco_count}
            returnKeyType="done"
            keyboardType="numeric"
          />

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
                        marginTop:blockMarginHalf * 2,
                      }}
                      onPress={() => this.Updatedata()}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        okay
                      </Text>
                    </TouchableHighlight>
                  </View>
     </View>
      </DialogContent>
      </Dialog>
                <Image source={require('../../images/down_arrow.png')} style={{width: 10,
        height: 8,
        marginTop: blockMarginHalf * 2,
        alignSelf:'center',
        resizeMode: 'contain',
        marginLeft: blockMarginHalf * 2}} />
                </View>


                <Text style={{color: '#202020', fontFamily: 'SF-Medium', fontSize: scalable(15), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 3}}>How soon after you wake up do you use tobacco?</Text>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity  onPress={() => {this.setState({ visible2: true });}}>
                <Text style={{color: '#0072BB', fontFamily: 'SF-Medium', fontSize: scalable(14), marginLeft: blockMarginHalf * 3, marginTop: blockMarginHalf * 2}}>{first_tobacco}</Text>
                </TouchableOpacity>

                <Dialog
                    width={0.8}
                        // dialogTitle={<DialogTitle title="RESET DATA" style={{backgroundColor: '#FFFFFF'}} textStyle={{color:'#0072BB'}} />}
                        containerStyle={{zIndex: 10,elevation: 10}}
                        dialogStyle={{backgroundColor: '#FFFFFF'}}
    visible={this.state.visible2}
    onTouchOutside={() => {
      this.setState({ visible2: false });
    }}
  >
    <DialogContent>
    <View>
        <TouchableOpacity onPress={()=>this.setState({ visible2: false })}>
        <Image style={{resizeMode:'contain',width:12,height:13, marginLeft: blockMarginHalf * 35, marginTop: blockMarginHalf * 2}} source={require('../../images/close.png')}></Image></TouchableOpacity>
     <Text style={{color:'#202020', textAlign:'center',fontFamily: 'SF-Medium',fontSize: scalable(14),marginTop: blockMarginHalf * 2,lineHeight: deviceHeight / 25}}>Please Select One</Text>

     <View
            style={{
              flexDirection: 'row',
              marginTop: blockMarginHalf * 2,
            }}>
     <Dropdown
         underlineColor="transparent"
         ref="first_tobacco"
         value={first_tobacco}
         onChangeText={first_tobacco => {
          for (var i = 0; i < firsttobacco.length; i++) {
            if (firsttobacco[i].value == first_tobacco){
                        this.setState({first_tobacco:firsttobacco[i].label});
                        this.setState({first_tobacco_id:firsttobacco[i].value});
            }

            }
        }}
                 placeholder="Select Your Answer"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="false"
         dropdownPosition={0}
         style={{backgroundColor:'#FFFFFF',marginTop: blockMarginHalf / 2,marginLeft: blockMarginHalf * 3, fontSize: scalable(14),width: responsiveWidth(52),height: 35}}
         itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: blockMarginHalf,fontSize: scalable(14),height: 25 }}
         pickerStyle={{width: responsiveWidth(65),  margin:responsiveWidth(5), marginTop: blockMarginHalf * 4,marginLeft: blockMarginHalf * 5,fontFamily: 'SF-Medium'  }}
                      inputContainerStyle={{ borderBottomColor: 'transparent'}}
         data={firsttobacco}
         valueExtractor={({ value }) => value}
      />
      <Image source={require('../../images/down_arrow.png')} style={{width: 10,
        height: 8,
        marginTop: blockMarginHalf * 3,
        marginRight:blockMarginHalf * 15,
        resizeMode: 'contain'}}/>
          
</View>

<View style={{borderBottomWidth: responsiveWidth(0.22),
  marginTop: blockMarginHalf * 1,
  borderBottomColor: '#B6C0CB',
  width: deviceWidth /1.90,
  marginLeft:blockMarginHalf * 4.5}} />

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
                      onPress={() => this.Updatedata()}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'SF-Medium',
                          fontSize: responsiveFontSize(2),
                        }}>
                        okay
                      </Text>
                    </TouchableHighlight>
                  </View>
     </View>
      </DialogContent>
      </Dialog>

                <Image source={require('../../images/down_arrow.png')} style={{width: 10,
        height: 8,
        marginTop: blockMarginHalf * 2,
        alignSelf:'center',
        resizeMode: 'contain',
        marginLeft: blockMarginHalf * 2}} />
                </View>

            </View>
        </View>
    );
}
}