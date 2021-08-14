import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';

const FormButton = styled.TouchableOpacity`
        background:#0077cc;
        width: 100%;
        padding:8px;
`

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`

const FormView = styled.View`
        padding:10px;
`

const StyledInput = styled.TextInput`
        border:1px solid gray;
        font-size: 18px;
        padding:10px;
        margin-bottom:10px;
`

const FormLabel = styled.Text`
        font-size:18px;
        font-weight: bold;
`

const SignUp = styled.TouchableOpacity`
    margin-top:20px;
`

const Link = styled.Text`
    color:#0077cc;
    font-weight:bold;
`

const UserForm = props => {
    // 表单元素的状态
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const handleSubmit = () => {
        // 用户点击表单中的按钮后调用这个函数
        props.action({
            variables: {
                email: email,
                password: password,
                username: username,
            }
        })
    }
    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput onChangeText={text => setEmail(text)} value={email} textContentType="emailAddress" autoCompleteType="email" autoFocus={true} autoCapitalize="none" />
            {props.formType === 'signUp' && (
                <View>
                    <FormLabel>username</FormLabel>
                    <StyledInput onChangeText={text => setUsername(text)} value={username} textContentType="username" utoCapitalize="none" />
                </View>
            )}
            <FormLabel>Password</FormLabel>
            <StyledInput onChangeText={text => setPassword(text)} value={password} textContentType="password" secureTextEntry={true} />
            <FormButton onPress={handleSubmit} >
                <ButtonText>Submit</ButtonText>
            </FormButton>
            {props.formType !== 'signUp' && (
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text>
                        Need an Account?<Link>Sign up</Link>
                    </Text>
                </TouchableOpacity>
            )}
        </FormView>
    )
}

export default UserForm