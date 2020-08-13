import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import Loading from 'react-native-whc-loading';
import io from 'socket.io-client';

export default class Search extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    list: [],
    keyword: '',
  };
  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  componentDidMount() {
    this.socket = io('https://mainf-app.herokuapp.com/');
    this.socket.on('search', result => {
      this.setState({list: result.doc});
    });
  }

  submitKey() {
    this.socket.emit('search', this.state.keyword);
  }

  getListProduct = async () => {
    this.refs.loading.show();
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/product/searchByKeyword?keyword=${
        this.state.keyword
      }`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.doc);
    this.refs.loading.close();
    this.setState({list: response.data.doc});
    this.setState({keyword: ''});
  };

  renderItems(product) {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          this.props.navigation.navigate('ProductDetail', {product: product})
        }>
        <Image
          source={{uri: `https://mainf-app.herokuapp.com${product.image[0]}`}}
          style={styles.productImage}
        />
        <Text style={styles.produceName}>{product.name.toUpperCase()}</Text>
        <Text style={styles.producePrice}>
          {this.currencyFormat(product.price)}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperH}>
          <View style={styles.row1}>
            <Text style={styles.titleStyle}>DRESS FOR YOU</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Bạn mặc gì hôm nay?"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={text => {
              this.setState({keyword: text}), this.submitKey();
            }}
            value={this.state.keyword}
          />
        </View>
        <View
          style={{
            flex: 9,
            height: width / 3,
            justifyContent: 'center',
            margin: 10,
            backgroundColor: '#fff',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={styles.body}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => this.renderItems(item)}
            />
          </ScrollView>
        </View>

        <Loading ref="loading" />
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const imageWidth = width / 4;
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  wrapperH: {
    height: height / 9,
    backgroundColor: '#2c77ad',
    padding: height / 80,
    justifyContent: 'space-around',
  },
  row1: {flexDirection: 'row', justifyContent: 'center'},
  textInput: {
    height: height / 23,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingVertical: 0,
  },
  titleStyle: {color: '#FFF', fontFamily: 'Avenir', fontSize: height / 35},
  productContainer: {
    width: produtWidth,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    margin: 10,
  },
  productImage: {
    width: produtWidth,
    height: productImageHeight,
  },
  produceName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#333',
    fontWeight: '500',
  },
  producePrice: {
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#e52c2cad',
  },
});
