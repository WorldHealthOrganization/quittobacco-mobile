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
  text: {
    color: '#E8FF00',
    fontFamily: 'SF-Semibold',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(25),
    marginRight: responsiveWidth(24),
    textTransform: 'uppercase',
    lineHeight: responsiveHeight(3),
  },
  contentText: {
    color: '#FFFFFF',
    fontFamily: 'SF-Regular',
    fontSize: responsiveFontSize(1.62),
    textAlign: 'center',
    // marginLeft: responsiveWidth(3),
    // marginRight: responsiveWidth(20),
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(15),
    marginRight: responsiveWidth(15),
    resizeMode: 'contain',
  },
  lungs_image: {
    width: responsiveWidth(53),
    height: responsiveHeight(35),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(15),
    marginLeft: responsiveWidth(15),
    alignItems: 'center',
    opacity: 100,
    resizeMode: 'contain',
  },
  textView: {
    height: responsiveHeight(35),
    width: responsiveHeight(50),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
    paddingBottom: responsiveHeight(2),
  },
  button_view:{
    flex:1,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
   },
   btn_style:{
    width: responsiveWidth(1),
   },
});
