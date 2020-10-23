
import _interopRequireDefault from '@babel/runtime/helpers/interopRequireDefault';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconOther from 'react-native-vector-icons/dist/EvilIcons';

const ReproductorScene = () => {

    const [estadoPlay, setEstadoPlay] = useState(false);

    return (
        <LinearGradient style={style.containerView} colors={['#34cfeb', '#b8cfd4']} >
            <SafeAreaView>
                <View style={style.imageContainer}>
                    <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} />
                </View>
                <View style={style.textContainer}>
                    <Text style={style.textTitle}>Nombre de la canción</Text>
                </View>

                <View style={style.buttonsContainer}>
                    <Text style={style.textStyle}>   0:00</Text>
                    <Text>   ----------------------------------------------------------------------------------  </Text>
                    <Text style={style.textStyle}>3:15</Text>
                </View>

                <View style={style.buttonsContainer}>

                    <View style={style.buttonPlayPause}>
                        <Icon
                            name="verticleleft"
                            size={45}
                            color="white"
                            style={{ textAlign: 'center' }}
                            onPress={() => { setEstadoPlay(false); }}
                        />
                    </View>

                    <View style={style.buttonPlayPause}>
                        <Icon
                            name="stepbackward"
                            size={45}
                            color="white"
                            style={{ textAlign: 'center' }}
                            onPress={() => { setEstadoPlay(false); }}
                        />

                    </View>
                    <View style={style.buttonPlayPause}>
                        {
                            estadoPlay == false ? <Icon
                                name="caretright"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { setEstadoPlay(true); }}
                            /> : <Icon
                                    name="pause"
                                    size={45}
                                    color="white"
                                    style={{ textAlign: 'center' }}
                                    onPress={() => { setEstadoPlay(false); }}
                                />
                        }
                    </View>
                    <View style={style.buttonPlayPause}>
                        <Icon
                            name="stepforward"
                            size={45}
                            color="white"
                            style={{ textAlign: 'center' }}
                            onPress={() => { setEstadoPlay(false); }}
                        />
                    </View>

                    <View style={style.buttonPlayPause}>
                        <Icon
                            name="retweet"
                            size={45}
                            color="white"
                            style={{ textAlign: 'center' }}
                            onPress={() => { setEstadoPlay(false); }}
                        />
                    </View>

                </View>
                <View style={style.buttonsContainer}>
                    <Icon
                        name="profile"
                        size={45}
                        color="white"
                        style={{ textAlign: 'center' }}
                    />
                    <Text style={style.textTitle}>Letra</Text>
                </View>
            </SafeAreaView>

        </LinearGradient>
    );
}

const style = StyleSheet.create({

    containerView: {
        width: '100%',
        height: '100%'
    },
    textTitle: {
        color: 'white',
        fontSize: 30
    },
    buttonPlayPause: {
        width: 50,
        margin: 10,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        margin: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }, textStyle: {
        color: 'white',
        fontSize: 15
    },
    textContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ReproductorScene;