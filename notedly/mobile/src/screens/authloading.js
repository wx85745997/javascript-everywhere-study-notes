import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Loading from '../components/Loading';

const AuthLoadingScreen = props => {
    const checkLoginStat = async () => {
        // 获取令牌的值
        const userToken = await SecureStore.getItemAsync('token');
        // 如果存在令牌，导航到应用主界面
        // 否则，导航到身份验证界面
        props.navigation.navigate(userToken ? 'App' : 'Auth')
    }
    // 挂载组件后立即调用 checkLoginState
    useEffect(() => {
        checkLoginStat();
    })
    return <Loading />
}


export default AuthLoadingScreen;