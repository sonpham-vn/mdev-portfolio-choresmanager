import React from 'react';
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
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        fullname:'',
        age:'',
        city:''
    });

    const textInputChange = (val) => {
        const reg = /\S+@\S+/;
        if (reg.test(val) === true) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }


    const handleFullNameChange = (val) => {
        setData({
            ...data,
            fullname: val
        });
    }


    const handleAgeChange = (val) => {
        setData({
            ...data,
            age: val.replace(/[^0-9]/g, '')
        });
    }


    const handleCityChange = (val) => {
        setData({
            ...data,
            city: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const signUp = async () => {
        try {
            const encryptedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                data.password
              );
              console.log('Encrypted Pass: ', encryptedPassword);
              console.log(data.email+' '+data.fullname+' '+data.age+' '+data.city+' ');
            const response = await fetch('https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/sign-up',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        UserName: data.email,
                        Password: encryptedPassword,
                        FullName: data.fullname,
                        Age: data.age,
                        City: data.city
                    })
                });

            const json = await response.json();
            if (json.UserId) {
                await AsyncStorage.setItem('userId',json.UserId);
                Alert.alert(' ', 'Sign Up Successfully',
                    [{
                        text: 'OK', onPress: () => { navigation.navigate("MainScreen"); }
                    },],
                    { cancelable: false })
            } else {
                Alert.alert(' ', 'ERROR: ' + json.Error,
                    [{
                        text: 'OK', onPress: () => { }
                    },],
                    { cancelable: false })
            }

        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.container1}>

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.text_button_back}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.header_2}>
                        <Text style={styles.text_header} >Sign Up</Text>
                        <Text style={styles.text_subheader}>Please fill in the detail</Text>
                    </View>
                </View>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, { marginTop: 0 }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
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

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
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

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
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

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Full Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="John Doe"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleFullNameChange(val)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Age</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="18"
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType='numeric'
                            onChangeText={(val) => handleAgeChange(val)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>City</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#96d459"
                            size={20}
                        />
                        <TextInput
                            placeholder="Toronto"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleCityChange(val)}
                        />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={[styles.signUp, { backgroundColor: '#96d459' }]}
                            onPress={() => { signUp() }}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>

                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96d459'
    },

    container1: {
        flex: 1,
        width: '100%',
        backgroundColor: '#96d459',
        alignItems: 'center'

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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    text_subheader: {
        color: '#fff',
        fontSize: 20
    },

    text_footer: {
        color: '#96d459',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    text_button_back: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'left'
    }
});