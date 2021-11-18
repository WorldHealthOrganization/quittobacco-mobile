/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0072BB',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  textView: {
    flex: 1,
    height: responsiveHeight(75),
    width: responsiveWidth(95),
    paddingTop: responsiveHeight(2),
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'SF-Regular',
    fontWeight: 'normal',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(13),
    marginRight: responsiveWidth(14),
    resizeMode: 'contain',
  },
  button_view:{
   flex:1,
   marginTop: responsiveHeight(8),
  },
});
