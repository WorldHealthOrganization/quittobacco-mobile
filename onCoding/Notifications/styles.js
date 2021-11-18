/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        flex:1,
        backgroundColor: '#FFFFFF',
      },
      toolbar: {
        backgroundColor: '#0072BB',
        height:responsiveHeight(8),
        width: responsiveWidth(100),
      },
      toolbar_title:{
        color: '#FFFFFF',
        fontFamily: 'SF-Medium',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
        height:responsiveHeight(10),
        marginLeft: responsiveWidth(35.5),
        marginTop: responsiveHeight(1.75),
      },
      switch: {
        marginLeft: responsiveWidth(5),
        marginTop: responsiveHeight(4.5),
      },
      text: {
        color: '#202020',
        fontSize:responsiveFontSize(2.10),
        fontFamily: 'SF-Medium',
        marginTop: responsiveHeight(4.5),
        marginLeft: responsiveWidth(5),
      },
      trackOnStyle: {
         color: 'red',
      },
      text2: {
        color: '#202020',
        fontSize:responsiveFontSize(2),
        fontFamily: 'SF-Regular',
        marginTop: responsiveHeight(4.5),
        marginLeft: responsiveWidth(5),
      },
      arrow: {
        width: responsiveWidth(3),
        height: responsiveHeight(4),
        marginLeft: responsiveWidth(6),
        marginTop: responsiveHeight(1.5),
        resizeMode: 'contain',
      },
    });
