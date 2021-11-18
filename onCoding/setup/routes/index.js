// Imports
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Splash from '../../splash/Splash';

import Walkthrough from '../../Walkthrough_Screen1/Walkthrough';
import Walkthrough1 from '../../Walkthrough_Screen1/Walkthrough_screen_1';
import Walkthrough2 from '../../Walkthrough_Screen2/Walkthrough_screen_2';
import Walkthrough3 from '../../Walkthrough_Screen3/Walkthrough_screen_3';

import Login from '../../login/Login';
import CreateAccount from '../../CreateAccount/CreateAccount';
import OTP_Verification from '../../OTP/OTP_Verification';
import forgot_pwd from '../../forgot_password/forgot_pwd';
import Change_pwd from '../../Change_pwd/Change_pwd';
import Questionare_Screen1 from '../../Questionare_Screen1/Questionare_Screen1';
import Welcome from '../../Welcome/Welcome';
import Questionare_Screen4 from '../../Questionare_Screen4/Questionare_Screen4';
import Transparent_page from '../../Transparent_page/Transparent_page';
import Questionare_Screen5 from '../../Questionare_Screen5/Questionare_Screen5';
import Disclaimer from '../../Disclaimer/Disclaimer';
import Settings from '../../Settings/Settings';

import UserHome from './userHome';


const OnBoardStack = createStackNavigator(
  {
    Walkthrough: {
      screen: Walkthrough,
    },
    Walkthrough1: {
      screen: Walkthrough1,
    },
    Walkthrough2: {
      screen: Walkthrough2,
    },
    Walkthrough3: {
      screen: Walkthrough3,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);


const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    CreateAccount: {
      screen: CreateAccount,
    },
    OTP_Verification: {
      screen: OTP_Verification,
    },
    forgot_pwd: {
      screen: forgot_pwd,
    },
    Change_pwd: {
      screen: Change_pwd,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const QuestionareStack = createStackNavigator(
  {
    Questionare_Screen1: {
      screen: Questionare_Screen1,
    },
    Welcome: {
      screen: Welcome,
    },
    Questionare_Screen4: {
      screen: Questionare_Screen4,
    },
    Transparent_page: {
      screen: Transparent_page,
    },
    Questionare_Screen5: {
      screen: Questionare_Screen5,
    },
    Disclaimer: {
      screen: Disclaimer,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    OnBoardStack: OnBoardStack,
    LoginStack: LoginStack,
    QuestionareStack: QuestionareStack,
    UserHome: UserHome,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(AppNavigator);
