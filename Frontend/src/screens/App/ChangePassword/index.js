import React, { useCallback, useState, useEffect, NativeModules } from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import {useValidation} from 'react-native-form-validator';
import customValidationMessages from '../../../validate/customValidationMessages';
import styles from './style'

import saveToken from '../../../api/saveToken';
import { localhost } from '../../../localhost';

function ChangePassword() {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    useEffect(() => {
        getUserAndToken()
    })

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);

    const [hidePass, setHidePass] = useState(true);

    const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {
        oldPassword,
        newPassword,
        rePassword,
      },
      messages: customValidationMessages,
    });

    const onChangePassword = () => {
        const isOk = validate({
            oldPassword: {require: true},
            newPassword: {require: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true, hasSpecialCharacter: true},
            rePassword: {required: true, equalPassword: newPassword}
        });
        if(isOk) {
            fetch(`http://${localhost}/ChangePassword`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idUser,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    rePassword: rePassword
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    Alert.alert("Th??nh c??ng", json.message)
                    onLogOut()
                } else {
                    Alert.alert("Th???t b???i", json.message)
                }
            })
            .catch((err) => {
                Alert.alert('Th???t b???i!', 'C?? l???i x???y ra!');
                console.log(err);
            })
        }
    }
    
    const onLogOut = async () => {
        await AsyncStorage.clear()
        RNRestart.Restart()
        //dispatch({type: 'SET_LOGIN_STATE', isLoggedIn: false})
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20, marginLeft: 30}}>
                    <FontAwesome5Icon 
                        name="chevron-left"
                        size={18}
                    />
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#00B060', marginTop: -24}}>?????i m???t kh???u</Text>
            </View>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={{uri: value.userImage}}
                />
                <Text style={styles.title}>{value.userFullName}</Text>
                <View style={{flexDirection: 'column', alignContent: 'center', marginHorizontal: 30, marginVertical: 10}}>             

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        M???t kh???u c??
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="M???t kh???u c??"
                            secureTextEntry={hidePass ? true : false}
                            onChangeText={oldPassword => setOldPassword(oldPassword)}
                            style={{width: 275}}
                        />
                        <FontAwesome5Icon 
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={14} style={{marginTop: 17, marginLeft: 20}}
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </View>
                    {isFieldInError('oldPassword') && getErrorsInField('oldPassword').map((errorMessage, index) => (
                        <Text key={index} style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        M???t kh???u m???i
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="M???t kh???u m???i"
                            secureTextEntry={hidePass ? true : false}
                            onChangeText={newPassword => setNewPassword(newPassword)}
                            style={{width: 275}}
                        />
                        <FontAwesome5Icon 
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={14} style={{marginTop: 17, marginLeft: 20}}
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </View>
                    {isFieldInError('newPassword') && getErrorsInField('newPassword').map((errorMessage, index) => (
                        <Text key={index} style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Nh???p l???i m???t kh???u m???i
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Nh???p l???i m???t kh???u m???i"
                            secureTextEntry={hidePass ? true : false}
                            onChangeText={rePassword => setRePassword(rePassword)}
                            style={{width: 275}}
                        />
                        <FontAwesome5Icon 
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={14} style={{marginTop: 17, marginLeft: 20}}
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </View>
                    {isFieldInError('rePassword') && getErrorsInField('rePassword').map((errorMessage, index) => (
                        <Text key={index} style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <TouchableOpacity style={styles.buttonGreen} onPress={onChangePassword}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>C???P NH???T</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ChangePassword;