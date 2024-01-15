/* eslint-disable prettier/prettier */
import {StyleSheet,Platform} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        paddingBottom:Platform.OS == 'ios' ? 20 : 5
      },
      view: {
        backgroundColor: '#FFFFFF',
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
        alignSelf: 'center',
        marginLeft: responsiveWidth(37),
        marginTop: responsiveHeight(1),
      },
      content: {
        
         color: '#B6C0CB',
         marginLeft:blockMargin *2,
         marginRight: blockMargin *2,
         marginTop:responsiveHeight(1),
         fontFamily: 'SFCompactDisplay-Regular',
         fontSize:14, textAlign:'center'
      },
      textStyle:{
        margin: responsiveWidth(6),
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
    },
    pickerStyle:{
        height: responsiveHeight(4),
        width: responsiveWidth(90),
        color: '#344953',
        justifyContent: 'center',
        marginLeft: responsiveWidth(6.5),
        marginTop: responsiveHeight(1),
    },
    text_ques:{
     width:'90%',
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 16,
      marginBottom: 10,
      marginTop: 15,justifyContent:'center',alignSelf:'center'
    },
    text_ques1:{
      marginLeft: responsiveWidth(6),
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: responsiveFontSize(1.75),
      marginTop: responsiveHeight(2),
    },
    text_ques2:{
      width:'90%',
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: responsiveFontSize(1.75),
      marginTop: responsiveHeight(0),alignSelf:'center',justifyContent:'center'
    },
    text_ques3:{
      width:'90%',
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: 14,justifyContent:'center',alignSelf:'center',
      marginTop: responsiveHeight(2.75),
    },
    text_ques4:{
      marginLeft: responsiveWidth(8.5),
      color: '#B6C0CB',
      fontFamily: 'SFCompactDisplay-Regular',
      fontSize: responsiveFontSize(1.5),
      marginTop: responsiveHeight(2),
    },
    text:{
      color: '#202020',
      fontSize: responsiveFontSize(1.75),
      fontFamily: 'SFCompactDisplay-Regular',
      marginLeft: responsiveWidth(0),
      width: responsiveWidth(88),
      marginTop: responsiveHeight(0),
      marginBottom: responsiveHeight(1),

  },
  rowstyle:
  {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    width:'85%',
    paddingBottom:0,
    color:'black'
    
  },
  view3: {
    borderBottomWidth: responsiveWidth(0.45),
    marginTop: responsiveHeight(4),
    borderBottomColor: '#B6C0CB',
    width: '87%',
    marginLeft:responsiveWidth(9),
  },
  inputLayout: {
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1),
    marginHorizontal: responsiveWidth(8.5), 
    marginLeft: responsiveWidth(11.5),
    width: responsiveWidth(83),
    fontFamily: 'SFCompactDisplay-Medium',
    // height: responsiveHeight(7),
},
textInput: {
  fontSize: 14,
  marginTop: responsiveHeight(0),
  fontFamily: 'SFCompactDisplay-Medium',
 width:'90%',alignSelf:'center',justifyContent:'center',
  height:45,
  color:'black'
},
textInput2: {
  fontSize: 14,
  // height: responsiveHeight(5.5),
  marginTop: responsiveHeight(0),
  width:'90%',
  fontFamily: 'SFCompactDisplay-Medium',
  alignSelf:'center',justifyContent:'center',
  height:45,
  color:'black'
},
inputLayout1: {
  marginTop: responsiveHeight(1.0),
  // marginHorizontal: responsiveWidth(8.5), 
  marginLeft: responsiveWidth(8.5),
  // width: responsiveWidth(83.5),
  // height: responsiveHeight(7),
},
textInput1: {
fontSize: responsiveFontSize(1.50),
height: responsiveHeight(4),
marginTop: responsiveHeight(0.5),
fontFamily: 'SFCompactDisplay-Medium',
},
backarrow: {
  width: responsiveWidth(3),
  height: responsiveHeight(4),
  marginLeft: responsiveWidth(6),
  marginTop: responsiveHeight(1.5),
  resizeMode: 'contain',
},
arrow: {
  width: responsiveWidth(2),
  height: responsiveHeight(4),
  marginLeft: responsiveWidth(-8),
  marginTop: responsiveHeight(1.5),
  resizeMode: 'contain',
},
cal: {
  width: responsiveWidth(4),
  height: responsiveHeight(4),
  marginRight:blockMargin * 2,
  marginTop: responsiveHeight(1.5),
  resizeMode: 'contain',
},
view4: {
  borderBottomWidth: responsiveWidth(0.22),
  marginTop: responsiveHeight(0),
  borderBottomColor: '#B6C0CB',
  width: responsiveWidth(90),justifyContent:'center',alignSelf:'center'
 
},
view5: {
  borderBottomWidth: responsiveWidth(0.22),
  marginTop: responsiveHeight(0),
  borderBottomColor: '#B6C0CB',
  width: responsiveWidth(90),justifyContent:'center',alignSelf:'center'
 
},
view6: {
  borderBottomWidth: responsiveWidth(0.22),
  marginTop: responsiveHeight(0),
  borderBottomColor: '#B6C0CB',
  width: responsiveWidth(90),justifyContent:'center',alignSelf:'center'
},
view7: {
  borderBottomWidth: responsiveWidth(0.22),
  marginTop: responsiveHeight(0),
  borderBottomColor: '#B6C0CB',
  width: responsiveWidth(90),justifyContent:'center',alignSelf:'center',
  marginBottom:20,
},
pickerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor:'red'
},
pickerLabel: {
  fontSize: 18,
  marginRight: 10,
},
});
