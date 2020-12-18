import {StyleSheet, Text, View} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import React, {useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {useEffect} from 'react/cjs/react.development';

const MiniReproductor = () => {
  return (
    <View style={styles.containerView}>
      <TextTicker
        scrollSpeed={200}
        animationType={'scroll'}
        bounce={false}
        shouldAnimateTreshold={40}
        style={{color: '#fff', fontSize: 18}}>
        {item === null ? '' : item.title}
      </TextTicker>
      <View style={styles.buttonPlayPause}>
        {stateSong === false ? (
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
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
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
});

export default MiniReproductor;
