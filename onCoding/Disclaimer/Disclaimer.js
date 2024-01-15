/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from '../Disclaimer/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import HTMLView from 'react-native-htmlview';

import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Navigation from '../Navigation/Navigation';
import Toast from 'react-native-simple-toast';

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';


export default class Disclaimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,

    };
  }

  componentDidMount = () => {

    this.disclaimer();
  };

  disclaimer = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    this.setState({ isHidden: true });

    axios
      .post(
        ApiName.disclaimer, {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {

        this.setState({ isHidden: false });

        if (response.data.status == 200) {
          this.setState({ content: response.data.data.description });

          AsyncStorage.setItem('QuestionarieStatus', '1');
          
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false });
        Toast.show('There was some error. Please try again');
       
      });
  }

  render() {

    const { content } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.view}>
            <View style={{
              flexDirection: 'row', width: '100%', height: '11%',
              backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
            }}>
              <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}>

                <TouchableOpacity style={{

                  alignItems: 'center',
                }} onPress={() => this.props.navigation.navigate('Questionare_Screen5')}>

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

                }}>Disclaimer</Text>
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

            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <View style={{ marginTop: blockMargin  }}>
                {/* <Text style={styles.text}>{content}</Text> */}
                <HTMLView
                  style={styles.text}
                  value={`<body>${content}</body>`}
                  stylesheet={styless}

                />
              </View>


            </ScrollView>
            <View style={styles.view2}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.submitbutton]}
                onPress={() => this.props.navigation.navigate('UserHome')}>
                <Text style={styles.submittext}>Continue</Text>
              </TouchableOpacity>

            </View>
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

const styless = StyleSheet.create({
  p: {
    color: '#000000',
    fontFamily: 'SFCompactDisplay-Bold',
    fontSize: 15,

  },
});

// const RootStack = createStackNavigator({

//   Navigation: Navigation,
//   Disclaimer: Disclaimer,

// },
// {
//   initialRouteName: 'Disclaimer',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Disclaimerstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
