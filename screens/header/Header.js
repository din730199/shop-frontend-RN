import React, { Component } from 'react';
import { 
    View, Text, Dimensions, StyleSheet
} from 'react-native';

const { height } = Dimensions.get('window');

export default class Header extends Component {

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.row1}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        height: height / 15, 
        backgroundColor: '#2c77ad', 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'center' },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: height/35 },
});
