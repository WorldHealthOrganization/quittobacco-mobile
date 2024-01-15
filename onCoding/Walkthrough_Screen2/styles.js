/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
  container: {
    flex: 1,flexDirection:'column',
    backgroundColor: '#0072BB',
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Semibold',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    
    textTransform: 'uppercase',
    lineHeight: responsiveHeight(3),
  },
  contentText: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Regular',
    fontSize: 12,
    textAlign: 'center',
    justifyContent:'center',alignSelf:'center'
    // marginLeft: responsiveWidth(3),
    // marginRight: responsiveWidth(20),
  },
  logo: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(15),
    marginRight: responsiveWidth(15),
    resizeMode: 'contain',
  },
  lungs_image: {
    width: responsiveWidth(53),
    height: responsiveHeight(35),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(15),
    marginLeft: responsiveWidth(15),
    alignItems: 'center',
    opacity: 100,
    resizeMode: 'contain',
  },
  textView: {
    
    
    marginTop: responsiveHeight(2),
   
    paddingBottom: responsiveHeight(2),
  },
  button_view:{
    flex:1,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
   },
   btn_style:{
    width: responsiveWidth(1),
   },
});
