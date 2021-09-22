import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { View } from 'react-native';
import Product from '../../components/Service';

const { width } = Dimensions.get('screen');
import products from '../../constants/services';

export default class PaymentScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {}
    };
    this.postPayment = this.postPayment.bind(this);
  }

  postPayment() {
    const { navigation } = this.props;
    fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-post-payment',
      { method: "POST" })
      .then(res => res.json())
      .then(response =>
        this.setState({ data: response },
          () => Alert.alert(
            ' ',
            'YOUR BOOKING IS COMPLETED!',
            [
              {
                text: 'OK', onPress: () => {
                  navigation.navigate("ConfirmationScreen", this.state.data)
                }
              },
            ],
            { cancelable: false },
          )

        ))
      .catch(error => console.log(error));

  }


  renderView = () => {
    const { navigation } = this.props;

    return (

      <View style={styles.container1}>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Text style={styles.text_button_back}>←</Text>
          </TouchableOpacity>
          <View style={styles.header_2}>
            <Text style={styles.text_header} >Payment</Text>
            <Text style={styles.text_subheader}>Please choose your method</Text>
          </View>
        </View>
      </View>

    )
  }

  renderProducts = () => {
    const { navigation } = this.props;

    return (
      <View style={styles.container2}>
        <View style={styles.container21}>
          <Block card style={[styles.products_1]}>


            <Text style={styles.text_blue_bold}> VISA </Text>

          </Block>
        </View>
        <View style={styles.container22}>
          <Block card style={[styles.products, styles.shadow]}>
            <View style={styles.text_row}>
              <TextInput style={styles.text_green_bold} placeholder="JOHN DOE" placeholderTextColor="#77AA46" />
              <Text style={styles.text_black}>CARDHOLDER NAME</Text>
            </View>
            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, margin: 10 }} />
            <View style={styles.text_row}>
              <TextInput style={styles.text_green_bold} placeholder="123456789" placeholderTextColor="#77AA46" />
              <Text style={styles.text_black}>CARD NUMBER</Text>
            </View>

            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, margin: 10 }} />
            <View style={styles.text_row}>
              <TextInput style={styles.text_green_bold} placeholder="05/21" placeholderTextColor="#77AA46" />
              <Text style={styles.text_black}>EXPIRE DATE</Text>
            </View>

            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, margin: 10 }} />
            <View style={styles.text_row}>
              <TextInput style={styles.text_green_bold} placeholder="123" placeholderTextColor="#77AA46" />
              <Text style={styles.text_black}>CVV</Text>
            </View>

            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, margin: 10 }} />
            <View style={styles.text_row}>
              <TextInput style={styles.text_green_bold} placeholder="497 Evergreen" placeholderTextColor="#77AA46" />
              <Text style={styles.text_black}>ADDRESS</Text>
            </View>

          </Block>
        </View>
        <View style={styles.container23}>
          <TouchableOpacity style={styles.button}
            onPress={() => this.postPayment()}>
            <Text style={styles.text_button}>PROCESS PAYMENT</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    width: "90%",
    borderWidth: 0,
    minHeight: "25%",
    justifyContent: "center"
  },

  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },

  products_1: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 1.5,
  },
  container1: {
    flex: 1,
    width: '100%',
    backgroundColor: '#96d459',
    alignItems: 'center'

  },

  container2: {
    flex: 4,
    width: '100%',
    alignItems: 'center'
  },

  container21: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    top: 20,
    justifyContent: "center"
  },

  container22: {
    flex: 2,
    width: '100%',
    alignItems: 'center'
  },

  container23: {
    flex: 1,
    width: '100%',
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
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30
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

  text_green_bold: {
    color: '#77AA46',
    fontWeight: 'bold',
    fontSize: 16,
    left: 10,
    padding: 8
  },

  text_green_bold_2: {
    color: '#77AA46',
    fontWeight: 'bold',
    fontSize: 20,
    left: 10,
    padding: 8
  },

  text_blue_bold: {
    color: '#2699FB',
    fontWeight: 'bold',
    fontSize: 25,
    left: 10,
    padding: 2
  },

  text_green: {
    color: '#77AA46',
    fontSize: 16,
    left: 10,
    padding: 8
  },

  text_black: {
    color: '#9D9D9D',
    fontSize: 16,
    left: 10,
    padding: 8
  },

  text_row: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'baseline'
  },

  text_button: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#97D55A',
    alignItems: 'center',
    width: "80%",
    padding: 15,
    borderRadius: 10,
  },

  text_button_back: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'left'
  }


});