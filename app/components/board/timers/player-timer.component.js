import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const PlayerTimer = () => {
    const socket = useContext(SocketContext);
    const [playerTimer, setPlayerTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            setPlayerTimer(data['playerTimer'])
        });
    }, []);

    return (
        <View style={styles.playerTimerContainer}>
            <Text>Timer: {playerTimer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerTimerScoreContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    },
    playerTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }
});

export default PlayerTimer;