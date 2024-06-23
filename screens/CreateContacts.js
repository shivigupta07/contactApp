import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CreateContact({ navigation, route }) {
    const { contact } = route.params || {};
    const [firstName, setFirstName] = useState(contact?.givenName || '');
    const [lastName, setLastName] = useState(contact?.familyName || '');
    const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumbers[0]?.number || '');
    const [isFormValid, setIsFormValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setIsFormValid(firstName.trim() && lastName.trim() && phoneNumber.trim());
    }, [firstName, lastName, phoneNumber]);

    const saveContact = () => {
        const updatedContact = {
            id: contact ? contact.id : Date.now(),
            givenName: firstName,
            familyName: lastName,
            phoneNumbers: [{ label: 'mobile', number: phoneNumber }],
        };

        try {
            let existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];

            if (contact) {
                existingContacts = existingContacts.map((item) =>
                    item.id === contact.id ? updatedContact : item
                );
            } else {
                existingContacts.push(updatedContact);
            }

            localStorage.setItem('contacts', JSON.stringify(existingContacts));

            setSuccessMessage('Contact saved successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigation.goBack();
            }, 3000);
        } catch (error) {
            console.error('Failed to save contact:', error);
            setSuccessMessage('Failed to save contact.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />
            <Button
                title="Save"
                onPress={saveContact}
                disabled={!isFormValid}
                color={isFormValid ? '#1E90FF' : 'gray'}
            />
            {successMessage ? (
                <Text style={styles.successMessage}>{successMessage}</Text>
            ) : null}
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
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    successMessage: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
    },
});
