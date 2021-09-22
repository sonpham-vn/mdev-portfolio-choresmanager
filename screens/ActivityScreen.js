import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    SafeAreaView,
    FlatList

} from 'react-native';
import { color } from 'react-native-reanimated';



const ActivityScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getActivityList = async () => {
      try {
        const response = await fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-activity');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
                <Text style={styles.text_header}>Activity</Text>
            </View>
            <View style={styles.footer} >
                <View style={styles.box1}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <View style={[styles.defaultContainer, styles.shadow]}>
                            <Text style={styles.text_style}>{item.ServiceName}</Text>
                            <Text style={styles.text_style1}>{item.Time}</Text>
                            <Text></Text>
                            {item.Status == 'Done'? 
                            <Text style={styles.text_style1}>Status: {item.Status}</Text>
                            : <Text style={styles.text_style}>Status: {item.Status}</Text> }
                            
                        </View>}
                    />
                </View>
            </View>
        </View>
    )
}

export default ActivityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96d459',
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
        padding: 20
    },

    box1: {
        flex: 1,
        padding:10
    },

    box3: {
        flex: 1
    },

    defaultContainer: {
        flex: 1,
        backgroundColor: "#d0f4be",
        padding: 10,
        margin:10
    },

    text_style: {
        color: '#5db84d',
        fontWeight:'bold'
    },

    text_style1: {
        color: 'grey'
    },

    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
      },

});