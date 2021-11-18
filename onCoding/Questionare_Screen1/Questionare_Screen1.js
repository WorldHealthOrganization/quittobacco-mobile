/* eslint-disable prettier/prettier */
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import React, {Component} from 'react';
import {View, Text, TextInput, Dimensions, Image, Alert,Keyboard,TouchableOpacity} from 'react-native';
import styles from '../Questionare_Screen1/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import DatePicker from 'react-native-datepicker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown-v2';
import {Picker} from '@react-native-community/picker';
import {TextInputLayout} from 'rn-textinputlayout';
import RNDateFormat from 'react-native-date-format';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

import CheckBox from 'react-native-checkbox-animated';
import Settings from '../Settings/Settings';
import Welcome from '../Welcome/Welcome';
import dateFormat from 'date-fns/format';
import moment from 'moment';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
const tobacco = [
    { label: 'When I feel Stressed', value: 'one' },
    { label: 'When I am feeling down or sad', value: 'two' },
    { label: 'When I feel irritable, on edge, grouchy', value: 'three' },
    { label: 'When I am having trouble thinking clearly', value: 'four' },
    { label: 'When I am feeling restless and jumpy', value: 'five' },
    { label: 'When I am stressed with work', value: 'six' },
    { label: 'When I hangout with friends', value: 'seven' },
    { label: 'When I am partying with friends', value: 'eight' },
    { label: 'When I got to Social meetings', value: 'nine' }];


  export default class Questionare_Screen1 extends Component {
  state = {
    choosenIndex: '',
};
// state1 = { selectedReason: [] }
constructor(props) {
  super(props);
  this.state = {
    width: Dimensions.get('window').width,
    gender_value:'',
    gender:[],
    date_of_birth:'',
    education_id: '',
    education: '',
    profession_id: '',
    professions: '',
    tobacco_id: '',
    type_tob: '',
    tobacco_product_id: '',
    tobacco_products: '',
    frequent_smoke_id: '',
    first_smoke_timing_id: '',
    first_tobacco_use_age: '',
    money_spent: '',
    tobacco_count: '',
    frequent:'',
    first_tobacco:'',
    // how_hard_to_quit : '',
    usage_count:'',
    use_reasons:'',
    jwttoken:'',
    eduList:[],
    products:[],
    occupation:[],
    firsttobacco:[],
    savings_amt:[],
    usereasons:[],
    tobacco_type:[],
    frequent_smokes:[],
    selectedReason: [],
    reasons: [],
    error: true,
    error1: true,
    error2: true,
    reasons_value: [],
    use: '',
    tobacco_content: 'What Tobacco product you consume?',
    isDateTimePickerVisible: false,
    date_of_birth_api: '',
  };
}
onSelectionsChange = (reasons) => {
  // selectedFruits is array of { label, value }
  this.setState({ reasons_value:reasons });
 let use = []
 let useId=[]

  if (reasons.length > 0) {
    for (var i = 0; i < reasons.length; i++) {
     use.push(reasons[i].label);
     useId.push(reasons[i].value);
    }
    console.log(use+"--"+useId);
    this.setState({use:useId});
  }else{
    this.setState({use:''});
  }

}

onTextChanged(e) {
  if (/^\d+$/.test(e.toString()) || e === '') { 
    this.setState({ first_tobacco_use_age: e });
  }
}


onTextChanged1(e) {
  if (/^\d+$/.test(e.toString()) || e === '') { 
    this.setState({ usage_count: e });
  }
}

onTextChanged2(e) {
  if (/^\d+$/.test(e.toString()) || e === '') { 
    this.setState({ tobacco_count: e });
  }
}

onTextChanged3(e) {
  if (/^\d+$/.test(e.toString()) || e === '') { 
    this.setState({ money_spent: e });
  }
}



_handleDatePicked = (date) => {
  console.log('A date has been picked: ', date);
  // let formatDate = dateFormat(date, 'hh:mm a');
  let send_date = dateFormat(date, 'yyyy-MM-dd');
  let display_date = dateFormat(date, 'dd-MM-yyyy');
console.log('API Date:' + send_date , 'DOB:' + display_date);

  this.setState({date_of_birth: display_date});
  this.setState({date_of_birth_api: send_date});

  this._hideDateTimePicker();
  // alert(this.state.quit_time);
  
};

_hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});


_showDateTimePicker = () =>{
    
  this.setState({isDateTimePickerVisible: true});
 
}

restrict(event) {
  const regex = new RegExp("^[a-zA-Z]+$");
  const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
      event.preventDefault();
      // this.setState({ first_tobacco_use_age: key });
      return false;
  }
}


componentDidMount = () => {
  // this.getUser();
  // this.setUser();

  // const jwt_token = navigation.getParam('jwt_token', 'Token');
  // this.setState({Jwt_Token:jwt_token});
  console.log('Hello Eduction');
  this.onGetEducation();
  this.onGetProfessions();
  this.onGetFirst();
  this.onGetUseReasons();
  this.onGettype();
  this.onGetfrequentsmoke();
  // this.onGetProduct();
  // alert(jwt_token);
};

handleInput(value, key) {
  // /^(?:[A-Za-z]+|\d+)$/.test(value) ? "block number" : "block letter"
  /^(?:[A-Za-z]+|\d+)$/.test(this.state.first_tobacco_use_age)

  this.setState({first_tobacco_use_age: value})
 }

// getUser = async () => {
//   const jwttoken = await AsyncStorage.getItem('JwtToken');
//   this.setState({
//     jwttoken: jwttoken,
//   });
//   }

setUser = async () =>{

  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
  
  
  const {gender_value,date_of_birth,date_of_birth_api,education,professions,type_tob,tobacco_products,frequent,first_tobacco,first_tobacco_use_age,money_spent,usage_count,tobacco_count,use,type_id} = this.state;

    console.log('login input ==> ' + gender_value + ' ' + date_of_birth_api + ' ' + education + ' ' + professions + ' ' + type_tob + ' ' + tobacco_products + ' ' + frequent + ' ' + first_tobacco + ' ' + use );
    let momentObj = moment(date_of_birth, 'DD-MM-YYYY')
    let dobformat = moment(momentObj).format('YYYY-MM-DD')
  // RNDateFormat.formatDate(
  //   date_of_birth,
  //   'dd-MM-YYYY',
  //   'YYYY-MM-dd',
  //   (date_of_birth) => {
  //     this.setState({date_of_birth: date_of_birth});
  //     console.log('Formated date : ' + date_of_birth);
  //   },
  // );

  console.log('DOB: ' + dobformat);
  this.setState({date_of_birth: dobformat})
    
if (gender_value && date_of_birth && education && professions && type_tob && tobacco_products && frequent && first_tobacco && first_tobacco_use_age && money_spent && usage_count && tobacco_count && use != ' ') {

          axios
            .post(
              ApiName.userInformation,
              {
                education_id: education,
                profession_id: professions,
                tobacco_id: type_tob,
                tobacco_product_id: tobacco_products,
                first_tobacco_use_age: first_tobacco_use_age,
                frequent_smoke_id: frequent,
                first_smoke_timing_id: first_tobacco,
                gender: gender_value,
                date_of_birth: date_of_birth,
                usage_count : usage_count,
                money_spent: money_spent,
                tobacco_count: tobacco_count,
                use_reasons: use,
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

                // AsyncStorage.setItem(
                //   'JwtToken',
                //   'Bearer ' + response.data.jwt_token,
                // );
                AsyncStorage.setItem('Gender',response.data.data.gender);
                AsyncStorage.setItem('Education',response.data.data.education);
                AsyncStorage.setItem('Money_Spent',response.data.data.money_spent + '');
                AsyncStorage.setItem('Tobacco_Count',response.data.data.tobacco_count + '');
                AsyncStorage.setItem('First_Smoke',response.data.data.first_smoke_timing);


              //   Alert.alert(
              //     'User Information',
              //     response.data.message,
              //     [
              //         {
              //             text: 'ok',
              //             onPress: () => this.props.navigation.navigate('Welcome'),
              //         },
              //     ]
              // );
                // this.props.navigation.navigate('Navigation');
                Toast.show(response.data.message);
                this.props.navigation.navigate('Welcome')
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
          else {
           Toast.show('Please enter all Fields');
         }
        }

onGetEducation= async () => {
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
  console.log( 'Reset All Question status - '+await AsyncStorage.getItem('QuestionarieStatus'))

        axios
          .post(
            ApiName.educations,{ },
            {
              headers: {
                'Authorization':jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Education response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,

              });
            }
            this.setState({eduList: obj});

            if (response.data.status == 200) {

              console.log(JSON.stringify( response.data));
              
              // AsyncStorage.setItem(
              //   'JwtToken',
              //   'Bearer ' + response.data.jwt_token,
              // );

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

onGetProfessions= async () => {
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

        axios
          .post(
            ApiName.professions,{ },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Profession response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,

              });
            }
            this.setState({occupation: obj});

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

onGetProduct= async (type) => {
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');


console.log('Product_id:', type);


        axios
          .post(
            ApiName.products,{
              tobacco_id: type,
             },
            {
              headers: {
                'Authorization':jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Product response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,

              });
            }
            this.setState({products: obj});

            if (response.data.status == 200) {

              console.log(JSON.stringify( response.data));

             
              // AsyncStorage.setItem(
              //   'JwtToken',
              //   'Bearer ' + response.data.jwt_token,
              // );

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


onGetUseReasons= async () => {
   let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

        axios
          .post(
            ApiName.use_reasons,{ },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'User Reason response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,

              });
            }
            this.setState({selectedReason: obj});

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

onGettype= async () => {
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

        axios
          .post(
            ApiName.tobaccos,{ },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Tobacco type response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value: response.data.data[i].id + '',
                label: response.data.data[i].name,
              });
            }

            this.setState({tobacco_type: obj});

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

onGetfrequentsmoke= async () => {
  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

        axios
          .post(
            ApiName.frequent_smokes,{ },
            {
              headers: {
                'Authorization': jwt_token,
              },
            },
          )
          .then((response) => {
            console.log(
              'Frequent Smoke response ',
              'response get details:==> ' + JSON.stringify(response.data),
            );

            const obj = [];

            for (var i = 0; i < response.data.data.length; i++) {
                obj.push({
                value:response.data.data[i].id + '',
                label: response.data.data[i].instance,

              });
            }

            this.setState({frequent_smokes: obj});

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
inputValidation = async () => {
  const { frequent,usage_count,tobacco_count,money_spent,first_tobacco } = this.state;

  Keyboard.dismiss();

if (frequent != ''){
    if (usage_count != '') {
      if (tobacco_count != ''){
        if (money_spent != ''){
          if (first_tobacco != ''){
        this.setState({error:false});
      }
    else {
      Toast.show('Select First Tobacco Timing');
    }
  } else {
        Toast.show('Enter Money Spent');
      }
    }
      else {
        Toast.show('Enter Tobacco Count');
      }
    } else {
      Toast.show('Enter Usage count');
    }
  } else
  {
    Toast.show('Select Frequent Smoking');
  }
}


inputValidation1 = async () => {
  const { gender_value,education,professions,date_of_birth,type_tob,tobacco_products,first_tobacco_use_age } = this.state;

  Keyboard.dismiss();

if (gender_value != ''){
    if (date_of_birth != '') {
      if (education != ''){
        if (professions != ''){
          if (type_tob != ''){
            if (tobacco_products != ''){
              if (first_tobacco_use_age != ''){
                    this.setState({error1:false});
              }
              else {
                Toast.show('Enter Age');
              }
            }
            else {
              Toast.show('Select Tobacco Product');
            }
            
      }
    else {
      Toast.show('Select Tobacco Type');
    }
  } else {
        Toast.show('Select Your Profession');
      }
    }
      else {
        Toast.show('Select Your education');
      }
    } else {
      Toast.show('Select Your DOB');
    }
  } else
  {
    Toast.show('Select Gender');
  }
}

inputValidation2 = async () => {
  const { use } = this.state;

  Keyboard.dismiss();

if (use != ''){
  this.setState({error2:false});
  this.setUser();
  } else
  {
    Toast.show('Select Use Reasons');
  }
}



  render() {

   

    const buttonTextStyle = {
      color: '#FFFFFF',
      backgroundColor: '#0072BB',
      height: responsiveHeight(6),
      textAlignVertical: 'center',
      marginTop:responsiveHeight(2),
      marginLeft: responsiveWidth(6),
      textAlign: 'center',
      width: responsiveWidth(60),
      fontFamily: 'SF-Medium',
      fontSize: responsiveFontSize(2),
      borderRadius: 30,
  };

   const buttonTextStyle1 = {
      color: '#FFFFFF',
      backgroundColor: '#0072BB',
      height: responsiveHeight(6),
      width: responsiveWidth(20),
      fontFamily: 'SF-Medium',
      fontSize: responsiveFontSize(2),
      borderRadius: 30,
      textAlign: 'center',
      textAlignVertical: 'center',
  };

  const buttonTextStyle3 = {
    color: '#393939'
};

  const {gender_value,education,professions,first_tobacco,firsttobacco,eduList,products,tobacco_products,occupation,type_tob,tobacco_type,first_tobacco_use_age,frequent,frequent_smokes,selectedReason,reasons,tobacco_content} = this.state;

  let gender = [{
    label:'Male',
  value: '0',
}, {
  label:'Female',
  value: '1',
}, {
  label:'other',
  value: '2',
}];

    return (

      
      <View style={styles.container}>
        <View style={styles.view}>
            <View style={{flexDirection: 'row', width: responsiveWidth(100),flex: 0.08,backgroundColor: '#0072BB'}}>
     <Text style={styles.toolbar_title}>Let's Start!</Text>
</View>
    <Text style={styles.content}>The information about you will be helpful to create {'\n'}                  a QUIT plan for yourself later</Text>
    <View style={{ flex: 1, marginTop: responsiveHeight(0)}}>
    <ProgressSteps  borderWidth={2}	topOffset={15} marginBottom={7} activeStepIconBorderColor={'#0072BB'} activeStepIconColor = {'#0072BB'} progressBarColor={'#ebebe4'} completedProgressBarColor={'#0072BB'} activeStepNumColor={'#FFFFFF'} completedStepIconColor={'#0072BB'} >
        <ProgressStep onNext={() => this.inputValidation1()} nextBtnTextStyle={buttonTextStyle}  scrollable={true} errors={this.state.error1}>
          <View style={{marginTop: responsiveHeight(-2)}}>
          <Text style={styles.text_ques} >Gender</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(-0.5),
              marginLeft: responsiveWidth(0),
            }}>
          <Dropdown
         ref="gender"
         underlineColor="transparent"
         value={gender_value}
         onChangeText={gender_value => {
           this.setState({ gender_value });
         }}
         placeholder="Select Gender"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="false"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(8),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                       inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={gender}
         valueExtractor={({ value }) => value}
      />
             <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
      </View>
      <View style={styles.view4} />

                <Text style={styles.text_ques} >Date of Birth</Text>
                <DatePicker
          style={{width: responsiveWidth(95), marginTop: responsiveHeight(0.25),marginLeft: responsiveHeight(0)}}
          date={this.state.date_of_birth} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="Select Date"
          format="DD-MM-YYYY"
          iconSource={require('../../images/calendar_theme.png')}
          maxDate={new Date()}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              resizeMode: 'contain',
              height: responsiveHeight(6),
              width: responsiveWidth(5),
              right: responsiveWidth(2),
              top: responsiveHeight(0.5),
              marginLeft: responsiveHeight(0.5),
            },
            dateInput: {
              marginLeft: responsiveHeight(-26),
              borderWidth: responsiveWidth(0),

            },
          }}
          onDateChange={(date_of_birth) => {this.setState({date_of_birth: date_of_birth});}}
        />
     {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
<DateTimePicker
                      mode="date"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      placeholder="select date"
                    />
                    <TouchableOpacity onPress={()=>this._showDateTimePicker()}>
                      <Text
                        style={{
                          fontFamily: 'SF-Regular',
                          marginTop: blockMarginHalf * 1,
                          marginBottom: blockMarginHalf * 1,
                          marginLeft: blockMarginHalf * 6,
                        }}>
                         {this.state.date_of_birth}
                      </Text>
                    </TouchableOpacity>
                    <Image source={require('../../images/calendar_theme.png')} style={styles.cal} />
                    </View> */}
                        <View style={styles.view4} />

         <Text style={styles.text_ques} >Your Education</Text>
         <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
       <Dropdown
         underlineColor="transparent"
         ref="Education"
         value={education}
         onChangeText={education => {
           this.setState({ education });
         }}
         placeholder="Select Education"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="true"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(8),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
         itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
         pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={eduList}
         valueExtractor={({ value }) => value}
      />
                   <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />

      </View>
      <View style={styles.view4} />

                <Text style={styles.text_ques} >What do you Do?</Text>
                <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
                <Dropdown
         underlineColor="transparent"
         ref="Professions"
         value={professions}
         onChangeText={professions => {
           this.setState({ professions });
         }}
         placeholder="Select Profession"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="true"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(8),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
         itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
         pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={occupation}
         valueExtractor={({ value }) => value}
      />
                         <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />

      </View>
      <View style={styles.view4} />

                <Text style={styles.text_ques} >What type of Tobacco you consume?</Text>
                <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
                <Dropdown
         underlineColor="transparent"
         ref="type"
         value={type_tob}
         onChangeText={type => {

          this.setState({ tobacco_products: '' });
         this.onGetProduct({type_tob: type})
         type == '2' ? this.setState({ tobacco_content: 'What Tobacco product do you smoke?'}):this.setState({ tobacco_content:'What Tobacco product do you chew?' })
         this.setState({ type_tob: type });
        }}
         placeholder="Select the Tobacco type"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="false"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(8),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                       inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={tobacco_type}
         valueExtractor={({ value }) => value}
      />
               <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
      </View>
      <View style={styles.view4} />

                <Text style={styles.text_ques} >{tobacco_content}</Text>
                <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
                <Dropdown
         underlineColor="transparent"
         ref="Products"
         value={tobacco_products}
         onChangeText={tobacco_products => {
           this.setState({ tobacco_products });
         }}
         placeholder="Select Tobacco Product"
         placeholderTextColor="#202020"
         label=""
         lineWidth={0}
         useNativeDriver="false"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(8),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
          inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={products}
         valueExtractor={({ value }) => value}
      />
                     <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
</View>
<View style={styles.view4} />

{/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout}>
                <TextInput style={styles.text}
            placeholder="At what age did you first use tobacco?"
            ref={(input)=>this.age = input}
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            underlineColorAndroid="#B6C0CB"
            // onChangeText={(value) => this.setState({first_tobacco_use_age: value})}
            onChangeText = {(e)=> this.onTextChanged(e)}

                value={this.state.first_tobacco_use_age}
                keyboardType="numeric"
                // onSubmitEditing={this.onSubmit}
          />
          </TextInputLayout> */}

<Text style={styles.text_ques}>At what age did you first use tobacco?</Text>
                <TextInput ref={(input)=>this.age = input} style={styles.textInput2} 
                //  onChangeText={(value) => this.setState({money_spent: value})}  
                onChangeText = {(e)=> this.onTextChanged(e)}
                 keyboardType="numeric"
                 value={this.state.first_tobacco_use_age} returnKeyType="done"/>
                  <View style={styles.view7} />

          </View>
        </ProgressStep>
        <ProgressStep onNext={() => this.inputValidation()} previousBtnTextStyle={buttonTextStyle1} nextBtnTextStyle={buttonTextStyle1}  scrollable={true} errors={this.state.error} >
        <View style={{marginTop: responsiveHeight(-2),flex:1}}>
          <Text style={styles.text_ques3}>How often did you use tobacco in the last month?</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(1),
            }}>
          <Dropdown
         underlineColor="transparent"
         ref="Frequent"
         value={frequent}
         onChangeText={frequent => {
           this.setState({ frequent });
         }}
         baseColor="#FFFFFF"
         placeholder="Select Option"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="false"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(5.5),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(6) }}
                       inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={frequent_smokes}
         valueExtractor={({ value }) => value}
      />
                           <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />

      </View>
      <View style={styles.view5} />
      <View style={{marginTop: responsiveHeight(0)}}>
<Text style={styles.text_ques3}>How many times you use tobacco in a day at present?</Text>
                {/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout1} > */}
                <TextInput style={styles.textInput} 
                // onChangeText = {(e)=> this.onTextChanged1(e)} 
                onChangeText = {(e)=> this.onTextChanged1(e)}
                keyboardType="numeric"
                onSubmitEditing={()=>this.pieces.focus()}
                value={this.state.usage_count} returnKeyType="next" />
                   <View style={styles.view6} />
                {/* </TextInputLayout> */}
                {/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout1}> */}

                <Text style={styles.text_ques3}>How many pieces do you use in a day?</Text>
                <TextInput ref={(input)=>this.pieces = input} style={styles.textInput} 
                // onChangeText={(value) => this.setState({tobacco_count: value})} 
                onChangeText = {(e)=> this.onTextChanged2(e)}
                 keyboardType="numeric"
                value={this.state.tobacco_count} returnKeyType="next" onSubmitEditing={()=>this.prod.focus()}/>
                <View style={styles.view6} />
                {/* </TextInputLayout> */}

                {/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout1}> */}
                <Text style={styles.text_ques3}>How much do you spend on tobacco products in a day?</Text>
                <TextInput ref={(input)=>this.prod = input} style={styles.textInput} 
                //  onChangeText={(value) => this.setState({money_spent: value})}  
                onChangeText = {(e)=> this.onTextChanged3(e)}
                 keyboardType="numeric"
                 value={this.state.money_spent} returnKeyType="done"/>
                  <View style={styles.view6} />
                {/* </TextInputLayout> */}

                </View>
              
                <Text style={styles.text_ques3} >When do you need your first Tobacco after waking up{'\n'} in the morning?</Text>
                <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(0),
            }}>
                <Dropdown
         underlineColor="transparent"
         ref="first_tobacco"
         value={first_tobacco}
         onChangeText={first_tobacco => {
           this.setState({ first_tobacco });
         }}
         placeholder="Select Answer"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="true"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(7),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                       inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={firsttobacco}
         valueExtractor={({ value }) => value}
      />
                         <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />

      </View>
      <View style={styles.view5} />
{/*       
                <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveHeight(1),
            }}>
              
       <Dropdown
         underlineColor="transparent"
         ref="first_tobacco"
         value={first_tobacco}
         onChangeText={first_tobacco => {
          this.setState({ first_tobacco });
        }}
         placeholder="Select Your Answer"
         placeholderTextColor="#202020"
         label=""
         useNativeDriver="false"
         dropdownPosition={0}
          labelHeight={7}
          style={{backgroundColor:'#FFFFFF',marginTop: responsiveHeight(0.25),marginLeft: responsiveWidth(7),marginRight: responsiveWidth(4), fontFamily: 'SF-Medium', fontSize: responsiveFontSize(2),width: responsiveWidth(85),height: responsiveHeight(5)}}
          itemTextStyle={{ fontFamily: 'SF-Medium', marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(12),height: responsiveHeight(3),borderBottomColor:'transparent' }}
          pickerStyle={{width: responsiveWidth(85),  margin:responsiveWidth(5), marginTop: responsiveHeight(4),marginLeft: responsiveWidth(8) }}
                       inputContainerStyle={{ borderBottomColor: 'transparent' }}
         data={firsttobacco}
         valueExtractor={({ value }) => value}
      />
                                 <Image source={require('../../images/down_arrow.png')} style={styles.arrow} />
</View>

<View style={styles.view5} /> */}

             
            <View />
       </View>
        </ProgressStep>
        <ProgressStep onSubmit={() => this.inputValidation2()} finishBtnText='Next' previousBtnTextStyle={buttonTextStyle1} nextBtnTextStyle={buttonTextStyle1}  scrollable={true} errors={this.state.error2} >
        <View style={{marginTop: responsiveHeight(0)}}>
          <Text style={styles.text_ques2}>Why do you use Tobacco?</Text>
        <SelectMultiple rowStyle={styles.rowstyle} selectedCheckboxSource={require('../../images/tick_enabled.png')} checkboxSource={require('../../images/tick_disable.png')}
          items={selectedReason}
          value={reasons}
          selectedItems={this.state.reasons_value}
          onSelectionsChange={this.onSelectionsChange} />

       </View>
        </ProgressStep>
    </ProgressSteps>
</View>
</View>
      </View>
    );
  }
}

// const RootStack = createStackNavigator({

//   Questionare_Screen1: Questionare_Screen1,
//   Welcome: Welcome,
//   Settings: Settings,

// },
// {
//   initialRouteName: 'Questionare_Screen1',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Questionariesstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }