/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Alert, TextInput, Dimensions, Image, ToastAndroid, TouchableOpacity} from 'react-native';
import styles from '../Questionare_Screen4/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import dateFormat from 'dateformat';
import RNDateFormat from 'react-native-date-format';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import SelectMultiple from 'react-native-select-multiple';
import CheckBox from 'react-native-checkbox-animated';
import Toast from 'react-native-simple-toast';
import Questionare_Screen5 from '../Questionare_Screen5/Questionare_Screen5';

const difficulty = [
    { label: 'Very Difficult', value: '2'},
    { label: 'Not So Difficult',value: '1'},
    { label: 'Easy', value: '0'},
    ];
 

    import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
    import {createAppContainer} from 'react-navigation';
 
    import Transparent_page from '../Transparent_page/Transparent_page';
export default class Questionare_Screen4 extends Component {


constructor(props) {
  super(props);
  this.state = {
    width: Dimensions.get('window').width,
    quit_date: '',
    time: '',
    difficult_value: '',
    difficult: '',
    value: '',
    quit_date_api: '',
  };
}
onSelectionsChange = (difficult) => {
  // selectedFruits is array of { label, value }
  this.setState({ difficult_value:difficult });
  let value = ''

  if (difficult.length > 0) {
    for (var i = 0; i < difficult.length; i++) {
     value = difficult[i].value;
    }
    console.log(value);
    this.setState({value:value})
  }else{
    this.setState({value:''})
  }

}

setChecked = (val) => {
  alert(val)
  // selectedFruits is array of { label, value }
  this.setState({val});
}

componentDidMount = () => {

};

quit_plan= async () => {
  // let mobile = await AsyncStorage.getItem('UserMobileNo');
  // let Password = await AsyncStorage.getItem('UserPassword');
  var time = moment()
  .format('hh:mm:ss a');

  // let formatDate = dateFormat('dd MMM yyyy hh:mm:ss a')


  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
  const {quit_date,value,quit_date_api} = this.state;
  console.log('screen input ==> ' + quit_date +  ' ' + time + ' ' + value);
  
if(value != '') {
  if(quit_date != '' || quit_date_api!= ''){
        axios
          .post(
            ApiName.userInfoupdate,{
 
              how_hard_to_quit: value,
              quit_date: quit_date_api,
              quit_date_time:quit_date + ' ' + time ,

             },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Quit Plan response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );
           


            if (response.data.status == 200) {
              console.log(JSON.stringify( response.data));
              AsyncStorage.setItem('SettingState', '0');

            Toast.show(response.data.message)
            this.props.navigation.navigate('Questionare_Screen5')
              // Toast.show(response.data.message);
            }
            else if (response.data.status == 401) {
              AsyncStorage.setItem('Hard_to_Quit', value);

              AsyncStorage.setItem('Quit_Date', quit_date);
              AsyncStorage.setItem(
                'JwtToken',
                'Bearer ' + response.data.jwt_token,
              );
            }
            else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log('reactNativeDemo axios error:', error);
            Toast.show('There was some error. Please try again');
          });
        }
     else {
      Toast.show('Enter Quit date');
      }
    }
        else {
            Toast.show('Select difficulty');
        }
}

        render() {

          const {difficult,checked,setChecked} = this.state;

         

          // var time = moment()
          // .format('hh:mm:ss a');
          // console.log('time:', time);
          let formatTime = dateFormat(new Date(), 'hh:mm:ss a')

          return (

            <View style={styles.container}>
              <View style={styles.view}>
              <View style={{flexDirection: 'row', width: responsiveWidth(100),flex: 0.12,backgroundColor: '#0072BB'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
     </TouchableOpacity>
     <Text style={styles.toolbar_title}>Let's Do It</Text>
</View>
                                 <View style={styles.view1}>
          <Text style={styles.content}>Do you think it will be hard to quit?</Text>
              <SelectMultiple maxSelect={1} rowStyle={styles.rowstyle} selectedCheckboxSource={require('../../images/tick_enabled.png')} checkboxSource={require('../../images/tick_disable.png')}
                items={difficulty}
                value={difficult}
                selectedItems={this.state.difficult_value}
                onSelectionsChange={this.onSelectionsChange}
            />
                </View>
                <View style={styles.view2} />

             <Text style={styles.content}>Enter Quit Date</Text>
        <View style={{flex:0.6, backgroundColor: '#FFFFFF'}}>


        {/* <DatePicker
          style={{width: responsiveWidth(95), marginTop: responsiveHeight(0.25),marginLeft: responsiveHeight(0)}}
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
              top: responsiveHeight(0.5),
              marginLeft: responsiveHeight(0.5),
            },
            dateInput: {
              marginLeft: responsiveHeight(-31),
              borderWidth: responsiveWidth(0),

            },
          }}
          onDateChange={(quit_date) => {this.setState({quit_date: quit_date});}}
        /> */}

<DatePicker
          style={{width: responsiveWidth(95), marginTop: responsiveHeight(0.25),marginLeft: responsiveHeight(0)}}
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
              top: responsiveHeight(0.5),
              marginLeft: responsiveHeight(0.5),
            },
            dateInput: {
              marginLeft: responsiveHeight(-31),
              borderWidth: responsiveWidth(0),

            },
          }}
          onDateChange={(quit_date) => {
           
            let momentObj = moment(quit_date, 'DD-MM-YYYY')
            let dateformat = moment(momentObj).format('YYYY-MM-DD')
            // RNDateFormat.formatDate(
            //     quit_date,
            //     'DD-MM-YYYY',
            //     'YYYY-MM-DD',
            //     (quit_date) => {
            //       this.setState({quit_date: quit_date});
            //       console.log('Formated date : ' + quit_date);
            //     },
            //   );
            console.log('Quit date: ' + dateformat+'--'+quit_date);
            
            this.setState({quit_date: quit_date,quit_date_api: dateformat});
        }}
        />
                                <View style={styles.view4} />


    </View>
          </View>
          {/* <CheckBox
                label="esay"
                onValueChange={this.setChecked}
        checked={checked}
        rounded={true}
        checkedBackgroundColor="#0072BB"
        unCheckedBackgroundColor="#CBCBCB"
        checkMarkColor="#FFFFFF"
      /> */}


          <View style={styles.view3}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.contbutton]}
            onPress={() => this.quit_plan()}>
            <Text style={styles.nexttext}>Next</Text>
          </TouchableOpacity>
          </View>
      </View>
          );
        }
      } 

      // const RootStack = createStackNavigator({

      //   Questionare_Screen4: Questionare_Screen4,
      //   Questionare_Screen5: Questionare_Screen5,
      
      // },
      // {
      //   initialRouteName: 'Questionare_Screen4',
      //   headerMode: 'none',
      // },
      
      // {
      //   headerMode: 'none',
      // },
      // );
      
      // const AppContainer = createAppContainer(RootStack);
      
      // export default class QuestionareScreen4stack extends React.Component {
      //   render() {
      //     return <AppContainer />;
      //   }
      // }