/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from 'react-native';
import styles from '../Questionare_Screen4/styles';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import dateFormat from 'date-fns/format';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import SelectMultiple from 'react-native-select-multiple';

import Toast from 'react-native-simple-toast';
import Questionare_Screen5 from '../Questionare_Screen5/Questionare_Screen5';

const difficulty = [
  { label: 'Very Difficult', value: '2' },
  { label: 'Not So Difficult', value: '1' },
  { label: 'Easy', value: '0' },
];

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

import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Transparent_page from '../Transparent_page/Transparent_page';
export default class Questionare_Screen4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      quit_date: '',
      time: '',
      difficult_value: [],
      difficult: '',
      value: '',
      quit_date_api: '',
      isHidden: false,
      isDatePickerVisible: false,

      view4New: [{ index: 0, id: 'env_id_0', name: '' }],
      view3New: [
        { index: 0, id: 'challenge_id_0', challenge: '', copying_strategy: '' },
      ],
      view2New: [],

      view4List: [],
      view3List: [],
      view2List: [],
      view4Data: [],
      view3Data: [],
      view2Data: [],
      email_valid: false,
      relation_valid: false,
      name_valid: false,
      your_challenge_valid: false,
      your_coping_strategy_valid: false,
      environment_valid: false,
      name: '',
      relation: '',
      email: '',
      your_challenge: '',
      your_coping_strategy: '',
      environment: '',
    };
    this.view4Index = 0;
    this.view3Index = 0;
    this.view2Index = 0;
  }

  onSelectionsChange = (difficult) => {
    // selectedFruits is array of { label, value }
    this.setState({ difficult_value: difficult });
    let value = '';

    if (difficult.length > 0) {
      for (var i = 0; i < difficult.length; i++) {
        value = difficult[i].value;
      }
      this.setState({ value: value });
    } else {
      this.setState({ value: '' });
    }
  };

  componentDidMount = () => { };

  quit_plan = async () => {
    var time = moment().format('HH:mm:ss');

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const { quit_date, value, quit_date_api, view2New, view3New, view4New } =
      this.state;
    console.log('bcdb', this.state.name);
    let objView2 = [...this.state.view2New];

    if (quit_date != '' || quit_date_api != '') {
      if (
        this.state.name != '' &&
        this.state.relation != '' &&
        this.state.email != ''
      ) {
        if (
          !this.state.name_valid &&
          !this.state.relation_valid &&
          !this.state.email_valid
        ) {
          console.log('neeww', this.state.name_valid);
          objView2.push({
            index: 0,
            id: 'supporter_id_0',
            name: this.state.name,
            relation: this.state.relation,
            email: this.state.email,
          });
          this.setState({ view2Data: objView2 });
          this.state.view2Data = objView2;
          console.log('view 2 data', JSON.stringify(this.state.view2Data));

          this.setState({ isHidden: true });
          var momentObj = moment(quit_date_api + ' ' + time, 'YYYY-MM-DDLT');
          console.log('dataObj' + momentObj);

          const input = {
            quit_date: quit_date_api,
            quit_date_time: quit_date_api + ' ' + time,
            quit_timestamp: new Date(momentObj).getTime(),
            link_members: this.state.view2Data,
            personal_challenges: view3New,
            env_challenges: view4New,
            qp: 0,
          };
          axios
            .post(
              ApiName.userInfoupdate,
              {
                quit_date_time: quit_date_api + ' ' + time,
                quit_date: quit_date_api,
                quit_time: time,
                quit_timestamp: new Date(momentObj).getTime(),
              },
              {
                headers: {
                  Authorization: jwt_token,
                },
              },
            )
            .then((response) => {
              console.log('response ' + JSON.stringify(response));
              this.setState({ isHidden: false });
              this.setState({ visible4: false });
              if (response.data.status == 200) {
                this.setState({ visible4: false });

                AsyncStorage.setItem(
                  'JwtToken',
                  'Bearer ' + response.data.jwt_token,
                );

                Toast.show(response.data.message);
                //   AsyncStorage.setItem('SettingState', '1');

                // this.props.navigation.navigate('Navigation');
              } else {
                Toast.show(response.data.message);
              }
            })
            .catch((error) => {
              this.setState({ isHidden: false });
              console.log(error);
              Toast.show('There was some error. Please try again');
            });
          console.log(JSON.stringify(input));
          axios
            .post(
              // ApiName.userInfoupdate, {
              ApiName.userQuitPlan,
              input,
              {
                headers: {
                  Authorization: jwt_token,
                },
              },
            )
            .then((response) => {
              console.log('response ' + JSON.stringify(response));

              if (response.data.status == 200) {
                this.setState({ isHidden: false });
                AsyncStorage.setItem('SettingState', '0');

                Toast.show(response.data.message);
                this.props.navigation.navigate('Questionare_Screen5');
                // Toast.show(response.data.message);
              } else if (response.data.status == 401) {
                // AsyncStorage.setItem('Hard_to_Quit', value);

                // AsyncStorage.setItem('Quit_Date', quit_date);
                // AsyncStorage.setItem(
                //   'JwtToken',
                //   'Bearer ' + response.data.jwt_token,
                // );
                AsyncStorage.clear();
                AsyncStorage.setItem('LoginStatus', 'false');
                AsyncStorage.setItem('Walkthrough', 'false');
                AsyncStorage.setItem('Walkthrough', 'false');

                Toast.show('Token expired, Please Login again to continue');

                this.props.navigation.navigate('Splash');
              } else {
                Toast.show(response.data.message);
              }
            })
            .catch((error) => {
              this.setState({ isHidden: false });
              console.log(error);
              Toast.show('There was some error. Please try again');
            });
        } else {
          Toast.show('Please enter valid email');
        }
      } else {
        Toast.show('Please fill the blank');
      }
    } else {
      Toast.show('Select Quit date');
    }

    //   let objView3 = [...this.state.view3Data];
    //   if( !this.state.your_challenge_valid || !this.state.your_coping_strategy_valid){

    //  objView3[0] = {index:0, challenge:this.state.your_challenge, copying_strategy:this.state.your_coping_strategy};

    //  this.setState({view3Data: objView3})
    // }else{
    //     Toast.show('Please fill your challenges');
    //   }

    // let objView4 = [...this.state.view4Data];
    // if( !this.state.environment_valid){
    // objView4[0] = {index:0, name:this.state.environment};
    // this.setState({view4Data: objView4})
    // }else{
    //   Toast.show('Please fill environment steps');
    // }

    //console.log('view2Data next ==> '+JSON.stringify(this.state.view2Data))

    //console.log('view3Data next ==> '+JSON.stringify(this.state.view3Data))

    //console.log('view4Data next ==> '+JSON.stringify(this.state.view4Data))

    // }
    // else {
    //   Toast.show('Select difficulty');
    // }
  };
  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };
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

    this.setState({ quit_date: formatDate });
    this.setState({ quit_date_api: formatValidDate });
    this.hideDatePicker();
  };

  step4PopulateButton() {
    this.view4Index += 1;
    const newlyAddedValue = {
      index: this.view4Index,
      id: 'env_id_' + this.view4Index,
      name: '',
    };

    this.setState({
      view4New: [...this.state.view4New, newlyAddedValue],
    });
    console.log('hjgjjjj', newlyAddedValue);
  }

  step3PopulateButton() {
    this.view3Index += 1;
    const newlyAddedValue = {
      index: this.view3Index,
      id: 'challenge_id_' + this.view3Index,
      challenge: '',
      copying_strategy: '',
    };

    this.setState({
      view3New: [...this.state.view3New, newlyAddedValue],
    });
    console.log('step 3 ', newlyAddedValue);
  }

  step2PopulateButton() {
    this.view2Index += 1;
    const newlyAddedValue = {
      index: this.view2Index,
      id: 'supporter_id_' + this.view2Index,
      name: '',
      relation: '',
      email: '',
    };
    console.log('input mem', JSON.stringify(newlyAddedValue));
    this.setState({
      view2New: [...this.state.view2New, newlyAddedValue],
    });
  }

  // step3(index) {
  //   let view3List = this.state.view3List;
  //   view3List.push(
  //     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignSelf: 'center' }}>
  //       <View style={{ flexDirection: 'column', width: '93%', justifyContent: 'center', alignSelf: 'center', borderColor: '#B6C0CB', borderWidth: 2 }}>
  //         <View style={{ width: '100%', flexDirection: 'row' }}>
  //           <TextInput style={{
  //             width: '49%',
  //             color: '#202020', fontSize: 13,
  //             textAlign: 'left', padding: 5, textAlignVertical: "top",
  //             fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center', minHeight: 70
  //           }}
  //             returnKeyType="done"
  //             multiline={true}
  //             underlineColorAndroid="transparent"
  //             onChangeText={(value) => this.view3Add(value, index, 1)} />
  //           <View style={{ borderColor: '#B6C0CB', borderWidth: 2 }} />
  //           <TextInput style={{
  //             width: '49%',
  //             color: '#202020', fontSize: 13,
  //             textAlign: 'left', padding: 5, textAlignVertical: "top",
  //             fontFamily: 'SFCompactDisplay-Medium', alignSelf: 'center', justifyContent: 'center', minHeight: 70
  //           }}
  //             returnKeyType="done"
  //             multiline={true}
  //             underlineColorAndroid="transparent"
  //             onChangeText={(value) => this.view3Add(value, index, 2)} />
  //         </View>

  //       </View>
  //       <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', end: -12.5 }}
  //         onPress={() => this.step3Remove(index)}>
  //         <View style={{
  //           opacity: 100,
  //           margin: blockMargin, justifyContent: 'center', alignSelf: 'center'
  //         }}>
  //           <Image

  //             resizeMode='contain'
  //             source={require('../../images/minus.png')}
  //             style={{
  //               width: 25,
  //               height: 25,
  //               resizeMode: 'contain',

  //               justifyContent: 'center',

  //               alignSelf: 'center',

  //             }}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   )
  //   this.setState({ view3List })

  // }

  // step2(index) {
  //   let view2List = this.state.view2List;
  //   view2List.push(

  //     <View style={{ width: '93%', flexDirection: 'column', justifyContent: 'center', marginTop: 8, borderColor: '#BEBEBE', borderRadius: 8, borderWidth: 0.3, elevation: 2, padding: 5, backgroundColor: '#FFFFFF', alignSelf: 'center' }}>
  //       <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', top: -10, end: -10 }} onPress={() => this.step2Remove(index)}>
  //         <View style={{
  //           opacity: 100,
  //           margin: blockMargin, justifyContent: 'center', alignSelf: 'center'
  //         }}>
  //           <Image

  //             resizeMode='contain'
  //             source={require('../../images/minus.png')}
  //             style={{
  //               width: 25,
  //               height: 25,
  //               resizeMode: 'contain',

  //               justifyContent: 'center',

  //               alignSelf: 'center',

  //             }}
  //           />
  //         </View>
  //       </TouchableOpacity>

  //       <TextInput
  //         style={{
  //           color: '#202020',
  //           fontSize: 15,
  //           fontFamily: 'SFCompactDisplay-Regular',
  //           width: '93%', justifyContent: 'center', alignSelf: 'center', marginTop: 15,
  //         }}
  //         placeholder="Name"
  //         placeholderTextColor="#B6C0CB"
  //         returnKeyType="done"
  //         multiline={false}
  //         underlineColorAndroid="transparent"
  //         onChangeText={(value) => this.view2Add(value, index, 1)}

  //       />
  //       <View style={{
  //         borderBottomWidth: 2,

  //         borderBottomColor: '#B6C0CB',
  //         width: '93%', justifyContent: 'center', alignSelf: 'center'
  //       }} />
  //       <TextInput
  //         style={{
  //           color: '#202020',
  //           fontSize: 15,
  //           fontFamily: 'SFCompactDisplay-Regular',
  //           width: '93%', justifyContent: 'center', alignSelf: 'center',
  //         }}
  //         placeholder="Relation"
  //         placeholderTextColor="#B6C0CB"
  //         returnKeyType="done"
  //         multiline={false}
  //         underlineColorAndroid="transparent"
  //         onChangeText={(value) => this.view2Add(value, index, 2)}

  //       />
  //       <View style={{
  //         borderBottomWidth: 2,

  //         borderBottomColor: '#B6C0CB',
  //         width: '93%', justifyContent: 'center', alignSelf: 'center'
  //       }} />
  //       <TextInput
  //         style={{
  //           color: '#202020',
  //           fontSize: 15,
  //           fontFamily: 'SFCompactDisplay-Regular',
  //           width: '93%', justifyContent: 'center', alignSelf: 'center',
  //         }}
  //         placeholder="Email"
  //         placeholderTextColor="#B6C0CB"
  //         returnKeyType="done"
  //         multiline={false}
  //         underlineColorAndroid="transparent"
  //         onChangeText={(value) => this.view2Add(value, index, 3)}

  //       />
  //       <View style={{
  //         borderBottomWidth: 2,

  //         borderBottomColor: '#B6C0CB',
  //         width: '93%', justifyContent: 'center', alignSelf: 'center', marginBottom: blockMargin
  //       }} />
  //     </View>)

  //  this.setState({ view2List })

  // }

  email_validation = (value) => {
    const { email, email_valid } = this.state;
    console.log(value);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      // Toast.show("Email is Not Correct");
      this.setState({ email: value, email_valid: true });
      return false;
    } else {
      this.setState({ email: value, email_valid: false });
      // Toast.show("Email is Correct");
    }
  };

  empty_validation = (value, type) => {
    const {
      name,
      relation,
      your_challenge,
      your_coping_strategy,
      environment,
      name_valid,
      relation_valid,
      your_challenge_valid,
      your_coping_strategy_valid,
      environment_valid,
    } = this.state;
    console.log('member value---', value.length);

    if (type == 1) {
      if (value.length == 0) {
        this.setState({ name: value, name_valid: true });
        return false;
      } else {
        this.setState({ name: value, name_valid: false });
      }
    } else if (type == 2) {
      if (value.length == 0) {
        this.setState({ relation: value, relation_valid: true });
        return false;
      } else {
        this.setState({ relation: value, relation_valid: false });
      }
    } else if (type == 3) {
      if (value.length == 0) {
        this.setState({ your_challenge: value, your_challenge_valid: true });
        return false;
      } else {
        this.setState({ your_challenge: value, your_challenge_valid: false });
      }
    } else if (type == 4) {
      if (value.length == 0) {
        this.setState({
          your_coping_strategy: value,
          your_coping_strategy_valid: true,
        });
        return false;
      } else {
        this.setState({
          your_coping_strategy: value,
          your_coping_strategy_valid: false,
        });
      }
    } else if (type == 5) {
      if (value.length == 0) {
        this.setState({ environment: value, environment_valid: true });
        return false;
      } else {
        this.setState({ environment: value, environment_valid: false });
      }
    }
  };

  // view2Add(value, ind, type) {
  //   let index = ind;
  //   let view2Data = this.state.view2Data;

  //   if (view2Data.length != 0) {
  //     console.log("index--" + view2Data.some(item => index === item.index))

  //     if (view2Data.some(item => index === item.index)) {
  //       if (type == 1) {
  //         view2Data[index].name = value
  //         this.setState({ view2Data: view2Data });

  //       } else if (type == 2) {
  //         view2Data[index].relation = value
  //         this.setState({ view2Data: view2Data });
  //       } else if (type == 3) {
  //         view2Data[index].email = value
  //         this.setState({ view2Data: view2Data });

  //       }
  //       console.log('with data view2Data')
  //     } else {

  //       let obj = {
  //         index: index,
  //         name: '',
  //         relation: '',
  //         email: '',
  //         id: 'id_' + index
  //       }
  //       view2Data[index] = obj;

  //       if (type == 1) {
  //         view2Data[index].name = value
  //         this.setState({ view2Data: view2Data });

  //       } else if (type == 2) {
  //         view2Data[index].relation = value
  //         this.setState({ view2Data: view2Data });
  //       } else if (type == 3) {
  //         view2Data[index].email = value
  //         this.setState({ view2Data: view2Data });

  //       }
  //       console.log('without new view2Data')

  //     }

  //   } else {
  //     console.log("empty index--" + index)
  //     let obj = {
  //       index: index,
  //       name: '',
  //       relation: '',
  //       email: ''
  //     }
  //     view2Data[index] = obj;

  //     if (type == 1) {
  //       view2Data[index].name = value
  //       this.setState({ view2Data: view2Data });

  //     } else if (type == 2) {
  //       view2Data[index].relation = value
  //       this.setState({ view2Data: view2Data });
  //     } else if (type == 3) {
  //       view2Data[index].email = value
  //       this.setState({ view2Data: view2Data });

  //     }

  //   }

  //   console.log('view2Data ==> ' + JSON.stringify(view2Data))
  //   this.setState({ view2Data })
  // }

  // view3Add(value, ind, type) {
  //   let index = ind + 1;
  //   let view3Data = this.state.view3Data;

  //   if (view3Data.length != 0) {
  //     console.log("View3 index--" + view3Data.some(item => index === item.index))

  //     if (view3Data.some(item => index === item.index)) {
  //       if (type == 1) {
  //         view3Data[index].challenge = value
  //         this.setState({ view3Data: view3Data });

  //       } else if (type == 2) {
  //         view3Data[index].copying_strategy = value
  //         this.setState({ view3Data: view3Data });
  //       }
  //       console.log('with data view3Data')
  //     } else {

  //       let obj = {
  //         index: index,
  //         challenge: '',
  //         copying_strategy: ''
  //       }
  //       view3Data[index] = obj;

  //       if (type == 1) {
  //         view3Data[index].challenge = value
  //         this.setState({ view3Data: view3Data });

  //       } else if (type == 2) {
  //         view3Data[index].copying_strategy = value
  //         this.setState({ view3Data: view3Data });
  //       }
  //       console.log('without new view3Data')

  //     }

  //   } else {
  //     console.log("empty view3 index--" + index)
  //     let obj = {
  //       index: index,
  //       challenge: '',
  //       copying_strategy: ''
  //     }
  //     view3Data[index] = obj;

  //     if (type == 1) {
  //       view3Data[index].challenge = value
  //       this.setState({ view3Data: view3Data });

  //     } else if (type == 2) {
  //       view3Data[index].copying_strategy = value
  //       this.setState({ view3Data: view3Data });
  //     }

  //   }

  //   console.log('view3Data ==> ' + JSON.stringify(view3Data))
  //   this.setState({ view3Data })
  // }

  view2Add(value, index, id, type) {
    //console.log("View2 index--" + value+' - '+ind+' - '+JSON.stringify(this.state.view2New))

    let view2New = [...this.state.view2New];

    if (view2New.some((item) => id === item.id)) {
      var indexOF = view2New.findIndex((item) => id === item.id);

      if (type == 1) {
        view2New[indexOF].name = value;
      } else if (type == 2) {
        view2New[indexOF].relation = value;
      } else if (type == 3) {
        view2New[indexOF].email = value;
      }
      this.setState({ view2New: view2New });
    }
    console.log('with data view2Data ' + JSON.stringify(view2New));
  }

  view3Add(value, index, id, type) {
    //console.log("View3 index--" + value+' - '+ind+' - '+JSON.stringify(this.state.view3New))

    let view3New = [...this.state.view3New];

    if (view3New.some((item) => id === item.id)) {
      var indexOF = view3New.findIndex((item) => id === item.id);

      if (type == 1) {
        view3New[indexOF].challenge = value;
      } else if (type == 2) {
        view3New[indexOF].copying_strategy = value;
      }
      this.setState({ view3New: view3New });
    }
    console.log('with data view3Data ' + JSON.stringify(view3New));
  }

  view4Add(value, index, id) {
    //console.log("View4 index--" + value+' - '+ind+' - '+JSON.stringify(this.state.view4New))

    let view4New = [...this.state.view4New];

    if (view4New.some((item) => id === item.id)) {
      var indexOF = view4New.findIndex((item) => id === item.id);
      view4New[indexOF].name = value;
      this.setState({ view4New: view4New });
    }
    console.log('with data view4Data ' + JSON.stringify(view4New));
  }

  step4Remove = async (id) => {
    console.log('Remove ' + id);

    let view4New = [...this.state.view4New];

    if (view4New.some((item) => id === item.id)) {
      var indexOF = view4New.findIndex((item) => id === item.id);
      view4New.splice(indexOF, 1);
      setTimeout(() => {
        this.setState({ view4New: view4New });
      }, 100);
    }
    console.log('with data view4Data ' + JSON.stringify(view4New));
  };

  step3Remove = async (id) => {
    console.log('Remove ' + id);

    let view3New = [...this.state.view3New];

    if (view3New.some((item) => id === item.id)) {
      var indexOF = view3New.findIndex((item) => id === item.id);
      view3New.splice(indexOF, 1);
      setTimeout(() => {
        this.setState({ view3New: view3New });
      }, 100);
    }
    console.log('with data view3Data ' + JSON.stringify(view3New));
  };

  step2Remove = async (id) => {
    console.log('Remove ' + id);

    let view2New = [...this.state.view2New];

    if (view2New.some((item) => id === item.id)) {
      var indexOF = view2New.findIndex((item) => id === item.id);
      view2New.splice(indexOF, 1);
      setTimeout(() => {
        this.setState({ view2New: view2New });
      }, 100);
    }
    console.log('with data view2Data ' + JSON.stringify(view2New));
  };

  // step3Remove = async (index) => {

  //   let view3List = this.state.view3List;
  //   let view3Data = this.state.view3Data;
  //   var indexOF = view3Data.findIndex(
  //     view3Data => view3Data.index === index + 1
  //   );
  //   if (indexOF > -1) {
  //     view3Data.splice(indexOF, 1);
  //     view3List.splice(indexOF, 1);
  //   }

  //   this.setState({ view3List: view3List, view3Data: view3Data })
  //   console.log('view3Data ==> ' + JSON.stringify(view3Data))
  // }

  // step2Remove = async (index) => {
  //   console.log('index ====> ' + index)
  //   let view2List = this.state.view2List;
  //   let view2Data = this.state.view2Data;
  //   var indexOF = view2Data.findIndex(
  //     view2Data => view2Data.index === index
  //   );
  //   if (indexOF > -1) {
  //     view2Data.splice(indexOF, 1);
  //   }
  //   view2List.splice(view2List.length - 1, 1);
  //   setTimeout(() => {
  //     this.setState({ view2List: view2List, view2Data: view2Data })
  //     console.log('view2Data ==> ' + JSON.stringify(this.state.view2Data))
  //   }, 1000);
  // }

  render() {
    const { difficult, checked, setChecked } = this.state;

    // var time = moment()
    // .format('hh:mm:ss a');

    let formatTime = dateFormat(new Date(), 'hh:mm:ss a');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              // width: '100%',
              height: '12%',
              backgroundColor: '#0072BB',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '12%',
                height: responsiveHeight(10),
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Welcome')}>
                <Image
                  style={{
                    width: responsiveWidth(3),
                    height: responsiveHeight(4),

                    resizeMode: 'contain',
                  }}
                  source={require('../../images/back_arrow.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '76%',
                height: responsiveHeight(12),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Let's Do It
              </Text>
            </View>
            <View
              style={{
                width: '12%',
                height: responsiveHeight(12),
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: blockMarginHalf,
              }}>
              <Image
                style={{
                  width: 0,
                  height: 0,
                  tintColor: '#0072bb',
                  resizeMode: 'contain',
                }}
                source={require('../../images/share.png')}
              />
            </View>
          </View>
          {/* <KeyboardAwareScrollView
              contentContainerStyle={{justifyContent: 'center'}}> */}

          {/* <View style={{height: '100%', width: '100%'}}> */}
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              width: Dimensions.get('window').width,
            }}
            contentContainerStyle={{
              justifyContent: 'center',
              backgroundColor: 'red',
            }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <View style={styles.view}>
                <Text
                  style={{
                    width: '100%',
                    color: '#202020',
                    fontSize: 22,
                    marginTop: blockMargin,
                    marginBottom: blockMarginHalf,
                    textAlign: 'center',
                    fontFamily: 'SFCompactDisplay-Semibold',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  Create a Quit Plan
                </Text>

                <View
                  style={{
                    width: '93%',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      color: '#202020',
                      fontSize: 18,
                      marginTop: blockMargin / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    Step 1
                  </Text>

                  <Text
                    style={{
                      width: '93%',
                      color: '#B6C0CB',
                      fontSize: 15.5,
                      marginTop: blockMarginHalf / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {
                      'Select a QUIT DATE within the next two weeks and commit yourself to quitting completely.'
                    }
                  </Text>

                  <TouchableOpacity onPress={() => this.showDatePicker()}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: blockMargin * 1.2,
                        marginBottom: blockMargin,
                      }}>
                      <Text
                        style={{
                          width: '80%',
                          color: '#000',
                          fontFamily: 'SFCompactDisplay-Regular',
                          fontSize: 15,
                        }}>
                        {this.state.quit_date != ''
                          ? this.state.quit_date
                          : 'Quit Date'}
                      </Text>
                      <Image
                        source={require('../../images/calendar_theme.png')}
                        resizeMode={'contain'}
                        style={{ width: 18, height: 18 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={this.handleDateConfirm}
                    onCancel={this.hideDatePicker}
                  />
                </View>

                <View
                  style={{
                    width: '93%',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      color: '#202020',
                      fontSize: 18,
                      marginTop: blockMargin / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    Step 2
                  </Text>

                  <Text
                    style={{
                      width: '93%',
                      color: '#B6C0CB',
                      fontSize: 15.5,
                      marginTop: blockMarginHalf / 2,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {
                      'Write down who you would like to have support you with your decision to quit using Tobacco.'
                    }
                  </Text>

                  <TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      minHeight: 40,
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                    placeholder="Name"
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.empty_validation(value, 1)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 2,

                      borderBottomColor: '#B6C0CB',
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  {this.state.name_valid && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 9,
                        width: '93%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontFamily: 'SFCompactDisplay-Regular',
                      }}>
                      Enter Name
                    </Text>
                  )}

                  <TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      minHeight: 40,
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                    placeholder="Relation"
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.empty_validation(value, 2)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 2,

                      borderBottomColor: '#B6C0CB',
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  {this.state.relation_valid && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 9,
                        width: '93%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontFamily: 'SFCompactDisplay-Regular',
                      }}>
                      Enter Relation
                    </Text>
                  )}

                  <TextInput
                    style={{
                      color: '#202020',
                      fontSize: 15,
                      fontFamily: 'SFCompactDisplay-Regular',
                      minHeight: 40,
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                    placeholder="Email"
                    placeholderTextColor="#B6C0CB"
                    returnKeyType="done"
                    multiline={false}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => this.email_validation(value)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 2,

                      borderBottomColor: '#B6C0CB',
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginBottom: blockMarginHalf / 2,
                    }}
                  />

                  {this.state.email_valid && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 9,
                        width: '93%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontFamily: 'SFCompactDisplay-Regular',
                      }}>
                      Enter valid email
                    </Text>
                  )}

                  {this.state.view2New.map((element) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: '95%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginTop: 8,
                            borderColor: '#BEBEBE',
                            borderRadius: 8,
                            borderWidth: 0.3,
                            elevation: 2,
                            padding: 5,
                            backgroundColor: '#FFFFFF',
                            alignSelf: 'center',
                          }}>
                          {element.id !== 'supporter_id_0' ? (
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                top: -10,
                                end: -10,
                              }}
                              onPress={() => this.step2Remove(element.id)}>
                              <View
                                style={{
                                  opacity: 100,
                                  margin: blockMargin,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Image
                                  resizeMode="contain"
                                  source={require('../../images/minus.png')}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',

                                    justifyContent: 'center',

                                    alignSelf: 'center',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                          ) : null}
                          <TextInput
                            style={{
                              color: '#202020',
                              fontSize: 15,
                              fontFamily: 'SFCompactDisplay-Regular',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 15,
                              minHeight: 40,
                            }}
                            value={element.name}
                            placeholder="Name"
                            placeholderTextColor="#B6C0CB"
                            returnKeyType="done"
                            multiline={false}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) =>
                              this.view2Add(value, element.index, element.id, 1)
                            }
                          />
                          <View
                            style={{
                              borderBottomWidth: 2,

                              borderBottomColor: '#B6C0CB',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                          <TextInput
                            style={{
                              color: '#202020',
                              fontSize: 15,
                              fontFamily: 'SFCompactDisplay-Regular',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              minHeight: 40,
                            }}
                            value={element.relation}
                            placeholder="Relation"
                            placeholderTextColor="#B6C0CB"
                            returnKeyType="done"
                            multiline={false}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) =>
                              this.view2Add(value, element.index, element.id, 2)
                            }
                          />
                          <View
                            style={{
                              borderBottomWidth: 2,

                              borderBottomColor: '#B6C0CB',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                          <TextInput
                            style={{
                              color: '#202020',
                              fontSize: 15,
                              fontFamily: 'SFCompactDisplay-Regular',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              minHeight: 40,
                            }}
                            value={element.email}
                            placeholder="Email"
                            placeholderTextColor="#B6C0CB"
                            returnKeyType="done"
                            multiline={false}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) =>
                              this.view2Add(value, element.index, element.id, 3)
                            }
                          />
                          <View
                            style={{
                              borderBottomWidth: 2,

                              borderBottomColor: '#B6C0CB',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginBottom: blockMargin,
                            }}
                          />
                        </View>
                      </View>
                    );
                  })}

                  <TouchableOpacity onPress={() => this.step2PopulateButton()}>
                    <View
                      style={{
                        opacity: 100,
                        margin: blockMargin,
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../images/plus.png')}
                        style={{
                          width: 35,
                          height: 35,
                          resizeMode: 'contain',

                          justifyContent: 'center',

                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Step 3 */}

                <View
                  style={{
                    width: '93%',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      color: '#202020',
                      fontSize: 18,
                      marginTop: blockMargin / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    Step 3
                  </Text>

                  <Text
                    style={{
                      width: '93%',
                      color: '#B6C0CB',
                      fontSize: 15.5,
                      marginTop: blockMarginHalf / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {
                      'Identify personal challenges that may make it difficult for you to quit using tobacco and how you plan to overcome those challenges.'
                    }
                  </Text>

                  <View
                    style={{
                      width: '93%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderColor: '#B6C0CB',
                      borderWidth: 2,
                      marginTop: blockMarginHalf / 2,
                    }}>
                    {/* Static Header */}
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <Text
                        style={{
                          width: '49%',
                          color: '#B6C0CB',
                          fontSize: 13,
                          textAlign: 'center',
                          padding: 5,
                          fontFamily: 'SFCompactDisplay-Medium',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        Your Challenges
                      </Text>

                      <View style={{ borderColor: '#B6C0CB', borderWidth: 2 }} />
                      <Text
                        style={{
                          width: '49%',
                          color: '#B6C0CB',
                          fontSize: 13,
                          textAlign: 'center',
                          padding: 5,
                          fontFamily: 'SFCompactDisplay-Medium',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        Your Coping Strategy
                      </Text>
                    </View>
                  </View>

                  {this.state.view3New.map((element) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '93%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderColor: '#B6C0CB',
                            borderWidth: 2,
                          }}>
                          <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                              style={{
                                width: '49%',
                                color: '#202020',
                                fontSize: 13,
                                textAlign: 'left',
                                padding: 5,
                                textAlignVertical: 'top',
                                fontFamily: 'SFCompactDisplay-Medium',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                minHeight: 70,
                              }}
                              value={element.challenge}
                              returnKeyType="done"
                              multiline={true}
                              underlineColorAndroid="transparent"
                              onChangeText={(value) =>
                                this.view3Add(
                                  value,
                                  element.index,
                                  element.id,
                                  1,
                                )
                              }
                            />
                            <View
                              style={{ borderColor: '#B6C0CB', borderWidth: 2 }}
                            />
                            <TextInput
                              style={{
                                width: '49%',
                                color: '#202020',
                                fontSize: 13,
                                textAlign: 'left',
                                padding: 5,
                                textAlignVertical: 'top',
                                fontFamily: 'SFCompactDisplay-Medium',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                minHeight: 70,
                              }}
                              value={element.copying_strategy}
                              returnKeyType="done"
                              multiline={true}
                              underlineColorAndroid="transparent"
                              onChangeText={(value) =>
                                this.view3Add(
                                  value,
                                  element.index,
                                  element.id,
                                  2,
                                )
                              }
                            />
                          </View>
                        </View>
                        {element.id !== 'challenge_id_0' ? (
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              end: -12.5,
                            }}
                            onPress={() => this.step3Remove(element.id)}>
                            <View
                              style={{
                                opacity: 100,
                                margin: blockMargin,
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <Image
                                resizeMode="contain"
                                source={require('../../images/minus.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                  resizeMode: 'contain',

                                  justifyContent: 'center',

                                  alignSelf: 'center',
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  })}

                  <TouchableOpacity onPress={() => this.step3PopulateButton()}>
                    <View
                      style={{
                        opacity: 100,
                        margin: blockMargin,
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../images/plus.png')}
                        style={{
                          width: 35,
                          height: 35,
                          resizeMode: 'contain',

                          justifyContent: 'center',

                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* step 4 */}
                <View
                  style={{
                    width: '93%',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      color: '#202020',
                      fontSize: 18,
                      marginTop: blockMargin / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    Step 4
                  </Text>

                  <Text
                    style={{
                      width: '93%',
                      color: '#B6C0CB',
                      fontSize: 15.5,
                      marginTop: blockMarginHalf / 2,
                      marginBottom: blockMarginHalf,
                      textAlign: 'left',
                      fontFamily: 'SFCompactDisplay-Medium',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {
                      'Write down steps you will take to make your environment tobacco-free.'
                    }
                  </Text>

                  {this.state.view4New.map((element) => {
                    return (
                      <View
                        style={{
                          width: '93%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginTop: 8,
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}>
                          <TextInput
                            style={{
                              color: '#202020',
                              fontSize: 15,
                              fontFamily: 'SFCompactDisplay-Regular',
                              width: '93%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              minHeight: 40,
                              marginHorizontal: 20
                            }}
                            placeholder=""
                            placeholderTextColor="#B6C0CB"
                            value={element.name}
                            returnKeyType="done"
                            multiline={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) =>
                              this.view4Add(value, element.index, element.id)
                            }
                          />
                          {element.id !== 'env_id_0' ? (
                            <TouchableOpacity
                              style={{
                                // width: '8%',
                                // end: 0,
                                // justifyContent: 'center',
                                // alignSelf: 'center',
                              }}
                              onPress={() => this.step4Remove(element.id)}>
                              <View
                                style={{
                                  opacity: 100,
                                  // margin: blockMargin,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Image
                                  resizeMode="contain"
                                  source={require('../../images/minus.png')}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',

                                    justifyContent: 'center',

                                    alignSelf: 'center',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                          ) : (
                            <View
                              style={{
                                width: '8%',
                                end: 0,
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <View
                                style={{
                                  opacity: 100,
                                  margin: blockMargin,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}></View>
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 2,

                            borderBottomColor: '#B6C0CB',
                            width: '100%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    );
                  })}

                  <TouchableOpacity onPress={() => this.step4PopulateButton()}>
                    <View
                      style={{
                        opacity: 100,
                        margin: 30,
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../images/plus.png')}
                        style={{
                          width: 35,
                          height: 35,
                          resizeMode: 'contain',

                          justifyContent: 'center',

                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* </View> */}

          <View style={styles.view3}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.contbutton]}
              onPress={() => this.quit_plan()}>
              <Text style={styles.nexttext}>Next</Text>
            </TouchableOpacity>
          </View>

          {this.state.isHidden ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
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
