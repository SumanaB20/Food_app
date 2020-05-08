import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import FoodItemScreen from '../screens/FoodItem/FoodItemScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';

const MainNavigator = createStackNavigator (
  {
    FoodItem: FoodItemScreen,
    Categories: CategoriesScreen,
  },
  {
    initialRouteName: 'Categories',
    // headerMode: 'float',
    defaulfNavigationOptions: ({navigation}) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
      },
    }),
  }
);

const DrawerStack = createDrawerNavigator (
  {
    Main: MainNavigator,
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer,
  }
);

export default (AppContainer = createAppContainer (DrawerStack));

console.disableYellowBox = true;
