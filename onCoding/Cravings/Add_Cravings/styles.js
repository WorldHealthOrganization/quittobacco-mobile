/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {
    scalable,
    deviceWidth,
    deviceHeight,
    itemRadius,
    itemRadiusHalf,
    blockMarginHalf,
    blockMargin,
    blockPadding,
    blockPaddingHalf,
  } from '../../ui/common/responsive';

export default StyleSheet.create({
    text: {
      marginTop: blockMarginHalf * 2,
        fontFamily: 'SF-Medium',
      },
      arrow: {
        width: 10,
        height: 8,
        marginTop: blockMarginHalf * 2,
        alignSelf:'center',
        resizeMode: 'contain',
      },
      view4: {
        borderBottomWidth: 1,
        marginTop: 0,
        borderBottomColor: '#B6C0CB',
        width: '100%',
      
      },
      snapsliderContainer: {
        width: '100%',
        marginTop: blockMarginHalf ,
        marginLeft: - blockMarginHalf,
        justifyContent:'flex-start',
        borderWidth: 0,
      },
      snapslider: {
        borderWidth: 0,
        width:'100%',
      
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
