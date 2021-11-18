/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
      flex:1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        backgroundColor: '#FFFFFF',
      },
      view2:
      {
         height:'10%',
         backgroundColor: '#0072BB',
         width: responsiveWidth(100),
      },
      text_prg:{
        color: '#FFFFFF',
        fontFamily: 'SF-Medium',
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(0.6),
        marginLeft: responsiveWidth(18),
        fontWeight: 'bold',
      },
      share_img2: {
        marginLeft: responsiveWidth(10),
        marginTop: responsiveHeight(1),
    },
    arrow:{
      width: responsiveWidth(3),
      height: responsiveHeight(4),
      marginLeft: responsiveWidth(5),
      marginTop: responsiveHeight(0.60),
      resizeMode: 'contain',
    },
    smoke_img:{
      height: responsiveHeight(20),
      marginLeft: responsiveWidth(5),
      marginTop: responsiveHeight(0.60),
      resizeMode: 'contain',
    },
    scrollView:{
      height:'90%',
    },
    text1:{
      fontFamily: 'SF-Medium',
      textAlign: 'center',
      fontSize: responsiveFontSize(2),
      lineHeight: responsiveHeight(3),
    
    },
    viewtext:{
     alignItems: 'center',
     backgroundColor: '#FFFFFF',
    },
   pulse:{
    color: '#0072BB',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
   },
    });
