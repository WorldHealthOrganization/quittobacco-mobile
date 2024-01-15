// Imports
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
//import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import {getRoutesForStack} from '../../helpers/utils';
//import Dashboard from '../../../pages/serviceprovider/UploadDocuments';
import Dashboard from '../../../Dashboard/Dashboard';
import Settings from '../../../Settings/Settings';
import Benefits from '../../../Benefits/Benefits';
import Money_Saved from '../../../Money_Saved/Money_Saved';
import View_Wishlist from '../../../Wish_list/View_Wishlist';
import Health_Improvements from '../../../Health_Improvements/Health';
import Add_Motivation from '../../../Motivation/Add_Motivation';
import List_Motivation from '../../../Motivation/List_Motivation';
import Achievements from '../../../Achievements/index';
import Wish_list from '../../../Wish_list/Wish_list';
import Edit_Wishlist from '../../../Wish_list/Edit_Wishlist';
import PlanListing from '../../../Plan_Listing/index';
import List_Members from '../../../List_Members/index';
import AboutUs from '../../../About_this_App/About';
import Feedback from '../../../Feedback/index';
import Difficult_Situations from '../../../Difficult_Situations/index';
import Tobacco_Diseases from '../../../Tobacco_Diseases/index';
import Privacy_Policy from '../../../Privacy_Policy/index';
import Terms_And_Conditions from '../../../Terms_And_Conditions/index';
import References from '../../../References/index';
import Members from '../../../Members/index';
import Update_Members from '../../../Update_Members/index';
import ManageCravings from '../../../Cravings/Manage_Cravings/index';
import Change_tobacco_data from '../../../Change_tobacco_data/index';
import Notification_Settings from '../../../Notifications/Notifications';
import Quit_Reasons from '../../../Quit_Reasons/Quit_Reasons';

// Routes
export const routesDashboard = {
  dashboard: {
    name: 'Dashboard',
    path: 'Dashboard',
    screen: Dashboard,
  },
  benefits: {
    name: 'Benefits',
    path: 'Benefits',
    screen: Benefits,
  },
  money_saved:{
    name: 'Money_Saved',
    path: 'Money_Saved',
    screen: Money_Saved,
  },
  view_wishlist:{
    name: 'View_Wishlist',
    path: 'View_Wishlist',
    screen: View_Wishlist,
  },
  wish_list:{
    name: 'Wish_list',
    path: 'Wish_list',
    screen: Wish_list,
  },
  edit_wishlist:{
    name: 'Edit_Wishlist',
    path: 'Edit_Wishlist',
    screen: Edit_Wishlist,
  },
  plan_listing:{
    name: 'PlanListing',
    path: 'PlanListing',
    screen: PlanListing,
  },
  health_improvements:{
    name: 'Health_Improvements',
    path: 'Health_Improvements',
    screen: Health_Improvements,
  },
  add_motivation:{
    name: 'Add_Motivation',
    path: 'Add_Motivation',
    screen: Add_Motivation,
  },
  list_motivation:{
    name: 'List_Motivation',
    path: 'List_Motivation',
    screen: List_Motivation,
  },
  list_members:{
    name: 'List_Members',
    path: 'List_Members',
    screen: List_Members,
  },
  members:{
    name: 'Members',
    path: 'Members',
    screen: Members,
  },
  update_members:{
    name: 'Update_Members',
    path: 'Update_Members',
    screen: Update_Members,
  },
  manageCravings: {
    name: 'ManageCravings',
    path: 'ManageCravings',
    screen: ManageCravings,
  },
  achievements:{
    name: 'Achievements',
    path: 'Achievements',
    screen: Achievements,
  },
  settings: {
    name: 'Settings',
    path: 'Settings',
    screen: Settings,
  },
  change_tobacco_data: {
    name: 'Change_tobacco_data',
    path: 'Change_tobacco_data',
    screen: Change_tobacco_data,
  },
  notification_settings: {
    name: 'Notification_Settings',
    path: 'Notification_Settings',
    screen: Notification_Settings,
  },
  aboutus: {
    name: 'AboutUs',
    path: 'AboutUs',
    screen: AboutUs,
  },
  feedback: {
    name: 'Feedback',
    path: 'Feedback',
    screen: Feedback,
  },
  difficult_situations: {
    name: 'Difficult_Situations',
    path: 'Difficult_Situations',
    screen: Difficult_Situations,
  },
  tobacco_diseases: {
    name: 'Tobacco_Diseases',
    path: 'Tobacco_Diseases',
    screen: Tobacco_Diseases,
  },
  privacy_policy: {
    name: 'Privacy_Policy',
    path: 'Privacy_Policy',
    screen: Privacy_Policy,
  },
  terms_and_conditions: {
    name: 'Terms_And_Conditions',
    path: 'Terms_And_Conditions',
    screen: Terms_And_Conditions,
  },
  references: {
    name: 'References',
    path: 'References',
    screen: References,
  },
  Quit_Reasons: {
    name: 'Quit_Reasons',
    path: 'Quit_Reasons',
    screen: Quit_Reasons,
  }
};

const dashboardStack = createStackNavigator(getRoutesForStack(routesDashboard), {
  initialRouteName: routesDashboard.dashboard.name, // Initial route name
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

dashboardStack.navigationOptions = ({navigation}) => ({
  // tabBarVisible: false
  tabBarVisible: !navigation.state.index > -1,
});

export default dashboardStack;
