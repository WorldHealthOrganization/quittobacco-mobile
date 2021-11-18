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
        flex:1,
        backgroundColor: '#FFFFFF',
        height: '100%',
      },
      view1: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(1),
        marginLeft: responsiveWidth(10),
        width: '80%',
        height: '100%',
      },
      view2: {
        flex: 0.60,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        marginTop: responsiveHeight(0),
      },
      view3: {
        borderBottomWidth: responsiveWidth(0.30),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: '98%',
        marginLeft:responsiveWidth(1.20),
      },
      scrollview:
      {
        flex: 0.75,
        backgroundColor: '#FFFFFF',
      },
  create_text: {
    fontSize: responsiveFontSize(3.5),
    color: '#FFFFFF',
    marginTop: responsiveHeight(8.5),
    marginLeft: responsiveHeight(2),
    textAlign:'center',
    fontFamily: 'SF-Medium',

  },
  text:{
      color: '#202020',
      fontSize: responsiveFontSize(1.65),
      fontFamily: 'SF-Medium',
      width: '100%',
  },
  text_email:{
    color: '#202020',
    fontSize: responsiveFontSize(1.65),
    marginTop: responsiveHeight(1),
    fontFamily: 'SF-Medium',
    width: '100%',
    
},
  loginButton: {
    backgroundColor: '#0072BB',
  },
  signuptext: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: responsiveHeight(0),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  register_user: {
    color: '#949494',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveHeight(0),
  },
  login: {
    color: '#0072BB',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(3),
  },
  back_arrow: {
    width:responsiveWidth(3),
    height: responsiveHeight(3),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(3),
  },
  textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
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
    width: responsiveWidth(100),
    marginTop: responsiveHeight(0.69),
    marginLeft: responsiveWidth(0),
    fontSize: responsiveFontSize(1.65),
    // paddingStart: 20,
    // marginStart: responsiveWidth(0),
    // marginEnd: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'SF-Medium',
    borderRadius: 15,
  },
  arrow: {
    width: responsiveWidth(2),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(0),
    resizeMode: 'contain',
  },
  view4: {
    borderBottomWidth: responsiveWidth(0.25),
    marginTop: responsiveHeight(0),
    borderBottomColor: '#B6C0CB',
    width: responsiveWidth(78.5),
    marginLeft:responsiveWidth(1),
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
