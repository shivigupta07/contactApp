import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
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

    const handleEditContact = (contact) => {
        navigation.navigate('CreateContact', { contact });
    };

    const handleDeleteContact = (contactId) => {
        // Filter out the contact with the specified ID
        const updatedContacts = myContacts.filter(contact => contact.id !== contactId);
      
        // Update the state with the filtered contacts
        setMyContacts(updatedContacts);

        // Optionally, update your local storage or backend API here
    };

    const renderSwipeActions = (contact) => (
        <View style={styles.swipeActionsContainer}>
            <TouchableOpacity
                style={[styles.swipeAction, styles.editAction]}
                onPress={() => handleEditContact(contact)}
            >
                <Ionicons name='create-outline' size={24} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.swipeAction, styles.deleteAction]}
                onPress={() => handleDeleteContact(contact.id)}
            >
                <Ionicons name='trash-outline' size={24} color='white' />
            </TouchableOpacity>
        </View>
    );

    const renderContactItem = ({ item }) => (
        <View style={styles.contactItemContainer}>
            <ContactsCard contactInfo={item} />
        </View>
    );

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
            <SwipeListView
                data={filteredContacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderContactItem}
                renderHiddenItem={({ item }) => renderSwipeActions(item)}
                rightOpenValue={-150} // Width of swipeable buttons container
                disableRightSwipe={true} // Disable right swipe on list items
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    contactItemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    swipeActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    swipeAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        backgroundColor: '#FF6347',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
    },
    editAction: {
        backgroundColor: '#1E90FF',
    },
    deleteAction: {
        backgroundColor: '#FF6347',
    },
});
