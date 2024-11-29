import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('login_token');
      console.log(token, 'this is token');
      if (token !== null) {
        navigation.navigate('recepi');
      } else {
        navigation.navigate('login');
      }
    }, 2000);
  }, []);
  return (
    <View style={styles.screen}>
      <Text style={{fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>
        SplashScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default SplashScreen;
