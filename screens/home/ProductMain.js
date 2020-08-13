import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import HeaderSearch from '../header/HeaderSearch';

export default class ProductMain extends Component {
  static navigationOptions = ({navigation: {navigate}}) => {
    return {
      header: () => <HeaderSearch navigation={() => navigate('Search')} />,
    };
  };

  state = {
    list: null,
  };

  componentDidMount() {
    this.getListProductType();
  }

  getListProductType = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/productType/getListProductType`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.data);
    this.setState({list: response.data.data});
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  renderItems(product) {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          this.props.navigation.navigate('ListProduct', {idType: product._id})
        }>
        <View style={{height: produtWidth / 4, justifyContent: 'center'}}>
          <Text style={styles.textStyle}>{product.name.toUpperCase()}</Text>
        </View>
        <View style={{flex: 4, justifyContent: 'flex-end'}}>
          <Image
            source={{uri: `https://mainf-app.herokuapp.com${product.image}`}}
            style={styles.imageStyle}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.state.list ? (
          <View style={styles.container}>
            <FlatList
              data={this.state.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => this.renderItems(item)}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <ActivityIndicator
              size="large"
              style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const {width, height} = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productContainer: {
    flex: 1,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    margin: 10,
  },

  textStyle: {
    fontSize: 20,
    color: '#AFAEAF',
  },
  imageStyle: {
    height: ((width - 40) / 933) * 465,
    width: width - 40,
  },
});
