
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';



const ReproductorScene = () => {

    const [estadoPlay, setEstadoPlay] = useState(false);

    return (
        <View style={style.containerTitle}>
            <Text style={style.textTitle}>
                Este es el reproductor
            </Text>

            <View style={style.buttonPlayPause}>
                {
                    estadoPlay == false ? <Button title='Play' onPress={() => { setEstadoPlay(true); }} /> : <Button title='Pause' onPress={() => { setEstadoPlay(false); }} />
                }


            </View>
        </View>

    );
}

const style = StyleSheet.create({

    containerTitle: {
        backgroundColor: '#282C34'
    },
    textTitle: {
        color: 'white',
        fontSize: 30
    },
    buttonPlayPause: {
        width: 100,
        margin: 20
    }

});

export default ReproductorScene;