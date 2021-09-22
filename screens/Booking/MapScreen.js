import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { View } from 'react-native';
import Product from '../../components/Service';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';


const { width, height } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;
import products from '../../constants/services';

export default class MapScreen extends React.Component {




  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [{
        coordinate: { latitude: LATITUDE, longitude: LONGITUDE },
        key: id++
      }],
      data: {}
    };
    this.postMatching = this.postMatching.bind(this);

  }


  postMatching() {
    const { navigation } = this.props;
    fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-post-matching',
      { method: "POST" })
      .then(res => res.json())
      .then(response =>
        this.setState({ data: response },
          () => navigation.navigate("MatchingScreen", this.state.data)))
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
            <Text style={styles.text_header} >Location & Time</Text>
            <Text style={styles.text_subheader}>Please confirm location and time</Text>
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
          <MapView style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} onPress={e => this.onMapPress(e)}>
            {this.state.markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
              />
            ))}</MapView>
        </View>
        <View style={styles.container22}>
          <View style={styles.container221}>
            <Block card style={[styles.products, styles.shadow]}>
              <TextInput style={styles.text_address} placeholder="497 Evergreen Rd. Roseville" placeholderTextColor="#77AA46" />
            </Block>
          </View>
          <View style={styles.container221}>
            <Block card style={[styles.products, styles.shadow]}>
              <TextInput style={styles.text_time} placeholder="8:00 PM JULY 27 2021" placeholderTextColor="#111" />
            </Block>
          </View>
          <View style={styles.container221}>
            <TouchableOpacity style={styles.button}
              onPress={() => this.postMatching()}>
              <Text style={styles.text_button}>CONFIRM</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    )
  }


  onMapPress = (e) => {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++
        },
      ],
    });
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
    alignItems: 'center'
  },

  container22: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    top: -30
  },

  container221: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
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

  text_address: {
    color: '#77AA46',
    fontWeight: 'bold',
    fontSize: 16,
    left: 5
  },

  text_time: {
    color: '#000',
    fontSize: 16,
    left: 5
  },

  text_button: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  map: {
    width: "100%",
    height: "100%",
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