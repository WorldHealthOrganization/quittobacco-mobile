/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, SafeAreaView,ScrollView} from 'react-native';
import { blockMarginHalf } from '../ui/common/responsive';
import styles from '../Walkthrough_Screen2/styles';

export default class Walkthrough_screen_2 extends Component {
  render(){
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
      <ScrollView style={{width:'100%'}}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}>
    <View style={{margin: blockMarginHalf,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.text}>Diseases caused by Tobacco usage</Text>
      <Image source={require('../../images/lungs.png')} style={styles.lungs_image} />
      <View style={{justifyContent:'center',alignItems:'center',marginTop: blockMarginHalf * 2}}>
        <Text style={styles.contentText}>
    HEART ATTACK, STROKE AND OTHER CARDIOVASCULAR DISEASE{'\n'}{'\n'}
       ORAL CANCER AND OTHER ORAL DISEASES {'\n'}{'\n'}
       THROAT CANCER, OTHER CANCERS, {'\n'}{'\n'}
       FETAL DEATH {'\n'}{'\n'}
       REDUCED FETAL GROWTH, LOW BIRTH WEIGHT AND {'\n'}{'\n'}
       PRETERM DELIVERY{'\n'}{'\n'}
        </Text>
        {/* <View style={styles.button_view}>
        <Button style={styles.btn_style}
                    title="Next"
                    onPress={() => this.props.navigation.navigate('Walkthrough3')}
                />
                </View> */}
                
      </View>
      </View>
      </ScrollView> 
      </View>
  </SafeAreaView>
  );
}
}
