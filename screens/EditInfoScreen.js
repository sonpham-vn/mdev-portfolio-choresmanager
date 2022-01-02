import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditInfoScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = React.useState({
    email: "abc",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    fullname: "",
    age: "",
    city: "",
  });

  const getActivityList = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        // value previously stored
        try {
          let url =
            "https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-user-info?UserId=";
          url = url + userId;
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);

          setData({
            email: json.UserName,
            fullname: json.FullName,
            age: json.Age,
            city: json.City,
            password: "",
            confirm_password: "",
            check_textInputChange: false,
            secureTextEntry: true,
            confirm_secureTextEntry: true,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivityList();
  }, []);

  const textInputChange = (val) => {
    const reg = /\S+@\S+/;
    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleFullNameChange = (val) => {
    setData({
      ...data,
      fullname: val,
    });
  };

  const handleAgeChange = (val) => {
    setData({
      ...data,
      age: val.replace(/[^0-9]/g, ""),
    });
  };

  const handleCityChange = (val) => {
    setData({
      ...data,
      city: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const signUp = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        let encryptedPassword = "";
        if (!data.password == "") {
          encryptedPassword = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            data.password
          );
          console.log("Encrypted Pass: ", encryptedPassword);
        }

        console.log(
          userId +
            " " +
            data.email +
            " " +
            data.fullname +
            " " +
            data.age +
            " " +
            data.city +
            " "
        );
        const response = await fetch(
          "https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/update-user",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId: userId,
              UserName: data.email,
              FullName: data.fullname,
              Age: data.age,
              City: data.city,
              Password: encryptedPassword,
            }),
          }
        );

        const json = await response.json();
        if (json.statusCode == 200) {
          Alert.alert(
            " ",
            "Update Successfully",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("MainScreen");
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            " ",
            "ERROR: " + json.Error,
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.text_button_back}>←</Text>
          </TouchableOpacity>
          <View style={styles.header_2}>
            <Text style={styles.text_header}>Edit Account Info</Text>
            <Text style={styles.text_subheader}>Please fill in the detail</Text>
          </View>
        </View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text
            style={[
              styles.text_footer_group,
              {
                marginTop: 0,
              },
            ]}
          >
            Update Info
          </Text>
          <Text style={[styles.text_footer_grey, { marginTop: 35 }]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color="#DCDCDC" size={20} />
            <TextInput
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              editable={false}
              value={data.email}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#96d459" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Full Name
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#96d459" size={20} />
            <TextInput
              placeholder="John Doe"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleFullNameChange(val)}
              value={data.fullname}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Age
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#96d459" size={20} />
            <TextInput
              placeholder="18"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(val) => handleAgeChange(val)}
              value={data.age}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            City
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#96d459" size={20} />
            <TextInput
              placeholder="Toronto"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleCityChange(val)}
              value={data.city}
            />
          </View>

          <Text
            style={[
              styles.text_footer_group,
              {
                marginTop: 35,
              },
            ]}
          >
            Change Password
          </Text>
          <Text style={[styles.text_footer_group_grey, { marginTop: 5 }]}>
            Leave blank if unchanged
          </Text>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#96d459" size={20} />
            <TextInput
              placeholder="Your New Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm New Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#96d459" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.signUp, { backgroundColor: "#96d459" }]}
              onPress={() => {
                signUp();
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96d459",
  },

  container1: {
    flex: 1,
    width: "100%",
    backgroundColor: "#96d459",
    alignItems: "center",
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
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_subheader: {
    color: "#fff",
    fontSize: 20,
  },

  text_footer: {
    color: "#96d459",
    fontSize: 18,
  },

  text_footer_grey: {
    color: "grey",
    fontSize: 18,
  },

  text_footer_group: {
    color: "#77AA46",
    fontSize: 18,
    textAlign: "center",
  },

  text_footer_group_grey: {
    color: "grey",
    textAlign: "center",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  text_button_back: {
    color: "#fff",
    fontSize: 40,
    textAlign: "left",
  },
});
