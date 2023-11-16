import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, route }) {

    // fetch api

    const [data, setData] = useState([]);
    const [idDelete, setIdDelete] = useState(null);
    const fetchApiData = async () => {

        fetch(`https://pwqz9y-8080.csb.app/notes?state=${'Long Term'}`)
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

        })
            .then(() => setIdDelete(item.id))
            .catch(error => console.log(error))
    }


    // handle search job

    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(jobTitle.toLowerCase()));
        setNewData(filteredData);
    }, [jobTitle, data]);


    // handle add job

    const [newData, setNewData] = useState(data);

    const handleNavigate = () => {
        navigation.navigate('AddNote');
    }
    // handle selected tab

    const [selectedTab, setSelectedTab] = useState('Long Term');
    const handleSelectedTab = (tab) => {
        setSelectedTab(tab);
    }

    function filter(selectedTab) {
        fetch(`https://pwqz9y-8080.csb.app/notes?state=${selectedTab}`)
            .then(response => response.json())
            .then(json => setData(json))
            .then(error => console.log(error))
    }

    // Render Item của flatlist
    const renderItem = ({ item }) => (
        <View style={{ width: 355, height: 40, borderWidth: 1, borderRadius: 24, top: 20, flexDirection: 'row', justifyContent: 'center', marginTop: item.id == 1 ? 0 : 20 }}>
            <View style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../images/Frame3.png')}
                    style={{ width: 24, height: 24 }}
                />
            </View>
            <Text
                style={{ width: 230, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26, color: selectedTab === 'Long Term' ? 'red' : selectedTab === "Short Term" ? 'green' : 'blue' }}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, backgroundColor: 'white', width: '90%' }}>
                <Pressable
                    style={{ width: 101, height: 35, borderWidth: 1, borderRadius: 5, backgroundColor: selectedTab === 'Long Term' ? '#F1B000' : '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        handleSelectedTab('Long Term');
                        filter('Long Term');
                    }}

                >
                    <Text style={{ width: 70, height: 20, fontFamily: 'Roboto', fontWeight: 700, fontSize: 14, lineHeight: 16.41 }}>
                        Long Term
                    </Text>
                </Pressable>
                <Pressable
                    style={{ width: 101, height: 35, backgroundColor: selectedTab === 'Short Term' ? '#F1B000' : '#FFFFFF', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        handleSelectedTab('Short Term');
                        filter('Short Term');
                    }}
                >
                    <Text style={{ width: 80, height: 20, fontFamily: 'Roboto', fontWeight: 700, fontSize: 14, lineHeight: 16.41, textAlign: 'center' }}>
                        Short Term
                    </Text>
                </Pressable>
                <Pressable
                    style={{ width: 101, height: 35, backgroundColor: selectedTab === 'Done' ? '#F1B000' : '#FFFFFF', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        handleSelectedTab('Done');
                        filter('Done');
                    }}
                >
                    <Text style={{ width: 50, height: 20, fontFamily: 'Roboto', fontWeight: 700, fontSize: 14, lineHeight: 16.41, textAlign: 'center' }}>
                        Done
                    </Text>
                </Pressable>
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