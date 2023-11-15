import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';

export default function Home({ navigation, route }) {

    // fetch api

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchApiData = async () => {
        try {
            const response = await fetch('https://65443ae65a0b4b04436c2d4e.mockapi.io/jobstitle');
            if (!response.ok) {
                throw new Error('Lỗi khi tải dữ liệu từ API');
            }
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchApiData();
    }, []);



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



    // handle edit job
    const handleEditJob = (job) => {
        const updatedData = newData.map(item => {
            if (item.id === job.id) {
                return { ...item, name: job.name };
            }
            return item;
        });
        setNewData(updatedData);
    }




    const handleNavigate = (isEdit) => {
        // setIsEdit(true);
        navigation.navigate('index3', { handleAddNewJob, isEdit, handleEditJob });
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
                onPress={() => handleNavigate(true, item)}
            >
                <Image
                    source={require('../images/Frame4.png')}
                    style={{ width: 24, height: 24 }}

                />
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
                onPress={() => handleNavigate(false)}
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