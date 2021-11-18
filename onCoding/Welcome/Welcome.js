/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Welcome/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {
  View,
  ImageBackground,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Questionare_Screen4 from '../Questionare_Screen4/Questionare_Screen4';
import Toast from 'react-native-simple-toast';
import HTMLView from 'react-native-htmlview';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
    };
  }

  componentDidMount = () => {
    this.Welcome();
  };

  Welcome= async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');

          axios
            .post(
              ApiName.welcome,{ },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              console.log(
                'Welcome response ',
                'response get details:==> ' + JSON.stringify(response.data),
              );
              this.setState({content: response.data.data.description});

              if (response.data.status == 200) {
                console.log(JSON.stringify( response.data));
                
                
                //  Toast.show(response.data.message);
                 
              }
              else {
                alert(response.data.message);
              }
            })
            .catch((error) => {
              console.log('reactNativeDemo axios error:', error);
            });
  }


  render() {
    const {content} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <ImageBackground
          source={require('../../images/welcome.png')}
            style={{width: responsiveWidth(100), height: responsiveHeight(40)}}>   
             </ImageBackground>
          <View style={styles.view1}>
          <HTMLView
    style={styles.text}
                value={content}
                // stylesheet={styles}
              />
          </View>
                    <View style={styles.view2}>
                    <TouchableOpacity
            style={[styles.buttonContainer, styles.contbutton]}
            onPress={() => this.props.navigation.navigate('Questionare_Screen4')}>
            <Text style={styles.conttext} >Continue</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// const RootStack = createStackNavigator({

//   Questionare_Screen4: Questionare_Screen4,
//   Welcome: Welcome,

// },
// {
//   initialRouteName: 'Welcome',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Welcomestack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }