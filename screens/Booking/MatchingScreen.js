import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text, theme } from "galio-framework";
import { View, Image } from "react-native";
import Product from "../../components/Service";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("screen");
import products from "../../constants/services";

export default class MatchingScreen extends React.Component {
  renderView = () => {
    const { navigation } = this.props;
    return (
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.text_button_back}>←</Text>
          </TouchableOpacity>
          <View style={styles.header_2}>
            <Text style={styles.text_header}>We found you a pro!</Text>
            <Text style={styles.text_subheader}>
              Please confirm below details
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderProducts = () => {
    const { route, navigation } = this.props;
    const data = route.params;
    return (
      <View style={styles.container2}>
        <View style={styles.container21}>
          <Block card style={[styles.products, styles.shadow]}>
            <View style={styles.container211}>
              <View style={styles.container212}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: data.profData.avatar,
                  }}
                />
              </View>
              <View style={styles.container213}>
                <Text style={styles.text_green_bold_2}>
                  {" "}
                  {data.profData.name}{" "}
                </Text>
                <Text style={styles.text_black}> {data.profData.address} </Text>
                <Text style={styles.text_green}>
                  {" "}
                  Rate: {data.profData.rate}$ / Hour{" "}
                </Text>
              </View>
            </View>
          </Block>
        </View>
        <View style={styles.container22}>
          <View style={styles.container221}>
            <Text style={styles.text_black}>
              {" "}
              Total time needed for your service: {data.totalTime} hours{" "}
            </Text>
            <Text style={styles.text_green_bold}>
              {" "}
              Total: {data.totalAmount}${" "}
            </Text>
          </View>
          <View style={styles.container222}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PaymentScreen", data)}
            >
              <Text style={styles.text_button}>BOOKING</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
    justifyContent: "center",
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
    width: "100%",
    backgroundColor: "#96d459",
    alignItems: "center",
  },

  container2: {
    flex: 4,
    width: "100%",
    alignItems: "center",
  },

  container21: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    top: -30,
  },

  container211: {
    flex: 1,
    flexDirection: "row",
  },
  container212: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container213: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
  },

  container22: {
    flex: 1.5,
    width: "100%",
    alignItems: "center",
  },

  container221: {
    flex: 1.5,
    width: "100%",
  },

  container222: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },

  header_1: { flex: 1 },
  header_2: {
    flex: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },

  text_subheader: {
    color: "#fff",
    fontSize: 20,
  },

  text_green_bold: {
    color: "#77AA46",
    fontWeight: "bold",
    fontSize: 16,
    left: 10,
    padding: 8,
  },

  text_green_bold_2: {
    color: "#77AA46",
    fontWeight: "bold",
    fontSize: 20,
    left: 10,
    padding: 8,
  },

  text_green: {
    color: "#77AA46",
    fontSize: 16,
    left: 10,
    padding: 8,
  },

  text_black: {
    color: "#000",
    fontSize: 16,
    left: 10,
    padding: 8,
  },

  text_button: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#97D55A",
    alignItems: "center",
    width: "80%",
    padding: 15,
    borderRadius: 10,
  },

  tinyLogo: {
    width: 100,
    height: 100,
  },

  text_button_back: {
    color: "#fff",
    fontSize: 40,
    textAlign: "left",
  },
});
