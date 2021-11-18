/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
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
        marginTop: responsiveHeight(1),
        width: '100%',
        height: '29%',
      },
      back_arrow: {
        width:responsiveWidth(3),
        height: responsiveHeight(3),
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(3),
      },
      text: {
        marginTop: responsiveHeight(1),
        marginRight: responsiveWidth(3),
        marginLeft: responsiveWidth(3),
      },
      mid_text: {
        color: '#DF9436',
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        marginTop: responsiveHeight(2),
        marginRight: responsiveWidth(3),
        marginLeft: responsiveWidth(3),
        fontFamily: 'SF-Medium',
        lineHeight: responsiveWidth(8),
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      end_text: {
        color: '#202020',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        marginTop: responsiveHeight(2),
        marginRight: responsiveWidth(3),
        marginLeft: responsiveWidth(3),
        fontFamily: 'SF-Regular',
      },
      buttonContainer: {
        height: responsiveHeight(6.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(16),
        marginLeft: responsiveHeight(0),
        width: responsiveWidth(70),
        borderRadius: 30,
      },
      contbutton: {
        backgroundColor: '#0072BB',
      },
      view2: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
      },
      conttext: {
        color: '#FFFFFF',
        fontFamily: 'SF-Medium',
        fontSize: responsiveFontSize(2),
      },
});
