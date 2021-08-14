import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// 增加导入 createStackNavigator语句
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AuthLoading from './authloading';
import SignIn from './signin';
import SignUp from './signup';
import Settings from './settings';

// 导入界面组件
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';


const AuthStack = createStackNavigator({
    SignIn: SignIn,
    SignUp: SignUp
})

const SettingsStack = createStackNavigator({
    Settings: Settings
})

const FeedStack = createStackNavigator({
    Feed: Feed,
    Note: NoteScreen
})

const MyStack = createStackNavigator({
    MyNotes: MyNotes,
    Note: NoteScreen
})

const FavStack = createStackNavigator({
    Favorites: Favorites,
    Note: NoteScreen
})


const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={24} color={tintColor} />
            )
        }
    },
    MyNoteScreen: {
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: 'My Notes',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
            )
        }
    },
    FavoritesScreen: {
        screen: FavStack,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="star" size={24} color={tintColor} />
            )
        }
    },
    settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="settings" size={24} color={tintColor} />
            )
        }
    }
})


const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        App: TabNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

// 创建应用容器
export default createAppContainer(SwitchNavigator)