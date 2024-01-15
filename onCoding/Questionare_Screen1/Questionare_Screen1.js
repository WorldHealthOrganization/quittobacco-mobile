/* eslint-disable prettier/prettier */
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from '../Questionare_Screen1/styles';
import {
  MultiPickerMaterialDialog,
  SinglePickerMaterialDialog,
} from 'react-native-material-dialog';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-simple-toast';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
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

import Settings from '../Settings/Settings';
import Welcome from '../Welcome/Welcome';
import dateFormat from 'date-fns/format';
import moment from 'moment';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

// import ReactNativePickerModule from "react-native-picker-module"
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

const tobacco = [
  {label: 'When I feel Stressed', value: 'one'},
  {label: 'When I am feeling down or sad', value: 'two'},
  {label: 'When I feel irritable, on edge, grouchy', value: 'three'},
  {label: 'When I am having trouble thinking clearly', value: 'four'},
  {label: 'When I am feeling restless and jumpy', value: 'five'},
  {label: 'When I am stressed with work', value: 'six'},
  {label: 'When I hangout with friends', value: 'seven'},
  {label: 'When I am partying with friends', value: 'eight'},
  {label: 'When I got to Social meetings', value: 'nine'},
];

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import {validateAnimatedStyles} from 'react-native-reanimated/lib/typescript/reanimated2/hook/utils';

export default class Questionare_Screen1 extends Component {
  state = {
    choosenIndex: '',
  };
  // state1 = { selectedReason: [] }
  constructor(props) {
    super(props);

    this.pickerRef1 = React.createRef();

    this.pick_gender = React.createRef();
    this.pick_education = React.createRef();
    this.pick_countries = React.createRef();
    this.pick_profession = React.createRef();
    this.pick_tobacco_type = React.createRef();
    this.pick_tobacco_product = React.createRef();

    this.pick_firstTobacco = React.createRef();
    this.pick_frequent_smokes = React.createRef();
    this.state = {
      width: Dimensions.get('window').width,
      gender_value: '',
      gender: [],
      date_of_birth: '',

      education: '',
      profession_id: '',
      professions: '',
      country_id: '',
      country_symbol: '',
      tobacco_id: '',
      type_tob: '',
      tobacco_product_id: '',
      tobacco_products: [],
      frequent_smoke_id: '',
      first_smoke_timing_id: '',
      first_tobacco_use_age: '',
      money_spent: '',
      tobacco_count: '',
      frequent: '',
      first_tobacco: '',
      // how_hard_to_quit : '',
      usage_count: '',
      use_reasons: '',
      jwttoken: '',
      eduList: [],
      countriesList: [],
      products: [],
      occupation: [],
      firsttobacco_list: [],
      savings_amt: [],

      tobacco_type: [],
      frequent_smokes: [],
      selectedReason: [],
      reasons: [],
      error: true,
      error1: true,
      error2: true,
      reasons_value: [],
      use: [],
      tobacco_content: 'What tobacco product do you consume?',
      isDateTimePickerVisible: false,
      date_of_birth_api: '',
      isDatePickerVisible: false,
      symbol: '',
      currency: '',
      isHidden: false,

      gender_data: '',
      education_data: '',
      countries_data: '',
      profession_data: '',
      tobacco_type_data: '',
      tobacco_product_data: '',

      firstTobacco_data: '',
      frequent_smokes_data: '',
      text: '',

      multiPickerVisible: false,
      multiPickerSelectedItems: [],
      singlePickerSelectedItems: {},
      gender_Visible: false,
      education_Visible: false,
      occupation_Visible: false,
      country_Visible: false,
      tobaccotype_Visible: false,
      frequent_smokes_Visible: false,
      first_tobacco_Visible: false,
    };
  }

  onSelectionsChange = (reasons) => {
    console.log('onselection', reasons);
    // selectedFruits is array of { label, value }
    this.setState({reasons_value: reasons});
    let use = [];
    let useId = [];

    if (reasons.length > 0) {
      for (var i = 0; i < reasons.length; i++) {
        use.push(reasons[i].label);
        useId.push(reasons[i].value);
      }
      this.setState({use: useId});
    } else {
      this.setState({use: ''});
    }
  };

  onTextChanged(e) {
    if (/^\d+$/.test(e.toString()) || e === '') {
      this.setState({first_tobacco_use_age: e});
    }
  }

  onTextChanged1(e) {
    if (/^\d+$/.test(e.toString()) || e === '') {
      this.setState({usage_count: e});
    }
  }

  onTextChanged2(e) {
    if (/^\d+$/.test(e.toString()) || e === '') {
      this.setState({tobacco_count: e});
    }
  }

  onTextChanged3(e) {
    if (/^\d+$/.test(e.toString()) || e === '') {
      this.setState({money_spent: e});
    }
  }

  _handleDatePicked = (date) => {
    // let formatDate = dateFormat(date, 'hh:mm a');
    let send_date = dateFormat(date, 'yyyy-MM-dd');
    let display_date = dateFormat(date, 'dd-MM-yyyy');

    this.setState({date_of_birth: display_date});
    this.setState({date_of_birth_api: send_date});

    this._hideDateTimePicker();
  };

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  restrict(event) {
    const regex = new RegExp('^[a-zA-Z]+$');
    const key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode,
    );
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

    this.onGetEducation();
    this.onGetCountries();
    this.onGetProfessions();
    this.onGetFirst();
    this.onGetUseReasons();
    this.onGettype();
    this.onGetfrequentsmoke();
    // this.onGetProduct();
  };

  handleInput(value, key) {
    // /^(?:[A-Za-z]+|\d+)$/.test(value) ? "block number" : "block letter"
    /^(?:[A-Za-z]+|\d+)$/.test(this.state.first_tobacco_use_age);

    this.setState({first_tobacco_use_age: value});
  }

  // getUser = async () => {
  //   const jwttoken = await AsyncStorage.getItem('JwtToken');
  //   this.setState({
  //     jwttoken: jwttoken,
  //   });
  //   }

  setUser = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    console.log('jwt token====', jwt_token);
    const {
      gender_value,
      date_of_birth,
      date_of_birth_api,
      education,
      professions,
      country_id,
      country_symbol,
      type_tob,
      tobacco_products,
      frequent,
      first_tobacco,
      first_tobacco_use_age,
      money_spent,
      usage_count,
      tobacco_count,
      use,
      type_id,
    } = this.state;

    // RNDateFormat.formatDate(
    //   date_of_birth,
    //   'dd-MM-YYYY',
    //   'YYYY-MM-dd',
    //   (date_of_birth) => {
    //     this.setState({date_of_birth: date_of_birth});

    //   },
    // );

    if (
      gender_value &&
      date_of_birth &&
      education &&
      professions &&
      country_id &&
      type_tob &&
      tobacco_products &&
      frequent &&
      first_tobacco &&
      first_tobacco_use_age &&
      money_spent &&
      usage_count &&
      tobacco_count &&
      use != ' '
    ) {
      this.setState({isHidden: true});

      const formEvent = new FormData();
      formEvent.append('education_id', education);
      formEvent.append('profession_id', professions);
      formEvent.append('country_id', country_id);
      formEvent.append('tobacco_id', type_id);
      formEvent.append('tobacco_product_id', tobacco_products);
      formEvent.append('first_tobacco_use_age', first_tobacco_use_age);
      formEvent.append('frequent_smoke_id', frequent);
      formEvent.append('first_smoke_timing_id', first_tobacco);

      formEvent.append('gender', gender_value);
      formEvent.append('date_of_birth', date_of_birth_api);
      formEvent.append('usage_count', usage_count);
      formEvent.append('money_spent', money_spent);
      formEvent.append('tobacco_count', tobacco_count);

      use.forEach((element, i) => {
        formEvent.append('use_reasons[]', element);
      });

      console.log(
        'api input====',
        education +
          ' education  ' +
          professions +
          ' profession ' +
          country_id +
          '  countryid ' +
          type_tob +
          ' typetob ' +
          tobacco_products +
          ' tobaccoproducts' +
          first_tobacco_use_age +
          ' first tobaco age ' +
          frequent +
          ' freq ' +
          first_tobacco +
          ' first tobacco ' +
          gender_value +
          ' genderval ' +
          date_of_birth_api +
          ' dob ' +
          usage_count +
          ' usagecount ' +
          money_spent +
          ' moneyspent ' +
          tobacco_count +
          ' tobacco count ' +
          use +
          ' use ',
      );
      axios
        .post(
          ApiName.userInfoupdate,
          {
            education_id: education,
            profession_id: professions,
            country_id: country_id,
            tobacco_id: type_tob,
            tobacco_product_id: tobacco_products,
            first_tobacco_use_age: first_tobacco_use_age,
            frequent_smoke_id: frequent,
            first_smoke_timing_id: first_tobacco,
            gender: gender_value,
            date_of_birth: date_of_birth_api,
            usage_count: usage_count,
            money_spent: money_spent,
            tobacco_count: tobacco_count,
            use_reasons: use,
          },
          {
            headers: {
              Authorization: jwt_token,
              //'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.setState({isHidden: false});
          if (response.data.status == 200) {
            AsyncStorage.setItem('Gender', response.data.data.gender + '');
            AsyncStorage.setItem(
              'Education',
              response.data.data.education + '',
            );
            AsyncStorage.setItem(
              'Money_Spent',
              response.data.data.money_spent + '',
            );
            AsyncStorage.setItem(
              'Tobacco_Count',
              response.data.data.tobacco_count + '',
            );
            AsyncStorage.setItem(
              'First_Smoke',
              response.data.data.first_smoke_timing.Occurence + '',
            );

            Toast.show(response.data.message);
            //this.props.navigation.navigate('Welcome')

            this.props.navigation.navigate('Questionare_Notifications');
          } else {
            Toast.show(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({isHidden: false});
          console.log('errorr===>', error);
          Toast.show('There was some error. Please try again' + error);
        });
    } else {
      this.setState({isHidden: false});
      Toast.show('Please enter all Fields');
    }
  };

  onGetEducation = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    axios
      .post(
        ApiName.educations,
        {},
        {
          headers: {
            Authorization: jwt_token,
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
          console.log('edu list', obj);
          if (response.data.security_question != null) {
            this.setState({
              eduList: obj,
              date_of_birth: response.data.security_question,
              date_of_birth_api: response.data.security_question,
            });
          } else {
            this.setState({date_of_birth: '', date_of_birth_api: ''});
          }
          this.setState({eduList: obj});
        } else if (response.data.status == 401) {
          AsyncStorage.clear();
          AsyncStorage.setItem('LoginStatus', 'false');
          AsyncStorage.setItem('Walkthrough', 'false');

          Toast.show('Token expired, Please Login again to continue');

          this.props.navigation.navigate('Splash');
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetCountries = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    axios
      .post(
        ApiName.countries,
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({isHidden: false});

        //console.log("Contries"+JSON.stringify(response))

        if (response.data.status == 200) {
          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label:
                response.data.data[i].name +
                '(' +
                response.data.data[i].symbol +
                ')',
              currency: response.data.data[i].symbol,
            });
          }

          this.setState({countriesList: obj});
        } else if (response.data.status == 401) {
          AsyncStorage.clear();
          AsyncStorage.setItem('LoginStatus', 'false');
          AsyncStorage.setItem('Walkthrough', 'false');

          Toast.show('Token expired, Please Login again to continue');

          this.props.navigation.navigate('Splash');
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetProfessions = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.professions,
        {},
        {
          headers: {
            Authorization: jwt_token,
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
          this.setState({occupation: obj});

          // Toast.show(response.data.message);
        } else if (response.data.status == 401) {
          AsyncStorage.clear();
          AsyncStorage.setItem('LoginStatus', 'false');
          AsyncStorage.setItem('Walkthrough', 'false');

          Toast.show('Token expired, Please Login again to continue');

          this.props.navigation.navigate('Splash');
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetProduct = async ({type_tob}) => {
    console.log('check with typetop', type_tob);
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({isHidden: true});

    axios
      .post(
        ApiName.products,
        {
          tobacco_id: type_tob,
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
          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].name,
            });
          }
          this.setState({products: obj});
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetUseReasons = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.use_reasons,
        {},
        {
          headers: {
            Authorization: jwt_token,
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
          this.setState({selectedReason: obj});
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetFirst = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.first_smoke_timings,
        {},
        {
          headers: {
            Authorization: jwt_token,
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
              label: response.data.data[i].Occurence,
            });
          }

          this.setState({firsttobacco_list: obj});
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGettype = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.tobaccos,
        {},
        {
          headers: {
            Authorization: jwt_token,
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

          this.setState({tobacco_type: obj});
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  onGetfrequentsmoke = async () => {
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    axios
      .post(
        ApiName.frequent_smokes,
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({isHidden: false});
        if (response.data.status == 200) {
          const obj = [];

          for (var i = 0; i < response.data.data.Frequent_Smokes.length; i++) {
            obj.push({
              value: response.data.data.Frequent_Smokes[i].id + '',
              label: response.data.data.Frequent_Smokes[i].instance,
            });
          }

          this.setState({
            frequent_smokes: obj,
            country_symbol: response.data.data.currency,
            symbol: response.data.data.symbol,
          });
        }
      })
      .catch((error) => {
        this.setState({isHidden: false});
        Toast.show('There was some error. Please try again');
      });
  };

  inputValidation = async () => {
    const {frequent, usage_count, tobacco_count, money_spent, first_tobacco} =
      this.state;

    Keyboard.dismiss();

    if (frequent != '') {
      if (usage_count != '') {
        if (tobacco_count != '') {
          if (money_spent != '') {
            if (first_tobacco != '') {
              this.setState({error: false});
            } else {
              Toast.show('Select First Tobacco Timing');
            }
          } else {
            Toast.show('Enter Money Spent');
          }
        } else {
          Toast.show('Enter Tobacco Count');
        }
      } else {
        Toast.show('Enter Usage count');
      }
    } else {
      Toast.show('Select Frequent Smoking');
    }
  };

  inputValidation1 = async () => {
    const {
      gender_value,
      education,
      professions,
      country_id,
      date_of_birth,
      type_tob,
      tobacco_products,
      first_tobacco_use_age,
    } = this.state;
    console.log('tobacco_products check', tobacco_products);

    Keyboard.dismiss();

    if (gender_value != '') {
      if (date_of_birth != '') {
        const dateFormat = 'DD/MM/YYYY';
        const toDateFormat = moment(date_of_birth, dateFormat).isValid();

        if (toDateFormat) {
          let formatValidDate = moment(date_of_birth, dateFormat).format(
            'yyyy-MM-DD',
          );

          const date = new Date();

          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();
          console.log('date --- ' + new Date(year - 10, month, day));

          if (
            new Date(formatValidDate).getTime() <
            new Date(year - 10, month, day).getTime()
          ) {
            this.setState({date_of_birth_api: formatValidDate});
            if (education != '') {
              if (professions != '') {
                if (country_id != '') {
                  if (type_tob != '') {
                    if (
                      tobacco_products != '' &&
                      tobacco_products.length != 0
                    ) {
                      console.log('fkjd' + JSON.stringify(tobacco_products));
                      if (first_tobacco_use_age != '') {
                        this.setState({error1: false});
                      } else {
                        Toast.show('Enter Age');
                      }
                    } else {
                      console.log('fkjd2' + JSON.stringify(tobacco_products));
                      Toast.show('Select Tobacco Product');
                    }
                  } else {
                    Toast.show('Select Tobacco Type');
                  }
                } else {
                  Toast.show('Select Your Country');
                }
              } else {
                Toast.show('Select Your Profession');
              }
            } else {
              Toast.show('Select Your education');
            }
          } else {
            Toast.show(
              'Date of Birth must not be above ' +
                new Date(year - 10, month, day).getFullYear(),
            );
          }
        } else {
          Toast.show('Enter Valid Date of Birth');
        }
      } else {
        Toast.show('Enter Your Date of Birth');
      }
    } else {
      Toast.show('Select Gender');
    }
  };

  inputValidation2 = async () => {
    const {use} = this.state;

    Keyboard.dismiss();

    if (use != '') {
      this.setState({error2: false});
      this.setUser();
    } else {
      Toast.show('Select Use Reasons');
    }
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

    this.setState({date_of_birth: formatDate});
    this.setState({date_of_birth_api: formatValidDate});
    this.hideDatePicker();
  };

  openPicker_gender = () => {
    if (this.pick_gender.current) {
      this.pick_gender.current.focus();
    }
  };
  openPicker_edu = () => {
    if (this.pick_education.current) {
      this.pick_education.current.focus();
    }
  };

  openPicker_proffesion = () => {
    if (this.pick_profession.current) {
      this.pick_profession.current.focus();
    }
  };

  openPicker_country = () => {
    if (this.pick_countries.current) {
      this.pick_countries.current.focus();
    }
  };
  openPicker_tobacotype = () => {
    if (this.pick_tobacco_type.current) {
      this.pick_tobacco_type.current.focus();
    }
  };

  openPicker_tobacoProdcut = () => {
    if (this.pick_tobacco_product.current) {
      this.pick_tobacco_product.current.focus();
    }
  };

  openPicker_frequent_smke = () => {
    if (this.pick_frequent_smokes.current) {
      this.pick_frequent_smokes.current.focus();
    }
  };

  openPicker_first_tobacco = () => {
    if (this.pick_firstTobacco.current) {
      this.pick_firstTobacco.current.focus();
    }
  };

  render() {
    {
      console.log('smoke dataa', this.state.frequent_smokes_data);
    }
    const buttonTextStyle = {
      color: '#FFFFFF',
      backgroundColor: '#0072BB',
      textAlignVertical: 'center',
      textAlign: 'center',
      width: responsiveWidth(60),
      fontFamily: 'SFCompactDisplay-Medium',
      fontSize: responsiveFontSize(2),
      borderRadius: 30,
      justifyContent: 'center',
      padding: 15,
    };

    const buttonTextStyle1 = {
      color: '#FFFFFF',
      backgroundColor: '#0072BB',
      width: responsiveWidth(25),
      fontFamily: 'SFCompactDisplay-Medium',
      fontSize: responsiveFontSize(2),
      borderRadius: 30,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderTopLeftRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
    };

    const buttonTextStyle3 = {
      color: '#393939',
    };

    const {
      gender_value,
      education,
      professions,
      countriesList,
      countries_data,
      country_id,
      first_tobacco,
      firsttobacco_list,
      eduList,
      products,
      tobacco_products,
      occupation,
      type_tob,
      tobacco_type,
      first_tobacco_use_age,
      frequent,
      frequent_smokes,
      selectedReason,
      reasons,
      tobacco_content,
    } = this.state;

    let genderList = [
      {
        label: 'Male',
        value: '0',
      },
      {
        label: 'Female',
        value: '1',
      },
      {
        label: 'Other',
        value: '2',
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.view}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: responsiveWidth(100),
                    height: '10%',
                    backgroundColor: '#0072BB',
                  }}>
                  <Text style={styles.toolbar_title}>Let's Start!</Text>
                </View>
                <Text style={styles.content}>
                  Please provide information to help create a customized Quit
                  Plan
                </Text>
                <View style={{flex: 1}}>
                  <ProgressSteps
                    labelFontFamily="SFCompactDisplay-Regular"
                    borderWidth={2}
                    topOffset={15}
                    marginBottom={7}
                    activeStepIconBorderColor={'#0072BB'}
                    activeStepIconColor={'#0072BB'}
                    progressBarColor={'#ebebe4'}
                    completedProgressBarColor={'#0072BB'}
                    activeStepNumColor={'#FFFFFF'}
                    completedStepIconColor={'#0072BB'}>
                    <ProgressStep
                      onNext={() => this.inputValidation1()}
                      nextBtnTextStyle={buttonTextStyle}
                      scrollable={true}
                      errors={this.state.error1}>
                      <View>
                        <KeyboardAwareScrollView
                          style={{flex: 1, width: '100%'}}
                          contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center',
                          }}>
                          <View style={{marginTop: 0}}>
                            <Text style={styles.text_ques}>Gender</Text>

                            <TouchableOpacity
                              onPress={() => {
                                genderList.length > 0 &&
                                  this.setState({gender_Visible: true});
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(90),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.gender_data != ''
                                    ? this.state.gender_data
                                    : 'Select Gender'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>

                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              Date of Birth (DD/MM/YYYY){' '}
                            </Text>

                            <TextInputMask
                              refInput={(ref) => (this.myDateText = ref)}
                              placeholder="Enter the date"
                              placeholderTextColor="#000"
                              type={'datetime'}
                              style={{
                                width: '90%',
                                color: '#000',
                                justifyContent: 'center',
                                alignSelf: 'center',

                                fontFamily: 'SFCompactDisplay-Regular',
                                fontSize: 16,
                              }}
                              value={this.state.date_of_birth}
                              onChangeText={(text) => {
                                this.setState({
                                  date_of_birth: text,
                                });
                              }}
                              options={{
                                format: 'DD/MM/YYYY',
                              }}
                            />

                            <View
                              style={{
                                borderBottomWidth: responsiveWidth(0.22),
                                marginTop: Platform.OS == 'ios' ? 10 : -5,
                                borderBottomColor: '#B6C0CB',
                                width: responsiveWidth(90),
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}
                            />

                            <Text style={styles.text_ques}>
                              Education Level
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                eduList.length > 0 &&
                                  this.setState({education_Visible: true});
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(90),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.education_data !== ''
                                    ? this.state.education_data
                                    : 'Select Education'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              Employment Status
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                occupation.length > 0 &&
                                  this.setState({occupation_Visible: true});
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(85),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.profession_data != ''
                                    ? this.state.profession_data
                                    : 'Select Employment Status'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>

                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              Country of residence
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                countriesList.length > 0 &&
                                  this.setState({country_Visible: true});
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(85),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.countries_data != ''
                                    ? this.state.countries_data
                                    : 'Select Country'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>

                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              What type of Tobacco do you consume?
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                tobacco_type.length > 0 &&
                                  this.setState({tobaccotype_Visible: true});
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(90),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.tobacco_type_data != ''
                                    ? this.state.tobacco_type_data
                                    : 'Select Tobacco Type'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>

                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              {tobacco_content}
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                products.length > 0
                                  ? this.setState({multiPickerVisible: true})
                                  : null;
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: responsiveWidth(90),
                                  marginTop: 8,
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#202020',
                                    fontFamily: 'SFCompactDisplay-Regular',
                                    fontSize: 16,
                                    width: responsiveWidth(85),
                                  }}>
                                  {this.state.tobacco_products != ''
                                    ? this.state.tobacco_products.length > 0
                                      ? this.state.tobacco_products.length > 1
                                        ? this.state.tobacco_product_data
                                        : this.state.tobacco_product_data
                                      : 'Select Tobacco Product'
                                    : 'Select Tobacco Product'}
                                </Text>

                                <Image
                                  source={require('../../images/down_arrow.png')}
                                  style={{
                                    width: responsiveWidth(2),
                                    height: responsiveHeight(4),
                                    marginLeft: responsiveWidth(2),
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                            <View style={styles.view4} />

                            <Text style={styles.text_ques}>
                              At what age did you first use tobacco?
                            </Text>
                            <TextInput
                              ref={(input) => (this.age = input)}
                              style={styles.textInput2}
                              //  onChangeText={(value) => this.setState({money_spent: value})}
                              onChangeText={(e) => this.onTextChanged(e)}
                              keyboardType="numeric"
                              maxLength={2}
                              value={this.state.first_tobacco_use_age}
                              returnKeyType="done"
                            />

                            <View style={styles.view7} />
                          </View>
                        </KeyboardAwareScrollView>
                      </View>
                    </ProgressStep>
                    <ProgressStep
                      onNext={() => this.inputValidation()}
                      previousBtnTextStyle={buttonTextStyle1}
                      nextBtnTextStyle={buttonTextStyle1}
                      scrollable={true}
                      errors={this.state.error}>
                      <KeyboardAwareScrollView
                        style={{flex: 1, width: '100%'}}
                        contentContainerStyle={{
                          flexGrow: 1,
                          justifyContent: 'center',
                        }}>
                        <View style={{marginTop: responsiveHeight(0), flex: 1}}>
                          <Text style={styles.text_ques3}>
                            How often did you use tobacco products in the last
                            month?
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              frequent_smokes.length > 0 &&
                                this.setState({frequent_smokes_Visible: true});
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: responsiveWidth(90),
                                marginTop: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#202020',
                                  fontFamily: 'SFCompactDisplay-Regular',
                                  fontSize: 16,
                                  width: responsiveWidth(85),
                                }}>
                                {this.state.frequent_smokes_data != ''
                                  ? this.state.frequent_smokes_data
                                  : 'Select Option'}
                              </Text>

                              <Image
                                source={require('../../images/down_arrow.png')}
                                style={{
                                  width: responsiveWidth(2),
                                  height: responsiveHeight(4),
                                  marginLeft: responsiveWidth(2),
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </TouchableOpacity>

                          <View style={styles.view5} />
                          <View style={{marginTop: responsiveHeight(0)}}>
                            <Text style={styles.text_ques3}>
                              How frequently do you now use tobacco products
                              daily?
                            </Text>
                            {/* <TextInputLayout focusColor="#0072BB" style={styles.inputLayout1} > */}
                            <TextInput
                              style={styles.textInput}
                              onChangeText={(e) => this.onTextChanged1(e)}
                              keyboardType="numeric"
                              maxLength={3}
                              // onSubmitEditing={() =>  this.pieces.focus()}
                              value={
                                this.state.frequent_smokes_data ===
                                  'Once In a week' ||
                                this.state.frequent_smokes_data ===
                                  'Thrice a week' ||
                                this.state.frequent_smokes_data ===
                                  'Twice a week'
                                  ? this.state.usage_count ='0'
                                  : this.state.usage_count
                                
                                
                              }
                              editable={
                                this.state.frequent_smokes_data === 'Everyday'
                              }
                              returnKeyType="next"
                            />

                            <View style={styles.view6} />

                            <Text style={styles.text_ques3}>
                              How many pieces of chewing tobacco or cigarettes
                              do you use daily?
                            </Text>
                            {/* <TextInput
                              ref={(input) => (this.pieces = input)}
                              style={styles.textInput}
                              // onChangeText={(value) => this.setState({tobacco_count: value})}
                              onChangeText={(e) => this.onTextChanged2(e)}
                              keyboardType="numeric"
                              maxLength={3}
                              value={this.state.tobacco_count}
                              returnKeyType="next"
                              onSubmitEditing={() => this.prod.focus()}
                            /> */}

                            <TextInput
                              style={styles.textInput}
                              onChangeText={(e) => this.onTextChanged2(e)}
                              keyboardType="numeric"
                              maxLength={3}
                              // onSubmitEditing={() => this.pieces.focus()}
                              value={
                                this.state.frequent_smokes_data ===
                                  'Once In a week' ||
                                this.state.frequent_smokes_data ===
                                  'Thrice a week' ||
                                this.state.frequent_smokes_data ===
                                  'Twice a week'
                                  ? this.state.tobacco_count = '0'
                                  : this.state.tobacco_count 
                              }
                              editable={
                                this.state.frequent_smokes_data === 'Everyday'
                              }
                              returnKeyType="next"
                            />

                            <View style={styles.view6} />

                            <Text style={styles.text_ques3}>
                              How much money do you spend on tobacco products in
                              a day? ({this.state.country_symbol})
                            </Text>
                            <TextInput
                              ref={(input) => (this.prod = input)}
                              style={styles.textInput}
                              //  onChangeText={(value) => this.setState({money_spent: value})}
                              onChangeText={(e) => this.onTextChanged3(e)}
                              keyboardType="numeric"
                              value={this.state.money_spent}
                              returnKeyType="done"
                            />
                            <View style={styles.view6} />
                          </View>

                          <Text style={styles.text_ques3}>
                            How soon after you wake up do you use tobacco?
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              firsttobacco_list.length > 0 &&
                                this.setState({first_tobacco_Visible: true});
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: responsiveWidth(90),
                                marginTop: 8,
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#202020',
                                  fontFamily: 'SFCompactDisplay-Regular',
                                  fontSize: 16,
                                  width: responsiveWidth(85),
                                }}>
                                {this.state.firstTobacco_data != ''
                                  ? this.state.firstTobacco_data
                                  : 'Select Answer'}
                              </Text>

                              <Image
                                source={require('../../images/down_arrow.png')}
                                style={{
                                  width: responsiveWidth(2),
                                  height: responsiveHeight(4),
                                  marginLeft: responsiveWidth(2),
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </TouchableOpacity>

                          <View style={styles.view7} />

                          <View />
                        </View>
                      </KeyboardAwareScrollView>
                    </ProgressStep>
                    <ProgressStep
                      onSubmit={() => this.inputValidation2()}
                      finishBtnText="Next"
                      previousBtnTextStyle={buttonTextStyle1}
                      nextBtnTextStyle={buttonTextStyle1}
                      scrollable={true}
                      errors={this.state.error2}>
                      <View style={{marginTop: responsiveHeight(0)}}>
                        <Text style={styles.text_ques2}>
                          Why do you crave tobacco products?
                        </Text>
                        <SelectMultiple
                          rowStyle={styles.rowstyle}
                          labelStyle={{
                            fontFamily: 'SFCompactDisplay-Regular',
                            color: 'black',
                          }}
                          selectedCheckboxSource={require('../../images/tick_enabled.png')}
                          checkboxSource={require('../../images/tick_disable.png')}
                          items={selectedReason}
                          value={reasons}
                          selectedItems={this.state.reasons_value}
                          onSelectionsChange={this.onSelectionsChange}
                        />
                      </View>
                    </ProgressStep>
                  </ProgressSteps>
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
                      backgroundColor: 'transparent',
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
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>

        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_gender}
        ref={this.pick_gender}
          value={this.state.gender_data}
          title={"Select Gender"}
          items={genderList}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
            let branch = gender.find((item) => item.value === value);
            this.setState({ gender_data: branch.label, gender_value: branch.value })
          }}
        /> */}

        {/* <Picker
        ref={this.pick_gender}
        selectedValue={this.state.gender_data}
        onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = genderList.find(item => item.value === itemValue);
            console.log("seleclable", selectedLabel.label)
            this.setState({ gender_data: selectedLabel.label, gender_value: selectedLabel.value });
        }}
        style={{ width: 100, height: 50 }}
        >

        <Picker.Item label={'Select Gender'} value={this.state.gender_data} />
        {genderList.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
        </Picker> */}
        <SinglePickerMaterialDialog
          title={'Select Gender'}
          items={genderList}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.gender_Visible}
          selectedItem={this.state.gender_data}
          onCancel={() => this.setState({gender_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({gender_Visible: false});
              this.setState({
                gender_data: result.selectedItem.label,
                gender_value: result.selectedItem.value,
              });
              this.setState({gender_Visible: false});
            } else {
              this.setState({gender_Visible: false});
            }
          }}
        />

        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_education}
          ref={this.pick_education}
          value={this.state.education_data}
          title={"Select Education"}
          items={eduList}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
            let branch = eduList.find((item) => item.value === value);
            this.setState({ education_data: branch.label, education: branch.value })
          }}
        /> */}

        <Picker
          ref={this.pick_education}
          selectedValue={this.state.education_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = eduList.find(
              (item) => item.value === itemValue,
            );
            this.setState({
              education_data: selectedLabel.label,
              education: selectedLabel.value,
            });
            console.log('seleclable', selectedLabel);
          }}
          style={{width: 100, height: 50}}>
          <Picker.Item label="Select Education" value="0" />
          {this.state.eduList.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>

        <SinglePickerMaterialDialog
          title={'Select Education'}
          items={eduList}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.education_Visible}
          selectedItem={this.state.education_data}
          onCancel={() => this.setState({education_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({education_Visible: false});
              this.setState({
                education_data: result.selectedItem.label,
                education: result.selectedItem.value,
              });
            } else {
              this.setState({education_Visible: false});
            }
          }}
        />
        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_profession}
          ref={this.pick_profession}
          value={this.state.profession_data}
          title={"Select Employment Status"}
          items={occupation}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
           
            let branch = occupation.find((item) => item.value === value);
            this.setState({ profession_data: branch.label, professions: branch.value })
          }}
        /> */}

        <Picker
          ref={this.pick_profession}
          selectedValue={this.state.profession_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = occupation.find(
              (item) => item.value === itemValue,
            );
            this.setState({
              profession_data: selectedLabel.label,
              professions: selectedLabel.value,
            });
            console.log('seleclable', selectedLabel);
          }}
          style={{width: 100, height: 50}}>
          <Picker.Item label="Select Employment Status" value="0" />
          {this.state.occupation.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        <SinglePickerMaterialDialog
          title={'Select Employment Status'}
          items={occupation}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.occupation_Visible}
          selectedItem={this.state.profession_data}
          onCancel={() => this.setState({occupation_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({occupation_Visible: false});
              this.setState({
                profession_data: result.selectedItem.label,
                professions: result.selectedItem.value,
              });
            } else {
              this.setState({occupation_Visible: false});
            }
          }}
        />

        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_countries}
          ref={this.pick_countries}
          value={countries_data}
          title={"Select Country"}
          items={countriesList}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
           
            let branch = countriesList.find((item) => item.value === value);
            this.setState({ countries_data: branch.label, country_id: branch.value, country_symbol: branch.currency })
          }}
        /> */}

        <Picker
          ref={this.pick_countries}
          selectedValue={this.state.countries_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = countriesList.find(
              (item) => item.value === itemValue,
            );
            console.log('seleclable value', selectedLabel.currency);
            this.setState({
              countries_data: selectedLabel.label,
              country_id: selectedLabel.value,
              country_symbol: selectedLabel.currency,
            });
          }}
          style={{width: 100, height: 50}}>
          <Picker.Item label="Select Country" value="0" />
          {this.state.countriesList.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        <SinglePickerMaterialDialog
          title={'Select Country'}
          items={countriesList}
          scrolled={true}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.country_Visible}
          selectedItem={this.state.countries_data}
          onCancel={() => this.setState({country_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({country_Visible: false});
              this.setState({
                countries_data: result.selectedItem.label,
                country_id: result.selectedItem.value,
                country_symbol: result.selectedItem.currency,
              });
            } else {
              this.setState({country_Visible: false});
            }
          }}
        />

        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_tobacco_type}
          ref={this.pick_tobacco_type}
          value={this.state.tobacco_type_data}
          title={"Select Tobacco Type"}
          items={tobacco_type}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
           
            let branch = tobacco_type.find((item) => item.value === value);


            this.setState({ tobacco_products: '', tobacco_product_data: '',singlePickerSelectedItems: null, multiPickerSelectedItems: [] });
            this.onGetProduct({ type_tob: branch.value })
            branch.value == '2' ? this.setState({ tobacco_content: 'What Tobacco product do you smoke?' }) : branch.value == '3' ? this.setState({ tobacco_content: 'What Tobacco product do you chew?' }) : this.setState({ tobacco_content: 'What Tobacco product do you consume?' })
            this.setState({ tobacco_type_data: branch.label, type_tob: branch.value })
          }}
        /> */}

        {/* <Picker
            ref={this.pick_tobacco_type}
            selectedValue={this.state.tobacco_type_data}
            onValueChange={(itemValue, itemIndex) => {
                const selectedLabel = tobacco_type.find(item => item.value === itemValue)?.label;

                console.log("seleclable", selectedLabel)
                if (selectedLabel) {
                    this.setState({ tobacco_products: '', tobacco_product_data: '',singlePickerSelectedItems: null, multiPickerSelectedItems: [] });
                    this.onGetProduct({ type_tob: itemIndex })
                    console.log('dfgfd',this.state.type_tob)
                    selectedValue == '2' ? this.setState({ tobacco_content: 'What Tobacco product do you smoke?' }) : selectedValue == '3' ? this.setState({ tobacco_content: 'What Tobacco product do you chew?' }) : this.setState({ tobacco_content: 'What Tobacco product do you consume?' })
                    this.setState({ tobacco_type_data: selectedLabel, type_tob: selectedLabel })
                    
                }
            }}

            // onValueChange={value => {
           
            //     let branch = tobacco_type.find((item) => item.value === value);
    
    
            //     this.setState({ tobacco_products: '', tobacco_product_data: '',singlePickerSelectedItems: null, multiPickerSelectedItems: [] });
            //     this.onGetProduct({ type_tob: branch.value })
            //     branch.value == '2' ? this.setState({ tobacco_content: 'What Tobacco product do you smoke?' }) : branch.value == '3' ? this.setState({ tobacco_content: 'What Tobacco product do you chew?' }) : this.setState({ tobacco_content: 'What Tobacco product do you consume?' })
            //     this.setState({ tobacco_type_data: branch.label, type_tob: branch.value })
            //   }}
            style={{width:100, height:50}}
            >
            <Picker.Item label="Select Tobacco Type" value="0" />
            {this.state.tobacco_type.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker> */}

        <Picker
          ref={this.pick_tobacco_type}
          selectedValue={this.state.tobacco_type_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedItem = tobacco_type.find(
              (item) => item.value === itemValue,
            );

            if (selectedItem) {
              // Now you have both label and value
              const {label, value} = selectedItem;

              this.setState({
                tobacco_products: '',
                tobacco_product_data: '',
                singlePickerSelectedItems: null,
                multiPickerSelectedItems: [],
              });
              this.onGetProduct({type_tob: value});

              if (value === '2') {
                this.setState({
                  tobacco_content: 'What Tobacco product do you smoke?',
                });
              } else if (value === '3') {
                this.setState({
                  tobacco_content: 'What Tobacco product do you chew?',
                });
              } else {
                this.setState({
                  tobacco_content: 'What Tobacco product do you consume?',
                });
              }

              this.setState({tobacco_type_data: label, type_tob: value});
            }
          }}
          style={{width: 100, height: 50}}>
          {console.log(this.state.tobacco_type)}
          <Picker.Item label="Select Tobacco Type" value="0" />
          {this.state.tobacco_type.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>

        <SinglePickerMaterialDialog
          title={'Select Tobacco Type'}
          items={tobacco_type}
          scrolled={true}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.tobaccotype_Visible}
          selectedItem={this.state.tobacco_type_data}
          onCancel={() => this.setState({tobaccotype_Visible: false})}
          onOk={(result) => {
            if (result) {
              if (result.selectedItem != undefined) {
                // Now you have both label and value
                // const { label, value } = selectedItem;

                this.setState({
                  tobacco_products: '',
                  tobacco_product_data: '',
                  singlePickerSelectedItems: null,
                  multiPickerSelectedItems: [],
                });
                this.onGetProduct({type_tob: result.selectedItem.value});

                if (result.selectedItem.value === '2') {
                  this.setState({
                    tobacco_content: 'What Tobacco product do you smoke?',
                  });
                } else if (result.selectedItem.value === '3') {
                  this.setState({
                    tobacco_content: 'What Tobacco product do you chew?',
                  });
                } else {
                  this.setState({
                    tobacco_content: 'What Tobacco product do you consume?',
                  });
                }

                this.setState({
                  tobacco_type_data: result.selectedItem.label,
                  type_tob: result.selectedItem.value,
                });
              }
            } else {
              this.setState({tobaccotype_Visible: false});
            }
            this.setState({tobaccotype_Visible: false});
          }}
        />

        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_frequent_smokes}
          ref={this.pick_frequent_smokes}
          value={this.state.frequent_smokes_data}
          title={"Select Option"}
          items={frequent_smokes}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
            
            let branch = frequent_smokes.find((item) => item.value === value);
            this.setState({ frequent_smokes_data: branch.label, frequent: branch.value })
          }}
        /> */}

        <Picker
          ref={this.pick_frequent_smokes}
          selectedValue={this.frequent_smokes_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = frequent_smokes.find(
              (item) => item.value === itemValue,
            );
            this.setState({
              frequent_smokes_data: selectedLabel.label,
              frequent: selectedLabel.value,

            });

            console.log('seleclable', selectedLabel);
          }}
          style={{width: 100, height: 50}}>
          <Picker.Item label="Select Option" value="0" />
          {this.state.frequent_smokes.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        <SinglePickerMaterialDialog
          title={'Select Option'}
          items={frequent_smokes}
          scrolled={true}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.frequent_smokes_Visible}
          selectedItem={this.frequent_smokes_data}
          onCancel={() => this.setState({frequent_smokes_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({frequent_smokes_Visible: false});
              this.setState({
                frequent_smokes_data: result.selectedItem.label,
                frequent: result.selectedItem.value,
              });
            } else {
              this.setState({frequent_smokes_Visible: false});

            }
            if(result.selectedItem.label == 'Everyday'){
              this.setState({usage_count:"",tobacco_count:""})
            }

          }}
        />
        {/* <ReactNativePickerModule
        //   pickerRef={this.pick_firstTobacco}
          ref={this.pick_firstTobacco}
          value={this.state.firstTobacco_data}
          title={"Select Answer"}
          items={firsttobacco_list}
          titleStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
          selectedColor="#0072bb"
          confirmButtonEnabledTextStyle={{ color: "white" }}
          confirmButtonDisabledTextStyle={{ color: "grey" }}
          cancelButtonTextStyle={{ color: "white" }}
          confirmButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          cancelButtonStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,1)",
          }}
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
            let branch = firsttobacco_list.find((item) => item.value === value);
            this.setState({ firstTobacco_data: branch.label, first_tobacco: branch.value })
          }}
        /> */}

        <Picker
          ref={this.pick_firstTobacco}
          selectedValue={this.state.firstTobacco_data}
          onValueChange={(itemValue, itemIndex) => {
            const selectedLabel = firsttobacco_list.find(
              (item) => item.value === itemValue,
            );
            this.setState({
              firstTobacco_data: selectedLabel.label,
              first_tobacco: selectedLabel.value,
            });
            console.log('seleclable', selectedLabel);
          }}
          style={{width: 100, height: 50}}>
          <Picker.Item label="Select Option" value="0" />
          {this.state.firsttobacco_list.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        <SinglePickerMaterialDialog
          title={'Select Option'}
          items={firsttobacco_list}
          scrolled={true}
          colorAccent={'#0072BB'}
          cancelLabel={'Cancel'}
          okLabel={'Confirm'}
          visible={this.state.first_tobacco_Visible}
          selectedItem={this.state.firstTobacco_data}
          onCancel={() => this.setState({first_tobacco_Visible: false})}
          onOk={(result) => {
            if (result.selectedItem != undefined) {
              this.setState({first_tobacco_Visible: false});
              this.setState({
                firstTobacco_data: result.selectedItem.label,
                first_tobacco: result.selectedItem.value,
              });
            } else {
              this.setState({first_tobacco_Visible: false});
            }
          }}
        />

        {console.log('multiple checker check', type_tob, "---", this.state.multiPickerSelectedItems)}
        {   type_tob != '' && (type_tob == '4' || type_tob == 4) ? (
          <MultiPickerMaterialDialog
            title={'Select Tobacco Product'}
            colorAccent={'#0072BB'}
            cancelLabel={'Cancel'}
            okLabel={'Confirm'}
            items={products}
            visible={this.state.multiPickerVisible}
            selectedItems={this.state.multiPickerSelectedItems}
            onCancel={() => this.setState({multiPickerVisible: false})}
            onOk={(result) => {
              this.setState({multiPickerVisible: false});
              this.setState({multiPickerSelectedItems: result.selectedItems});
              let tobacco_product_data = [];
              let tobaccoProdId = [];

              const selectedCount = result.selectedItems.length;

              if (selectedCount === 1) {
                this.setState({
                  tobacco_products: result.selectedItems.map(item => item.value),
                  tobacco_product_data: result.selectedItems[0].label,
                });
              } else if (selectedCount > 1) {
                this.setState({
                  tobacco_products: result.selectedItems.map(item => item.value),
                  tobacco_product_data: `${selectedCount} selected`,
                });
              } else {
                this.setState({ tobacco_products: '', tobacco_product_data: '' });
              }

              console.log(
                'Multiple ' +
                  JSON.stringify(tobaccoProdId) +
                  '--' +
                  JSON.stringify(tobacco_product_data),
              );
            }}
          />
        ) : (
          type_tob != '' && (
            <SinglePickerMaterialDialog
              title={'Select Tobacco Product'}
              items={products}
              colorAccent={'#0072BB'}
              cancelLabel={'Cancel'}
              okLabel={'Confirm'}
              visible={this.state.multiPickerVisible}
              selectedItem={this.state.singlePickerSelectedItems}
              onCancel={() => this.setState({multiPickerVisible: false})}
              onOk={(result) => {
                this.setState({multiPickerVisible: false});
                this.setState({singlePickerSelectedItems: result.selectedItem});
                let tobacco_product_data = [];
                let tobaccoProdId = [];

                if (result.selectedItem != null) {
                  tobacco_product_data.push(result.selectedItem.label);
                  tobaccoProdId.push(result.selectedItem.value);

                  this.setState({
                    tobacco_products: result.selectedItem.value,
                    tobacco_product_data: tobacco_product_data,
                  });
                } else {
                  this.setState({
                    tobacco_products: '',
                    tobacco_product_data: '',
                  });
                }
                console.log(
                  'Single ' +
                    JSON.stringify(tobaccoProdId) +
                    '--' +
                    JSON.stringify(tobacco_product_data),
                );
              }}
            />
          )
        )}
      </SafeAreaView>
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
