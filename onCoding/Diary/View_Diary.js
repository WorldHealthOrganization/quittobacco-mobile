/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import styles from '../Diary/styles_view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


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
  TouchableHighlight, ActivityIndicator,
  ScrollView,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import Toast from 'react-native-simple-toast';
import Diary from '../Diary/Diary';
import { createStackNavigator, NavigationActions } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
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
      used_unused_datelist: {},
      used_unused_dateArraylist:[],
      SelectedDate: dateFormat(new Date(), 'yyyy-MM-dd')
    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = navigation.addListener('didFocus', () => {
      this.View_calendar();
      this.setState({ count: 0 });
    });
    this.View_calendar();
  };

  componentWillUnmount() {
    this.focusListener.remove();
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearTimeout(this.t);
  }

  View_calendar = async () => {

    let array = []
    array.push({craving_date:this.state.SelectedDate,craving_status: 2})

    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const { title, description, image } = this.state;
    this.setState({ isHidden: true })


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

        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          console.log('view Diary' + JSON.stringify(response))
          //this.setState({diaryList: response.data.data.diary});


          if (response.data.data.length > 0) {

            for (var i = 0; i < response.data.data.length; i++) {
              array.push({ craving_date: response.data.data[i].date, craving_status: response.data.data[i].status })
            }
            this.View_Diary(this.state.SelectedDate)
          }

          this.CalendarColorSetup(array)


        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        this.CalendarColorSetup(array)
        Toast.show('There was some error. Please try again')

      });
  };


  CalendarColorSetup = (array) => {


    let arraylist = [];

    for (var i = 0; i < array.length; i++) {

      let key = array[i].craving_date

      if (array[i].craving_status == 1) {
        arraylist.push({
          [key]: { selected: true, selectedColor: '#B42D33' },

        })
      } else   if (array[i].craving_status == 0){
        arraylist.push({
          [key]: { selected: true, selectedColor: '#3F8F4C' },

        })
      }else if (array[i].craving_status == 2){
        arraylist.push({
          [key]: { selected: true, selectedColor: '#0072bb' },

        })
      }

    }
    console.log('dateArraylist ==> '+JSON.stringify(arraylist))

    const output = Object.assign({}, ...arraylist)
    console.log("output==>>" +this.state.SelectedDate + '-' +JSON.stringify(output))
    this.setState({ used_unused_datelist: output , used_unused_dateArraylist: array })

  }


  
  View_Diary = async (selectedDate) => {
    
    let {used_unused_dateArraylist} = this.state

    console.log('used_unused_dateArraylist ==> '+JSON.stringify(used_unused_dateArraylist))
    let arraylist = [...used_unused_dateArraylist];

    for(var i=0;i<used_unused_dateArraylist.length;i++){                            
      if(used_unused_dateArraylist[i].craving_status == 2){
          console.log('Before craving_date' +  used_unused_dateArraylist[i].craving_date)
  
          used_unused_dateArraylist[i].craving_date= selectedDate   
      console.log('After craving_date' +  used_unused_dateArraylist[i].craving_date)                              
      }
      
  }

  const output = Object.assign({}, ...arraylist)
  console.log("output==>>" +this.state.SelectedDate + '-' +JSON.stringify(output))
  this.setState({ used_unused_datelist: output , used_unused_dateArraylist: arraylist })

  this.CalendarColorSetup(arraylist)

    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const { title, description, image } = this.state;
    this.setState({ isHidden: true, SelectedDate : selectedDate })


    axios
      .post(
        ApiName.show_diary,
        {date: selectedDate },
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        console.log('view show_diary' + JSON.stringify(response))
        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          
          this.setState({diaryList: response.data.data});
          


        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  };


  delete_Diary = async ({ id }) => {
    // let mobile = await AsyncStorage.getItem('UserMobileNo');
    // let Password = await AsyncStorage.getItem('UserPassword');
    let jwt_token = await AsyncStorage.getItem('Login_JwtToken');
    const { title, description, image } = this.state;
    this.setState({ isHidden: true })


    axios
      .post(
        ApiName.delete_diary + id + '/destroy',
        {},
        {
          headers: {
            Authorization: jwt_token,
          },
        },
      )
      .then((response) => {
        this.setState({ isHidden: false })
        if (response.data.status == 200) {

          this.View_calendar();

        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')

      });
  };

  getDate(date) {
    let formatDate = '';
    if (date != '0000-00-00') {
      var dateTime = new Date(date);
      formatDate = dateFormat(dateTime, 'dd MMM');

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
          onPress: () => this.delete_Diary({ id: id }),
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
              fontFamily: 'SFCompactDisplay-Medium',
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
    const { isHidden } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '12%',
              backgroundColor: '#0072BB',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{

                color: '#FFFFFF',

                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),

                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',

              }}>
              Diary
            </Text>
          </View>
          <ScrollView>
            <View>


              <Calendar
                width={'100%'}
                disableAllTouchEventsForDisabledDays={true}
              
                theme={{
                  dayTextColor: '#202020', todayTextColor: '#0072bb', textMonthFontFamily: 'SFCompactDisplay-Semibold', textDayHeaderFontFamily: 'SFCompactDisplay-Medium', monthTextColor: '#0072bb', textDayFontFamily: 'SFCompactDisplay-Regular', arrowColor: '#0072bb',
                 
                  selectedDayBackgroundColor: '#0072bb', selectedDayTextColor: '#ffffff', indicatorColor: '#0072bb',  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14
                }}
                enableSwipeMonths={true}
                onDayPress={(day) => 
                  this.View_Diary(day.dateString)
                  
                }
                //onMonthChange={(month) => Toast.show('Selected Month '+month)}
              
                markedDates={this.state.used_unused_datelist}

              />
              

              <View
                style={{
                  width: responsiveWidth(100),
                  marginTop: 3,
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
                          fontFamily: 'SFCompactDisplay-Medium',
                          fontSize: scalable(15),
                        }}>
                        Your Diary
                      </Text>
                      <Text
                        style={{
                          color: '#202020',
                          fontSize: scalable(13),
                          fontFamily: 'SFCompactDisplay-Regular',
                          marginLeft: blockMarginHalf,
                          marginBottom: blockMarginHalf / 2,
                        }}>
                        You are likely to experience cravings when you are not using
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

              <Text
                  numberOfLines={2}
                  style={{
                    padding: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#555555',
                    fontSize: 14,
                    
                    fontFamily: 'SFCompactDisplay-Semibold',
                  }}>
                  {dateFormat(new Date(this.state.SelectedDate), 'dd MMM yyyy')}
                </Text>


              <View style={{
                height: '100%',
                backgroundColor: '#FFFFFF',
                // height: responsiveHeight(20),
                width: responsiveWidth(100),
             
                marginBottom: responsiveHeight(2),
              }}>


                <View style={{ height: '100%' }}>
                  <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    extraData={this.state}
                    showsVerticalScrollIndicator={true}
                    data={this.state.diaryList}
                    renderItem={({ item }) => (
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
                            marginBottom: responsiveHeight(1),

                            padding: 8,
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
                                fontSize: 10,
                                marginTop: 3, fontFamily: 'SFCompactDisplay-Medium'
                              }}>
                              {this.getDate(item.date)}
                            </Text>
                            <Text style={{ color: '#0072BB', fontSize: 10, fontFamily: 'SFCompactDisplay-Medium' }}>
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
                            <Text style={{ color: '#202020', fontFamily: 'SFCompactDisplay-Semibold' }}>
                              Did you use Tobacco?{'   '}
                              <Text style={styles.card_text1}>
                                {item.last_entry == 1 ? 'Yes' : 'No'}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: '#202020',
                                fontFamily: 'SFCompactDisplay-Semibold',
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
                                fontFamily: 'SFCompactDisplay-Semibold',
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
                              onPress={() => this.deleteDiary(item.code)}>
                              <Image
                                style={{
                                  tintColor:'#000',
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

              </View>



            </View>
          </ScrollView>

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
      </SafeAreaView>
    );
  }
}
