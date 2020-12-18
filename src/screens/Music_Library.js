/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, FlatList, View, Image, Text} from 'react-native';
import {getTracks, MusicFile} from 'react-native-music-files';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import TrackPlayer from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import Slider from '@react-native-community/slider';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';

const Music_Library = (props) => {
  const {navigation} = props;

  var song = {
    id: String,
    url: String,
    type: String,
    title: String,
    album: String,
    artist: String,
    artwork: String,
    duration: Number,
  };

  var music;

  const [cargado, setCargado] = useState(false);

  const [trackList, setTrackList] = useState(null);

  const [trackIndex, setTrackIndex] = useState(null);

  const [selectedId, setId] = useState(null);

  const [currentItem, setCurrentItem] = useState(null);

  const [estadoPlay, setEstadoPlay] = useState(false);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  const {position, duration} = useTrackPlayerProgress(250);

  useEffect(() => {
    if (!cargado) {
      getTracks({})
        .then((tracks) => {
          music = [];

          tracks.forEach((element) => {
            song = {};
            song.id = element.id;
            song.url = element.path;
            song.type = 'default';
            song.title = element.title;
            song.album = element.album;
            song.artist = element.artist;
            song.artwork = element.cover;
            song.duration = element.duration;
            music.push(song);
          });

          if (music.length > 0) {
            console.log('Se inicia');
            TrackPlayer.setupPlayer()
              .then(async () => {
                console.log('Track Player Iniciado');
                await TrackPlayer.destroy();
                await TrackPlayer.reset();
                await TrackPlayer.add(music);

                TrackPlayer.updateOptions({
                  stopWithApp: true,
                  capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                    TrackPlayer.CAPABILITY_STOP,
                  ],
                  compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                  ],
                });
                setCargado(true);
              })
              .catch((error) => {
                console.log('Algo pasa ==> ' + error);
              });
            setTrackList(music);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setCargado(true);
    }
  });

  useEffect(() => {
    if (position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  useEffect(() => {
    console.log(trackIndex);
    if (trackIndex !== null) {
      TrackPlayer.skip(trackList[trackIndex].id);
      TrackPlayer.play();
      TrackPlayer.STATE_PLAYING ? setEstadoPlay(true) : setEstadoPlay(false);
      setId(trackList[trackIndex].id);
      setCurrentItem(trackList[trackIndex]);
    }
  }, [trackIndex]);

  const siguiente = () => {
    //Almaceno el valor del index
    let count = trackIndex + 1;

    //Valido si el index es el máximo en el arreglo y si es así pone la primera canción.
    if (trackList.length === count) {
      setTrackIndex(0);
    } else {
      setTrackIndex(count);
    }
  };

  function setIndex(id) {
    let index;
    let t = trackList.find((x) => x.id === id);
    index = trackList.indexOf(t);
    setTrackIndex(index);
    console.log(trackIndex);
  }

  const anterior = () => {
    //Almaceno el valor del index
    let count = trackIndex - 1;

    //Valido si el index es el máximo en el arreglo y si es así pone la primera canción.
    if (count < 0) {
      setTrackIndex(trackList.length - 1);
    } else {
      setTrackIndex(count);
    }
  };

  const showSlider = () => {
    return (
      <Slider
        style={{width: '107%', height: 40}}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        minimumTrackTintColor="#221680"
        maximumTrackTintColor="#221680"
        disabled={true}
      />
    );
  };

  const MiniReproductor = () => {
    return (
      <View style={styles.minireproductorView}>
        <View style={styles.sliderContainer}>
        {showSlider()}
        </View>
        <TextTicker
          scrollSpeed={200}
          animationType={'scroll'}
          bounce={false}
          shouldAnimateTreshold={40}
          style={{color: '#fff', fontSize: 18}}>
          {currentItem === null ? '' : currentItem.title}
        </TextTicker>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonPlayPause}>
            <TouchableOpacity>
              <Icon
                name="stepbackward"
                size={35}
                color="white"
                style={{textAlign: 'center'}}
                onPress={() => {
                  anterior();
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonPlayPause}>
            {estadoPlay === false ? (
              <TouchableOpacity>
                <Icon
                  name="caretright"
                  size={35}
                  color="white"
                  style={{textAlign: 'center'}}
                  onPress={() => {
                    TrackPlayer.play();
                    setEstadoPlay(true);
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon
                  name="pause"
                  size={35}
                  color="white"
                  style={{textAlign: 'center'}}
                  onPress={() => {
                    TrackPlayer.pause();
                    setEstadoPlay(false);
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonPlayPause}>
            <TouchableOpacity>
              <Icon
                name="stepforward"
                size={35}
                color="white"
                style={{textAlign: 'center'}}
                onPress={() => {
                  siguiente();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image
        style={{width: 50, height: 50, borderRadius: 50}}
        source={require('../../icons/MusicVerse.png')}
      />
      <Text style={{marginTop: 2.8, fontSize: 16}}>
        {'  '}
        {item.title.length > 35
          ? item.title.substring(0, 35 - 4) + '...'
          : item.title}
        <Text style={{color: '#7A7A7A'}}>
          {'\n'}
          {'  '}
          {item.artist}
        </Text>
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#34B3D3' : 'transparent';

    return (
      <Item
        item={item}
        onPress={() => {
          setId(item.id);
          setCurrentItem(item);
          setIndex(item.id);
          /**navigation.navigate('Reproductor', {
            trackListParam: trackList,
            idParam: item.id,
            cargadoParam: false,
          });**/
        }}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <LinearGradient
      style={styles.containerView}
      colors={['#34cfeb', '#b8cfd4']}>
      <View style={styles.upperView}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={trackList}
          extraData={selectedId}
          renderItem={renderItem}
        />
      </View>
      {MiniReproductor()}
      {/**<MiniReproductor item={currentItem} stateSong={estadoPlay} />**/}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'transparent',
    fontSize: 12,
  },
  upperView: {
    marginTop: 120,
  },
  minireproductorView: {
    width: '100%',
    height: '10%',
    backgroundColor: '#34B3D3',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  buttonPlayPause: {
    width: 50,
    margin: 10,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: '5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Music_Library;
