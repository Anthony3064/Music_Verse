
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

import IconEntypo from 'react-native-vector-icons/dist/Entypo';

//import the hook provided by react-native-track-player to manage the progress
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
//import statement for slider
import Slider from '@react-native-community/slider';
//Pide permisos del dispositivo
request(
    Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }),
);

const ReproductorScene = ({ route }) => {

    //Index de la canción
    const [trackIndex, setTrackIndex] = useState();

    //Estado Play
    const [estadoPlay, setEstadoPlay] = useState(false);

    //Se maneja la lista de canciones en el dispositivo.
    const [trackList, setTrackList] = useState(route.params);

    //El track
    const [track, setTrack] = useState(null);

    /*
    //Para parse los datos del Music File a los que permite el TrackPlayer
    var song = {
        "id": String,
        "url": String,
        "type": String,
        "title": String,
        "album": String,
        "artist": String,
        "artwork": String,
        "duration": Number,
    }

    //Almaceno las canciones de manera temporal.
    var data;

    //Para controlar que solo se carguen las canciones una vez
    const [cargado, setCargado] = useState(false);

    //Cargo las canciones e inicializo el track player con la lista de canciones
    useEffect(() => {

        if (!cargado) {
            getTracks({
            }).then(tracks => {

                data = [];

                tracks.forEach(element => {
                    song = {};
                    song.id = element.id;
                    song.url = element.path;
                    song.type = "default";
                    song.title = element.title;
                    song.album = element.album;
                    song.artist = element.artist;
                    song.artwork = element.cover;
                    song.duration = element.duration;
                    data.push(song);
                });

                if (data.length) {

                    TrackPlayer.setupPlayer().then(() => {
                        TrackPlayer.reset();
                        TrackPlayer.add(data);

                        TrackPlayer.updateOptions({
                            stopWithApp: true,
                            capabilities: [
                                TrackPlayer.CAPABILITY_PLAY,
                                TrackPlayer.CAPABILITY_PAUSE,
                                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                                TrackPlayer.CAPABILITY_STOP
                            ],
                            compactCapabilities: [
                                TrackPlayer.CAPABILITY_PLAY,
                                TrackPlayer.CAPABILITY_PAUSE
                            ]
                        });

                        console.log("Se inicia");
                        setTrackList(data);
                        setTrack(data[trackIndex]);
                        console.log(listTest);
                    });

                }

            }).catch(error => {
                console.log(error);
            });

            setIsInit(true);
            setCargado(true);
        }

    });

    const stop = () => {
        TrackPlayer.stop();
    };*/

    //Cambio el estado del botón de play al darle click y pauso o reproduzco la canción.
    const alPresionar = () => {

        if (estadoPlay) {
            TrackPlayer.pause();
            setEstadoPlay(false);
        } else {
            TrackPlayer.play();
            setEstadoPlay(true);
        }
    }

    //the value of the slider should be between 0 and 1
    const [sliderValue, setSliderValue] = useState(0);

    //flag to check whether the use is sliding the seekbar or not
    const [isSeeking, setIsSeeking] = useState(false);

    //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
    //These values will update every 250ms 
    const { position, duration } = useTrackPlayerProgress(250);

    //this hook updates the value of the slider whenever the current position of the song changes
    useEffect(() => {
        if (!isSeeking && position && duration) {
            setSliderValue(position / duration);
        }

    }, [position, duration]);

    //this function is called when the user starts to slide the seekbar
    const slidingStarted = () => {
        setIsSeeking(true);
    };
    //this function is called when the user stops sliding the seekbar
    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
        setIsSeeking(false);
    };

    //Pasa a la siguiente canción en el arrglo
    const siguiente = () => {

        if (shufflePressed) {

            let random = randomNumber();

            console.log(random + " el random");

            while (random === trackIndex) {
                random = randomNumber();
            }

            setTrackIndex(random);

        } else {

            //Almaceno el valor del index
            let count = trackIndex + 1;

            //Valido si el index es el máximo en el arreglo y si es así pone la primera canción.
            if (count == trackList.length) {
                setTrackIndex(0);
            } else {
                setTrackIndex(trackIndex => trackIndex + 1);
            }

        }



    }

    //Pasa a la canción anterior del arreglo
    const anterior = () => {

        if (shufflePressed) {

            let random = randomNumber();

            console.log(random + " el random");

            while (random === trackIndex) {
                random = randomNumber();
            }

            setTrackIndex(random);

        } else {

            //Almaceno el index para validar
            let count = trackIndex - 1;

            //Si el index es menor a 0 se pone la última canción del arreglo
            if (count < 0) {
                setTrackIndex(trackList.length - 1);
            } else {
                setTrackIndex(trackIndex => trackIndex - 1);
            }
        }
    }

    //Para validar si el TrackPlayer ya fue inicializado
    const [isInit, setIsInit] = useState(false);

    //Cargo el front de la canción y además se controlan los cambios.
    useEffect(() => {

        //console.log("Se cambia a " + trackIndex);

        if (trackList != null && trackList.length > 0 && track != null) {

            //console.log(trackIndex);
            setTrack(trackList[trackIndex]);
            TrackPlayer.skip(track.id);

            TrackPlayer.play();

            if (TrackPlayer.STATE_PLAYING) {
                setEstadoPlay(true);
            } else if (TrackPlayer.STATE_PAUSED) {
                setEstadoPlay(false);
            }
        }

    }, [trackIndex, track, TrackPlayer]);

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 59000);
        var seconds = ((millis % 59000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    //Valida el shuffle si esta presionado o no
    const [shufflePressed, setShufflePressed] = useState(false);


    function randomNumber() {
        return Math.floor(Math.random() * trackList.length);
    }

    useEffect(() => {

        if (millisToMinutesAndSeconds((position) * 1000) === "0:00" && track != null) {

            if (replay) {

                TrackPlayer.getCurrentTrack().then(currentTrack => {

                    if (currentTrack != track.id) {
                        var indexReplay = indexOfTrackList(track.id);
                        setTrackIndex(indexReplay);
                        TrackPlayer.skip(track.id);
                    }
                });

            } else {

                TrackPlayer.getCurrentTrack().then(currentTrack => {

                    if (currentTrack != track.id) {
                        var index = indexOfTrackList(currentTrack);
                        setTrackIndex(index);
                    }
                });

            }
        }

    })

    function indexOfTrackList(id) {

        let value;
        let encontrado = false;

        trackList.forEach(trackElement => {
            if (trackElement.id == id && !encontrado) {
                value = trackList.indexOf(trackElement);
                encontrado = true;
            }
        });

        return value
    }

    const [replay, setReplay] = useState(false);

    return (
        <LinearGradient style={style.containerView} colors={['#34cfeb', '#b8cfd0']} >
            <SafeAreaView>
                {/*<Button title='TEST' onPress={() => { _getSongs() }} />*/}
                <HeaderReproductor />

                <View style={style.imageContainer}>
                    {track == null ? <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} /> : <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} />}
                </View>
                <View style={style.textContainer}>
                    {track == null ? <Text style={style.textTitle}>Titulo</Text> : <Text style={style.textTitle}>{track.title.length >= 35 ? track.title.substring(0, 35) + "..." : track.title}</Text>}
                </View>

                <View style={style.sliderContainer}>
                    <Text style={{ fontSize: 16, color: 'white' }}>{millisToMinutesAndSeconds((position) * 1000)}</Text>
                    <Slider
                        style={{ width: '75%', height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        value={sliderValue}
                        minimumTrackTintColor="green"
                        maximumTrackTintColor="#ffffff"
                        onSlidingStart={slidingStarted}
                        onSlidingComplete={slidingCompleted}
                    />
                    <Text style={{ fontSize: 16, color: 'white' }}>{millisToMinutesAndSeconds(duration * 1000)}</Text>
                </View>

                <View style={style.buttonsContainer}>

                    {shufflePressed ? <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <IconEntypo
                                name="shuffle"
                                size={35}
                                color="black"
                                style={{ textAlign: 'center', backgroundColor: "white", borderRadius: 100, }}
                                onPress={() => { setShufflePressed(false) }}
                            />
                        </TouchableOpacity>
                    </View> : <View style={style.buttonPlayPause}>
                            <TouchableOpacity>
                                <IconEntypo
                                    name="shuffle"
                                    size={35}
                                    color="white"
                                    style={{ textAlign: 'center' }}
                                    onPress={() => { setShufflePressed(true) }}
                                />
                            </TouchableOpacity>
                        </View>}


                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="stepbackward"
                                size={35}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { anterior() }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonPlayPause}>
                        {
                            estadoPlay == false ? <TouchableOpacity><Icon
                                name="caretright"
                                size={35}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { alPresionar(); setEstadoPlay(true) }}
                            /></TouchableOpacity> : <TouchableOpacity><Icon
                                name="pause"
                                size={35}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { alPresionar(); setEstadoPlay(false) }}
                            />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="stepforward"
                                size={35}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { siguiente() }}
                            />
                        </TouchableOpacity>
                    </View>

                    {replay ? <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="retweet"
                                size={35}
                                color="black"
                                style={{ textAlign: 'center', backgroundColor: "white", borderRadius: 100, }}
                                onPress={() => { setReplay(false) }}
                            />
                        </TouchableOpacity>
                    </View> : <View style={style.buttonPlayPause}>
                            <TouchableOpacity>
                                <Icon
                                    name="retweet"
                                    size={35}
                                    color="white"
                                    style={{ textAlign: 'center' }}
                                    onPress={() => { setReplay(true) }}
                                />
                            </TouchableOpacity>
                        </View>}

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
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        margin: '2%',
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
        margin: '2%',
    }
});

export default ReproductorScene;