import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TextInput,
  Picker,
  Button,
  TouchableOpacity
} from 'react-native';
import {  } from 'react-native-gesture-handler';
import MapView, {Marker, Callout} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from 'react-native-image-crop-picker';

import {HanhChinhVN} from '../../../utils/index';

import { localhost } from '../../../localhost';

function Map() {
    const navigation = useNavigation();
    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    const [idPlace, setIdPlace] = useState();

    useEffect(() => {
        if(value != null){
            setIdPlace(value.idPlace)
        }
    })

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [isModalRateVisible, setModalRateVisible] = useState(false);

    const [province, setProvince] = useState(10);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);

    const [category, setCategory] = useState('Danh mục');
    const [rating, setRating] = useState('Đánh giá');

    const provinces = HanhChinhVN.provinces;

    console.log(provinces)

    let place = provinces[province.toString()].name + ', ' + district + ', ' + ward

    const toggleModalPlace = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModalCategory = () => {
        setModalCategoryVisible(!isModalCategoryVisible);
    };

    const toggleModalRate = () => {
        setModalRateVisible(!isModalRateVisible);
    };
    
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');

    const [coordinates, setCoordinates] = useState([]);

    /*
        {name: 'Family Mart', latitude: 10.981308, longitude: 106.675406,},
        {name: 'Đại học Thủ Dầu Một', latitude: 10.980638, longitude: 106.674723,},
        {name: 'Trung tâm ngoại ngữ TDMU', latitude: 10.980289, longitude: 106.675560,},
        {name: 'Trà sữa Đậu', latitude: 10.980950, longitude: 106.675705,},
        {name: 'Circle K', latitude: 10.980145, longitude: 106.675873,},
        {name: 'Tiệm in Thái Bình', latitude: 10.980296, longitude: 106.675828,},
    */
    useEffect(async () => {
        fetch(`http://${localhost}/GetPlacesMap`)
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setCoordinates(json.data);
            } else {
                Alert.alert('Lỗi', 'Không thể tải địa điểm')
                //const coordinates = [];
            }
        })
        .catch((err) => {
            Alert.alert('Lỗi', 'Có lỗi xảy ra!');
            console.log(err);
        })
    }, [])
    
    //let coordinates = GetCoordinates();
    console.log(coordinates)

    const [input, setInput] = useState();
    
    const onSearch = () => {
        navigation.navigate({name: 'SearchResult', params: {
            input: input
        }})
        setInput('')
    }

    
    const showMessages = () => {
        Alert.alert(
          'Chào mừng đến với ...')
    }

    const ratingCompleted = (rating) => {
        console.log("Mức đánh giá: " + rating)
        setRating(rating)
    }

    //Pick Image
    const [image, setImage] = useState();
    const imagePick = async () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            maxFiles: 10,
            includeExif: false,
            includeBase64: true,
            compressImageQuality: 0.5
        }).then(response => {
            console.log('Respone: ', response)
            response.map(image => {
                setImage(image.data);
            })
            
        }).catch(e => console.log('Error: ', e.message))
    }
    console.log("image: ", image)

    return (
        <View>
            <MapView
                    style={{width: null, height: 658}}
                    region={{
                        latitude: 10.980638,
                        longitude: 106.674723,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    
                    {
                        coordinates.map((markers) => {
                            if (markers.id == idPlace) {
                                return(
                                    <Marker
                                        key={markers.name}
                                        coordinate={{latitude: markers.latitude, longitude: markers.longitude}}
                                        title={markers.name}
                                    >
                                        <Callout>
                                            <View>
                                                <Image source={{uri: markers.image}}/>
                                                <Text>{markers.name}</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                )
                            } else {
                                return(
                                    <Marker
                                        key={markers.name}
                                        coordinate={{latitude: markers.latitude, longitude: markers.longitude}}
                                        title={markers.name}
                                    >
                                        <Callout>
                                            <View>
                                                <Image source={{uri: markers.image}}/>
                                                <Text>{markers.name}</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                )
                            }
                        })
                    }
            </MapView>
            <View style={{height: 58, borderRadius: 8, marginHorizontal: 4, backgroundColor: 'rgba(52, 52, 52, 0.4)', marginTop: -640}}>
                <View style={{flexDirection: 'row', marginTop: 3, marginHorizontal: 5}}>
                    <View style={{backgroundColor: 'white', marginHorizontal: 5, marginVertical: 5, borderRadius: 8, flexDirection: 'row', height: 40}}>
                        <TextInput 
                            style={{width: 238, marginHorizontal: 5, fontSize: 12}} 
                            placeholder="Nhập tên món ăn hoặc địa điểm"
                            value={input}
                            onChangeText={input => setInput(input)}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={imagePick}>
                            <Feather name="camera" size={24} color={'grey'} style={{marginHorizontal: 10, marginTop: 6}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="mic" size={24} color={'grey'} style={{marginHorizontal: 5, marginTop: 6}}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onSearch}>
                        <Feather name="search" size={24} color={'white'} style={{marginTop: 12, marginHorizontal: 5}}/>
                    </TouchableOpacity>
                </View>
                {/*
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 2,}}>
                        <View>
                            <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 5, marginLeft: 5}}>Địa điểm</Text>
                            <TouchableOpacity 
                                style={{backgroundColor: 'white', width: 115, height: 30, borderRadius: 8, alignItems: 'center', marginHorizontal: 5}}
                                onPress={toggleModalPlace}
                            >
                                <Text style={{color: 'grey', marginTop: 5}} >{place}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 5, marginLeft: 5}}>Danh mục</Text>
                            <TouchableOpacity 
                                style={{backgroundColor: 'white', width: 115, height: 30, borderRadius: 8, alignItems: 'center', marginHorizontal: 5}}
                                onPress={toggleModalCategory}
                            >
                                <Text style={{color: 'grey', marginTop: 5}}>{category}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 5, marginLeft: 5}}>Đánh giá</Text>
                            <TouchableOpacity 
                                style={{backgroundColor: 'white', width: 115, height: 30, borderRadius: 8, alignItems: 'center', marginHorizontal: 5}}
                                onPress={toggleModalRate}
                            >
                                <Text style={{color: 'grey', marginTop: 5}}>{rating}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                */}
                
            </View>
            {/*
                <Modal isVisible={isModalVisible} animationIn='zoomIn' animationInTiming={300}>
                    <View style={{ backgroundColor: 'white', width: 350, borderRadius: 8, height: 275, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 10}}>Chọn địa điểm bạn muốn</Text>
                        <View style={{borderColor: 'grey', borderWidth: 1, borderRadius: 8, height: 50, marginBottom: 10, width: 300}}>
                            <Picker
                                province={province}
                                onValueChange={(itemValue, itemIndex) => {
                                    setProvince(itemValue);
                                    setDistrict(null);
                                    setWard(null);
                            }}>
                                {Object.keys(provinces).map(item => {
                                    return (
                                        <Picker.Item
                                            label={provinces[item].name_with_type}
                                            value={provinces[item].code}
                                            key={provinces[item].code}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                        <View style={{borderColor: 'grey', borderWidth: 1, borderRadius: 8, height: 50, marginBottom: 10, width: 300}}>
                            <Picker
                                district={district}
                                onValueChange={(itemValue, itemIndex) => {
                                setDistrict(itemValue);
                                setWard(null);
                                }}>
                                <Picker.Item label="Chọn" value={null} key={null} />
                                {province !== null &&
                                Object.keys(provinces[province]['quan-huyen']).map(item => {
                                    return (
                                    <Picker.Item
                                        label={
                                        provinces[province]['quan-huyen'][item].name_with_type
                                        }
                                        value={provinces[province]['quan-huyen'][item].code}
                                        key={provinces[province]['quan-huyen'][item].code}
                                    />
                            );
                        })}
                            </Picker>
                        </View>
                        <View style={{borderColor: 'grey', borderWidth: 1, borderRadius: 8, height: 50, marginBottom: 10, width: 300}}>
                            <Picker
                                ward={ward}
                                onValueChange={(itemValue, itemIndex) => setWard(itemValue)}>
                                <Picker.Item label="Chọn" value={null} key={null} />
                                {province !== null &&
                                district !== null &&
                                Object.keys(
                                    provinces[province]['quan-huyen'][district]['xa-phuong'],
                                ).map(item => {
                                    let wardd =
                                    provinces[province]['quan-huyen'][district]['xa-phuong'][
                                        item
                                    ];
                                    return (
                                    <Picker.Item
                                        label={wardd.name_with_type}
                                        value={wardd.code}
                                        key={wardd.code}
                                    />
                                    );
                                })}
                            </Picker>
                        </View>
                        <TouchableOpacity onPress={toggleModalPlace} style={{width: 300, backgroundColor: '#00b060', padding: 10, borderRadius: 8, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={isModalCategoryVisible} animationIn='zoomIn' animationInTiming={300}>
                    <View style={{ backgroundColor: 'white', width: 350, borderRadius: 8, height: 160, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 10}}>Chọn danh mục bạn muốn</Text>
                        <View style={{borderColor: 'grey', borderWidth: 1, borderRadius: 8, height: 50, marginBottom: 10, width: 300}}>
                            <Picker
                                onValueChange={(itemValue, itemIndex) => {
                                    setCategory(itemValue);
                            }}>
                                <Picker.Item label="Bún - Miến - Phở" value="bunmienpho" />
                                <Picker.Item label="Cơm" value="com" />
                                <Picker.Item label="Cà phê - Trà" value="caphetra" />
                                <Picker.Item label="Ăn vặt" value="anvat" />
                            </Picker>
                        </View>
                        <TouchableOpacity onPress={toggleModalCategory} style={{width: 300, backgroundColor: '#00b060', padding: 10, borderRadius: 8, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={isModalRateVisible} animationIn='zoomIn' animationInTiming={300}>
                    <View style={{ backgroundColor: 'white', width: 350, borderRadius: 8, height: 200, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 10}}>Chọn mức đánh giá bạn muốn</Text>

                        <Rating
                            showRating
                            onFinishRating={ratingCompleted}
                            style={{ paddingVertical: 10 }}
                            fractions={1}
                        />

                        <TouchableOpacity onPress={toggleModalRate} style={{width: 300, backgroundColor: '#00b060', padding: 10, borderRadius: 8, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            */}
            
        </View>
    );
};

export default Map;