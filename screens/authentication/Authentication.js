import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {

    state = { isSignIn: true };

    gotoSignIn() {
        this.setState({ isSignIn: true });
    }

    signIn() {
        this.setState({ isSignIn: true });
    }

    signUp() {
        this.setState({ isSignIn: false });
    }

    goHome() {
        this.props.navigation.navigate("Home")
    }
    render() {
        const { isSignIn } = this.state;
        const mainJSX = isSignIn ? <SignIn goHome={this.goHome.bind(this)} /> : <SignUp gotoSignIn={this.gotoSignIn.bind(this)} />;
        return (
            
            <View style={styles.container}>
                <View></View>
                {mainJSX}
                <View style={styles.controlStyle}>
                    <TouchableOpacity style={isSignIn ? inactiveStyle : activeStyle} onPress={this.signIn.bind(this)}>
                        <Text style={isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!isSignIn ? inactiveStyle : activeStyle} onPress={this.signUp.bind(this)}>
                        <Text style={!isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng kí</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between'
    },
    controlStyle: {
        flexDirection: 'row',
    },
    inactiveStyle: {
        color: '#2c77ad'
    },
    activeStyle: {
        color: '#fff'
    },
    inactiveStyle2: {
        backgroundColor: '#2c77ad'
    },
    activeStyle2: {
        backgroundColor: '#fff'
    },
    signStyle: {
        alignItems: 'center',
        paddingVertical: 15,
        flex: 1,
        borderColor:'#2c77ad',
        borderWidth: 2,
        margin:2,
        marginHorizontal:10
    },
    
});
const inactiveStyle = StyleSheet.flatten([
    styles.signStyle,
    styles.inactiveStyle2
  ]);
const activeStyle = StyleSheet.flatten([
    styles.signStyle,
    styles.activeStyle2
  ]);

