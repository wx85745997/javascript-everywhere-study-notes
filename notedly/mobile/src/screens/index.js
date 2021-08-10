import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// 增加导入 createStackNavigator语句
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// 导入界面组件
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';

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
    }
})

// 创建应用容器
export default createAppContainer(TabNavigator)