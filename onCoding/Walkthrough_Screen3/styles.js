/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { blockMarginHalf,blockMargin } from '../ui/common/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0072BB',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Semibold',
    fontSize: responsiveFontSize(2),
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingTop: responsiveHeight(2),
    marginLeft: responsiveWidth(6),
    marginRight: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(14),
    marginRight: responsiveWidth(15),
    resizeMode: 'contain',
  },
  rectangle: {
    width:responsiveWidth(22),
    height: responsiveHeight(11),
    backgroundColor: '#FFFFFF',
    opacity: 100,

    marginLeft: responsiveWidth(5),
    marginRight: responsiveWidth(5),
  },
  smoker_img: {
    width: responsiveWidth(15),
    height: responsiveHeight(9),
    marginLeft: responsiveWidth(4),
    marginRight: responsiveWidth(4),
    marginTop: responsiveHeight(1),
    resizeMode: 'contain',
    },
  cigarette_img: {
    width:responsiveWidth(19),
    height: responsiveHeight(7),
    marginLeft: responsiveWidth(2),
    marginTop:responsiveHeight(1),
    resizeMode: 'contain',
    },
  calendar_img: {
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(0),
    resizeMode: 'contain',
  },
  agenda_img: {
    width: responsiveWidth(15),
    height: responsiveHeight(8),
    marginLeft: responsiveWidth(3),
    marginRight: 13,
    marginTop: responsiveHeight(1.5),
    resizeMode: 'contain',
    },
    arrow_img: {
      width: responsiveWidth(17),
      height: responsiveHeight(11),
      marginTop: responsiveHeight(0),
      marginLeft: responsiveWidth(3),
     resizeMode: 'contain',
      },
  textcontent: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Semibold',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'left',
    
    marginLeft: responsiveWidth(6),
    marginRight: responsiveWidth(10),
  },
  textcontent1: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Regular',
    fontWeight: 'normal',
    fontSize: 12,
    textAlign: 'left',
    marginTop: blockMarginHalf,
    marginLeft: responsiveWidth(6),
  },
  view: {
    
    flexDirection:'row',
    marginTop:blockMarginHalf * 2
  },
  view1: {
    backgroundColor: '#0072BB',
    flexDirection:'row',
    marginRight:responsiveWidth(22),marginTop: blockMargin,
  },
  button_view:{
    flex:1,
    marginTop: responsiveHeight(2),
     },
});
