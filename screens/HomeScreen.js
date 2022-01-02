import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableHighlight,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,

} from 'react-native';;
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getActivityList = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if(userId !== null) {
      // value previously stored
        try {
          let url = 'https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-user-info?UserId='
          url = url + userId;
          const response = await fetch(url);
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }

 
  }

  useEffect(() => {
    getActivityList();
  }, []);

  useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', (e) => {
          getActivityList();
      });
  
      return unsubscribe;
    }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Chores Manager </Text>
        <Searchbar
          placeholder='Search Here'
          onChangeText={onChangeSearch}
          value={searchQuery} />
      </View>
      <View style={styles.footer} >
        <Text style={styles.text_footer}>Categories</Text>
        <View>

          <View style={[styles.boxStyle1, styles.box1]}>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','Electrician')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-Electrician.png')} />
                </TouchableOpacity>
              </View>
              <Text>Electrician</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','Cleaning')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-Cleaning.png')} />
                </TouchableOpacity>
                
              </View>
              <Text>Cleaning</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','Garden')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-Garden.png')} />
                </TouchableOpacity>

              </View>
              <Text>Garden</Text>
            </View>
          </View>

          <View style={[styles.boxStyle1, styles.box1]}>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','HouseFixer')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-HouseFix.png')} />
                </TouchableOpacity>
              </View>
              <Text>House Fixer</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','PersonalSalon')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-Salon.png')} />
                </TouchableOpacity>

              </View>
              <Text>Personal Salon</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.box1_1}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductScreen','Other')}>
                  <Image style={styles.images} resizeMode='contain' source={require('../assets/Home-Others.png')} />
                </TouchableOpacity>
              </View>
              <Text>And More...</Text>
            </View>
          </View>
        </View>
        
      </View>
      <View style={styles.box2}>
            <View style={styles.box2_1}>
              <Text>👑Current Points: {data.RoyaltyPoint}</Text>
            </View>
          </View>
    </View>
  )
}





export default HomeScreen;

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
    paddingBottom: 30,
    justifyContent: 'flex-end'
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
  text_footer: {
    color: '#96d459',
    fontSize: 18
  },

  boxStyle1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  box1: {
    marginTop: 50,
  },

  box1_1: {
    height: 'auto',
    width: 'auto',
    marginTop: 5,
    backgroundColor: "#d0f4be",
    padding: 10
  },

  buttonBox: {
    alignItems:'center',
  },


  images: {
    height: 70,
    width: 70,

  },

  box2: {
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },


  box2_1: {
    height: 'auto',
    marginBottom:10,
    alignItems: 'center',
    backgroundColor: "#fff",

  },



});

