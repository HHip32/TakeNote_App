import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, route }) {

    // fetch api

    const [data, setData] = useState([]);
    const [idDelete, setIdDelete] = useState(null);
    const fetchApiData = async () => {

        fetch('https://pwqz9y-8080.csb.app/notes')
            .then(response => response.json())
            .then(json => setData(json))
            .then(error => console.log(error))

    };

    useEffect(() => {
        fetchApiData();
    }, [route.params?.newEditJob, route.params?.newJob, idDelete]);

    // handle delete Job
    const handleDeleteJob = (item) => {
        fetch(`https://pwqz9y-8080.csb.app/notes/${item.id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        }).then(() => setIdDelete(item.id))
            .then(error => console.log(error))
    }

    // handle search job

    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        const filteredData = data.filter(item => item.name.includes(jobTitle));
        setNewData(filteredData);
    }, [jobTitle, data]);


    // handle add job

    const [newData, setNewData] = useState(data);

    const handleAddNewJob = (job) => {
        let dta = [
            ...newData,
            {
                name: job,
                id: newData.length + 1
            }
        ]
        setNewData(dta);
    }

    const handleNavigate = () => {
        navigation.navigate('AddNote');
    }


    // Render Item của flatlist
    const renderItem = ({ item }) => (
        <View style={{ width: 355, height: 40, borderWidth: 1, borderRadius: 24, backgroundColor: '#D3D5D8', top: 20, flexDirection: 'row', justifyContent: 'center', marginTop: item.id == 1 ? 0 : 20 }}>
            <View style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../images/Frame3.png')}
                    style={{ width: 24, height: 24 }}
                />
            </View>
            <Text
                style={{ width: 230, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26 }}
            > {item.name}</Text>
            <Pressable
                style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('EditNote', {
                        noteToEdit: item
                    });
                }}
            >
                <Image
                    source={require('../images/Frame4.png')}
                    style={{ width: 24, height: 24 }}

                />
            </Pressable>
            <Pressable
                style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    handleDeleteJob(item);
                }}
            >
                <AntDesign name="delete" size={24} color="red" />
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ width: '90%', height: 40, flexDirection: 'row', top: 10, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                <View style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../images/Frame.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <TextInput
                    style={{ width: 300, height: 40, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26 }}
                    placeholder='Search'
                    placeholderTextColor={'#171A1F'}
                    onChangeText={text => setJobTitle(text)}
                />
            </View>
            <View style={{ marginTop: 30, height: 400 }}>
                <FlatList
                    data={newData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            <Pressable
                style={{ width: 69, height: 69, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00BDD6', borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 100 }}
                onPress={handleNavigate}
            >
                <Image
                    source={require('../images/Frame5.png')}
                    style={{ width: 32, height: 32 }}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});