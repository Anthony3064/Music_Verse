/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Text } from 'expo-ui-kit';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, FlatList, View, Image } from 'react-native';
import { getTracks, MusicFile } from 'react-native-music-files';
import TrackPlayer from 'react-native-track-player';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker'

const Music_Library = props => {

  const {navigation} = props;

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

        if (music.length > 0) {

          TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.reset();
            TrackPlayer.add(music);
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
    //Hacer que una variable cambia de texto a textTicker para poder activar la animacion por cancion seleccionada.
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
            <View style={styles.item}>
              <TouchableOpacity style={{ display: "flex", flexDirection: "row" }} onPress={() => navigation.navigate('Reproductor', {"trackListParam": trackList, "idParam": item.id})}>
                <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={require("../../icons/MusicVerse.png")} />
                <View>
                  <TextTicker style={{ marginTop: 2.8, fontSize: 16 }} shouldAnimateTreshold={0} bounce={false} duration={3000} repeatSpacer={100} marqueeDelay={1000}>   {item.title} {"\n"} </TextTicker>
                  <Text style={{ color: "#878784" }}>   {item.artist}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    flexDirection: "row",
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
});

export default Music_Library;
