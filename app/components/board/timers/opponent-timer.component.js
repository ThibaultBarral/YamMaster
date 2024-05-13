import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const OpponentTimer = ({ onTimerChange }) => {
    const socket = useContext(SocketContext);
    const [opponentTimer, setOpponentTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            // setOpponentTimer(data['opponentTimer'])
            setOpponentTimer(data['opponentTimer']);
            onTimerChange(data['opponentTimer']);
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
        <View style={styles.opponentTimerContainer}>
            {/* <Text >Timer: {opponentTimer}</Text> */}
            <Text style={{ color: getColor(opponentTimer), fontWeight: 'bold' }}>{opponentTimer}'</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "lightgrey"
    }
});

export default OpponentTimer;