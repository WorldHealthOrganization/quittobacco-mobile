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
        backgroundColor: '#FFFFFF',
      },
      containerToolbar: {
        justifyContent: 'center',
        // https://github.com/facebook/react-native/issues/2957#event-417214498
        alignItems: 'center',
        backgroundColor: '#0072BB',
      },
      toolbar: {
        backgroundColor: '#0072BB',
        height:responsiveHeight(7),
        width: responsiveWidth(100),
      },
      toolbar_title:{
        color: '#FFFFFF',
        fontFamily: 'SF Display',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
      },
   inputLayout: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(6),
    width: '90%',
},
textInput: {
  fontSize: responsiveFontSize(1.75),
  height: responsiveHeight(5.5),
  marginTop: responsiveHeight(0.5),
},
arrow: {
  width: responsiveWidth(2),
  height: responsiveHeight(4),
  marginLeft: responsiveWidth(-10),
  marginTop: responsiveHeight(1),
  resizeMode: 'contain',
},
});
