import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('_token', token);
        //await AsyncStorage.setItem('userId', userId);
    } catch (error) {
        console.log('Loi khi luu Token');
        console.log(error);
    }
};

export default saveToken;