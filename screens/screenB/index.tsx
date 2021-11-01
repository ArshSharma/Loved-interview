import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';

const Index = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Screen B</Text>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}}>
                <Text style={styles.buttonText}>TAKE ME BACK</Text>
            </TouchableOpacity>
        
        </View>
    )
}

export default Index;