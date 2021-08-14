import React from 'react';
import { Button, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import UserForm from '../components/UserForm'
import Loading from '../components/Loading'

const SIGNUP_USER = gql`
    mutation signUp($email:String! ,$password:String!, $username:String!){
        signUp(email:$email,password:$password,username:$username)
    }
`

const SignUp = props => {
    // 把令牌存储在`token`键名下
    // 存储令牌之后导航到应用的主界面
    const storeToken = (token) => {
        SecureStore.setItemAsync('token', token).then(props.navigation.navigate('App'))
    }

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            storeToken(data.signUp)
        }
    })

    if (loading) return <Loading />
    return (
        <React.Fragment>
            {error && <Text>Error signing in!</Text>}
            <UserForm action={signUp} formType="signUp" navigation={props.navigation} />
        </React.Fragment>
    )
}

SignUp.navigationOptions = {
    title: 'Register'
}

export default SignUp;