import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export default class Info extends Component {
  
  static navigationOptions = {
    headerShown: false
  }

  state = {
    oldP:'',
    newP:'',
    token:''
    };

    async componentDidMount(){
      const token = await AsyncStorage.getItem('token')
      this.setState({token:token})
      console.log(token);
    };

    changePass = async () => {
      const {
        oldP,
        newP
      } = this.state;
      
         let response = await axios({
             url: 'https://mainf-app.herokuapp.com/api/users/changePass',
             method: 'POST',
             data: {
              oldPass:oldP,
              newPass:newP,
             },
             headers: {
              'auth-token': this.state.token,
              'Content-Type': 'application/json'
             }
         });
         console.log(response.data.status);
         
      if (response.data.status==200) {
  
        Alert.alert('Thông báo','Thành công')
          
        }else {
          Alert.alert('Thông báo',response.data.errors[0].msg)
        }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperHeader}>
            <View style={styles.rowHeader}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Ionicons name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>
                <Text style={styles.titleStyleHeader}>   Đổi mật khẩu   </Text>
                <View/>
            </View>
        </View>
        <View style={{flex: 2}}/>
        <ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'md-unlock'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="old"
              onChangeText={text => this.setState({ oldP: text })}
              value={this.state.oldP}
              underlineColorAndroid="transparent"/>
          </View>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'md-unlock'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="new"
              onChangeText={text => this.setState({ newP: text })}
              value={this.state.newP}
              underlineColorAndroid="transparent"/>
          </View>
        </View>
        </ScrollView>
        <View style={{flex: 3}}/>
        <TouchableOpacity onPress={this.changePass} style={styles.checkoutButton} >
            <Text style={styles.checkoutTitle}>Đổi mật khẩu</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapperHeader: { 
      height: height / 15, 
      backgroundColor: '#2c77ad', 
      justifyContent: 'space-around' 
  },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' },
  titleStyleHeader: { color: '#FFF', fontFamily: 'Avenir', fontSize: height/35 },
  wrapper: { flex: 1},
  infoContainer: {
      padding:width/20,
      flex: 5,
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6D6D6',
    paddingHorizontal:width/20,
    paddingVertical:width/50,
    marginVertical:width/30,
    borderRadius:15
  },
  infoText: {
      fontFamily: 'Avenir',
      color: '#394455',
      fontWeight: '500',
      marginHorizontal:width/15,
      height:height/15,
      width:width
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2c77ad',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
},
checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
},
});
