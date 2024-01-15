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
          flex:1,
        backgroundColor: '#FFFFFF',
      },
      view2:
      {
         flex:0.4,
         backgroundColor: '#0072BB',
         width: responsiveWidth(100),
      },
      cardview: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(5.5),
        width: '35%',
        height: responsiveHeight(15),
       },
       cardview2: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(17),
        width: '35%',
        height: responsiveHeight(15),
       },
      text_prg:{
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(1),
        marginLeft: responsiveWidth(28),
        
      },
      money:{
        color: '#CBE2F1',
        fontFamily: 'SFCompactDisplay-Medium',
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(32),
    
      },
      share_img2: {
        width: 25,
        height: 25,
        tintColor:'#fff',
          marginLeft: responsiveWidth(20),
          marginTop: responsiveHeight(1),
      },
      arrow:{
        marginLeft: responsiveWidth(4),
        marginTop: responsiveHeight(1),
        height: responsiveHeight(2.5),
        width: responsiveWidth(2.5),
      },
      amount: {
        color: '#FFFFFF',
        fontFamily: 'SFCompactDisplay-Bold',
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(3),
       
        fontWeight: 'bold',
      },
      card_text1: {
        color: '#0072BB',
        fontSize:responsiveFontSize(2.25),
        fontFamily: 'SFCompactDisplay-Medium',
        fontWeight: 'bold',
        textAlign: 'center',
       marginTop: responsiveHeight(0),
       marginBottom: responsiveHeight(1),
      },
      card_text2:{
        padding: 0,
        marginTop: responsiveHeight(2),
        fontSize:responsiveFontSize(2.5),
        fontWeight: 'bold',
        fontFamily: 'SFCompactDisplay-Bold',
        color: '#202020',
        textAlign: 'center',
      },
    });
