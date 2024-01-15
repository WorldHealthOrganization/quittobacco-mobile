/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, ScrollView,Button, SafeAreaView} from 'react-native';
import styles from '../Walkthrough_Screen3/styles';

export default class Walkthrough_screen_3 extends Component {
  render(){
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
      <ScrollView  keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}>
           
      <Text style={styles.text}>we help you quit tobacco</Text>
      <View style={styles.view}>
        <View style={styles.rectangle}>
          <Image source={require('../../images/smoker.png')} resizeMode={'contain'} style={styles.smoker_img} />
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center',alignSelf:'center'}}>
          <Text style={styles.textcontent}>STEP 1</Text>
          <Text style={styles.textcontent1}>
            Identify the causes that stimulate you {'\n'}to use tobacco
          </Text>
        </View>
      </View>
      <View style={styles.view}>
        <View style={{flexDirection: 'column',justifyContent:'center',}}>
          <Text style={styles.textcontent}>STEP 2</Text>
          <Text style={styles.textcontent1}>
            Identify the motivators that will help you to {'\n'}quit tobacco usage
          </Text>
        </View>
        <View style={styles.rectangle}>
          <Image
            source={require('../../images/cigarette.png')}
            style={styles.cigarette_img}
          />
        </View>
      </View>
      <View style={styles.view1}>
        <View style={styles.rectangle}>
          <Image source={require('../../images/calendar.png')} style={styles.smoker_img} />
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center',}}>
          <Text style={styles.textcontent}>STEP 3</Text>
          <Text style={styles.textcontent1}>Set your own Quit Date</Text>
        </View>
      </View>
      <View style={styles.view}>
        <View style={{flexDirection: 'column',justifyContent:'center',}}>
          <Text style={styles.textcontent}>STEP 4</Text>
          <Text style={styles.textcontent1}>
            Manage your cravings and keep a diary
          </Text>
        </View>
        <View style={styles.rectangle}>
          <Image source={require('../../images/agenda.png')} style={styles.agenda_img} />
        </View>
      </View>
      <View style={styles.view}>
        <View style={styles.rectangle}>
          <Image source={require('../../images/arrow.png')} style={styles.arrow_img} />
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center',}}>
          <Text style={styles.textcontent}>STEP 5</Text>
          <Text style={styles.textcontent1}>
            Stay focused and motivated!{'\n'}Reach your goals and enjoy{'\n'}the rewarding benefits
          </Text>
        </View>
      </View>
       </ScrollView>
        </View>
 </SafeAreaView>
 );
}
}
