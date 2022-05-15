import React, {useEffect, useState} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, Picker, FlatList, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import storage, { firebase } from '@react-native-firebase/storage';
import { localhost } from '../../../localhost'
import * as Progress from 'react-native-progress';

function EditPost() {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)    

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [image, setImage] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(5);
    const [detail, setDetail] = useState({})
    const [user, setUser] = useState({})

    let imageDownload = []
    let places = {}
    
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
                    places = json.place
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
        setUserId(await AsyncStorage.getItem('_userId'));
        setToken(await AsyncStorage.getItem('_token'));
        if(userId != null && token != null){
            getData()
        }
        if(value != null){
            setTitle(value.postTitle)
            setContent(value.postContent)
            setRating(value.rate)
            setImage(image)
        }
    }, [userId])

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [state, setState] = useState({
        activeIndex: 1,
    }); 

    const object = {
        createdUser: userId,
        postContent: content,
        image: imageDownload,
        place: places,
        rate: rating
    }

    const editPost = () => {
        if(value != null){
            places = {
                placeId: value.idPlace,
                placeName: value.namePlace,
                placeAddress: value.addressPlace
            }
        }
        if(imageDownload.length == 0){
            fetch(`http://${localhost}/Post/EditPost`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: value.idPost,
                    postContent: content,
                    postTitle: title,
                    image: value.image,
                    place: places,
                    rate: rating
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    Alert.alert('Thành công', 'Chỉnh sửa bài viết thành công')
                    navigation.navigate('Account')
                } else {
                    Alert.alert('Không thành công', json.message)
                }
            })
            .catch((err) => {
                Alert.alert('Lỗi', 'Có lỗi xảy ra');
                console.log(err);
            })
        } else {
            fetch(`http://${localhost}/Post/EditPost`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: value.idPost,
                    postContent: content,
                    postTitle: title,
                    image: imageDownload,
                    place: places,
                    rate: rating
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    Alert.alert('Thành công', 'Chỉnh sửa bài viết thành công')
                    navigation.navigate('Account')
                } else {
                    Alert.alert('Không thành công', json.message)
                }
            })
            .catch((err) => {
                Alert.alert('Lỗi', 'Có lỗi xảy ra');
                console.log(err);
            })
        }
    }

    const imagePick = async () => {
        let imageList = [];

        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            maxFiles: 10,
            includeExif: false
        }).then(response => {
            console.log('Respone: ', response)
            response.map(image => {
                imageList.push({
                    path: image.path
                })
            })
            setImage(imageList);
        }).catch(e => console.log('Error: ', e.message))
    }

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    //console.log(image)
    useEffect(() => {
        if(image.length > 0) {
            let imageUpload = []
        
            for(var i=0; i<image.length; i++){
                let imageName = 'whateat_' + makeid(6);
                imageUpload.push({
                    imageName: imageName,
                    imageUri: image[i].path
                })
            }
            console.log(imageUpload)

            imageUpload.map(async upload => {
                await firebase
                    .storage()
                    .ref('/what-eat/' + upload.imageName)
                    .putFile(upload.imageUri)
                    .then((snapshot) => {
                        console.log(`${upload.imageName} has been successfully uploaded.`);
                        Alert.alert('Tải ảnh lên', 'Tải ảnh lên thành công!')
                    })
                    .catch((e) => console.log('uploading image error => ', e));
                
                let imageRef = firebase.storage().ref('/what-eat/' + upload.imageName);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        imageDownload.push(url)
                        console.log('Image download: ', imageDownload)
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            })
        }
    })
    const uploadImage = async () => {
        
    }

    const ratingCompleted = (rating) => {
        console.log("Mức đánh giá: " + rating)
        setRating(rating)
    }

    return (
        <View>                          
            <View>        
                <View style={styles.container2}>   
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10, marginLeft: -40}}>
                        <Feather name="chevron-left" size={32}/>
                    </TouchableOpacity>                            
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>Chỉnh sửa: {title}</Text>
                </View>
            </View>            
            <View>
                <ScrollView style={{height: 678}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, alignItems: 'center'}}>
                        <Image source={{uri: value.userImage}} style={styles.ava}/>
                        <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                            <Text style={styles.author}>{value.userName}</Text>
                        </View>                      
                    </View>
                    <View style={{paddingBottom: 100, flexDirection: 'column'}}>
                        <TextInput
                            value={title}
                            style={styles.titlePost}
                            placeholder="Tiêu đề bài viết"
                            onChangeText={title => setTitle(title)}
                        />
                        <TextInput
                            value={content}
                            style={styles.content}
                            multiline
                            numberOfLines={5}
                            placeholder="Bạn đang nghĩ gì?"
                            onChangeText={content => setContent(content)}
                        />
                        {
                            value == null 
                            ? 
                                <View style={styles.place}>
                                    <Feather name="map-pin" style={{fontSize: 24}}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={styles.placeName}></Text>
                                        <Text style={styles.placeAddress}></Text>
                                    </View>                                
                                </View>
                            : 
                                <View style={styles.place}>
                                    <Feather name="map-pin" style={{fontSize: 24}}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={styles.placeName} numberOfLines={1} ellipsizeMode='tail'>{value.namePlace}</Text>
                                        <Text style={styles.placeAddress} numberOfLines={1} ellipsizeMode='tail'>{value.addressPlace}</Text>
                                    </View>                                
                                </View>
                        }
                        <View style={styles.rate}>
                            <Feather name="star" style={{fontSize: 24}}/>
                            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', marginRight: 5, marginTop: 15, fontSize: 16}}>{rating}</Text>
                                <Rating
                                    type='custom'
                                    onFinishRating={ratingCompleted}
                                    style={{ paddingVertical: 10, }}
                                    fractions={1}
                                    tintColor='#f2f2f2'
                                    imageSize={32}
                                    startingValue={rating}
                                />
                            </View>                                
                        </View>
                        <View style={{marginTop: 10, marginHorizontal: 10}}>
                            {
                                image.length == 0
                                ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        value.image.map((item, index) => {
                                            return(
                                                <Image key={index} source={{uri: item}} style={styles.image}/>
                                            )
                                        })
                                    }
                                </ScrollView>
                                :
                                <FlatList
                                    style={{marginTop: 5}}
                                    numColumns={1}
                                    horizontal={true}
                                    data={image}
                                    renderItem={({item}) => (
                                        <Image source={{uri: item.path}} style={styles.image}/>
                                    )}
                                />
                            }
                        </View>
                    </View>
                    <View style={{height: 100}}></View>
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                    {/*
                    <TouchableOpacity>
                        <Feather name='camera' style={styles.icon} onPress={toggleModal}/>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity onPress={imagePick}>
                        <Feather name='image' style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PickPlaceScreen')}>
                        <Feather name='map-pin' style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={editPost}>
                        <Feather name='save' style={{fontSize: 32, marginHorizontal: 30, color: '#00b060', }}/>
                    </TouchableOpacity>
            </View> 
            <Modal isVisible={isModalVisible} animationIn='slideInUp' animationInTiming={500} style={{ }}>
                <View style={{backgroundColor: '#f2f2f2', width: 410, height: 600, marginLeft: -20, alignItems: 'center'}}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Feather name="x" size={32}/>
                    </TouchableOpacity>
                    <RNCamera
                        ref={ref => setCamera(ref)}
                        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: 450}}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />
                </View>
            </Modal>               
        </View>
    );
};

export default EditPost;