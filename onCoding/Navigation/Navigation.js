/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
//import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
//import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';  
import Dashboard from '../Dashboard/Dashboard';
import Diary from '../Diary/View_Diary';
import Plan_Listing from '../Plan_Listing/index';
import Manage_Cravings from '../Cravings/Manage_Cravings/index';
import Push_Notifications from '../Push_Notifications/index';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer style={{height: 65, backgroundColor: '#FFFFFF'}}>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => (
              <Feather name="home" color={color} size={22} />
            ),
          })}
          tabBarOptions={{
            activeTintColor: '#0072BB',
            inactiveTintColor: '#B6C0CB',
            backgroundColor: '#FFFFFF',
            labelStyle: {
              fontSize: 12,
              paddingStart: 2,
              paddingEnd: 2,
              paddingTop:3,
              paddingBottom:5
            },
            tabStyle: {
              width: 'auto',
              height: 'auto',
            },
            style: {
              height: 60,
             
            },
          }}>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({color, size}) => (
                <Feather name="home" color={color} size={22} />
              ),
            }}
          />

          <Tab.Screen
            name="Diary"
            component={Diary}
            options={{
              tabBarLabel: 'Diary',
              tabBarIcon: ({color, size}) => (
                <Feather name="award" color={color} size={22} />
              ),
            }}
          />

          <Tab.Screen
            name="Cravings"
            component={Manage_Cravings}
            options={{
              tabBarLabel: 'Cravings',
              tabBarIcon: ({color, size}) => (
                <Feather name="bar-chart-2" color={color} size={22} />
              ),
            }}
          />

          <Tab.Screen
            name="Plans"
            component={Plan_Listing}
            options={{
              tabBarLabel: 'Plans',
              fontSize: 14,
              tabBarIcon: ({color, size}) => (
                <Feather name="award" color={color} size={22} />
              ),
            }}
          />

          <Tab.Screen
            name="Notifications"
            component={Push_Notifications}
            options={{
              tabBarLabel: 'Notifications',
              fontSize: 14,
              tabBarIcon: ({color, size}) => (
                <Feather name="bell" color={color} size={22} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbarStyle: {
    backgroundColor: '#FFFFFF',
  },
});


// class Notifications extends React.Component {

//     render() {
//       return (
//         <View style={styles.container}>
//        <Text>
//         Notification Screen
//       </Text>

//     </View>
//       );
//     }
//   }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     Home: {
//       screen: Dashboard,
//       navigationOptions: {
//         tabBarLabel: 'Dashboard',
//         tabBarIcon: ({tintColor}) => (
//           <View>
//              <Feather style={[{color: tintColor}]} size={22} name={'gitlab'}/>  
          
//           </View>
//         ),
       
//       },
//     },
//     Profile: {
//       screen: Diary,
//       navigationOptions: {
//         tabBarLabel: 'Diary',
//         tabBarIcon: ({tintColor}) => (
//           <View>
//              <Feather style={[{color: tintColor}]} size={22} name={'book'}/> 
//           </View>
//         ),
               
//       },
//     },
//     Image: {
//       screen: ImageScreen,
//       navigationOptions: {
//         tabBarLabel: 'Cravings',
//         tabBarIcon: ({tintColor}) => (
//           <View>
//            <Feather style={[{color: tintColor}]} size={22} name={'bar-chart-2'}/> 
//           </View>
//         ),
      
//       },
//     },
//     Cart: {
//       screen: CartScreen,
//       navigationOptions: {
//         tabBarLabel: 'Plans',
//         tabBarIcon: ({tintColor}) => (
// <View>
// <Feather style={[{color: tintColor}]} size={22} name={'award'}/>  

//           </View>        ),
       
//       },
//     },
//     Notification: {
//         screen: Notifications,
//         navigationOptions: {
//           tabBarLabel: 'Notification',
//           tabBarIcon: ({tintColor}) => (

// <View>
//  <Feather style={[{color: tintColor}]} size={22} name={'bell'}/>  
//           </View>
//           ),
        
//         },
//       },
//   },
//   {
//     initialRouteName: 'Home',
//     barStyle: {backgroundColor: '#FFFFFF'},
//     tabBarOptions: { showLabel: false , activeColor: '#0072BB', tintColor: '#0072BB',
//     inactiveColor: '#B6C0CB',animationEnabled: false,},
    
//   },
  
// );

//export default createAppContainer(TabNavigator);
