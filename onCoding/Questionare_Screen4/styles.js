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
        height:'100%',
        width: '100%'
      },
      view: {
        flex:1,
        width:'100%',
        backgroundColor: '#FFFFFF',
      },
      view1: {
        flex:1,
        backgroundColor: '#FFFFFF',marginTop: blockMargin
      },
      view2: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(0),
        alignItems:'center',
      },
      view3:{
       marginBottom:blockMargin *2,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor: '#FFFFFF',alignSelf:'center',alignItems:'center',justifyContent:'center'
      },
      view4: {
        borderBottomWidth: responsiveWidth(0.22),
        marginTop: responsiveHeight(0),
        borderBottomColor: '#B6C0CB',
        width: responsiveWidth(90),justifyContent:'center',alignSelf:'center'
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
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.5),
        alignContent: 'center',
        marginLeft: responsiveWidth(37.5),
        marginTop: responsiveHeight(1.75),
      },
      content: {
         width:'90%',
         color: '#B6C0CB',
         marginTop:responsiveHeight(1),
         fontFamily: 'SFCompactDisplay-Semibold',alignSelf:'center',justifyContent:'center',marginBottom:7
      },
      textStyle:{
        margin: responsiveWidth(6),
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
    },
  rowstyle:
  {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  
    width: responsiveWidth(60),
    borderRadius: 30,
  },
  contbutton: {
    backgroundColor: '#0072BB',
  },
  nexttext: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: responsiveFontSize(2),
  },
  pickerStyle1:{
    height: responsiveHeight(4),
    width: responsiveWidth(23),
    color: '#202020',
    marginLeft: responsiveWidth(6.5),
    marginTop: responsiveHeight(2),
    justifyContent: 'flex-start',
},
pickerStyle2:{
  height: responsiveHeight(4),
  width: responsiveWidth(32),
  color: '#202020',
  marginLeft: responsiveWidth(3),
  marginTop: responsiveHeight(2),
  justifyContent: 'flex-start',
},
pickerStyle3:{
  height: responsiveHeight(4),
  width: responsiveWidth(25),
  color: '#202020',
  marginLeft: responsiveWidth(3),
  marginTop: responsiveHeight(2),
  justifyContent: 'flex-start',
},
arrow: {
  width: responsiveWidth(3),
  height: responsiveHeight(4),
  marginLeft: responsiveWidth(6),
  marginTop: responsiveHeight(1.5),
  resizeMode: 'contain',
},
});
