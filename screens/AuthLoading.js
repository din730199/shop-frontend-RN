import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoading extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
      try {
        const token = await AsyncStorage.getItem('token')
        console.log(token);
        token
        ?
          this.props.navigation.navigate('Home')
        :
          this.props.navigation.navigate('Authentication')
        
      } catch(e) {
        // error reading value
      }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}
        />
      );
    }
  }
}


export default AuthLoading;
