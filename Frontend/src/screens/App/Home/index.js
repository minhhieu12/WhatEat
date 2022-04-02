import React from 'react'
import {Text, View} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ForYou from './forYou'
import YourFollow from './yourFollow';

const Tab = createMaterialTopTabNavigator();

function Home() {
    return (
        <Tab.Navigator 
            initialRouteName="Dành cho bạn" 
            labeled={true} 
            screenOptions={{
                tabBarActiveTintColor: '#00b060',
                tabBarInactiveTintColor: '#cdcdcd',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#f2f2f2' },
                tabBarIndicatorStyle: {backgroundColor: '#00b060'}
            }}
        >
            <Tab.Screen 
                name="Đang theo dõi"
                component={YourFollow}
            />
            <Tab.Screen 
                name="Dành cho bạn"
                component={ForYou}
            />
        </Tab.Navigator>
    );
};

export default Home;