import React, { useEffect, useState } from 'react'
import {Text, View, Image, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {FoodPrice} from '../../../components/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '../../../localhost';

function PlaceFood() {
    const navigation = useNavigation();

    const [idPlace, setIdPlace] = useState(null);
    const [token, setToken] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [menu, setMenu] = useState([]);

    const getUserAndToken = async () => {
        setToken(await AsyncStorage.getItem('_token'))
        setIdUser(await AsyncStorage.getItem('_userId'))
        setIdPlace(await AsyncStorage.getItem("_idPlace"))
    }

    const getData = () => {
        fetch(`http://${localhost}/GetPlaceMenu`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idPlace
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    setMenu(json.data.menu)
                } else {
                    Alert.alert('Thất bại!', 'Không thể tải menu')
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
            await getData()
        }
    }, [idUser]) 
    console.log(menu)

    return (
        <View>
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
                <FoodPrice
                    title="CÁNH GÀ SỐT NGŨ VỊ (10 MIẾNG)"
                    price="149.000đ"
                    image={require('../../../assets/img/garan1.png')}
                />
                <FoodPrice
                    title="GÀ NỬA CON TRUYỀN THỐNG"
                    price="119.000đ"
                    image={require('../../../assets/img/garan2.png')}
                />
                <FoodPrice
                    title="LẨU TOKBOKKI 7 PHÚT "
                    price="119.000đ"
                    image={require('../../../assets/img/garan3.png')}
                />
            </View>            
        </View>
    );
};

export default PlaceFood;