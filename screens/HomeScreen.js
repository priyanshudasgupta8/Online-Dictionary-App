import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            word: '',
            isSearchPressed: false,
            lexicalCategory: '',
            examples: [],
            definition: "",
        };
    }

    getWord = (word) => {
        var url = 'https://whitehat-dictionary.glitch.me/?word=' + word;
        return fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((res) => {
            var responseGiven = JSON.parse(res);
            var word = responseGiven.word;
            var lexicalCategory = responseGiven.results[0].lexicalEntries[0].lexicalCategory.text;
            var definition = responseGiven.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
            console.log(word);
            this.setState({
                word: word.trim(),
                lexicalCategory: lexicalCategory === undefined ? "" : lexicalCategory.trim(),
                definition: definition === undefined ? "" : definition.trim(),
            })
        })

    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            lexicalCategory: '',
                            examples: [],
                            definition: ""
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        this.setState({ isSearchPressed: true });
                        this.getWord(this.state.text);
                    }}
                >
                    <Text style={styles.text}>
                        Search
                    </Text>
                </TouchableOpacity>
                <View style={[styles.detailsContainer, {marginTop: 20}]}>
                    <Text style={styles.detailsTitle}>
                        Word: {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type: {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Definition: {this.state.definition}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 200
    },
    searchButton: {
        backgroundColor: '#4fa3f2',
        marginTop: 50,
        height: 35,
        width: '55%',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 35
    },
    detailsTitle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5
    },
    detailsContainer: {
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 25,
        marginHorizontal: 50,
        marginVertical: 5,
        borderRadius: 50
    }
});