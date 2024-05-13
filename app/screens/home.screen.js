import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans le {'\n'} YamMaster !</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OnlineGameScreen')}
                >
                    <Text style={styles.buttonText}>Jouer en ligne</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('VsBotGameScreen')}
                >
                    <Text style={styles.buttonText}>Jouer contre le bot</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'linear-gradient(90deg, rgba(20,90,162,1) 35%, rgba(68,123,181,1) 100%)',  // Assurez-vous que le fond est bien blanc
    },
    buttonContainer: {
        marginVertical: 10,
        width: 250,
    },
    button: {
        backgroundColor: '#ffffff',  // Fond blanc pour le bouton
        borderWidth: 2,
        borderColor: '#145AA2',  // Bordure bleue pour correspondre au thème
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#145AA2',  // Couleur du texte bleu pour correspondre à la bordure
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#fff",  // Changé en noir pour contraster avec le fond blanc
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
});
