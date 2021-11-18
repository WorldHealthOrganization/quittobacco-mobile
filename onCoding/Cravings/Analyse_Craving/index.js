import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import ApiName from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../../ui/common/responsive';
import { Container, Tab, Tabs } from 'native-base';

import Craving_Graphs from '../Analyse_Craving/CravingTabs/Craving_Graphs'
import Craving_List from '../Analyse_Craving/CravingTabs/Craving_List'
import Craving_Triggers from '../Analyse_Craving/CravingTabs/Craving_Triggers'
import { borderRadius } from 'react-select/src/theme';
import PureChart from 'react-native-pure-chart';
import { it } from 'date-fns/locale';
import Toast from 'react-native-simple-toast';
import dateFormat from 'date-fns/format';

const defaultConfig = {
  grid: {
    visible: false,
    backgroundColor: '#fff',
    strokeWidth: 1,
    strokeColor: '#ededed',
    stepSize: 15,
  },
  line: {
    visible: false,
    strokeWidth: 1,
    strokeColor: '#333',
  },
  area: {
    visible: true,
    gradientFrom: '#be2ddd',
    gradientFromOpacity: 1,
    gradientTo: '#e056fd',
    gradientToOpacity: 0.4,
  },
  yAxis: {
    visible: true,
    labelFontSize: 12,
    labelColor: '#777',
    labelFormatter: (v) => String(v),
  },
  xAxis: {
    visible: false,
    labelFontSize: 12,
    labelColor: '#777',
  },
  tooltip: {
    visible: false,
    labelFormatter: (v) => v.toFixed(2),
    lineColor: '#777',
    lineWidth: 1,
    circleColor: '#fff',
    circleBorderColor: '#fff',
    circleBorderWidth: 1,
    boxColor: '#fff',
    boxBorderWidth: 1,
    boxBorderColor: '#FFFFFF',
    boxBorderRadius: 5,
    boxPaddingY: 0,
    boxPaddingX: 0,
    labelColor: 'black',
    labelFontSize: 10,
  },
  dataPoint: {
    visible: false,
    color: '#777',
    radius: 5,
    label: {
      visible: false,
      labelFontSize: 12,
      labelColor: '#777',
      labelFormatter: (v) => String(v),
      marginBottom: 25,
    },
  },
  insetY: 0,
  insetX: 0,
  interpolation: 'none',
  backgroundColor: '#fff',
  backgroundOpacity: 1,
};

const ListHeader = () => {
  //View to set in Header
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        borderTopLeftRadius: blockMargin,
        borderTopRightRadius: blockMargin,
        backgroundColor: '#CBE2F1',
        alignSelf: 'center'

      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',


        }}>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            color: '#0072BB',
            fontFamily: 'SF-Medium',
            textAlign: 'center',
            fontSize: 14,
          }}>

          {'DATE'}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '30%',
            color: '#0072BB',
            fontFamily: 'SF-Medium',
            textAlign: 'center',
            fontSize: 14,
          }}>

          {'TRIGGERS'}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            width: '40%',
            color: '#0072BB',
            fontFamily: 'SF-Medium',
            textAlign: 'center',
            fontSize: 14,
          }}>

          {'CRAVINGS LEVEL'}
        </Text>
      </View>
    </View>
  );
};


const ListHeaderDouble = () => {
  //View to set in Header
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        borderTopLeftRadius: blockMargin,
        borderTopRightRadius: blockMargin,
        backgroundColor: '#CBE2F1',
        alignSelf: 'center'

      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',


        }}>
        <Text
          numberOfLines={1}
          style={{
            width: '50%',
            color: '#0072BB',
            fontFamily: 'SF-Medium',
            textAlign: 'center',
            fontSize: 14,
          }}>

          {'DATE'}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            width: '50%',
            color: '#0072BB',
            fontFamily: 'SF-Medium',
            textAlign: 'center',
            fontSize: 14,
          }}>

          {'CRAVINGS LEVEL'}
        </Text>
      </View>
    </View>
  );
};


const EmptyListMessage = ({ item }) => {
  return (
    // Flat List Item
    <View
      style={{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0072BB',
        borderBottomLeftRadius: blockMargin,
        borderBottomRightRadius: blockMargin,
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '100%',
          fontFamily: 'SF-Medium',
          textAlign: 'center',
          color: '#ededed',
          fontSize: 16,
        }}>
        {' '}
        {'No Data Found'}{' '}
      </Text>
    </View>
  );
};

const ItemView = ({ item }) => {
  return (
    // Flat List
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0072BB',
        paddingTop: blockMargin
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '30%',
          textAlign: 'left',
          color: '#ffffff',
          fontFamily: 'SF-Regular',
          textAlign: 'center',
          fontSize: 14,
        }}>
       {getDateTime(item.created_at)
        }
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '30%',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'SF-Regular',
          textAlign: 'center',
          fontSize: 14,
        }}>
        {item.trigger}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: '40%',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'SF-Regular',
          textAlign: 'center',
          fontSize: 14,
        }}>
         {item.tobacco_rating == 0 ? 'LOW' : item.tobacco_rating == 1 ? 'MODERATE' : 'HIGH'}
      </Text>
    </View>
  );
};

const getDateTime = (daaa) => {
  let ddd = daaa;
        console.log('dateeeeee ==> '+dateFormat(new Date(ddd*1000),'dd MMM yyyy'));
        return dateFormat(new Date(ddd*1000),'dd MMM yyyy');
}

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




const ItemViewDouble = ({ item }) => {
  return (
    // Flat List
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0072BB',
        paddingTop: blockMarginHalf
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '50%',
          textAlign: 'left',
          color: '#ffffff',
          fontFamily: 'SF-Regular',
          textAlign: 'center',
          fontSize: 14,
        }}>
        {getDateTime(item.date)
        }
      </Text>

      <Text
        numberOfLines={1}
        style={{
          width: '50%',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'SF-Regular',
          textAlign: 'center',
          fontSize: 14,
        }}>
        {item.tobacco_rating == 0 ? 'LOW' : item.tobacco_rating == 1 ? 'MODERATE' : 'HIGH'}
      </Text>
    </View>
  );
};

export default class Analyse_Cravings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ' ',
      isHidden: false,
      isSelected: 0,
      listCraving: [],
      triggerCraving: [],
       cravingGraphData : []
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

      this.CravingGraph()
      this.Cravinglist()
      this.CravingTriggerlist()
    }
  };

  
  CravingGraph = async () => {
 
    const { token } = this.state
    console.log('input ==> ' + token  + ' ' + ApiName.graph_craving);
    
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.graph_craving, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Craving Graph response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));
let obj = [];
          for (var i=0;i<response.data.data.length;i++) {
            obj.push({
              x:getDateTime(response.data.data[i].date),y:response.data.data[i].y
            })
          }
          this.setState({
           cravingGraphData: obj,
           
          });

         
          this.setState({ isHidden: false })
        }
        else {
          this.setState({ isHidden: false })
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }
  
  Cravinglist = async () => {
 
    const { token } = this.state
    console.log('input ==> ' + token  + ' ' + ApiName.list_craving);
    
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.list_craving, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Craving List High response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.setState({
            
           listCraving:response.data.data
      
          });

         
          this.setState({ isHidden: false })
        }
        else {
          this.setState({ isHidden: false })
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }

  CravingTriggerlist = async () => {
 
    const { token } = this.state
    console.log('input ==> ' + token  + ' ' + ApiName.trigger_craving);
    
    this.setState({ isHidden: true })
    axios
      .post(
        ApiName.trigger_craving, {},
        {
          headers: {
            'Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(
          'Craving Trigger response ',
          'response get details:==> ' + JSON.stringify(response.data),
        );


        if (response.data.status == 200) {
          console.log(JSON.stringify(response.data));

          this.setState({
            triggerCraving: response.data.data,
           
      
          });

         
          this.setState({ isHidden: false })
        }
        else {
          this.setState({ isHidden: false })
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.setState({ isHidden: false })
        Toast.show('There was some error. Please try again')
        console.log('reactNativeDemo axios error:', error);
      });
  }

  render() {

    const { isHidden } = this.state;

    const ListFooter = () => {
      //View to set in Header
      if(this.state.listCraving.length > 0){
        return (
          <View
            style={{
              width: '100%',
              height: blockMargin,
              flexDirection: 'row',
              borderBottomLeftRadius: blockMargin,
              borderBottomRightRadius: blockMargin,
              backgroundColor: '#0072BB',
              alignSelf: 'center'
      
            }}>
            <View
              style={{
                width: '100%',
                height: blockMarginHalf,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
      
      
              }} />
      
          </View>
        );
      }else{
        return (
          <View></View>
          );
      }
    };

    const TriggerListFooter = () => {
      //View to set in Header
      if(this.state.triggerCraving.length > 0){
        return (
          <View
            style={{
              width: '100%',
              height: blockMargin,
              flexDirection: 'row',
              borderBottomLeftRadius: blockMargin,
              borderBottomRightRadius: blockMargin,
              backgroundColor: '#0072BB',
              alignSelf: 'center'
      
            }}>
            <View
              style={{
                width: '100%',
                height: blockMarginHalf,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
      
      
              }} />
      
          </View>
        );
      }else{
        return (
          <View></View>
          );
      }
    };
    return (
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: deviceWidth,
          flexDirection: 'column',
        }}>

        <View style={{ flexDirection: 'row', width: '100%', height: responsiveHeight(10), backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center' }}>


          <Text style={{
            width: '100%', color: '#FFFFFF',
            fontFamily: 'SF-Medium',
            fontSize: scalable(18),
            justifyContent: 'center',
            textAlign: 'center',
          }}>Analyse Cravings</Text>


          <TouchableOpacity style={{
            width: '12%', left: 0, position: 'absolute',
            height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
          }} onPress={() => this.props.navigation.goBack()}>

            <Image style={{
              width: responsiveWidth(3),
              height: responsiveHeight(4),

              alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
              resizeMode: 'contain'
            }} source={require('../../../images/back_arrow.png')} />

          </TouchableOpacity>


        </View>


        <View style={{ flexDirection: 'row', backgroundColor: '#0072BB', height: 45, alignItems: 'center', justifyContent: 'center', paddingBottom: blockMarginHalf }}>


          <View style={{ flexDirection: 'column', width: '34%' }}>
            <TouchableOpacity
              onPress={() => this.setState({ isSelected: 0 })}
              style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color:
                    this.state.isSelected == 0 ? '#FFFFFF' : '#BBBBBB',
                  fontSize: 15,
                  fontFamily: 'SF-Medium',
                  textAlign: 'center',
                }}>
                GRAPH
                      </Text>

            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', width: '33%' }}>
            <TouchableOpacity
              onPress={() => this.setState({ isSelected: 1 })}
              style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color:
                    this.state.isSelected == 1 ? '#FFFFFF' : '#BBBBBB',
                  fontSize: 15,
                  fontFamily: 'SF-Medium',
                  textAlign: 'center',
                }}>
                LIST
                      </Text>

            </TouchableOpacity>
          </View>



          <View style={{ flexDirection: 'column', width: '33%' }}>
            <TouchableOpacity
              onPress={() => this.setState({ isSelected: 2 })}
              style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color:
                    this.state.isSelected == 2 ? '#FFFFFF' : '#BBBBBB',
                  fontSize: 15,
                  fontFamily: 'SF-Medium',
                  textAlign: 'center',
                }}>
                TRIGGERS
                      </Text>

            </TouchableOpacity>
          </View>
        </View>


        <ScrollView  style={{marginTop:blockMarginHalf}} keyboardShouldPersistTaps={'handled'}>
              <View style={{ justifyContent: 'center' }}>

              {this.state.isSelected == 0 &&
          <View
            style={{
              width: '100%',
              margin: blockMargin * 2,

              alignSelf: 'center',
            }}>
       

       <View >
         
       <View style={{
                    flexDirection: 'row',
                    height: 250,
                    width: '80%',
                  
                    alignSelf:'center', 
                   justifyContent:'center'
                  }}>

                    {this.state.cravingGraphData.length > 0 ?   <PureChart data={ this.state.cravingGraphData}
                 type='line'   
                color={'#0072bb'}
                numberOfYAxisGuideLine={5}
  height={200} 
  /> : 
  <View style={{width:'80%',
  height : 200, alignSelf:'center',
  alignItems:'center',
  justifyContent:'center',}}><Text
  style={{
    
    color: '#222222',
    fontSize: 15,
    fontFamily: 'SF-Semibold',
    textAlign: 'center',
   
  
  }}>{isHidden ? '' : ' No Analysis Yet' }
 
          </Text></View>
}
              
         
  </View>
           

<View style={{
            flexDirection: 'row', top: 0,end:0 ,position:'absolute',
            alignItems: 'center', justifyContent: 'center',  alignSelf: 'center',marginRight:blockMargin
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Add_Cravings')}>
              <View style={{
                width: 50,
                height: 50,
                borderStyle: 'dotted',
                borderRadius: 100 / 2,
                backgroundColor: '#FFFFFF',
                opacity: 100,
                borderWidth: 2,
                borderColor: '#0072bb',
                justifyContent: 'center'
              }}>
                <Image

                  resizeMode='contain'
                  source={require('../../../images/add.png')}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',

                    justifyContent: 'center',

                    alignSelf: 'center',
                    borderRadius: 100 / 2,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
      </View>
<View
              style={{
                marginTop: blockMargin,
                width: '70%',
                height: 50,
                backgroundColor:'#0072BB',
                alignSelf:'center',
                justifyContent:'center',
                alignItems:'center',
                borderRadius: 25
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add_Diary')}>
               
                <Text style={{color: '#FFFFFF',textAlign:'center',
    fontFamily: 'SF-Medium',
    fontSize: scalable(15),}}>Add Diary</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        {this.state.isSelected == 2 &&
          <View
            style={{
              width: '90%',
              margin: blockMargin * 2,

              alignSelf: 'center',
            }}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.triggerCraving}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              //Header to show above listview
              ListHeaderComponent={ListHeader}
              //Footer to show below listview
              ListFooterComponent={TriggerListFooter}
              renderItem={ItemView}
              ListEmptyComponent={EmptyListMessage}
            />
          </View>
        }


        {this.state.isSelected == 1  &&
          <View
            style={{
              width: '100%',
              margin: blockMargin * 1.5,

              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#222222',
                fontSize: 15,
                fontFamily: 'SF-Semibold',
                textAlign: 'center',
              }}>
              Days when your cravings were high
                      </Text>

            <View
              style={{
                width: '90%',
                margin: blockMargin * 1.5,

                alignSelf: 'center',
              }}>
              <FlatList
                style={{ width: '100%' }}
                data={this.state.listCraving}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                //Header to show above listview
                ListHeaderComponent={ListHeaderDouble}
                //Footer to show below listview
                ListFooterComponent={ListFooter}
                renderItem={ItemViewDouble}
                ListEmptyComponent={EmptyListMessage}
              />
            </View>
          </View>}
     
     </View>

     {isHidden ? (
            <View style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'transparent'
            }}>
              <ActivityIndicator
                size={40}
                color="#0072bb"
                animating={true}
                backgroundColor={'transparent'}
              />
            </View>
          ) : null}
     </ScrollView>
      </View>


    );
  }
}


