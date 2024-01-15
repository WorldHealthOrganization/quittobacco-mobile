/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Transparent_page/styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  Text,
  Modal,
} from 'react-native';

import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Questionare_Screen5 from '../Questionare_Screen5/Questionare_Screen5';

export default class Transparent_page extends Component {
  // state = {
  //   modalVisible: false,
  // };

  // openModal() {
  //   this.setState({modalVisible:true});
  // }

  // closeModal() {
  //   this.setState({modalVisible:false});
  // }
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Questionare_Screen5')}>
      <View style={styles.container}>
          
         <View style={{flex:1, backgroundColor: '#0072BB', height: '100%', width: '100%', position: 'absolute'}}>

           <View style={{flex:0.45}}>
               
        <Image
            source={require('../../images/cloud.png')}
            style={styles.cloud_img}>
        </Image>
        </View>
        
        <View style={{flex: 0.55}}>
          <Image style={styles.img} source={require('../../images/transparent.png')}/>
        </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

// const RootStack = createStackNavigator({

//   Questionare_Screen5: Questionare_Screen5,
//   Transparent_page: Transparent_page,

// },
// {
//   initialRouteName: 'Transparent_page',
//   headerMode: 'none',
// },

// {
//   headerMode: 'none',
// },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class TransparentPagestack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }