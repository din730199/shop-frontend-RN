import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../header/Header'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = async ()=>{
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate("Authentication")
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Header title={'DRESS FOR YOU'}/>
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Info")} style={styles.rowInfoContainer}>
            <Ionicons name={'md-person'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Thông tin cá nhân </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangePass")} style={styles.rowInfoContainer}>
            <Ionicons name={'md-lock'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Đổi mật khẩu </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Bill")} style={styles.rowInfoContainer}>
            <Ionicons name={'ios-list-box'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Hóa đơn </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact")} style={styles.rowInfoContainer}>
            <Ionicons name={'md-information-circle'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Thông tin liên hệ </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout} style={styles.rowInfoContainer}>
            <Ionicons name={'md-exit'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Đăng xuất </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:2}} />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1},
    infoContainer: {
        padding:width/20,
        flex: 8,
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        padding:20,
        marginVertical:width/30,
        borderRadius:15
    },
    infoText: {
        fontFamily: 'Avenir',
        color: '#394455',
        fontWeight: '500',
        marginHorizontal:width/15
    }
});
