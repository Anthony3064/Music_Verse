
import _interopRequireDefault from '@babel/runtime/helpers/interopRequireDefault';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import HeaderReproductor from './../../components/atom/HeaderReproducto';
import FooterReproductor from './../../components/atom/FooterReproductor'

import { getTracks, MusicFile } from 'react-native-music-files';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import TrackPlayer from 'react-native-track-player';

request(
    Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }),
);

const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
        id: idParam,
        url: urlParam,
        type: typeParam,
        title: titleParam,
        album: albumParam,
        artist: artistParam,
        artwork: artworkParam,
    });
    return true;
};

const ReproductorScene = () => {

    //Estado Play
    const [estadoPlay, setEstadoPlay] = useState(false);

    //Se maneja la lista de canciones en el dispositivo.
    const [trackList, setTrackList] = useState([]);

    //El track
    const [track, setTrack] = useState(null);


    useEffect(() => {

        getTracks({
        }).then(tracks => {

            setTrackList([]);

            tracks.forEach(element => {
                console.log(element.title);
            });

            setTrackList(tracks);
            setTrack(tracks[0]);


        }).catch(error => {
            alert('Hubo un error');
            console.log(error);
        });



        /*const startPlayer = async () => {
            let isInit = await trackPlayerInit();
            setIsTrackPlayerInit(isInit);
        }
        startPlayer();*/

    }, []);

    const [isInit, setIsInit] = useState(false);

    const alPresionar = () => {

        if (!isInit) {
            TrackPlayer.setupPlayer();
            TrackPlayer.add({
                id: track.id,
                url: track.path,
                type: 'default',
                title: track.title,
                album: track.album,
                artist: track.artist,
                artwork: track.cover,
            });
            setIsInit(true);
        };

        if (estadoPlay) {
            TrackPlayer.pause();
            setEstadoPlay(false);
        } else {
            TrackPlayer.play();
            setEstadoPlay(true);
        }


    }

    return (
        <LinearGradient style={style.containerView} colors={['#34cfeb', '#b8cfd4']} >
            <SafeAreaView>
                {/*<Button title='TEST' onPress={() => { _getSongs() }} />*/}
                <HeaderReproductor />

                <View style={style.imageContainer}>

                    {track == null ? <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} /> : <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} />}

                </View>
                <View style={style.textContainer}>
                    {track == null ? <Text style={style.textTitle}>titulo</Text> : <Text style={style.textTitle}>{track.title}</Text>}
                </View>

                <View style={style.buttonsContainer}>
                    <Text style={style.textStyle}>   0:00</Text>
                    <Text>   ----------------------------------------------------------------------------------  </Text>
                    {track == null ? <Text style={style.textStyle}>3:13</Text> : <Text style={style.textStyle}>{track.duration}</Text>}
                </View>

                <View style={style.buttonsContainer}>

                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="verticleleft"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { alPresionar() }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="stepbackward"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { setEstadoPlay(false); }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonPlayPause}>
                        {
                            estadoPlay == false ? <TouchableOpacity><Icon
                                name="caretright"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { alPresionar() }}
                            /></TouchableOpacity> : <TouchableOpacity><Icon
                                name="pause"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { alPresionar() }}
                            />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="stepforward"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { setEstadoPlay(false); }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="retweet"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { setEstadoPlay(false); }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FooterReproductor />
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
        fontSize: 20
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
        margin: '5%',
    }
});

export default ReproductorScene;