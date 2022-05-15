import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {styles} from '../PickPlaceScreen/style'
import {PickPlace} from '../../../components/index'
import {localhost} from '../../../localhost'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

function PickPlaceScreen({navigation}){
    const [placesData, setPlacesData] = useState([])
    const [input, setInput] = useState('');
    const [token, setToken] = useState('');

    //const navigation = useNavigation();

    useEffect(async() => {
        setToken(await AsyncStorage.getItem('_token'));
        fetch(`http://${localhost}/GetPlacesToPick`)
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setPlacesData(json.data);
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

    console.log(placesData)

    const onSearch = () => {
        fetch(`http://${localhost}/searchPlacePick`, {
            method: 'POST',
            headers: {
                'author': token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: input
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(!json.isError){
                setPlacesData(json.data);
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

    

    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Nhập địa điểm bạn cần tìm"
                    onChangeText={input => setInput(input)}
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={onSearch}>
                    <Feather name="search" size={28} style={styles.icon}/>
                </TouchableOpacity>
            </View>

            {/*
            <View style={{flexDirection: 'row'}}>
                
                <Text 
                    style={{
                        fontWeight: 'bold', 
                        marginHorizontal: 15, 
                        marginTop: 15, 
                        marginBottom: 5, 
                        fontSize: 14
                        }}
                >Địa điểm bạn đã đến</Text>
                <TouchableOpacity>
                    <Feather name='trash' size={16} style={{marginTop: 15, marginLeft: 200}}/>
                </TouchableOpacity>
            </View>
            */}

            <FlatList
                style={{marginTop: 5}}
                numColumns={1}
                horizontal={false}
                data={placesData}
                renderItem={({item}) => (
                    <PickPlace
                        title={item.name}
                        address={item.address}
                        phone={item.phone}
                        image={{uri: item.image}}
                        onPress={() => navigation.navigate({name: 'Add', params: {
                            idPlace: item._id,
                            namePlace: item.name,
                            addressPlace: item.address
                        }})}
                    />
                )}
            />
            <ScrollView style={styles.container2}> 
                
                {/*
                    <PickPlace
                    title="Chicken Plus"
                    address="356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample.png')}
                />
                <PickPlace
                    title="Cơm Tấm 68"
                    address="309 Thích Quảng Đức, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample2.png')}
                />
                <PickPlace
                    title="Bánh tráng trộn Gánh Hàng Rong"
                    address="113/108B Đường 30 Tháng 4, P. Phú Hòa, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample3.png')}
                />
                <PickPlace
                    title="Phúc Long Nguyễn Đình Chiểu Bình Dương"
                    address="44 Nguyễn Đình Chiểu, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample4.png')}
                />
                */}
            </ScrollView>
        </View>
    )
};

export default PickPlaceScreen;