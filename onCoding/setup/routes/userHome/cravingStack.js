// Imports
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
//import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import {getRoutesForStack} from '../../helpers/utils';
import ManageCravings from '../../../Cravings/Manage_Cravings/index';
import Add_Cravings from '../../../Cravings/Add_Cravings';
import Analyse_Cravings from '../../../Cravings/Analyse_Craving/index'
import Add_Diary from '../../../Diary/Diary'

// Routes
export const routesCraving = {
  manageCravings: {
    name: 'ManageCravings',
    path: 'ManageCravings',
    screen: ManageCravings,
  },
  addCravings: {
    name: 'Add_Cravings',
    path: 'Add_Cravings',
    screen: Add_Cravings,
  },
  analyseCravings: {
    name: 'Analyse_Cravings',
    path: 'Analyse_Cravings',
    screen: Analyse_Cravings,
  },
  addDiary: {
    name: 'Add_Diary',
    path: 'Add_Diary',
    screen: Add_Diary,
  },
};

const cravingStack = createStackNavigator(getRoutesForStack(routesCraving), {
  initialRouteName: routesCraving.manageCravings.name, // Initial route name
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

cravingStack.navigationOptions = ({navigation}) => ({
  // tabBarVisible: false
  tabBarVisible: !navigation.state.index > -1,
});

export default cravingStack;
