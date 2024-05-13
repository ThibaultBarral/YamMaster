import React, { useEffect, useState, useContext } from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.components";


export default function OnlineBotGameController() {

    const socket = useContext(SocketContext);

    const [inGame, setInGame] = useState(false);

    useEffect(() => {
        socket.emit('queue.bot.join');

        socket.on('game.bot.start', (data) => {
            setInGame(data['inGame']);
        })
    }, []);

    return (
        <View style={styles.container}>
            {!inGame && (
                <>
                    <Text style={styles.paragraph}>
                        Waiting for server datas...
                    </Text>
                </>
            )}
            {inGame && (
                <>
                    <Board />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },
    paragraph: {
        fontSize: 16,
    }
});