import React from 'react';
import { ViewBase, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingWrap = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`

const Loading = () => {
    return (
        <LoadingWrap>
            <ActivityIndicator size="large"></ActivityIndicator>
        </LoadingWrap>
    )
}

export default Loading