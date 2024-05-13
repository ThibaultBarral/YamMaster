import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const OpponentScore = () => {
    const socket = useContext(SocketContext);
    const [opponentScore, setOpponentScore] = useState(0);

    useEffect(() => {
        socket.on("game.score", (data) => {
            setOpponentScore(data['opponentScore'])
        });
    }, []);

    return (
        <View style={styles.opponentScoreContainer}>
            <Text>Score: {opponentScore}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }
});

export default OpponentScore;