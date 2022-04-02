import React from 'react'
import {Text, View, Image, StyleSheet, TextInput} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

function Chat() {
    const navigation = useNavigation();

    return (
        <View> 
            <View style={{marginTop: 10}}>
                <TouchableOpacity 
                    style={{marginBottom: -27, marginTop: 10, marginLeft: 10}}
                    onPress={() => navigation.goBack()}    
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Image source={require('../../../assets/img/ava2.png')} style={{width: 40, height: 40, borderRadius: 20}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Phước Trung</Text>
                        <Text style={{fontStyle: 'italic'}}>Đang hoạt động</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingBottom: 200, marginTop: 20, marginHorizontal: 10}}>
                <ScrollView>                          
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 100, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white'}}>
                            Hi Trung
                        </Text>
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',
                                marginTop: 2}}>
                            Sorry to bother you. I have a question for you
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 120, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            OK, what’s up?
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',}}>
                            I’ve been having a problem with my computer.
                        </Text>
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',
                                marginTop: 2}}>
                            I know you’re an engineer so I thought you might be able to help me.
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 200, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            I see. What’s the problem?
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',}}>
                            I have a file that I can’t open for some reason.
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 170, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            What type of file is it?
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',}}>
                           It’s a Word document I’ve been working on
                        </Text>
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',
                                marginTop: 2}}>
                            I need to finish it by tomorrow
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            Were you able to open it before, on the computer you’re using now?
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',}}>
                           Yes, I was working on it last night and everything was fine
                        </Text>
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',
                                marginTop: 2}}>
                            but this morning I couldn’t open the file.
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            Do you think your computer might have a virus?
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>  
                        <Text 
                            style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 230, 
                                textAlign: 'right',
                                paddingHorizontal: 10,
                                backgroundColor: '#00b060',
                                color: 'white',}}>
                            No, I checked and there weren’t any.
                        </Text>
                    </View>
                    <View style={{marginTop: 5}}>  
                        <View style={{ 
                                paddingVertical: 10, 
                                borderRadius: 8, 
                                width: 40, 
                                textAlign: 'left',
                                paddingHorizontal: 10,
                                backgroundColor: 'lightgrey'}}>
                            <Feather name='more-horizontal'/>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                <TextInput
                    placeholder='Nhập tin nhắn của bạn'
                    style={styles.textInput}
                />
                <TouchableOpacity>
                    <Feather name='send' style={{fontSize: 32, marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    bottonTab: {
        flexDirection: 'row',
      backgroundColor: 'white',
      width: 370,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 70,
      flex: 1,
      borderRadius: 8,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: '#c4c4c4',
        borderRadius: 8,
        width: 310
    },
    container2: {
        flexDirection: 'row',
        marginLeft: 50,
        marginTop: -10,
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
    }
})