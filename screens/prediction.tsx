import React from 'react'
import { View, Text, Image, Pressable } from 'react-native';

const PredictionScreen = ({ navigation, route }: any) => {
    const { predictionData } = route.params;

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FEECDF'
        }}>
            <View>

                <Text style={{
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 26,
                    color: '#564B42',
                    maxWidth: 300,
                    textAlign: 'center',
                }}>
                    Zistili sme, že máš {predictionData?.title}
                </Text>

            </View>
            <View style={{
                height: 150,
                marginTop: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>

                <View style={{
                    height: 150,
                    width: 150,
                    overflow: 'hidden',
                    borderRadius: 15,
                }}>
                    <Image source={{ uri: predictionData?.original }} alt="photo" style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }} />
                </View>
                <Text style={{
                    fontFamily: 'Poppins_700Bold',
                    color: '#564B42',
                    fontSize: 30
                }}>
                    {`>`}
                </Text>
                <View style={{
                    height: 150,
                    width: 150,
                    overflow: 'hidden',
                    borderRadius: 15,
                }}>
                    <Image source={predictionData.typeImage} alt="photo" style={{
                        height: '100%',
                        width: '100%'
                    }} />
                </View>

            </View>
            <View style={{
                marginVertical: 30,
                display: 'flex',
                flexDirection: 'row',
                gap: 8
            }}>

                <Text style={{
                    fontFamily: 'Poppins_500Medium',
                    color: '#564B42',
                    fontSize: 25
                }}>
                    Istota:
                </Text>
                <Text style={{
                    fontFamily: 'Poppins_700Bold',
                    color: '#564B42',
                    fontSize: 25
                }}>
                    {predictionData.probability}
                </Text>

            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('Home')} style={{
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: '#564B42'
                }}>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'Poppins_600SemiBold',
                    }}>
                        Dobre!
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PredictionScreen;