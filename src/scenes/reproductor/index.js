
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

//import the hook provided by react-native-track-player to manage the progress
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
//import statement for slider
import Slider from '@react-native-community/slider';

request(
    Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }),
);

const ReproductorScene = () => {

    const [trackIndex, setTrackIndex] = useState(0);

    //Estado Play
    const [estadoPlay, setEstadoPlay] = useState(false);

    //Se maneja la lista de canciones en el dispositivo.
    const [trackList, setTrackList] = useState([]);

    //El track
    const [track, setTrack] = useState(null);

    var song = {
        "id": String,
        "url": String,
        "type": String,
        "title": String,
        "album": String,
        "artist": String,
        "artwork": String
    }

    var data;

    const [cargado, setCargado] = useState(false);

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
                    data.push(song);
                });


                setTrackList(data);
                setTrack(data[trackIndex]);
                setCargado(true);

                TrackPlayer.setupPlayer().then(async () => {
                    await TrackPlayer.reset();
                    await TrackPlayer.add(data);
                    console.log("Se inicia");
                });

            }).catch(error => {
                console.log(error);
            });
        }

    }, []);

    const stop = () => {
        TrackPlayer.stop();
    };

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


    const siguiente = () => {

        if (trackIndex >= trackList.length) {
            setTrackIndex(0);
            setTrack(trackList[trackIndex]);
            TrackPlayer.skip(track.id);
            TrackPlayer.play();
        } else {
            setTrackIndex(trackIndex + 1);
            setTrack(trackList[trackIndex]);
            TrackPlayer.skip(track.id);
            TrackPlayer.play();
        }

        if (TrackPlayer.STATE_PLAYING) {
            setEstadoPlay(false);
        }
        if (TrackPlayer.STATE_PAUSED) {
            setEstadoPlay(true);
        }


    }




    const anterior = () => {
        if (trackIndex < 0) {
            setTrackIndex(trackList.length - 1);
            setTrack(trackList[trackIndex]);
            TrackPlayer.skip(track.id);
            TrackPlayer.play();
        } else {
            setTrackIndex(trackIndex - 1);
            console.log(trackIndex);
            setTrack(trackList[trackIndex]);
            TrackPlayer.skip(track.id);
            TrackPlayer.play();
        }
        if (TrackPlayer.STATE_PLAYING) {
            setEstadoPlay(false);
        }
        if (TrackPlayer.STATE_PAUSED) {
            setEstadoPlay(true);
        }

    }

    return (
        <LinearGradient style={style.containerView} colors={['#34cfeb', '#b8cfd4']} >
            <SafeAreaView>
                <HeaderReproductor />
                <View style={style.imageContainer}>

                    {track == null ? <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} /> : <Image style={{ width: '80%', borderRadius: 50 }} source={require("../../../icons/Fonts/Logo_Music_Verse.jpg")} />}

                </View>
                <View style={style.textContainer}>
                    {track == null ? <Text style={style.textTitle}>titulo</Text> : <Text style={style.textTitle}>{track.title}</Text>}
                </View>

                <View style={style.buttonsContainer}>
                    <Text>0:00</Text>
                    <Slider
                        style={{ width: '60%', height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        value={sliderValue}
                        minimumTrackTintColor="#111000"
                        maximumTrackTintColor="#000000"
                        onSlidingStart={slidingStarted}
                        onSlidingComplete={slidingCompleted}
                    />
                    <Text>{duration}</Text>
                </View>

                <View style={style.buttonsContainer}>

                    <View style={style.buttonPlayPause}>
                        <TouchableOpacity>
                            <Icon
                                name="verticleleft"
                                size={45}
                                color="white"
                                style={{ textAlign: 'center' }}
                                onPress={() => { stop() }}
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
                                onPress={() => { anterior() }}
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
                                onPress={() => { siguiente() }}
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