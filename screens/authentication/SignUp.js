import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Loading from 'react-native-whc-loading';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: ''
        };
    }


    removeEmail() {
        this.setState({ email: '' });
    }

    registerUser = async () => {
        this.refs.loading.show();
        const { name, email, password, rePassword } = this.state;
        if(password==rePassword){
           let response = await axios({
               url: 'https://mainf-app.herokuapp.com/api/users/signUp',
               method: 'POST',
               data: {
                email:email,
                password:password,
                name:name
               },
               headers: {
                'Content-Type': 'application/json'
               }
           });
           console.log(response);
           

            if (response.data.status === 200) {
                this.refs.loading.close();
            Alert.alert(
                'Đăng ký thành công',
                'Đăng ký thành công với email '+email,
                [
                    { text: 'OK', onPress: this.props.gotoSignIn() }
                ],
                { cancelable: false }
            );
            
          }else {
            this.refs.loading.close();
            Alert.alert('Thông báo',response.data.errors[0].msg)
            this.removeEmail();
          }

        }else{
            this.refs.loading.close();
            Alert.alert('Thông báo', 'Nhập lại mật khẩu không đúng')
        }
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
            <View>
                <TextInput 
                    style={inputStyle} 
                    placeholder="Họ và tên" 
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Email" 
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Mật khẩu" 
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập lại mật khẩu" 
                    value={this.state.rePassword}
                    secureTextEntry
                    onChangeText={text => this.setState({ rePassword: text })}
                />
                <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                    <Text style={buttonText}>Đăng kí</Text>
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
