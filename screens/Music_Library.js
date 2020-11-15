/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {Text} from 'expo-ui-kit';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, FlatList, View, Image} from 'react-native';
import { getTracks, MusicFile } from 'react-native-music-files';
import TrackPlayer from 'react-native-track-player';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Music_Library = () => {

  var song = {
    "id": String,
    "url": String,
    "type": String,
    "title": String,
    "album": String,
    "artist": String,
    "artwork": String,
    "duration": Number,
};

  var music;

  const [cargado, setCargado] = useState(false);

  const [trackList, setTrackList] = useState(null);

  const [track, setTrack] = useState(null);

  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {

    if (!cargado) {
        getTracks({
        }).then(tracks => {

            music = [];

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
                music.push(song);
            });
            //console.log(music);

            if (music.length > 0) {

                TrackPlayer.setupPlayer().then(() => {
                    TrackPlayer.reset();
                    TrackPlayer.add(music);
                    /*data.forEach(i => {
                        console.log(i.id);
                    });*/
                    console.log("Se inicia");
                    setTrackList(music);
                    //setTrack(music[trackIndex]);
                    //{trackList == null ? <Text>No hay nada</Text>: <Text>{trackList.map(T => (T.title + "\n"))}</Text>} para imprimir las canciones en pantalla
                });

            }

        }).catch(error => {
            console.log(error);
        });

        setCargado(true);
    }

});

/*useEffect( () => {
  if (trackList != null){
    console.log(trackList);
  }
});*/

  return (
    <LinearGradient
      style={styles.containerView}
      colors={['#34cfeb', '#b8cfd4']}>
      <View style={styles.upperView}>
      <FlatList
        numColumns={1}
        keyExtractor={(item) => item.id}
        data={trackList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { TrackPlayer.skip(item.id); TrackPlayer.play() }}>
            <Image style={{ width: '80%', borderRadius: 50 }} source={require("../icons/MusicVerse.png")} />
            <Text style={styles.item}>{item.artist} - {item.title} {"\n"}{item.artist}</Text>
        </TouchableOpacity>
        )}
      />
      </View>
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
  },
  item: {
    flex: 1,
    marginRight: 60,
    width: 420,
    borderWidth: 2,
    borderColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 30,
    backgroundColor: 'transparent',
    fontSize: 12,
  },
  upperView: {
    marginTop: 120,
  },
});

export default Music_Library;
