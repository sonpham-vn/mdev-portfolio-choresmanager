import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

class Product extends React.Component {
  render() {
    const { navigation, product, horizontal, style, priceColor } = this.props;

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => {
          AsyncStorage.setItem('currentService',product.title);
          navigation.navigate('MapScreen');}} >
          <Block flex space="between" style={styles.productDescription}>
            <Text size={16} style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productRate} color={priceColor}>Avg Rate:${product.price}/hours</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default Product;

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#CFF4BE',
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  productTitle: {
    flex: 1,
    color: '#77AA46',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  productRate:{
    textAlign:'right'
  },
  productDescription: {
    padding: theme.SIZES.BASE,
  },

  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});