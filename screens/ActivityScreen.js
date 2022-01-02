import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { color } from "react-native-reanimated";

const ActivityScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getActivityList = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        let url =
          "https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-activity?UserId=";
        url = url + userId;
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

  useEffect(() => {
    getActivityList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      getActivityList();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Activity</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.box1}>
        {isLoading && <ActivityIndicator color={"#000"} />}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.defaultContainer, styles.shadow]}>
                <Text style={styles.text_style}>{item.ServiceName}</Text>
                <Text style={styles.text_style1}>{item.ServiceTimestamp}</Text>
                <Text></Text>
                {item.ServiceStatus == "Done" ? (
                  <Text style={styles.text_style1}>
                    Status: {item.ServiceStatus}
                  </Text>
                ) : (
                  <Text style={styles.text_style}>
                    Status: {item.ServiceStatus}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96d459",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 30,
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
    paddingBottom: 20,
  },

  boxStyle: {
    width: "100%",
    height: 10,
    padding: 20,
  },

  box1: {
    flex: 1,
    padding: 10,
  },

  box3: {
    flex: 1,
  },

  defaultContainer: {
    flex: 1,
    backgroundColor: "#d0f4be",
    padding: 10,
    margin: 10,
  },

  text_style: {
    color: "#5db84d",
    fontWeight: "bold",
    fontSize: 16
  },

  text_style1: {
    color: "grey",
    fontSize: 16
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
