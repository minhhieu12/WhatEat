import React, { useState, useEffect, useRef } from 'react'
import {Text, View, Image, StyleSheet, TextInput, Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

function Chat() {
    const navigation = useNavigation();

    const route = useRoute();

    var value = {}
    value = route.params;
    //console.log(value)

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const [chatvjp, setChat] = useState({message: '', sid: '', time: '', rid: ''});
    const [messages, setMessages] = useState([])

    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io('http://192.168.1.253:3000')
        socketRef.current.on('message', ({sid, message, time, rid}) => {
            console.log('message: ', message, 'sid: ', sid, 'time: ', time, 'rid: ', rid)
            setMessages([...messages, {message, sid, time, rid}]);
        });

        socketRef.current.on('getMessages', (data) => {
            setMessages(data);
        });

        return() => {
            socketRef.current.disconnect();
        };
    }, [messages])

    useEffect(async () => {
        await getUserAndToken()
        if (token != null) {
            socketRef.current.emit('getMessages', {
                userId: idUser,
                anotherUserId: value.idFriend
            });
        }
    }, [idUser])

    const onSubmitHandler = () => {
        const {message, sid, time, rid} = chatvjp;
        socketRef.current.emit('message', {message, sid, time, rid});
        setChat({message: '', sid: '', time: '', rid: ''});
    }

    return (
        <View> 
            <View style={{marginTop: 10}}>
                <TouchableOpacity 
                    style={{marginBottom: -27, marginTop: 10, marginLeft: 10}}
                    onPress={() => navigation.goBack()}    
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Image source={{uri: value.imageFriend}} style={{width: 40, height: 40, borderRadius: 20}}/>
                    <View style={{marginLeft: 10, marginTop: 8}}>
                        <Text style={{fontWeight: 'bold'}}>{value.nameFriend}</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingBottom: 200, marginTop: 20, marginHorizontal: 15}}>
                <ScrollView>                          
                    {
                        messages.map((item, index) => {
                            if (item.sid == idUser) {
                                return(        
                                    <View style={{marginTop: 5, alignItems: 'flex-end'}}>
                                        <Text 
                                            key={index}
                                            style={{ 
                                                paddingVertical: 10, 
                                                borderRadius: 8, 
                                                textAlign: 'right',
                                                paddingHorizontal: 10,
                                                backgroundColor: '#00b060',
                                                color: 'white'}}>
                                            {item.message}
                                        </Text>
                                    </View>                          
                                )
                            } else {
                                return(
                                    <View style={{marginTop: 5, alignItems: 'flex-start'}}>  
                                        <Text 
                                            key={index}
                                            style={{ 
                                                paddingVertical: 10, 
                                                borderRadius: 8,
                                                textAlign: 'left',
                                                paddingHorizontal: 10,
                                                backgroundColor: 'lightgrey'}}>
                                            {item.message}
                                        </Text>
                                    </View>
                                )
                            }
                        })
                    }            
                    <View style={{height: 470}}></View>  
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                <TextInput
                    placeholder='Nhập tin nhắn của bạn'
                    style={styles.textInput}
                    onChangeText={text => {
                        var stateCopy = Object.assign({}, chatvjp);
                        stateCopy.message = text;
                        stateCopy.sid = idUser;
                        stateCopy.rid = value.idFriend
                        setChat(stateCopy);                        
                    }}
                    value={chatvjp.message}
                />
                <TouchableOpacity onPress={onSubmitHandler}>
                    <Feather name='send' style={{fontSize: 32, marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    bottonTab: {
        flexDirection: 'row',
      backgroundColor: 'white',
      width: 380,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 70,
      flex: 1,
      borderRadius: 8,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: '#c4c4c4',
        borderRadius: 8,
        width: 310
    },
    container2: {
        flexDirection: 'row',
        marginLeft: 50,
        marginTop: -10,
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
    }
})