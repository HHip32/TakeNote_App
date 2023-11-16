import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function AddNote({ navigation, route }) {
    const data = [
        { label: 'Long Term', value: 'Long Term' },
        { label: 'Short Term', value: 'Short Term' },
    ];
    const [value, setValue] = useState('Long Term');
    const [newJob, setNewJob] = useState('');

    // handle add job

    const handleAddNewJob = () => {
        fetch('https://pwqz9y-8080.csb.app/notes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": newJob,
                "state": value
            }),
        }).then(() => {
            navigation.navigate("Home", { newJob: newJob });
            setNewJob('');
        }).then(error => console.log(error))
    }


    return (
        <View style={styles.container}>
            <Text style={{ width: 258, height: 48, marginTop: 30, fontFamily: 'Epilogue', fontWeight: 700, fontSize: 32, lineHeight: 48, textAlign: 'center' }}>Add Job</Text>
            <View style={{ flexDirection: 'row', width: 334, height: 44, marginTop: 50, alignItems: 'center', borderWidth: 1, borderRadius: 4, borderColor: '#9095A0' }}>
                <View style={{ width: '15%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../images/Frame8.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <TextInput
                    style={{ width: '85%', height: '100%' }}
                    value={newJob}
                    placeholder={'input your job'}
                    onChangeText={text => setNewJob(text)}
                />
            </View>
            <View style={{width:'85%', borderWidth:1, marginTop: 15}}>
                <Dropdown
                    data={data}
                    value={value}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    onChange={(item) => setValue(item.value)}
                />
            </View>
            <Pressable
                style={{ width: 190, height: 44, borderWidth: 1, borderRadius: 12, backgroundColor: '#00BDD6', alignItems: 'center', justifyContent: 'center', marginTop: 80 }}
                onPress={handleAddNewJob}
            >
                <Text style={{ width: 82, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26, color: '#FFFFFF', textAlign: 'center' }}>
                    ADD</Text>
            </Pressable>
            <View style={{ width: 320, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 90 }}>
                <Image source={require('../images/Image 95.png')}
                    style={{ width: 190, height: 200 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});