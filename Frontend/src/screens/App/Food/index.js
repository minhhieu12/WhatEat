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
import Place from './place';
import FoodPost from './food'

function Food({navigation}){
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
                    <FoodPost/>
                </View>
            )
        }
        else if( state.activeIndex == 2 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center', marginBottom: 50}}>
                    <Place/>
                </View>
            )
        }
    }

    return(
        <View>
            <View>
                <TouchableOpacity 
                    style={{marginBottom: -35, marginTop: 10, marginLeft: 15}}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>Phở</Text>
                </View>
            </View> 
            <ScrollView style={styles.container3}>
                <Image source={require('../../../assets/img/pho.png')} style={styles.image}/>
                <Text style={styles.description}>
                Phở là một món ăn truyền thống của Việt Nam, có nguồn gốc từ Hà Nội và Nam Định, và được xem là một trong những món ăn tiêu biểu cho nền ẩm thực Việt Nam. Thành phần chính của phở là bánh phở và nước dùng cùng với thịt bò hoặc thịt gà cắt lát mỏng.
                </Text>
                <View style={{flexDirection: 'row', marginHorizontal: 15, paddingRight: 135, marginVertical: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 140}}>Thành phần chính: </Text>
                    <Text style={{fontSize: 14,}}>Bánh phở, nước dùng, thịt bò hoặc thịt gà kèm với một số loại gia vị khác</Text>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 15, paddingRight: 135, marginVertical: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 140}}>Loại: </Text>
                    <Text style={{fontSize: 14,}}>Mì nước</Text>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 15, paddingRight: 135, marginVertical: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 140}}>Biến thể: </Text>
                    <Text style={{fontSize: 14,}}>Phở gà, phở tái, phở tái lăn, phở gầu, phở sốt vang</Text>
                </View>
                <View style={{marginTop: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <TouchableOpacity
                                onPress={() => selectTab(1)} 
                                style={[state.activeIndex == 1 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 80} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Text style={[state.activeIndex == 1 ? styles.buttonTabActive : styles.buttonTabInActive], {fontSize: 16}}>
                                    BÀI VIẾT
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectTab(2)} 
                                style={[state.activeIndex == 2 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 80} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Text style={[state.activeIndex == 2 ? styles.buttonTabActive : styles.buttonTabInActive], {fontSize: 16}}>
                                    ĐỊA ĐIỂM
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderTabContent({navigation})}
            </ScrollView>
        </View>
    )
};

export default Food;