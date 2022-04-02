import React, {useState} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../Add/style'
import { useNavigation } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';

function Add() {
    const navigation = useNavigation();

    const [rating, setRating] = useState(5);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [state, setState] = useState({
        activeIndex: 1,
    }); 

    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState(null);

    const takePicture = async () => {
        if (camera) {
          const data = await camera.takePictureAsync(null);
          setImage(data.uri);
        }
    };

    const pickImage = async () => {
        launchImageLibrary( 
          {
            mediaType: 'photo',
            //maxHeight: 200,
            //maxWidth: 200
          },
          response => {
          console.log('Response = ', response);
          setImage(response.uri)
        })
    };

    const ratingCompleted = (rating) => {
        console.log("Mức đánh giá: " + rating)
        setRating(rating)
    }

    return (
        <View>                          
            <View>        
                <View style={styles.container2}>                               
                    <Text style={styles.title}>Bài viết mới</Text>
                </View>
            </View>            
            <View>
                <ScrollView style={{height: 678}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, alignItems: 'center'}}>
                        <Image source={require('../../../assets/img/ava.png')} style={styles.ava}/>
                        <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                            <Text style={styles.author}>Minh Hiếu</Text>
                        </View>                      
                    </View>
                    <View style={{paddingBottom: 100, flexDirection: 'column'}}>
                        <TextInput
                            style={styles.content}
                            multiline
                            numberOfLines={5}
                        />
                            <View style={styles.place}>
                                <Feather name="map-pin" style={{fontSize: 24}}/>
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.placeName}>Chicken Plus - Thủ Dầu Một</Text>
                                    <Text style={styles.placeAddress}>356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương</Text>
                                </View>                                
                            </View>
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
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: 5}}>
                                <Image source={require('../../../assets/img/sample.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp2.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp3.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp4.png')} style={styles.image}/>
                            </ScrollView>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                    <TouchableOpacity>
                        <Feather name='camera' style={styles.icon} onPress={toggleModal}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name='image' style={styles.icon} onPress={pickImage.bind(this)}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PickPlaceScreen')}>
                        <Feather name='map-pin' style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
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