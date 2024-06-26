import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const PlayerScore = () => {
    const socket = useContext(SocketContext);
    const [playerScore, setPlayerScore] = useState(0);

    useEffect(() => {
        socket.on("game.score", (data) => {
            setPlayerScore(data['playerScore'])
        });
    }, []);

    return (
        <View style={styles.playerScoreContainer}>
            <Text>Tu as {playerScore} points</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerScoreContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default PlayerScore;