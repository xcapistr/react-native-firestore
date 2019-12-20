import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import MainScreen from '../screens/MainScreen'

const MainNavigator = createBottomTabNavigator({
	Songs: MainScreen
})

export default createAppContainer(MainNavigator)