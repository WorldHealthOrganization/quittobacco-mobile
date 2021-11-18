	/* eslint-disable prettier/prettier */
  import React, {Component} from 'react';
  import {View, Text, Image, ImageBackground} from 'react-native';
  import styles from './styles';
 
// Logo
import backgrondImage from '../../images/splash.png'
  import Questionare from '../Questionare_Screen1/Questionare_Screen1';
  import Login from '../login/Login';
  // import Walkthrough from '../Walkthrough_Screen1/Walkthrough';
  import AsyncStorage from '@react-native-community/async-storage';

  import SplashScreenInit from 'react-native-splash-screen'

   export default class Splash extends Component {
    constructor() {
      super();
      this.state = {
        isVisible: true,
        timePassed: false,
        walkthrough: false,
        loginStatus: false,
        questionareStatus: '0'
      };
    }
   
    componentDidMount() {
      SplashScreenInit.hide();
      this.setData();
      setTimeout(() => {
        this.mainscreen();
      }, 1000);
    }
  
  
    setData = async () => {
      try {
        let loginStatus = await AsyncStorage.getItem('LoginStatus');
        let walkthrough = await AsyncStorage.getItem('Walkthrough');
        let questionareStatus = await AsyncStorage.getItem('QuestionarieStatus');
        console.log('loginStatus ==> ' + loginStatus+'---'+walkthrough+"---"+questionareStatus);
        // if (loginStatus == true) {
        this.setState({loginStatus: loginStatus,
          walkthrough: walkthrough,
          questionareStatus: questionareStatus});
        // } else {
        //   this.setState({ loginStatus: false })
        // }
      } catch (error) {
        alert(error);
      }
    };
  
  
    mainscreen = async () => {
      if (this.state.walkthrough == 'true') {
        if (this.state.loginStatus == 'true') {
          if (this.state.questionareStatus == '1') {
        
           this.props.navigation.navigate('UserHome');
          } else {
          this.props.navigation.navigate('QuestionareStack');
          }
        
        } else {
         this.props.navigation.navigate('LoginStack');
        }
       
      } else {
        this.props.navigation.navigate('OnBoardStack');
      }
    };
  
  
  
    render() {
      let Splash_Screen = (
        <View style={styles.SplashScreen_RootView}>
          <View style={styles.SplashScreen_ChildView}>
            <View style={styles.container}>
              <Text style={styles.text}>
                lets create a tobacco free world quit tobacco now!
              </Text>
              <Image source={require('../../images/WHO_Logo.png')} style={styles.logo} />
              <Image source={require('../../images/ITU_Logo.png')} style={styles.logo_ITU} />
              <Text style={styles.text_small}>WHO-ITU BeHe@lthy Be Mobile</Text>
            </View>
          </View>
        </View>
      );
      return (
        <View style={styles.MainContainer}>
      
       
          
              <Image source={require('../../images/splash.png')} 
                resizeMode="contain"
              style={{flex: 1,width:'100%',height:'100%'}} />
              
            
             
        
           
        </View>
      );
    }
  }
  