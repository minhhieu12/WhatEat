import React, {useState, useEffect} from 'react';
import {
    View,
    Text, 
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './style'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

import PlacePost from './post'
import PlaceFood from './food';
import {FoodPrice} from '../../../components/index';
import {PostForYou} from '../../../components/index';

function PlaceScreen(){
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    useEffect(async () => {
        await AsyncStorage.setItem('_idPlace', value.idPlace)
    })

    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [places, setplaces] = useState({});
    const [image, setImage] = useState([]);
    const [menu, setMenu] = useState([]);
    const [posts, setPost] = useState([]);
    const [users, setUsers] = useState([]);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const getData = () => {
        fetch(`http://${localhost}/GetPlaceDetail`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: value.idPlace
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    setplaces(json.data)
                    setImage(json.data.image)
                    setMenu(json.data.menu)
                } else {
                    Alert.alert('Thất bại!', 'Không thể tải địa điểm')
                }
            })
            .catch((err) => {
                Alert.alert('Thất bại!', 'Có lỗi xảy ra!');
                console.log(err);
            })
    }

    const getPosts = () => {
        fetch(`http://${localhost}/Post/GetAllPost`, {
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
                    setPost(json.data)
                } else {
                    Alert.alert('Thất bại!', 'Không thể tải bài viết')
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
        if(token != null){
            getData()
            getPosts()
            getUsers()
        }
    }, [idUser])
    console.log(places)

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
                <View style={{marginTop: 10, alignItems: 'center', marginBottom: 50}}>
                    <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                        {
                            menu.map((item, index) => {
                                return(
                                    <FoodPrice
                                        key={index}
                                        title={item.name}
                                        price={item.price}
                                        image={{uri: item.img}}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
            )
        }
        else if( state.activeIndex == 2 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center', marginBottom: 50}}>
                    <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                        {
                            posts.map((item, index) => {
                                if(item.place.placeId == value.idPlace){
                                    var userName;
                                    var countLike = item.like.length.toString();
                                    var countComment = item.comment.length.toString();
                                    for(let i=0; i<users.length; i++){
                                        if(users[i]._id == item.createdUser){
                                            userName = users[i].fullName
                                        }
                                    }
                                    return(
                                        <PostForYou
                                            key={index}
                                            title={item.postTitle}
                                            image={{uri: item.image[0]}}
                                            place={item.postContent}
                                            author={userName}
                                            numLike={countLike}
                                            numComment={countComment}
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
                    
                </View>
            )
        }
    }

    return(
        <View>
            <View>
                <TouchableOpacity 
                    style={{marginBottom: -45, marginTop: 10, marginLeft: 15}}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>{places.name}</Text>
                </View>
            </View> 
            <ScrollView style={styles.container3}>
                <View style={{marginHorizontal: 25, marginBottom: 10}}>
                    <View style={{flexDirection: 'row',}}>
                        <Feather name="home" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>{places.address}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="phone" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>{places.phone}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="star" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>{places.rate}</Text>
                    </View>
                </View>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginRight: 10}}>
                        {
                            image.map((img, index) => {
                                return(
                                    <Image key={index} source={{uri: img}} style={styles.image}/>
                                    
                                )
                            })
                        }     
                    </ScrollView>
                </View>
                <TouchableOpacity 
                    style={{
                        alignItems: 'center', 
                        padding: 10, 
                        backgroundColor: '#00b060', 
                        borderRadius: 8,
                        marginHorizontal: 10,
                        marginVertical: 10
                    }}
                    onPress={() => navigation.navigate({name: 'Map', params: {idPlace: value.idPlace}})}
                >
                    <Text style={{color: 'white', fontSize: 16}}>MỞ BẢN ĐỒ</Text>
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <TouchableOpacity
                                onPress={() => selectTab(1)} 
                                style={[state.activeIndex == 1 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 80} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Text style={[state.activeIndex == 1 ? styles.buttonTabActive : styles.buttonTabInActive], {fontSize: 16}}>
                                    MÓN ĂN
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectTab(2)} 
                                style={[state.activeIndex == 2 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 80} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Text style={[state.activeIndex == 2 ? styles.buttonTabActive : styles.buttonTabInActive], {fontSize: 16}}>
                                    BÀI VIẾT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderTabContent({navigation})}
            </ScrollView>
        </View>
    )
};

export default PlaceScreen;