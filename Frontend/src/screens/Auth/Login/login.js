import React, { useCallback, useState, useEffect, NativeModules } from 'react'
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '../Login/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import {useValidation} from 'react-native-form-validator';
import customValidationMessages from '../../../validate/customValidationMessages';

import logIn from '../../../api/login';
import global from '../../../global';
import saveToken from '../../../api/saveToken';
import { localhost } from '../../../localhost';

function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useState();

    useEffect(() => {
        
    })

    const saveUserId = async (userId) => {
        try {
            await AsyncStorage.setItem('_userId', userId);
        } catch (error) {
            console.log('Loi khi luu user id');
            console.log(error);
        }
    }

    const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {
        email,
        password
      },
      messages: customValidationMessages,
    });

    const onSignIn = () => {
        const isOk = validate({
            email: {require: true, email: true},
            password: {require: true}
        });
        if (isOk) {
            fetch(`http://${localhost}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    passWord: password
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    saveToken(json.accessToken)
                    saveUserId(json.id)
                    //Alert.alert('Đăng nhập thành công!')
                    RNRestart.Restart()
                    console.log("user id: " + json.id)
                    console.log("token: " + json.accessToken)
                } else {
                    Alert.alert('Đăng nhập thất bại!', 'Email hoặc mật khẩu không chính xác')
                }
            })
            .catch((err) => {
                Alert.alert('Đăng nhập thất bại!', 'Có lỗi xảy ra, vui lòng thử lại!');
                console.log(err);
            })
        }
    }

    const [hidePass, setHidePass] = useState(true);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/img/logo.png')}
            />
            <Text style={styles.title}>Đăng nhập</Text>
            <View style={{flexDirection: 'column', alignContent: 'center', marginHorizontal: 30, marginVertical: 10}}>
                
                <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                    Email
                </Text>

                <View style={styles.textInput}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={email => setEmail(email)}
                        style={{width: 275}}
                    />
                </View>
                {isFieldInError('email') && getErrorsInField('email').map(errorMessage => (
                    <Text style={styles.errMessage}>{errorMessage}</Text>
                ))}
                

                <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                    Mật khẩu
                </Text>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder="Mật khẩu"
                        secureTextEntry={hidePass ? true : false}
                        onChangeText={password => setPassword(password)}
                        style={{width: 275}}
                    />
                    <FontAwesome5Icon 
                        name={hidePass ? 'eye-slash' : 'eye'}
                        size={14} style={{marginTop: 17, marginLeft: 20}}
                        onPress={() => setHidePass(!hidePass)}
                    />
                </View>
                {isFieldInError('password') && getErrorsInField('password').map(errorMessage => (
                    <Text style={styles.errMessage}>{errorMessage}</Text>
                ))}
                
                

                <Text style={{color: '#00B060', marginBottom: 25, marginTop: 10, marginLeft: 5}}>
                    Quên mật khẩu?
                </Text>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={styles.buttonGrey} onPress={() => navigation.navigate('Regist')}>
                        <Text style={{color: 'white'}}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonGreen} onPress={onSignIn}>
                        <Text style={{color: 'white'}}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </View> 

            <View style={{alignSelf: 'center', marginHorizontal: 10, flexDirection: 'row'}}>
                <View style={{height: 0.5, width: 78, backgroundColor: 'black', marginVertical: 10}} /> 
                <Text style={{paddingHorizontal: 10}}>Hoặc đăng nhập bằng</Text>
                <View style={{height: 0.5, width: 78, backgroundColor: 'black', marginVertical: 10}} />
            </View>

            <View style={{alignSelf: 'center', marginVertical: 10, flexDirection: 'row'}}>
                <Image
                    style={{width: 32, height: 32, marginRight: 13}}
                    source={require('../../../assets/img/facebook_icon.png')}
                />
                <Image
                    style={{width: 32, height: 32, marginLeft: 13}}
                    source={require('../../../assets/img/google_icon.png')}
                />
            </View>
        </View>
    );
};

export default Login;