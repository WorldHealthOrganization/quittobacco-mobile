/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text,Image,TouchableOpacity,ActivityIndicator,ScrollView, SafeAreaView, Dimensions} from 'react-native';
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

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Navigation from '../Navigation/Navigation';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import ImageViewer from 'react-native-image-zoom-viewer';
import { tr } from 'date-fns/locale';
const {width, height} = Dimensions.get('window')

export default class Tobacco_Diseases extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
    };
  }

  componentDidMount = () => {

    this.infection();
  };

  onZoom=event=>{
    const {
        deviceHeight,
        deviceWidth,
        contentWidth,
        contentHeight,
        zoomScale 
    }=event;
}

  infection= async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    this.setState({ isHidden: true })

          axios
            .post(
              ApiName.tobacco_infection,{ },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
            
              this.setState({ isHidden: false });

              if (response.data.status == 200) {
                this.setState({content: response.data.data.content});
               
              }
            })
            .catch((error) => {
              Toast.show('There was some error. Please try again')
             
              this.setState({ isHidden: false });

            });
  }
  pinZoomLayoutRef=React.createRef();


  render() {

            const {content,isHidden} = this.state;

    return (
      <SafeAreaView style={{flex: 1,}}>
        <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', width
            : '100%', height: '12%',
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

              }}>Harmful Effects of Tobacco</Text>
           
            </View>
            </View>
            <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
      <ImageViewer
        footerContainerStyle={{bottom:150, position:'absolute'}}
        backgroundColor={'#EEEEEE'}
        height={200}
        index={0}
        imageUrls={[{url: ApiName.baseLink+'110340Image%205@2x.png',}]}>
      </ImageViewer>
       </View>
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

