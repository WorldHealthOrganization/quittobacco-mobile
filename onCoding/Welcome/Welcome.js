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
  TouchableOpacity,SafeAreaView,ActivityIndicator, StyleSheet
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Questionare_Screen4 from '../Questionare_Screen4/Questionare_Screen4';
import Toast from 'react-native-simple-toast';
import HTMLView from 'react-native-htmlview';
import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive';

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
    this.setState({isHidden: true});

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
            
              this.setState({isHidden: false});
              if (response.data.status == 200) {
                this.setState({content: response.data.data.description});
              }
            
            })
            .catch((error) => {
              this.setState({isHidden: false});
             
            });
  }


  render() {
    const {content} = this.state;
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.view}>
          <Image
          source={require('../../images/welcome.png')}
 
            style={{width: responsiveWidth(100), height: '48%'}}>   
             </Image>
          <View style={styles.view1}>
          <HTMLView
      
    style={styles.text}
                value={`<body>${content}</body>`}
                stylesheet={styless}
              />

<View style={styles.view2}>
                    <TouchableOpacity
            style={[styles.buttonContainer, styles.contbutton]}
            onPress={() => this.props.navigation.navigate('Questionare_Screen4')}>
            <Text style={styles.conttext} >Continue</Text>
          </TouchableOpacity>
          </View>

          </View>
                    
        </View>
        {this.state.isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',
            
              alignSelf: 'center'
            }}>
              <ActivityIndicator
                size={40}
                color="#0072BB"
                style={{marginTop: 40}}
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
      </View></SafeAreaView>
    );
  }
}

const styless = StyleSheet.create({
  p: {
    color: '#000000',
    fontFamily:'SFCompactDisplay-Bold',
    fontSize: 18,

  },
});

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