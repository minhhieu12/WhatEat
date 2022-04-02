import React, {useState} from 'react';
import {
    View,
    Text, 
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './style'
import { useNavigation } from '@react-navigation/native';

import PlacePost from './post'
import PlaceFood from './food';

function PlaceScreen(){
    const navigation = useNavigation();

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
                    <PlaceFood/>
                </View>
            )
        }
        else if( state.activeIndex == 2 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center', marginBottom: 50}}>
                    <PlacePost/>
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
                    <Text style={styles.title}>Chicken Plus - Thủ Dầu Một</Text>
                </View>
            </View> 
            <ScrollView style={styles.container3}>
                <View style={{marginHorizontal: 25, marginBottom: 10}}>
                    <View style={{flexDirection: 'row',}}>
                        <Feather name="home" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="phone" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>0346489037</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="clock" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>08:00 - 22:00</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="dollar-sign" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>15.000đ - 200.000đ</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Feather name="star" style={styles.icon}/>
                        <Text style={styles.text} numberOfLines={2}>4.5</Text>
                        <Feather name="star" style={{fontSize: 14, color: '#00b060', marginTop: 4.5, marginLeft: 2}}/>
                    </View>
                </View>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginRight: 10}}>
                        <Image source={require('../../../assets/img/sample.png')} style={styles.image}/>
                        <Image source={require('../../../assets/img/cp2.png')} style={styles.image}/>
                        <Image source={require('../../../assets/img/cp4.png')} style={styles.image}/>
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
                    onPress={() => navigation.navigate('Map')}
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