/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, Settings, SafeAreaView,ActivityIndicator} from 'react-native';
import styles from '../Questionare_Screen5/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

import Toast from 'react-native-simple-toast';
//import Settings_Screen from '../Settings/Settings';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer,} from 'react-navigation';
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
import Disclaimer from '../Disclaimer/Disclaimer';

const tobacco = [
    { label: 'Feel more agile', value: 'one' },
    { label: 'Protect my general health', value: 'two' },
    { label: 'Improve my blood circulation', value: 'three' },
    { label: 'Improve my breath', value: 'four' },
    { label: 'Recuperate my sense of smell', value: 'five' },
    { label: 'Get rid of my constant cough', value: 'six' },
    { label: 'Be able to taste food again', value: 'seven' },
    { label: 'Spend more time with my family', value: 'eight' },
    { label: 'Feel less fatigue', value: 'nine' },
    { label: 'Yield more, physically and mentally', value: 'ten' },
    { label: 'Gain Freedom', value: 'eleven' },
    { label: 'Be more resistant in order to practice sports', value: 'tweleve' }];

export default class Questionare_Screen5 extends Component {
 
constructor(props) {
  super(props);
  this.state = {
    width: Dimensions.get('window').width,
    quitReason: [],
    reasons: [],
    reasons_value:[],
    use: '',
    SettingState:'',
    transparency: false,
    isHidden: false,

  };
}

onSelectionsChange = (reasons) => {
  // selectedFruits is array of { label, value }
  // this.setState({ reasons_value:reasons });
  // var use = 0;

  // if (reasons.length > 0) {
  //   for (var i = 0; i < reasons.length; i++) {
  //   use =  reasons[i].value + ',';
  //   }
  //   this.setState({use:use});
  // }

  this.setState({ reasons_value:reasons });
  let use = []
  let useId=[]
 
   if (reasons.length > 0) {
     for (var i = 0; i < reasons.length; i++) {
      use.push(reasons[i].label);
      useId.push(reasons[i].value);
     }
     this.setState({use:useId});
   }else{
     this.setState({use:''});
   }

}



componentDidMount = () => {
  
  this.quit_reason();

};


quit_reason= async () => {
  // let mobile = await AsyncStorage.getItem('UserMobileNo');
  // let Password = await AsyncStorage.getItem('UserPassword');
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

  this.setState({isHidden: true});


        axios
          .post(
            ApiName.quit_reasons,{ },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
          
            
            this.setState({isHidden: false});
            if (response.data.status == 200) {
              const obj = [];

              for (var i = 0; i < response.data.data.length; i++) {
                  obj.push({
                  value: response.data.data[i].id + '',
                  label: response.data.data[i].name,
                });
              }
              this.setState({quitReason: obj});
            }
           
          })
          .catch((error) => {
            this.setState({isHidden: false});
            Toast.show('There was some error. Please try again');
           
          });
}


update= async () => {
  // let mobile = await AsyncStorage.getItem('UserMobileNo');
  // let Password = await AsyncStorage.getItem('UserPassword');


  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
  let SettingState = await AsyncStorage.getItem('SettingState');
  
  this.setState({SettingState: SettingState});
  const {use} = this.state;

if (use != ''){
  this.setState({isHidden: true});
        axios
          .post(
            ApiName.userInfoupdate,{
              quit_reasons: use,
             },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
           
            this.setState({isHidden: false});
            if (response.data.status == 200) {
            

            
              this.props.navigation.navigate('Disclaimer')
               Toast.show(response.data.message);
            
            }
            else {
              Toast.show(response.data.message);
            }
          })
          .catch((error) => {
            this.setState({isHidden: true});
            Toast.show('There was some error. Please try again');
           
          });
}
else {
  Toast.show('Select Reasons')
}
}


  render() {

const {quitReason,reasons,transparency,isHidden} = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.view}>
        
        <View style={{
            flexDirection: 'row', width: '100%', 
            backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
          }}>
            <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', 
            alignContent: 'center', alignSelf: 'center', }}>

              <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.props.navigation.navigate('Questionare_Screen4')}>

                <Image style={{
                  width: responsiveWidth(3),
                  height: responsiveHeight(4),

                  resizeMode: 'contain'
                }} source={require('../../images/back_arrow.png')} />

              </TouchableOpacity>

            </View>
            
            <View style={{ width: '76%',  alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Let's Do It</Text>
            </View>
            <View style={{ width: '12%', alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>


                <Image style={{
                  width: 0,
                  height: 0,
                  tintColor: '#0072bb',
                  resizeMode: 'contain'
                }} source={require('../../images/share.png')} />

          
            </View>
          </View>
    
       
    <View style={{height:'88%', width:'100%',}}>
                    <Text style={styles.text_ques2}>Make a list of your reasons to quit tobacco use</Text>
                    <SelectMultiple style={{marginTop:blockMarginHalf * 2}} labelStyle={{fontFamily: 'SFCompactDisplay-Regular',color:'black'}}  rowStyle={styles.rowstyle} selectedCheckboxSource={require('../../images/tick_enabled.png')} checkboxSource={require('../../images/tick_disable.png')}
          items={quitReason}
          value={reasons}
          selectedItems={this.state.reasons_value}
          onSelectionsChange={this.onSelectionsChange} />

<View style={styles.view2}>
       <TouchableOpacity
            style={[styles.buttonContainer, styles.submitbutton]}
            onPress={() => this.update()}>
            <Text style={styles.submittext}>Continue</Text>
          </TouchableOpacity>
</View>

       </View>
     
{!transparency &&
      <View style={{flex:1,  height: '100%', width: '100%', position: 'absolute'}}>
      <TouchableOpacity onPress={() => this.setState({transparency: true})}>
      <View style={styles.container2}>
          
         <View style={{flex:1, backgroundColor: '#0072BB', height: '100%', width: '100%', position: 'absolute'}}>

           <View style={{flex:0.45}}>
               
        <Image
            source={require('../../images/cloud.png')}
            style={styles.cloud_img}>
        </Image>
        </View>
        
        <View style={{flex: 0.55}}>
          <Image style={styles.img} source={require('../../images/transparent.png')}/>
        </View>
        </View>
      </View>
      </TouchableOpacity>
      </View>
  }
      </View>
      {this.state.isHidden ? (
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

// const RootStack = createStackNavigator({

//   Questionare_Screen5: Questionare_Screen5,
//   Disclaimer: Disclaimer,
//   Settings_Screen: Settings_Screen,

// },
// {
//   initialRouteName: 'Questionare_Screen5',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class QuestionareScreen5stack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }