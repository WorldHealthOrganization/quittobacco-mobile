/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
export default StyleSheet.create({
    container: {
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
        marginTop: responsiveHeight(15),
      },
      containerToolbar: {
        justifyContent: 'center',
        // https://github.com/facebook/react-native/issues/2957#event-417214498
        alignItems: 'center',
        backgroundColor: '#0072BB',
      },
      toolbar: {
        backgroundColor: '#0072BB',
        height:responsiveHeight(9),
        width: responsiveWidth(100),
      },
      toolbar_title:{
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
        marginLeft: responsiveWidth(16),
        marginTop: responsiveHeight(1.75),
      },
    text:{
      color: '#202020',
      fontFamily: 'SFCompactDisplay-Medium',
      fontSize: responsiveFontSize(2.25),
      marginTop: blockMarginHalf * 3,
      marginLeft: blockMarginHalf * 3,
      lineHeight: deviceHeight / 20,
      // marginRight: responsiveWidth(3),
    },
    text2:{
        color: '#0072BB',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.25),
        marginTop: blockMarginHalf * 3,
        marginLeft: blockMarginHalf * 3,
        lineHeight: deviceHeight / 20,
        // marginRight: responsiveWidth(3),

        width:'80%',
      },
      buttonContainer: {
        height: responsiveHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(1.75),
        marginLeft: responsiveHeight(5),
        marginRight: responsiveWidth(4),
        width: responsiveWidth(28),
        borderRadius: 30,
      },
  submitbutton: {
    backgroundColor: '#CBE2F1',
  },
  submittext: {
    color: '#0072BB',
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: scalable(13),marginTop:blockMarginHalf/2,marginBottom:blockMarginHalf/2,marginLeft: blockMargin,marginRight: blockMargin
    
  },

  img: {
    resizeMode: 'contain',
    marginLeft: responsiveWidth(44.53),
    marginTop: responsiveHeight(5),
  },
  img1: {
    resizeMode: 'contain',
    marginLeft: responsiveWidth(35.5),
    marginTop: responsiveHeight(5),
  },
  img2: {
    resizeMode: 'contain',
    marginTop: responsiveHeight(4),
    alignItems:'flex-end',
    width:18,
    height:18,
  },
  img3: {
    resizeMode: 'contain',
    marginLeft: responsiveWidth(29),
    marginTop: responsiveHeight(5),
  },
  arrow: {
    width: responsiveWidth(3),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1.5),
    resizeMode: 'contain',
  },
});
