import React, { useEffect, useState } from 'react'
import {Text, View, Alert, FlatList} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from './style'
import {FoodRecommend} from '../../../components/index'
import {PlaceRecommend} from '../../../components/index';
import {PostForYou} from '../../../components/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

function ForYou() {  
    const navigation = useNavigation();

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [places, setplaces] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const random = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const getPlaces = () => {
        fetch(`http://${localhost}/GetPlacesToPick`)
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setplaces(json.data)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy địa điểm')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getPosts = () => {
        fetch(`http://${localhost}/Post/Get10Posts`, {
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
                setPosts(json.data)
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
        await getPlaces()
        if(token != null){
            getPosts()
            getUsers()
        }
        if(places.length > 0){
            const dataInterval = setInterval(() => getPlaces(), 300000);
            return () => clearInterval(dataInterval);
        }
    }, [idUser])
    console.log(places)

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Địa điểm nổi bật</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        places.map((item, index) => {
                            return(
                                <PlaceRecommend 
                                    key={index}
                                    title={item.name}
                                    rate={item.rate}
                                    image={{uri: item.image}}
                                    onPress={() => navigation.navigate({name: 'PlaceScreen',  params: {idPlace: item._id}})}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
            <Text style={styles.title}>Bài viết dành cho bạn</Text>
            <View>
                {
                    posts.map((item, index) => {
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
        </ScrollView>
    );
};

export default ForYou;