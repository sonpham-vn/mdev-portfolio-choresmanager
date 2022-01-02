import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
  ImageBackground
} from "react-native";
const MemberScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [royaltyPoint, setRoyaltyPoint] = useState('');

  const getActivityList = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        let url =
          "https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-get-reward";
        //url = url + userId;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setData(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPoint = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        let url =
          "https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-user-info?UserId=";
        url = url + userId;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setRoyaltyPoint(json.RoyaltyPoint);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmRedeemReward = async (reward) => {
    if (royaltyPoint<reward.Price) {
      Alert.alert(
        ' ',
        "SORRY. YOU DON'T HAVE ENOUGH POINTS FOR THIS",
        [
          {
            text: 'OK', onPress: () => {
            }
          }
        ],
        { cancelable: false },
      )
    }
    else {
      Alert.alert(
      ' ',
      'THIS WILL COST '+reward.Price+' POINTS.\nARE YOU SURE?',
      [
        {
          text: 'YES', onPress: () => {
            redeemReward(reward);
          }
        },
        {
          text: 'NO', onPress: () => {
          }
        },
      ],
      { cancelable: false },
    )}
    
  };

  const redeemReward = async (reward) => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId !== null) {
    fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-post-reward',
      { method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: userId,
        Price: reward.Price,
      })
     })
      .then(res => res.json())
      .then(response =>
        
           Alert.alert(
            ' ',
            'THANK YOU! PLEASE CHECK YOUR EMAIL FOR VOUCHER.',
            [
              {
                text: 'OK', onPress: () => {
                  getUserPoint();
                }
              },
            ],
            { cancelable: false },
          )

        )
      .catch(error => console.log(error));
      }
  };

  useEffect(() => {
    getActivityList();
    getUserPoint();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.text_button_back}>←</Text>
        </TouchableOpacity>
        <View style={styles.header_2}>
          <Text style={styles.text_header}>Member Point</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.box1}>
          <TouchableOpacity
            style={[styles.boxStyle, styles.box1, styles.shadow]}
          >
            <View style={styles.defaultContainer}>
            <ImageBackground source={require('../assets/Glitter.png')} resizeMode="cover" style={styles.image}>
              <Text style={styles.text_style}>👑 {royaltyPoint}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box2}>
          {isLoading && <ActivityIndicator color={"#000"} />}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.defaultContainer_2, styles.shadow]}>
                <View style={[styles.defaultContainer_2_1]}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: item.ImageUrl,
                    }}
                  />
                  <Text style={styles.text_style_3}>{item.Description}</Text>
                </View>

                <Text style={styles.text_style_2}>{item.Price} Pt.</Text>
                <TouchableOpacity style={styles.button} onPress={() => confirmRedeemReward(item)}>
                  <Text style={styles.text_button} >REDEEM</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96d459",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },

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
    paddingVertical: 5,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 20,
  },

  boxStyle: {
    width: "100%",
    height: 10,
    padding: 10,
  },

  box1: {
    flex: 1,
    top: -50,
  },

  box2: {
    flex: 4,
    top: -60,
  },

  defaultContainer: {
    flex: 1,
    backgroundColor: "#d0f4be",
    padding: 5,
    justifyContent: "center",
  },

  defaultContainer_2: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    padding: 10,
    justifyContent: "center",
    marginBottom: 10
  },


  defaultContainer_2_1: {
    flexDirection: 'row'
  },

  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  text_style: {
    color: "#77AA46",
    fontSize: 35,
    fontWeight: "bold",
    left: 10,
    textAlign: "center",
  },

  text_style_2: {
    color: "#77AA46",
    fontSize: 20,
    fontWeight: "bold",
    left: 10,
    textAlign: "center",
  },

  text_style_3: {
    color: "#555",
    fontSize: 20,
    left: 10,
    flex:1,
    flexWrap: 'wrap'
  },

  text_button_back: {
    color: "#fff",
    fontSize: 40,
    textAlign: "left",
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },

  button: {
    backgroundColor: "#97D55A",
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    padding: 10,
    borderRadius: 10,
  },

  text_button: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 1
  },
});
