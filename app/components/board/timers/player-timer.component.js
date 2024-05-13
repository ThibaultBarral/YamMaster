import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const PlayerTimer = ({ onTimerChange }) => {
    const socket = useContext(SocketContext);
    const [playerTimer, setPlayerTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            // setPlayerTimer(data['playerTimer'])
            setPlayerTimer(data['playerTimer']);
            onTimerChange(data['playerTimer']);
        });
    }, [onTimerChange]);

    const getColor = (time) => {
        if (time > 15) {
            return "green";
        } else if (time > 5) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <View style={styles.playerTimerContainer}>
            {/* <Text>Timer: {playerTimer}</Text> */}
            <Text style={{ color: getColor(playerTimer), fontWeight: 'bold' }}>{playerTimer}'</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "lightgrey"
    }
});

export default PlayerTimer;