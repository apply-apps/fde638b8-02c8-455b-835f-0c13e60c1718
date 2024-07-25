// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const workouts = [
    { id: '1', name: 'Push-ups', description: 'Push-ups for upper body strength' },
    { id: '2', name: 'Squats', description: 'Squats for lower body strength' },
    { id: '3', name: 'Planks', description: 'Planks for core strength' },
    // Add more workouts here
];

const WorkoutList = () => {
    const [loading, setLoading] = useState(false);

    const handleGetMotd = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://apihub.p.appply.xyz:3300/motd');
            alert(`Message of the Day: ${response.data.message}`);
        } catch (error) {
            alert(`Error fetching MOTD: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <View style={stylesWorkoutList.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {workouts.map(workout => (
                <View key={workout.id} style={stylesWorkoutList.workoutContainer}>
                    <Text style={stylesWorkoutList.workoutName}>{workout.name}</Text>
                    <Text style={stylesWorkoutList.workoutDescription}>{workout.description}</Text>
                </View>
            ))}
            <TouchableOpacity style={stylesWorkoutList.button} onPress={handleGetMotd}>
                <Text style={stylesWorkoutList.buttonText}>Show Message of the Day</Text>
            </TouchableOpacity>
        </View>
    );
};

const stylesWorkoutList = StyleSheet.create({
    container: {
        flex: 1,
    },
    workoutContainer: {
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    workoutName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    workoutDescription: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#32a852',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Workout Tracker</Text>
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 20, // To avoid overlapping with the status bar
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default App;