/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, Text, Image, SafeAreaView,ScrollView} from 'react-native';
import styles from './styles';



export default class Walkthrough_screen_4 extends Component {
  render(){
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image source={require('../../images/Tobacco_body.jpg')} style={{ 
        width: '100%',
    height: '100%',
  
   backgroundColor:'#FFFFFF',
    resizeMode: 'contain',}} />
     
    </View>
  </SafeAreaView>
  );
  }
}


