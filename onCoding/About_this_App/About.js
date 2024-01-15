/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Linking, SafeAreaView, ScrollView } from 'react-native';
import styles from '../About_this_App/styles';
//import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';
import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Feedback from '../Feedback';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Rate, { AndroidMarket } from 'react-native-rate';


const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      rated: false,

    };
  }


  componentDidMount = () => {

    // this.about();
  };

  openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `market://details?id=${GOOGLE_PACKAGE_NAME}`,
      ).catch(
        (err) => console.log('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => console.log('Please check for the App Store'));
    }
  };

  render() {
    const { content } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, }}>
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
              <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>

                <TouchableOpacity style={{

                  alignItems: 'center',
                }} onPress={() => this.props.navigation.goBack()}>

                  <Image style={{
                    width: responsiveWidth(3),
                    height: responsiveHeight(4),
                    resizeMode: 'contain',
                  }} source={require('../../images/back_arrow.png')} />

                </TouchableOpacity>

              </View>
              <View style={{ width: '60%', height: responsiveHeight(10), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: 'SFCompactDisplay-Medium',
                  fontSize: scalable(18),

                  textAlign: 'center',

                }}>About This App</Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',


                  alignSelf: 'center',
                  borderRadius: 30,
                  backgroundColor: '#CBE2F1',
                }}
                onPress={() => this.props.navigation.navigate('Feedback')}>
                <Text style={styles.submittext}>Feedback</Text>
              </TouchableOpacity>
            </View>


            <ScrollView>
              <View style={{ marginTop: blockMarginHalf * 1 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Cravings')}>
                  <Text style={styles.text}>Dealing with cravings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tobacco_Diseases')}>
                  <Text style={styles.text}>Harmful Effects of Tobacco</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Benefits')}>
                  <Text style={styles.text}>Benefits of Quitting Tobacco</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Privacy_Policy')}>
                  <Text style={styles.text}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Terms_And_Conditions')}>

                  <Text style={styles.text}>Terms and Conditions</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('References')}>
<Text style={styles.text}>References</Text>
</TouchableOpacity> */}




                <TouchableOpacity
                  onPress={() => {
                    const options = {
                      AppleAppID: '1538124537',
                      GooglePackageName: 'com.who.quit.tobacco',
                      AmazonPackageName: 'com.who.quit.tobacco',

                      preferredAndroidMarket: AndroidMarket.Google,
                      preferInApp: false,
                      openAppStoreIfInAppFails: true,
                      fallbackPlatformURL: 'https://www.who.int/',
                    };
                    Rate.rate(options, success => {
                      if (success) {
                        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                        this.setState({ rated: true });
                      }
                    });
                  }}>

                  <View
                    style={{
                      flexDirection: 'row',
                      //   marginLeft: responsiveWidth(32),
                      //   marginTop: responsiveHeight(5),
                    }}>
                    <Text style={styles.text2}>Rate this app</Text>



                    <Image style={styles.img2} source={require('../../images/next_arrow_blue.png')} />
                  </View>
                </TouchableOpacity>



              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

