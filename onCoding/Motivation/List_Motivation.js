/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, Alert, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../Benefits/styles';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import CardView from 'react-native-cardview';

import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { color } from 'react-native-reanimated';


export default class Benefits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      benefits_value: [],
      description: '',
    };
  }

  componentDidMount = () => {
    this.Benefits();
  };

  deleteMember(id) {
   
    Alert.alert(
      '',
      'Are you sure do you want to delete?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => alert('Motivation'+' ' + id + ' '+ 'deleted'),
        },
      ],
      {
        cancelable: false,
      },
    );
  }


  Benefits = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    this.setState({ isHidden: true })
    const { title, description, image, } = this.state;

    console.log('screen input ==> ' + description);

    axios
      .post(
        ApiName.benefits, {},
        {
          headers: {
            'Authorization': jwt_token,
          },
        },
      )
      .then((response) => {

        console.log('Benefits response ', JSON.stringify(response.data));

        if (response.data.status == 200) {

          this.setState({ benefits_value: response.data.data })
          this.setState({ isHidden: false })
          // Toast.show(response.data.message);
        }
        else {
          console.log(response.data.message);
          this.setState({ isHidden: false })
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }

  ListEmpty = () => {
    const { isHidden } = this.state
    if (!isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Text numberOfLines={2} style={{
              color: '#555555',
              fontFamily: 'SF-Medium',
              fontSize: scalable(14), alignItems: 'center'
            }}>No Benefits Yet</Text>
          </View>
        </View>
      );
    } else if (isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: deviceHeight / 2, width: deviceWidth, justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          </View>
        </View>
      );
    }
  };


  render() {

    const { benefits_value, isHidden } = this.state;
    return (
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: deviceWidth,
          flexDirection: 'column',
        }}>

        {/* <View style={{ flexDirection: 'row', width: '100%', height: responsiveHeight(10), backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity style={{
            width: '12%',left:0,
            height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
          }} onPress={() => this.props.navigation.goBack()}>

            <Image style={{
              width: responsiveWidth(3),
              height: responsiveHeight(4),
alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
              resizeMode: 'contain'
            }} source={require('../../images/back_arrow.png')} />

          </TouchableOpacity>

          <Text style={{
            width: '88%', color: '#FFFFFF',
            fontFamily: 'SF-Medium',
            fontSize: scalable(18),
            justifyContent: 'center',
            textAlign: 'center',
          }}>Motivation</Text>

        </View> */}

<View style={{flexDirection: 'row', width: '100%', height: '10%', marginTop: responsiveHeight(0), backgroundColor: '#0072BB'
              }}>

<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                   <Image style={styles.arrow} source={require('../../images/back_arrow.png')}/>
                   </TouchableOpacity>
           {/* <Text style={styles.text_prg}>Money Saved</Text> */}
           <Text style={{
           color: '#FFFFFF',
           fontFamily: 'SF-Medium',
           fontSize: responsiveFontSize(2.5),
           marginTop: responsiveHeight(2),
           marginLeft: responsiveWidth(28),
           fontWeight: 'bold',
          }}>Motivation</Text>
           <TouchableOpacity
                onPress= { () => this.shareApp({type: 1})}
                style={{position:'absolute',
    width: 30,
    height: 30,
    justifyContent:'flex-end',end:0,marginRight:responsiveWidth(5)
  
   }} >
              
                <Image style={{resizeMode: 'contain',
    width: 20,
    height: 20,
    justifyContent:'flex-end',end:0,
    tintColor:'#0072BB',
   }} source={require('../../images/share.png')} />
   </TouchableOpacity>
       </View>

        <FlatList

          keyboardShouldPersistTaps={'handled'}
          data={[
            {
              id:1,
              image:require('../../images/placeholder.png'),
              title: 'First Item',
            },
            {
              id:2,
              image: require('../../images/placeholder.png'),
              title: 'Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.',
            },
            {
                id:3,
                image:require('../../images/placeholder.png'),
                title: 'Third Item',
            },
          ]}
          extraData={this.state}
          showsVerticalScrollIndicator={false}

          renderItem={({ item, index }) => (

            <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
           
<TouchableOpacity onPress={() => alert('Hi')}>
                <CardView style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,
                  marginBottom: blockMarginHalf / 2,
                  width: '90%',
                }}
                  cardElevation={3}
                  cardMaxElevation={5}
                  cornerRadius={blockMargin}>


                  <View style={{ width: '100%', flexDirection: 'row', padding: blockMarginHalf }}>

                    <View style={{ width: '15%', flexDirection: 'column' }}>

                      <View style={{
                        width: 45,
                        height: 45,
                        borderRadius: 100 / 2,
                        backgroundColor: '#FFFFFF',
                        opacity: 100,
                        margin: blockMarginHalf/2, justifyContent: 'center'
                      }}>
                        <Image
                          resizeMode={'contain'} 
                          source={item.image} 
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'cover',
  
                            justifyContent: 'center',
  
                            alignSelf: 'center',
                            borderRadius: 100 / 2,
                          }}
                        />
                       
                      </View>
                      
                    </View>
                    <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'center' }}>
                      <Text  numberOfLines={8} style={{
                  marginBottom: blockMarginHalf/2,marginTop: blockMarginHalf/2,
                         marginLeft: blockMarginHalf * 1.5, marginRight: blockMarginHalf/2, justifyContent:'center',
                        color: '#0072BB',
                        fontFamily: 'SF-Medium',
                        fontSize: scalable(15),
                      }}>
                        {item.title}
                      </Text>
                      
                    </View>
                    <View style={{ width: '10%', flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this.deleteMember(item.id)}>
<View style={{
  width: 25,
  height: 25,
  borderRadius: 100 / 2,
  backgroundColor: 'transparent',
  opacity: 100,
  margin: blockMarginHalf/2, justifyContent: 'center'
}}>
  <Image
    resizeMode={'contain'} 
    source={require('../../images/trash.png')} 
    style={{
      width: 20,
      height: 20,
      resizeMode: 'contain',
tintColor:'#0077bb',
      justifyContent: 'center',

      alignSelf: 'center',
      borderRadius: 100 / 2,
    }}
  />
</View>
</TouchableOpacity>

</View>

                  </View>
                </CardView>
                </TouchableOpacity>
            </View>
          )}
          enableEmptySections={true}
          ListEmptyComponent={this.ListEmpty}

          keyExtractor={(item, index) => index.toString()}
        />

        {isHidden ? (
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
              color="#0072bb"
              animating={true}
              backgroundColor={'transparent'}
            />
          </View>
        ) : null}

      </View>

    );
  }
}

