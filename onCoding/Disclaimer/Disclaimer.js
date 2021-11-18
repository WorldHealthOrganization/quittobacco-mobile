/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text,  Alert,Image,TouchableOpacity,ScrollView} from 'react-native';
import styles from '../Disclaimer/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import HTMLView from 'react-native-htmlview';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Navigation from '../Navigation/Navigation';
import Toast from 'react-native-simple-toast';
export default class Disclaimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
    };
  }

  componentDidMount = () => {

    this.disclaimer();
  };

  disclaimer= async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');

          axios
            .post(
              ApiName.disclaimer,{ },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              console.log(
                'Disclaimer response ',
                'response get details:==> ' + JSON.stringify(response.data),
              );

              this.setState({content: response.data.data.description});

              if (response.data.status == 200) {
                console.log(JSON.stringify( response.data));

              

                AsyncStorage.setItem('QuestionarieStatus', '1');
                // Toast.show(response.data.message);
              }
              else {
                console.log(response.data.message);
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
        <View style={{flexDirection: 'row', width: responsiveWidth(100),flex: 0.1,backgroundColor: '#0072BB'}}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Questionare_Screen5')}>
     <Image style={styles.arrow} source={require('../../images/back_arrow.png')}/>
     </TouchableOpacity> */}
     <Text style={styles.toolbar_title}>Disclaimer</Text>
</View>
<ScrollView>
    <View style={{ flex: 1, marginTop: responsiveHeight(2)}}>
    {/* <Text style={styles.text}>{content}</Text> */}
    <HTMLView
    style={styles.text}
                value={content}
                // stylesheet={styles}
              />
       </View>
       </ScrollView>
       <View style={styles.view2}>
       <TouchableOpacity
            style={[styles.buttonContainer, styles.submitbutton]}
            onPress={() => this.props.navigation.navigate('UserHome')}>
            <Text style={styles.submittext}>Continue</Text>
        </TouchableOpacity>
</View>
      </View>
      </View>
    );
  }
}

// const RootStack = createStackNavigator({

//   Navigation: Navigation,
//   Disclaimer: Disclaimer,

// },
// {
//   initialRouteName: 'Disclaimer',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class Disclaimerstack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
