import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.components";

export default function OnlineGameController({ navigation }) {

    const socket = useContext(SocketContext);

    const [inQueue, setInQueue] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [idOpponent, setIdOpponent] = useState(null);

    const handlePress = () => {
        socket.emit("queue.leave");
        navigation.navigate('HomeScreen');
    }

    useEffect(() => {
        socket.emit("queue.join");
        socket.on('queue.added', (data) => {
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
        });

        socket.on('game.start', (data) => {
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
            setIdOpponent(data['idOpponent']);
        });

    }, []);

    return (
        <View style={styles.container}>
            {!inQueue && !inGame && (
                <Text style={styles.paragraph}>
                    Waiting for server data...
                </Text>
            )}

            {inQueue && (
                <>
                    <Text style={styles.paragraph}>
                        Waiting for another player...
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Quitter la file</Text>
                    </TouchableOpacity>
                </>
            )}

            {inGame && (
                <Board />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'linear-gradient(90deg, rgba(20,90,162,1) 35%, rgba(68,123,181,1) 100%)',
        width: '100%',
    },
    paragraph: {
        fontSize: 16,
        color: "#fff",  // Couleur du texte pour contraste
        textAlign: "center",
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    button: {
        backgroundColor: '#ffffff',  // Fond blanc pour le bouton
        borderWidth: 2,
        borderColor: '#145AA2',  // Bordure bleue
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#145AA2',  // Couleur du texte bleue
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    }
});
