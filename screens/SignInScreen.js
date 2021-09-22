import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        const reg = /\S+@\S+/;
        if (reg.test(val) === true) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        const reg = /\S+@\S+/;
        if (reg.test(val) === true) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const getActivityList = async () => {
        try {
          const response = await fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/sign-in',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              UserName: data.email,
              Password: data.password
            })
          });
        
          const json = await response.json();
          if (json.UserId) {
              navigation.navigate("MainScreen");
          } else {
            Alert.alert(
                ' ',
                'ERROR: '+json.Error,
                [
                  {
                    text: 'OK', onPress: () => {
                    }
                  },
                ],
                { cancelable: false },
              )
          }
 
        } catch (error) {
          console.error(error);
        } finally {
        }
      }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Let's Sign In</Text>
            </View>
            <Animatable.View
                animation="slideInLeft"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color='#96d459'
                        size={20}
                    />
                    <TextInput
                        placeholder="johndoe@gmail.com"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        },]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="#96d459"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null : null}
                {
                    /*<Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email must contain @</Text>
                </Animatable.View>*/
                }
                



                <View style={[styles.action, { marginTop: 45 }]}>
                    <Feather
                        name="lock"
                        color='#96d459'
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : null}
                {null/*
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>*/}
                


                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, { backgroundColor: '#96d459' }]}
                        onPress={() => getActivityList()}
                    >

                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#96d459',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#96d459'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96d459'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 0,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#96d459',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});