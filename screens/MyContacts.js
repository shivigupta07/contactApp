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
        const updatedContacts = myContacts.filter(contact => contact.id !== contactId);
        setMyContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
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
            <TouchableOpacity 
                style={styles.addIconContainer}
                onPress={() => navigation.navigate('CreateContact')}
            >
                <Ionicons 
                    name='add-circle'
                    size={62}
                    color='green'
                    style={styles.addIcon}
                />
            </TouchableOpacity>
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
                rightOpenValue={-150}
                disableRightSwipe={true}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    addIconContainer: {
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
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
        backgroundColor: 'white',
    },
    swipeActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        padding: 16,
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
    listContent: {
        paddingBottom: 80,
    },
});
