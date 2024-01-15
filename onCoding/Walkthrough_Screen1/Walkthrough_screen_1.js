/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, Text, Image, SafeAreaView,ScrollView} from 'react-native';
import styles from '../Walkthrough_Screen1/styles';



export default class Walkthrough_screen_1 extends Component {
  render(){
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
      <ScrollView style={{width:'100%'}}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}>
      <View style={styles.textView}>
        <Text style={styles.text}>
         Tobacco is deadly in any form.{'\n'}{'\n'}
         Globally, over 22,000 
    people die from tobacco use or second-hand- 
      home exposure everyday - one person 
 every 4 seconds.{'\n'}{'\n'}
           
Tobacco smoke contains over 7000 chemicals, 
some of which can also be found in vehicle
exhaust fumes, floor cleaners and insecticides.{'\n'}{'\n'}

Lifelong tobacco users lose at least 10 years of life 
on average. Use of smokeless tobacco products, including 
waterpipe tobacco and other novel and 
emerging tobacco products, can result 
in serious - and sometimes fatal - health problems. {'\n'}{'\n'}
          
Exposure to second - hand smoke has also been 
implicated in adverse 
health outcomes, including death.{'\n'}{'\n'}
        </Text>
        <View style={styles.button_view}>
     
                </View>
     
      </View>
      </ScrollView>
    </View>
  </SafeAreaView>
  );
  }
}


