/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Wish_list/styles_view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImgToBase64 from 'react-native-image-base64';
import CardView from 'react-native-cardview';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Plans from '../Plans/index';
import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform, ActivityIndicator, TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';
import dateFormat from 'date-fns/format';

import ViewMoreText from 'react-native-view-more-text';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import Carousel from 'react-native-snap-carousel';

export default class Plan_Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      //userInfo
      user_id: '',
      name: '',
      mobile_no: '',
      email_id: '',
      profile_image: '',
      fcm: '',
      token: '',

      quitDate: ' - ',
      planPersonallist: [],
      activeSlide: 0,
      planEnvlist: [],
      activeSlideEnv: 0,

      your_challenge_valid: false,
      your_coping_strategy_valid: false,
   
      yourPersonalChallenge: [],
      your_challenge:'',your_coping_strategy:'',

      yourEnvSteps: [],
      your_steps:'',
      steps_valid:false
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
    // this.getUser()
  }

  getUser = async () => {

    const user_id = await AsyncStorage.getItem('UserId');
    const name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');

    if (token !== '') {
      this.setState({

        token: token,
      });

      this.Planlist(0)
    }
  };


  Planlist = async (stateType) => {
    console.log("stateType"+stateType)

    const { token,planPersonallist,planEnvlist } = this.state

    this.setState({ planPersonallist: [],planEnvlist:[] })
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.userQuitPlanIndex, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {

        console.log('plan response', response)

        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          let personalObj = []
          let envObj = []

          for(var i = 0 ; i < response.data.data.user_quit_plans.personal_challenge.length ; i++){
            if(response.data.data.user_quit_plans.personal_challenge[i].challenge !=null && response.data.data.user_quit_plans.personal_challenge[i].challenge != '' &&
            response.data.data.user_quit_plans.personal_challenge[i].copying_strategy !=null && response.data.data.user_quit_plans.personal_challenge[i].copying_strategy != ''){
              personalObj.push(response.data.data.user_quit_plans.personal_challenge[i])
            }
          }

          for(var i = 0 ; i < response.data.data.user_quit_plans.environment_challenges.length ; i++){
            if(response.data.data.user_quit_plans.environment_challenges[i].steps !=null && response.data.data.user_quit_plans.environment_challenges[i].steps != ''){
              envObj.push(response.data.data.user_quit_plans.environment_challenges[i])
            }
          }

          // if(stateType == 1 && personalObj.length > 0){
          //   console.log("yfru fdg"+stateType)
          //   this.setState({activeSlide: personalObj.length-1})
          // }else if(stateType == 2 && envObj.length > 0){
          //   console.log("yfru fg"+stateType)
          //   this.setState({activeSlideEnv: envObj.length-1})
          // }else{
          //   this.setState({activeSlideEnv: 0, activeSlide: 0})
          // }

          this.setState({
            planEnvlist: envObj, planPersonallist: personalObj
       
          });

          

          if(response.data.data.quit_date != null && response.data.data.quit_date != ''){
           
            var quit_date = new Date(response.data.data.quit_date);
            let quitFormatDate = dateFormat(quit_date, 'dd/MM/yyyy');
            this.setState({quitDate: quitFormatDate});
          }
        
          console.log("yfru"+this.state.activeSlide+"---"+this.state.activeSlideEnv)
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        console.log(error)
        Toast.show('There was some error. Please try again')

      });
  }

  ListEmpty = () => {
    const { isHidden } = this.state;
    if (!isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Text numberOfLines={2} style={{
              color: '#555555',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(14), alignItems: 'center',
            }}>No Plans Yet</Text>
          </View>
        </View>
      );
    } else if (isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
        </View>
      );
    }
  };



  renderViewMore(onPress) {
    return (
      <Text style={{
        color: '#0072BB', fontSize: scalable(11),
        fontFamily: 'SFCompactDisplay-Medium', textDecorationLine: 'underline', textDecorationStyle: "solid",
        marginTop: 1
      }} onPress={onPress}>Read more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text style={{
        color: '#0072BB', fontSize: scalable(11),
        fontFamily: 'SFCompactDisplay-Medium', textDecorationLine: 'underline', textDecorationStyle: "solid",
        marginTop: 1
      }} onPress={onPress}>Read less</Text>
    )
  }



  addChallengesData = async () => {
  
  
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let objView2 = [...this.state.yourPersonalChallenge];

    if(this.state.your_challenge != '' && this.state.your_coping_strategy != ''){
      this.setState({ isHidden: true });
    objView2[0] = {index:0, challenge:this.state.your_challenge, copying_strategy:this.state.your_coping_strategy};
    this.setState({yourPersonalChallenge: objView2})

    console.log('yourPersonalChallenge next ==> '+JSON.stringify(this.state.yourPersonalChallenge))

    const input = { 
      personal_challenges: this.state.yourPersonalChallenge,
      qp: 1
     }
    console.log(JSON.stringify(input))
            axios
              .post(
                // ApiName.userInfoupdate, {
                  ApiName.userQuitPlan,
                  input,
                {
                  headers: {
                    'Authorization': jwt_token,
                  },
                },
              )
              .then((response) => {
    
                console.log('response '+JSON.stringify(response))
    
    
                if (response.data.status == 200) {
                  this.setState({ isHidden: false });
    
                  this.setState({your_challenge:'',your_coping_strategy:'',yourPersonalChallenge:[],your_challenge_valid:false,your_coping_strategy_valid:false})
                  Toast.show(response.data.message)
                  this.setState({ planPersonallist: [],planEnvlist:[],activeSlide:0,activeSlideEnv:0})
                  this.Planlist(1)
                }
                else if (response.data.status == 401) {
               
                  this.setState({ isHidden: false });

                  AsyncStorage.clear();
                  AsyncStorage.setItem('LoginStatus', 'false');
                  AsyncStorage.setItem('Walkthrough', 'false');
        
                  Toast.show("Token expired, Please Login again to continue");
        
                  this.props.navigation.navigate('Splash');
                }
                else {
                  Toast.show(response.data.message)
                }
              })
              .catch((error) => {
                this.setState({ isHidden: false });
                console.log(error)
                Toast.show('There was some error. Please try again');
              });
         

  }else{
    this.setState({ isHidden: false });
    this.setState({your_challenge_valid:false,your_coping_strategy_valid:false})
                  
    if(this.state.your_challenge == ''){
      Toast.show('Please enter your challenges');
    }else if(this.state.your_coping_strategy == ''){
      Toast.show('Please enter your coping strategy');
    }
    
    }
  }
   

  addStepsData = async () => {
  
  
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let objView2 = [...this.state.yourEnvSteps];

    if(this.state.your_steps != ''){
      this.setState({ isHidden: true });
    objView2[0] = {index:0, name:this.state.your_steps};
    this.setState({yourEnvSteps: objView2})

    console.log('yourEnvSteps next ==> '+JSON.stringify(this.state.yourEnvSteps))

    const input = { 
      env_challenges: this.state.yourEnvSteps,
      qp: 1
     }
    console.log(JSON.stringify(input))
            axios
              .post(
                // ApiName.userInfoupdate, {
                  ApiName.userQuitPlan,
                  input,
                {
                  headers: {
                    'Authorization': jwt_token,
                  },
                },
              )
              .then((response) => {
    
                console.log('response '+JSON.stringify(response))
    
    
                if (response.data.status == 200) {
                  this.setState({ isHidden: false });
    
                  this.setState({your_steps:'',yourEnvSteps:[],steps_valid:false})
                  Toast.show(response.data.message)
                  this.setState({ planPersonallist: [],planEnvlist:[],activeSlide:0,activeSlideEnv:0})
                  this.Planlist(2)
                }
                else if (response.data.status == 401) {
                  this.setState({ isHidden: false });

                  AsyncStorage.clear();
                  AsyncStorage.setItem('LoginStatus', 'false');
                  AsyncStorage.setItem('Walkthrough', 'false');
        
                  Toast.show("Token expired, Please Login again to continue");
        
                  this.props.navigation.navigate('Splash');
                }
                else {
                  Toast.show(response.data.message)
                }
              })
              .catch((error) => {
                this.setState({ isHidden: false });
                console.log(error)
                Toast.show('There was some error. Please try again');
              });
         

  }else{
    this.setState({ isHidden: false, steps_valid: true });
      Toast.show('Please enter your step');
    }
  }
   

  carouselItem({ item }) {
    return (

      
<View style={{ width: '93%', justifyContent: 'center', alignSelf: 'center', borderColor: '#B6C0CB', borderWidth: 2, marginTop: blockMarginHalf / 2 }} >
  {/* Static Header */}
  <View style={{ width: '100%', flexDirection: 'row' }}>
    <Text style={{
      width: '49%',
      color: '#A3ACB6', fontSize: 13,
      textAlign: 'center', padding: 5,
      fontSize: scalable(14.5),
      fontFamily: 'SFCompactDisplay-Semibold', paddingBottom: blockMarginHalf / 1.5, paddingTop: blockMarginHalf / 1.5,
     alignSelf: 'center', justifyContent: 'center'
    }}>Your Challenges</Text>

    <View style={{ borderColor: '#B6C0CB', borderWidth: 1 }} />
    <Text style={{
      width: '49%',
      color: '#A3ACB6', fontSize: 13,
      textAlign: 'center', padding: 5,
      fontSize: scalable(14.5),
      fontFamily: 'SFCompactDisplay-Semibold', paddingBottom: blockMarginHalf / 1.5, paddingTop: blockMarginHalf / 1.5
     , alignSelf: 'center', justifyContent: 'center'
    }}>Your Coping Strategy</Text>
  </View>

  {/* Dynamic */}

  <View style={{ width: '100%', height: wp('23%'), flexDirection: 'row', borderTopWidth: 2, borderTopColor: '#B6C0CB' }}>
    <TextInput style={{
      width: '49%',
      color: '#B6C0CB', fontSize: 13,
      textAlign: 'center', padding: 5, textAlignVertical: "top",
      fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center', minHeight: 70
    }}
      returnKeyType="done"
      multiline={true}
      caretHidden={true}
      autoCorrect={false}
      contextMenuHidden={true}
      showSoftInputOnFocus={false}
      defaultValue={item.challenge}
      underlineColorAndroid="transparent"
      />
    
    <View style={{ borderColor: '#B6C0CB', borderWidth: 1 }} />
    <TextInput style={{
      width: '49%',
      color: '#B6C0CB', fontSize: 13,
      textAlign: 'center', padding: 5, textAlignVertical: "top",
      fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center', minHeight: 70
    }}
      returnKeyType="done"
      caretHidden={true}
      autoCorrect={false}
      contextMenuHidden={true}
      showSoftInputOnFocus={false}
      multiline={true}
      defaultValue={item.copying_strategy}
      underlineColorAndroid="transparent"
     />
     
  </View>

</View>
    );
  }


  carouselEnvItem({ item }) {
    return (

      <View style={{ flexDirection: 'column', width: '93%', justifyContent: 'center', alignSelf: 'center', 
      borderColor: '#B6C0CB', borderWidth: 2 }}>

        <View style={{ width: '100%' }}>

          <Text style={{
            textAlign: 'center',
            color: '#A3ACB6',
            fontSize: scalable(16),
            fontFamily: 'SFCompactDisplay-Semibold', paddingBottom: blockMarginHalf / 1.5, paddingTop: blockMarginHalf / 1.5
          }}
          >
            {'Your Steps'} </Text>

          <View style={{ width: '100%', justifyContent: 'center', borderTopColor: '#B6C0CB', borderTopWidth: 2 }} />
          <View style={{ width: '100%', height: wp('23%'), justifyContent: 'center', alignItems: 'center', paddingLeft: blockMarginHalf * 1, paddingRight: blockMarginHalf * 1, paddingBottom: blockMarginHalf, paddingTop: blockMarginHalf }}>
           
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', }}>
              <TextInput style={{
      width: '100%',
      color: '#B6C0CB', fontSize: 13,
      textAlign: 'center', padding: 5, textAlignVertical: "top",
      fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center', minHeight: 70
    }}
      returnKeyType="done"
      caretHidden={true}
      autoCorrect={false}
      contextMenuHidden={true}
      showSoftInputOnFocus={false}
      multiline={true}
      defaultValue={item.steps}
      underlineColorAndroid="transparent"
     /></View>
         

          </View>
        </View>

      </View>


    );
  }



  



  render() {
    const { isHidden, planPersonallist, planEnvlist, quitDate } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height:'100%',
        width: '100%'}}>
        <View style={{
          flexDirection: 'row', width: '100%', height: '12%',
          backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
        }}>
          <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}>

           

          </View>
          <View style={{ width: '76%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              color: '#FFFFFF',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(18),
              justifyContent: 'center',
              textAlign: 'center',

            }}>Plans</Text>
          </View>
          <View style={{ width: '12%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>


            <Image style={{
              width: 0,
              height: 0,
              tintColor: '#0072bb',
              resizeMode: 'contain'
            }} source={require('../../images/share.png')} />


          </View>
        </View>
      

            <ScrollView style={{   width: '100%', }} keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
  <KeyboardAwareScrollView
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                      >
            <View style={{
              flexDirection: 'column', width: '100%',
             
            }}>

           
                <View style={{ flexDirection: 'column', width: '100%' }}>

                  <CardView style={{
                    backgroundColor: '#CBE2F1',
                    marginTop: blockMargin,
                    marginBottom: blockMarginHalf / 2,
                    width: '90%', alignSelf: 'center', justifyContent: 'center',
                  }}
                    cardElevation={3}
                    cardMaxElevation={5}
                    cornerRadius={blockMargin}>

                    <View style={{ width: '100%', flexDirection: 'column', padding: blockMargin, justifyContent: 'center' }}>

                      <Text numberOfLines={2} style={{
                        marginLeft: blockMarginHalf,
                        color: '#000',
                        fontFamily: 'SFCompactDisplay-Medium',
                        fontSize: scalable(20),
                        textAlign: 'center',
                      }}>
                        {quitDate}
                      </Text>

                      <Text numberOfLines={2} style={{
                        marginTop: blockMarginHalf / 6, marginLeft: blockMarginHalf, marginBottom: blockMarginHalf / 2,
                        color: '#0072BB',
                        fontFamily: 'SFCompactDisplay-Medium',
                        fontSize: scalable(15),
                        textAlign: 'center',
                      }}>
                        {'Your Quit Date'}
                      </Text>

                    </View>

                  </CardView>
                </View>

                <View style={{ width: '93%', justifyContent: 'center', backgroundColor: '#FFFFFF', alignSelf: 'center' }}>



<Text style={{
  width: '93%',
  color: '#A3ACB6', fontSize: 15.5, marginTop: blockMarginHalf / 2, marginBottom: blockMarginHalf,
  textAlign: 'left',
  fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center'
}}>{"Identify personal challenges that may make it difficult for you to quit using tobacco and how you plan to overcome those challenges."}</Text>



<Text style={{
  width: '93%',
  color: '#7F868E', fontSize: 15.5, marginTop: blockMarginHalf / 2, 
  textAlign: 'left',
  fontFamily: 'SFCompactDisplay-Semibold', alignSelf: 'center', justifyContent: 'center'
}}>{"Challenges : "}</Text>


<TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      width: '93%', justifyContent: 'center', alignSelf: 'center',minHeight: 40
                    }}
                
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    value={this.state.your_challenge}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.setState({your_challenge: value})}

                  />
                   <View style={{
                    borderBottomWidth: 2,

                    borderBottomColor: '#B6C0CB',
                    width: '93%', justifyContent: 'center', alignSelf: 'center'
                  }} />


                  
<Text style={{
  width: '93%',
  color: '#7F868E', fontSize: 15.5, marginTop: blockMargin, 
  textAlign: 'left',
  fontFamily: 'SFCompactDisplay-Semibold', alignSelf: 'center', justifyContent: 'center'
}}>{"Coping Strategy : "}</Text>

                  
<TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      width: '93%', justifyContent: 'center', alignSelf: 'center',minHeight: 40
                    }}
                
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    value={this.state.your_coping_strategy}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.setState({your_coping_strategy: value})}

                  />
                   <View style={{
                    borderBottomWidth: 2,

                    borderBottomColor: '#B6C0CB',
                    width: '93%', justifyContent: 'center', alignSelf: 'center'
                  }} />


<TouchableOpacity onPress={() => this.addChallengesData()}>
  <View style={{
    opacity: 100,
    margin: blockMargin, justifyContent: 'center'
  }}>
    <Image

      resizeMode='contain'
      source={require('../../images/plus_dark.png')}
      style={{
        width: 35,
        height: 35,
        resizeMode: 'contain',

        justifyContent: 'center',

        alignSelf: 'center',

      }}
    />
     <Text style={{
      width: '49%',
      color: '#B6C0CB', fontSize: 14,
      textAlign: 'center', padding: 5,
      fontFamily: 'SFCompactDisplay-Semibold', alignSelf: 'center', justifyContent: 'center'
    }}>Save and add more</Text>
  </View>
</TouchableOpacity>


</View>

{ planPersonallist.length > 0 &&
<View style={{ flexDirection: 'row', marginTop: blockMargin, justifyContent:'center', alignItems:'center'}}>
     <TouchableOpacity onPress={()=> this.state.activeSlide !== 0 ?  this.setState({activeSlide:this.state.activeSlide-1}) : null}>               
<Image source={require('../../images/back_arrow.png')} style={{height:25, width:25, tintColor:'#B6C0CB',  resizeMode:'contain'}}/></TouchableOpacity>
<View style={{width:deviceWidth-60}}>
                    <Carousel
                      lockScrollWhileSnapping={true}
                      enableMomentum={true}
                      autoplay={false}
                      layout={'default'}
                      data={planPersonallist}
                      renderItem={this.carouselItem}
                      sliderWidth={deviceWidth-60}
                      itemWidth={deviceWidth-60}
                      activeSlideAlignment={'start'}
                      firstItem={this.state.activeSlide}
                      onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    />
                  </View>
<TouchableOpacity onPress={()=>this.setState({ activeSlide: this.state.activeSlide !== planPersonallist.length-1 ? this.state.activeSlide + 1 : this.state.activeSlide})}>
<Image source={require('../../images/next_arrow.png')} style={{height:25, width:25, tintColor:'#B6C0CB', resizeMode:'contain'}}/></TouchableOpacity>

                  </View>
}




<View style={{ width: '93%', justifyContent: 'center', backgroundColor: '#FFFFFF', alignSelf: 'center' }}>



<Text style={{
  width: '93%',
  color: '#A3ACB6', fontSize: 15.5, marginTop: blockMargin, marginBottom: blockMarginHalf,
  textAlign: 'left',
  fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center'
}}>{"Write down steps you will take to make your environment tobacco-free."}</Text>

<TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      width: '93%', justifyContent: 'center', alignSelf: 'center',minHeight: 40
                    }}
                
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    value={this.state.your_steps}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.setState({your_steps: value})}

                  />
                   <View style={{
                    borderBottomWidth: 2,

                    borderBottomColor: '#B6C0CB',
                    width: '93%', justifyContent: 'center', alignSelf: 'center'
                  }} />

{/* {this.state.steps_valid && <Text style={{ color: 'red',
                      fontSize: 10, width: '93%',justifyContent: 'center', alignSelf: 'center', 
                      fontFamily: 'SFCompactDisplay-Regular'}}>Please Enter your steps</Text>} */}

<TouchableOpacity onPress={() => this.addStepsData()}>
  <View style={{
    opacity: 100,
    margin: blockMargin, justifyContent: 'center'
  }}>
    <Image

      resizeMode='contain'
      source={require('../../images/plus_dark.png')}
      style={{
        width: 35,
        height: 35,
        resizeMode: 'contain',

        justifyContent: 'center',

        alignSelf: 'center',

      }}
    />
     <Text style={{
      width: '49%',
      color: '#B6C0CB', fontSize: 14,
      textAlign: 'center', padding: 5,
      fontFamily: 'SFCompactDisplay-Semibold', alignSelf: 'center', justifyContent: 'center'
    }}>Save and add more</Text>
  </View>
</TouchableOpacity>


</View>
                 { planEnvlist.length > 0 && <View style={{ flexDirection: 'row', marginTop: blockMargin, marginBottom: blockMargin, justifyContent:'center', alignItems:'center'}}>
     <TouchableOpacity onPress={()=> this.state.activeSlideEnv !== 0 ?  this.setState({activeSlideEnv:this.state.activeSlideEnv-1}) : null}>               
<Image source={require('../../images/back_arrow.png')} style={{height:25, width:25, tintColor:'#B6C0CB',  resizeMode:'contain'}}/></TouchableOpacity>
<View style={{width:deviceWidth-60}}>
                    <Carousel
                      lockScrollWhileSnapping={true}
                      enableMomentum={true}
                      autoplay={false}
                      layout={'default'}
                      data={planEnvlist}
                      renderItem={this.carouselEnvItem}
                      sliderWidth={deviceWidth-60}
                      itemWidth={deviceWidth-60}
                      activeSlideAlignment={'start'}
                      firstItem={this.state.activeSlideEnv}
                      onSnapToItem={(index) => this.setState({ activeSlideEnv: index })}
                    />
</View>
<TouchableOpacity onPress={()=>this.setState({ activeSlideEnv: this.state.activeSlideEnv !== planEnvlist.length-1 ? this.state.activeSlideEnv + 1 : this.state.activeSlideEnv})}>

<Image source={require('../../images/next_arrow.png')} style={{height:25, width:25, tintColor:'#B6C0CB', resizeMode:'contain'}}/></TouchableOpacity>

                  </View>}
             
              </View>
          </KeyboardAwareScrollView>

</ScrollView>
         
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



  {/* <FlatList
                  style={{ marginTop: blockMarginHalf }}
                  keyboardShouldPersistTaps={'handled'}
                  data={planlist}
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                      
                      
                        <CardView style={{
                          backgroundColor: '#CBE2F1',

                          marginBottom: blockMarginHalf * 1.5,
                          width: '90%',
                        }}
                          cardElevation={3}
                          cardMaxElevation={5}
                          cornerRadius={blockMargin / 2}>


                          <View style={{ width: '100%',  padding: blockMarginHalf }}>
                           
                            <View style={{ width: '100%',  justifyContent: 'center', paddingLeft: blockMarginHalf * 1, paddingRight: blockMarginHalf * 1, paddingBottom: blockMargin, paddingTop: blockMargin }}>
                             
                              
                              
                              <ViewMoreText
          numberOfLines={2}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          style={{color: '#202020',
          fontSize: scalable(12),
          fontFamily: 'SFCompactDisplay-Regular'}}
          textStyle={{textAlign: 'left'}}
        >
          <Text style={{
                                  color: '#202020',
                                  fontSize: scalable(14),
                                  fontFamily: 'SFCompactDisplay-Regular',
                                }}>
          {item.notes} </Text>
        </ViewMoreText>

                            </View>
                          </View>

                        </CardView>

                      

                    </View>

                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                /> */}

// const RootStack = createStackNavigator({
//   Plans: Plans,
//   Plan_Listing: Plan_Listing,
// },
//   {
//     initialRouteName: 'Plan_Listing',
//     headerMode: 'none',
//   },

//   {
//     headerMode: 'none',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Planstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
