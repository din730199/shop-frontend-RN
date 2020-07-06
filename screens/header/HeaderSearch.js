import React, { Component } from 'react';
import { 
    View, Text, Dimensions, TextInput, StyleSheet
} from 'react-native';

const { height } = Dimensions.get('window');

export default class Header extends Component {

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.row1}>
                    <Text style={styles.titleStyle}>DRESS FOR YOU</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Bạn mặc gì hôm nay?"
                    underlineColorAndroid="transparent"
                    onFocus={this.props.navigation} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        height: height / 9, 
        backgroundColor: '#2c77ad', 
        padding: height/80, 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'center' },
    textInput: { 
        height: height / 23, 
        backgroundColor: '#FFF', 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: height/35 },
});
