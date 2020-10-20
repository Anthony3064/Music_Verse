
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


const ReproductorScene = () => {

    const [estadoPlay, setEstadoPlay] = useState(false);

    return (
        <LinearGradient colors={['#34cfeb', '#b8cfd4']} >
            <SafeAreaView>
                <View style={style.containerView}>
                    <Text style={style.textTitle}>
                        Este es el reproductor
                    </Text>

                    <View style={style.buttonPlayPause}>
                        {
                            estadoPlay == false ? <Button title='Play' onPress={() => { setEstadoPlay(true); }} /> : <Button title='Pause' onPress={() => { setEstadoPlay(false); }} />
                        }


                    </View>
                </View>
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
        fontSize: 30
    },
    buttonPlayPause: {
        width: 100,
        margin: 20
    }

});

export default ReproductorScene;