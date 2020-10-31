import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconFeather from 'react-native-vector-icons/dist/Feather';
import IconIsto from 'react-native-vector-icons/dist/Fontisto';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HeaderReproductor = () => {

  return (

      <View style={styles.containerHeader}>
        <View style={styles.buttonStyle}>
          <TouchableOpacity>
            <Octicons name="settings" size={45}
              color="white"
              style={{ textAlign: 'center' }} onPress={() => { console.log("Settings") }} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonStyle}>
          <TouchableOpacity>
            <IconFeather name="more-vertical" size={45}
              color="white"
              style={{ textAlign: 'center' }} onPress={() => { console.log("Sub Meno") }} />
          </TouchableOpacity>
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 260,
  },
  buttonStyle: {
    width: 35,
    margin: 10,
    display: 'flex',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    textAlign: "center",
  },
  username: {
    color: Colors.primary,
    height: 50,
    width: 300,
    borderRadius: 6,
    marginLeft: 50,
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 2,
  },
});

export default HeaderReproductor;