import React, {useState} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { styles } from '../Regist/style';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Regist() {
    const navigation = useNavigation();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/whateat-83348.appspot.com/o/image%2Fm.png?alt=media&token=ac09238b-d59f-41dc-92f6-95ffecc108e9');
    const [bio, setBio] = useState('');

    const [hidePass, setHidePass] = useState(true);

    const onSignUp = () => {
        fetch('http://192.168.10.37:3000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                fullName: fullname,
                email: email,
                passWord: password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            alert(json.message);
        })
        .catch((error) => {
            alert(error);
        })
        
        /*
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            firestore().collection("users")
                .doc(auth().currentUser.uid)
                .set({
                    fullname,
                    email,
                    username,
                    password,
                    avatar,
                    bio
                })
            console.log('Tài khoản đã được đăng ký thành công')
            Alert.alert(
                "Thông báo",
                "Đăng ký tài khoản thành công!",
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            navigation.navigate("AuthStack")
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Alert.alert(
                    "Thông báo",
                    "Email đã được sử dụng bởi một tài khoản khác!",
                    [
                      {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                Alert.alert(
                    "Thông báo",
                    "Email không hợp lệ!",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
    
            console.error(error);
        })
        */
    }

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
                    
                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Email
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={email => setEmail(email)}
                        />
                    </View>

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Tên tài khoản
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Tên tài khoản"
                            onChangeText={username => setUsername(username)}
                        />
                    </View>

                    <Text style={{marginBottom: 5, marginTop: 10, marginLeft: 5}}>
                        Mật khẩu
                    </Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Mật khẩu"
                            secureTextEntry={hidePass ? true : false}
                            onChangeText={password => setPassword(password)}
                        />
                        <FontAwesome5Icon 
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={14} style={{marginTop: 17, marginLeft: 220}}
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </View>

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