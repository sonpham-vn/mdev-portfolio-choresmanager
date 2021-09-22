import React from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { View } from 'react-native';
import Product from '../components/Service';
import products from '../constants/services';

const { width } = Dimensions.get('screen');


export default class CleaningScreen extends React.Component {

  constructor() {
    super();
    this.data = {}
    this.headerTitle =''
  }

  renderView = () => {
    const { route, navigation } = this.props;

    switch (route.params) {
      case 'Electrician': 
      this.headerTitle = products.Electrician.header; 
      this.data=products.Electrician.serviceList; 
      break;

      case 'Cleaning': 
      this.headerTitle = products.Cleaning.header;
      this.data=products.Cleaning.serviceList; 
      break;

      case 'Garden': 
      this.headerTitle = products.Garden.header; 
      this.data=products.Garden.serviceList; 
      break;
      case 'HouseFixer': 
      this.headerTitle = products.HouseFixer.header; 
      this.data=products.HouseFixer.serviceList; 
      break;
      case 'PersonalSalon': 
      this.headerTitle = products.PersonalSalon.header; 
      this.data=products.PersonalSalon.serviceList; 
      break;
      case 'Other': 
      this.headerTitle = products.Other.header; 
      this.data=products.Other.serviceList; 
      break;
    }
    return (

      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Text style={styles.text_button}>←</Text>
          </TouchableOpacity>
          <View style={styles.header_2}>
            <Text style={styles.text_header} >{this.headerTitle}</Text>
            <Text style={styles.text_subheader}>Please choose your service</Text>
          </View>
        </View>
      </View>

    )
  }

  renderProducts = () => {
    return (
      <View style={styles.footer} >

        <FlatList
          data={this.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Product navigation={this.props.navigation} product={item} />}
        />
      </View>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderView()}
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },

  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#96d459',
    alignItems: 'center'

  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 30
  },

  header_1: { flex: 1 },
  header_2: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "100%"

  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10
  },

  text_subheader: {
    color: '#fff',
    fontSize: 20
  },

  text_button: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'left'
  }


});