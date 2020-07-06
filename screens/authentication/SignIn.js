import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';

export default class SignIn extends Component {
    state = {
            email: '',
            password: ''
        }

    onSignIn() {
        this.props.goHome();
    }

    loginUser = async () => {
        this.refs.loading.show();
        const { email, password } = this.state;
        
           let response = await axios({
               url: 'https://mainf-app.herokuapp.com/api/users/signIn',
               method: 'POST',
               data: {
                email:email,
                password:password,
               },
               headers: {
                'Content-Type': 'application/json'
               }
           });
           console.log(response.data);
           
        if (response.data.status===200) {

            try {
                await AsyncStorage.setItem('token',response.data.token)
              } catch (e) {
                // saving error
              }
            this.refs.loading.close();
            this.onSignIn()
            
            
          }else {
            Alert.alert('Thông báo',response.data.errors[0].msg)
            this.refs.loading.close();
          }
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={bigButton} onPress={this.loginUser}>
                    <Text style={buttonText}>Đăng Nhập</Text>
                </TouchableOpacity>
                <Loading ref='loading'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingLeft: 10,
        borderColor:'#2c77ad',
        borderBottomWidth: 1,
        marginHorizontal:10
    },
    bigButton: {
        height: 50,
        backgroundColor: '#2c77ad',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
        marginTop:10
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    }
});
