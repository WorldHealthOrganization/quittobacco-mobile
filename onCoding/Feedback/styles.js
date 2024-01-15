/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
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
} from '../ui/common/responsive';
export default StyleSheet.create({
    text: {
      fontFamily: 'SFCompactDisplay-Medium',
      color: '#202020',
      fontSize: scalable(16),
      textAlign: 'center',
      marginTop: blockMarginHalf * 2,
    },
    view1: {
       
        backgroundColor: '#FFFFFF',
        marginTop: blockMarginHalf * 2,
        alignSelf: 'center',
        width: '80%',
      },
      text2:{
        color: '#202020',
        fontSize: scalable(14),
        fontFamily: 'SFCompactDisplay-Regular',
        width: '100%',
        height:45,
        marginTop:blockMargin
    },
});
