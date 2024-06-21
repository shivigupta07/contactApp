import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { useIsFocused } from '@react-navigation/native';

import ContactsCard from '../components/ContactCard';

export default function MyContacts({ navigation }) {
    const isFocused = useIsFocused();
    const [myContacts, setMyContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllContacts();
    }, [isFocused]);

    async function getAllContacts() {
        try {
            // Fetch contacts from local storage or a backend API.
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            setMyContacts(contacts);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredContacts = myContacts.filter(contact => {
        const fullName = `${contact.givenName} ${contact.familyName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <View style={styles.container}>
            <Ionicons 
                name='add-circle'
                size={62}
                color='green'
                style={styles.addIcon}
                onPress={() => navigation.navigate('CreateContact')}
            />
            <View style={styles.searchContainer}>
                <Ionicons
                    name='search'
                    size={24}
                    color='gray'
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList 
                data={filteredContacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ContactsCard contactInfo={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    addIcon: {
        bottom: 20,
        right: 20,
        position: 'absolute',
        zIndex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    },
    searchIcon: {
        marginLeft: 8,
        marginRight: 8,
    },
});
