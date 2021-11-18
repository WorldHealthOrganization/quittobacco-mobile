/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Diary/styles_view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-datepicker';
import Slider from 'react-native-slider';
// import {
//   StepProgressBar
// } from 'react-native-step-progress-bar';
import Counter from 'react-native-counters';
import CardView from 'react-native-cardview';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableHighlight,ActivityIndicator,
  ScrollView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Diary from '../Diary/Diary';
import {createStackNavigator, NavigationActions} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import dateFormat from 'date-fns/format';
import {
  scalable,
  deviceWidth,
  deviceHeight,
  itemRadius,
  itemRadiusHalf,
  blockMarginHalf,
  blockMargin,
  blockPadding,
  blockPaddingHalf,
} from '../ui/common/responsive';
import { th, tr } from 'date-fns/locale';

export default class View_Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      value: 0.2,
      diaryList: [],
    };
  }
  componentDidMount = () => {
    const {navigation} = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {
      this.View_Diary();
      this.setState({count: 0});
    });
    this.View_Diary();
  };

  componentWillUnmount() {
    this.focusListener.remove();
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearTimeout(this.t);
  }

  View_Diary = async () => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const {title, description, image} = this.state;
this.setState({isHidden: true})
    console.log('screen input ==> ' + description);

    axios
      .post(
        ApiName.index_diary,
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        console.log(
          'View diary response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.setState({diaryList: response.data.data});
          this.setState({isHidden: false})
          // Toast.show(response.data.message);
        } else {
          this.setState({isHidden: false})
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false})
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  };


  delete_Diary = async ({id}) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const {title, description, image} = this.state;
this.setState({isHidden: true})
    console.log('screen input ==> ' + description);

    axios
      .post(
       'http://whoapp.dci.in/api/diaries/'+id+'/destroy',
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        console.log(
          'View diary response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );

        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.View_Diary();
          // Toast.show(response.data.message);
        } else {
          this.setState({isHidden: false})
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({isHidden: false})
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  };

  getDate(date) {
    let formatDate = '';
    if (date != '0000-00-00') {
      var dateTime = new Date(date);
      formatDate = dateFormat(dateTime, 'dd MMM');
      console.log('formatDate ==> ' + formatDate);
    } else {
      formatDate = '';
    }
    return formatDate;
  }

  getYear(date) {
    let formatDate = '';
    if (date != '0000-00-00') {
      var dateTime = new Date(date);
      formatDate = dateFormat(dateTime, 'yyyy');
      console.log('formatDate ==> ' + formatDate);
    } else {
      formatDate = '';
    }
    return formatDate;
  }

  deleteDiary(id) {
   
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
          onPress: () => this.delete_Diary({id: id}),
        },
      ],
      {
        cancelable: false,
      },
    );
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
            }}>No Diary Yet</Text>
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
    const{isHidden} = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: responsiveHeight(10),
            backgroundColor: '#0072BB',
            alignSelf: 'center',
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
          }}>
          <Text
            style={{
              
              color: '#FFFFFF',
            
              fontFamily: 'SF-Medium',
              fontSize: scalable(18),
            
              alignSelf: 'center',
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center',
             
            }}>
            Diary
          </Text>
        </View>

        
        <ScrollView>
          <View>
       
            <View
              style={{
                width: responsiveWidth(100),
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
              }}>
              <CardView
                style={{
                  backgroundColor: '#CBE2F1',
                  marginTop: blockMargin,
                  marginBottom: blockMarginHalf / 2,
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                cardElevation={3}
                cardMaxElevation={5}
                cornerRadius={blockMargin}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    padding: blockMarginHalf,
                  }}>
                  <View
                    style={{
                      width: '25%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 15,
                        backgroundColor: '#FFFFFF',
                        opacity: 100,
                        marginRight: blockMarginHalf,
                        marginBottom: blockMarginHalf,
                        marginTop: blockMarginHalf,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../images/homework.png')}
                        resizeMode="contain"
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: 'contain',

                          justifyContent: 'center',

                          alignSelf: 'center',
                          borderRadius: 0,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: '75%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        marginBottom: blockMarginHalf,
                        marginLeft: blockMarginHalf,
                        marginBottom: blockMarginHalf,
                        color: '#0072BB',
                        fontFamily: 'SF-Medium',
                        fontSize: scalable(15),
                      }}>
                      Your Diary
                    </Text>
                    <Text
                      style={{
                        color: '#202020',
                        fontSize: scalable(13),
                        fontFamily: 'SF-Regular',
                        marginLeft: blockMarginHalf,
                        marginBottom: blockMarginHalf / 2,
                      }}>
                      You are likely to experience cravings when you not using
                      tobacco. Keeping a diary always helps you to track your
                      progress with cravings
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(12),
                width: responsiveWidth(100),
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Diary')}
                style={[styles.buttonContainer1, styles.loginButton]}>
                <Text style={styles.loginText}>New Entry</Text>
              </TouchableOpacity>
            </View>

            <View style={{height: '100%',
    backgroundColor: '#FFFFFF',
    // height: responsiveHeight(20),
    width: responsiveWidth(100),
    marginTop: responsiveHeight(1),
    paddingBottom: 10}}>
           <View style={{height:'100%'}}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                extraData={this.state}
                showsVerticalScrollIndicator={true}
                data={this.state.diaryList}
                renderItem={({item}) => (
                  //  <View style={{ alignSelf: 'center',
                  //  borderRadius: 25,
                  //  width: '100%',
                  //  backgroundColor: 'white',
                  //  shadowColor: '#0000001A',
                  //  shadowOffset: {
                  //    width: 0,
                  //    height: 3,
                  //  },
                  //  shadowRadius: 5,
                  //  shadowOpacity: 1.0,
                  //  elevation: 4,
                  //  marginTop: 10,
                  //  padding: 10,
                  //  height: 100,
                  //  flexDirection: 'row',}}>
                  <CardView
                    style={styles.cardview}
                    cardElevation={responsiveWidth(1)}
                    cardMaxElevation={responsiveWidth(2)}
                    cornerRadius={responsiveWidth(4)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: responsiveHeight(0),
                        bottom: responsiveHeight(0),
                        padding: 10,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          backgroundColor: 'white',
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{
                            height: 20,
                            width: 25,
                            alignContent: 'center',
                          }}
                          source={require('../../images/calendar_diary.png')}
                        />
                        <Text
                          style={{
                            color: '#0072BB',
                            fontSize: 14,
                            marginTop: 3,
                          }}>
                          {this.getDate(item.date)}
                        </Text>
                        <Text style={{color: '#0072BB', fontSize: 10}}>
                          {this.getYear(item.date)}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginStart: 10,
                          flexDirection: 'column',
                          marginTop: responsiveHeight(1),
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: '#202020', fontFamily: 'SF-Bold'}}>
                          Did you use Tobacco?{'   '}
                          <Text style={styles.card_text1}>
                            {item.last_entry == 1 ? 'Yes' : 'No'}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontFamily: 'SF-Bold',
                            marginTop: 5,
                          }}>
                          Cravings{'   '}
                          <Text style={styles.card_text1}>
                            {item.craving_count}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#202020',
                            fontFamily: 'SF-Bold',
                            marginTop: 5,
                          }}>
                          Severity{'   '}
                          <Text style={styles.card_text1}>
                            {item.tobacco_desire}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 35,
                          width: 35,
                          backgroundColor: 'white',
                          borderRadius: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                          margin: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.deleteDiary(item.id)}>
                          <Image
                            style={{
                              height: 20,
                              width: 20,
                            }}
                            source={require('../../images/trash.png')}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </CardView>
                  //  </View>
                )}
                ListEmptyComponent={this.ListEmpty}
             />
              </View>

{isHidden ? (
            <View style={{
              width: '70%',
              height: '70%',
             position:'absolute',
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
            

          </View>
          </ScrollView>
      </View>
    );
  }
}

// const RootStack = createStackNavigator(
//   {
//     View_Diary: View_Diary,
//     Diary: Diary,
//   },
//   {
//     initialRouteName: 'View_Diary',
//     headerMode: 'none',
//   },

//   {
//     headerMode: 'none',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class View_DiaryStack extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
