import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import DashboardStack from './dashboardStack';
import PlanStack from './planStack';
import DiaryStack from './diaryStack';
import CravingStack from './cravingStack';
import NotificationStack from './notificationStack';

import {getRoutesForStack} from '../../helpers/utils';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export const routesUserHome = {
  // Dashboard
  dashboardHome: {
    name: 'Dashboard',
    path: 'Dashboard',
    screen: DashboardStack,
    navigationOptions: {
      title: 'Dashboard',
      headerTitle: 'Dashboard',
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({tintColor, size}) => (
        <Feather name="home" color={tintColor} size={22} />
      ),
    },
  },

  // Diary
  diaryHome: {
    name: 'Diary',
    path: 'Diary',
    screen: DiaryStack,
    navigationOptions: {
      tabBarLabel: 'Diary',
      tabBarIcon: ({tintColor, size}) => (
        <Feather name="book" color={tintColor} size={22} />
      ),
    },
  },

  // Cravings
  cravingsHome: {
    name: 'Cravings',
    path: 'Cravings',
    screen: CravingStack,
    navigationOptions: {
      tabBarLabel: 'Cravings',
      tabBarIcon: ({tintColor, size}) => (
        <Feather name="bar-chart-2" color={tintColor} size={22} />
      ),
    },
  },

  // Plans
  plansHome: {
    name: 'Plans',
    path: 'Plans',
    screen: PlanStack,
    navigationOptions: {
      tabBarLabel: 'Plans',
      tabBarIcon: ({tintColor, size}) => (
        <Feather name="award" color={tintColor} size={22} />
      ),
    },
  },

   // Notifications
   notificationHome: {
    name: 'Notifications',
    path: 'Notifications',
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({tintColor, size}) => (
        <Feather name="bell" color={tintColor} size={22} />
      ),
    },
  },
};

const bottomTab = createBottomTabNavigator(getRoutesForStack(routesUserHome), {
  initialRouteName: routesUserHome.dashboardHome.name,
  navigationOptions: {
    tabBarVisible: true,
    tabBarColor: 'green',
    backgroundColor: 'white',
  },
  tabBarOptions: {
    activeTintColor: '#0072BB',
    inactiveTintColor: '#B6C0CB',
    backgroundColor: '#FFFFFF',
   
    showLabel: true,
    indicatorStyle: {
      backgroundColor: 'white',
    },
    style: {
      backgroundColor: 'white',
      overflow: 'hidden',
      height: 60,
    },
    tabStyle: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      width: 'auto',
      height: 'auto',
    },
    labelStyle: {
      fontSize: 12,
      paddingStart: 2,
      paddingEnd: 2,
      paddingTop:3,
      paddingBottom:5
    },
  },
});

export default bottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabbarStyle: {
    backgroundColor: '#FFFFFF',
  },
});
