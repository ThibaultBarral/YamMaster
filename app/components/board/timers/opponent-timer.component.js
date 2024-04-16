import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const OpponentTimer = () => {
    const socket = useContext(SocketContext);
    const [opponentTimer, setOpponentTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            setOpponentTimer(data['opponentTimer'])
        });
    }, []);

    return (
        <View style={styles.opponentTimerContainer}>
            <Text>Timer: {opponentTimer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentTimerScoreContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    },
    opponentTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OpponentTimer;