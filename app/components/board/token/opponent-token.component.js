import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../contexts/socket.context";
import {StyleSheet, Text, View} from "react-native";

const OpponentToken = () => {
    const socket = useContext(SocketContext);
    const [opponentToken, setOpponentToken] = useState(12);

    useEffect(() => {
        socket.on("game.token", (data) => {
            setOpponentToken(data['opponentTokens'])
        });
    }, []);

    return (
        <View style={styles.opponentTokenContainer}>
            <Text>Tokens left: {opponentToken}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentTokenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }
});

export default OpponentToken;