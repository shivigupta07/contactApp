import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

import ContactsCard from '../components/ContactCard';

export default function MyContacts({ navigation }) {

    const isFocused = useIsFocused();
    const [myContacts, setMyContacts] = useState([]);

    useEffect(() => {
        getAllContacts();
    }, [isFocused]);

    async function getAllContacts() {
        try {
            // Here, you should fetch the contacts from local storage or a backend API.
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            setMyContacts(contacts);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Ionicons 
                name='add-circle'
                size={62}
                color='green'
                style={styles.addIcon}
                onPress={() => navigation.navigate('CreateContact')}
            />
            <FlatList 
                data={myContacts}
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
    }
});
