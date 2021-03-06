import React, {useEffect, useState} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, Picker, FlatList, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../Add/style'
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

function Add() {
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
    const [user, setUser] = useState({});

    let imageDownload = []
    let places = {}

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setUserId(await AsyncStorage.getItem('_userId'))
    }

    useEffect(async () => {
        await getUserAndToken()
        if(userId != null){
            await getUser()
        }
    }, [userId])
    const getUser = () => {
        fetch(`http://${localhost}/GetProfile`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setUser(json.data)
            } else {
                Alert.alert('Th???t b???i!', 'Kh??ng th??? l???y th??ng tin')
            }
        })
        .catch((err) => {
            Alert.alert('Th???t b???i!', 'C?? l???i x???y ra!');
            console.log(err);
        })
    }

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
    const uploadPost = () => {
        if(value != null){
            places = {
                placeId: value.idPlace,
                placeName: value.namePlace,
                placeAddress: value.addressPlace
            }
        }
        console.log(object)
        fetch(`http://${localhost}/Post/CreatePost`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createdUser: userId,
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
                Alert.alert('Th??nh c??ng', '????ng b??i vi???t th??nh c??ng')
                imageDownload = []
                setTitle('')
                setContent('')
                setRating(5)
                setImage([])
                navigation.navigate('Home')
            } else {
                Alert.alert('Kh??ng th??nh c??ng', json.message)
            }
        })
        .catch((err) => {
            Alert.alert('L???i', 'C?? l???i x???y ra');
            console.log(err);
        })
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
                        Alert.alert('T???i ???nh l??n', 'T???i ???nh l??n th??nh c??ng!')
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
        console.log("M???c ????nh gi??: " + rating)
        setRating(rating)
    }

    return (
        <View>                          
            <View>        
                <View style={styles.container2}>                               
                    <Text style={styles.title}>B??i vi???t m???i</Text>
                </View>
            </View>            
            <View>
                <ScrollView style={{}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, alignItems: 'center'}}>
                        <Image source={{uri: user.image}} style={styles.ava}/>
                        <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                            <Text style={styles.author}>{user.fullName}</Text>
                        </View>                      
                    </View>
                    <View style={{paddingBottom: 100, flexDirection: 'column'}}>
                        <TextInput
                            style={styles.titlePost} 
                            placeholder="Ti??u ????? b??i vi???t"
                            onChangeText={title => setTitle(title)}
                        />
                        <TextInput
                            style={styles.content}
                            multiline
                            numberOfLines={5}
                            placeholder="B???n ??ang ngh?? g???"
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
                                    startingValue={5}
                                />
                            </View>                                
                        </View>
                        <View>
                            <FlatList
                                style={{marginTop: 10, marginHorizontal: 10}}
                                numColumns={1}
                                horizontal={true}
                                data={image}
                                renderItem={({item}) => (
                                    <Image source={{uri: item.path}} style={styles.image}/>
                                )}
                            />
                        </View>
                        <View style={{height: 150}}></View>
                    </View>
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
                    <TouchableOpacity onPress={uploadPost}>
                        <Feather name='upload' style={{fontSize: 32, marginHorizontal: 30, color: '#00b060', }}/>
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

export default Add;