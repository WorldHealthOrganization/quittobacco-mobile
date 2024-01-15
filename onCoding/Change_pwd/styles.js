/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { blockMargin, blockMarginHalf } from '../ui/common/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: responsiveHeight(3),
       
        width:'100%',
        height: '100%',
        justifyContent:'center',alignItems:'center'
      },
      view2: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: blockMargin * 4,
        marginBottom: blockMargin,
        alignItems:'center',
        height: '100%',
      },
      
      view3: {
        borderBottomWidth: responsiveWidth(0.30),
       
        borderBottomColor: '#B6C0CB',
        width: '100%',
        justifyContent:'center',alignSelf:'center',
        marginTop:responsiveWidth(2),
      },
  change_text: {
    fontSize: responsiveFontSize(3.5),
    color: '#FFFFFF',
    marginTop: responsiveHeight(8),
    marginLeft: responsiveHeight(2),
    textAlign:'center',
    fontFamily: 'SFCompactDisplay-Medium',
  },
  text:{
   
      color: '#B6C0CB',
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    marginLeft: responsiveWidth(0),
    marginBottom: 5,
    fontFamily: 'SFCompactDisplay-Regular',
  },
  submitbutton: {
    backgroundColor: '#0072BB',
  },
  buttonContainer: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0),
    marginLeft: responsiveHeight(0),
    width: responsiveWidth(70),
    borderRadius: 30,
  },
  buttontext: {
    color: '#FFFFFF',
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: responsiveFontSize(2),
  },
  back_arrow: {
    width:responsiveWidth(3),
    height: responsiveHeight(3),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
  },
  scrollview:
  {
    height: responsiveHeight(30),
  },
  textBoxBtnHolder:
  {
    width:'90%',
    justifyContent: 'center',
    marginTop: responsiveHeight(1.5),
  },
  textBox:
  {
    width:'95%',
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: responsiveFontSize(2),
    height:45, fontSize:16
  },

  visibilityBtn:
  {
    position: 'absolute',
    right: responsiveWidth(2),
    height: responsiveHeight(3),
    width: responsiveWidth(6.5),
    padding: '5%',
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  box2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
