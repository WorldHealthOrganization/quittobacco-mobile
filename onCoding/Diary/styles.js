/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { blockMarginHalf, scalable } from '../ui/common/responsive';

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
  view2: {
    backgroundColor: '#0072BB',
    width: responsiveWidth(100),
  },
  view3: {
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(1),
  },
  text_prg: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(25),
  },
  share_img2: {
    marginLeft: responsiveWidth(28),
    marginTop: responsiveHeight(1),
  },
  arrow: {
    width: responsiveWidth(3),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.75),
    resizeMode: 'contain',
  },
  content: {
    marginLeft: responsiveWidth(6.5),
    color: '#B6C0CB',
    marginTop: responsiveHeight(1),
    fontFamily: 'SF-Regular',
  },
  text: {
    marginTop: responsiveHeight(2),
    fontFamily: 'SF-Medium',
    marginLeft: responsiveWidth(7),
  },
  text1: {
    marginTop: responsiveHeight(0.5),
    fontFamily: 'SF-Regular',
    marginLeft: responsiveWidth(7),
    color: '#B6C0CB',
  },
  view4: {
    borderBottomWidth: responsiveWidth(0.22),
    marginTop: responsiveHeight(0),
    borderBottomColor: '#B6C0CB',
    width: responsiveWidth(85),
    marginLeft: responsiveWidth(7),
  },
  view5: {
    borderBottomWidth: responsiveWidth(0.22),
    marginTop: responsiveHeight(2),
    borderBottomColor: '#B6C0CB',
    width: responsiveWidth(85),
    marginLeft: responsiveWidth(7),
  },
  buttonContainer: {
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
    marginLeft: responsiveHeight(-30),
    width: responsiveWidth(28),
    borderRadius: 35,
  },
  button: {
    backgroundColor: '#0072BB',
  },
  button1: {
    backgroundColor: '#CBE2F1',
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  input: {
    marginTop: responsiveHeight(0),
    width: responsiveWidth(88),
    marginLeft: responsiveWidth(7),
    textAlignVertical: 'top'
  },
  buttonContainer1: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
    marginLeft: responsiveHeight(7),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#0072BB',
  },
  loginText: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  snapsliderContainer: {
    width: '85%',
    marginTop: blockMarginHalf *1.5,
    marginBottom:blockMarginHalf *1.5,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 0,
  },
  snapslider: {
    borderWidth: 0,
  },
  snapsliderItemWrapper: {
    borderWidth: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  snapsliderItem: {
    fontFamily: 'SF-Medium',
    fontSize: scalable(12),
    color:'#0072BB',
    borderWidth: 0,
  }
});
