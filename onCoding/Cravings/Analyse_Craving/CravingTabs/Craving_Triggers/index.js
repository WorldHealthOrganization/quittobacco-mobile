import React, {Component} from 'react';
import {View, Text,  Image,TouchableHighlight, TouchableOpacity ,ActivityIndicator,FlatList,ScrollView} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../../../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../../../../ui/common/responsive';


const ListHeader = () => {
  //View to set in Header
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#CBE2F1',
      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
          marginEnd: 20,
        }}>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            textAlign: 'left',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'DATE'}{' '}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '43%',
            textAlign: 'center',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'TRIGGERS'}{' '}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            textAlign: 'center',
            color: '#0072BB',
            fontSize: 15,
          }}>
          {' '}
          {'CRAVINGS LEVEL'}{' '}
        </Text>
      </View>
    </View>
  );
};

const EmptyListMessage = ({item}) => {
  return (
    // Flat List Item
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginEnd: 20,
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '100%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 16,
        }}>
        {' '}
        {'No Data Found'}{' '}
      </Text>
    </View>
  );
};

const ItemView = ({item}) => {
  return (
    // Flat List
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginEnd: 20,
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '34%',
          textAlign: 'left',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.date}{' '}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '34%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.triggers}{' '}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '32%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 15,
        }}>
        {' '}
        {item.cravings_level}{' '}
      </Text>
    </View>
  );
};


const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.9,
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    />
  );
};

 export default class Trigger_Cravings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
    };
  }

  componentDidMount = () => {

    this.getUser();
  };

  getUser = async () => {

    const user_id = await AsyncStorage.getItem('UserId');
    const user_name = await AsyncStorage.getItem('UserName');
    const mobile_no = await AsyncStorage.getItem('UserMobileNo');
    const email_id = await AsyncStorage.getItem('UserEmailId');
    const profile_image = await AsyncStorage.getItem('UserProfileImage');
    const fcm = await AsyncStorage.getItem('UserFCM');
    const token = await AsyncStorage.getItem('Login_JwtToken');

    if (token !== '') {
      this.setState({

        token: token,
      });


    }
  };

  render() {

            const {isHidden} = this.state;

    return (
        <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>

        <View
                    style={{
                      width: '100%',
                      marginTop: responsiveHeight(2),
                      alignSelf: 'center',
                    }}>
                    <FlatList
                       data={[{
                        date:'10th Jul 2020',
                        triggers: 'location',
                        cravings_level: 'high',
               
                      },
                      {
                        date:'11th Jul 2020',
                        triggers: 'family',
                        cravings_level: 'high',               
                      },
                      {
                        date:'12th Jul 2020',
                        triggers: 'friends',
                        cravings_level: 'high',               
                      },
                      {
                        date:'13th Jul 2020',
                        triggers: 'friends',
                        cravings_level: 'high',               
                      }]
                    }
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={ItemSeparatorView}
                      //Header to show above listview
                      ListHeaderComponent={ListHeader}
                      //Footer to show below listview
                      renderItem={ItemView}
                      ListEmptyComponent={EmptyListMessage}
                    />
                  </View>

            </View>
       </View>

    );
  }
}


 