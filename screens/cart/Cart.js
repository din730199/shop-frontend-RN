import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import {
  removeItem,
  incrQuantity,
  decrQuantity,
} from '../../redux/actions/cartAction';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Loading from 'react-native-whc-loading';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Cart extends Component {
  state = {
    total: 0,
    arr: [],
    token: '',
  };

  static navigationOptions = {
    headerShown: false,
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  decrQuan = cartItem => {
    if (cartItem.quantity === 1) this.props.removeItem(cartItem.product._id);
    this.props.decrQuantity(cartItem);
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    this.setState({token: token});
    this.getCart();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(JSON.stringify(prevState.arr) + '123');
    if (prevState.arr == this.state.arr) {
      this.getCart();
    }
  }

  getCart = () => {
    const {product} = this.props;
    const arr = [];
    product.map(e => {
      arr.push({id: e.product._id, quantity: e.quantity});
    });
    const arrTotal = product.map(el => el.product.price * el.quantity);
    const total = product.length ? arrTotal.reduce((a, b) => a + b) : 0;
    this.setState({arr: arr, total: total});
  };

  submit = async () => {
    this.refs.loading.show();
    if (this.state.arr.length == 0) {
      this.refs.loading.close();
      alert('Mua đồ đê');
    } else {
      console.log(
        JSON.stringify(this.state.arr.length) + ' ' + this.state.total,
      );

      const {total, arr} = this.state;

      let response = await axios({
        url: 'https://mainf-app.herokuapp.com/api/bill/addBill',
        method: 'POST',
        data: {
          total: total,
          arr: arr,
        },
        headers: {
          'auth-token': this.state.token,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.status);

      if (response.data.status == 200) {
        this.refs.loading.close();
        Alert.alert('Thông báo', 'Thành công');
      } else {
        this.refs.loading.close();
        Alert.alert('Thông báo', response.data.errors[0].msg);
      }
    }
  };

  renderItems(cartItem) {
    return (
      <View style={styles.productStyle}>
        <Image
          source={{
            uri: 'https://mainf-app.herokuapp.com' + cartItem.product.image[0],
          }}
          style={styles.productImage}
        />
        <View style={[styles.mainRight]}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProductDetail', {
                  product: cartItem.product,
                })
              }>
              <Text style={styles.txtName}>
                {cartItem.product.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.removeItem(cartItem.product._id)}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.txtPrice}>
              {this.currencyFormat(cartItem.product.price)}
            </Text>
          </View>
          <View style={styles.productController}>
            <View style={styles.numberOfProduct}>
              <TouchableOpacity
                style={{
                  borderRightWidth: 1,
                  width: width / 15,
                  alignItems: 'center',
                  borderColor: '#2c77ad',
                }}
                onPress={() => this.decrQuan(cartItem)}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{cartItem.quantity}</Text>
              <TouchableOpacity
                style={{
                  borderLeftWidth: 1,
                  width: width / 15,
                  alignItems: 'center',
                  borderColor: '#2c77ad',
                }}
                onPress={() => this.props.incrQuantity(cartItem)}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const {product} = this.props;
    const arrTotal = product.map(el => el.product.price * el.quantity);
    const total = product.length ? arrTotal.reduce((a, b) => a + b) : 0;

    return (
      <View style={styles.wrapper}>
        <Header title={'DRESS FOR YOU'} />
        {this.props.product.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={product}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => this.renderItems(item)}
          />
        ) : (
          <View style={styles.productStyle}>
            <Image
              source={require('../../assest/emptycart.png')}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: width / 6,
              }}
            />
          </View>
        )}
        <View
          style={{
            flex: 0,
            backgroundColor: 'white',
            height: width / 3,
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: '#e52c2cad',
              fontSize: 20,
              fontFamily: 'Avenir',
              margin: 10,
            }}>
            Tổng: {this.currencyFormat(total)}
          </Text>
          <TouchableOpacity onPress={this.submit} style={styles.checkoutButton}>
            <Text style={styles.checkoutTitle}>Tiến Hành Đặt Hàng</Text>
          </TouchableOpacity>
        </View>
        <Loading ref="loading" />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: !state.cartReducer ? [] : state.cartReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product => dispatch(removeItem(product)),
    incrQuantity: product => dispatch(incrQuantity(product)),
    decrQuantity: product => dispatch(decrQuantity(product)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

const {width} = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2c77ad',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  productStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center',
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between',
  },
  productController: {
    flexDirection: 'row',
    width: imageWidth,
    marginHorizontal: 20,
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 50,
    borderColor: '#2c77ad',
    borderWidth: 1.5,
  },
  txtName: {
    paddingLeft: 20,
    color: '#333',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#ff3425',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
});
