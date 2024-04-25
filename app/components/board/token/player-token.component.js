import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";
import OpponentToken from "./opponent-token.component";

const PlayerToken = () => {
    const socket = useContext(SocketContext);
    const [playerToken, setPlayerToken] = useState(12);

    useEffect(() => {
        socket.on("game.token", (data) => {
            setPlayerToken(data['playerTokens'])
        });
    }, []);

    return (
        <View style={styles.playerTokenContainer}>
            <Text>Tokens left: {playerToken}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerTokenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }
});

export default PlayerToken;