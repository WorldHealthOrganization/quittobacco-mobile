/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';


import { blockMargin, blockMarginHalf, scalable } from '../ui/common/responsive';
export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  view: {
      flex:1,width:'100%',
    backgroundColor: '#FFFFFF',flexDirection:'column'
  },
  view1: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
    marginTop: blockMarginHalf,
    // marginLeft: responsiveWidth(8),
    alignSelf: 'center',
    width: responsiveWidth(80),
  },
      view2:
      {
        //  flex:0.7,
         backgroundColor: '#0072BB',
         width: responsiveWidth(100),
      },
      view3:
      {
         flex:0.7,
         backgroundColor: '#0072BB',
         marginTop: responsiveHeight(35),
         height: '100%',
         width: responsiveWidth(80),

        //  marginLeft: responsiveWidth(30),
      },
      scrollview:
      {
        backgroundColor: '#FFFFFF',
      },
      text_prg:{
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(1),
        marginLeft: responsiveWidth(30),
        fontWeight: 'bold',
      },
      share_img2: {
        marginLeft: responsiveWidth(24),
        marginTop: responsiveHeight(1),
    },
    arrow:{
      width: responsiveWidth(3),
      height: responsiveHeight(4),
      marginLeft: responsiveWidth(6),
      marginTop: responsiveHeight(1.5),
      resizeMode: 'contain',
   
    },
    fab:{
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    borderRadius:100 / 2,
    borderStyle:'dotted',
    position: 'absolute',
    bottom: responsiveHeight(10),
    // right: responsiveWidth(5),
    marginLeft: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0072BB',
    borderWidth: 2,
    borderColor: '#CBE2F1',
  },
  text_fab:{
    fontSize:responsiveFontSize(4),
    color:'white',
    marginTop: responsiveHeight(0),
  },
  
  square:{
    height: responsiveHeight(22),
    width: '80%',
    borderRadius:100/2,
    borderStyle:'dashed',
    marginBottom:30,
    // right: responsiveWidth(5),
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0072BB',
    borderWidth: 2,
    borderColor: '#CBE2F1',
    marginTop:15
  },
  square2:{
    height: responsiveHeight(22),
    width: responsiveWidth(100),
   
   
    // bottom: responsiveHeight(0),
    
    // right: responsiveWidth(5),
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0072BB',
    borderWidth: 0,
    borderColor: '#CBE2F1',
  },
  text: {
    marginTop: blockMargin,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#CBE2F1',
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: responsiveFontSize(2.5),
    width: responsiveWidth(100),
  },
  text2:{
    color: '#202020',
    fontSize: 16,
    fontFamily: 'SFCompactDisplay-Regular',
    width: '100%',
    minHeight:45
},
buttonContainer: {
  height: responsiveHeight(6.5),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveHeight(5),
  marginLeft: responsiveHeight(7.45),
  width: responsiveWidth(70),
  borderRadius: 30,
},
confirmbutton: {
  backgroundColor: '#0072BB',
},
confirmtext: {
  color: '#FFFFFF',
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: responsiveFontSize(2),
},
img: {
  height: responsiveHeight(22),
  width: responsiveWidth(76),
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius:100/2,
},
view4: {
    borderBottomWidth: responsiveWidth(0.22),
    marginTop: responsiveHeight(0),
    borderBottomColor: '#B6C0CB',
    width: responsiveWidth(85),
    marginLeft:responsiveWidth(1),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalButton: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  modalButtonText: {
    fontSize: 18,
    color:'black',
    textAlign: 'center',
  },
    });
