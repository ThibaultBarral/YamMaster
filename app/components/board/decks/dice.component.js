import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Dice = ({ index, locked, value, onPress, opponent }) => {

    const handlePress = () => {
        if (!opponent) {
            onPress(index);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.dice, locked && styles.lockedDice]}
            onPress={handlePress}
            disabled={opponent}
        >
            <Text style={styles.diceText}>{value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dice: {
        width: 40,
        height: 40,
        backgroundColor: "#145AA2",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        color: 'white',
    },
    lockedDice: {
        backgroundColor: "#447BB5",
    },
    diceText: {
        
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
    },
    opponentText: {
        fontSize: 12,
        color: "red",
    },
});

export default Dice;