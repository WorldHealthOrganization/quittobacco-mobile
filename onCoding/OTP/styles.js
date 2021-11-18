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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  view: {
    backgroundColor: '#FFFFFF',
  },
  OTP_text: {
    fontSize: responsiveFontSize(3.5),
    color: '#FFFFFF',
    marginTop: responsiveHeight(9),
    marginLeft: responsiveWidth(2),
    textAlign:'center',
    fontFamily: 'SF-Medium',

  },
  back_arrow: {
    width:responsiveWidth(3),
    height: responsiveHeight(3),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(3),
  },
  view1: {
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(4),
  },
  text: {
    color: '#B6C0CB',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(3),
    marginLeft: responsiveWidth(3),
    fontFamily: 'SF-regular',
  },
  text_phnno: {
    color: '#202020',
    fontWeight: 'bold',
  },
  view2: {
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(3),
    alignItems:'center',
  },
  underlineStyleBase: {
    width: responsiveWidth(10),
    height: responsiveHeight(6),
    borderWidth:responsiveWidth(0),
    borderBottomWidth: responsiveWidth(0.30),
    color: '#202020',
  },
  underlineStyleHighLighted: {
    borderColor: '#949494',
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(16),
    marginLeft: responsiveHeight(0),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  confirmbutton: {
    backgroundColor: '#0072BB',
  },
  confirmtext: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  OTP_text1: {
    color: '#949494',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(8),
  },
  OTP_Resend: {
    color: '#0072BB',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
    fontWeight: 'bold',
  },
  box2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
