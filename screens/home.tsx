import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Pressable } from 'react-native';
import background from '../assets/backgrounds/homepage.png';

import slogan from '../assets/arrows.png';

// ts ingore

const HomeScreen = ({ navigation }: any) => {
    return (
        <>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{
                        ...styles.content.title,
                        textAlign: 'center'
                    }}>
                        Skúmaj Svoje Znamieko v Čas!
                    </Text>
                    <ImageBackground source={slogan} alt="Slogal" resizeMode='contain' style={{
                        ...styles.content.slogan,
                        alignItems: 'center'
                    }}>
                        <Text style={styles.content.slogan.text}>Odfoť</Text>
                        <Text style={styles.content.slogan.text}>Označ</Text>
                        <Text style={styles.content.slogan.text}>Zisťuj!</Text>
                    </ImageBackground>
                </View>
                <Image
                    source={background}
                    resizeMode="cover"
                    style={styles.imageBackground}
                />
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFCFAC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 'auto',
        marginBottom: 'auto',
        paddingBottom: 300,
        maxWidth: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        slogan: {
            height: 170,
            width: 210,
            gap: 35,
            marginTop: 30,
            text: {
                fontFamily: 'Poppins_500Medium',
                color: '#564B42',
                fontSize: 20
            },
        },
        title: {
            fontFamily: 'Poppins_700Bold',
            fontSize: 30,
            color: '#564B42'
        }
    },
    imageBackground: {
        flex: 1,
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        height: 400,
        width: '100%',
        left: 0,
        right: 0,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#564B42',
        textAlign: 'center',
        padding: 16,
    },
});

export default HomeScreen;
