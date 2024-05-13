import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import OpponentDeckComponent from "./decks/opponent-deck.component";
import PlayerDeckComponent from "./decks/player-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerToken from "./token/player-token.component";
import OpponentToken from "./token/opponent-token.component";
import OpponentScore from "./score/opponent-score.component";
import PlayerScore from "./score/player-score.component";

const OpponentInfos = () => {
    return (
        <View style={styles.containerInfos}>
            <Text style={{ color: 'white' }}>Infos sur l'adversaire</Text>
        </View>
    );
};

const PlayerInfos = () => {
    return (
        <View style={styles.containerInfos}>
            <Text style={{ color: 'white' }}>Infos sur toi</Text>
        </View>
    );
};

const Board = () => {
    const [playerTimer, setPlayerTimer] = useState(0);
    const [opponentTimer, setOpponentTimer] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.waitingText}>Infos sur la partie</Text>

            <View style={styles.infosPartieBlock}>

            <View  style={styles.infosPartieBlockUnit}>
                <OpponentInfos />
                <View style={styles.opponentTimerScoreContainer}>
                    <OpponentTimer onTimerChange={setOpponentTimer} />
                    <OpponentScore />
                    <OpponentToken />
                </View>
            </View>
            <View  style={styles.infosPartieBlockUnit}>
                <PlayerInfos />
                <View style={styles.playerTimerScoreContainer}>
                    <PlayerTimer onTimerChange={setPlayerTimer} />
                    <PlayerScore />
                    <PlayerToken />
                </View>
                
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
        backgroundColor: "#fff"
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        // borderBottomWidth: 1,
        // borderColor: 'black',
    },
    infosPartieBlock: {
        flexDirection: 'row',  
        width: '100%',  
        // height: '10%',    
        flex: 1,   
        justifyContent: 'space-between', 
    },
    infosPartieBlockUnit: {
        flexDirection: 'column',
        width: '50%',           
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    opponentTimerScoreContainer: {
        width: '100%',   
        flex: 1,      
        alignItems: 'center', 
        justifyContent: 'center'
    },
    playerTimerScoreContainer: {
        width: '100%',     
        flex: 1,    
        alignItems: 'center', 
        justifyContent: 'center'
    },
    // infosPartieBlock: {
    //     flex: 1,
    //     height: '#00%',
    //     width: "100%",
    //     backgroundColor: 'red',
    //     flexDirection: 'row',
    //     // borderBottomWidth: 1,
    //     // borderColor: 'black',
    // },
    // infosPartieBlockUnit: {
    //     flex: 1,
    //     height: '#00%',
    //     width: "100%",
    //     backgroundColor: 'green',
    //     alignItems: "center",
    //     flexDirection: 'column',
    //     // borderBottomWidth: 1,
    //     // borderColor: 'black',
    // },
    // opponentInfosContainer: {
    //     // flex: 7,
    //     justifyContent: 'center',
    //     // alignItems: 'center',
    //     // borderRightWidth: 1,
    //     // borderColor: 'black',
    //     // backgroundColor: "lightgrey"
    // },
    containerInfos: {
        fontSize: 18,
        textTransform: "uppercase",
        color: "white",
        backgroundColor: "#447BB5",
        width: "100%",
        marginBottom: 5,
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
    },
    gridContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRightWidth: 1,
        // borderColor: 'black',
    },
    // playerTimerScoreContainer: {
    //     // flex: 4,
    //     width: "40%"
    // },
    // opponentTimerScoreContainer: {
    //     // flex: 4,
    //     width: "40%"
    // },
    choicesContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerInfosContainer: {
        // flex: 7,
        // width: '50%',
        justifyContent: 'center',
        // alignItems: 'center',
        // borderRightWidth: 1,
        // borderColor: 'black',
        // backgroundColor: "lightgrey"
    },
    waitingText: {
        fontSize: 18,
        textTransform: "uppercase",
        color: "white",
        backgroundColor: "#447BB5",
        width: "100%",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default Board;