/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Dimensions, Alert, Image, TouchableOpacity, Settings} from 'react-native';
import styles from '../Questionare_Screen5/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from 'react-native-checkbox-animated';
import Toast from 'react-native-simple-toast';
//import Settings_Screen from '../Settings/Settings';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

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
  };
}

onSelectionsChange = (reasons) => {
  // selectedFruits is array of { label, value }
  this.setState({ reasons_value:reasons });
  var use = 0;

  if (reasons.length > 0) {
    for (var i = 0; i < reasons.length; i++) {
    use = use + reasons[i].label + ',';
    }
    console.log(use);
    this.setState({use:use});
  }

}



componentDidMount = () => {
  
  this.quit_reason();

};


quit_reason= async () => {
  // let mobile = await AsyncStorage.getItem('UserMobileNo');
  // let Password = await AsyncStorage.getItem('UserPassword');
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

 

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
            console.log(
              'Quit Reason response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );
            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,
              });
            }
            this.setState({quitReason: obj});

            if (response.data.status == 200) {
              console.log(JSON.stringify( response.data));
             
              // Toast.show(response.data.message);
            }
            else {
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            console.log('reactNativeDemo axios error:', error);
          });
}


update= async () => {
  // let mobile = await AsyncStorage.getItem('UserMobileNo');
  // let Password = await AsyncStorage.getItem('UserPassword');

  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
  let SettingState = await AsyncStorage.getItem('SettingState');
  // alert(SettingState);
  this.setState({SettingState: SettingState});
  const {use} = this.state;
  console.log('screen input ==> ' + use + 'setting state' + SettingState);
if (use != ''){
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
            console.log(
              'Update Reason response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );
            // const obj = [];

            // for (var i = 0; i < use.length; i++) {
            //     obj.push({
            //     value: use[i].label + '',
            //     label: use[i].value,
            //   });
            // }
            // this.setState({reasons_value: obj});

            if (response.data.status == 200) {
              console.log(JSON.stringify( response.data));
              this.props.navigation.navigate('Disclaimer')
               Toast.show(response.data.message);
            //   if (SettingState == 1) {
            //   //  this.props.navigation.navigate('Settings_Screen')
            //     Toast.show(response.data.message);
            //     this.props.navigation.navigate('Settings')
            //   }
            //   else {
            // this.props.navigation.navigate('Disclaimer')
            //    Toast.show(response.data.message);
            //   }
            }
            else {
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            console.log('reactNativeDemo axios error:', error);
          });
}
else {
  Toast.show('Select Reasons')
}
}


  render() {

const {quitReason,reasons,transparency} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.view}>
        <View style={{flexDirection: 'row', width: responsiveWidth(100),flex: 0.1,backgroundColor: '#0072BB'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Transparent_page')}>
     <Text style={styles.toolbar_title}>Let's Do It</Text>
     </TouchableOpacity>
</View>
    <View style={{ flex: 1, marginTop: responsiveHeight(2)}}>
                    <Text style={styles.text_ques2}>Make a list of your reasons to quit tobacco</Text>
                    <SelectMultiple rowStyle={styles.rowstyle} selectedCheckboxSource={require('../../images/tick_enabled.png')} checkboxSource={require('../../images/tick_disable.png')}
          items={quitReason}
          value={reasons}
          selectedItems={this.state.reasons_value}
          onSelectionsChange={this.onSelectionsChange} />
       </View>
       <View style={styles.view2}>
       <TouchableOpacity
            style={[styles.buttonContainer, styles.submitbutton]}
            onPress={() => this.update()}>
            <Text style={styles.submittext}>Submit</Text>
          </TouchableOpacity>
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
   
      </View>
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