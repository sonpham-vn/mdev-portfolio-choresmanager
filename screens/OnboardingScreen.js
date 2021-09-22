import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Button } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? '#2D7905' : '#97D55A';
  } else {
    backgroundColor = selected ? '#2D7905' : '#97D55A';
  }
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor,
      }}
    />
  );
};

const Next = ({ ...props }) => (
  <Button
    title='Next'
    color='#96d459'
    {...props}
  />
);
const Done = ({ ...props }) => (
  <Button
    title='Done'
    color='#96d459'
    {...props}
  />
);

const Skip = ({ ...props }) => (
  <Button
    title='Skip'
    color='#96d459'
    {...props}
  />
);
const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Square}
      bottomBarColor='#fff'
      titleStyles={{ color: '#77AA46', fontSize: 20 }}
      onSkip={() => navigation.navigate('SignInScreen')}
      onDone={() => navigation.navigate('SignInScreen')}
      pages={[
        {
          backgroundColor: '#fff',
          title: 'Choose the services',
          subtitle: '',
          image: (<SafeAreaView>
            <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>
                <Text>The </Text>
                <Text style={styles.greenText}>easiest </Text>
                <Text>way to do your chores</Text>
                </Text>
                <Text style={styles.headerSubtitle}>SIMPLE</Text>
              <View>
                <Image resizeMode="contain" style={{ width: 300, height: 300 }} source={require('../assets/Onboarding-1.png')} />
              </View>
            </View>
          </SafeAreaView>),
        },
        {
          backgroundColor: '#fff',
          title: 'Confirm your location & time',
          subtitle: '',
          image: (<SafeAreaView>
            <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>
                <Text>The </Text>
                <Text style={styles.greenText}>easiest </Text>
                <Text>way to do your chores</Text>
                </Text>
                <Text style={styles.headerSubtitle}>FAST</Text>
              <View>
                <Image resizeMode="contain" style={{ width: 300, height: 300 }} source={require('../assets/Onboarding-2.png')} />
              </View>
            </View>
          </SafeAreaView>),
        },
        {
          backgroundColor: '#fff',
          title: 'Relax! Our professionals will take care of your problems',
          subtitle: '',
          image: (<SafeAreaView>
            <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>
                <Text>The </Text>
                <Text style={styles.greenText}>easiest </Text>
                <Text>way to do your chores</Text>
                </Text>
                <Text style={styles.headerSubtitle}>RELIABLE</Text>
              <View>
                <Image resizeMode="contain" style={{ width: 300, height: 300 }} source={require('../assets/Onboarding-3.png')} />
              </View>
            </View>
          </SafeAreaView>),
        },

      ]}
    />
  )
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 10,
    height: 10
  },
  headerTop: {
    alignItems: 'center',
    padding: 20
  },
  headerTitle:{
    top: -50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSubtitle:{
    padding:10,
    fontSize: 30,
    color:'#77AA46'
  },
  greenText:{
    color:'#77AA46'
  }
})