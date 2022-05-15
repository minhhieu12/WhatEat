import React, { useEffect, useState } from 'react'
import {Text, View, Image, Alert, FlatList} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../DetailPost/style'
import {Comment} from '../../../components/index'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';
import Modal from "react-native-modal";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

function DetailPost() {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    

    const [detail, setDetail] = useState({})
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [place, setPlace] = useState({})
    const [comment, setComment] = useState([])
    const [countLike, setCountLike] = useState({})
    const [countComment, setCountComment] = useState({})
    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [like, setLike] = useState([]);
    const [store, setStore] = useState([]);
    const [image, setImage] = useState([]);
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const [isLike, setIsLike] = useState(false);
    const [isSave, setIsSave] = useState(false);

    const [rating, setRating] = useState(4.5);

    const touchLike = () => {
        setIsLike(!isLike);
    }
    const touchSave = () => {
        setIsSave(!isSave);
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
                    setPlace(json.place)
                    setCountComment(json.countComment)
                    setCountLike(json.countLike)
                    setComment(json.data.comment)
                    setLike(json.data.like)
                    setImage(json.data.image)
                    setStore(json.data.store)
                } else {
                    Alert.alert('Thất bại!', 'Không thể lấy bài viết')
                }
            })
            .catch((err) => {
                Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
                console.log(err);
            })
    }

    const getUser = () => {
        fetch(`http://${localhost}/GetProfile`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idUser
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setUser(json.data)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy thông tin')
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
            await getUser()
            await getUsers()
            
            //const dataInterval = setInterval(() => getData(), 2000);
            //return () => clearInterval(dataInterval);
        }
        
    }, [idUser])
    console.log('detail: ', detail, 'user: ', user, 'place: ', place)
    
    useEffect(() => {
        for(let i=0; i<like.length; i++){
            if(idUser == like[i].createdUser){
                setIsLike(true)
            } else {
                setLike(false)
            }
        }
        for(let i=0; i<store.length; i++){
            if(idUser == store[i].createdUser){
                setIsSave(true)
            } else {
                setIsSave(false)
            }
        }
    })

    const onLike = () => {
        fetch(`http://${localhost}/Post/LikeThePost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: value.idPost,
                createdUser: idUser
            })
        })
        .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    setIsLike(!isLike);
                } else {
                    setIsLike(false);
                }
            })
            .catch((err) => {
                Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
                console.log(err);
            })
    }

    const onStore = () => {
        fetch(`http://${localhost}/Post/StoreThePost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: value.idPost,
                createdUser: idUser
            })
        })
        .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    setIsSave(!isSave);
                } else {
                    setIsSave(false);
                }
            })
            .catch((err) => {
                Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
                console.log(err);
            })
    }

    const deletePost = () => {
        fetch(`http://${localhost}/Post/DeletePost`, {
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
                 Alert.alert("Xoá bài viết", "Đã xoá bài viết")
                 navigation.navigate('Account')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const onDelete = () => {
        Alert.alert(
            "Xoá bài viết",
            "Bạn có muốn xoá bài viết này không?",
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Đồng ý", onPress: () => deletePost() }
            ]
        )
    }

    return (
        <View>                          
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <TouchableOpacity 
                        style={{}}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                    </TouchableOpacity>          
                    <View style={styles.container2}>                               
                        <Text style={styles.title}>Bài viết của {user.fullName}</Text>
                    </View>
                    {
                        detail.createdUser == idUser
                        ?
                        <Menu
                            visible={visible}
                            anchor={<Feather name='more-vertical' size={24} onPress={showMenu}/>}
                            onRequestClose={hideMenu}
                        >
                            <MenuItem onPress={() => navigation.navigate({name: 'EditPost', params: {
                                idPost: value.idPost,
                                idUser: value.idUser,
                                userName: user.fullName,
                                userImage: user.image,
                                idPlace: place.placeId,
                                namePlace: place.placeName,
                                addressPlace: place.placeAddress,
                                postTitle: detail.postTitle,
                                postContent: detail.postContent,
                                rate: detail.rate,
                                image: image
                                }})}>
                                Sửa bài viết
                            </MenuItem>
                            <MenuItem onPress={onDelete}>Xoá bài viết</MenuItem>
                            <MenuDivider />
                        </Menu>
                        :
                        <View></View>
                    }
                </View>            
                <View>
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginTop: 20,}}>
                                <Image source={{uri: user.image}} style={styles.ava}/>
                                <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                                    <Text style={styles.author}>{user.fullName}</Text>
                                    <Text style={styles.time}>{detail.createdDate}</Text>
                                </View>                       
                        </View>
                        <View style={{paddingBottom: 180, flexDirection: 'column'}}>
                            <Text style={styles.titlePost}>{detail.postTitle}</Text>
                            <Text style={styles.content}>{detail.postContent}</Text>
                            <View style={styles.place}>
                                <Feather name="map-pin" style={{fontSize: 24}}/>
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.placeName}>{place.placeName}</Text>
                                    <Text style={styles.placeAddress}>{place.placeAddress}</Text>
                                </View>                                
                            </View>
                            <View style={styles.rate}>
                                <Feather name="star" style={{fontSize: 24}}/>
                                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', marginRight: 5, marginTop: 15, fontSize: 16}}>{detail.rate}</Text>
                                    <Rating
                                        type='custom'
                                        style={{ paddingVertical: 10, }}
                                        fractions={1}
                                        tintColor='#f2f2f2'
                                        imageSize={32}
                                        startingValue={detail.rate}
                                    />
                                </View>                                
                            </View>
                            <View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        image.map((item, index) => {
                                            return(
                                                <Image key={index} source={{uri: item}} style={styles.image}/>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
                                <Text style={{marginHorizontal: 90, textAlign: 'left', fontWeight: 'bold'}}>{countLike.countLike} lượt thích</Text>
                                <Text style={{marginHorizontal: 90, textAlign: 'right', fontWeight: 'bold'}}>{countComment.countComment} bình luận</Text>                              
                            </View>
                            <View>
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
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottonTab}>
                    {!isLike ? (
                        <TouchableOpacity onPress={onLike}>
                            <Feather name='heart' style={styles.iconUnlike}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onLike}>
                            <FontAwesome name='heart' style={styles.iconLike}/>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate({name: 'CommentScreen', params: {
                            idPost: value.idPost,
                            idUser: value.idUser
                    }})}>
                        <Feather name='message-square' style={styles.icon}/>
                    </TouchableOpacity>
                    {!isSave ? (
                        <TouchableOpacity onPress={onStore}>
                            <Feather name='bookmark' style={styles.iconUnSave}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onStore}>
                            <FontAwesome name='bookmark' style={styles.iconSave}/>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate({name: 'PlaceScreen',  params: {idPlace: place.placeId}})}>
                        <Feather name='map' style={styles.icon}/>
                    </TouchableOpacity>
                </View>                
            </View>
    );
};

export default DetailPost;