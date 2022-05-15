import React, { useEffect, useState } from 'react'
import {Text, View, Image, Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './style'
import {PickPlace, PostForYou, User} from '../../../components/index'
import { useNavigation, useRoute, useScrollToTop } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

function SearchResult() {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [dataPlaces, setDataPlaces] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataPosts, setDataPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const getPlaces = () => {
        fetch(`http://${localhost}/searchPlacePick`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: value.input
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setDataPlaces(json.data);
            } else {
                Alert.alert('Lỗi', 'Không thể tải địa điểm')
                //const coordinates = [];
            }
        })
        .catch((err) => {
            Alert.alert('Lỗi', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getUsers = () => {
        fetch(`http://${localhost}/SearchUser`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: value.input
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setDataUsers(json.dataUser);
            } else {
                Alert.alert('Lỗi', 'Không thể tải người dùng')
                //const coordinates = [];
            }
        })
        .catch((err) => {
            Alert.alert('Lỗi', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getPosts = () => {
        fetch(`http://${localhost}/SearchPost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: value.input
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setDataPosts(json.dataPost);
            } else {
                Alert.alert('Lỗi', 'Không thể tải bài viết')
                //const coordinates = [];
            }
        })
        .catch((err) => {
            Alert.alert('Lỗi', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getUser = () => {
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
                Alert.alert('Thất bại!', 'Không thể lấy người dùng')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    

    useEffect(async () => {
        await getUserAndToken()
        if(token != null){
            await getUsers()
            await getPlaces()
            await getPosts()
            await getUser()
        }
    }, [idUser])
    console.log('places: ', dataPlaces)
    console.log('posts: ', dataPosts)
    console.log('users: ', dataUsers)

    
    
    return (
        <View>                          
            <View style={{height: 50, flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity 
                    style={{marginBottom: 0, marginTop: 0, marginLeft: 10}}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>Kết quả tìm kiếm cho: {value.input}</Text>
                </View>
            </View>            
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.text}>Người dùng</Text>
                        <View>
                            {
                                dataUsers.map((item, index) => {
                                    for(let i=0; i<dataUsers.length; i++){
                                        if(idUser != item._id){
                                            return(
                                                <User
                                                    key={index}
                                                    fullName={item.fullName}
                                                    userName={item.userName}
                                                    imageUser={{uri: item.image}}
                                                    onPress={() => navigation.navigate({name: "Friend", params: {idFriend: item._id}})}
                                                />
                                            )
                                        }
                                    }
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Địa điểm</Text>
                        <View>
                            {
                                dataPlaces.map((item, index) => {
                                    return(
                                        <PickPlace
                                            key={index}
                                            image={{uri: item.image}}
                                            title={item.name}
                                            address={item.address}
                                            phone={item.phone}
                                            onPress={() => navigation.navigate({name: 'PlaceScreen',  params: {idPlace: item._id}})}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Bài viết</Text>
                        <View>
                            {
                                dataPosts.map((item, index) => {
                                    var userName;
                                    var countLike = item.like.length.toString();
                                    var countComment = item.comment.length.toString();
                                    {
                                        for(let i=0; i<users.length; i++){
                                            if(users[i]._id == item.createdUser){
                                                userName = users[i].fullName
                                            }
                                        }
                                    }
                                    return(
                                        <PostForYou
                                            key={index}
                                            title={item.postTitle}
                                            image={{uri: item.image[0]}}
                                            place={item.place.placeName}
                                            author={userName}
                                            numLike={countLike}
                                            numComment={countComment}
                                            onPress={() => navigation.navigate({name: 'DetailPost', params: {
                                                idPost: item._id,
                                                idUser: item.createdUser
                                            }})}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>               
        </View>
    );
};

export default SearchResult;