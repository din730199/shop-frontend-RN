import React, { Component } from 'react';
import { FlatList,
  View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import HeaderSearch from '../header/HeaderSearch'

export default class ListProduct extends Component {
  static navigationOptions =({ navigation: { navigate } })=> {
    return {
      header: ()=><HeaderSearch navigation={()=>navigate('Search')}/>
    }
  }

  state = {
    list: null
  }
    currencyFormat(num) {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+'đ'
    }

    componentDidMount(){
      this.getListProduct();
    }
  
    getListProduct = async ()=>{
      var response = await axios({
        url: `https://mainf-app.herokuapp.com/api/product/getProductByType?productType=${this.props.navigation.getParam('idType')}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.data);
      this.setState({list : response.data.data})
    }

    renderItems(product) {
      return (
        <TouchableOpacity style={styles.productContainer} onPress={() => this.props.navigation.navigate("ProductDetail", { product: product })}>
        <Image source={{ uri: `https://mainf-app.herokuapp.com${product.image[0]}` }} style={styles.productImage} />
        <Text style={styles.produceName}>{product.name.toUpperCase()}</Text>
        <Text style={styles.producePrice}>{this.currencyFormat(product.price)}</Text>
        </TouchableOpacity>
      );
    }

  render() {
    return (
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      
          {this.state.list 
          ?<View style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Ionicons name={'ios-arrow-back'} size={25} color={'#2c77ad'} />
              </TouchableOpacity>
              <View/>
          </View>
          <FlatList
          contentContainerStyle={styles.body}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItems(item)}
        /></View>
        :
        <ActivityIndicator
        size="large"
        style={{flex:1, alignContent: 'center', justifyContent: 'center'}}
      />
        }
      </ScrollView>
    );
  }
}

const { width, height } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452; 

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
},
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    body: {
        alignSelf: 'center',
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin:10
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#333',
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#e52c2cad'
    }
});

