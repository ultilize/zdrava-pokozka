import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import CameraScreen from '../screens/camera';
import { Image, StyleSheet, Text, View } from 'react-native';

import camera from '../assets/icons/camera.png';
import user from '../assets/icons/user.png';
import home from '../assets/icons/home.png';
import ProfileScreen from '../screens/profile';
import * as React from 'react';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }: any) => {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: [styles.tabContainer, styles.shadow]
        })}>
            <Tab.Screen
                name="Home Page"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            ...styles.tabIcon,
                            borderBottomWidth: focused ? 1 : 0,
                        }}>
                            <Image
                                source={home}
                                resizeMode='contain'
                                style={{
                                    ...styles.tabIcon.icon,
                                    tintColor: focused ? '#FEFFB8' : '#fff',
                                }}
                            />
                            <Text style={{
                                ...styles.tabIcon.text,
                                color: focused ? '#FEFFB8' : '#fff'
                            }}>
                                Domov
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Pressable onPress={() => navigation.navigate('Camera')}>
                            <View style={{
                                ...styles.tabIcon,
                                borderBottomWidth: focused ? 1 : 0,
                            }}>
                                <Image
                                    source={camera}
                                    resizeMode='contain'
                                    style={{
                                        ...styles.tabIcon.icon,
                                        tintColor: focused ? '#FEFFB8' : '#fff'
                                    }}
                                />
                                <Text style={{
                                    ...styles.tabIcon.text,
                                    color: focused ? '#FEFFB8' : '#fff'
                                }}>
                                    Skener
                                </Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
            <Tab.Screen
                name="My Account"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            ...styles.tabIcon,
                            borderBottomWidth: focused ? 1 : 0,
                        }}>
                            <Image
                                source={user}
                                resizeMode='contain'
                                style={{
                                    ...styles.tabIcon.icon,
                                    tintColor: focused ? '#FEFFB8' : '#fff'
                                }}
                            />
                            <Text style={{
                                ...styles.tabIcon.text,
                                color: focused ? '#FEFFB8' : '#fff'
                            }}>
                                Profil
                            </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderTopColor: 'transparent',
        backgroundColor: '#B17756',
        borderRadius: 25,
        height: 80,
        camera: {
            backgroundColor: 'transparent',
            elevation: 0
        }
    },
    tabIcon: {
        alignItems: 'center',
        borderColor: '#FEFFB8',
        justifyContent: 'center',
        top: 2.5,
        text: {
            fontSize: 12,
            fontFamily: 'Poppins_600SemiBold'
        },
        icon: {
            width: 25,
            height: 30,
        }
    }
})