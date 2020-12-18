/* eslint-disable prettier/prettier */
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, FlatList, View, Image, Text, TextInput } from 'react-native';
import { getTracks, MusicFile } from 'react-native-music-files';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import TrackPlayer from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import Slider from '@react-native-community/slider';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import IconFeather from 'react-native-vector-icons/dist/Feather';

const Music_Library = (props) => {
  const { navigation } = props;

  var song = {
    id: String,
    url: String,
    type: String,
    title: String,
    album: String,
    artist: String,
    artwork: String,
    duration: Number,
    favorite: Boolean,
  };

  var music;

  const [cargado, setCargado] = useState(false);

  var [trackList, setTrackList] = useState(null);
  var [trackListComplete, setTrackListComplete] = useState(null);

  const [trackIndex, setTrackIndex] = useState(null);

  const [selectedId, setId] = useState(null);

  const [currentItem, setCurrentItem] = useState(null);

  const [estadoPlay, setEstadoPlay] = useState(false);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  const { position, duration } = useTrackPlayerProgress(250);

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
            song.favorite = false;
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
            setTrackListComplete(music);
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
        style={{ width: '107%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        minimumTrackTintColor="#221680"
        maximumTrackTintColor="#221680"
        disabled={true}
      />
    );
  };

  const findTrack = (id) => {
    let t = trackList.find((x) => x.id === id);
    return t;
  };

  const updateFieldChanged = (item) => {

    let newTrackList = [];

    let favorite = item.favorite;

    trackList.forEach(element => {

      if (element.id === item.id) {

        if (favorite) {
          favorite = false;
        } else {
          favorite = true;
        }


        song = {};
        song.id = element.id;
        song.url = element.path;
        song.type = 'default';
        song.title = element.title;
        song.album = element.album;
        song.artist = element.artist;
        song.artwork = element.cover;
        song.duration = element.duration;
        song.favorite = favorite;
        newTrackList.push(song)

      } else {
        song = {};
        song.id = element.id;
        song.url = element.path;
        song.type = 'default';
        song.title = element.title;
        song.album = element.album;
        song.artist = element.artist;
        song.artwork = element.cover;
        song.duration = element.duration;
        song.favorite = false;
        newTrackList.push(song)
      }
    })
    console.log(favorite);
    setTrackList(newTrackList);
  }

  const MiniReproductor = () => {
    return (
      <View style={styles.minireproductorView}>
        <View style={styles.sliderContainer}>{showSlider()}</View>
        <TextTicker
          scrollSpeed={200}
          animationType={'scroll'}
          bounce={false}
          shouldAnimateTreshold={40}
          style={{ color: '#fff', fontSize: 18 }}>
          {currentItem === null ? '' : currentItem.title}
        </TextTicker>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonPlayPause}>
            <TouchableOpacity>
              <Icon
                name="stepbackward"
                size={35}
                color="white"
                style={{ textAlign: 'center' }}
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
                  style={{ textAlign: 'center' }}
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
                    style={{ textAlign: 'center' }}
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
                style={{ textAlign: 'center' }}
                onPress={() => {
                  siguiente();
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonPlayPause}>
            <TouchableOpacity>
              <Icon
                name="arrowsalt"
                size={35}
                color="white"
                style={{ textAlign: 'right' }}
                onPress={() => {
                  navigation.navigate('Reproductor', {
                    trackListParam: trackList,
                    idParam: currentItem.id,
                  });
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 50 }}
        source={require('../../icons/MusicVerse.png')}
      />
      <Text style={{ marginTop: 2.8, fontSize: 16 }}>
        {'  '}
        {item.title.length > 35
          ? item.title.substring(0, 35 - 4) + '...'
          : item.title}
        <Text style={{ color: '#7A7A7A' }}>
          {'\n'}
          {'  '}
          {item.artist} {millisToMinutesAndSeconds(item.duration)}
        </Text>
      </Text>
      {item.favorite ? <View style={styles.buttonStyle}>
        <TouchableOpacity>
          <IconFeather
            name="music"
            size={50}
            color="red"
            onPress={() => {
              console.log('Sub Meno');
            }}
          />
        </TouchableOpacity>
      </View> : <View style={styles.buttonStyle}>
          <TouchableOpacity>
            <IconFeather
              name="music"
              size={50}
              color="white"
              onPress={() => {
                console.log('Sub Meno');
              }}
            />
          </TouchableOpacity>
        </View>}

    </TouchableOpacity>
  );

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 59000);
    var seconds = ((millis % 59000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#34B3D3' : 'transparent';

    return (
      <Item
        item={item}
        onPress={() => {
          setId(item.id);
          setCurrentItem(item);
          setIndex(item.id);
          console.log(item.favorite);
          updateFieldChanged(item);
          console.log(item.favorite);
        }}
        style={{ backgroundColor }}
      />
    );
  };

  const [word, setWord] = useState("");

  const search = () => {

    return (<View style={{ marginBottom: 10, padding: 5, backgroundColor: 'transparent', }}>
      <TextInput
        style={{ height: 45, backgroundColor: 'transparent', fontSize: 20 }}
        placeholder={trackList != null ? "Search... (" + trackList.length + ")" : "Search..."}
        onChangeText={(word) => setWord({ word })}
      />
    </View>);

  }
  const findTrackByTitle = (titleParam) => {
    let tempList = [];
    if (trackList != null) {
      trackList.forEach(element => {
        let title = element.title.toLowerCase();
        if (title.includes(titleParam.toLowerCase())) {
          tempList.push(element);

        }
      })
    }
    setTrackList(tempList);

    return titleParam;
  };

  useEffect(() => {

    if (word.word !== "") {
      findTrackByTitle(word.word);
    } else {
      setTrackList(trackListComplete);
    }

  }, [word])

  return (
    <LinearGradient
      style={styles.containerView}
      colors={['#34cfeb', '#b8cfd4']}>
      <View style={styles.upperView}>
        {search()}
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={trackList}
          extraData={selectedId}
          renderItem={renderItem}
        />
      </View>
      {currentItem !== null ? MiniReproductor() : null}
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
    marginTop: 70,
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
  buttonStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default Music_Library;