/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        backgroundColor: '#FFFFFF',
      },
      view1: {
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(2),
        // marginLeft: responsiveWidth(8),
        alignSelf: 'center',
        width: responsiveWidth(80),
      },
      view2:
      {
        flex:0.18,
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
        width: 25,
        height: 25,
        tintColor:'#fff',
        marginLeft: responsiveWidth(28),
        marginTop: responsiveHeight(1),
    },
    arrow:{
      width: responsiveWidth(3),
      height: responsiveHeight(4),
      marginLeft: responsiveWidth(4),
      marginTop: responsiveHeight(1),
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
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
    borderWidth: 2,
    borderColor: '#0072BB',
  },
  text_fab:{
    fontSize:responsiveFontSize(4),
    color:'white',
    marginTop: responsiveHeight(0),
  },
  
  text: {
    marginTop: responsiveHeight(10),
    alignSelf: 'center',
    textAlign: 'center',
    color: '#CBE2F1',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    width: responsiveWidth(100),

  },
img: {
  height: responsiveHeight(25),
  width: responsiveWidth(76),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  borderRadius:100/2,
},
cardview: {
    backgroundColor: '#CBE2F1',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(5.5),
    width: '90%',
   },
   cardview2: {
    backgroundColor: '#FFFFFF',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(17),
    width: '35%',
    height: responsiveHeight(15),
   },
   card_text1:{
    padding: 0,
    margin: 10,
    color: '#0072BB',
    fontFamily: 'SFCompactDisplay-Bold',
    marginLeft: responsiveWidth(3),
  },
  card_text2: {
     color: '#202020',
     fontSize:responsiveFontSize(2),
     fontFamily: 'SFCompactDisplay-Medium',
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(0),
  },
  card_text3: {
    color: '#202020',
    fontSize:responsiveFontSize(2),
    fontFamily: 'SFCompactDisplay-Bold',
   marginLeft: responsiveWidth(3),
   marginTop: responsiveHeight(1),
   fontWeight: 'bold',
 },
   cardview3: {
        backgroundColor: '#FFFFFF',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(5.5),
        width: '35%',
        height: responsiveHeight(15),
       },
       square:{
            width:responsiveWidth(22),
            height: responsiveHeight(12),
            borderRadius: 100 / 5,
            backgroundColor: '#FFFFFF',
            opacity: 100,
            marginBottom: responsiveHeight(3),
            marginTop: responsiveHeight(1.5),
            marginLeft: responsiveWidth(15),
            marginRight: responsiveWidth(2),
      },
      cardview4: {
        backgroundColor: '#CBE2F1',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(1),
        bottom: responsiveHeight(0.10),
        width: responsiveWidth(90),
       },
       image: {
        resizeMode: 'contain',
        marginTop: responsiveHeight(3),
        // marginLeft: responsiveWidth(4),
        // marginRight: responsiveWidth(-20),

      },
      plus: {
          resizeMode: 'contain',
          marginTop: responsiveHeight(1.75),
      },
    });
