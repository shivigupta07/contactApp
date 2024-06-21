import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactsCard({ contactInfo }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{contactInfo.givenName} {contactInfo.familyName}</Text>
            <Text style={styles.phone}>{contactInfo.phoneNumbers[0].number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 16,
        color: '#555',
    },
});
