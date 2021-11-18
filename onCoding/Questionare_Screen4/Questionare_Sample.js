/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Dimensions, TouchableHighlight} from 'react-native';
import styles from '../Questionare_Screen4/styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ToolbarAndroid from '@react-native-community/toolbar-android';

export default class Questionare_Screen4 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
        <ToolbarAndroid style={styles.toolbar}
                             navIcon={require('../../images/back_arrow.png')}
                             titleColor={'#FFFFFF'}>
                                 <Text style={styles.toolbar_title}>              Let's Do It</Text>
                                 </ToolbarAndroid>
            <TouchableHighlight
              style={{backgroundColor: 'red', width: 200}}
              onPress={() => this.props.navigation.navigate('Questionare_Screen5')}>
              <Text style={styles.nexttext}>Next</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}
