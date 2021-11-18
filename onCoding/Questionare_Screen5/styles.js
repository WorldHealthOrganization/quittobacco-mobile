/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { blockMargin } from '../ui/common/responsive';
export default StyleSheet.create({
    container: {
      flex:1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        flex:1,
        backgroundColor: '#FFFFFF',
      },
      view2: {
        flex:0.15,
        backgroundColor: '#FFFFFF',
        // marginTop: responsiveHeight(2),
        marginTop: blockMargin * 2,
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
        fontFamily: 'SF-Medium',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
        marginLeft: responsiveWidth(39),
        marginTop: responsiveHeight(1.75),
      },
      content: {
         marginLeft: responsiveWidth(6.5),
         color: '#B6C0CB',
         marginTop:responsiveHeight(1),
      },
      textStyle:{
        margin: responsiveWidth(6),
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
    },
    text_ques2:{
      textAlign: 'center',
      color: '#B6C0CB',
      fontFamily: 'SF-Regular',
      fontSize: responsiveFontSize(1.75),
      marginTop: responsiveHeight(0),
    },
  rowstyle:
  {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    padding:responsiveHeight(1),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(0.50),
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: responsiveHeight(0),
    marginLeft: responsiveHeight(7),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  submitbutton: {
    backgroundColor: '#0072BB',
  },
  submittext: {
    color: '#FFFFFF',
    fontFamily: 'SF-Medium',
    fontSize: responsiveFontSize(2),
  },
  arrow: {
    width: responsiveWidth(3),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1.5),
    resizeMode: 'contain',
  },
  img: {
    resizeMode:'contain',
    marginLeft: responsiveWidth(32),
  },
  cloud_img : {
  marginLeft: responsiveWidth(5),
  resizeMode:'contain',
  marginTop: responsiveHeight(1),
  // width: '75%',
  // height: '50%',
  // width: responsiveWidth(50),
  // height: responsiveHeight(100),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
  container2: {
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    opacity: 0.8,
  },
});
