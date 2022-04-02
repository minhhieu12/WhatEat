import React from 'react';
import {Home, Map, Add, Notify, Account,} from "../screens"
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const appStack = () => {
    return(
        <Tab.Navigator 
            initialRouteName="Home" 
            labeled={false} 
            barStyle={{backgroundColor: "#ffffff"}}
            activeColor="#00B060"
            inactiveColor="#CDCDCD"    
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen 
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="map" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen 
                name="Add"
                component={Add}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-circle" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen 
                name="Noti"
                component={Notify}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="bell" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen 
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" color={color} size={24} />
                    )
                }}
            />
        </Tab.Navigator>
    )
};

export default appStack;