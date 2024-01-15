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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        flex:1,
        backgroundColor: '#FFFFFF',
      },
      toolbar: {
        backgroundColor: '#0072BB',
        height:responsiveHeight(8),
        width: responsiveWidth(100),
      },
      toolbar_title:{
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
        height:responsiveHeight(10),
        marginLeft: responsiveWidth(35.5),
        marginTop: responsiveHeight(1.75),
      },
      switch: {
        marginTop: responsiveHeight(4.5),
        alignItems:'flex-end',

      },
      img: {
        resizeMode: 'contain',
        marginTop: responsiveHeight(4.5),
        alignItems:'flex-end',
        width: 18,
        height: 18
      },
      text: {
        color: '#202020',
        fontSize:responsiveFontSize(2.10),
        fontFamily: 'SFCompactDisplay-Medium',
        marginTop: responsiveHeight(4.5),
        marginLeft: responsiveWidth(5),
        width: '100%',
      },
      trackOnStyle: {
         color: 'red',
      },
      text2: {
        color: '#202020',
        fontSize:responsiveFontSize(2),
        fontFamily: 'SFCompactDisplay-Regular',
        marginTop: responsiveHeight(4.5),
        marginLeft: responsiveWidth(5),
      },
      arrow: {
        width: responsiveWidth(3),
        height: responsiveHeight(4),
        marginLeft: responsiveWidth(6),
        marginTop: responsiveHeight(1.5),
        resizeMode: 'contain',
      }, buttonContainer: {
        height: responsiveHeight(6.5),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: responsiveHeight(0),
       
        width: responsiveWidth(60),
        borderRadius: 30,
      },
      submitbutton: {
        backgroundColor: '#0072BB',
      },
      submittext: {
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2),
      }, view2: {
        justifyContent:'center',alignItems:'center',alignSelf:'center',
         backgroundColor: '#FFFFFF',
         // marginTop: responsiveHeight(2),
         marginTop: blockMargin * 2,
         marginBottom: blockMargin*2
       },
    });
