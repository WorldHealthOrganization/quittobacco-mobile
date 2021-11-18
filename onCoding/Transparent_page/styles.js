/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
        alignItems: 'center',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      },
      view: {
        flex:1,
        width: '100%',
        // backgroundColor: 'rgba(0, 114, 187,alpha)',
        backgroundColor: 'transparent',
            },
      img: {
        resizeMode:'contain',
        marginLeft: responsiveWidth(32),
      },
      cloud_img : {
      marginLeft: responsiveWidth(5),
      resizeMode:'contain',
      marginTop: responsiveHeight(1),
      // width: '75%',
      // height: '50%',
      // width: responsiveWidth(50),
      // height: responsiveHeight(100),
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      innerContainer: {
        alignItems: 'center',
      },

});
