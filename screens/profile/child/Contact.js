import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Profile extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperHeader}>
            <View style={styles.rowHeader}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Ionicons name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>
                <Text style={styles.titleStyleHeader}>Thông tin liên hệ</Text>
                <View/>
            </View>
        </View>
        <View style={{flex:1}} />
        <View style={styles.infoContainer}>
          <View onPress={() => this.props.navigation.navigate("Info")} style={styles.rowInfoContainer}>
            <Ionicons name={'md-person'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Đinh Thành Nhân </Text>
          </View>
          <View onPress={() => this.props.navigation.navigate("ChangePass")} style={styles.rowInfoContainer}>
            <Ionicons name={'md-mail'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> dinhnhan3007@gmail.com </Text>
          </View>
          <View onPress={() => this.props.navigation.navigate("Bill")} style={styles.rowInfoContainer}>
            <Ionicons name={'ios-call'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> (+84) 708633859 </Text>
          </View>
          <View onPress={() => this.props.navigation.navigate("Contact")} style={styles.rowInfoContainer}>
            <Ionicons name={'ios-navigate'} size={25} color={'#2c77ad'} />
            <Text style={styles.infoText}> Bình Sơn - Long Thành - Đồng Nai </Text>
          </View>
        </View>
        <View style={{flex:2}} />
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
