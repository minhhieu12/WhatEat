import React, { useEffect, useState } from 'react'
import {Text, View, Image, Button, TouchableOpacity, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../Account/style'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { localhost } from '../../../localhost';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import { PostProfile, User, PostStored } from '../../../components/index';

import Place from './place';
import Post from './post';
import Store from './store';
import Follower from './follower';
import Following from './following';

function Friend(props) { 
    const navigation = useNavigation();

    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFollowerVisible, setFollowerVisible] = useState(false);
    const [isFollowingVisible, setFollowingVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleFollower = () => {
        setFollowerVisible(!isFollowerVisible);
    };
    const toggleFollowing = () => {
        setFollowingVisible(!isFollowingVisible);
    };

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [user, setUser] = useState({})
    const [posts, setPost] = useState([])
    const [follower, setFollower] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState({});
    const [followings, setFollowings] = useState([]);
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const getData = () => {
        fetch(`http://${localhost}/GetProfile`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idFriend
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

    const getPost = () => {
        fetch(`http://${localhost}/GetUserPost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setPost(json.data)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy bài viết')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getFollower = () => {
        fetch(`http://${localhost}/GetFollower`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setFollower(json.data)
                setFollowers(json.data.followers)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy người theo dõi')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getFollowing = () => {
        fetch(`http://${localhost}/GetFollowing`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setFollowing(json.data)
                setFollowings(json.data.followings)
            } else {
                Alert.alert('Thất bại!', 'Không thể lấy người đang theo dõi')
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
                Alert.alert('Thất bại!', 'Không thể lấy users')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const getStoredPost = () => {
        fetch(`http://${localhost}/GetUserStoredPost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setStores(json.data)
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
        //console.log('token: ', token, 'idUser: ', idUser)
        
        if(idUser != null){
            await getData()
            await getPost()
            await getFollower()
            await getFollowing()
            await getUsers()
            await getStoredPost()
            const dataInterval = setInterval(() => getData(), 20000);
            const dataInterval2 = setInterval(() => getPost(), 20000);
            const dataInterval3 = setInterval(() => getFollower(), 20000);
            const dataInterval4 = setInterval(() => getFollowing(), 20000);
            const dataInterval5 = setInterval(() => getUsers(), 20000);
            const dataInterval6 = setInterval(() => getStoredPost(), 20000);
            return () => clearInterval(dataInterval, dataInterval2, dataInterval3, dataInterval4, dataInterval5, dataInterval6);
        }
    }, [idUser])
    //console.log(user)
    //console.log('post: ', posts)

    const onFollow = () => {
        fetch(`http://${localhost}/Follow/Follow`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createdUser: idUser,
                followedUser: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                Alert.alert('Thành công!', 'Đã theo dõi tài khoản')
            } else {
                Alert.alert('Thất bại!', 'Không thể theo dõi tài khoản')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const onUnFollow = () => {
        fetch(`http://${localhost}/Follow/UnFollow`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createdUser: idUser,
                followedUser: value.idFriend
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                Alert.alert('Thành công!', 'Đã huỷ theo dõi tài khoản')
            } else {
                Alert.alert('Thất bại!', 'Không thể huỷ theo dõi tài khoản')
            }
        })
        .catch((err) => {
            Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }

    const [isPress, setIsPress] = useState(false);

    const Touch = () => {
        setIsPress(!isPress);
    }
    useEffect(() => {
        for(let i=0; i<followers.length; i++){
            if(idUser == followers[i]){
                setIsPress(true)
            } else {
                setIsPress(false)
            }
        }
    })

    const [state, setState] = useState({
        activeIndex: 1,
    });  
    
    const selectTab = ( index ) => {
        setState({
            activeIndex: index,
        })
    }
    
    const renderTabContent = () => {
        if( state.activeIndex == 1 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    {
                        posts.map((item, index) => {
                            if(posts.length > 0){
                                return(
                                    <PostProfile 
                                        key={index}
                                        title={item.postTitle}
                                        image={{uri: item.image[0]}}
                                        rate={item.rate}
                                        onPress={() => navigation.navigate({name: 'DetailPost', params: {
                                            idPost: item._id,
                                            idUser: item.createdUser
                                        }})}
                                    />
                                )
                            }
                        })
                    }
                </View>
            )
        }
        else if( state.activeIndex == 3 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                        {
                            stores.map((item, index) => {
                                var userName;
                                for(let i=0; i<users.length; i++){
                                    if(users[i]._id == item.createdUser){
                                        userName = users[i].fullName
                                    }
                                }
                                return(
                                    <PostStored 
                                        key={index}
                                        author={userName}
                                        title={item.postTitle}
                                        image={{uri: item.image[0]}}
                                        rate={item.rate}
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
            )
        }
    }

    return (
        <View>
            <TouchableOpacity style={{marginTop: 20, marginBottom: -40, marginLeft: 10}} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={24}/>
            </TouchableOpacity>                          
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>        
                <Text style={styles.title}>{user.fullName}</Text>
            </View>
            <ScrollView style={{marginBottom: 45}}>
                    <Image source={{uri: user.image}} style={styles.ava}/>
                    <Text style={styles.username}>@{user.userName}</Text>
                    <View style={styles.container2}>
                        <TouchableOpacity>
                            <View style={styles.countContain}>
                                <Text style={styles.count}>{following.countFollowing}</Text>
                                <Text>Đang theo dõi</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.countContain}>
                            <Text style={styles.count}>{user.countPost}</Text>
                            <Text>Bài viết</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.countContain}>
                                <Text style={styles.count}>{follower.countFollower}</Text>
                                <Text>Người theo dõi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.username}>
                        Food Reviewer {'\n'}
                        #2000 
                    </Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                        {!isPress ? (
                            <TouchableOpacity onPress={onFollow} style={{width: 180, height: 30, alignItems: 'center', borderRadius: 8, backgroundColor: '#00b060', marginRight: 5}}>
                                <Text style={{fontSize: 14, marginTop: 4, color: 'white'}}>Theo dõi</Text>
                            </TouchableOpacity>                            
                        ) : (
                            <TouchableOpacity onPress={onUnFollow} style={{borderWidth: 0.5, borderColor: 'red', width: 180, height: 30, alignItems: 'center', borderRadius: 8, marginRight: 5}}>
                                <Text style={{fontSize: 14, marginTop: 4}}>Huỷ theo dõi</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate({name: 'Chat', params: {
                            idFriend: value.idFriend,
                            nameFriend: user.fullName,
                            imageFriend: user.image}})} style={{width: 180, height: 30, alignItems: 'center', borderRadius: 8, backgroundColor: '#00b060', marginLeft: 5}}>
                            <Text style={{fontSize: 14, marginTop: 4, color: 'white'}}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View> 
                    
                    <View style={{marginTop: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <TouchableOpacity
                                onPress={() => selectTab(1)} 
                                style={[state.activeIndex == 1 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 40} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Feather 
                                    name="grid" 
                                    size={32} 
                                    style={[state.activeIndex == 1 ? styles.buttonTabActive : styles.buttonTabInActive]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectTab(3)} 
                                style={[state.activeIndex == 3 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 40} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Feather 
                                    name="bookmark" 
                                    size={32} 
                                    style={[state.activeIndex == 3 ? styles.buttonTabActive : styles.buttonTabInActive]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderTabContent()}
                </ScrollView>
                <Modal isVisible={isFollowerVisible} animationIn='slideInUp' animationInTiming={500}>
                        <View style={{ backgroundColor: 'white', width: 384, borderRadius: 8, height: 600, marginLeft: -15}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15, marginLeft: 10, width: 320}}>Người đang theo dõi bạn</Text>
                                <TouchableOpacity onPress={toggleFollower} style={{padding: 10, borderRadius: 8, marginTop: 2}}>
                                    <Feather name="x" size={28}/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {
                                    followers.map((item, index) => {
                                        for(let i=0; i<users.length; i++){
                                            if(users[i]._id == item){
                                                return(
                                                    <User
                                                        key={index}
                                                        fullName={users[i].fullName}
                                                        userName={users[i].userName}
                                                        imageUser={{uri: users[i].image}}
                                                        onPress={() => navigation.navigate({name: "Friend", params: {idFriend: users[i]._id}})}
                                                    />
                                                )
                                            }
                                        }
                                    })
                                }
                            </ScrollView>
                        </View>
                    </Modal>
                    <Modal isVisible={isFollowingVisible} animationIn='slideInUp' animationInTiming={500}>
                        <View style={{ backgroundColor: 'white', width: 380, borderRadius: 8, height: 600, marginLeft: -15}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15, marginLeft: 10, width: 320}}>Bạn đang theo dõi</Text>
                                <TouchableOpacity onPress={toggleFollowing} style={{padding: 10, borderRadius: 8, marginTop: 2}}>
                                    <Feather name="x" size={28}/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {
                                    followings.map((item, index) => {
                                        for(let i=0; i<users.length; i++){
                                            if(users[i]._id == item){
                                                return(
                                                    <User
                                                        key={index}
                                                        fullName={users[i].fullName}
                                                        userName={users[i].userName}
                                                        imageUser={{uri: users[i].image}}
                                                        onPress={() => navigation.navigate({name: "Friend", params: {idFriend: users[i]._id}})}
                                                    />
                                                )
                                            }
                                        }
                                    })
                                }
                            </ScrollView>
                        </View>
                    </Modal>
        </View>
        
    );
};

export default Friend;