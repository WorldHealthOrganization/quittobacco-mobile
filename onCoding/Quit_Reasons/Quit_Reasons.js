/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, Settings, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import styles from '../Questionare_Screen5/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple';

import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;

import Toast from 'react-native-simple-toast';
//import Settings_Screen from '../Settings/Settings';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

export default class Quit_Reasons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      width: Dimensions.get('window').width,
      quitReason: [],
      reasons: [],
      reasons_value: [],
      use: [],
      SettingState: '',
      quit_reasons: [],
    };
  }

  onSelectionsChange = (reasons) => {
    // // selectedFruits is array of { label, value }
    // this.setState({ reasons_value:reasons });
    // var use = 0;

    // if (reasons.length > 0) {
    //   for (var i = 0; i < reasons.length; i++) {
    //   use =  reasons[i].value + ',';
    //   }
    //   this.setState({use:use});
    // }


    // selectedFruits is array of { label, value }
    this.setState({ reasons_value: reasons });
    let use = []
    let useId = []

    if (reasons.length > 0) {
      for (var i = 0; i < reasons.length; i++) {
        use.push(reasons[i].label);
        useId.push(reasons[i].value);
      }
      this.setState({ use: useId });
    } else {
      this.setState({ use: '' });
    }

  }



  componentDidMount = () => {

    this.quit_reason();
    this.show();

  };


  quit_reason = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

    this.setState({ isHidden: true });


    axios
      .post(
        ApiName.quit_reasons, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false });

        if (response.data.status == 200) {

          const obj = [];

          for (var i = 0; i < response.data.data.length; i++) {
            obj.push({
              value: response.data.data[i].id + '',
              label: response.data.data[i].name,
            });
          }
          this.setState({ quitReason: obj });

        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again');

      });
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
        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          console.log("Use Selected" + JSON.stringify(response))
          const obj = [];
          let useId = []

          for (var i = 0; i < response.data.data.quit_reasons.length; i++) {
            obj.push({
              value: response.data.data.quit_reasons[i].id + '',
              label: response.data.data.quit_reasons[i].name,
            });

            useId.push(response.data.data.quit_reasons[i].id + '');
          }
          this.setState({ reasons_value: obj, use: useId });

        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        console.log(error)
        Toast.show('There was some error. Please try again')

      });
  }


  update = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');

    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    let SettingState = await AsyncStorage.getItem('SettingState');

    this.setState({ SettingState: SettingState });


    const { use } = this.state;

    console.log("Useddg" + JSON.stringify(use))

    if (use.length > 0) {
      this.setState({ isHidden: true });
      axios
        .post(
          ApiName.userInfoupdate, {
          quit_reasons: use,
        },
          {
            headers: {
              'Authorization': jwt_token,
            },
          },
        )
        .then((response) => {

          this.setState({ isHidden: false })

          if (response.data.status == 200) {

            Toast.show(response.data.message);
            this.props.navigation.navigate('Settings')

          }
          else {
            Toast.show(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({ isHidden: false })
          Toast.show('There was some error. Please try again')

        });

    }
    else {
      Toast.show('Select Reasons')
    }
  }


  render() {

    const { quitReason, reasons, isHidden } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.container}>
          <View style={styles.view}>
            <View style={{
              flexDirection: 'row', width: '100%', height: '12%',
              backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
            }}>
              <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}>

                <TouchableOpacity style={{

                  alignItems: 'center',
                }} onPress={() => this.props.navigation.goBack()}>

                  <Image style={{
                    width: responsiveWidth(3),
                    height: responsiveHeight(4),

                    resizeMode: 'contain'
                  }} source={require('../../images/back_arrow.png')} />

                </TouchableOpacity>

              </View>
              <View style={{ width: '76%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),
                  justifyContent: 'center',
                  textAlign: 'center',

                }}>Let's Do It</Text>
              </View>
              <View style={{ width: '12%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>

                <TouchableOpacity style={{

                  alignItems: 'center',
                }} onPress={() => this.shareApp({ type: 2 })}>

                  <Image style={{
                    width: 0,
                    height: 0,
                    tintColor: '#0072bb',
                    resizeMode: 'contain'
                  }} source={require('../../images/share.png')} />

                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: responsiveHeight(1.5) }}>
              <Text style={styles.text_ques2}>Make a list of your reasons to quit tobacco use</Text>
              <SelectMultiple style={{ marginTop: blockMarginHalf * 1.5 }} labelStyle={{ fontFamily: 'SFCompactDisplay-Regular', color: 'black' }} rowStyle={styles.rowstyle} selectedCheckboxSource={require('../../images/tick_enabled.png')} checkboxSource={require('../../images/tick_disable.png')}
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
            {isHidden ? (
              <View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'transparent'
              }}>
                <ActivityIndicator
                  size={40}
                  color="#0072bb"
                  animating={true}
                  backgroundColor={'transparent'}
                />
              </View>
            ) : null}

          </View>

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