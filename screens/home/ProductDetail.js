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
  Alert,
  PixelRatio,
} from 'react-native';

import {addToCart} from '../../redux/actions/cartAction';
import {connect} from 'react-redux';

import Header from '../header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProductDetail extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    showMore: true,
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  componentDidMount() {
    const {navigation} = this.props;
    const product = navigation.getParam('product');
    console.log(product.image[0]);
  }

  addCart = product => {
    Alert.alert(
      'Thêm vào giỏ hàng',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.addToCart(product)},
      ],
      {cancelable: false},
    );
    console.log();
  };

  render() {
    const {navigation} = this.props;
    const product = navigation.getParam('product');
    return (
      <View style={styles.wrapper}>
        <Header title={'DRESS FOR YOU'} />
        <View style={styles.cardStyle}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={'ios-arrow-back'} size={25} color={'#2c77ad'} />
            </TouchableOpacity>
            <View />
          </View>
          <View style={styles.imageContainer}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row', height: swiperHeight}}
              horizontal>
              {product.image.map((img, index) => (
                <Image
                  key={`${index}-${img}`}
                  source={{uri: `https://mainf-app.herokuapp.com` + img}}
                  resizeMode="cover"
                  style={styles.productImageStyle}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.textBlack}>
                  {product.name.toUpperCase()}
                </Text>
                <Text style={styles.textSmoke}>
                  {this.currencyFormat(product.price)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.addCart(product)}
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.txtButton}> Mua ngay</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: 20}}>
              <View style={styles.descContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.showMore
                      ? this.setState({showMore: false})
                      : this.setState({showMore: true});
                  }}>
                  {this.state.showMore && product.description.length > 400 ? (
                    <Text style={styles.descStyle}>
                      {product.description.split('').slice(0, 400)}...
                    </Text>
                  ) : (
                    <Text style={styles.descStyle}>{product.description}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(ProductDetail);

const {width, height} = Dimensions.get('window');
const swiperWidth = width / 1.8 - 30;
const swiperHeight = (swiperWidth * 452) / 361;
const standarWidth = 360;
const standardHeight = 592;
const Width = width / standarWidth;
const Height = height / standardHeight;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    flex: 8,
  },
  imageContainer: {
    flex: 8,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textBlack: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F46',
  },
  textSmoke: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#e52c2cad',
  },
  titleContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  descContainer: {
    flex: 2,
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descStyle: {
    color: '#AFAFAF',
  },
  linkStyle: {
    color: '#7D59C8',
  },
  productImageStyle: {
    width: swiperWidth,
    height: swiperHeight,
    marginHorizontal: 5,
  },
  txtButton: {
    backgroundColor: '#2c77ad',
    borderRadius: 2 * Width,
    color: '#FFF',
    fontSize: 15 * Width,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    padding: 10 * Width,
    alignItems: 'center',
  },
});
