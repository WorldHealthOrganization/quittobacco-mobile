/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity,ActivityIndicator,ScrollView, SafeAreaView} from 'react-native';
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

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Navigation from '../Navigation/Navigation';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

export default class Terms_And_Conditions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
    };
  }

  componentDidMount = () => {

    this.terms();
  };

  terms= async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    this.setState({ isHidden: true })
          axios
            .post(
              ApiName.terms_conditions,{ },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
             
              this.setState({ isHidden: false })

              if (response.data.status == 200) {
              
                this.setState({content: response.data.data.description});
               
              }
            })
            .catch((error) => {
             
              Toast.show('There was some error. Please try again')
              this.setState({ isHidden: false })

            });
  }

  render() {

            const {content,isHidden} = this.state;

    return (
      <SafeAreaView style={{flex: 1,}}>
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
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Terms & Conditions</Text>
           
            </View>
            </View>
<ScrollView>
            <View style={{ flex: 1, marginTop: blockMarginHalf * 2}}>
    {/* <Text style={{ color: '#202020',
      fontFamily: 'SFCompactDisplay-Medium',
      fontSize: scalable(14),
      marginTop: blockMarginHalf * 3,
      marginLeft: blockMarginHalf * 3,
      lineHeight: deviceHeight / 20,}}>{content}</Text> */}
      <HTMLView
   style={{ 
   marginTop: blockMargin,
   marginLeft: blockMarginHalf * 2,
   marginRight: blockMarginHalf * 1,
   }}
   value={content}
   stylesheet={styless}
              />
      
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
</SafeAreaView>
    );
  }
}
const styless = StyleSheet.create({
  p: {
    color: '#000000',
    //fontFamily: 'SFCompactDisplay-Medium',
    fontSize: 14,
    lineHeight: 20
  },
});
