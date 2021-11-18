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
      view1: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(15),
        marginRight: responsiveWidth(15),
        height: '100%',
      },
      view2: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(4.5),
        alignItems:'center',
        height: '100%',
      },
      view3: {
        borderBottomWidth: responsiveWidth(0.15),
        marginTop: responsiveHeight(0.5),
        borderBottomColor: '#B6C0CB',
      },
  change_text: {
    fontSize: responsiveFontSize(3.5),
    color: '#FFFFFF',
    marginTop: responsiveHeight(8),
    marginLeft: responsiveHeight(2),
    textAlign:'center',
    fontFamily: 'SF-Medium',
  },
  text:{
      marginTop: responsiveHeight(5),
      color: '#202020',
      fontSize: responsiveFontSize(1.5),
      fontFamily: 'SF Display',
      fontWeight: 'bold',
  },
  submitbutton: {
    backgroundColor: '#0072BB',
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0),
    marginLeft: responsiveHeight(0),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  buttontext: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  back_arrow: {
    width:responsiveWidth(3),
    height: responsiveHeight(3),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(3),
  },
  scrollview:
  {
    height: responsiveHeight(30),
  },
  textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
  },
  textBox:
  {
    fontSize: responsiveFontSize(2),
    paddingRight: responsiveWidth(3),
    paddingLeft: responsiveWidth(3),
    paddingVertical: 0,
    fontFamily: 'SF-Medium',

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
  box2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
