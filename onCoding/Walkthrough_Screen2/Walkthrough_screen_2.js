/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from '../Walkthrough_Screen2/styles';

export default class Walkthrough_screen_2 extends Component {
  render(){
  return (
    <View style={styles.container}>
      <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
      <Text style={styles.text}>Diseases caused by Tobacco usage</Text>
      <Image source={require('../../images/lungs.png')} style={styles.lungs_image} />
      <View style={styles.textView}>
        <Text style={styles.contentText}>
    {`HEART ATTACK, STROKE AND OTHER CARDIOVASCULAR DISEASE
            

       ORAL CANCER AND OTHER ORAL DISEASES 
       
       THROAT CANCER, OTHER CANCERS, 
       
       FETAL DEATH 
       
       REDUCED FETAL GROWTH, LOW BIRTH WEIGHT AND PRETERM DELIVERY`}
        </Text>
        {/* <View style={styles.button_view}>
        <Button style={styles.btn_style}
                    title="Next"
                    onPress={() => this.props.navigation.navigate('Walkthrough3')}
                />
                </View> */}
      </View>
    </View>
  );
}
}
