import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { View } from 'react-native';
import Product from '../../components/Service';
import Iconicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');
import products from '../../constants/services';

export default class ConfirmationScreen extends React.Component {
  renderView = () => {

    return (

      <View style={styles.container1}>
        <View style={styles.header}>
          <Text style={styles.text_header}>SUCCESS!</Text>
          <Text style={styles.text_subheader}></Text>
        </View>
      </View>

    )
  }

  renderProducts = () => {
    const { navigation, route } = this.props;
    const data = route.params.profData;
    return (
      <View style={styles.container2}>
        <View style={styles.container21}>
          <Block card style={[styles.products, styles.shadow]}>
            <View style={styles.container211}>
              <View style={styles.container212}>
                <Iconicons name='ios-person' size={60} color='#77AA46' />
              </View>
              <View style={styles.container213}>
                <Text style={styles.text_green_bold_2}> {data.name} </Text>
                <Text style={styles.text_black}> {data.address} </Text>
                <Text style={styles.text_green}> Rate: {data.rate}$/hour </Text>
              </View>
            </View>
            <View style={styles.container214}>
              <Text style={styles.text_black}></Text>
              <View style={styles.text_row}>
                <Text style={styles.text_green}>{data.phone}</Text>
                <Text style={styles.text_black}>Mobile</Text>
              </View>
              <View style={styles.text_row}>
                <Text style={styles.text_green}>{data.email}</Text>
                <Text style={styles.text_black}>Email</Text>
              </View>
              <View style={styles.text_row}>
                <Text style={styles.text_green}>{data.message}</Text>
                <Text style={styles.text_black}>Message</Text>
              </View>

            </View>
          </Block>
        </View>
        <View style={styles.container22}>
          <View style={styles.container221}>
          </View>
          <View style={styles.container222}>
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('MainScreen')}>
              <Text style={styles.text_button}>BACK TO HOME</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
    top: -30,
  },

  container211: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    margin:10
  },
  container212: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container213: {
    flex: 2,
    width: '100%',
    justifyContent: 'center'
  },

  container214: {
    flex: 1.5,
    width: '100%',
    alignItems: 'flex-start',
  },

  container22: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },

  container221: {
    flex: 1,
    width: '100%',
  },

  container222: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 30
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
  text_row: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'baseline',
    width:"90%",
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  },



});