import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Settings = props => {
    // 删除令牌，然后导航到身份验证界面
    const signOut = () => {
        SecureStore.deleteItemAsync('token').then(
            props.navigation.navigate('Auth')
        )
    }
    return (
        <View>
            <Button title="Sign out" onPress={signOut}></Button>
        </View>
    )
}

Settings.navigationOptions = {
    title: 'Settings'
}

export default Settings;