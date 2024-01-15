/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    backgroundColor: '#0072BB',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  text: {
    color: '#E8FF00',
    fontFamily: 'SFCompactDisplay-Semibold',
    fontSize: responsiveFontSize(2.5),
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingTop: responsiveHeight(10),
    marginLeft: responsiveWidth(5),
    marginRight: responsiveWidth(5),
    lineHeight: 28,
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(8),
    marginLeft: responsiveWidth(15),
    marginRight: responsiveWidth(15),
    resizeMode: 'contain',
  },
  logo_ITU: {
    width: responsiveWidth(42),
    height: responsiveHeight(26),
    marginTop: responsiveHeight(8),
    marginLeft: responsiveWidth(5),
    marginRight: responsiveWidth(5),
    resizeMode: 'contain',
  },
  text_small: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Medium',
    fontWeight: 'normal',
    fontSize: responsiveFontSize(2),
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: responsiveHeight(5),
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3071B5'
  },
});
