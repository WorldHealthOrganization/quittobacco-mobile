/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text,  Alert,Image,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import styles from '../Disclaimer/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Navigation from '../Navigation/Navigation';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

export default class Difficult_Situations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
    };
  }

  componentDidMount = () => {

    this.difficult();
  };

  difficult= async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    this.setState({ isHidden: true })

          axios
            .post(
              ApiName.difficult_situations,{ },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              console.log(
                'Disclaimer response ',
                'response get details:==> ' + JSON.stringify(response.data),
              );

              this.setState({content: response.data.data.description});

              if (response.data.status == 200) {
                console.log(JSON.stringify( response.data));
                this.setState({ isHidden: false });

              }
              else {
                console.log(response.data.message);
                this.setState({ isHidden: false });
              }
            })
            .catch((error) => {
              console.log('reactNativeDemo axios error:', error);
              this.setState({ isHidden: false });

            });
  }

  render() {

            const {content,isHidden} = this.state;

    return (
        <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: '100%',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB', 
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
            <View style={{ width: '76%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SF-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Dealing with Difficult Situations</Text>
           
            </View>
            </View>
<ScrollView>
            <View style={{ flex: 1, marginTop: blockMarginHalf * 2}}>
    <Text style={{ color: '#202020',
      fontFamily: 'SF-Medium',
      fontSize: scalable(14),
      marginTop: blockMarginHalf * 3,
      marginLeft: blockMarginHalf * 3,
      lineHeight: deviceHeight / 20,}}>{content}</Text>
      
       </View>
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
                color="#0072bb"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
       </View>
       </View>

    );
  }
}

