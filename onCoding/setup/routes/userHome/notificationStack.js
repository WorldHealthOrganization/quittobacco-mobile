// Imports
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
//import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import {getRoutesForStack} from '../../helpers/utils';
import PushNotifications from '../../../Push_Notifications/index';
import Add_Cravings from '../../../Cravings/Add_Cravings/index';
import Achievements from '../../../Achievements/index';
// Routes
export const routesNotification = {
  pushNotifications: {
    name: 'PushNotifications',
    path: 'PushNotifications',
    screen: PushNotifications,
  },
  addCravings: {
    name: 'Add_Cravings',
    path: 'Add_Cravings',
    screen: Add_Cravings,
  },
  achievements:{
    name: 'Achievements',
    path: 'Achievements',
    screen: Achievements,
  },
};

const notificationStack = createStackNavigator(getRoutesForStack(routesNotification), {
  initialRouteName: routesNotification.pushNotifications.name, // Initial route name
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      return StackViewStyleInterpolator.forHorizontal(sceneProps);
    },
  }),
});

notificationStack.navigationOptions = ({navigation}) => ({
  // tabBarVisible: false
  tabBarVisible: !navigation.state.index > -1,
});

export default notificationStack;
