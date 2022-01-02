import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking

} from 'react-native';;
const AccountScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Account</Text>
      </View>
      <View style={styles.footer} >
        <View style={styles.box1}>
          <TouchableOpacity style={[styles.boxStyle, styles.box1, styles.shadow]}
            onPress={() => navigation.navigate('EditInfoScreen')}
          >
            <View style={styles.defaultContainer}>
              <Text style={styles.text_style}>
                <Ionicons name="create" size={20} />
                {'\t'} Edit info
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boxStyle, styles.box1, styles.shadow]}
            onPress={() => navigation.navigate('MemberScreen')}
          >
            <View style={styles.defaultContainer}>

              <Text style={styles.text_style}>
                <Ionicons name="notifications" size={20} />
                {'\t'} Member points</Text>
            </View>
          </TouchableOpacity>
          <  TouchableOpacity
            style={[styles.boxStyle, styles.box1, styles.shadow]}
            onPress={() => navigation.navigate('SignInScreen')}
          >
            <View style={styles.defaultContainer}>

              <Text style={styles.text_style}>
                <Ionicons name="log-out" size={20} />
                {'\t'} Log out</Text>
            </View>
          </  TouchableOpacity>
          <TouchableOpacity style={[styles.boxStyle, styles.box1, styles.shadow]}
            onPress={() => Linking.openURL('http://choresmanager.s3-website.ca-central-1.amazonaws.com/')}
          >
            <View style={styles.defaultContainer}>

              <Text style={styles.text_style}>
                <Ionicons name="help-circle" size={20} />
                {'\t'} Help</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box2}></View>

      </View>


    </View>
  )
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d459'

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 30
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
    paddingBottom: 20
  },

  boxStyle: {
    width: '100%',
    height: 10,
    padding: 10,

  },

  box1: {
    flex: 1,
    top: -30
  },

  box2: {
    flex: 0.5
  },

  defaultContainer: {
    flex: 1,
    backgroundColor: "#d0f4be",
    padding: 5,
    justifyContent: 'center',
  },

  text_style: {
    color: '#77AA46',
    fontWeight: 'bold',
    left: 10,
    fontSize: 18
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },

});