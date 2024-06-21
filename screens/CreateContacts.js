import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CreateContact({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const saveContact = () => {
        if (firstName && phoneNumber) {
            const newContact = {
                id: Date.now(),  // Simple unique ID
                givenName: firstName,
                familyName: lastName,
                phoneNumbers: [{ label: 'mobile', number: phoneNumber }],
            };

            try {
                const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
                existingContacts.push(newContact);
                localStorage.setItem('contacts', JSON.stringify(existingContacts));
                Alert.alert('Success', 'Contact added successfully!');
                navigation.goBack();
            } catch (error) {
                console.error('Failed to save contact:', error);
                Alert.alert('Error', 'Failed to save contact.');
            }
        } else {
            Alert.alert('Validation Error', 'First name and phone number are required.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name</Text>
            <TextInput 
                style={styles.input} 
                value={firstName} 
                onChangeText={setFirstName} 
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput 
                style={styles.input} 
                value={lastName} 
                onChangeText={setLastName} 
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
                style={styles.input} 
                value={phoneNumber} 
                onChangeText={setPhoneNumber} 
                keyboardType="phone-pad"
            />
            <Button title="Save" onPress={saveContact} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});
