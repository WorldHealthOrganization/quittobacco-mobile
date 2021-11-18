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
      fontFamily: 'SF-Medium',
      color: '#202020',
      fontSize: scalable(16),
      textAlign: 'center',
      lineHeight: deviceHeight / 30,
      marginTop: blockMarginHalf * 2,
    },
    view1: {
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        marginTop: blockMarginHalf * 2,
        alignSelf: 'center',
        width: '80%',
      },
      text2:{
        color: '#202020',
        fontSize: scalable(12),
        fontFamily: 'SF-Regular',
        fontWeight: 'bold',
        width: '100%',
    },
});
