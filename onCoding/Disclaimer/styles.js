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
        height: '100%',
        width: '100%',
      },
      view: {
        flex:1,
        flexDirection:'column',width:'100%',
        backgroundColor: '#FFFFFF',
        height: '100%',
      },
      view2: {
       marginBottom: blockMargin * 2,justifyContent:'center',alignSelf:'center',alignItems:'center',
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(2),
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
        marginLeft: responsiveWidth(37),
        marginTop: responsiveHeight(1.75),
      },
    text:{
      
      marginRight: responsiveWidth(3),
      marginLeft: responsiveWidth(3),
     
    },
  buttonContainer: {
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
  },
  arrow: {
    width: responsiveWidth(3),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1.5),
    resizeMode: 'contain',
  },
});
