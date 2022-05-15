import React, {useState, useEffect} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { styles } from '../Regist/style';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';
import customValidationMessages from '../../../validate/customValidationMessages';
import { localhost } from '../../../localhost'

function Regist() {
    const navigation = useNavigation();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/whateat-83348.appspot.com/o/image%2Fm.png?alt=media&token=ac09238b-d59f-41dc-92f6-95ffecc108e9');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [birthdayDisplay, setBdDisplay] = useState(null);
    const [gender, setGender] = useState('0');

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);

    const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {
        fullname,
        email,
        username,
        password,
        rePassword,
        birthday,
        gender
      },
      messages: customValidationMessages,
    });

    const onSignUp = () => {
        const isOk = validate({
            fullname: {maxlength: 30, required: true},
            username: {require: true},
            birthday: {required: true, date: "DD-MM-YYYY"},
            gender: {required: true},
            email: {require: true, email: true},
            password: {require: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true, hasSpecialCharacter: true},
            rePassword: {required: true, equalPassword: password}
        });
        if (isOk) {
            fetch(`http://${localhost}/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: username,
                    fullName: fullname,
                    email: email,
                    passWord: password,
                    gender: gender,
                    birthday: birthday,
                    rePassword: rePassword
                })
            })
            .then((response) => response.json())
            .then((json) => {
                Alert.alert("Thông báo", json.message)
                navigation.navigate('Login')
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    /* Giới tính */
    const [checked, setChecked] = useState('0');
    const checkedVerify = () => {
        if (checked) return 0;
        return 1;
    };


    /* Ngày sinh */
    useEffect(() => {
        setDisplayBirtday(birthday);
      }, []);
    
    const setDisplayBirtday = birthday => {
        let format = `${birthday.getDate()}/${
          birthday.getMonth() + 1
        }/${birthday.getFullYear()}`;
        setBdDisplay(format);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setBirthday(currentDate);
        setDisplayBirtday(currentDate);
    };
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/img/logo.png')}
                />
                <Text style={styles.title}>Đăng Ký</Text>
                <View style={{flexDirection: 'column', alignContent: 'center', marginHorizontal: 30, marginBottom: 10}}>
                    
                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Họ và tên
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Họ và tên"
                            onChangeText={fullname => setFullname(fullname)}
                        />
                    </View>
                    {isFieldInError('fullname') && getErrorsInField('fullname').map(errorMessage => (
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                    ))}
                    
                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Email
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={email => setEmail(email)}
                        />
                    </View>
                    {isFieldInError('email') && getErrorsInField('email').map(errorMessage => (
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Tên tài khoản
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Tên tài khoản"
                            onChangeText={username => setUsername(username)}
                        />
                    </View>
                    {isFieldInError('username') && getErrorsInField('username').map(errorMessage => (
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Giới tính
                    </Text>
                    <RadioButton.Group
                        onValueChange={gender => setGender(gender)}
                        value={gender}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                <RadioButton
                                    value="0"
                                    status={checked === '0' ? 'checked' : 'unchecked'}
                                    onValueChange={() => setChecked('0')}
                                />
                                <Text style={{paddingTop: 8}}>Nam</Text>
                            </View>
                            <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                <RadioButton
                                    value="1"
                                    status={checked === '1' ? 'checked' : 'unchecked'}
                                    onValueChange={() => setChecked('1')}
                                />
                                <Text style={{paddingTop: 8}}>Nữ</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    {isFieldInError('gender') && getErrorsInField('gender').map(errorMessage => (
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                    ))}

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Ngày sinh
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width: 280}}
                            placeholder="dd/MM/yyyy"
                            value={birthdayDisplay}
                            // onChangeText={birthday => setInfoUser({...infoUser, ...{birthday}})}
                        />
                        <TouchableOpacity onPress={showDatepicker}>
                            <FontAwesome5Icon name="calendar" style={{fontSize: 20, marginLeft: 10}} />
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={birthday}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                            />
                        )}
                    </View>
                    {isFieldInError('birthday') && getErrorsInField('birthday').map(errorMessage => (
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

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Nhập lại mật khẩu
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={hideRePass ? true : false}
                            onChangeText={rePassword => setRePassword(rePassword)}
                            style={{width: 275}}
                        />
                        <FontAwesome5Icon 
                            name={hideRePass ? 'eye-slash' : 'eye'}
                            size={14} style={{marginTop: 17, marginLeft: 20}}
                            onPress={() => setHideRePass(!hideRePass)}
                        />
                    </View>
                    {isFieldInError('rePassword') && getErrorsInField('rePassword').map(errorMessage => (
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                    ))}
                    {/*
                        <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Nhập lại mật khẩu
                        </Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="Nhập lại mật khẩu"
                                secureTextEntry={true}
                            />
                            <FontAwesome5Icon name='eye-slash' size={14} style={{marginTop: 17, marginLeft: 145}}/>
                        </View>
                    */}

                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
                        <TouchableOpacity style={styles.buttonGrey} onPress={() => navigation.navigate('Login')}>
                            <Text style={{color: 'white'}}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonGreen} onPress={onSignUp}>
                            <Text style={{color: 'white'}}>ĐĂNG KÝ</Text>
                        </TouchableOpacity>
                    </View>
                </View> 

                <View style={{alignSelf: 'center', marginHorizontal: 10, flexDirection: 'row'}}>
                    <View style={{height: 0.5, width: 78, backgroundColor: 'black', marginVertical: 10}} /> 
                    <Text style={{paddingHorizontal: 10}}>Hoặc đăng ký bằng</Text>
                    <View style={{height: 0.5, width: 78, backgroundColor: 'black', marginVertical: 10}} />
                </View>

                <View style={{alignSelf: 'center', marginTop: 10, flexDirection: 'row', marginBottom: 20}}>
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
        </ScrollView>
    );
};

export default Regist;