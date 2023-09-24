import React from 'react'
import { View, ImageBackground, ActivityIndicator, Image, Text, StyleSheet } from 'react-native';
import background from '../assets/backgrounds/loadingscreen.png';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.content}>
                    <View style={styles.contentText}>
                        <Image source={logo} alt="logo" style={styles.logoImage}/>
                        <Text style={styles.text}>Zdravá Pokožka</Text>
                    </View>
                    <View>  
                        <ActivityIndicator size={75 || 'large'} color="#564B42" />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 'auto',
        paddingTop: 175,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 'auto',
    },
    contentText: {
        marginBottom: 125,
        alignItems: 'center',
    },
    logoImage: {
        height: 100,
        borderRadius: 25,
        width: 100,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#564B42',
        textAlign: 'center',
        padding: 16,
    },
});

export default LoadingScreen