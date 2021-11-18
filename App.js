/* eslint-disable prettier/prettier */
import React from 'react';
import {AppRegistry} from 'react-native';
import Splash from './onCoding/splash/Splash';
import Walkthrough from './onCoding/Walkthrough_Screen1/Walkthrough';
import Login from './onCoding/login/Login';
import Questionare_Screen from './onCoding/Questionare_Screen1/Questionare_Screen1';
import Navigation from './onCoding/Navigation/Navigation';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      walkthrough: false,
      loginStatus: false,
      questionareStatus: '0'
    };
  }
  componentDidMount = () => {
    SplashScreen.hide();
    this.setData();
  };

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

   render() {
    var mainScreen = <Splash />;
    setTimeout(() => {
      this.setState({timePassed: true});
    }, 1000);
    if (!this.state.timePassed) {
      return mainScreen;
    } else {
      if (this.state.walkthrough == 'true') {
        if (this.state.loginStatus == 'true') {
          if (this.state.questionareStatus == '1') {
        
            mainScreen = <Navigation />;
          } else {
            mainScreen = <Questionare_Screen />;
          }
        
        } else {
          mainScreen = <Login />;
        }
       
      } else {
        mainScreen = <Walkthrough />;
      }
    }
    return mainScreen;
       }
  }
  AppRegistry.registerComponent('WHO_App', () => WHO_App);
