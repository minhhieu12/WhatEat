import React, {useState, useEffect} from 'react'
import {Text, View, Image, FlatList, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import PostProfile from '../../../components/postProfile';
import { useNavigation } from '@react-navigation/native';
import { localhost } from '../../../localhost';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

function Post() {
    const navigation = useNavigation();

    const [posts, setPost] = useState([])
    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
    }

    const getData = () => {
        fetch(`http://${localhost}/GetUserPost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idUser
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

    useEffect(async () => {
        await getUserAndToken()
        console.log('token: ', token, 'idUser: ', idUser)
        
        if(idUser != null){
            await getData()
            const dataInterval = setInterval(() => getData(), 10000);
            return () => clearInterval(dataInterval);
        }
    }, [idUser])
    console.log(posts)

    return (
        <View>
            <FlatList
                nestedScrollEnabled={true}
                style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}
                numColumns={3}
                horizontal={false}
                data={posts}
                renderItem={({item}) => (
                    <PostProfile 
                        title={item.postTitle}
                        image={{uri: item.image[0]}}
                        rate={item.rate}
                        onPress={() => navigation.navigate({name: 'DetailPost', params: {
                            idPost: item._id,
                            idUser: item.createdUser
                        }})}
                    />
                )}
            />
            
            {/*
            posts.map((item, index) => {
                    return(
                        <PostProfile 
                            key={index}
                            title={item.postTitle}
                            image={{uri: item.image[0]}}
                            rate={item.rate}
                            onPress={() => navigation.navigate('DetailPost')}
                        />
                    )
                })

            <FlatList
                style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}
                numColumns={3}
                horizontal={false}
                data={posts}
                renderItem={({item}) => (
                    <PostProfile 
                        title={item.postTitle}
                        image={{uri: item.image[0]}}
                        rate={item.rate}
                        onPress={() => navigation.navigate('DetailPost')}
                    />
                )}
            />
                <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                
                <PostProfile 
                    title="Chicken Plus"
                    image={require('../../../assets/img/sample.png')}
                    rate="4.5"
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostProfile 
                    title="Cơm Tấm 68"
                    image={require('../../../assets/img/sample2.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Bánh Tráng Trộn Gánh Hàng Rong"
                    image={require('../../../assets/img/sample3.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Phúc Long Nguyễn Đình Chiểu Bình Dương"
                    image={require('../../../assets/img/sample4.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Bún Đậu Mắm Tôm Thị Nở"
                    image={require('../../../assets/img/sample5.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Al Fresco's - Pizza, Mỳ Ý, Sườn, Steak Bò Bít Tết"
                    image={require('../../../assets/img/sample6.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Ông Chủ Nhí Milk Tea"
                    image={require('../../../assets/img/sample7.png')}
                    rate="4.5"
                />
            </View>
            */}
                        
        </View>
    );
};

export default Post;