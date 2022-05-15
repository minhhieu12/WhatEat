import React, {useState, useEffect} from 'react'
import {Text, View, Image, StyleSheet, TextInput, FlatList, Alert, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {Comment} from '../../../components/index'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

const CommentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;

    const [detail, setDetail] = useState([])
    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [input, setInput] = useState();
    const [users, setUsers] = useState([])
    const [comment, setComment] = useState([])

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const getData = () => {
        fetch(`http://${localhost}/Post/GetDetailPost`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: value.idPost
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    setDetail(json.data)
                    setComment(json.data.comment)
                } else {
                    Alert.alert('Thất bại!', 'Không thể lấy bài viết')
                }
            })
            .catch((err) => {
                Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
                console.log(err);
            })
    }

    const getUsers = () => {
        fetch(`http://${localhost}/GetUser`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setUsers(json.data)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy bài viết')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    useEffect(async () => {
        await getUserAndToken()
        if(idUser != null){
            await getData()
            await getUsers()            
            const dataInterval = setInterval(() => getData(), 3000);
            return () => clearInterval(dataInterval);
        }
    }, [idUser])

    const onComment = () => {
        console.log('idPost: ', value.idPost)
        console.log('idUser: ', idUser)
        console.log('input: ', input)
        fetch(`http://${localhost}/Post/CommentThePost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: value.idPost,
                createdUser: idUser,
                content: input
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setInput('')
            } else {
                
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    return (
        <View> 
            <View>
                <TouchableOpacity 
                    style={{marginBottom: -27, marginTop: 10, marginLeft: 10}}
                    onPress={() => navigation.goBack()}    
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>{detail.postTitle}</Text>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                    {
                        comment.map((item, index) => {
                            var userName
                            var userImage
                            for(let i=0; i<users.length; i++){
                                if(users[i]._id == item.createdUser){
                                    userName = users[i].fullName
                                    userImage = users[i].image
                                }
                            }
                            return(
                                <Comment
                                    key={index}
                                    author={userName}
                                    image={{uri: userImage}}
                                    content={item.commentContent}
                                />
                            )
                        })
                    }
                    <View style={{height: 700}}></View>
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                <TextInput
                    placeholder='Nhập bình luận của bạn'
                    style={styles.textInput}
                    value={input}
                    onChangeText={input => setInput(input)}
                />
                <TouchableOpacity onPress={onComment}>
                    <Feather name='send' style={{fontSize: 32, marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentScreen;

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
      bottom: 50,
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
        width: 320
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: null
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
    }
})