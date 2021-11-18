/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from '../Walkthrough_Screen1/styles';



export default class Walkthrough_screen_1 extends Component {
  render(){
  return (
    <View style={styles.container}>
      <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
      <View style={styles.textView}>
        <Text style={styles.text}>
          {` Tobacco is deadly in any form, Globally over 22000 
    people die from tobacco use or second-hand- 
      smoke exposure everyday - one person 
 every 4 seconds. 
           
Tobacco smoke contains over 7000 chemicals, 
some of which can also be found in vehicle
exhaust fumes, floor cleaners and insecticides.

Lifelong tobacco users lose atleast 10 years of life 
an average. use of smokeless tobacco products, 
waterpipe tobacco and other novel and 
emerging tobacco products can result 
in serious sometime fatal - health problems. 
          
Exposure to second - hand smoke has also been 
implicated in adverse 
health outcomes, including death.`}
        </Text>
        <View style={styles.button_view}>
     
                </View>
     
      </View>
    </View>
  );
  }
}


