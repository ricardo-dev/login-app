import {createStackNavigator} from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';

export default createStackNavigator(
    {
        Login,
        Main,
    }
);