/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { blockMarginHalf } from '../ui/common/responsive';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  view: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  view1: {
    flex: 0.38,
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(1.5),
    marginLeft: responsiveWidth(5),
    width: responsiveWidth(90),
    height: '100%',
  },
  view2: {
    flex: 0.6,
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(1),
    alignItems:'center',
    // height: '100%',
  },
  view3: {
    borderBottomWidth: responsiveWidth(0.45),
    marginTop: responsiveHeight(0.5),
    borderBottomColor: '#B6C0CB',
    width: '100%',
    marginLeft:responsiveWidth(0),
  },
  scrollview:
  {
    flex: 0.75,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(8.5),
    marginLeft: responsiveWidth(1.75),
    resizeMode: 'contain',
  },
  logo_view: {
    width: '100%',
  
  alignSelf:'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:blockMarginHalf
   
  },
  text: {
    color: '#B6C0CB',
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    marginLeft: responsiveWidth(0),
    fontFamily: 'SF-Regular',
  },
  phonenumber: {
    height: responsiveHeight(5),
    borderColor: 'gray',
    borderBottomWidth: responsiveWidth(0.25),
  },
  forgotpwd: {
    color: '#0072BB',
    fontSize: responsiveFontSize(2),
    textAlign: 'right',
    marginTop: responsiveHeight(1),
    fontFamily: 'SF-Medium',
    marginLeft: responsiveWidth(50),
  },
  login: {
    color: '#202020',
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'SF-Regular',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(43),
  },
  fb_logo: {
    width: 30,
    height: 30,
    marginRight: blockMarginHalf,
    resizeMode: 'contain',
  },
  gplus_logo: {
    width: 30,
    height: 30,
    marginRight: blockMarginHalf,
    resizeMode: 'contain',
  },
  apple_logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
    marginLeft: responsiveHeight(2),
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
  newuser: {
    color: '#949494',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  signup: {
    color: '#0072BB',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(3),
  },
  textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  textBox:
  {
    fontSize: responsiveFontSize(2),
    paddingRight: responsiveWidth(3),
    paddingLeft: responsiveWidth(3),
    paddingVertical: 0,
  },
  visibilityBtn:
  {
    position: 'absolute',
    right: responsiveWidth(2),
    height: responsiveHeight(3),
    width: responsiveWidth(6.5),
    padding: '5%',
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  titleText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#303030',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
  textBackground3: {
    flex: 0.25,
    flexDirection: 'row',
    height: responsiveHeight(5),
    width:responsiveWidth(1),
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginStart: responsiveWidth(1),
    marginTop: responsiveHeight(1),
    marginEnd: responsiveWidth(5),
  },
  textBackground4: {
    height: responsiveHeight(7),
    // width: responsiveWidth(100),
    marginTop: 0,
    marginLeft: responsiveWidth(0),
    // paddingStart: 20,
    // marginStart: responsiveWidth(0),
    // marginEnd: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'SF Display',
    borderRadius: 15,
  },
  view4: {
    borderBottomWidth: responsiveWidth(0.45),
    marginTop: responsiveHeight(0),
    borderBottomColor: '#B6C0CB',
    width: '100%',
    marginLeft:responsiveWidth(0),
  },
  arrow: {
    width: responsiveWidth(2),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(0),
    resizeMode: 'contain',
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
