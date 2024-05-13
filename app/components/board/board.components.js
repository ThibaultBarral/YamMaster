import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import OpponentDeckComponent from "./decks/opponent-deck.component";
import PlayerDeckComponent from "./decks/player-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerToken from "./token/player-token.component";
import OpponentToken from "./token/opponent-token.component";
import PlayerScore from "./score/player-score.component";
import OpponentScore from "./score/opponent-score.component";

const OpponentInfos = () => {
    return (
        <View style={styles.opponentInfosContainer}>
            <Text>Opponent infos</Text>
        </View>
    );
};

const PlayerInfos = () => {
    return (
        <View style={styles.playerInfosContainer}>
            <Text>Player Infos</Text>
        </View>
    );
};

const Board = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.row, { height: '10%' }]}>
                <OpponentInfos />
                <View style={styles.opponentTimerScoreContainer}>
                    <OpponentTimer />
                    <OpponentScore />
                    <OpponentToken />
                </View>
            </View>
            <View style={[styles.row, { height: '15%' }]}>
                <OpponentDeckComponent />
            </View>
            <View style={[styles.row, { height: '40%' }]}>
                <Grid />
                <Choices />
            </View>
            <View style={[styles.row, { height: '25%' }]}>
                <PlayerDeckComponent />
            </View>
            <View style={[styles.row, { height: '10%' }]}>
                <PlayerInfos />
                <View style={styles.playerTimerScoreContainer}>
                    <PlayerTimer />
                    <PlayerScore />
                    <PlayerToken />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    opponentInfosContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'black',
        backgroundColor: "lightgrey"
    },
    gridContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'black',
    },
    playerTimerScoreContainer: {
        flex: 1,
        width: "30%"
    },
    opponentTimerScoreContainer: {
        flex: 1,
        width: "30%"
    },
    choicesContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerInfosContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'black',
        backgroundColor: "lightgrey"
    },
    playerScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    },
    opponentScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }
});

export default Board;