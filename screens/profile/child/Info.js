import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Loading from 'react-native-whc-loading';

export default class Info extends Component {
  
  static navigationOptions = {
    headerShown: false
  }

  state = {
      name:'',
      email:'',
      address:'',
      numberphone:'',
      token:''
  };
  

  async componentDidMount(){
    const token = await AsyncStorage.getItem('token')
    this.setState({token:token})
    console.log(token);
    
    this.getInfo(this.state.token)
  }

  getInfo = async (token)=>{
    axios({
      url: `https://mainf-app.herokuapp.com/api/users/getInfoUser`,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    }).then(res=>{
      console.log(res.data);
      
      this.setState({
        name:res.data.data.name,
        email:res.data.data.email,
        address:res.data.data.address,
        numberphone:res.data.data.numberphone
      })
      console.log(res.data.data.email);
    }).catch(err=>{console.log(err);
    })
    
  }

  updateUser = async () => {
    this.refs.loading.show();
    const {
      name,
      email,
      address,
      numberphone } = this.state;
    
       let response = await axios({
           url: 'https://mainf-app.herokuapp.com/api/users/updateInfoUser',
           method: 'POST',
           data: {
            name:name,
            email:email,
            address:address,
            numberphone:numberphone
           },
           headers: {
            'auth-token': this.state.token,
            'Content-Type': 'application/json'
           }
       });
       console.log(response.data);
       
    if (response.data) {
      this.refs.loading.close();
      Alert.alert('Thông báo','Thành công')
        
      }else {
        this.refs.loading.close();
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
                <Text style={styles.titleStyleHeader}>Thông tin cá nhân</Text>
                <View/>
            </View>
        </View>
        <View style={{flex: 1}}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'md-person'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="name"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
              underlineColorAndroid="transparent"/>
          </View>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'md-mail'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="email"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              underlineColorAndroid="transparent"/>
          </View>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'ios-navigate'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="address"
              onChangeText={text => this.setState({ address: text })}
              value={this.state.address}
              underlineColorAndroid="transparent"/>
          </View>
          <View style={styles.rowInfoContainer}>
            <Ionicons name={'ios-call'} size={25} color={'#2c77ad'} />
            <TextInput
              style={styles.infoText}
              placeholder="numberphone"
              onChangeText={text => this.setState({ numberphone: text })}
              value={this.state.numberphone}
              underlineColorAndroid="transparent"/>
          </View>
        </View>
        </ScrollView>
        <View style={{flex: 2}}/>
        <TouchableOpacity onPress={this.updateUser} style={styles.checkoutButton} >
            <Text style={styles.checkoutTitle}>Cập nhật thông tin</Text>
        </TouchableOpacity>
                <Loading ref='loading'/>
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
      flex: 7,
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
