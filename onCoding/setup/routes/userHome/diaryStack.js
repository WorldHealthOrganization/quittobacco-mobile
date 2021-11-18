// Imports
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
//import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import {getRoutesForStack} from '../../helpers/utils';
import ViewDiary from '../../../Diary/View_Diary';
import Diary from '../../../Diary/Diary';

// Routes
export const routesDiary = {
  viewDiary: {
    name: 'ViewDiary',
    path: 'ViewDiary',
    screen: ViewDiary,
  },
  diary: {
    name: 'Diary',
    path: 'Diary',
    screen: Diary,
  },
};

const diaryStack = createStackNavigator(getRoutesForStack(routesDiary), {
  initialRouteName: routesDiary.viewDiary.name, // Initial route name
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

diaryStack.navigationOptions = ({navigation}) => ({
  // tabBarVisible: false
  tabBarVisible: !navigation.state.index > -1,
});

export default diaryStack;
