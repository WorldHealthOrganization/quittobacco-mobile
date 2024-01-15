// Imports
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
//import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import {getRoutesForStack} from '../../helpers/utils';
import PlanListing from '../../../Plan_Listing/index';
import Plans from '../../../Plans/index';

// Routes
export const routesPlan = {
  planListing: {
    name: 'PlanListing',
    path: 'PlanListing',
    screen: PlanListing,
  },
  plans: {
    name: 'Plans',
    path: 'Plans',
    screen: Plans,
  },

};

const planStack = createStackNavigator(getRoutesForStack(routesPlan), {
  initialRouteName: routesPlan.planListing.name, // Initial route name
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

planStack.navigationOptions = ({navigation}) => ({
  // tabBarVisible: false
  tabBarVisible: !navigation.state.index > -1,
});

export default planStack;
