import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/AntDesign';


const FooterReproductor = (track) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.containerFooter}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.buttonsContainer}>
                            <Text style={styles.modalText}>Información</Text>
                            <TouchableOpacity>
                                <Icon
                                    name="close"
                                    size={20}
                                    color="white"
                                    style={{ textAlign: 'center' }}
                                    onPress={() => { setModalVisible(false) }}
                                />
                            </TouchableOpacity>


                        </View>
                        <Text style={styles.modalText}>Titulo de la cación:</Text>
                        {track != null ? <Text style={styles.modalText}>{track.title}</Text> : <Text style={styles.modalText}>---</Text>}
                        <Text>{"\n"}</Text>
                        <Text style={styles.modalText}>Album:</Text>
                        {track != null ? <Text style={styles.modalText}>{track.album}</Text> : <Text style={styles.modalText}>---</Text>}
                        <Text>{"\n"}</Text>
                        <Text style={styles.modalText}>Artista:</Text>
                        {track != null ? <Text style={styles.modalText}>{track.artist}</Text> : <Text style={styles.modalText}>---</Text>}
                        <Text>{"\n"}</Text>

                        <View>
                            <TouchableOpacity style={styles.buttonsContainer}>
                                <Icon
                                    name="pluscircle"
                                    size={20}
                                    color="white"
                                    style={{ textAlign: 'center' }}
                                    onPress={() => { console.log("Se debe guardar la letra") }}
                                >
                                    <Text style={styles.textStyle}>Agregar Letra de la Canción</Text>
                                </Icon>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttonsContainer}>
                    <Icon
                        name="profile"
                        size={40}
                        color="white"
                        style={{ textAlign: 'center' }}
                        onPress={() => { setModalVisible(true) }}
                    >
                        <Text style={styles.textTitle}>Info</Text>
                    </Icon>
                </TouchableOpacity>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonStyle: {
        width: 50,
        margin: 10,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        textAlign: "center",
    },
    textTitle: {
        color: 'white',
        fontSize: 30
    },
    modalToggle: {
        height: '100%'
    },
    containerViewModal: {
        margin: 50,
        marginTop: '30%',
        borderRadius: 100
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#2ac6de",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'white',
        fontSize: 20
    }
});

export default FooterReproductor;