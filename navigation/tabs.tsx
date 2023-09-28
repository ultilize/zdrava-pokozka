import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import CameraScreen from '../screens/camera';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import camera from '../assets/icons/camera.png';
import gallery from '../assets/icons/image-gallery.png';
import home from '../assets/icons/home.png';
import * as React from 'react';
import { Pressable } from 'react-native';
import GalleryScreen from '../screens/gallery';

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
                    tabBarButton: (props) => (
                      <Pressable
                        onPress={() => navigation.navigate('Camera')}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                      >
                        <View style={{
                          ...styles.tabIcon,
                        }}>
                          <Image
                            source={camera}
                            resizeMode='contain'
                            style={{
                              ...styles.tabIcon.icon,
                              tintColor: '#fff'
                            }}
                          />
                          <Text style={{
                            ...styles.tabIcon.text,
                            color: '#fff'
                          }}>
                            Skener
                          </Text>
                        </View>
                      </Pressable>
                    ),
                  }}
            />
            <Tab.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            ...styles.tabIcon,
                            borderBottomWidth: focused ? 1 : 0,
                        }}>
                            <Image
                                source={gallery}
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
                                Galéria
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